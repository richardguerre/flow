import { GraphQLError } from "graphql";
import { prisma } from "../utils/prisma";
import { renderTemplate } from "../utils/renderTemplate";
import { builder, u } from "./builder";
import { urlSafe, verifyUrlSafe } from "../utils/urlSafe";
import { Prisma } from "@prisma/client";

export const TemplateType = builder.prismaNode("Template", {
  id: { field: "slug" },
  fields: (t) => ({
    slug: t.exposeString("slug"),
    createdAt: t.expose("createdAt", { type: "DateTime" }),
    updatedAt: t.expose("updatedAt", { type: "DateTime" }),
    metadata: t.expose("metadata", { type: "JSON", nullable: true }),
    routineStep: t.relation("routineStep"),
    routineStepId: t.exposeID("routineStepId", { nullable: true }),
    raw: t.exposeString("template"),
    rendered: t.fieldWithInput({
      type: "String",
      description:
        "The rendered template given the data as input. If no data is given, the template will be rendered with the default data.",
      argOptions: {
        required: false,
      },
      input: {
        data: t.input.field({ type: "JSONObject", required: false }),
      },
      resolve: async (template, args) => {
        const result = await renderTemplate(template.template, args.input?.data ?? {});
        return result;
      },
    }),
  }),
});

// -------------------- query fields ------------------------

builder.queryField("template", (t) =>
  t.prismaField({
    type: "Template",
    description: `Get a template by its slug.`,
    nullable: true,
    args: { slug: t.arg.string({ required: true, description: "The slug of the template." }) },
    resolve: async (_, __, args) => {
      return prisma.template.findUnique({ where: { slug: urlSafe(args.slug) } });
    },
  }),
);

// -------------------- mutation fields ------------------------

export const TemplateInput = builder.inputType(
  builder.inputRef<
    Omit<Prisma.TemplateCreateInput, "routineStep" | "template"> & {
      id: { typename: string; id: string } | undefined;
    }
  >("TemplateInput"),
  {
    fields: (t) => ({
      id: t.globalID({
        required: false,
        description: "The ID of the template to update. Not required when creating a new template.",
      }),
      slug: t.string({ required: true }),
      template: t.string({ required: true }),
      metadata: t.field({ type: "JSONObject", required: false }),
      routineStepId: t.globalID({
        required: false,
        description: "The ID of the routine step to link the template to.",
      }),
    }),
  },
);

builder.mutationField("createTemplate", (t) =>
  t.prismaField({
    type: "Template",
    description: `Create a new template and link it to a routine step.`,
    args: {
      input: t.arg({ type: TemplateInput, required: true }),
    },
    resolve: async (_, __, args) => {
      const routineStep =
        args.input.routineStepId?.id && !Number.isNaN(parseInt(args.input.routineStepId.id))
          ? await prisma.routineStep.findUnique({
              where: { id: parseInt(args.input.routineStepId.id) },
              include: { routine: true },
            })
          : null;
      if (!routineStep && args.input.routineStepId?.id) {
        throw new GraphQLError("Routine step not found.", {
          extensions: {
            code: "ROUTINE_STEP_NOT_FOUND",
            userFriendlyMessage:
              "No routine step was found to link the template to. Please try refreshing the page and try again.",
          },
        });
      }

      // verify slug is URL safe.
      const slug = urlSafe(args.input.slug);
      if (!verifyUrlSafe(slug)) {
        throw new GraphQLError("Slug is not URL safe.", {
          extensions: {
            code: "SLUG_NOT_URL_SAFE",
            userFriendlyMessage:
              "The slug is not URL safe. Please try again with a different slug.",
          },
        });
      }

      // verify template is valid
      await renderTemplate(args.input.template, {}).catch((err) => {
        throw new GraphQLError(err.message, {
          extensions: {
            code: "INVALID_TEMPLATE",
            userFriendlyMessage:
              "The template is not valid. Please try again with a different template.",
          },
        });
      });

      return prisma.template.create({
        data: {
          slug,
          template: args.input.template,
          metadata: u(args.input.metadata),
          routineStepId: routineStep?.id,
        },
      });
    },
  }),
);

