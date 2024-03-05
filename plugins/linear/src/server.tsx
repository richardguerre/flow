import { Prisma, definePlugin } from "@flowdev/plugin/server";

const ACCOUNT_TOKEN_STORE_KEY = "account-token";

export default definePlugin((opts) => {
  const UPSERT_ISSUE_JOB = `${opts.pluginSlug}-upsert-item-from-issue`;
  const PROCESS_WEBHOOK_EVENT_JOB_NAME = `${opts.pluginSlug}-process-webhook`;
  return {
    onRequest: async (req) => {
      if (req.path === "/auth") {
        return Response.redirect(
          `https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth/callback`,
        );
      } else if (req.path === "/auth/callback") {
        const body = req.body as AccountToken;
        const tokensData = {
          ...body,
          expires_at: opts
            .dayjs()
            .add((body.expires_in ?? 10) - 10, "seconds") // -10 is a 10 second buffer to account for latency in network requests
            .toISOString(),
        } as AccountToken;
        if ("expires_in" in tokensData) delete tokensData.expires_in; // delete expires_in because it's not needed

        await opts.store.setSecretItem<AccountToken>(ACCOUNT_TOKEN_STORE_KEY, tokensData);
        return new Response(); // return 200
      } else if (req.path === "/events/webhook" && req.request.method === "POST") {
        const linearIssue = req.body as WebhookLinearIssue;
        if (!linearIssue.id) {
          console.log("❌ Could not find Linear issue ID in req.body");
          return new Response(); // return 200 as the webhook event doesn't concern the plugin and we don't want Linear to retry sending it.
        }
        await opts.pgBoss.send(PROCESS_WEBHOOK_EVENT_JOB_NAME, { linearIssue });
        return new Response();
      }

      return new Response();
    },
    operations: {
      /** Get the connected Linear account, if any. */
      account: async () => {
        const tokenItem = await opts.store.getPluginItem<AccountToken>(ACCOUNT_TOKEN_STORE_KEY);
        if (!tokenItem)
          return {
            data: null,
          };
        return {
          data: {
            email: tokenItem.value.email,
            expiresAt: tokenItem.value.expires_at,
          },
        };
      },
    },
    handlePgBossWork: (work) => [
      work(UPSERT_ISSUE_JOB, { batchSize: 5 }, async (jobs) => {
        // process 5 events at a time to go a little faster (processing 100 at a time might consume too much memory as webhook events and fetched issues can be large, especially if it includes conference data).
        for (const job of jobs) {
          const issue = job.data as LinearIssue;
          const item = await opts.prisma.item.findFirst({
            where: {
              pluginDatas: { some: { originalId: issue.id, pluginSlug: opts.pluginSlug } },
            },
            include: {
              pluginDatas: {
                where: { originalId: issue.id, pluginSlug: opts.pluginSlug },
                select: { id: true },
              },
            },
          });

          // TODO: have and use setting to configure terminal status(es).
          const isRelevant = true;

          const itemCommonBetweenUpdateAndCreate = {
            title: issue.title,
            isRelevant,
            inboxPoints: 10, // TODO: make it configurable by the user.
          } satisfies Prisma.ItemUpdateInput;

          const min = {
            id: issue.id,
            title: issue.title,
            status: issue.status,
          } satisfies LinearIssueItemMin;
          const full = {
            ...issue,
            ...min,
          } satisfies LinearIssueItemFull;

          if (item) {
            await opts.prisma.item.update({
              where: { id: item.id },
              data: {
                ...itemCommonBetweenUpdateAndCreate,
                pluginDatas: {
                  update: {
                    where: { id: item.pluginDatas[0]?.id },
                    data: { min, full },
                  },
                },
              },
            });
          } else {
            await opts.prisma.item.create({
              data: {
                ...itemCommonBetweenUpdateAndCreate,
                pluginDatas: {
                  create: {
                    pluginSlug: opts.pluginSlug,
                    originalId: issue.id,
                    min,
                    full,
                  },
                },
              },
            });
          }

          console.log("✔ Upserted item from Linear issue", issue.id);
        }
      }),
    ],
  };
});

type AccountToken = {
  access_token: string;
  token_type: string;
  expires_in?: never; // this is deleted before storing in the database, hence it's optional and will never be present
  expires_at: string;
  scope: string;
  email: string;
};

type LinearIssue = {
  id: string;
  title: string;
  status: string;
};

type WebhookLinearIssue = LinearIssue; // TODO: change type to actual webhook payload type.
