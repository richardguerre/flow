import express from "express";
import { createServer } from "@graphql-yoga/node";
import { makeSchema } from "nexus";
import * as graphqlTypes from "./graphql";
import { externalSources } from "../../../config";

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());

// -------------------------- GraphQL ----------------------------

const schema = makeSchema({
  types: graphqlTypes,
  outputs: {
    schema: __dirname + "/utils/generated/schema.graphql",
    typegen: __dirname + "/utils/generated/nexus-types.d.ts",
  },
});
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
    let result = (await externalSource?.webhook?.onWebhookEvent(req.body)) ?? null;
    if (!result) throw "Webhook event is not relevant";
    if (!Array.isArray(result)) result = [result];
  } catch (e: any) {
    console.log(e);
  }
  res.sendStatus(200);
});

// -------------------------- Server ------------------------------

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
