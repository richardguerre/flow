import { describe, it, expect } from "vitest";
import { withDb } from "../../.vitest/prisma";
import { graphql, gql } from "../../.vitest/server";
import { startOfDay, toDateOnly } from "../../src/utils/getDays";

describe("Day GraphQL types", () => {
  withDb();

  it("returns the fields available for a day", async () => {
    const res = await graphql({
      query: gql`
        query {
          days {
            edges {
              node {
                date
                notes {
                  id
                }
                tasks {
                  id
                }
                routines {
                  id
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
              date: toDateOnly(startOfDay()),
              notes: [],
              tasks: [],
              routines: [],
            },
          },
        ],
      },
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
          node(id: "Day_1970-01-01") {
            ... on Day {
              id
            }
          }
        }
      `,
    });

    expect(res.status).toBe(200);
  });
});
