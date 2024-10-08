import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
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
  getTimezone,
  isSessionTokenValid,
  pgBossWorkers,
  pluginPgBossWorkers,
  scheduleDeletePgBossArchive,
  scheduleRolloverTasks,
  syncTasks,
} from "./utils";
import "./utils/dayjs";
import "./checksum";

const PORT = env.PORT ?? 4000;

// -------------------------- GraphQL ----------------------------
const yogaHandler = async (request: Request) => {
  const res = await createYoga({
    schema,
    cors: { origin: undefined },
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
      title: "Flow API",
      headers: JSON.stringify({
        Authorization: `Bearer COPY_TOKEN_FROM_BROWSER_CONSOLE_OR_LOGIN_MUTATION`,
      }),
    },
  }).handle(request);
  res.headers.delete("Access-Control-Allow-Origin"); // let elysia handle CORS
  return res;
};

// -------------------------- Server ------------------------------
export const app = new Elysia()
  .use(cors())
  .get("/graphql", async ({ request }) => yogaHandler(request))
  .post("/graphql", async ({ request }) => yogaHandler(request), {
    type: "none",
  })
  // ---------------------- Plugin endpoints -----------------------
  .all("/api/plugin/:pluginSlug/*", async (req) => {
    const pluginSlug = req.params.pluginSlug;
    const installedPlugins = await getPlugins();
    const plugin = installedPlugins[pluginSlug];
    if (!plugin) {
      return new Response(
        `Plugin ${pluginSlug} not found. It may be in the process of being installed. Please try again later.`,
        { status: 404 },
      );
    }
    if (!plugin.onRequest) {
      return new Response(
        `Plugin ${pluginSlug} has no \`onRequest\` function to handle the request.`,
        { status: 404 },
      );
    }

    req.path = req.path.replace(`/api/plugin/${pluginSlug}`, "");
    const maybePromise = plugin.onRequest(req as any);
    if (maybePromise instanceof Response) return maybePromise;
    const res = await maybePromise?.catch(() => null);
    if (res) return res;
    return new Response(`Plugin ${pluginSlug} has no endpoint for ${req.path}.`, { status: 404 });
  });

// -------------------------- Web app -----------------------------

// this needs to be .all instead of .get because .get takes precedence over .all and .all("/api/plugin/:pluginSlug/*") needs to take precedence before .all("*")
app.all("*", async (req) => {
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
  // if request is from a mobile device, serve the mobile-pwa instead of the web app
  if (req.headers["user-agent"]?.includes("Mobile")) {
    const mobilePwaDir = "./mobile-pwa";
    try {
      const path = await Bun.resolve(`${mobilePwaDir}${req.path}`, import.meta.dir);
      return new Response(Bun.file(path));
    } catch {
      try {
        const path = await Bun.resolve(`${mobilePwaDir}/index.html`, import.meta.dir);
        return new Response(Bun.file(path));
      } catch {
        console.error("index.html not found in mobile-pwa directory.");
        return new Response(
          "Not sure how you got here. Contact Richard Guerre (through Slack or @richardguerre_ on Twitter) with a screenshot of this screen with the URL.",
          { status: 404 },
        );
      }
    }
  }
  const webDir = "./web";
  try {
    const path = await Bun.resolve(`${webDir}${req.path}`, import.meta.dir);
    return new Response(Bun.file(path));
  } catch {
    try {
      const path = await Bun.resolve(`${webDir}/index.html`, import.meta.dir);
      return new Response(Bun.file(path));
    } catch {
      console.error("index.html not found in web directory.");
      return new Response(
        "Not sure how you got here. Contact Richard Guerre (through Slack or @richardguerre_ on Twitter) with a screenshot of this screen with the URL.",
        { status: 404 },
      );
    }
  }
});

if (env.NODE_ENV !== "test") {
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
  await pluginPgBossWorkers({ plugins });
  await pgBossWorkers();
  if (env.NODE_ENV !== "development") {
    const timezone = await getTimezone();
    await scheduleRolloverTasks(timezone);
    await scheduleDeletePgBossArchive(timezone);
    await syncTasks(); // initial sync on server start
  }
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
