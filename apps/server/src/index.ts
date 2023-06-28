import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql";
import { getPlugins } from "./utils/getPlugins";
import { prisma } from "./utils/prisma";
import path from "node:path";
import { getPluginsInStore, installServerPlugin } from "./utils/getPlugins";

const PORT = process.env.PORT ?? 4000;
export const app = express();
app.use(express.json());

// -------------------------- GraphQL ----------------------------

const graphqlAPI = createYoga({ schema });
app.use("/graphql", graphqlAPI);

// ---------------------- Plugin endpoints -----------------------

app.use("/api/plugin/:pluginSlug", async (req, res) => {
  const pluginSlug = req.params.pluginSlug;
  const installedPlugins = await getPlugins();
  const plugin = installedPlugins[pluginSlug];
  if (!plugin) {
    res
      .status(404)
      .send(
        `Plugin ${pluginSlug} not found. It may be in the process of being installed. Please try again later.`
      );
    return;
  }
  if (!plugin.onRequest) {
    res
      .status(404)
      .send(`Plugin ${pluginSlug} has no \`onRequest\` function to handle the request.`);
    return;
  }
  const success = await plugin.onRequest(req, res);
  if (!success) {
    return res.status(404).send(`Plugin ${pluginSlug} has no endpoint for ${req.path}.`);
  }
});

// -------------------------- Web app -----------------------------

app.use(express.static("web"));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "./web/index.html"));
});

if (process.env.NODE_ENV !== "test") {
  (async () => {
    if (process.env.NODE_ENV !== "development") {
      // ---------------------- Install plugins -------------------------

      // Try installing plugins before starting the server so that requests
      // to the plugin endpoints don't fail. Only if this is production (not development)
      // as during development plugins can be installed manually.
      try {
        const installedPlugins = await getPluginsInStore().catch(() => {
          console.log("Failed to get plugins from DB.");
          return [];
        });
        const installedPluginSlugs = installedPlugins.map((p) => p.slug);
        await getPlugins(); // this will refresh the plugin cache to make sure it's up to date before installing plugins
        await Promise.all(
          installedPlugins.map((plugin) =>
            installServerPlugin({
              url: plugin.url,
              installedPluginSlugs,
            }).catch((e) => {
              if (e.message.includes("PLUGIN_WITH_SAME_SLUG")) {
                console.log(`Plugin ${plugin.slug} already installed.`);
                return;
              }
              console.log(`Failed to install ${plugin.slug}: ${e}`);
            })
          )
        );
      } catch (e) {
        // this should never happen, but better be safe than sorry
        console.log("Failed to install plugins from DB.");
        console.error(e);
      }
    }

    // -------------------------- Server ------------------------------

    app.listen(PORT, () => {
      console.log(`\n✅ Server started on port ${PORT}`);
      console.log(`🟣 GraphQL API: http://localhost:${PORT}/graphql`);
    });
  })();
} else {
  // express will default to port 0 which will randomly assign a port
  // this prevents errors stating that the port is already in use
  // more info here: https://stackoverflow.com/questions/54422849/jest-testing-multiple-test-file-port-3000-already-in-use
}

// -------------------------- Cleanup -----------------------------

process.on("SIGINT", () => {
  prisma
    .$disconnect()
    .then(() => {
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
});
