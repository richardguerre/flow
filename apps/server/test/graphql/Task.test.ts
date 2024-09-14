import { describe, it, expect } from "vitest";
import { withDb } from "../../.vitest/prisma";
import { graphql, gql } from "../../.vitest/server";
import { Factory } from "../../.vitest/factory";
import { encodeGlobalID } from "@flowdev/common";
import { addDays, startOfDay, toDateOnly } from "../../src/utils/getDays";
import { prisma } from "../../src/utils/prisma";
import { TaskStatus } from "@prisma/client";

describe("Task GraphQL types", () => {
  withDb();

  it("returns the fields available for a task", async () => {
    const { item } = await new Factory().newItem({ durationInMinutes: 60 }).run();
    const { task } = await new Factory().newTask({ item: { connect: { id: item.id } } }).run();

    const res = await graphql({
      query: gql`
        query {
          days {
            edges {
              node {
                tasks {
                  id
                  createdAt
                  title
                  status
                  date
                  durationInMinutes
                  item {
                    id
                  }
                }
              }
            }
          }
        }
      `,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      days: {
        edges: [
          {
            node: {
              tasks: [
                {
                  id: encodeGlobalID("Task", task.id),
                  createdAt: task.createdAt.toJSON(),
                  title: task.title,
                  status: task.status,
                  date: toDateOnly(task.date),
                  durationInMinutes: item.durationInMinutes,
                  item: { id: encodeGlobalID("Item", item.id) },
                },
              ],
            },
          },
        ],
      },
    });

    // The results are incorrect as it seems the test environment is not using the correct resolvers
  });
});