builder.mutationField("updateTemplate", (t) =>
  t.prismaFieldWithInput({
    type: "Template",
    description: `Update a template.`,
    input: {
      id: t.input.globalID({
        required: true,
        description: "The Relay ID of the template to update.",
      }),
      newSlug: t.input.string({ required: false }),
      raw: t.input.string({ required: false }),
      metadata: t.input.field({ type: "JSON", required: false }),
      routineStepId: t.input.globalID({
        required: false,
        description: "The Relay ID of the routine step to link the template to.",
      }),
    },
    resolve: async (_, __, args) => {
      const routineStep =
        args.input.routineStepId?.id && !Number.isNaN(parseInt(args.input.routineStepId.id))
          ? await prisma.routineStep.findUnique({
              where: { id: parseInt(args.input.routineStepId.id) },
              include: { routine: true },
            })
          : null;
      if (!routineStep && args.input.routineStepId?.id) {
        throw new GraphQLError("Routine step not found.", {
          extensions: {
            code: "ROUTINE_STEP_NOT_FOUND",
            userFriendlyMessage:
              "No routine step was found to link the template to. Please try refreshing the page and try again.",
          },
        });
      }

      // verify slug is URL safe.
      const slug = args.input.newSlug ? urlSafe(args.input.newSlug) : undefined;
      if (slug && !verifyUrlSafe(slug)) {
        throw new GraphQLError("Slug is not URL safe.", {
          extensions: {
            code: "SLUG_NOT_URL_SAFE",
            userFriendlyMessage:
              "The slug is not URL safe. Please try again with a different slug.",
          },
        });
      }

      // verify template is valid
      if (args.input.raw) {
        await renderTemplate(args.input.raw, {}).catch((err) => {
          throw new GraphQLError(err.message, {
            extensions: {
              code: "INVALID_TEMPLATE",
              userFriendlyMessage:
                "The template is not valid. Please try again with a different template.",
            },
          });
        });
      }

      return prisma.template.update({
        where: { slug: args.input.id.id },
        data: {
          slug,
          template: u(args.input.raw),
          metadata: u(args.input.metadata),
          routineStepId: routineStep?.id,
        },
      });
    },
  }),
);

builder.mutationField("createOrUpdateTemplate", (t) =>
  t.prismaFieldWithInput({
    type: "Template",
    description: `Create or update a template.`,
    input: {
      slug: t.input.string({ required: true }),
      raw: t.input.string({ required: true }),
      metadata: t.input.field({ type: "JSON", required: false }),
      routineStepId: t.input.globalID({
        required: false,
        description: "The Relay ID of the routine step to link the template to.",
      }),
    },
    resolve: async (_, __, args) => {
      const routineStep =
        args.input.routineStepId?.id && !Number.isNaN(parseInt(args.input.routineStepId.id))
          ? await prisma.routineStep.findUnique({
              where: { id: parseInt(args.input.routineStepId.id) },
              include: { routine: true },
            })
          : null;
      if (!routineStep && args.input.routineStepId?.id) {
        throw new GraphQLError("Routine step not found.", {
          extensions: {
            code: "ROUTINE_STEP_NOT_FOUND",
            userFriendlyMessage:
              "No routine step was found to link the template to. Please try refreshing the page and try again.",
          },
        });
      }

      // verify slug is URL safe.
      const slug = urlSafe(args.input.slug);
      if (!verifyUrlSafe(slug)) {
        throw new GraphQLError("Slug is not URL safe.", {
          extensions: {
            code: "SLUG_NOT_URL_SAFE",
            userFriendlyMessage:
              "The slug is not URL safe. Please try again with a different slug.",
          },
        });
      }

      // verify template is valid
      await renderTemplate(args.input.raw, {}).catch((err) => {
        throw new GraphQLError(err.message, {
          extensions: {
            code: "INVALID_TEMPLATE",
            userFriendlyMessage:
              "The template is not valid. Please try again with a different template.",
          },
        });
      });

      return prisma.template.upsert({
        where: { slug: args.input.slug },
        create: {
          slug,
          template: args.input.raw,
          metadata: u(args.input.metadata),
          routineStepId: routineStep?.id,
        },
        update: {
          template: args.input.raw,
          metadata: u(args.input.metadata),
          routineStepId: routineStep?.id,
        },
      });
    },
  }),
);

builder.mutationField("deleteTemplate", (t) =>
  t.prismaField({
    type: "Template",
    description: `Delete a template.`,
    args: {
      id: t.arg.globalID({
        required: true,
        description: "The Relay ID of the template to delete.",
      }),
    },
    resolve: async (_, __, args) => {
      const template = await prisma.template.delete({
        where: { slug: args.id.id },
      });
      return template;
    },
  }),
);
