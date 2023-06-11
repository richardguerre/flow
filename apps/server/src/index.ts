import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql";
import { getPlugins } from "./utils/getPlugins";
import { prisma } from "./utils/prisma";
import path from "node:path";

const PORT = process.env.PORT ?? 4000;
export const app = express();
app.use(express.json());

// -------------------------- GraphQL ----------------------------

const graphqlAPI = createYoga({ schema });
app.use("/graphql", graphqlAPI);

// ---------------------- Plugin endpoints -----------------------

app.use("/api/:pluginSlug", async (req, res, next) => {
  const pluginSlug = req.params.pluginSlug;
  const installedPlugins = await getPlugins();
  const plugin = installedPlugins[pluginSlug];
  if (!plugin) {
    res.status(404).send(`Plugin ${pluginSlug} not found`);
    return;
  }
  if (!plugin.onRequest) {
    res
      .status(404)
      .send(`Plugin ${pluginSlug} has no \`onRequest\` function to handle the request.`);
    return;
  }
  plugin.onRequest(req, res);
  next();
});

// -------------------------- Web app -----------------------------

app.use(express.static("web"));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "./web/index.html"));
});

// -------------------------- Server ------------------------------

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n✅ Server started on port ${PORT}`);
    console.log(`🟣 GraphQL API: http://localhost:${PORT}/graphql`);
  });
} else {
  // express will default to port 0 which will randomly assign a port
  // this prevents errors stating that the port is already in use
  // more info here: https://stackoverflow.com/questions/54422849/jest-testing-multiple-test-file-port-3000-already-in-use
}

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
