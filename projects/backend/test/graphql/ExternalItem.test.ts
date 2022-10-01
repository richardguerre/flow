import { describe, it, expect } from "vitest";
import { withDb } from "../../.vitest/prisma";
import { graphql, gql } from "../../.vitest/server";
import { Factory } from "../../.vitest/factory";
import { encodeGlobalID } from "../../src/graphql/builder";

describe("ExternalItem GraphQL type", () => {
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
              createdAt: externalItem.createdAt.toISOString(),
              title: externalItem.title,
              isRelevant: externalItem.isRelevant,
              url: externalItem.url,
              scheduledAt: externalItem.scheduledAt?.toISOString() ?? null,
              durationInMinutes: externalItem.durationInMinutes,
              source: externalItem.source,
              iconUrl: null,
            },
          },
        ],
      },
    });
  });
});
