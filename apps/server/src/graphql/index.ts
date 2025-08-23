import { builder } from "./builder";
import { printSchema } from "graphql";
import "./Color";
import "./Day";
import "./Item";
import "./ItemPluginData";
import "./List";
import "./NoteLink";
import "./Note";
import "./NoteTag";
import "./Notifications";
import "./PluginOperation";
import "./PrismaFilters";
import "./RepetitionPattern";
import "./Template.ts";
import "./RoutineStep";
import "./Routine";
import "./Store";
import "./Task";
import "./TaskPluginData";
import "./TaskTag";
import "./Util.ts";
import "./Plugin";
import "./Shortcut.ts";
import { env } from "../env";

export const schema = builder.toSchema();
if (env.NODE_ENV === "development") {
  const schemaAsString = printSchema(schema);
  const path = await Bun.resolve("../../../../packages/relay/schema.graphql", import.meta.dir);
  await Bun.write(path, "# @generated\n" + schemaAsString);
  console.log("\n✅ GraphQL schema generated into packages/relay/schema.graphql");
}
