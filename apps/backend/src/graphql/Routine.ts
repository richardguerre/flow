import { prisma } from "../utils/prisma";
import { builder } from "./builder";
import { RepetitionPatternEnum } from "./RepetitionPattern";

// -------------- Routine types --------------

// TODO: move this into its own file / package
type Letter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type UrlSlug = `${Letter | Digit}${string}`;

export type RoutineStep = `${UrlSlug}_${UrlSlug}_${boolean}`;

export const RoutineType = builder.prismaNode("Routine", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    name: t.exposeString("name"),
    time: t.expose("time", { type: "LocalEndTime" }),
    repeats: t.expose("repeats", { type: [RepetitionPatternEnum] }),
    steps: t.expose("steps", { type: ["RoutineStep"] }),
  }),
});

// --------------- Routine query types ---------------

builder.queryField("routines", (t) =>
  t.prismaField({
    type: ["Routine"],
    description: "Get all routines.",
    resolve: prisma.routine.findMany,
  })
);
