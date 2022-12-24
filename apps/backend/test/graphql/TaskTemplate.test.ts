import { describe, it, expect } from "vitest";
import { withDb } from "../../.vitest/prisma";
import { Factory } from "../../.vitest/factory";
import { graphql, gql } from "../../.vitest/server";
import { encodeGlobalID } from "../../src/graphql/builder";
import { toDateOnly } from "../../src/utils/getDays";

describe("TaskTemplate GraphQL types", () => {
  withDb();

  it("returns the fields available for a task template", async () => {
    const { taskTemplate } = await new Factory().newTaskTemplate().run();

    const res = await graphql({
      query: gql`
        query {
          repeatingTasks {
            id
            durationInMinutes
            repeatsEvery
            firstDay
          }
        }
      `,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      repeatingTasks: [
        {
          id: encodeGlobalID("TaskTemplate", taskTemplate.id),
          durationInMinutes: taskTemplate.durationInMinutes,
          repeatsEvery: taskTemplate.repeats,
          firstDay: toDateOnly(taskTemplate.firstDay),
        },
      ],
    });
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
            ... on TaskTemplate {
              id
            }
          }
        }
      `,
    });

    expect(res.status).toBe(200);
  });
});
