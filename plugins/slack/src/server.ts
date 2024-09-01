import { definePlugin } from "@flowdev/plugin/server";

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";

export default definePlugin((opts) => {
  return {
    onRequest: async (req) => {
      if (req.path === "/auth") {
        return Response.redirect(
          `https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth/callback`,
        );
      } else if (req.path === "/auth/callback") {
        const accountsTokensItem =
          await opts.store.getPluginItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY);
        const { ok, ...body } = req.body as AuthCallbackData;
        if (!ok) {
          console.log("❌ Slack auth callback failed - req.body.ok is false");
          return new Response("req.body.ok is false", { status: 500 });
        }

        const tokensData = {
          ...body,
          created_at: new Date().toISOString(),
        } as Tokens;

        await opts.store.setSecretItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY, {
          ...(accountsTokensItem?.value ?? {}),
          [tokensData.email]: tokensData,
        });

        await opts.pgBoss.send(CONNECT_ACCOUNT_JOB_NAME, {
          token: body.access_token,
        } satisfies JobConnectAccount);

        return new Response(); // return 200
      }

      return new Response(); // return 200
    },
  };
});

type AccountsTokens = {
  [account: string]: Tokens;
};

type Tokens = Omit<AuthCallbackData, "ok"> & {
  created_at: string;
};

/** example https://api.slack.com/methods/oauth.v2.access */
type AuthCallbackData = {
  ok: boolean;
  access_token: string;
  token_type: string;
  scope: string;
  bot_user_id: string;
  app_id: string;
  team: {
    name: string;
    id: string;
  };
  enterprise: {
    name: string;
    id: string;
  };
  authed_user: {
    id: string;
    scope: string;
    access_token: string;
    token_type: string;
  };
};
