import type * as $PrismaTypes from "@prisma/client";

/**
 * The following types are exported so that plugins can use them
 */

export type * as PrismaTypes from "@prisma/client";

export type TaskInTemplate = Omit<$PrismaTypes.Task, "title"> & {
  title: Handlebars.SafeString;
  tags: $PrismaTypes.TaskTag[];
  pluginDatas: $PrismaTypes.TaskPluginData[];
  item: { id: number } | null;
};
