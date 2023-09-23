import { builder } from "./builder";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { printSchema } from "graphql";
import "./Day";
import "./Item";
import "./ItemPluginData";
import "./List";
import "./Note";
import "./NoteTag";
import "./RepetitionPattern";
import "./Routine";
import "./Store";
import "./Task";
import "./TaskTag";
import "./TaskPluginData";
import "./PluginOperation";
import "./Notifications";
import { env } from "../env";

export const schema = builder.toSchema();
if (env.NODE_ENV === "development") {
  const schemaAsString = printSchema(schema);
  const path = join(__dirname, "../../../web/src/relay/schema.graphql");
  writeFileSync(path, schemaAsString);
  console.log("\n✅ GraphQL schema generated into apps/web/src/relay/schema.graphql");
}
