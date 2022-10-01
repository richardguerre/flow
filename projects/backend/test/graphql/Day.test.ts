import { describe, it, expect } from "vitest";
import { withDb } from "../../.vitest/prisma";
import { graphql, gql } from "../../.vitest/server";
import { startOfDay, toDateOnly } from "../../src/utils/getDays";

describe("Day GraphQL type", () => {
  withDb();

  it("returns the fields available for a day", async () => {
    const res = await graphql({
      query: gql`
        query {
          days {
            edges {
              node {
                date
                tasks {
                  id
                }
                repeatingTasks {
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
              tasks: [],
              repeatingTasks: [],
            },
          },
        ],
      },
    });
  });
});
