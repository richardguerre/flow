import $Handlebars, { type HelperOptions } from "handlebars";
import asyncHelpersWrapper from "handlebars-async-helpers";
import { getPlugins } from "@flowdev/server/src/utils/getPlugins";
import { prisma } from "./prisma";
import { getUsersTimezone } from "./index";
import { dayjs } from "./dayjs";
import { Task } from "@prisma/client";
import htmlParser from "node-html-parser";
import { TaskInTemplate } from "../exportedTypes";

type TemplateData = Partial<FlowDefaultData> & Record<string, any>;

export const Handlebars = asyncHelpersWrapper($Handlebars) as typeof $Handlebars;

export const renderTemplate = async (template: string, data: TemplateData) => {
  console.log("renderTemplate()");
  const plugins = await getPlugins();
  const helpers: TrueHelperDeclareSpec = {};
  for (const [pluginSlug, plugin] of Object.entries(plugins)) {
    if (plugin.handlebars?.helpers) {
      for (const [helperName, helper] of Object.entries(plugin.handlebars.helpers)) {
        helpers[`${pluginSlug}-${helperName}`] = function (this, ...args) {
          return helper.bind(this)(args.at(-1), ...args);
        };
      }
    }
  }
  Handlebars.registerHelper(helpers);
  const usersTimezone = (await getUsersTimezone()) ?? undefined;
  await registerFlowsDefaultHelpers({
    usersTimezone,
    include: {
      "title-without-tags": template.includes("title-without-tags"),
      tasks: template.includes("tasks"),
      yesterday: template.includes("yesterday"),
      today: template.includes("today"),
      tomorrow: template.includes("tomorrow"),
    },
  });
  console.log("-- Handlebars.helpers", Handlebars.helpers);

  const defaultData = await getFlowsDefaultData({
    include: {},
  });
  console.log("-- defaultData", defaultData);

  const result = await Handlebars.compile(template)({
    ...defaultData,
    ...data,
  });

  return result;
};

type FlowDefaultData = {};

const getFlowsDefaultData = async (_opts?: {
  usersTimezone?: string;
  include?: { [key in keyof FlowDefaultData]?: boolean };
}): Promise<FlowDefaultData> => {
  // this is empty as I moved a lot of to the registerFlowsDefaultHelpers function instead
  return {};
};

/**
 * Register a handlebars helper the same way Flow plugins do (i.e. with the `options` argument first instead of last).
 */
function registerHelper(name: string, helper: HelperDeclareFunc) {
  return Handlebars.registerHelper(name, async function (this: any, ...args) {
    return helper.bind(this)(args.at(-1), ...args);
  });
}

type FlowDefaultRegisters = {
  "title-without-tags": boolean;
  tasks: boolean;
  yesterday: boolean;
  today: boolean;
  tomorrow: boolean;
};

