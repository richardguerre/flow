import { Prisma } from "@prisma/client";
import { builder } from "./builder";

export const RoutineStepType = builder.prismaNode("RoutineStep", {
  id: { field: "id", description: "The ID of the step" },
  fields: (t) => ({
    pluginSlug: t.exposeString("pluginSlug"),
    stepSlug: t.exposeString("stepSlug"),
    shouldSkip: t.exposeBoolean("shouldSkip"),
    config: t.expose("config", { type: "JSON", nullable: true }),
    routine: t.relation("routine"),
    routineId: t.exposeID("routineId"),
    templates: t.relation("templates"),
  }),
});

export const RoutineStepInput = builder.inputType(
  builder.inputRef<
    Omit<Prisma.RoutineStepCreateInput, "routine"> & {
      id: { typename: string; id: string } | undefined;
    }
  >("RoutineStepInput"),
  {
    fields: (t) => ({
      id: t.globalID({
        required: false,
        description: "The ID of the step if it exists. Leave empty or null to create a new step.",
      }),
      pluginSlug: t.string({ required: true }),
      stepSlug: t.string({ required: true }),
      shouldSkip: t.boolean({ required: true }),
      config: t.field({ type: "JSON", required: false }),
    }),
  },
);
