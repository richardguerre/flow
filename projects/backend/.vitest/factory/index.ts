import { ExternalItem, Task, TaskTemplate, Prisma } from "@prisma/client";
import { prisma } from "../../src/utils/prisma";
import { chance } from "./chance";

type P<T> = Partial<T>;

export class Factory {
  private promises: { addAs: "task" | "taskTemplate" | "externalItem"; promise: any }[] = [];

  constructor() {
    return this;
  }
  /**
   * This is the function that needs to be called at the end of the chain
   * so that there is no need to `await` each step.
   * @returns {Promise<{task: Task, taskTemplate: TaskTemplate, externalItem: ExternalItem}>}
   */
  async run() {
    for (const { addAs, promise } of this.promises) {
      this[addAs] = await promise;
      this[addAs + "s"].push(this[addAs]);
    }
    this.promises = [];
    return this;
  }

  task: Task;
  tasks: Task[] = [];
  newTask(overrides?: P<Prisma.TaskCreateInput>) {
    const task = prisma.task.create({
      data: {
        title: chance.sentence(),
        ...overrides,
      },
    });
    this.promises.push({ addAs: "task", promise: task });
    return this;
  }

  taskTemplate: TaskTemplate;
  taskTemplates: TaskTemplate[] = [];
  newTaskTemplate(overrides?: P<Prisma.TaskTemplateCreateInput>) {
    const taskTemplate = prisma.taskTemplate.create({
      data: {
        title: chance.sentence(),
        ...overrides,
      },
    });
    this.promises.push({ addAs: "taskTemplate", promise: taskTemplate });
    return this;
  }

  externalItem: ExternalItem;
  externalItems: ExternalItem[] = [];
  newExternalItem(overrides?: P<Prisma.ExternalItemCreateInput>) {
    const externalItem = prisma.externalItem.create({
      data: {
        id: chance.guid(),
        title: chance.sentence(),
        source: "TestSource",
        ...overrides,
      },
    });
    this.promises.push({ addAs: "externalItem", promise: externalItem });
    return this;
  }
}
