import { dayjs } from "./dayjs";

export const pluginOptions = {
  /**
   * The dayjs package. This prevents the dayjs package from being bundled with the plugin, so that installs are faster.
   * It has some dayjs extensions already loaded:
   * - customParseFormat
   * - utc
   */
  dayjs,
};

export type ServerPluginOptions = typeof pluginOptions;
