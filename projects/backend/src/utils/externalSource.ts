export type ExternalSource = {
  name: string;
  description?: string;
  /**
   * This overrides the default webhook URL generated for the external source at `/api/webhooks/${name}`
   */
  webhookUrl?: string;
};
