import express from "express";
import { createYoga } from "graphql-yoga";
import path from "node:path";
import { schema } from "./graphql";
import {
  getPluginJson,
  getPlugins,
  getPluginsInStore,
  installServerPlugin,
} from "./utils/getPlugins";
import { prisma } from "./utils/prisma";
import { pgBoss } from "./utils/pgBoss";
import { env } from "./env";
import {
  SYNC_TASKS_JOB_NAME,
  getTimezone,
  isSessionTokenValid,
  scheduleSyncTasks,
  syncTasks,
} from "./utils";
import "./utils/dayjs";

const PORT = env.PORT ?? 4000;
export const app = express();
app.use(express.json());

// -------------------------- GraphQL ----------------------------

const graphqlAPI = createYoga({
  schema,
  context: async (req) => {
    const sessionToken = req.request.headers.get("authorization")?.replace("Bearer ", "");

    return {
      userAgent: req.request.headers.get("user-agent") ?? undefined,
      sessionToken,
      // had to do this as having the isSessionValid function in builder.ts caused an error (maybe circular dependency error)
      isSessionValid: () => isSessionTokenValid(sessionToken),
    };
  },
  graphiql: {
    title: "Flow GraphQL API",
    headers: JSON.stringify({
      Authorization: `Bearer COPY_TOKEN_FROM_BROWSER_CONSOLE_OR_LOGIN_MUTATION`,
    }),
  },
});
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
    if (env.NODE_ENV === "development") {
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

if (env.NODE_ENV !== "test") {
  (async () => {
    const plugins = await getPlugins(); // this will refresh the plugin cache to make sure it's up to date before installing plugins and is also used below to handle the pgBoss jobs
    if (env.NODE_ENV !== "development") {
      // ---------------------- Install plugins -------------------------

      // Try installing plugins before starting the server so that requests
      // to the plugin endpoints don't fail. Only if this is production (not development)
      // as during development plugins can be installed manually.
      try {
        const installedPlugins = await getPluginsInStore().catch(() => {
          console.log("Failed to get plugins from DB.");
          return [];
        });
        for (const pluginInfo of installedPlugins) {
          const pluginJson = await getPluginJson(pluginInfo).catch(() => null);
          if (!pluginJson) {
            console.log(`Invalid plugin.json for "${pluginInfo.slug}".`);
            continue;
          }
          if (Object.keys(plugins).find((p) => p === pluginJson.slug)) {
            console.log(`Plugin "${pluginJson.slug}" already installed on server.`);
            continue;
          }
          if (!pluginJson.server) {
            console.log(`Plugin "${pluginJson.slug}" has no server entrypoint.`);
            continue;
          }
          await installServerPlugin(pluginInfo).catch((e) => {
            if (e.message.includes("PLUGIN_WITH_SAME_SLUG")) {
              console.log(`Plugin "${pluginInfo.slug}" already installed on server.`);
              return;
            }
            console.log(`Failed to install "${pluginInfo.slug}": ${e}`);
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
    if (env.NODE_ENV !== "development") {
      await pgBoss.work(SYNC_TASKS_JOB_NAME, syncTasks);
      const timezone = await getTimezone();
      await scheduleSyncTasks(timezone);
      await syncTasks(); // initial sync on server start
    }
  })();
} else {
  app.listen(0);
  // by defaulting to port 0, it will randomly assign a port that is not in use
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
