import { definePlugin } from "@flowdev/plugin/web";
import { TOKEN_STORE_KEY } from "./server";
import type { GitStartTaskStatus, GitStartTaskType } from "./server";

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
  };
});

type Option<T = any> = { label: string; value: T };

const taskStatusOptions: Option<GitStartTaskStatus>[] = [
  { label: "To Do", value: "TO_DO" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Finished", value: "FINISHED" },
  { label: "Canceled", value: "CANCELED" },
];

const taskTypeOptions: Option<GitStartTaskType>[] = [
  { label: "Spec", value: "SPEC" },
  { label: "Code", value: "CODE" },
  { label: "Review", value: "REVIEW" },
  { label: "QA", value: "QA" },
  { label: "Learning", value: "LEARNING" },
];
