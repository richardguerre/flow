import { definePlugin } from "@flowdev/plugin/server";

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";
const SLACK_MAPPINGS_STORE_KEY = "slack-mappings";
const TEMPLATES_STORE_KEY = "templates";

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
        const slackMappingsItem = await opts.store
          .getPluginItem<SlackMappings>(SLACK_MAPPINGS_STORE_KEY)
          .then((item) => item?.value ?? {})
          .catch(() => null);

        const toReturn: Workspace[] = [];
        for (const teamId in tokenItem) {
          const channelIds = slackMappingsItem?.[teamId].channelIds;
          const channels: Channel[] = [];
          for (const channelId of channelIds ?? []) {
            const channel = await fetch(
              `https://slack.com/api/conversations.info?token=${tokenItem[teamId].access_token}&channel=${channelId}`,
              { headers: { Authorization: `Bearer ${tokenItem[teamId].access_token}` } },
            )
              .then(async (req) => (await req.json()) as ChannelsReq)
              .catch(() => null);
            if (!channel) continue;
            channels.push(channel.channels[0]);
          }
          toReturn.push({
            connectedAt: tokenItem[teamId].created_at,
            teamId,
            teamName: tokenItem[teamId].team.name,
            teamIcon: tokenItem[teamId].team.icon.image_44,
            teamAvatar: tokenItem[teamId].team.avatar_base_url,
            channels,
          });
        }
        return { data: toReturn };
      },
      getChannels: async (input) => {
        const tokenItem = await getTokensFromStore().catch(() => null);

        const workspaceToken = tokenItem?.[input.teamId];
        if (!workspaceToken) {
          throw new opts.GraphQLError("Slack workspace not found.", {
            extensions: {
              code: "WORKSPACE_NOT_FOUND",
              userFriendlyMessage:
                "No Slack workspace was found to retrieve channels. Please try connecting your Slack account again.",
            },
          });
        }

        const channels = await fetch(
          `https://slack.com/api/conversations.list?token=${workspaceToken.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${workspaceToken.access_token}`,
            },
          },
        )
          .then(async (req) => (await req.json()) as ChannelsReq)
          .catch(() => null);
        if (!channels) {
          throw new opts.GraphQLError("Couldn't get channels.", {
            extensions: {
              code: "COULDNT_GET_CHANNELS",
              userFriendlyMessage:
                "Couldn't get channels. Please try connecting your Slack account again.",
            },
          });
        }

        return {
          data: channels.channels.map((channel) => ({
            id: channel.id,
            name: channel.name,
            isPrivate: channel.is_private,
            isMember: channel.is_member,
            isArchived: channel.is_archived,
            isGeneral: channel.is_general,
            numMembers: channel.num_members,
          })),
        };
      },
      postMessage: async (input) => {
        const tokenItem = await getTokensFromStore().catch(() => null);
        if (!tokenItem) {
          throw new opts.GraphQLError("User not authenticated.", {
            extensions: {
              code: "NOT_AUTHENTICATED",
              userFriendlyMessage:
                "You are not authenticated and will need to connect your Slack account(s) first.",
            },
          });
        }
        return {
          data: null, // TODO: this is not implemented yet
        };
      },
      getRoutineStepInfo: async (input) => {
        const {} = input as GetRoutineStepInfoInput;
        const templates = await opts.store
          .getPluginItem<Templates>(TEMPLATES_STORE_KEY)
          .then((res) => res?.value ?? {});
        const template = templates[input.routineStepId]?.template ?? DEFAULT_TEMPLATE;
        const renderedTemplate = await opts.renderTemplate(template, {
          jfdksl: null,
        });

        return { data: { renderedTemplate } } as GetRoutineStepInfoOutput;
      },
    },
  };
});

const DEFAULT_TEMPLATE = `Plan for today

{{#each tasks as [task]}}
- {{task.title}}
{{/each}}
`;

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

type Workspace = {
  connectedAt: string;
  teamId: string;
  teamName: string;
  teamIcon: string;
  teamAvatar: string;
  channels: Channel[];
};

type Channel = ChannelsReq["channels"][0];

type ChannelsReq = {
  ok: boolean;
  channels: {
    id: string;
    name: string;
    is_channel: boolean;
    is_group: boolean;
    is_im: boolean;
    created: number;
    creator: string;
    is_archived: boolean;
    is_general: boolean;
    unlinked: number;
    name_normalized: string;
    is_shared: boolean;
    is_ext_shared: boolean;
    is_org_shared: boolean;
    pending_shared: string[];
    is_pending_ext_shared: boolean;
    is_member: boolean;
    is_private: boolean;
    is_mpim: boolean;
    updated: number;
    topic: {
      value: string;
      creator: string;
      last_set: number;
    };
    purpose: {
      value: string;
      creator: string;
      last_set: number;
    };
    previous_names: string[];
    num_members?: number;
    locale?: string;
  }[];
  response_metadata: {
    next_cursor: string;
  };
};

type SlackMappings = {
  [teamId: string]: {
    channelIds: string[];
  };
};

type Templates = {
  [routineStepId: string]: {
    template: string;
  };
};
