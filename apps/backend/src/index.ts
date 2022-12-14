import express from "express";
import { createServer } from "@graphql-yoga/node";
import { schema } from "./graphql";
import { externalSources } from "../../../config";
import { addItems } from "./utils/addItems";
import { pluralize } from "./utils/pluralize";

const PORT = process.env.PORT || 4000;
export const app = express();
app.use(express.json());

// -------------------------- GraphQL ----------------------------

const graphQLServer = createServer({ schema });
app.use("/graphql", graphQLServer);

// -------------------------- Webhooks ----------------------------

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
    console.log(`\nServer started on port ${PORT}`);
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
