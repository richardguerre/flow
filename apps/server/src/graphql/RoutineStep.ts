import { Prisma } from "@prisma/client";
import { builder, u } from "./builder";
import { prisma } from "../utils/prisma";
import { TemplateInput } from "./Template";

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
      config: t.field({ type: "JSONObject", required: false }),
    }),
  },
);

// ------------- RoutineStep mutations ------------- //

builder.mutationField("updateRoutineStep", (t) =>
  t.prismaFieldWithInput({
    type: "RoutineStep",
    input: {
      id: t.input.globalID({
        description: "The ID of the routine step. It must exist.",
        required: true,
      }),
      shouldSkip: t.input.boolean({
        description: "Whether the step should be skipped or not.",
        required: false,
      }),
      config: t.input.field({
        description: "The config of the step. This can be any JSONObject",
        type: "JSONObject",
        required: false,
      }),
      templates: t.input.field({
        description: "The templates linked to the step.",
        type: [TemplateInput],
        required: false,
      }),
    },
    resolve: async (_, __, args) => {
      const routineStep = await prisma.routineStep.findUnique({
        where: { id: parseInt(args.input.id.id) },
        include: { templates: true },
      });
      const res = await prisma.routineStep.update({
        where: { id: parseInt(args.input.id.id) },
        data: {
          shouldSkip: u(args.input.shouldSkip),
          config: u(args.input.config),
          ...(args.input.templates
            ? {
                templates: {
                  upsert: args.input.templates.map((template) => ({
                    where: { slug: template.slug },
                    create: {
                      ...template,
                      metadata: u(template.metadata),
                    },
                    update: {
                      ...template,
                      metadata: u(template.metadata),
                    },
                  })),
                  delete: routineStep?.templates
                    .filter(
                      (template) => !args.input.templates?.some((t) => t.slug === template.slug),
                    )
                    .map((template) => ({ slug: template.slug })),
                },
              }
            : {}),
        },
      });
      return res;
    },
  }),
);
