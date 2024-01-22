import { definePlugin } from "@flowdev/plugin/server";
import cronParser from "cron-parser";

export const NUM_TASKS_IN_ADVANCE = "numTasksPerBatch";

export default definePlugin((opts) => {
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
        const newTasks = input.repeatingTasks;
        const currTasks = await opts.store.getItem<RepeatingTask[]>("repeatingTasks");

        const addedTasks = newTasks.filter(
          (task) => !currTasks?.value.find((t) => t.id === task.id),
        );
        const deletedTasks =
          currTasks?.value.filter((task) => !newTasks.find((t) => t.id === task.id)) ?? [];
        const updatedTasks = newTasks.filter(
          (task) =>
            !addedTasks.find((t) => t.id === task.id) &&
            !deletedTasks.find((t) => t.id === task.id),
        );
        const reEnabledTasks = updatedTasks.filter(
          (task) =>
            task.enabled && currTasks?.value.find((t) => t.id === task.id)?.enabled === false,
        );
        const disabledTasks = updatedTasks.filter(
          (task) =>
            !task.enabled && currTasks?.value.find((t) => t.id === task.id)?.enabled === true,
        );

        const timezone = await opts.getUsersTimezone();
        const numOfTasksInAdvance = await opts.store.getItem<number>(NUM_TASKS_IN_ADVANCE);
        for (const template of [...addedTasks, ...reEnabledTasks]) {
          const interval = cronParser.parseExpression(template.cron, {
            currentDate: new Date(),
            tz: timezone ?? undefined,
          });
          const pluginData = { repeatingTaskId: template.id };
          for (let i = 0; i < (numOfTasksInAdvance?.value ?? 10); i++) {
            const date = interval.next().toDate();
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
        for (const template of [...deletedTasks, ...disabledTasks]) {
          await opts.prisma.task.deleteMany({
            where: {
              date: { gte: input.currentDate },
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

        // update the store
        const repeatingTasks = await opts.store.setItem<RepeatingTask[]>(
          "repeatingTasks",
          input.repeatingTasks,
        );
        return {
          operationName: "repeatingTasks", // invalidates the frontend cache of the repeatingTasks operation
          data: repeatingTasks.value,
        };
      },
    },
  };
});

export type SetRepeatingTasksInput = {
  repeatingTasks: RepeatingTask[];
  currentDate: string;
};
