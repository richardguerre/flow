/**
 * This is the default plugin installed with the web app.
 */
import { definePlugin, PluginRoutineStepProps } from "@flowdev/plugin/web";
import { useEffect, useState } from "react";

export default definePlugin((options) => {
  const Flow = options.components;
  const { motion } = options.framerMotion;

  const animationDuration = 5;
  const TextTransitionStep = (props: PluginRoutineStepProps & { children: React.ReactNode }) => {
    useEffect(() => {
      const timer = setTimeout(props.onNext, animationDuration * 1000);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div
        className="flex h-screen w-screen items-center justify-center bg-gray-100"
        onClick={props.onNext}
      >
        <motion.div
          className="text-6xl font-semibold"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: animationDuration, times: [0, 0.7, 1] }}
        >
          {props.children}
        </motion.div>
      </div>
    );
  };

  return {
    slug: "flow-essentials",
    routineSteps: {
      // Morning routine steps
      "intro-to-yesterday": {
        component: (props) => <TextTransitionStep {...props}>Yesterday</TextTransitionStep>,
      },
      "retro-on-yesterday": {
        component: (props) => {
          const [initialValue, setInitialValue] = useState<string | null>(null);
          const yesterday = options.dayjs().subtract(1, "day");

          useEffect(() => {
            (async () => {
              const days = await options.getDays({
                from: yesterday.toDate(),
                to: yesterday.toDate(),
                include: { tasks: true },
              });
              if (!days.length) {
                setInitialValue("");
                return;
              }
              const day = days[0];
              /**
               * Example output:
               * <ul>
               *  <li>✅ Task 1</li>
               *  <li>❌ Task 2</li>
               *  <li>⏳ Task 3</li>
               * </ul>
               */
              setInitialValue(
                `<ul>${day.tasks
                  .map(
                    (task) =>
                      `<li>${
                        task.status === "DONE" ? "✅" : task.status === "CANCELED" ? "❌" : "⏳"
                      } ${task.title}</li>`
                  )
                  .join("")}</ul>`
              );
            })();
          }, []);

          return (
            <div>
              <Flow.NoteEditor
                slug={`flow-essentials_retro-${yesterday.format("YYYY-MM-DD")}`}
                title={`Retro of ${yesterday.format("MMMM D")}`}
                loading={initialValue === null}
                initialValue={initialValue ?? ""}
              />
              <props.BackButton />
              <props.NextButton />
            </div>
          );
        },
      },
      "intro-to-today": {
        component: (props) => <TextTransitionStep {...props}>Today</TextTransitionStep>,
      },
      "plan-for-today": {
        component: (props) => {
          const today = options.dayjs();
          const [days, loadingDays] = options.hooks.useAsyncLoader(async () => {
            return await options.getDays({
              from: today.toDate(),
              to: today.toDate(),
              toRender: { Day: true },
            });
          });

          const day = days?.[0];

          if (loadingDays) {
            return <>Loading...</>;
          }

          return (
            <div>
              <div>
                <props.BackButton />
                <props.NextButton />
              </div>
              <Flow.Day day={day} label="Today" />
            </div>
          );
        },
      },
      "today-tomorrow-next-week": {
        component: (props) => {
          const today = options.dayjs();
          const tomorrow = today.add(1, "day");
          const nextWeek = today.weekday(7);
          const [days, loadingDays] = options.hooks.useAsyncLoader(async () => {
            return await options.getDaysMax10({
              dates: [today.toDate(), tomorrow.toDate(), nextWeek.toDate()],
              toRender: { Day: true },
            });
          });

          if (loadingDays) {
            return <>Loading...</>;
          }

          return (
            <div>
              <div>
                <props.BackButton />
                <props.NextButton />
              </div>
              <div className="flex">
                <Flow.Day day={days?.[0]} label="Today" />
                <Flow.Day day={days?.[1]} label="Tomorrow" />
                <Flow.Day day={days?.[2]} label="Next week" />
              </div>
            </div>
          );
        },
      },
      // TODO: Implement `decide-shutdown-time` step
      // "decide-shutdown-time": {
      //   component: (props) => {
      //     const handleSetShutdownTime =
      //     return (<></>)},
      // },
      "todays-plan": {
        component: (props) => {
          const [initialValue, setInitialValue] = useState<string | null>(null);
          const today = options.dayjs();

          useEffect(() => {
            (async () => {
              const days = await options.getDays({
                from: today.toDate(),
                to: today.toDate(),
                include: { tasks: true },
              });
              if (!days.length) {
                setInitialValue("");
                return;
              }
              const day = days[0];
              /**
               * Example output:
               * <ul>
               *  <li>✅ Task 1</li>
               *  <li>❌ Task 2</li>
               *  <li>Task 3</li>
               * </ul>
               */
              setInitialValue(
                `<ul>${day.tasks
                  .map(
                    (task) =>
                      `<li>${
                        task.status === "DONE" ? "✅ " : task.status === "CANCELED" ? "❌ " : ""
                      }${task.title}</li>`
                  )
                  .join("")}</ul>`
              );
            })();
          }, []);

          return (
            <div>
              <Flow.NoteEditor
                slug={`flow-essentials_retro-${today.format("YYYY-MM-DD")}`}
                title={`Retro of ${today.format("MMMM D")}`}
                loading={initialValue === null}
                initialValue={initialValue ?? ""}
              />
              <props.BackButton />
              <props.NextButton />
            </div>
          );
        },
      },
      // Shutdown routine steps
      "intro-to-todays-shutdown": {
        component: (props) => (
          <TextTransitionStep {...props}>Let's reflect on what you did today</TextTransitionStep>
        ),
      },
      "clean-up-today": {
        component: (props) => {
          const today = options.dayjs();
          const [days, loadingDays] = options.hooks.useAsyncLoader(async () => {
            return await options.getDays({
              from: today.toDate(),
              to: today.toDate(),
              toRender: { Day: true },
            });
          });

          const day = days?.[0];

          if (loadingDays) {
            return <>Loading...</>;
          }

          return (
            <div>
              <div>
                <props.BackButton />
                <props.NextButton />
              </div>
              <Flow.Day day={day} label="Today" />
            </div>
          );
        },
      },
      "retro-on-today": {
        component: (props) => {
          const [initialValue, setInitialValue] = useState<string | null>(null);
          const today = options.dayjs();

          useEffect(() => {
            (async () => {
              const days = await options.getDays({
                from: today.toDate(),
                to: today.toDate(),
                include: { tasks: true },
              });
              if (!days.length) {
                setInitialValue("");
                return;
              }
              const day = days[0];
              /**
               * Example output:
               * <ul>
               *  <li>✅ Task 1</li>
               *  <li>❌ Task 2</li>
               *  <li>Task 3</li>
               * </ul>
               */
              setInitialValue(
                `<ul>${day.tasks
                  .map(
                    (task) =>
                      `<li>${
                        task.status === "DONE" ? "✅ " : task.status === "CANCELED" ? "❌ " : ""
                      }${task.title}</li>`
                  )
                  .join("")}</ul>`
              );
            })();
          }, []);

          return (
            <div>
              <Flow.NoteEditor
                slug={`flow-essentials_retro-${today.format("YYYY-MM-DD")}`}
                title={`Retro of ${today.format("MMMM D")}`}
                loading={initialValue === null}
                initialValue={initialValue ?? ""}
              />
              <props.BackButton />
              <props.NextButton />
            </div>
          );
        },
      },
      "intro-to-tomorrow": {
        component: (props) => <TextTransitionStep {...props}>Tomorrow</TextTransitionStep>,
      },
      "plan-for-tomorrow": {
        component: (props) => {
          const tomorrow = options.dayjs().add(1, "day");
          const [days, loadingDays] = options.hooks.useAsyncLoader(async () => {
            return await options.getDays({
              from: tomorrow.toDate(),
              to: tomorrow.toDate(),
              toRender: { Day: true },
            });
          });

          const day = days?.[0];

          if (loadingDays) {
            return <>Loading...</>;
          }

          return (
            <div>
              <div>
                <props.BackButton />
                <props.NextButton />
              </div>
              <Flow.Day day={day} label="Tomorrow" />
            </div>
          );
        },
      },
    },
  };
});
