import { GraphQLError } from "graphql";
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
    actionName: t.exposeString("actionName"),
    time: t.expose("time", { type: "Time" }),
    repeats: t.expose("repeats", { type: [RepetitionPatternEnum] }),
    steps: t.field({
      type: [RoutineStepType],
      resolve: (routine) =>
        routine.steps.map((step) => {
          const [pluginSlug, stepSlug, shouldSkip] = step.split("_");
          return {
            pluginSlug: pluginSlug!,
            stepSlug: stepSlug!,
            shouldSkip: shouldSkip === "true",
          };
        }),
    }),
    isActive: t.exposeBoolean("isActive"),
    firstStep: t.string({
      resolve: (routine) => routine.steps[0] ?? null,
      nullable: true,
      description:
        "Returns the first step in the routine. If there are no steps in the routine, it returns `null`.",
    }),
    done: t.boolean({
      description:
        "Whether the routine was done for the day. This can be null if the routine is queried outside of a day.",
      nullable: true,
      resolve: async (routine) => {
        if (!("_done" in routine) || typeof routine._done !== "boolean") return null;
        return routine._done;
      },
    }),
  }),
});

export const RoutineStepType = builder.simpleObject("RoutineStep", {
  description: "A step in a routine. To know which plugin the step belongs to, see `pluginSlug`.",
  fields: (t) => ({
    pluginSlug: t.string({ description: "The slug of the plugin that the step belongs to." }),
    stepSlug: t.string({ description: "The slug of the step." }),
    shouldSkip: t.boolean({
      description:
        "Whether the step should be skipped if the previous routine was done (i.e. routine.done = true).",
    }),
  }),
});

const RoutineStepInput = builder.inputType(
  builder.inputRef<{
    pluginSlug: string;
    stepSlug: string;
    shouldSkip: boolean;
  }>("RoutineStepInput"),
  {
    fields: (t) => ({
      pluginSlug: t.string({ required: true }),
      stepSlug: t.string({ required: true }),
      shouldSkip: t.boolean({ required: true }),
    }),
  }
);

// --------------- Routine query types ---------------

builder.queryField("routines", (t) =>
  t.prismaField({
    type: ["Routine"],
    description: "Get all routines.",
    resolve: prisma.routine.findMany,
  })
);

// --------------- Routine mutation types ---------------

builder.mutationField("createRoutine", (t) =>
  t.prismaFieldWithInput({
    type: "Routine",
    input: {
      name: t.input.string({ required: true }),
      actionName: t.input.string({ required: true }),
      time: t.input.field({ type: "Time", required: true }),
      repeats: t.input.field({ type: [RepetitionPatternEnum], required: true }),
      steps: t.input.field({ type: [RoutineStepInput], required: true }),
    },
    resolve: (query, _, args) => {
      return prisma.routine.create({
        ...query,
        data: {
          name: args.input.name,
          actionName: args.input.actionName,
          time: args.input.time,
          repeats: args.input.repeats,
          firstDay: new Date(), // FIXME: refactor this to have the correct date according to the user's timezone
          isActive: true,
          steps: args.input.steps.map(
            (step) => `${step.pluginSlug}_${step.stepSlug}_${step.shouldSkip}`
          ),
        },
      });
    },
  })
);

builder.mutationField("updateRoutineSteps", (t) =>
  t.prismaFieldWithInput({
    type: "Routine",
    input: {
      routineId: t.input.globalID({
        description: "The ID of the routine to update.",
        required: true,
      }),
      steps: t.input.field({
        type: [RoutineStepInput],
        description: "The steps to update the routine with.",
        required: true,
      }),
    },
    resolve: (query, _, args) => {
      return prisma.routine.update({
        ...query,
        where: { id: parseInt(args.input.routineId.id) },
        data: {
          steps: args.input.steps.map(
            (step) => `${step.pluginSlug}_${step.stepSlug}_${step.shouldSkip}`
          ),
        },
      });
    },
  })
);

builder.mutationField("completeRoutine", (t) =>
  t.fieldWithInput({
    type: "Boolean",
    input: {
      routineId: t.input.globalID({
        description: "The ID of the routine that was completed.",
        required: true,
      }),
      date: t.input.field({
        type: "Date",
        description: "The date the routine was completed.",
        required: true,
      }),
    },
    resolve: async (_, args) => {
      try {
        await prisma.day.update({
          where: { date: args.input.date },
          data: { routinesCompleted: { connect: { id: parseInt(args.input.routineId.id) } } },
        });
      } catch (e) {
        new GraphQLError((e as Error).message);
      }
      return true;
    },
  })
);
