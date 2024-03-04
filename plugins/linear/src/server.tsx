import { definePlugin } from "@flowdev/plugin/server";

const ACCOUNT_TOKEN_STORE_KEY = "account-token";

export default definePlugin((opts) => {
  const UPSERT_ISSUE_JOB = `${opts.pluginSlug}-upsert-item-from-issue`;
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
      }

      // TODO: webhook handler for issue updates from Linear

      return new Response();
    },
    operations: {
      /** Get the connected Linear account, if any. */
      account: async () => {
        const tokenItem = await opts.store.getPluginItem<AccountToken>(ACCOUNT_TOKEN_STORE_KEY);
        if (!tokenItem) return null;
        return {
          email: tokenItem.value.email,
          expiresAt: tokenItem.value.expires_at,
        };
      },
    },
    handlePgBossWork: (work) => [
      work(UPSERT_ISSUE_JOB, { batchSize: 5 }, async (jobs) => {
        // process 5 events at a time to go a little faster (processing 100 at a time might consume too much memory as webhook events and fetched issues can be large, especially if it includes conference data).
        for (const job of jobs) {
          const event = job.data as LinearIssue;
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
  title: string;
};
