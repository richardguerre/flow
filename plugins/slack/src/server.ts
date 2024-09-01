import { definePlugin } from "@flowdev/plugin/server";

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";

export default definePlugin((opts) => {
  const getTokensFromStore = async () => {
    const accountsTokensItem =
      await opts.store.getPluginItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY);
    if (!accountsTokensItem) {
      throw new opts.GraphQLError("User not authenticated.", {
        extensions: {
          code: "NOT_AUTHENTICATED",
          userFriendlyMessage:
            "You are not authenticated and will need to connect your Slack account(s) first.",
        },
      });
    }
    return accountsTokensItem.value;
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
        const { ok, ...body } = req.body as AuthCallbackData;
        if (!ok) {
          console.log("❌ Slack auth callback failed - req.body.ok is false");
          return new Response("req.body.ok is false", { status: 500 });
        }

        const teamInfo = await fetch(`https://slack.com/api/team.info?team=${body.team.id}`, {
          headers: {
            Authorization: `Bearer ${body.access_token ?? body.authed_user.access_token}`,
          },
        })
          .then(async (req) => (await req.json()) as TeamInfoReq)
          .catch(() => null);
        if (!teamInfo) {
          console.log("❌ Slack auth callback failed - teamInfo.ok is false");
          return new Response("Couldn't get user's workspace info.", { status: 500 });
        }

        const tokensData = {
          ...body,
          created_at: new Date().toISOString(),
          team: {
            ...body.team,
            ...teamInfo.team,
          },
        } as Tokens;

        await opts.store.setSecretItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY, {
          ...(accountsTokensItem?.value ?? {}),
          [tokensData.team.id]: tokensData,
        });

        return new Response(); // return 200
      }

      return new Response(); // return 200
    },
    operations: {
      workspaces: async () => {
        const tokenItem = await getTokensFromStore().catch(() => null);
        if (!tokenItem) {
          return { data: [] };
        }
        return {
          data: Object.entries(tokenItem).map(([teamId, tokens]) => ({
            connectedAt: tokens.created_at,
            teamId,
            teamName: tokens.team.name,
          })),
        };
      },
    },
  };
});

type AccountsTokens = {
  [teamId: string]: Tokens;
};

type Tokens = Omit<AuthCallbackData, "ok" | "team"> & {
  created_at: string;
  team: AuthCallbackData["team"] & TeamInfoReq["team"];
};

/** example https://api.slack.com/methods/oauth.v2.access
 * 
 * 
    ok: true,
    app_id: 'A07K8FUUDGE',
    authed_user: {
      id: 'U07KF1ETGFM',
      scope: 'channels:read,groups:read,im:read,mpim:read,chat:write',
      access_token: 'some access token',
      token_type: 'user'
    },
    team: { id: 'T07KTQ7M30R', name: 'Flow' },
    enterprise: null,
    is_enterprise_install: false
  }
*/
type AuthCallbackData = {
  ok: boolean;
  app_id: string;
  authed_user: {
    id: string;
    scope: string;
    access_token: string;
    token_type: string;
  };
  team: {
    name: string;
    id: string;
  };
  enterprise: {
    name: string;
    id: string;
  };
  is_enterprise_install: boolean;
  // the following is only preset if bot token scopes are added.
  access_token?: string;
  token_type?: string;
  scope?: string;
  bot_user_id?: string;
};

type TeamInfoReq = {
  ok: boolean;
  team: {
    id: string;
    name: string;
    url: string;
    domain: string;
    email_domain: string;
    icon: {
      image_default: boolean;
      image_34: string;
      image_44: string;
      image_68: string;
      image_88: string;
      image_102: string;
      image_230: string;
      image_132: string;
    };
    avatar_base_url: string;
    is_verified: boolean;
    lob_sales_home_enabled: boolean;
  };
};
