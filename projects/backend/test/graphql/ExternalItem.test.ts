import { describe, it, expect } from "vitest";
import { withDb } from "../../.vitest/prisma";
import { graphql, gql } from "../../.vitest/server";
import { Factory } from "../../.vitest/factory";
import { encodeGlobalID } from "../../src/graphql/builder";

describe("ExternalItem GraphQL types", () => {
  withDb();

  it("returns the fields available for an external item", async () => {
    const { externalItem } = await new Factory().newExternalItem().run();

    const res = await graphql({
      query: gql`
        query {
          externalItems {
            edges {
              node {
                id
                createdAt
                title
                isRelevant
                url
                scheduledAt
                durationInMinutes
                source
                iconUrl
              }
            }
          }
        }
      `,
    });

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({
      externalItems: {
        edges: [
          {
            node: {
              id: encodeGlobalID("ExternalItem", externalItem.id),
              createdAt: externalItem.createdAt.toJSON(),
              title: externalItem.title,
              isRelevant: externalItem.isRelevant,
              url: externalItem.url,
              scheduledAt: externalItem.scheduledAt?.toJSON() ?? null,
              durationInMinutes: externalItem.durationInMinutes,
              source: externalItem.source,
              iconUrl: null,
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
          node(id: "SomeId") {
            ... on ExternalItem {
              id
            }
          }
        }
      `,
    });

    expect(res.status).toBe(200);
  });
});
