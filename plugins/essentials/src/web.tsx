/**
 * This is the default plugin installed with the web app.
 */
import { definePlugin, PluginRoutineStepProps } from "@flowdev/plugin/web";

export default definePlugin((options) => {
  const Flow = options.components;
  const { motion } = options.framerMotion;
  const React = options.React;

  const animationDuration = 5;
  const TextTransitionStep = (props: PluginRoutineStepProps & { children: React.ReactNode }) => {
    React.useEffect(() => {
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
    name: "Essentials",
    routineSteps: {
      // Morning routine steps
      "intro-to-yesterday": {
        name: "Intro to yesterday",
        description: "Animated screen to get you in the mood to retrospect on yesterday.",
        component: (props) => <TextTransitionStep {...props}>Yesterday</TextTransitionStep>,
      },
      "retro-on-yesterday": {
        name: "Retro on yesterday",
        description:
          "Retro on yesterday by writing down a note. The default template is a list of tasks you did yesterday, and headers for what went well and what didn't go well.",
        component: (props) => {
          const [initialValue, setInitialValue] = React.useState<string | null>(null);
          const yesterday = options.dayjs().subtract(1, "day");

          React.useEffect(() => {
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
                      } ${task.title}</li>`,
                  )
                  .join("")}</ul>`,
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
        name: "Intro to today",
        description: "Animated screen to get you in the mood to plan for today.",
        component: (props) => <TextTransitionStep {...props}>Today</TextTransitionStep>,
      },
      "plan-for-today": {
        name: "Plan for today",
        description:
          "Plan for today by dragging items from your different lists into today's list.",
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
        name: "Today, tomorrow, next week",
        description:
          "Choose to move tasks from today to tomorrow or next week if you have too many.",
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
        name: "Today's plan",
        description:
          "Write down your plan for today so you can share it with others. By default, it's a list of tasks you plan to do today.",
        component: (props) => {
          const [initialValue, setInitialValue] = React.useState<string | null>(null);
          const today = options.dayjs();

          React.useEffect(() => {
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
                      }${task.title}</li>`,
                  )
                  .join("")}</ul>`,
              );
            })();
          }, []);

          return (
            <div>
              <Flow.NoteEditor
                slug={`flow-essentials_retro-${today.format("YYYY-MM-DD")}`}
                title={`Plan for ${today.format("MMMM D")}`}
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
        name: "Intro to today's shutdown",
        description: "Animated screen to get you in the mood to shutdown and retrospect on today.",
        component: (props) => (
          <TextTransitionStep {...props}>Let's reflect on what you did today</TextTransitionStep>
        ),
      },
      "clean-up-today": {
        name: "Clean up today",
        description: "Clean up today by marking tasks as done or canceling tasks.",
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
        name: "Retro on today",
        description:
          "Retro on today by writing down a note. The default template is a list of tasks you did today, and headers for what went well and what didn't go well.",
        component: (props) => {
          const [initialValue, setInitialValue] = React.useState<string | null>(null);
          const today = options.dayjs();

          React.useEffect(() => {
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
                      }${task.title}</li>`,
                  )
                  .join("")}</ul>`,
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
        name: "Intro to tomorrow",
        description: "Animated screen to get you in the mood to plan for tomorrow.",
        component: (props) => <TextTransitionStep {...props}>Tomorrow</TextTransitionStep>,
      },
      "plan-for-tomorrow": {
        name: "Plan for tomorrow",
        description:
          "Plan for tomorrow by dragging items from your different lists into tomorrow's list.",
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
