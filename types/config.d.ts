export {};

declare global {
  type ExternalItem = {
    /**
     * The ID of the item in the external source.
     * Must be unique accross all external sources, and must not change from one sync to another.
     */
    id: string;
    /**
     * The name of the item.
     * It would be used as the intial title when creating a task.
     */
    title: string;
    /** Whether the item is relevant to the user, if so it will be shown in the UI. */
    isRelevant: boolean;
    /** The URL to the item in the external source. */
    url?: string;
    /** The date and time the item is scheduled at */
    scheduledAt?: Date;
    /**
     * The length of time the item should take to complete
     * When coupled with scheduledAt (e.g. when it's a calendar event), the duration determines when the item ends.
     */
    duration?: number;
  };

  type ExternalSource = {
    /**
     * Description of the external source of tasks.
     * Exposed in the GraphQL API
     */
    description?: string;
    /**
     * Hook triggered before a task is created with an external item.
     * Allows you to perform additional actions when a task is created.
     * Errors thrown will cancel the task creation and will be exposed as a GraphQLYogaError.
     */
    onTaskCreate?: (task: ExternalItem) => Promise<void>;
    /**
     * Hook triggered before a task linked to an external item is canceled.
     * Allows you to perform a certain action when a task is canceled.
     * Errors thrown will cancel the task cancelation and will be exposed as a GraphQLYogaError.
     */
    onTaskCancel?: (task: ExternalItem) => Promise<void>;
    /**
     * Hook triggered before a task linked to an external item is completed, but the external item should not be completed.
     * Allows you to perform a certain action when a task is completed.
     */
    onTaskSemiDone?: (task: ExternalItem) => Promise<void>;
    /**
     * Hook triggered before a task linked to an external item is completed (i.e. status == DONE).
     * Allows you to perform a certain action when a task is completed.
     * Errors thrown will cancel the task completion and will be exposed as a GraphQLYogaError.
     * This exposes the double checkmark button on task cards of tasks that have this external source.
     */
    onTaskDone?: (task: ExternalItem) => Promise<void>;
    /** Webhook configurations */
    webhook?: {
      /**
       * This overrides the default webhook URL generated for the external source at `/webhook/${name}`
       * Not exposed in the GraphQL API
       */
      name?: string;
      /**
       * Hook triggered when a webhook event is received.
       * It should map to an ExternalItem or array of ExternalItem or return null if the webhook event is not relevant.
       */
      onWebhookEvent: (event: any) => Promise<ExternalItem | ExternalItem[] | null>;
      /**
       * Secret string used to verify the webhook event comes from the external source and not a malicious actor.
       */
      secret?: string;
    };
    /** Polling configurations */
    polling?: {
      /** Polling frequency in minutes. */
      frequencyInMinutes: string;
      /**
       * Hook triggered when a poll is done on the external source.
       * It should map to an ExternalItem or array of ExternalItem or return null if the poll results are not relevant.
       */
      onPoll?: () => Promise<ExternalItem | ExternalItem[] | null>;
    };
  };

  type ExternalSources = {
    /**
     * Key is the name of the external source to be stored in the DB. It should not be changed once set.
     * It is also used to generate the webhook URL at `/webhook/${name}`, unless `webhook.webhookName` is specified.
     */
    [sourceNameInDB: string]: ExternalSource;
  };
}
