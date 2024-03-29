import { definePlugin } from "@flowdev/plugin/web";
import { TOKEN_STORE_KEY } from "./server";
import type {
  GitStartTaskStatus,
  GitStartTaskType,
  TaskPluginDataMin,
  ItemPluginDataMin,
  GitStartPullRequestStatus,
  GitStartTicketStatus,
} from "./server";

export default definePlugin((opts) => {
  const Flow = opts.components;
  // @ts-ignore React is used to when building where JSX is transformed to React.createElement calls
  const React = opts.React;

  // copied from login page
  const logo = (
    <svg width="24" height="24" viewBox="0 0 82 81" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="41" cy="40.5" rx="41" ry="40.5" fill="#FCEED4"></ellipse>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M37.9809 58.0204C47.0248 58.0204 54.3563 50.6889 54.3563 41.645C54.3563 32.6011 47.0248 25.2696 37.9809 25.2696C28.9371 25.2696 21.6056 32.6011 21.6056 41.645C21.6056 50.6889 28.9371 58.0204 37.9809 58.0204ZM37.9809 61.6884C49.0506 61.6884 58.0244 52.7147 58.0244 41.645C58.0244 30.5753 49.0506 21.6016 37.9809 21.6016C26.9113 21.6016 17.9375 30.5753 17.9375 41.645C17.9375 52.7147 26.9113 61.6884 37.9809 61.6884Z"
        fill="black"
      ></path>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M61.7881 28.5227C62.9758 28.5227 63.9386 27.5599 63.9386 26.3722C63.9386 25.1845 62.9758 24.2216 61.7881 24.2216C60.6003 24.2216 59.6375 25.1845 59.6375 26.3722C59.6375 27.5599 60.6003 28.5227 61.7881 28.5227ZM61.7881 31.1428C64.4228 31.1428 66.5587 29.0069 66.5587 26.3722C66.5587 23.7374 64.4228 21.6016 61.7881 21.6016C59.1533 21.6016 57.0175 23.7374 57.0175 26.3722C57.0175 29.0069 59.1533 31.1428 61.7881 31.1428Z"
        fill="black"
      ></path>
    </svg>
  );

  const githubIcon = (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );

  const CheckIcon = (props: { className?: string; size?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? "16"}
      height={props.size ?? "16"}
      fill="currentColor"
      className={props.className}
      viewBox="0 0 16 16"
    >
      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path>
    </svg>
  );

  return {
    name: "GitStart",
    settings: {
      [TOKEN_STORE_KEY]: {
        type: "textfield",
        label: "Token",
        description:
          "You can find this in your localStorage when logged in to GitStart under the key `user_token`.",
        placeholder: "Paste your GitStart token here",
        isSecret: true, // once set, it cannot be seen again, but each time the setting is saved again it will be overwritten
      },
    },
    onCreateTask: async ({ task }) => {
      if (!task?.item?.pluginDatas.some((pd) => pd.pluginSlug === "gitstart")) {
        return null;
      }

      return {
        dialogContent: ({ NextButton, BackButton, ...props }) => {
          type FormValues = {
            title: string;
            type: GitStartTaskType;
            status: GitStartTaskStatus;
          };
          const { register, handleSubmit, formState, watch, control } =
            opts.reactHookForm.useForm<FormValues>();
          const values = watch();

          const onSubmit = (values: FormValues) => {
            props.onNext({
              taskOverrides: { title: values.title },
              actionData: { type: values.type, status: values.status },
            });
          };

          const isToday = opts.dayjs().isSame(task.date.value, "day");
          const isInThePast = opts.dayjs().isAfter(task.date.value, "day");

          return (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">
              <input
                defaultValue={task.title.value}
                className="ring-none placeholder:text-foreground-700 text-foreground-900 bg-transparent text-lg focus:outline-none"
                {...register("title", { required: "The task's title is required." })}
              />
              <div className="flex items-center gap-2">
                <Flow.FormCombobox
                  name="type"
                  defaultValue="CODE"
                  control={control}
                  rules={{
                    required: "The task's type is required.",
                  }}
                >
                  <Flow.ComboboxTrigger role="combobox">
                    <Flow.ComboboxValue
                      renderValue={(value) => {
                        const typeInfo = taskTypeMap[value as keyof typeof taskTypeMap];
                        return (
                          <Flow.Badge className={typeInfo.className}>{typeInfo.label}</Flow.Badge>
                        );
                      }}
                    />
                  </Flow.ComboboxTrigger>
                  <Flow.ComboboxContent className="w-50 p-0" align="start">
                    <Flow.ComboboxInput placeholder="Search type..." />
                    <Flow.ComboboxEmpty>No type found.</Flow.ComboboxEmpty>
                    <Flow.ComboboxGroup>
                      {Object.entries(taskTypeMap).map(([value, typeInfo]) => (
                        <Flow.ComboboxItem
                          key={value}
                          value={value}
                          className="flex items-center gap-2"
                        >
                          <Flow.ComboboxSelected
                            className="opacity-0"
                            selectedClassName="opacity-100"
                          >
                            <CheckIcon className="text-foreground-900 h-6" />
                          </Flow.ComboboxSelected>
                          <Flow.Badge className={typeInfo.className}>{typeInfo.label}</Flow.Badge>
                        </Flow.ComboboxItem>
                      ))}
                    </Flow.ComboboxGroup>
                  </Flow.ComboboxContent>
                </Flow.FormCombobox>
                <Flow.FormCombobox
                  name="status"
                  defaultValue={isToday || isInThePast ? "IN_PROGRESS" : "TO_DO"} // can't set to finished directly since GitStart doesn't allow it. The user will have to tick the task after creating it.
                  control={control}
                  rules={{
                    required: "The task's status is required.",
                  }}
                >
                  <Flow.ComboboxTrigger>
                    <Flow.ComboboxValue
                      renderValue={(value) => {
                        const statusInfo = taskStatusMap[value as keyof typeof taskStatusMap];
                        return (
                          <Flow.Badge className={statusInfo.className}>
                            {statusInfo.label}
                          </Flow.Badge>
                        );
                      }}
                    />
                  </Flow.ComboboxTrigger>
                  <Flow.ComboboxContent className="w-50 p-0" align="start">
                    <Flow.ComboboxInput placeholder="Search status..." />
                    <Flow.ComboboxEmpty>No status found.</Flow.ComboboxEmpty>
                    <Flow.ComboboxGroup>
                      {Object.entries(taskStatusMap).map(([value, statusInfo]) => (
                        <Flow.ComboboxItem
                          key={value}
                          value={value}
                          className="flex items-center gap-2"
                        >
                          <Flow.ComboboxSelected
                            className="opacity-0"
                            selectedClassName="opacity-100"
                          >
                            <CheckIcon className="text-foreground-900 h-6" />
                          </Flow.ComboboxSelected>
                          <Flow.Badge className={statusInfo.className}>
                            {statusInfo.label}
                          </Flow.Badge>
                        </Flow.ComboboxItem>
                      ))}
                    </Flow.ComboboxGroup>
                  </Flow.ComboboxContent>
                </Flow.FormCombobox>
              </div>
              {formState.errors.title && (
                <div className="text-negative-600 text-sm">{formState.errors.title.message}</div>
              )}
              {formState.errors.type && (
                <div className="text-negative-600 text-sm">{formState.errors.type.message}</div>
              )}
              {formState.errors.status && (
                <div className="text-negative-600 text-sm">{formState.errors.status.message}</div>
              )}
              <div className="flex gap-2 self-end">
                <BackButton
                  type="button"
                  onClick={() =>
                    props.onBack({
                      taskOverrides: { title: values.title },
                      actionData: { type: values.type, status: values.status },
                    })
                  }
                />
                <NextButton type="submit" />
              </div>
            </form>
          );
        },
      };
    },
    renderTaskCardDetails: async ({ task }) => {
      const taskPluginData = task.pluginDatas.find((pd) => pd.pluginSlug === "gitstart");
      if (!taskPluginData) {
        return null;
      }
      const min = taskPluginData.min as TaskPluginDataMin;
      const typeInfo = taskTypeMap[min.type];
      const statusInfo = taskStatusMap[min.status];
      return [
        {
          component: () => <Flow.Badge className={typeInfo.className}>{typeInfo.label}</Flow.Badge>,
        },
        {
          component: () => (
            <Flow.Badge className={statusInfo.className}>{statusInfo.label}</Flow.Badge>
          ),
        },
      ];
    },
    renderTaskCardActions: async ({ task }) => {
      const taskPluginData = task.pluginDatas.find((pd) => pd.pluginSlug === "gitstart");
      if (!taskPluginData) {
        return null;
      }
      const min = taskPluginData.min as TaskPluginDataMin;
      return [
        {
          component: () =>
            min.githubPrUrl ? (
              <a href={min.githubPrUrl} target="_blank" rel="noreferrer">
                <Flow.CardActionButton>{githubIcon}</Flow.CardActionButton>
              </a>
            ) : null,
        },
        {
          component: () => (
            <a href={min.ticketUrl} target="_blank" rel="noreferrer">
              {logo}
            </a>
          ),
        },
      ];
    },
    renderItemCardDetails: async ({ item }) => {
      const itemPluginData = item.pluginDatas.find((pd) => pd.pluginSlug === "gitstart");
      if (!itemPluginData) {
        return null;
      }
      const min = itemPluginData.min as ItemPluginDataMin;
      if (min.type === "pull_request") {
        const statusInfo = prStatusMap[min.status];
        return [
          {
            component: () => <Flow.Badge className="bg-green-100 text-green-700">PR</Flow.Badge>,
          },
          {
            component: () => (
              <Flow.Badge className={statusInfo.className}>{statusInfo.label}</Flow.Badge>
            ),
          },
        ];
      } else if (min.type === "ticket") {
        const statusInfo = ticketStatusMap[min.status];
        return [
          {
            component: () => (
              <Flow.Badge className={`bg-gray-200 text-gray-600`}>Ticket</Flow.Badge>
            ),
          },
          {
            component: () => (
              <Flow.Badge className={statusInfo.className}>{statusInfo.label}</Flow.Badge>
            ),
          },
        ];
      }
      return null;
    },
    renderItemCardActions: async ({ item }) => {
      const itemPluginData = item.pluginDatas.find((pd) => pd.pluginSlug === "gitstart");
      if (!itemPluginData) {
        return null;
      }
      const min = itemPluginData.min as ItemPluginDataMin;
      return [
        {
          component: () =>
            min.type === "pull_request" && min.url ? (
              <a href={min.url} target="_blank" rel="noreferrer">
                <Flow.CardActionButton>{githubIcon}</Flow.CardActionButton>
              </a>
            ) : null,
        },
        {
          component: () => (
            <a href={min.ticketUrl} target="_blank" rel="noreferrer">
              {logo}
            </a>
          ),
        },
      ];
    },
  };
});