describe("Task GraphQL mutations", () => {
  withDb();
  const allStatuses: TaskStatus[] = ["TODO", "DONE", "CANCELED"];
  const terminalStatuses: TaskStatus[] = ["DONE", "CANCELED"];

  describe("createTask", () => {
    it("creates a task using defaults", async () => {
      const res = await graphql({
        query: gql`
          mutation {
            createTask(input: { title: "Test task" }) {
              id
              createdAt
              title
              status
              date
              durationInMinutes
              item {
                id
              }
            }
          }
        `,
      });

      expect(res.status).toBe(200);

      const task = await prisma.task.findFirst({
        include: { item: true },
      });
      expect(task).not.toBe(null);
      if (!task) throw new Error("No task found");

      expect(res.body.data).toEqual({
        createTask: {
          id: encodeGlobalID("Task", task.id),
          createdAt: task.createdAt.toJSON(),
          title: "Test task",
          status: task.status,
          date: toDateOnly(task.date),
          durationInMinutes: task.durationInMinutes,
          item: null,
        },
      });

      const day = await prisma.day.findFirst();
      expect(day).not.toBe(null);
      if (!day) throw new Error("No day found");
      expect(day.tasksOrder).toEqual([task.id]);
    });

    it("creates a task with an external item", async () => {
      const { item } = await new Factory().newItem().run();

      const res = await graphql({
        query: gql`
          mutation CreateTaskMutation($itemId: ID!) {
            createTask(input: { title: "Test task", itemId: $itemId }) {
              id
              createdAt
              title
              status
              date
              durationInMinutes
              item {
                id
              }
            }
          }
        `,
        variables: {
          itemId: encodeGlobalID("Item", item.id),
        },
      });

      expect(res.status).toBe(200);
      const task = await prisma.task.findFirst({
        include: { item: true },
      });
      expect(task).not.toBe(null);
      if (!task) throw new Error("No task found");

      expect(res.body.data).toEqual({
        createTask: {
          id: encodeGlobalID("Task", task.id),
          createdAt: task.createdAt.toJSON(),
          title: "Test task",
          status: task.status,
          date: toDateOnly(task.date),
          durationInMinutes: task.durationInMinutes,
          item: {
            id: encodeGlobalID("Item", item.id),
          },
        },
      });
    });
  });

  describe("updateTask", () => {
    it("updates a task", async () => {
      const { task } = await new Factory().newTask().run();

      const res = await graphql({
        query: gql`
          mutation UpdateTaskMutation($taskId: ID!) {
            updateTask(input: { id: $taskId, title: "Updated title" }) {
              id
              createdAt
              title
              status
              date
              durationInMinutes
              item {
                id
              }
            }
          }
        `,
        variables: {
          taskId: encodeGlobalID("Task", task.id),
        },
      });

      expect(res.status).toBe(200);

      const updatedTask = await prisma.task.findFirst({
        include: { item: true },
      });
      expect(updatedTask).not.toBe(null);
      if (!updatedTask) throw new Error("No task found");

      expect(res.body.data).toEqual({
        updateTask: {
          id: encodeGlobalID("Task", updatedTask.id),
          createdAt: updatedTask.createdAt.toJSON(),
          title: "Updated title",
          status: "TODO",
          date: toDateOnly(updatedTask.date),
          durationInMinutes: updatedTask.durationInMinutes,
          item: null,
        },
      });
    });
  });

  describe("updateTaskStatus", () => {
    const commonFields = `
      date
      tasks {
        __typename
        id
        date
        status
      }
    `;

    // changing status of tasks from today
    for (const startStatus of allStatuses) {
      for (const endStatus of allStatuses) {
        it(`updates a ${startStatus} task from today to ${endStatus}`, async () => {
          const today = startOfDay();
          const { task } = await new Factory().newTask({ status: startStatus, date: today }).run();

          const res = await graphql({
            query: /* GraphQL */ `
              mutation UpdateTaskStatusMutation($taskId: ID!, $status: TaskStatus!) {
                updateTaskStatus(input: { id: $taskId, status: $status }) {
                  ${commonFields}
                }
              }
            `,
            variables: {
              taskId: encodeGlobalID("Task", task.id),
              status: endStatus,
            },
          });

          expect(res.status).toBe(200);

          const updatedTask = await prisma.task.findFirst();
          expect(updatedTask).not.toBe(null);
          if (!updatedTask) throw new Error("No task found");

          expect(res.body.data).toEqual({
            updateTaskStatus:
              startStatus === endStatus
                ? []
                : [
                    {
                      date: toDateOnly(today),
                      tasks: [
                        {
                          __typename: "Task",
                          id: encodeGlobalID("Task", task.id),
                          date: toDateOnly(today),
                          status: endStatus,
                        },
                      ],
                    },
                  ],
          });
        });
      }
    }

    // changing status of tasks in the past
    for (const startStatus of terminalStatuses) {
      it(`updates a ${startStatus} task in the past to TODO and changes date to today`, async () => {
        const yesterday = addDays(new Date(), -1);
        const { task } = await new Factory()
          .newTask({ status: startStatus, date: yesterday })
          .run();

        const res = await graphql({
          query: /* GraphQL */ `
            mutation UpdateTaskStatusMutation($taskId: ID!) {
              updateTaskStatus(input: { id: $taskId, status: TODO }) {
                ${commonFields}
              }
            }
          `,
          variables: {
            taskId: encodeGlobalID("Task", task.id),
          },
        });

        expect(res.status).toBe(200);

        const updatedTask = await prisma.task.findFirst();
        expect(updatedTask).not.toBe(null);
        if (!updatedTask) throw new Error("No task found");

        const today = startOfDay();
        expect(res.body.data).toEqual({
          updateTaskStatus: [
            {
              date: toDateOnly(yesterday),
              tasks: [],
            },
            {
              date: toDateOnly(today),
              tasks: [
                {
                  __typename: "Task",
                  id: encodeGlobalID("Task", task.id),
                  date: toDateOnly(today),
                  status: "TODO",
                },
              ],
            },
          ],
        });
      });
    }

    // changing status of tasks in the future (e.g. tomorrow)
    for (const endStatus of terminalStatuses) {
      it("updates a TODO task in the future to DONE and changes date to today", async () => {
        const tomorrow = addDays(new Date(), 1);
        const { task } = await new Factory().newTask({ status: "TODO", date: tomorrow }).run();

        const res = await graphql({
          query: /* GraphQL */ `
            mutation UpdateTaskStatusMutation($taskId: ID!, $status: TaskStatus!) {
              updateTaskStatus(input: { id: $taskId, status: $status }) {
                ${commonFields}
              }
            }
          `,
          variables: {
            taskId: encodeGlobalID("Task", task.id),
            status: endStatus,
          },
        });

        expect(res.status).toBe(200);

        const updatedTask = await prisma.task.findFirst();
        expect(updatedTask).not.toBe(null);
        if (!updatedTask) throw new Error("No task found");

        const today = startOfDay();
        expect(res.body.data).toEqual({
          updateTaskStatus: [
            {
              date: toDateOnly(today),
              tasks: [
                {
                  __typename: "Task",
                  id: encodeGlobalID("Task", task.id),
                  date: toDateOnly(today),
                  status: endStatus,
                },
              ],
            },
            {
              date: toDateOnly(tomorrow),
              tasks: [],
            },
          ],
        });
      });
    }
  });

  describe("updateTaskDate", () => {
    const commonFields = `
      date
      tasks {
        __typename
        id
        date
        status
      }
    `;
    const twoDaysAgo = addDays(startOfDay(), -2);
    const yesterday = addDays(startOfDay(), -1);
    const today = startOfDay();
    const tomorrow = addDays(startOfDay(), 1);
    const twoDaysLater = addDays(startOfDay(), 2);
    const allDays = [
      ["yesterday", yesterday],
      ["today", today],
      ["tomorrow", tomorrow],
    ] as const;

    // moving tasks already in the desired date
    for (const [day, date] of allDays) {
      for (const status of allStatuses) {
        it(`does nothing when moving a ${status} task from ${day} to ${day}`, async () => {
          const { task } = await new Factory().newTask({ status, date }).run();

          const res = await graphql({
            query: /* GraphQL */ `
              mutation UpdateTaskDateMutation($input: MutationUpdateTaskDateInput!) {
                updateTaskDate(input: $input) {
                  ${commonFields}
                }
              }
            `,
            variables: {
              input: {
                id: encodeGlobalID("Task", task.id),
                date: toDateOnly(date),
                newTasksOrder: [encodeGlobalID("Task", task.id)],
              },
            },
          });

          expect(res.status).toBe(200);

          const updatedTask = await prisma.task.findFirst();
          expect(updatedTask).not.toBe(null);
          if (!updatedTask) throw new Error("No task found");
          expect(updatedTask.date).toEqual(date);
          expect(updatedTask.status).toEqual(status);

          expect(res.body.data).toEqual({
            updateTaskDate: [
              {
                date: toDateOnly(date),
                tasks: [
                  {
                    __typename: "Task",
                    id: encodeGlobalID("Task", task.id),
                    date: toDateOnly(date),
                    status,
                  },
                ],
              },
            ],
          });
        });
      }
    }

    // moving tasks from the past to today
    it("moves a DONE task from yesterday to today and doesn't change status", async () => {
      const { task } = await new Factory().newTask({ status: "DONE", date: yesterday }).run();

      const res = await graphql({
        query: /* GraphQL */ `
          mutation UpdateTaskDateMutation($input: MutationUpdateTaskDateInput!) {
            updateTaskDate(input: $input) {
              ${commonFields}
            }
          }
        `,
        variables: {
          input: {
            id: encodeGlobalID("Task", task.id),
            date: toDateOnly(today),
            newTasksOrder: [encodeGlobalID("Task", task.id)],
          },
        },
      });

      expect(res.status).toBe(200);

      const updatedTask = await prisma.task.findFirst();
      expect(updatedTask).not.toBe(null);
      if (!updatedTask) throw new Error("No task found");

      expect(res.body.data).toEqual({
        updateTaskDate: [
          {
            date: toDateOnly(yesterday),
            tasks: [],
          },
          {
            date: toDateOnly(today),
            tasks: [
              {
                __typename: "Task",
                id: encodeGlobalID("Task", task.id),
                date: toDateOnly(today),
                status: "DONE",
              },
            ],
          },
        ],
      });
    });

    // moving tasks from the future to today
    it("moves a TODO task from tomorrow to today and doesn't change status", async () => {
      const { task } = await new Factory().newTask({ status: "TODO", date: tomorrow }).run();

      const res = await graphql({
        query: /* GraphQL */ `
          mutation UpdateTaskDateMutation($input: MutationUpdateTaskDateInput!) {
            updateTaskDate(input: $input) {
              ${commonFields}
            }
          }
        `,
        variables: {
          input: {
            id: encodeGlobalID("Task", task.id),
            date: toDateOnly(today),
            newTasksOrder: [encodeGlobalID("Task", task.id)],
          },
        },
      });

      expect(res.status).toBe(200);

      const updatedTask = await prisma.task.findFirst();
      expect(updatedTask).not.toBe(null);
      if (!updatedTask) throw new Error("No task found");

      expect(res.body.data).toEqual({
        updateTaskDate: [
          {
            date: toDateOnly(today),
            tasks: [
              {
                __typename: "Task",
                id: encodeGlobalID("Task", task.id),
                date: toDateOnly(today),
                status: "TODO",
              },
            ],
          },
          {
            date: toDateOnly(tomorrow),
            tasks: [],
          },
        ],
      });
    });

    // moving tasks into the past from allDays
    for (const [startDay, startDate] of allDays) {
      for (const startStatus of allStatuses) {
        it(`moves a ${startStatus} task from ${startDay} into the past and changes status to DONE`, async () => {
          const { task } = await new Factory()
            .newTask({ status: startStatus, date: startDate })
            .run();

          const res = await graphql({
            query: /* GraphQL */ `
              mutation UpdateTaskDateMutation($input: MutationUpdateTaskDateInput!) {
                updateTaskDate(input: $input) {
                  ${commonFields}
                }
              }
            `,
            variables: {
              input: {
                id: encodeGlobalID("Task", task.id),
                date: toDateOnly(twoDaysAgo),
                newTasksOrder: [encodeGlobalID("Task", task.id)],
              },
            },
          });

          expect(res.status).toBe(200);

          const updatedTask = await prisma.task.findFirst();
          expect(updatedTask).not.toBe(null);
          if (!updatedTask) throw new Error("No task found");

          expect(res.body.data).toEqual({
            updateTaskDate: [
              {
                date: toDateOnly(twoDaysAgo),
                tasks: [
                  {
                    __typename: "Task",
                    id: encodeGlobalID("Task", task.id),
                    date: toDateOnly(twoDaysAgo),
                    status: "DONE",
                  },
                ],
              },
              {
                date: toDateOnly(startDate),
                tasks: [],
              },
            ],
          });
        });
      }
    }

    // moving tasks into the future from allDays
    for (const [startDay, startDate] of allDays) {
      for (const startStatus of allStatuses) {
        it(`moves a ${startStatus} task from ${startDay} into the future and changes status to TODO`, async () => {
          const { task } = await new Factory()
            .newTask({ status: startStatus, date: startDate })
            .run();

          const res = await graphql({
            query: /* GraphQL */ `
              mutation UpdateTaskDateMutation($input: MutationUpdateTaskDateInput!) {
                updateTaskDate(input: $input) {
                  ${commonFields}
                }
              }
            `,
            variables: {
              input: {
                id: encodeGlobalID("Task", task.id),
                date: toDateOnly(twoDaysLater),
                newTasksOrder: [encodeGlobalID("Task", task.id)],
              },
            },
          });

          expect(res.status).toBe(200);

          const updatedTask = await prisma.task.findFirst();
          expect(updatedTask).not.toBe(null);
          if (!updatedTask) throw new Error("No task found");

          expect(res.body.data).toEqual({
            updateTaskDate: [
              {
                date: toDateOnly(startDate),
                tasks: [],
              },
              {
                date: toDateOnly(twoDaysLater),
                tasks: [
                  {
                    __typename: "Task",
                    id: encodeGlobalID("Task", task.id),
                    date: toDateOnly(twoDaysLater),
                    status: "TODO",
                  },
                ],
              },
            ],
          });
        });
      }
    }

    it("moves a task from today to today and re-orders the day", async () => {
      const date = today;
      const { tasks } = await new Factory()
        .newTask({ status: "TODO", date }) // 0
        .newTask({ status: "TODO", date }) // 1
        .run();
      await prisma.day.update({
        where: { date },
        data: { tasksOrder: { set: [tasks[0]!.id, tasks[1]!.id] } },
      });

      // move task 0 after task 1
      const res = await graphql({
        query: /* GraphQL */ `
          mutation UpdateTaskDateMutation($input: MutationUpdateTaskDateInput!) {
            updateTaskDate(input: $input) {
              date
              tasks {
                id
              }
            }
          }
        `,
        variables: {
          input: {
            id: encodeGlobalID("Task", tasks[0]!.id),
            date: toDateOnly(today),
            newTasksOrder: [
              encodeGlobalID("Task", tasks[1]!.id),
              encodeGlobalID("Task", tasks[0]!.id),
            ],
          },
        },
      });

      expect(res.status).toBe(200);

      const updatedTasks = await prisma.task.findMany();
      expect(updatedTasks).toHaveLength(2);

      expect(res.body.data).toEqual({
        updateTaskDate: [
          {
            date: toDateOnly(today),
            tasks: [
              { id: encodeGlobalID("Task", tasks[1]!.id) },
              { id: encodeGlobalID("Task", tasks[0]!.id) },
            ],
          },
        ],
      });
    });

    it("moves a task to tomorrow and re-orders the day", async () => {
      const { tasks } = await new Factory()
        .newTask({ status: "TODO", date: today }) // 0
        .newTask({ status: "TODO", date: tomorrow }) // 1
        .newTask({ status: "TODO", date: tomorrow }) // 2
        .run();
      await prisma.day.update({
        where: { date: today },
        data: { tasksOrder: { set: [tasks[0]!.id] } },
      });
      await prisma.day.update({
        where: { date: tomorrow },
        data: { tasksOrder: { set: [tasks[1]!.id, tasks[2]!.id] } },
      });

      // move task 0 to tomorrow and in between task 1 and 2
      const res = await graphql({
        query: /* GraphQL */ `
          mutation UpdateTaskDateMutation($input: MutationUpdateTaskDateInput!) {
            updateTaskDate(input: $input) {
              ${commonFields}
            }
          }
        `,
        variables: {
          input: {
            id: encodeGlobalID("Task", tasks[0]!.id),
            date: toDateOnly(tomorrow),
            newTasksOrder: [
              encodeGlobalID("Task", tasks[1]!.id),
              encodeGlobalID("Task", tasks[0]!.id),
              encodeGlobalID("Task", tasks[2]!.id),
            ],
          },
        },
      });

      expect(res.status).toBe(200);

      expect(res.body.data).toEqual({
        updateTaskDate: [
          {
            date: toDateOnly(today),
            tasks: [],
          },
          {
            date: toDateOnly(tomorrow),
            tasks: [
              {
                __typename: "Task",
                id: encodeGlobalID("Task", tasks[1]!.id),
                date: toDateOnly(tomorrow),
                status: "TODO",
              },
              {
                __typename: "Task",
                id: encodeGlobalID("Task", tasks[0]!.id),
                date: toDateOnly(tomorrow),
                status: "TODO",
              },
              {
                __typename: "Task",
                id: encodeGlobalID("Task", tasks[2]!.id),
                date: toDateOnly(tomorrow),
                status: "TODO",
              },
            ],
          },
        ],
      });
    });
  });
});
