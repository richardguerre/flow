import $Handlebars, { type HelperOptions } from "handlebars";
import asyncHelpersWrapper from "handlebars-async-helpers";
import { getPlugins } from "@flowdev/server/src/utils/getPlugins";
import { prisma } from "./prisma";
import { getUsersTimezone } from "./index";
import { dayjs } from "./dayjs";

type TemplateData = Partial<FlowDefaultData> & Record<string, any>;

export const Handlebars = asyncHelpersWrapper($Handlebars) as typeof $Handlebars;

export const renderTemplate = async (template: string, data: TemplateData) => {
  const plugins = await getPlugins();
  const helpers: TrueHelperDeclareSpec = {};
  for (const [pluginSlug, plugin] of Object.entries(plugins)) {
    if (plugin.handlebars?.helpers) {
      for (const [helperName, helper] of Object.entries(plugin.handlebars.helpers)) {
        helpers[`${pluginSlug}-${helperName}`] = function (this, context, ...args) {
          return helper.bind(this)(args.at(-1), context, ...args);
        };
      }
    }
  }
  Handlebars.registerHelper(helpers);
  const usersTimezone = (await getUsersTimezone()) ?? undefined;
  await registerFlowsDefaultHelpers({
    usersTimezone,
    include: {
      tasks: template.includes("tasks"),
      today: template.includes("today"),
    },
  });
  console.log("-- Handlebars.helpers", Handlebars.helpers);

  const defaultData = await getFlowsDefaultData({
    include: {
      yesterdaysTasks: !data.yesterdaysTasks && template.includes("yesterdaysTasks"),
      todaysTasks: !data.todaysTasks && template.includes("todaysTasks"),
      tomorrowsTasks: !data.tomorrowsTasks && template.includes("tomorrowsTasks"),
    },
  });

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

type FlowDefaultRegisters = {
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
    Handlebars.registerHelper("yesterday", async function (this: any, ...args) {
      const format = args.at(0) ?? "MMMM D, YYYY";
      const yesterday = today.subtract(1, "day");
      if (format === "ISO") return yesterday.toISOString();
      return yesterday.format(format ?? "MMMM D, YYYY");
    });
  }

  if (opts?.include?.today) {
    // helper to render today's date with the given format in args[0]
    Handlebars.registerHelper("today", async function (this: any, ...args) {
      const format = args.at(0) ?? "MMMM D, YYYY";
      if (format === "ISO") return today.toISOString();
      return today.format(format ?? "MMMM D, YYYY");
    });
  }

  if (opts?.include?.tomorrow) {
    // helper to render tomorrow's date with the given format in args[0]
    Handlebars.registerHelper("tomorrow", async function (this: any, ...args) {
      const format = args.at(0) ?? "MMMM D, YYYY";
      const tomorrow = today.add(1, "day");
      if (format === "ISO") return tomorrow.toISOString();
      return tomorrow.format(format);
    });
  }

  if (opts?.include?.tasks) {
    Handlebars.registerHelper("tasks", async function (this: any, ...args) {
      const options = args.at(-1) as Handlebars.HelperOptions | undefined;
      // possible the passed args are also templates that need to be rendered. Example: {{today 'ISO}}
      const arg0 = args.at(0);
      const prismaArgsRendered = !isHandlebarsCtx(arg0)
        ? await Handlebars.compile(JSON.stringify(arg0))(options?.data?.root ?? this ?? {})
        : "{}";
      const prismaArgs =
        (JSON.parse(prismaArgsRendered) as Parameters<typeof prisma.task.findMany>[0]) ?? {};

      const tasks = await prisma.task
        .findMany({
          ...prismaArgs,
          where: { date: today.toISOString(), ...prismaArgs.where },
        })
        .then((tasks) =>
          tasks.map((task) => {
            // remove wrapping <p> tags from the title
            const title = task.title.replace(/<p>(.*)<\/p>/, "$1");
            return { ...task, title: new Handlebars.SafeString(title) };
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
    });
  }
};

const isHandlebarsCtx = (arg: any) => {
  return arg && typeof arg === "object" && "lookupProperty" in arg;
};

export type PartialDeclareSpec = { [name: string]: HandlebarsTemplateDelegate };

/**
 * This type is for plugins to more easily declare handlebars helpers,
 * where the options is the first argument and the context is the second
 * argument, then the rest of the arguments are the arguments passed to the helper.
 */
export type HelperDeclareSpec = {
  [name: string]: {
    (
      /** The options object Handlebars provides. You can call `options.fn()` to render children of the helper block. */
      options?: HelperOptions,
      /** The arguments passed to the helper. `{{myHelper arg1 arg2 arg3}}` would be `[arg1, arg2, arg3]`. */
      ...args: any[]
    ): any | Promise<any>;
  };
};
type TrueHelperDeclareSpec = {
  [name: string]: (context: any, ...args: any[]) => any;
};
