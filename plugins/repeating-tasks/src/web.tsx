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
    const [showNewTaskForm, setShowNewTaskForm] = React.useState(false);
    const tasksQuery = opts.operations.useLazyQuery<RepeatingTask[]>({
      pluginSlug: opts.pluginSlug,
      operationName: "repeatingTasks",
    });
    const repeatingTasks = tasksQuery?.data ?? [];

    const updateRepeatingTasks = async (tasks: RepeatingTask[]) => {
      await opts.toast.promise(
        opts.operations.mutation({
          pluginSlug: opts.pluginSlug,
          operationName: "setRepeatingTasks",
          input: {
            repeatingTasks: tasks,
            currentDate: new Date().toDateString(),
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
        setShowNewTaskForm(false);
        await updateRepeatingTasks([...repeatingTasks, { ...task, id: generateId() }]);
      } else {
        await updateRepeatingTasks(
          repeatingTasks.map((t) => {
            if (t.id !== task.id) {
              return t;
            }
            return task as RepeatingTask;
          }),
        );
      }
    };

    const handleDelete = (taskId: string) => {
      updateRepeatingTasks(repeatingTasks.filter((task) => task.id !== taskId));
    };

    return (
      <div className="flex gap-2 flex-wrap">
        {repeatingTasks.map((task) => (
          <RepeatingTaskForm
            key={task.id}
            task={task}
            onChange={(task) => handleUpdate(task)}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
        {showNewTaskForm ? (
          <RepeatingTaskForm onChange={(task) => handleUpdate(task, true)} />
        ) : (
          <Flow.Tooltip>
            <Flow.TooltipTrigger>
              <button
                onClick={() => setShowNewTaskForm(true)}
                className="flex items-center justify-center text-sm bg-background-200 text-foreground-700 hover:bg-primary-100 hover:text-primary-600 active:bg-primary-200 min-w-sm min-h-[200px] gap-2"
              >
                <BsPlus />
                New repeating task
              </button>
            </Flow.TooltipTrigger>
            <TooltipContent>Create new repeating task</TooltipContent>
          </Flow.Tooltip>
        )}
      </div>
    );
  };

  const RepeatingTaskForm = (props: {
    task?: RepeatingTask;
    onChange: (task: OnChangeValues) => void;
    onDelete?: () => void;
  }) => {
    const timeoutRef = React.useRef<NodeJS.Timeout>();
    const { register, control, handleSubmit, watch } =
      opts.reactHookForm.useForm<RepeatingTaskFormValues>({
        defaultValues: {
          title: props.task?.title ?? "",
          durationInMinutes: props.task?.durationInMinutes,
          // cron for every day at midnight
          cron: props.task?.cron ?? "0 0 * * *",
          enabled: props.task?.enabled,
        },
      });

    const onSubmit = (data: RepeatingTaskFormValues) => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        props.onChange(data);
      }, 1000);
    };

    const onInvalid: SubmitErrorHandler<RepeatingTaskFormValues> = (errors) => {
      timeoutRef.current && clearTimeout(timeoutRef.current);

      if (errors.cron) {
        opts.toast.error(errors.cron.message ?? "Invalid cron expression");
      }
    };

    React.useEffect(() => {
      const subscription = watch(() => handleSubmit(onSubmit, onInvalid)());
      return () => subscription.unsubscribe();
    }, [handleSubmit, watch]);

    return (
      <form
        className="bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-md p-3 shadow-sm min-w-sm"
        onSubmit={handleSubmit(onSubmit, onInvalid)}
      >
        <opts.reactHookForm.Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Flow.TaskTitleInput onSave={field.onChange} onCancel={field.onBlur} />
          )}
          rules={{ required: true }}
        />
        <div className="flex gap-2">
          <input
            type="text"
            className="bg-transparent border-none text-foreground-700 focus:ring-0 active:ring-0 w-full"
            {...register("cron", {
              required: true,
              validate: {
                parse: (value) =>
                  !!cronParser.parseExpression(value).next().toString() ||
                  "Invalid cron expression",
              },
            })}
          />
          <opts.reactHookForm.Controller
            name="durationInMinutes"
            control={control}
            render={({ field }) => (
              <Flow.TaskDurationButtonDropdown value={field.value} onChange={field.onChange} />
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
                <TooltipContent>
                  Whether this repating task is enabled? If disabled all future tasks after today
                  will be deleted.
                </TooltipContent>
              </Flow.Tooltip>
            )}
          />
          <Flow.Tooltip>
            <Flow.TooltipTrigger>
              <button
                onClick={props.onDelete}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm bg-background-200 text-foreground-700 hover:bg-negative-100 hover:text-negative-600 active:bg-negative-200"
              >
                <BsTrash3 />
              </button>
            </Flow.TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
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
      },
      "repeating-tasks": {
        type: "custom",
        render: () => <RepeatingTasks />,
      },
    },
  };
});
