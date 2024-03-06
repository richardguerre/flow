import { Prisma, definePlugin } from "@flowdev/plugin/server";

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";

export default definePlugin((opts) => {
  const UPSERT_ISSUE_JOB = `${opts.pluginSlug}-upsert-item-from-issue`;
  const PROCESS_WEBHOOK_EVENT_JOB_NAME = `${opts.pluginSlug}-process-webhook`;
  const GET_ISSUES_JOB_NAME = `${opts.pluginSlug}-get-issues`;

  const getTokensFromStore = async () => {
    const accountsTokensItem =
      await opts.store.getPluginItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY);
    if (!accountsTokensItem) {
      throw new opts.GraphQLError("User not authenticated.", {
        extensions: {
          code: "NOT_AUTHENTICATED",
          userFriendlyMessage:
            "You are not authenticated and will need to connect your Google account first.",
        },
      });
    }
    return accountsTokensItem.value;
  };

  /**
   * Gets the tokens from the store.
   * @throws If the user is not authenticated.
   * @throws If the access token requires to be refreshed. Linear currently doesn't allow refreshing a token.
   * @example
   * const token = await getToken(params);
   */
  const getToken = async (params: GetTokenParams): Promise<Tokens> => {
    const accountsTokens = params.accountsTokens ?? (await getTokensFromStore());
    const tokens = accountsTokens[params.account];
    if (!tokens) {
      throw new opts.GraphQLError("User not authenticated.", {
        extensions: {
          code: "NOT_AUTHENTICATED",
          userFriendlyMessage:
            "You are not authenticated and will need to connect your Google account first.",
        },
      });
    }

    if (opts.dayjs().isAfter(tokens.expires_at)) {
      // access token has expired, refresh it
      throw new opts.GraphQLError("Could not refresh token.", {
        extensions: {
          code: "COULD_NOT_REFRESH_TOKEN",
          userFriendlyMessage: "Could not connect to Linear. Try connecting the account again.",
        },
      });
    }
    return tokens;
  };

  return {
    onRequest: async (req) => {
      if (req.path === "/auth") {
        return Response.redirect(
          `https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth/callback`,
        );
      } else if (req.path === "/auth/callback") {
        const accountsTokensItem =
          await opts.store.getPluginItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY);
        const body = req.body as Tokens;
        const tokensData = {
          ...body,
          expires_at: opts
            .dayjs()
            .add((body.expires_in ?? 10) - 10, "seconds") // -10 is a 10 second buffer to account for latency in network requests
            .toISOString(),
        } as Tokens;
        if ("expires_in" in tokensData) delete tokensData.expires_in; // delete expires_in because it's not needed

        await opts.store.setSecretItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY, {
          ...(accountsTokensItem?.value ?? {}),
          [tokensData.email]: tokensData,
        });
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
      accounts: async () => {
        const tokenItem = await opts.store.getPluginItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY);
        if (!tokenItem)
          return {
            data: [],
          };
        return {
          data: Object.entries(tokenItem.value).map(([email, tokens]) => ({
            email,
            expiresAt: tokens.expires_at,
          })),
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
      work(GET_ISSUES_JOB_NAME, async (job) => {
        const jobData = job.data as { viewId: string };
        const accountTokens = await getTokensFromStore();
        // TODO: figure out how the user will configure the issues they want to fetch.
      }),
    ],
  };
});

type GetTokenParams = {
  account: string;
  /** The tokens to use to make the request. If not provided, the tokens will be fetched from the store. */
  accountsTokens?: AccountsTokens; // if the tokens are already known, they can be passed in to avoid fetching them again
};

type AccountsTokens = {
  [account: string]: Tokens;
};

type Tokens = {
  access_token: string;
  token_type: string;
  expires_at: string;
  expires_in?: never; // this is deleted before storing in the database, hence it's optional and will never be present
  scope: string;
  email: string;
};

type LinearIssue = {
  id: string;
  title: string;
  status: string;
};

type WebhookLinearIssue = LinearIssue; // TODO: change type to actual webhook payload type.
