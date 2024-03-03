import { definePlugin } from "@flowdev/plugin/web";
import cronParser from "cron-parser";
import { BsCheck, BsPlus, BsTrash3 } from "@flowdev/icons";
import { TooltipContent } from "@flowdev/ui/Tooltip";
import { NUM_TASKS_IN_ADVANCE, SetRepeatingTasksInput } from "./server";
import type { SubmitErrorHandler } from "react-hook-form";

export default definePlugin((opts) => {
  // @ts-ignore as React is used during compilation and is required to make sure the plugin works with the host's React version
  const React = opts.React;
  const Flow = opts.components;
  const generateId = () => Date.now().toString();

  type RepeatingTaskFormValues = Omit<RepeatingTask, "id">;
  type OnChangeValues = RepeatingTaskFormValues & Partial<Pick<RepeatingTask, "id">>;
  const RepeatingTasks = () => {
    const tasksQuery = opts.operations.useLazyQuery<RepeatingTask[]>({
      pluginSlug: opts.pluginSlug,
      operationName: "repeatingTasks",
    });
    const repeatingTasks = tasksQuery?.data ?? [];
    const [showNewTaskForm, setShowNewTaskForm] = React.useState(false);

    const updateRepeatingTasks = async (tasks: RepeatingTask[]) => {
      await opts.toast.promise(
        opts.operations.mutation({
          pluginSlug: opts.pluginSlug,
          operationName: "setRepeatingTasks",
          input: {
            repeatingTasks: tasks,
            currentDate: new Date().toISOString(),
          } satisfies SetRepeatingTasksInput,
        }),
        {
          loading: "Updating repeating tasks...",
          error: "Failed to update repeating tasks",
          success: "Repeating tasks updated",
        },
      );
    };

    const handleUpdate = async (task: OnChangeValues, isNew?: boolean) => {
      if (isNew) {
        console.log("adding new task");
        await updateRepeatingTasks([...repeatingTasks, { ...task, id: generateId() }]);
        setShowNewTaskForm(false);
      } else {
        console.log("updating task");
        const updatedTasks = repeatingTasks.map((t) => {
          if (t.id !== task.id) {
            return t;
          }
          return task as RepeatingTask;
        });
        await updateRepeatingTasks(updatedTasks);
      }
    };

    const handleDelete = (taskId: string) => {
      console.log("deleting task");
      updateRepeatingTasks(repeatingTasks.filter((task) => task.id !== taskId));
    };

    return (
      <div className="flex gap-4 flex-wrap items-start">
        {repeatingTasks.map((task) => (
          <RepeatingTaskForm
            key={task.id}
            task={task}
            onChange={(task) => handleUpdate(task)}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
        {showNewTaskForm ? (
          <RepeatingTaskForm onChange={(task) => handleUpdate(task, true)} autoFocus />
        ) : (
          <Flow.Tooltip>
            <Flow.TooltipTrigger>
              <button
                onClick={() => setShowNewTaskForm(true)}
                className="flex items-center justify-center text-sm bg-background-200 text-foreground-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 min-w-xs min-h-18 gap-2 rounded-md p-3 shadow-md"
              >
                <BsPlus />
                New repeating task
              </button>
            </Flow.TooltipTrigger>
            <TooltipContent side="bottom">Create new repeating task</TooltipContent>
          </Flow.Tooltip>
        )}
      </div>
    );
  };

  const RepeatingTaskForm = (props: {
    task?: RepeatingTask;
    onChange: (task: OnChangeValues) => void;
    onDelete?: () => void;
    autoFocus?: boolean;
  }) => {
    const [deleting, setDeleting] = React.useState(false);
    const timeoutRef = React.useRef<NodeJS.Timeout>();
    const { register, control, handleSubmit, watch } =
      opts.reactHookForm.useForm<RepeatingTaskFormValues>({
        defaultValues: {
          title: props.task?.title ?? "",
          durationInMinutes: props.task?.durationInMinutes,
          // cron for every day at midnight
          cron: props.task?.cron ?? "0 0 * * *",
          enabled: props.task?.enabled ?? true,
        },
      });

    const onSubmit = (data: RepeatingTaskFormValues) => {
      if (deleting) return;
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        props.onChange({ id: props.task?.id, ...data });
      }, 1000);
    };

    const onInvalid: SubmitErrorHandler<RepeatingTaskFormValues> = (errors) => {
      timeoutRef.current && clearTimeout(timeoutRef.current);

      if (errors.cron) {
        timeoutRef.current = setTimeout(() => {
          opts.toast.error(errors.cron?.message ?? "Invalid cron expression");
        }, 1000);
      }
    };

    React.useEffect(() => {
      const subscription = watch(() => handleSubmit(onSubmit, onInvalid)());
      return () => subscription.unsubscribe();
    }, [handleSubmit, watch, deleting]);

    return (
      <form
        className="bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-md p-3 shadow-lg max-w-xs w-full"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <opts.reactHookForm.Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Flow.TaskTitleInput
              initialValue={props.task?.title}
              onSave={field.onChange}
              onCancel={field.onBlur}
              autoFocus={props.autoFocus}
            />
          )}
          rules={{ required: true }}
        />
        <div className="flex gap-2">
          <input
            type="text"
            className="bg-transparent border-none text-foreground-700 focus:ring-0 active:ring-0 focus:outline-none w-full"
            {...register("cron", {
              required: true,
              validate: {
                parse: (value) =>
                  Object.keys(cronParser.parseString(value).errors).length === 0 ||
                  "Invalid cron expression",
              },
            })}
          />
          <opts.reactHookForm.Controller
            name="durationInMinutes"
            control={control}
            render={({ field }) => (
              <Flow.TaskDurationButtonDropdown
                value={field.value}
                onChange={field.onChange}
                showByDefault
              />
            )}
          />
          <opts.reactHookForm.Controller
            control={control}
            name="enabled"
            render={({ field }) => (
              <Flow.Tooltip>
                <Flow.TooltipTrigger>
                  <button
                    onClick={() => field.onChange(!field.value)}
                    className={opts.tw(
                      "flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm",
                      !!field.value
                        ? "bg-primary-100 text-primary-600 hover:bg-primary-300 active:bg-primary-200"
                        : "bg-background-200 text-foreground-700 hover:bg-background-200 active:bg-primary-200",
                    )}
                  >
                    <BsCheck />
                  </button>
                </Flow.TooltipTrigger>
                <TooltipContent side="bottom">
                  Whether this repating task is enabled? If disabled all future tasks after today
                  will be deleted.
                </TooltipContent>
              </Flow.Tooltip>
            )}
          />
          <Flow.Tooltip>
            <Flow.TooltipTrigger>
              <button
                onClick={() => {
                  setDeleting(true);
                  props.onDelete?.();
                }}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm bg-background-200 text-foreground-700 hover:bg-negative-100 hover:text-negative-600 active:bg-negative-200"
              >
                <BsTrash3 size={16} />
              </button>
            </Flow.TooltipTrigger>
            <TooltipContent side="bottom">Delete</TooltipContent>
          </Flow.Tooltip>
        </div>
      </form>
    );
  };

  return {
    name: "Repeating tasks",
    settings: {
      [NUM_TASKS_IN_ADVANCE]: {
        type: "textfield",
        label: "Tasks in advance",
        description: "How many tasks should be created in advance when enabling a repeating task?",
        required: true,
        inputType: "number",
        defaultValue: 10,
        registerOptions: { valueAsNumber: true },
      },
      "repeating-tasks": {
        type: "custom",
        render: () => <RepeatingTasks />,
      },
    },
  };
});
