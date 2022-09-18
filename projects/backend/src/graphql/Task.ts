import { enumType, extendType, objectType } from "nexus";
import { Task, TaskStatus } from "nexus-prisma";
import { Task as DBTask } from "@prisma/client";
import { simpleCast } from "../utils/simpleCast";

// -------------- Task types --------------

export const TaskType = objectType({
  name: Task.$name,
  description: Task.$description,
  definition(t) {
    t.field(Task.id);
    t.field(Task.createdAt);
    t.field(Task.title);
    t.field(Task.status);
    t.field(simpleCast(Task.date, (val: Date) => new Date(val.setHours(0, 0, 0, 0))));
    t.field(Task.previousTaskDates);
    t.field(Task.durationInMinutes);
    t.field(Task.externalItem);
    t.field(Task.taskTemplate);
    t.boolean("repeats", { resolve: (task) => !!(task as DBTask).taskTemplateId });
  },
});

export const TaskStatusEnum = enumType(TaskStatus);