const registerFlowsDefaultHelpers = async (opts?: {
  usersTimezone?: string;
  include?: Partial<FlowDefaultRegisters>;
}): Promise<void> => {
  const usersTimezone = opts?.usersTimezone ?? (await getUsersTimezone());
  const today = dayjs()
    .tz(usersTimezone ?? undefined)
    .utc(true)
    .startOf("day");
  if (opts?.include?.yesterday) {
    // helper to render yesterday's date with the given format in args[0]
    registerHelper("yesterday", async function (options: Handlebars.HelperOptions | undefined) {
      const format = options?.hash?.format ?? "MMMM D, YYYY";
      const yesterday = today.subtract(1, "day");
      if (format === "ISO") return yesterday.toISOString();
      return yesterday.format(format);
    });
  }

  if (opts?.include?.today) {
    // helper to render today's date with the given format in args[0]
    registerHelper("today", async function (options: Handlebars.HelperOptions | undefined) {
      const format = options?.hash?.format ?? "MMMM D, YYYY";
      if (format === "ISO") return today.toISOString();
      return today.format(format);
    });
  }

  if (opts?.include?.tomorrow) {
    // helper to render tomorrow's date with the given format in args[0]
    registerHelper("tomorrow", async function (options: Handlebars.HelperOptions | undefined) {
      const format = options?.hash?.format ?? "MMMM D, YYYY";
      const tomorrow = today.add(1, "day");
      if (format === "ISO") return tomorrow.toISOString();
      return tomorrow.format(format);
    });
  }

  if (opts?.include?.["title-without-tags"]) {
    registerHelper("title-without-tags", async function (this: Task) {
      if (!("title" in this)) return "";
      const titleParsed = htmlParser.parse(this.title);
      // remove wrapping <p> tags from the title
      titleParsed.querySelectorAll("p").forEach((tag) => {
        tag.replaceWith(tag.innerHTML);
      });
      // remove task tags
      titleParsed.querySelectorAll("span[data-tasktag-id]").forEach((tag) => {
        tag.replaceWith("");
      });
      return new Handlebars.SafeString(titleParsed.toString());
    });
  }

  if (opts?.include?.tasks) {
    registerHelper(
      "tasks",
      async function (this: any, options: Handlebars.HelperOptions | undefined) {
        // possible the passed filter also contains templates that need to be rendered.
        // Example: {{today format='ISO'}}
        const filter = options?.hash?.filter ?? {};
        const prismaArgsRendered = !isHandlebarsCtx(filter)
          ? await Handlebars.compile(JSON.stringify(filter))(options?.data?.root ?? this ?? {})
          : "{}";
        const prismaArgs =
          (JSON.parse(prismaArgsRendered) as Parameters<typeof prisma.task.findMany>[0]) ?? {};

        const tasks = await prisma.task
          .findMany({
            ...prismaArgs,
            where: { date: today.toISOString(), ...prismaArgs.where },
            include: { tags: true, pluginDatas: true, item: { select: { id: true } } },
          })
          .then((tasks) =>
            tasks.map((task) => {
              // remove wrapping <p> tags from the title
              const titleParsed = htmlParser.parse(task.title);
              titleParsed.querySelectorAll("p").forEach((tag) => {
                tag.replaceWith(tag.innerHTML);
              });
              return {
                ...task,
                title: new Handlebars.SafeString(titleParsed.toString()),
              } satisfies TaskInTemplate;
            }),
          );

        if (!options) {
          if (!tasks.length) return `No tasks.`;
          // they're not using the helper as a block helper so just return the default list of tasks
          return new Handlebars.SafeString(
            `<ul>${tasks.map((task) => `<li>${task.title}</li>`).join("")}</ul>`,
          );
        }

        if (!tasks.length) {
          return options.inverse(this); // if there are no tasks, render the inverse block
        }

        let res = "";
        for (const task of tasks) {
          res += await options.fn(task); // have to await the options.fn() call as children can have async helpers as well
        }
        return res;
      },
    );
  }
};

const isHandlebarsCtx = (arg: any) => {
  return arg && typeof arg === "object" && "lookupProperty" in arg;
};

export type PartialDeclareSpec = { [name: string]: HandlebarsTemplateDelegate };

type HelperDeclareFunc = {
  (
    /** The options object Handlebars provides. You can call `options.fn()` to render children of the helper block. */
    options?: HelperOptions,
    /** The arguments passed to the helper. `{{myHelper arg1 arg2 arg3}}` would be `[arg1, arg2, arg3]`. */
    ...args: any[]
  ): any | Promise<any>;
};

/**
 * This type is for plugins to more easily declare handlebars helpers,
 * where the options is the first argument and the context is the second
 * argument, then the rest of the arguments are the arguments passed to the helper.
 */
export type HelperDeclareSpec = {
  [name: string]: HelperDeclareFunc;
};
type TrueHelperDeclareSpec = {
  [name: string]: (context: any, ...args: any[]) => any;
};
