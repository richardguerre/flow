import { definePlugin } from "@flowdev/plugin/web";
import cronParser from "cron-parser";
import { BsCheck } from "@flowdev/icons";
import { TooltipContent } from "@flowdev/ui/Tooltip";

export default definePlugin((opts) => {
  // @ts-ignore as React is used during compilation and is required to make sure the plugin works with the host's React version
  const React = opts.React;
  const Flow = opts.components;

  const generateId = () => {
    // generate ID based on current time
    return Date.now().toString();
  };

  type RepeatingTaskFormValues = Omit<RepeatingTask, "id">;
  type OnChangeValues = RepeatingTaskFormValues & Partial<Pick<RepeatingTask, "id">>;
  const RepeatingTasks = () => {
    const tasksQuery = opts.operations.useLazyQuery<RepeatingTask[]>({
      pluginSlug: opts.pluginSlug,
      operationName: "repeatingTasks",
    });
    const repeatingTasks = tasksQuery?.data ?? [];

    const handleUpdate = async (task: OnChangeValues) => {
      await opts.toast.promise(
        opts.operations.mutation({
          pluginSlug: opts.pluginSlug,
          operationName: "setRepeatingTasks",
          input: {
            repeatingTasks: task.id
              ? repeatingTasks.map((t) => {
                  if (t.id !== task.id) {
                    return t;
                  }
                  return task;
                })
              : [...repeatingTasks, { ...task, id: generateId() }],
          },
        }),
        {
          loading: "Updating repeating tasks...",
          error: "Failed to update repeating tasks",
          success: "Repeating tasks updated",
        },
      );
    };

    return (
      <div className="flex flex-col gap-2">
        {repeatingTasks.map((task) => (
          <RepeatingTaskForm key={task.id} task={task} onChange={(task) => handleUpdate(task)} />
        ))}
      </div>
    );
  };

  const RepeatingTaskForm = (props: {
    task?: RepeatingTask;
    onChange: (task: OnChangeValues) => void;
  }) => {
    const timeoutRef = React.useRef<NodeJS.Timeout>();
    const { register, control, handleSubmit } = opts.reactHookForm.useForm<RepeatingTaskFormValues>(
      {
        defaultValues: {
          title: props.task?.title ?? "",
          durationInMinutes: props.task?.durationInMinutes,
          // cron for every day at midnight
          cron: props.task?.cron ?? "0 0 * * *",
          enabled: props.task?.enabled,
        },
      },
    );

    const onSubmit = (data: RepeatingTaskFormValues) => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        props.onChange(data);
      }, 1000);
    };

    return (
      <form
        className="bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-md p-3 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
      >
        <opts.reactHookForm.Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Flow.TaskTitleInput onSave={field.onChange} onCancel={field.onBlur} />
          )}
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
                      "flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100",
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
        </div>
      </form>
    );
  };

  return {
    name: "Repeating tasks",
    settings: {
      "repeating-tasks": {
        type: "custom",
        render: () => <RepeatingTasks />,
      },
    },
  };
});