const taskTypeMap: Record<GitStartTaskType, { label: string; className: string }> = {
  SPEC: { label: "Spec", className: `bg-gray-200 text-gray-600` },
  CODE: { label: "Code", className: `bg-blue-100 text-blue-600` },
  REVIEW: { label: "Review", className: `bg-yellow-100 text-yellow-600` },
  QA: { label: "QA", className: `bg-purple-100 text-purple-600` },
  LEARNING: { label: "Learning", className: `bg-green-100 text-green-700` },
};
const taskStatusMap: Record<GitStartTaskStatus, { label: string; className: string }> = {
  TO_DO: { label: "To do", className: "bg-gray-200 text-gray-600" },
  IN_PROGRESS: { label: "In progress", className: "bg-blue-100 text-blue-600" },
  FINISHED: { label: "Finished", className: "bg-green-100 text-green-700" },
  CANCELED: { label: "Canceled", className: "bg-red-100 text-red-600" },
};

const prStatusMap: Record<GitStartPullRequestStatus, { label: string; className: string }> = {
  PLANNED: { label: "Planned", className: "bg-gray-200 text-gray-600" },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-blue-100 text-blue-600",
  },
  INTERNAL_REVIEW: {
    label: "Internal review",
    className: "bg-yellow-100 text-yellow-600",
  },
  CLIENT_REVIEW: {
    label: "Client review",
    className: "bg-purple-100 text-purple-600",
  },
  CANCELED: { label: "Canceled", className: "bg-red-100 text-red-600" },
  APPROVED: { label: "Approved", className: "bg-green-100 text-green-700" },
  MERGED: { label: "Merged", className: "bg-green-100 text-green-700" },
};

