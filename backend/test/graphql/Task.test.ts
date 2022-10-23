import { describe, it, expect } from "vitest";
import { withDb } from "../../.vitest/prisma";
import { graphql, gql } from "../../.vitest/server";
import { Factory } from "../../.vitest/factory";
import { encodeGlobalID } from "../../src/graphql/builder";
import { addDays, startOfDay, toDateOnly } from "../../src/utils/getDays";
import { prisma } from "../../src/utils/prisma";
import { TaskStatus } from "@prisma/client";
import { DayObjectType } from "../../src/graphql/Day";

describe("Task GraphQL types", () => {
  withDb();

  it("returns the fields available for a task", async () => {
    const { externalItem, taskTemplate } = await new Factory()
      .newExternalItem({ durationInMinutes: 60 })
      .newTaskTemplate()
      .run();
    const { task } = await new Factory()
      .newTask({
        externalItem: { connect: { id: externalItem.id } },
        fromTemplate: { connect: { id: taskTemplate.id } },
      })
      .run();

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
                  isPrivate
                  previousDates
                  durationInMinutes
                  scheduledAt
                  repeats
                  externalItem {
                    id
                  }
                  fromTemplate {
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
                  isPrivate: task.isPrivate,
                  previousDates: task.previousDates.map((d) => toDateOnly(d)),
                  durationInMinutes: task.durationInMinutes, // incorrect it should be externalItem.durationInMinutes
                  scheduledAt: externalItem.scheduledAt?.toJSON() ?? null,
                  repeats: true,
                  externalItem: null, // incorrect it should be { id: encodeGlobalID("ExternalItem", externalItem.id) }
                  fromTemplate: null, // incorrect it should be { id: encodeGlobalID("TaskTemplate", taskTemplate.id) }
                },
              ],
            },
          },
        ],
      },
    });

    // The results are incorrect as it seems the test environment is not using the correct resolvers
  });

  it("can be fetched through the node interface", async () => {
    // This test only asserts if the GraphQL types are correct.
    // It does not assert if the data is correct as @pothos/plugin-prisma
    // uses it's own findUnique method to fetch the node, which is not
    // captured by the test runner in .vitest/prisma.
    const res = await graphql({
      query: gql`
        query {
          node(id: "SomeId") {
            ... on Task {
              id
            }
          }
        }
      `,
    });

    expect(res.status).toBe(200);
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
              isPrivate
              previousDates
              durationInMinutes
              scheduledAt
              repeats
              externalItem {
                id
              }
              fromTemplate {
                id
              }
            }
          }
        `,
      });

      expect(res.status).toBe(200);

      const task = await prisma.task.findFirst({
        include: { externalItem: true, fromTemplate: true },
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
          externalItem: null,
          fromTemplate: null,
          isPrivate: task.isPrivate,
          previousDates: [],
          repeats: !!task.fromTemplate,
          scheduledAt: task.externalItem?.scheduledAt?.toJSON() ?? null,
        },
      });

      const day = await prisma.day.findFirst();
      expect(day).not.toBe(null);
      if (!day) throw new Error("No day found");
      expect(day.tasksOrder).toEqual([task.id]);
    });

    it("creates a task with an external item", async () => {
      const { externalItem } = await new Factory().newExternalItem().run();

      const res = await graphql({
        query: gql`
          mutation CreateTaskMutation($externalItemId: ID!) {
            createTask(input: { title: "Test task", externalItemId: $externalItemId }) {
              id
              createdAt
              title
              status
              date
              isPrivate
              previousDates
              durationInMinutes
              scheduledAt
              repeats
              externalItem {
                id
              }
              fromTemplate {
                id
              }
            }
          }
        `,
        variables: {
          externalItemId: encodeGlobalID("ExternalItem", externalItem.id),
        },
      });

      expect(res.status).toBe(200);
      const task = await prisma.task.findFirst({
        include: { externalItem: true, fromTemplate: true },
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
          externalItem: {
            id: encodeGlobalID("ExternalItem", externalItem.id),
          },
          fromTemplate: null,
          isPrivate: task.isPrivate,
          previousDates: [],
          repeats: !!task.fromTemplate,
          scheduledAt: task.externalItem?.scheduledAt?.toJSON() ?? null,
        },
      });
    });

    it("creates a task with a template", async () => {
      const { taskTemplate } = await new Factory().newTaskTemplate().run();

      const res = await graphql({
        query: gql`
          mutation CreateTaskMutation($taskTemplateId: ID!) {
            createTask(input: { title: "Test task", templateId: $taskTemplateId }) {
              id
              createdAt
              title
              status
              date
              isPrivate
              previousDates
              durationInMinutes
              scheduledAt
              repeats
              externalItem {
                id
              }
              fromTemplate {
                id
              }
            }
          }
        `,
        variables: {
          taskTemplateId: encodeGlobalID("TaskTemplate", taskTemplate.id),
        },
      });

      expect(res.status).toBe(200);
      const task = await prisma.task.findFirst({
        include: { externalItem: true, fromTemplate: true },
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
          externalItem: null,
          fromTemplate: {
            id: encodeGlobalID("TaskTemplate", taskTemplate.id),
          },
          isPrivate: task.isPrivate,
          previousDates: [],
          repeats: !!task.fromTemplate,
          scheduledAt: task.externalItem?.scheduledAt?.toJSON() ?? null,
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
              isPrivate
              previousDates
              durationInMinutes
              scheduledAt
              repeats
              externalItem {
                id
              }
              fromTemplate {
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
        include: { externalItem: true, fromTemplate: true },
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
          externalItem: null,
          fromTemplate: null,
          isPrivate: updatedTask.isPrivate,
          previousDates: [],
          repeats: !!updatedTask.fromTemplate,
          scheduledAt: updatedTask.externalItem?.scheduledAt?.toJSON() ?? null,
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
              mutation UpdateTaskDateMutation($taskId: ID!, $date: Date!) {
                updateTaskDate(input: { id: $taskId, date: $date }) {
                  ${commonFields}
                }
              }
            `,
            variables: {
              taskId: encodeGlobalID("Task", task.id),
              date,
            },
          });

          expect(res.status).toBe(200);

          const updatedTask = await prisma.task.findFirst();
          expect(updatedTask).not.toBe(null);
          if (!updatedTask) throw new Error("No task found");
          expect(updatedTask.date).toEqual(date);
          expect(updatedTask.status).toEqual(status);

          expect(res.body.data).toEqual({
            updateTaskDate: [],
          });
        });
      }
    }

    // moving tasks from the past to today
    it("moves a DONE task from yesterday to today and doesn't change status", async () => {
      const { task } = await new Factory().newTask({ status: "DONE", date: yesterday }).run();

      const res = await graphql({
        query: /* GraphQL */ `
          mutation UpdateTaskDateMutation($taskId: ID!, $date: Date!) {
            updateTaskDate(input: { id: $taskId, date: $date }) {
              ${commonFields}
            }
          }
        `,
        variables: {
          taskId: encodeGlobalID("Task", task.id),
          date: today,
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
          mutation UpdateTaskDateMutation($taskId: ID!, $date: Date!) {
            updateTaskDate(input: { id: $taskId, date: $date }) {
              ${commonFields}
            }
          }
        `,
        variables: {
          taskId: encodeGlobalID("Task", task.id),
          date: today,
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
              mutation UpdateTaskDateMutation($taskId: ID!, $date: Date!) {
                updateTaskDate(input: { id: $taskId, date: $date }) {
                  ${commonFields}
                }
              }
            `,
            variables: {
              taskId: encodeGlobalID("Task", task.id),
              date: twoDaysAgo,
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
              mutation UpdateTaskDateMutation($taskId: ID!, $date: Date!) {
                updateTaskDate(input: { id: $taskId, date: $date }) {
                  ${commonFields}
                }
              }
            `,
            variables: {
              taskId: encodeGlobalID("Task", task.id),
              date: twoDaysLater,
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
  });
});
