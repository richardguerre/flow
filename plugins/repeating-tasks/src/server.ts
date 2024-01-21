import { definePlugin } from "@flowdev/plugin/server";

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
      setRepeatingTasks: async (input) => {
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
