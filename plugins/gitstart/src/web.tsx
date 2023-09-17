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

  return {
    name: "GitStart",
    settings: {
      [TOKEN_STORE_KEY]: {
        type: "textfield",
        label: "Token",
        helper:
          "You can find this in your localStorage when logged in to GitStart under the key `user_token`.",
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
          const { register, handleSubmit, formState, watch } =
            opts.reactHookForm.useForm<FormValues>({ defaultValues: { title: task.title.value } });
          const values = watch();

          const onSubmit = (values: FormValues) => {
            props.onNext({ taskOverrides: { title: values.title } });
          };

          return (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Flow.FormInput
                label="Title"
                description="The title of the task in GitStart."
                {...register("title")}
                error={formState.errors.title}
              />
              <div className="flex gap-2 self-end">
                <BackButton
                  type="button"
                  onClick={() => props.onBack({ taskOverrides: { title: values.title } })}
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
    renderItemCardDetails: async ({ item }) => {
      const taskPluginData = item.pluginDatas.find((pd) => pd.pluginSlug === "gitstart");
      if (!taskPluginData) {
        return null;
      }
      const min = taskPluginData.min as ItemPluginDataMin;
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
  TO_DO: { label: "To do", className: `bg-gray-200 text-gray-600` },
  IN_PROGRESS: {
    label: "In progress",
    className: `bg-blue-100 text-blue-600`,
  },
  FINISHED: { label: "Finished", className: `bg-green-100 text-green-700` },
  CANCELED: { label: "Canceled", className: `bg-red-100 text-red-600` },
};

const prStatusMap: Record<GitStartPullRequestStatus, { label: string; className: string }> = {
  PLANNED: { label: "Planned", className: `bg-gray-200 text-gray-600` },
  IN_PROGRESS: {
    label: "In progress",
    className: `bg-blue-100 text-blue-600`,
  },
  INTERNAL_REVIEW: {
    label: "Internal review",
    className: `bg-yellow-100 text-yellow-600`,
  },
  CLIENT_REVIEW: {
    label: "Client review",
    className: `bg-purple-100 text-purple-600`,
  },
  CANCELED: { label: "Canceled", className: `bg-red-100 text-red-600` },
  APPROVED: { label: "Approved", className: `bg-green-100 text-green-700` },
  MERGED: { label: "Merged", className: `bg-green-100 text-green-700` },
};

const ticketStatusMap: Record<GitStartTicketStatus, { label: string; className: string }> = {
  BACKLOG: { label: "Backlog", className: `bg-gray-200 text-gray-600` },
  AVAILABLE: {
    label: "Available",
    className: `bg-blue-100 text-blue-600`,
  },
  IN_PROGRESS: {
    label: "In progress",
    className: `bg-yellow-100 text-yellow-600`,
  },
  PAUSED: {
    label: "Paused",
    className: `bg-purple-100 text-purple-600`,
  },
  FINISHED: { label: "Finished", className: `bg-green-100 text-green-700` },
  CANCELED: { label: "Canceled", className: `bg-red-100 text-red-600` },
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
