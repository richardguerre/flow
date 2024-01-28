import { definePlugin } from "@flowdev/plugin/server";
import cronParser from "cron-parser";

export const NUM_TASKS_IN_ADVANCE = "numTasksPerBatch";
const NUM_TASKS_IN_ADVANCE_DEFAULT = 10;
const log = console.log;
// const log = (..._args: any) => {};
export default definePlugin((opts) => {
  const CREATE_TASKS_JOB_NAME = `${opts.pluginSlug}-create-tasks-schedule`;
  return {
    operations: {
      repeatingTasks: async () => {
        const repeatingTasks = await opts.store.getItem<RepeatingTask[]>("repeatingTasks");
        return {
          operationName: "repeatingTasks",
          data: repeatingTasks?.value ?? [],
        };
      },
      setRepeatingTasks: async (input: SetRepeatingTasksInput) => {
        log("setRepeatingTasks");
        const newTasks = input.repeatingTasks;
        const currTasks = await opts.store.getItem<RepeatingTask[]>("repeatingTasks");
        log("currTasks", currTasks);

        const addedTasks = newTasks.filter(
          (task) => !currTasks?.value.find((t) => t.id === task.id),
        );
        log("addedTasks", addedTasks);
        const deletedTasks =
          currTasks?.value.filter((task) => !newTasks.find((t) => t.id === task.id)) ?? [];
        log("deletedTasks", deletedTasks);
        const updatedTasks = newTasks.filter(
          (task) =>
            !addedTasks.find((t) => t.id === task.id) &&
            !deletedTasks.find((t) => t.id === task.id),
        );
        log("updatedTasks", updatedTasks);
        const reEnabledTasks = updatedTasks.filter(
          (task) =>
            task.enabled && currTasks?.value.find((t) => t.id === task.id)?.enabled === false,
        );
        log("reEnabledTasks", reEnabledTasks);
        const disabledTasks = updatedTasks.filter(
          (task) =>
            !task.enabled && currTasks?.value.find((t) => t.id === task.id)?.enabled === true,
        );
        log("disabledTasks", disabledTasks);
        const updatedOnlyTasks = updatedTasks.filter(
          (task) =>
            !reEnabledTasks.find((t) => t.id === task.id) &&
            !disabledTasks.find((t) => t.id === task.id),
        );

        const timezone = await opts.getUsersTimezone();
        log("timezone", timezone);
        const numOfTasksInAdvance = await opts.store.getItem<number>(NUM_TASKS_IN_ADVANCE);
        log("numOfTasksInAdvance", numOfTasksInAdvance);
        for (const template of [...addedTasks, ...reEnabledTasks]) {
          log("template", template);
          const interval = cronParser.parseExpression(template.cron, {
            currentDate: new Date(),
            tz: timezone ?? undefined,
            utc: true,
          });
          const pluginData = { repeatingTaskId: template.id };
          for (let i = 0; i < (numOfTasksInAdvance?.value ?? NUM_TASKS_IN_ADVANCE_DEFAULT); i++) {
            const date = interval.next().toDate();
            log("i, date", i, date);
            await opts.prisma.task.create({
              data: {
                title: template.title,
                durationInMinutes: template.durationInMinutes,
                pluginDatas: {
                  create: {
                    pluginSlug: opts.pluginSlug,
                    min: pluginData,
                    full: pluginData,
                  },
                },
                day: {
                  connectOrCreate: {
                    where: { date },
                    create: { date },
                  },
                },
              },
            });
          }
        }
        log("for loop for addedTasks, reEnabledTasks done");
        for (const template of [...deletedTasks, ...disabledTasks]) {
          await opts.prisma.task.deleteMany({
            where: {
              status: { equals: "TODO" },
              pluginDatas: {
                some: {
                  pluginSlug: opts.pluginSlug,
                  min: {
                    path: ["repeatingTaskId"],
                    equals: template.id,
                  },
                },
              },
            },
          });
        }
        log("for loop for deletedTasks, disabledTasks done");
        for (const template of updatedOnlyTasks) {
          await opts.prisma.task.updateMany({
            where: {
              status: { equals: "TODO" },
              pluginDatas: {
                some: {
                  pluginSlug: opts.pluginSlug,
                  min: {
                    path: ["repeatingTaskId"],
                    equals: template.id,
                  },
                },
              },
            },
            data: {
              title: template.title,
              durationInMinutes: template.durationInMinutes,
            },
          });
        }
        log("for loop for updatedOnlyTasks done");

        if (input.repeatingTasks.length > 0) {
          opts.pgBoss.schedule(CREATE_TASKS_JOB_NAME, "0 0 * * *");
        }

        // update the store
        const repeatingTasks = await opts.store.setItem<RepeatingTask[]>(
          "repeatingTasks",
          input.repeatingTasks,
        );
        log("repeatingTasks", repeatingTasks);
        return {
          operationName: "repeatingTasks", // invalidates the frontend cache of the repeatingTasks operation
          data: repeatingTasks.value,
        };
      },
    },
    handlePgBossWork: (work) => [
      work(CREATE_TASKS_JOB_NAME, async () => {
        log(`job: ${CREATE_TASKS_JOB_NAME} started`);
        const repeatingTasks = await opts.store.getItem<RepeatingTask[]>("repeatingTasks");
        log("repeatingTasks", repeatingTasks);
        const timezone = await opts.getUsersTimezone();
        log("timezone", timezone);
        const numOfTasksInAdvance = await opts.store.getItem<number>(NUM_TASKS_IN_ADVANCE);
        log("numOfTasksInAdvance", numOfTasksInAdvance);
        for (const template of repeatingTasks?.value ?? []) {
          log("template", template);
          const currentTasksLeft = await opts.prisma.task.findMany({
            select: { date: true },
            where: {
              status: { equals: "TODO" },
              pluginDatas: {
                some: {
                  pluginSlug: opts.pluginSlug,
                  min: {
                    path: ["repeatingTaskId"],
                    equals: template.id,
                  },
                },
              },
            },
          });
          log("currentTasksLeft", currentTasksLeft.length);
          if (
            currentTasksLeft.length >
            (numOfTasksInAdvance?.value ?? NUM_TASKS_IN_ADVANCE_DEFAULT) / 2
          ) {
            log("skipping template:", template.id, template.title);
            continue;
          }
          const lastTaskLeft = currentTasksLeft[currentTasksLeft.length - 1];
          const interval = cronParser.parseExpression(template.cron, {
            currentDate:
              opts
                .dayjs(lastTaskLeft?.date)
                .add(1, "day")
                .toDate() ?? new Date(),
            tz: timezone ?? undefined,
            utc: true,
          });
          const pluginData = { repeatingTaskId: template.id };
          for (let i = 0; i < (numOfTasksInAdvance?.value ?? NUM_TASKS_IN_ADVANCE_DEFAULT); i++) {
            const date = interval.next().toDate();
            log("i, date", i, date);
            await opts.prisma.task.create({
              data: {
                title: template.title,
                durationInMinutes: template.durationInMinutes,
                date,
                pluginDatas: {
                  create: {
                    pluginSlug: opts.pluginSlug,
                    min: pluginData,
                    full: pluginData,
                  },
                },
              },
            });
          }
        }
      }),
    ],
  };
});

export type SetRepeatingTasksInput = {
  repeatingTasks: RepeatingTask[];
  currentDate: string;
};
