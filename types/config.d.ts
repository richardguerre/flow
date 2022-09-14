export {};

declare global {
  type ExternalTask = {
    id: string;
    title: string;
    url?: string;
    /**
     * If the task is relevant to the user, it will be shown in the UI.
     */
    isRelevant?: boolean;
    deletedAt?: Date;
  };

  type ExternalSource = {
    /**
     * Description of the external source of tasks.
     * Exposed in the GraphQL API
     */
    description?: string;
    /**
     * Hook triggered before a task is created with an external task.
     * Allows you to perform additional actions when a task is created.
     * Errors thrown will cancel the task creation and will be exposed as a GraphQLYogaError.
     */
    onTaskCreate?: (task: ExternalTask) => Promise<void>;
    /**
     * Hook triggered before a task linked to an external task is canceled.
     * Allows you to perform a certain action when a task is canceled.
     * Errors thrown will cancel the task cancelation and will be exposed as a GraphQLYogaError.
     */
    onTaskCancel?: (task: ExternalTask) => Promise<void>;
    /**
     * Hook triggered before a task linked to an external task is completed, but the external task should not be completed.
     * Allows you to perform a certain action when a task is completed.
     */
    onTaskSemiDone?: (task: ExternalTask) => Promise<void>;
    /**
     * Hook triggered before a task linked to an external task is completed (i.e. status == DONE).
     * Allows you to perform a certain action when a task is completed.
     * Errors thrown will cancel the task completion and will be exposed as a GraphQLYogaError.
     * This exposes the double checkmark button on task cards of tasks that have this external source.
     */
    onTaskDone?: (task: ExternalTask) => Promise<void>;
    /**
     * Webhook configurations
     */
    webhook?: {
      /**
       * This overrides the default webhook URL generated for the external source at `/webhook/${name}`
       * Not exposed in the GraphQL API
       */
      name?: string;
      /**
       * Hook triggered when a webhook event is received.
       * It should map to an ExternalTask or array of ExternalTask or return null if the webhook event is not relevant.
       */
      onWebhookEvent: (event: any) => Promise<ExternalTask | ExternalTask[] | null>;
      /**
       * Secret string used to verify the webhook event comes from the external source and not a malicious actor.
       */
      secret?: string;
    };
    /**
     * Polling configurations
     */
    polling?: {
      /**
       * Polling frequency in minutes.
       */
      frequencyInMinutes: string;
      /**
       * Hook triggered when a poll is done on the external source.
       * It should map to an ExternalTask or array of ExternalTask or return null if the poll results are not relevant.
       */
      onPoll?: () => Promise<ExternalTask | ExternalTask[] | null>;
    };
  };

  type ExternalSourceConfig = {
    /**
     * Key is the name of the external source to be stored in the DB.
     * It is also used to generate the webhook URL at `/webhook/${name}`, unless `webhook.webhookName` is specified.
     */
    [sourceNameInDB: string]: ExternalSource;
  };
}
