import { definePlugin } from "@flowdev/plugin/web";
import cronParser from "cron-parser";
import { BsCheckSquareFill, BsPencil, BsSquare, BsTrash3 } from "@flowdev/icons";
import { NUM_TASKS_IN_ADVANCE } from "./utils";

export default definePlugin((opts) => {
  // @ts-ignore as React is used during compilation and is required to make sure the plugin works with the host's React version
  const React = opts.React;
  const Flow = opts.components;

  const RepeatingTasks = () => {
    const tasksQuery = opts.operations.useLazyQuery<RepeatingTask[]>({
      operationName: "repeatingTasks",
    });
    const repeatingTasks = tasksQuery?.data ?? [];

    return (
      <div className="flex flex-col gap-4 items-start">
        <div className="flex gap-4 flex-wrap items-start">
          {repeatingTasks.map((template) => (
            <RepeatingTask key={template.id} template={template} />
          ))}
        </div>
        <AddRepeatingTask />
      </div>
    );
  };

  const RepeatingTask = (props: { template: RepeatingTask }) => {
    const [remove, isRemoving] = opts.operations.useMutation<RemoveRepeatingTaskInput, {}>(
      "removeRepeatingTask",
    );
    const [edit, isEditing] = opts.operations.useMutation<EditRepeatingTaskInput, {}>(
      "editRepeatingTask",
    );

    const handleRemove = () => remove({ id: props.template.id });
    const handleEnable = () => edit({ id: props.template.id, enabled: true });
    const handleDisable = () => edit({ id: props.template.id, enabled: false });

    return (
      <div className="bg-background-50 group flex cursor-pointer flex-col gap-1 rounded-md p-3 shadow-lg w-64">
        <Flow.TaskTitleInput initialValue={props.template.title} readOnly />
        <div className="text-foreground-700 text-sm">
          {cronToHumanReadable(props.template.cron)}
        </div>
        <div className="flex gap-2">
          <EditRepeatingTask template={props.template} />
          {props.template.enabled ? (
            <Flow.Tooltip>
              <Flow.TooltipTrigger asChild>
                <button
                  onClick={handleDisable}
                  disabled={isEditing}
                  className="bg-background-200/50 text-foreground-700 hover:bg-background-300/70 active:bg-background-300/100 flex h-6 w-6 items-center justify-center rounded-full text-sm"
                >
                  <BsCheckSquareFill size={14} />
                </button>
              </Flow.TooltipTrigger>
              <Flow.TooltipContent side="bottom">Disable</Flow.TooltipContent>
            </Flow.Tooltip>
          ) : (
            <Flow.Tooltip>
              <Flow.TooltipTrigger asChild>
                <button
                  onClick={handleEnable}
                  disabled={isEditing}
                  className="bg-background-200/50 text-foreground-700 hover:bg-background-300/70 active:bg-background-300/100 flex h-6 w-6 items-center justify-center rounded-full text-sm"
                >
                  <BsSquare size={14} />
                </button>
              </Flow.TooltipTrigger>
              <Flow.TooltipContent side="bottom">Enable</Flow.TooltipContent>
            </Flow.Tooltip>
          )}
          <Flow.Tooltip>
            <Flow.TooltipTrigger asChild>
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm bg-background-200 text-foreground-700 hover:bg-negative-100 hover:text-negative-600 active:bg-negative-200"
              >
                <BsTrash3 size={16} />
              </button>
            </Flow.TooltipTrigger>
            <Flow.TooltipContent side="bottom">Delete</Flow.TooltipContent>
          </Flow.Tooltip>
        </div>
      </div>
    );
  };

  type EveryUnitOption = "day" | "week" | "month";
  const weekdays = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  } as const;
  type Day = keyof typeof weekdays;
  const everyUnitOptions: { value: EveryUnitOption; label: string }[] = [
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ];
  type AddOrEditRepeatingTaskFormValues = {
    title: string;
    durationInMinutes?: string;
    cron?: string;
    useCron: boolean;
    simplified: NonNullable<RepeatingTask["simplified"]>;
  };

  const AddRepeatingTask = () => {
    const [showDialog, setShowDialog] = React.useState(false);
    const [addRepeatingTask, isAdding] = opts.operations.useMutation<AddRepeatingTaskInput, {}>(
      "addRepeatingTask",
    );

    const onSubmit = async (values: AddOrEditRepeatingTaskFormValues) => {
      let cron = values.cron;
      if (!values.useCron) cron = toCronFromSimplified(values.simplified);
      cron ||= "0 0 * * *";
      const durationInMinutes = values.durationInMinutes
        ? parseInt(values.durationInMinutes)
        : undefined;
      await addRepeatingTask({
        title: values.title,
        cron,
        simplified: !values.useCron ? values.simplified : undefined,
        durationInMinutes,
        enabled: true,
      });
      setShowDialog(false);
    };

    return (
      <Flow.Dialog open={showDialog} onOpenChange={setShowDialog}>
        <Flow.DialogTrigger asChild>
          <Flow.Button secondary loading={isAdding}>
            Add repeating task
          </Flow.Button>
        </Flow.DialogTrigger>
        <Flow.DialogContent>
          <Flow.DialogHeader>
            <Flow.DialogTitle>Add a repeating task</Flow.DialogTitle>
            <Flow.DialogDescription>
              Add a repeating task to your Flow. For example, "Check notifications" is a good task
              to start your day with.
            </Flow.DialogDescription>
          </Flow.DialogHeader>
          <RepeatingTaskForm
            onSubmit={onSubmit}
            defaultValues={{
              title: "",
              durationInMinutes: undefined,
              useCron: false,
              simplified: {
                everyNum: 1,
                everyUnit: "week",
                onDay: [1],
                onDaysOfMonth: [1, 15],
              },
            }}
            saving={isAdding}
          />
        </Flow.DialogContent>
      </Flow.Dialog>
    );
  };

  const EditRepeatingTask = (props: { template: RepeatingTask }) => {
    const [showDialog, setShowDialog] = React.useState(false);
    const [editRepeatingTask, isEditing] = opts.operations.useMutation<EditRepeatingTaskInput, {}>(
      "editRepeatingTask",
    );

    const onSubmit = async (values: AddOrEditRepeatingTaskFormValues) => {
      const durationInMinutes = values.durationInMinutes
        ? parseInt(values.durationInMinutes)
        : undefined;
      const updatedCron = values.useCron ? values.cron : toCronFromSimplified(values.simplified);
      await editRepeatingTask({
        id: props.template.id,
        ...values,
        durationInMinutes,
        cron: updatedCron,
      });
      setShowDialog(false);
    };

    return (
      <Flow.Dialog open={showDialog} onOpenChange={setShowDialog}>
        <Flow.Tooltip>
          <Flow.TooltipTrigger asChild>
            <Flow.DialogTrigger asChild>
              <button
                disabled={isEditing}
                className="bg-background-200/50 text-foreground-700 hover:bg-background-300/70 active:bg-background-300/100 flex h-6 w-6 items-center justify-center rounded-full text-sm"
              >
                <BsPencil size={14} />
              </button>
            </Flow.DialogTrigger>
          </Flow.TooltipTrigger>
          <Flow.TooltipContent side="bottom">Edit</Flow.TooltipContent>
        </Flow.Tooltip>
        <Flow.DialogContent>
          <Flow.DialogHeader>
            <Flow.DialogTitle>Edit a repeating task</Flow.DialogTitle>
            <Flow.DialogDescription>
              Edit the repeating task. Updates will be applied to all future tasks that have not
              been completed yet.
            </Flow.DialogDescription>
          </Flow.DialogHeader>
          <RepeatingTaskForm
            onSubmit={onSubmit}
            defaultValues={{
              title: props.template.title,
              durationInMinutes: props.template.durationInMinutes?.toString(),
              useCron: !props.template.simplified,
              cron: props.template.cron,
              simplified: props.template.simplified,
            }}
            saving={isEditing}
          />
        </Flow.DialogContent>
      </Flow.Dialog>
    );
  };

  const RepeatingTaskForm = (props: {
    onSubmit: (values: AddOrEditRepeatingTaskFormValues) => void;
    defaultValues?: Partial<AddOrEditRepeatingTaskFormValues>;
    saving: boolean;
  }) => {
    const { register, control, handleSubmit, watch, setValue, formState } =
      opts.reactHookForm.useForm<AddOrEditRepeatingTaskFormValues>({
        defaultValues: props.defaultValues,
      });

    const [useCron, everyUnit] = watch(["useCron", "simplified.everyUnit"]);

    return (
      <form onSubmit={handleSubmit(props.onSubmit)} className="flex flex-col gap-4">
        <div className="ring-primary-200 text-foreground-900 hover:ring-primary-300 focus:ring-primary-500 w-full rounded-md px-3 py-2 text-sm outline-none ring-2 transition-colors duration-300 ease-in-out">
          <opts.reactHookForm.Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Flow.TaskTitleInput
                initialValue={field.value}
                onSave={field.onChange}
                onCancel={field.onBlur}
                autoFocus
              />
            )}
          />
        </div>
        {useCron ? (
          <div className="flex flex-col items-start gap-3">
            <Flow.FormInput
              label="Cron expression"
              description="Cron expression for when the tasks should be created. For example, '0 0 * * *' means every day at midnight."
              type="text"
              {...register("cron", {
                required: true,
                validate: {
                  parse: (value) =>
                    Object.keys(cronParser.parseString(value ?? "").errors).length === 0 ||
                    "Invalid cron expression",
                },
              })}
            />
            <Flow.Button secondary sm type="button" onClick={() => setValue("useCron", false)}>
              Show simplified
            </Flow.Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-start">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center font-medium text-foreground-900 text-base">
                Repeats every
                {everyUnit !== "week" && (
                  <Flow.FormInput
                    type="number"
                    className="w-16"
                    {...register("simplified.everyNum", { required: true })}
                  />
                )}
                <Flow.FormSelect name="simplified.everyUnit" control={control}>
                  <Flow.SelectTrigger>
                    <Flow.SelectValue />
                  </Flow.SelectTrigger>
                  <Flow.SelectContent align="end">
                    {everyUnitOptions.map((option) => (
                      <Flow.SelectItem value={option.value}>{option.label}</Flow.SelectItem>
                    ))}
                  </Flow.SelectContent>
                </Flow.FormSelect>
              </div>
              {everyUnit === "week" && (
                <div className="flex gap-2 font-medium text-foreground-900 text-base">
                  Repeats on
                  <opts.reactHookForm.Controller
                    control={control}
                    name="simplified.onDay"
                    render={({ field }) => (
                      <DaysPicker days={field.value ?? []} onChange={field.onChange} />
                    )}
                  />
                </div>
              )}
              {everyUnit === "month" && (
                <div className="flex flex-col gap-2 text-foreground-700">
                  <Flow.FormInput
                    label="Repeats on"
                    description="Comma-separated list of days of the month (1-31)"
                    className="max-w-48"
                    error={formState.errors.simplified?.onDaysOfMonth as any}
                    {...register("simplified.onDaysOfMonth", {
                      required: true,
                      setValueAs: (value) =>
                        Array.isArray(value) ? value : value.split(",").map(Number),
                      validate: {
                        parse: (value) =>
                          value?.every((day) => !Number.isNaN(day) && day >= 1 && day <= 31) ||
                          "This should be a comma-separated list of days of the month (1-31)",
                      },
                    })}
                  />
                </div>
              )}
            </div>
            <Flow.Button secondary sm type="button" onClick={() => setValue("useCron", true)}>
              Show advanced
            </Flow.Button>
          </div>
        )}
        <Flow.FormSelect
          name="durationInMinutes"
          label="Duration"
          description="How long will each task take to complete?"
          control={control}
        >
          <Flow.SelectTrigger className="max-w-48">
            <Flow.SelectValue />
          </Flow.SelectTrigger>
          <Flow.SelectContent className="max-h-40 overflow-y-scroll">
            {durationOptions.map((option) => (
              <Flow.SelectItem value={option.value.toString()}>{option.label}</Flow.SelectItem>
            ))}
          </Flow.SelectContent>
        </Flow.FormSelect>
        <Flow.Button className="self-end" loading={props.saving}>
          Save
        </Flow.Button>
      </form>
    );
  };

  const DaysPicker = (props: { days: Day[]; onChange: (days: Day[]) => void }) => {
    const handleClick = (dayNum: Day) => {
      const alreadyHas = props.days.includes(dayNum);
      if (alreadyHas) {
        props.onChange(props.days.filter((d) => d !== dayNum));
      } else {
        props.onChange([...props.days, dayNum]);
      }
    };

    return (
      <div className="flex gap-1">
        {Object.values(weekdays).map((day, i) => (
          <Flow.Tooltip>
            <Flow.TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => handleClick(i as Day)}
                className={opts.tw(
                  "flex h-7 w-7 appearance-none items-center justify-center rounded-full text-xs",
                  props.days.includes(i as Day)
                    ? "bg-primary-100 text-primary-600"
                    : "bg-gray-200 text-gray-600",
                )}
              >
                {day[0]}
              </button>
            </Flow.TooltipTrigger>
            <Flow.TooltipContent>{day}</Flow.TooltipContent>
          </Flow.Tooltip>
        ))}
      </div>
    );
  };

  type Simplified = AddOrEditRepeatingTaskFormValues["simplified"];
  const toCronFromSimplified = ({
    everyNum,
    everyUnit,
    onDay,
    onDaysOfMonth,
  }: Simplified): string => {
    if (everyUnit === "day") {
      return `0 0 */${everyNum} * *`;
    } else if (everyUnit === "week") {
      return `0 0 * * ${(onDay ?? [1]).join(",")}`;
    } else if (everyUnit === "month") {
      return `0 0 ${onDaysOfMonth?.join(",") ?? "1"} */${everyNum} *`;
    }

    // every day at midnight
    return "0 0 * * *";
  };

  const cronToHumanReadable = (cron: string) => {
    const fields = cronParser.parseExpression(cron).fields;
    let message = "Every ";
    if (fields.dayOfWeek.length === 7) {
      message += "day";
    } else if (
      fields.dayOfWeek.length === 5 &&
      !fields.dayOfWeek.some((day) => day === 0 || day === 6)
    ) {
      message += "weekday";
    } else if (fields.dayOfWeek.length !== 7) {
      message += `${fields.dayOfWeek.map((day) => weekdays[day as Day]).join(", ")}`;
    }

    if (fields.dayOfMonth.length !== 31) {
      const months =
        fields.month.length !== 12 ? "the " + fields.month.join(", ") + "months" : "every month";
      message += `${fields.dayOfMonth.join(", ")} of ${months}`;
    }

    return message;
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

const durationOptions = [
  { label: "None", value: 0 },
  { label: "5 minutes", value: 5 },
  { label: "10 minutes", value: 10 },
  { label: "15 minutes", value: 15 },
  { label: "20 minutes", value: 20 },
  { label: "30 minutes", value: 30 },
  { label: "40 minutes", value: 40 },
  { label: "45 minutes", value: 45 },
  { label: "1 hour", value: 60 },
  { label: "1.5 hours", value: 90 },
  { label: "2 hours", value: 120 },
  { label: "2.5 hours", value: 150 },
  { label: "3 hours", value: 180 },
];
