import { builder } from "./builder";

builder.queryField("testSubscription", (t) =>
  t.string({
    authScopes: { public: true },
    skipTypeScopes: true,
    smartSubscription: true,
    subscribe: (subs) => {
      subs.register("tasksCreated", {
        filter: (value) => {
          console.log(value);
          return Math.random() > 0.5;
        },
      });
    },
    resolve: () => {
      return Math.random().toString();
    },
  })
);
