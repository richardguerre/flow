import { definePlugin } from "@flowdev/plugin/server";
import { NUM_TASKS_IN_ADVANCE } from "./utils";
import cronParser from "cron-parser";

const NUM_TASKS_IN_ADVANCE_DEFAULT = 10;
const generateId = () => Date.now().toString();
const log = console.log;
// const log = (..._args: any) => {};
export default definePlugin((opts) => {
  const CREATE_TASKS_JOB_NAME = `create-tasks-schedule`;
  const REMOVE_FUTURE_TASKS_JOB_NAME = `remove-future-tasks-schedule`;
  const operationRepeatingTasks = async () => {
    const repeatingTasks = await opts.store.getItem<RepeatingTasksInStore>("repeatingTasks");
    return {
      operationName: "repeatingTasks",
      data: repeatingTasks?.value ?? [],
    };
  };
  return {
    operations: {
      repeatingTasks: operationRepeatingTasks,
      addRepeatingTask: async (input: AddRepeatingTaskInput) => {
        const currentRepeatingTasks = await opts.store
          .getItem<RepeatingTasksInStore>("repeatingTasks")
          .then((item) => item?.value ?? []);

        const newRepeatingTasks = [
          ...currentRepeatingTasks,
          {
            id: generateId(),
            title: input.title,
            cron: input.cron,
            simplified: input.simplified,
            durationInMinutes: input.durationInMinutes,
            enabled: true,
          } satisfies RepeatingTask,
        ];
        const repeatingTasksItemUpdated = await opts.store.setItem<RepeatingTasksInStore>(
          "repeatingTasks",
          newRepeatingTasks,
        );
        log("repeatingTasks", repeatingTasksItemUpdated);
        if (repeatingTasksItemUpdated.value.length > 0) {
          // this operation is idempotent, so we can safely schedule the job again
          await opts.pgBoss.schedule(CREATE_TASKS_JOB_NAME, "0 0 * * *");
        }
        // create initial tasks
        await opts.pgBoss.send(CREATE_TASKS_JOB_NAME, {});

        return {
          operationName: "repeatingTasks", // invalidates the frontend cache of the repeatingTasks operation
          data: repeatingTasksItemUpdated.value,
        };
      },
      editRepeatingTask: async (input: EditRepeatingTaskInput) => {
        const currentRepeatingTasks = await opts.store
          .getItem<RepeatingTasksInStore>("repeatingTasks")
          .then((item) => item?.value ?? []);

        const updatedRepeatingTasks = currentRepeatingTasks.map((task) => {
          if (task.id !== input.id) {
            return task;
          }
          return {
            ...task,
            ...input,
          } satisfies RepeatingTask;
        });
        const repeatingTasksItemUpdated = await opts.store.setItem<RepeatingTasksInStore>(
          "repeatingTasks",
          updatedRepeatingTasks,
        );
        log("repeatingTasks", repeatingTasksItemUpdated);
        if (repeatingTasksItemUpdated.value.length > 0) {
          // this operation is idempotent, so we can safely schedule the job again
          await opts.pgBoss.schedule(CREATE_TASKS_JOB_NAME, "0 0 * * *");
        } else {
          await opts.pgBoss.unschedule(CREATE_TASKS_JOB_NAME);
        }

        // recreate future tasks
        await opts.pgBoss.send(REMOVE_FUTURE_TASKS_JOB_NAME, {
          repeatingTaskId: input.id,
          recreate: true,
        });

        return {
          operationName: "repeatingTasks", // invalidates the frontend cache of the repeatingTasks operation
          data: repeatingTasksItemUpdated.value,
        };
      },
      removeRepeatingTask: async (input: RemoveRepeatingTaskInput) => {
        const currentRepeatingTasks = await opts.store
          .getItem<RepeatingTasksInStore>("repeatingTasks")
          .then((item) => item?.value ?? []);

        const updatedRepeatingTasks = currentRepeatingTasks.filter((task) => task.id !== input.id);
        const repeatingTasksItemUpdated = await opts.store.setItem<RepeatingTasksInStore>(
          "repeatingTasks",
          updatedRepeatingTasks,
        );
        log("repeatingTasks", repeatingTasksItemUpdated);
        if (repeatingTasksItemUpdated.value.length > 0) {
          // this operation is idempotent, so we can safely schedule the job again
          await opts.pgBoss.schedule(CREATE_TASKS_JOB_NAME, "0 0 * * *");
        } else {
          await opts.pgBoss.unschedule(CREATE_TASKS_JOB_NAME);
        }

        // remove future tasks
        await opts.pgBoss.send(REMOVE_FUTURE_TASKS_JOB_NAME, { repeatingTaskId: input.id });

        return {
          operationName: "repeatingTasks", // invalidates the frontend cache of the repeatingTasks operation
          data: repeatingTasksItemUpdated.value,
        };
      },
    },
    handlePgBossWork: (work) => [
      work(CREATE_TASKS_JOB_NAME, async () => {
        log(`job: ${CREATE_TASKS_JOB_NAME} started`);
        const repeatingTasks = await opts.store.getItem<RepeatingTasksInStore>("repeatingTasks");
        log("repeatingTasks", repeatingTasks);
        const timezone = await opts.getUsersTimezone();
        log("timezone", timezone);
        const numOfTasksInAdvance = await opts.store
          .getItem<number>(NUM_TASKS_IN_ADVANCE)
          .then((item) => item?.value ?? NUM_TASKS_IN_ADVANCE_DEFAULT);
        log("numOfTasksInAdvance", numOfTasksInAdvance);
        for (const template of repeatingTasks?.value ?? []) {
          if (!template.enabled) continue;
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
          if (currentTasksLeft.length > numOfTasksInAdvance / 2) {
            log("skipping template:", template.id, template.title);
            continue;
          }
          const lastTaskLeft = currentTasksLeft[currentTasksLeft.length - 1];
          const interval = cronParser.parseExpression(template.cron, {
            currentDate: opts.dayjs(lastTaskLeft?.date).subtract(1, "day").toDate() ?? new Date(),
            tz: timezone ?? undefined,
            utc: true,
          });
          const pluginData = { repeatingTaskId: template.id };
          for (let i = 0; i < numOfTasksInAdvance; i++) {
            const date = interval.next().toDate();
            log("i, date", i, date);
            await opts.prisma.task
              .create({
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
                  day: { connectOrCreate: { where: { date }, create: { date } } },
                },
              })
              .catch(log);
          }
        }
      }),
      work(REMOVE_FUTURE_TASKS_JOB_NAME, async (job) => {
        const { repeatingTaskId, recreate } = job.data as JobRemoveFutureTasks;

        log(`job: ${REMOVE_FUTURE_TASKS_JOB_NAME} started for repeatingTaskId: ${repeatingTaskId}`);
        // delete all future tasks
        await opts.prisma.task.deleteMany({
          where: {
            status: { equals: "TODO" },
            pluginDatas: {
              some: {
                pluginSlug: opts.pluginSlug,
                min: {
                  path: ["repeatingTaskId"],
                  equals: repeatingTaskId,
                },
              },
            },
          },
        });

        if (recreate) {
          await opts.pgBoss.send(CREATE_TASKS_JOB_NAME, {});
        }
      }),
    ],
  };
});

type RepeatingTasksInStore = RepeatingTask[];

type JobRemoveFutureTasks = {
  repeatingTaskId: string;
  recreate?: boolean;
};
