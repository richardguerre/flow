import { GraphQLError } from "graphql";
import { builder } from "./builder";
import { renderTemplate } from "../utils/renderTemplate";

builder.queryField("renderTemplate", (t) =>
  t.fieldWithInput({
    type: "String",
    description:
      "Render a template string with the given data. Plugin helpers and partials can be used in the template.",
    input: {
      template: t.input.string({ required: true }),
      data: t.input.field({ type: "JSON", required: true }),
    },
    resolve: async (_, args) => {
      const template = args.input.template;
      const data = args.input.data as Record<string, any>;
      if (typeof data !== "object") throw new GraphQLError("Data must be an object.");
      return renderTemplate(template, data);
    },
  }),
);
