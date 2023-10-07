import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { createYoga } from "graphql-yoga";
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
  ROLLOVER_TASKS_JOB_NAME,
  getTimezone,
  isSessionTokenValid,
  scheduleRolloverTasks,
  syncTasks,
} from "./utils";
import "./utils/dayjs";
import "./checksum";

const PORT = env.PORT ?? 4000;

// -------------------------- GraphQL ----------------------------
const yoga = createYoga({
  schema,
  context: async (req) => {
    const sessionToken = req.request.headers.get("authorization")?.replace("Bearer ", "");

    return {
      userAgent: req.request.headers.get("user-agent") ?? undefined,
      sessionToken,
      // had to do this as having the isSessionValid function in builder.ts caused an error (maybe circular dependency error)
      isSessionValid: () => isSessionTokenValid(sessionToken),
      subscriptions: {},
    };
  },
  graphiql: {
    title: "Flow GraphQL API",
    headers: JSON.stringify({
      Authorization: `Bearer COPY_TOKEN_FROM_BROWSER_CONSOLE_OR_LOGIN_MUTATION`,
    }),
  },
});

// -------------------------- Server ------------------------------
export const app = new Elysia()
  .get("/graphql", async ({ request }) => yoga.fetch(request))
  .post("/graphql", async ({ request }) => yoga.fetch(request), {
    type: "none",
  })
  // ---------------------- Plugin endpoints -----------------------
  .all("/api/plugin/:pluginSlug", async (req) => {
    const pluginSlug = req.params.pluginSlug;
    const installedPlugins = await getPlugins();
    const plugin = installedPlugins[pluginSlug];
    if (!plugin) {
      return new Response(
        `Plugin ${pluginSlug} not found. It may be in the process of being installed. Please try again later.`,
        { status: 404 }
      );
    }
    if (!plugin.onRequest) {
      return new Response(
        `Plugin ${pluginSlug} has no \`onRequest\` function to handle the request.`,
        { status: 404 }
      );
    }

    const res = await plugin.onRequest(req as any);
    if (res) return res;
    return new Response(`Plugin ${pluginSlug} has no endpoint for ${req.path}.`, { status: 404 });
  });

// -------------------------- Web app -----------------------------

console.log("before error");
app.use(async (app) => {
  try {
    // if this throws, fallback to .get("*") below
    return ((await staticPlugin({ assets: "web", prefix: "/", alwaysStatic: true })) as any)(app); // types are too hard to fix, but runtime works
  } catch {
    return app;
  }
});
app.get("*", async (req) => {
  // if in development mode, try to redirect to the local frontend
  // otherwise return 404
  if (env.NODE_ENV === "development") {
    const developmentPath = `http://localhost:3000${req.path}`;
    try {
      const result = await fetch(developmentPath);
      if (result.ok) {
        return Response.redirect(developmentPath);
      }
    } catch {
      return new Response("Local frontend is not running on port 3000.", { status: 404 });
    }
  }
  if (req.path === "/") {
    // serve index.html if the requested path is the root
    const path = await Bun.resolve("./web/index.html", import.meta.dir);
    return new Response(Bun.file(path));
  }
  return new Response("404 Not Found", { status: 404 });
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
      await pgBoss.work(ROLLOVER_TASKS_JOB_NAME, syncTasks);
      const timezone = await getTimezone();
      await scheduleRolloverTasks(timezone);
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
