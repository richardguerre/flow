import { builder } from "./builder";
import { writeFileSync } from "fs";
import { printSchema } from "graphql";
import "./Day";
import "./Item";
import "./ItemPluginData";
import "./List";
import "./Note";
import "./NoteLabel";
import "./Task";
import "./TaskLabel";
import "./TaskPluginData";

export const schema = builder.toSchema();
const schemaAsString = printSchema(schema);
const cwd = process.cwd();
writeFileSync(`${cwd}/schema.graphql`, schemaAsString);
