import { Day, Item, Task, Prisma } from "@prisma/client";
import { prisma } from "../../src/utils/prisma";
import { chance } from "./chance";

type P<T> = Partial<T>;
type FactorySingularMember = "day" | "task" | "taskTemplate" | "item";

export class Factory {
  private promises: { addAs: FactorySingularMember; promise: any }[] = [];

  constructor() {
    return this;
  }
  /**
   * This is the function that needs to be called at the end of the chain
   * so that there is no need to `await` each step.
   * @returns {Promise<{task: Task, taskTemplate: TaskTemplate, item: Item}>}
   */
  async run() {
    for (const { addAs, promise } of this.promises) {
      const thisKey = addAs as keyof typeof this;
      this[thisKey] = await promise;
      (this[(addAs + "s") as keyof typeof this] as Array<any>).push(this[thisKey]);
    }
    this.promises = [];
    return this;
  }

  // @ts-ignore as the tests will fail anyway if it's undefined
  day: Day;
  days: Day[] = [];
  newDay(overrides?: P<Prisma.DayCreateInput>) {
    const day = prisma.day.create({
      data: {
        date: new Date(),
        ...overrides,
      },
    });
    this.promises.push({ addAs: "day", promise: day });
    return this;
  }

  // @ts-ignore as the tests will fail anyway if it's undefined
  task: Task;
  tasks: Task[] = [];
  newTask(overrides?: P<Prisma.TaskCreateInput> & { date?: Date }) {
    const date = overrides?.date ?? new Date();
    delete overrides?.date;
    const task = prisma.task.create({
      data: {
        title: chance.sentence(),
        day: { connectOrCreate: { where: { date }, create: { date } } },
        ...overrides,
      } as Prisma.TaskCreateInput,
    });
    this.promises.push({ addAs: "task", promise: task });
    return this;
  }

  // @ts-ignore as the tests will fail anyway if it's undefined
  item: Item;
  items: Item[] = [];
  newItem(overrides?: P<Prisma.ItemCreateInput>) {
    const item = prisma.item.create({
      data: {
        title: chance.sentence(),
        ...overrides,
      },
    });
    this.promises.push({ addAs: "item", promise: item });
    return this;
  }
}
