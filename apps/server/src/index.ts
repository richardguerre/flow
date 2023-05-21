import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql";
import { externalSources } from "../../../config";
import { addItems } from "./utils/addItems";
import { pluralize } from "./utils/pluralize";
import { getPlugins } from "./utils/getPlugins";

const PORT = process.env.PORT ?? 4000;
export const app = express();
app.use(express.json());

// -------------------------- GraphQL ----------------------------

const graphqlAPI = createYoga({ schema });
app.use("/graphql", graphqlAPI);

// -------------------------- Webhooks ----------------------------

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

app.post("/webhook/:name", async (req, res) => {
  console.log("Received webhook", req.params.name, req.body);
  try {
    if (!req.params.name) throw "No name provided for Webhook";
    const externalSourceName = Object.keys(externalSources).find((name) => {
      const externalSource = externalSources[name];
      const webhookName = externalSource?.webhook?.name ?? name;
      return webhookName.toLowerCase() === req.params.name.toLowerCase();
    });
    if (!externalSourceName) {
      throw "No external source found with name " + req.params.name + "in config.";
    }
    const externalSource = externalSources[externalSourceName];
    let items = (await externalSource?.webhook?.onWebhookEvent(req.body)) ?? null;
    if (!items) throw "Webhook event is not relevant";
    if (!Array.isArray(items)) items = [items];

    const result = await addItems(externalSourceName, items);
    console.log(
      `Added ${result.count} external ${pluralize("item", result.count)} from ${externalSourceName}`
    );
  } catch (e: any) {
    console.log("Webhook error:", e);
  }
  res.sendStatus(200);
});

// -------------------------- Server ------------------------------

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`\n✅ Server started on port ${PORT}`);
    console.log(`GraphQL API: http://localhost:${PORT}/graphql`);
    for (const name in externalSources) {
      console.log(
        `Webhook: http://localhost:${PORT}/webhook/${(
          externalSources[name]?.webhook?.name ?? name
        ).toLowerCase()}`
      );
    }
  });
} else {
  // express will default to port 0 which will randomly assign a port
  // this prevents errors stating that the port is already in use
  // more info here: https://stackoverflow.com/questions/54422849/jest-testing-multiple-test-file-port-3000-already-in-use
}
