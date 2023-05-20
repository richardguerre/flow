import { describe, it, expect } from "vitest";
import { withDb } from "../../.vitest/prisma";
import { graphql, gql } from "../../.vitest/server";
import { Factory } from "../../.vitest/factory";
import { encodeGlobalID } from "../../src/graphql/builder";

describe("Item GraphQL types", () => {
  withDb();

  it("returns the fields available for an external item", async () => {
    const { item } = await new Factory().newItem().run();

    const res = await graphql({
      query: gql`
        query {
          items {
            edges {
              node {
                id
                createdAt
                title
                isRelevant
                scheduledAt
                durationInMinutes
              }
            }
          }
        }
      `,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      items: {
        edges: [
          {
            node: {
              id: encodeGlobalID("Item", item.id),
              createdAt: item.createdAt.toJSON(),
              title: item.title,
              isRelevant: item.isRelevant,
              scheduledAt: item.scheduledAt?.toJSON() ?? null,
              durationInMinutes: item.durationInMinutes,
            },
          },
        ],
      },
    });
  });
});
