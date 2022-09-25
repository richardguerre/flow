import { builder } from "./builder";
import "./Day";
import "./ExternalItem";
import "./Task";
import "./TaskTemplate";

builder.queryType();

export const schema = builder.toSchema();
