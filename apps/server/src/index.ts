import express from "express";
import { createYoga } from "graphql-yoga";
import path from "node:path";
import { schema } from "./graphql";
import { getPlugins, getPluginsInStore, installServerPlugin } from "./utils/getPlugins";
import { prisma } from "./utils/prisma";
import { pgBoss } from "./utils/pgBoss";

/** An object where the key is the environment variable name and the value is whether or not it's required. */
const envsToCheck = {
  NODE_ENV: false,
  PORT: false,
  DATABASE_URL: true,
  ORIGIN: true,
};
// didn't use zod nor chalk/ink/colors for this as it's not worth installing for just this (it's 600+kb to install)
// color from https://backbencher.dev/nodejs-colored-text-console
console.log("\x1b[2mEnvironment variables:\x1b[0m");
for (const [env, required] of Object.entries(envsToCheck)) {
  if (required && !process.env[env]) {
    throw `❌ Environment variable ${env} is required but not set.`;
  }
  console.log(`\x1b[2m  ${env}: ${process.env[env]}\x1b[0m`);
}

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
  await plugin.onRequest(req, res);
  try {
    return res.status(404).send(`Plugin ${pluginSlug} has no endpoint for ${req.path}.`);
  } catch (e: any) {
    if (e?.message === "Cannot set headers after they are sent to the client") {
      // this means the plugin has already sent a response, and we can ignore this error
      return;
    }
    console.error(e);
  }
});

// -------------------------- Web app -----------------------------

app.use(express.static("web"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./web/index.html"), async () => {
    if (process.env.NODE_ENV === "development") {
      const developmentPath = `http://localhost:3000${req.path}`;
      try {
        const result = await fetch(developmentPath);
        if (result.ok) {
          return res.redirect(developmentPath);
        }
      } catch {
        return res.status(404).send("Local frontend is not running on port 3000.");
      }
    }
    // in prouduction the web app is served from the web folder so it should never get here
    return res.status(404).send("404 Not Found");
  });
});

if (process.env.NODE_ENV !== "test") {
  (async () => {
    const plugins = await getPlugins(); // this will refresh the plugin cache to make sure it's up to date before installing plugins and is also used below to handle the pgBoss jobs
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
        for (const plugin of installedPlugins) {
          await installServerPlugin({
            url: plugin.url,
            installedPluginSlugs,
          }).catch((e) => {
            if (e.message.includes("PLUGIN_WITH_SAME_SLUG")) {
              console.log(`Plugin ${plugin.slug} already installed.`);
              return;
            }
            console.log(`Failed to install ${plugin.slug}: ${e}`);
          });
        }
      } catch (e) {
        // this should never happen, but better be safe than sorry
        console.log("Failed to install plugins from DB.");
        console.error(e);
      }
    }

    // -------------------------- Server ------------------------------

    app.listen(PORT, () => {
      console.log(`✅ Server started at: http://localhost:${PORT}`);
      console.log(`🟣 GraphQL API: http://localhost:${PORT}/graphql`);
    });

    // -------------------------- PgBoss ------------------------------
    await pgBoss.start();
    console.log("✅ PgBoss started.");
    for (const plugin of Object.values(plugins)) {
      const handlers = plugin.handlePgBossWork?.(pgBoss.work) ?? [];
      await Promise.all(handlers);
    }
  })();
} else {
  // express will default to port 0 which will randomly assign a port
  // this prevents errors stating that the port is already in use
  // more info here: https://stackoverflow.com/questions/54422849/jest-testing-multiple-test-file-port-3000-already-in-use
}

// -------------------------- Cleanup -----------------------------

process.on("SIGINT", () => {
  Promise.allSettled([
    prisma.$disconnect().then(() => console.log("✅ Prisma disconnected.")),
    pgBoss.stop().then(() => console.log("✅ PgBoss stopped.")),
  ])
    .then(() => {
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
});