const ticketStatusMap: Record<GitStartTicketStatus, { label: string; className: string }> = {
  BACKLOG: { label: "Backlog", className: "bg-gray-200 text-gray-600" },
  AVAILABLE: {
    label: "Available",
    className: "bg-blue-100 text-blue-600",
  },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-yellow-100 text-yellow-600",
  },
  PAUSED: {
    label: "Paused",
    className: "bg-purple-100 text-purple-600",
  },
  FINISHED: { label: "Finished", className: "bg-green-100 text-green-700" },
  CANCELED: { label: "Canceled", className: "bg-red-100 text-red-600" },
};

// type Option<T = any> = { label: string; value: T };

// const taskStatusOptions: Option<GitStartTaskStatus>[] = [
//   { label: "To Do", value: "TO_DO" },
//   { label: "In Progress", value: "IN_PROGRESS" },
//   { label: "Finished", value: "FINISHED" },
//   { label: "Canceled", value: "CANCELED" },
// ];

// const taskTypeOptions: Option<GitStartTaskType>[] = [
//   { label: "Spec", value: "SPEC" },
//   { label: "Code", value: "CODE" },
//   { label: "Review", value: "REVIEW" },
//   { label: "QA", value: "QA" },
//   { label: "Learning", value: "LEARNING" },
// ];
