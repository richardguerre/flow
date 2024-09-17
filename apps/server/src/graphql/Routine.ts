import { GraphQLError } from "graphql";
import { prisma } from "../utils/prisma";
import { builder, u } from "./builder";
import { RepetitionPatternEnum } from "./RepetitionPattern";
import { RoutineStepInput } from "./RoutineStep";
import { getPlugins } from "../utils/getPlugins";
import { RoutineStep, Routine } from "@prisma/client";

// -------------- Routine types --------------

export const RoutineType = builder.prismaNode("Routine", {
  id: { field: "id" },
  fields: (t) => ({
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    name: t.exposeString("name"),
    actionName: t.exposeString("actionName"),
    time: t.expose("time", { type: "Time" }),
    repeats: t.expose("repeats", { type: [RepetitionPatternEnum] }),
    steps: t.relation("steps", {
      resolve: async (query, routine) => {
        const order = routine.stepsOrder ?? [];
        const steps = await prisma.routineStep.findMany({
          ...query,
          where: { routineId: routine.id },
        });
        const stepsOrdered = steps.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
        return stepsOrdered;
      },
    }),
    isActive: t.exposeBoolean("isActive"),
    firstStep: t.prismaField({
      type: "RoutineStep",
      nullable: true,
      description:
        "Returns the first step in the routine. If there are no steps in the routine, it returns `null`.",
      resolve: async (query, routine) => {
        const order = routine.stepsOrder ?? [];
        const steps = await prisma.routineStep.findMany({
          ...query,
          where: { routineId: routine.id },
        });
        const stepsOrdered = steps.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
        return stepsOrdered[0] ?? null;
      },
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

// --------------- Routine query types ---------------

builder.queryField("routines", (t) =>
  t.prismaField({
    type: ["Routine"],
    description: "Get all routines.",
    resolve: prisma.routine.findMany,
  }),
);

// --------------- Routine mutation types ---------------

export type PluginOnAddRoutineStepEnd = (input: {
  routine: Routine;
  step: RoutineStep;
}) => Promise<void>;

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
    resolve: async (query, _, args) => {
      const { routine, stepsOrdered } = await prisma.$transaction(async (tx) => {
        const routine = await tx.routine.create({
          select: { id: true },
          data: {
            name: args.input.name,
            actionName: args.input.actionName,
            time: args.input.time,
            repeats: args.input.repeats,
            firstDay: new Date(), // FIXME: refactor this to have the correct date according to the user's timezone
            isActive: true,
          },
        });
        const stepsOrdered: RoutineStep[] = [];
        for (const step of args.input.steps) {
          const routineStep = await tx.routineStep.create({
            data: {
              pluginSlug: step.pluginSlug,
              stepSlug: step.stepSlug,
              shouldSkip: step.shouldSkip,
              routineId: routine.id,
            },
          });
          stepsOrdered.push(routineStep);
        }
        return {
          routine: await tx.routine.update({
            ...query,
            where: { id: routine.id },
            data: { stepsOrder: { set: stepsOrdered.map((step) => step.id) } },
          }),
          stepsOrdered,
        };
      });
      const plugins = await getPlugins();
      for (const step of stepsOrdered) {
        if (!step.id) continue;
        const plugin = plugins[step.pluginSlug];
        if (!plugin) continue;
        await plugin.onAddRoutineStepEnd?.({ routine, step });
      }
      return routine;
    },
  }),
);

builder.mutationField("updateRoutine", (t) =>
  t.prismaFieldWithInput({
    type: "Routine",
    input: {
      routineId: t.input.globalID({
        description: "The ID of the routine to update.",
        required: true,
      }),
      isActive: t.input.boolean({
        description: "Whether the routine is active.",
        required: false,
      }),
      name: t.input.string({
        description: "The name to update the routine with.",
        required: false,
      }),
      actionName: t.input.string({
        description: "The action name to update the routine with.",
        required: false,
      }),
      time: t.input.field({
        type: "Time",
        description: "The time to update the routine with.",
        required: false,
      }),
      steps: t.input.field({
        type: [RoutineStepInput],
        description: "The steps to update the routine with.",
        required: false,
      }),
      repeats: t.input.field({
        type: [RepetitionPatternEnum],
        description: "The repetition patterns to update the routine with.",
        required: false,
      }),
    },
    resolve: async (query, _, args) => {
      const { routine, newSteps } = await prisma.$transaction(async (tx) => {
        const stepsOrdered: number[] = [];
        const newSteps: RoutineStep[] = [];
        for (const step of args.input.steps ?? []) {
          if (step.id) {
            // the step exists, so we update it
            const routineStep = await tx.routineStep.update({
              select: { id: true },
              where: { id: parseInt(step.id.id) },
              data: {
                pluginSlug: step.pluginSlug,
                stepSlug: step.stepSlug,
                shouldSkip: step.shouldSkip,
                config: u(step.config),
              },
            });
            stepsOrdered.push(routineStep.id);
          } else {
            // the step doesn't exist, so we create it
            const routineStep = await tx.routineStep.create({
              data: {
                pluginSlug: step.pluginSlug,
                stepSlug: step.stepSlug,
                shouldSkip: step.shouldSkip,
                config: u(step.config),
                routine: { connect: { id: parseInt(args.input.routineId.id) } },
              },
            });
            stepsOrdered.push(routineStep.id);
            newSteps.push(routineStep);
          }
        }

        const updatedRoutine = await tx.routine.update({
          ...query,
          where: { id: parseInt(args.input.routineId.id) },
          data: {
            isActive: u(args.input.isActive),
            name: u(args.input.name),
            actionName: u(args.input.actionName),
            time: u(args.input.time),
            repeats: u(args.input.repeats),
            ...(args.input.steps ? { stepsOrder: { set: stepsOrdered } } : {}),
          },
        });

        return {
          routine: updatedRoutine,
          newSteps,
        };
      });

      const plugins = await getPlugins();
      for (const step of newSteps) {
        if (!step.id) continue;
        const plugin = plugins[step.pluginSlug];
        if (!plugin) continue;
        await plugin.onAddRoutineStepEnd?.({ routine, step });
      }

      return routine;
    },
  }),
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
  }),
);
