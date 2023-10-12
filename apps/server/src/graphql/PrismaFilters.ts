import { builder } from "./builder";

export const DateFilter = builder.prismaFilter("Date", {
  name: "PrismaDateFilter",
  description: "Filter input of Date",
  ops: ["equals", "lt", "lte", "gt", "gte", "in", "not", "notIn"],
});

export const DateTimeFilter = builder.prismaFilter("DateTime", {
  name: "PrismaDateTimeFilter",
  description: "Filter input of DateTime",
  ops: ["equals", "lt", "lte", "gt", "gte", "in", "not", "notIn"],
});

export const IntFilter = builder.prismaFilter("Int", {
  name: "PrismaIntFilter",
  description: "Filter input of Int",
  ops: ["equals", "lt", "lte", "gt", "gte", "in", "not", "notIn"],
});
