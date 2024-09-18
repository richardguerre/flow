import { definePlugin, PrismaTypes } from "@flowdev/plugin/server";
import htmlToSlack from "html-to-slack";
import { POST_YOUR_PLAN, DEFAULT_PLAN_YOUR_DAY } from "./common";

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";
const TEMPLATES_STORE_KEY = "templates";

export default definePlugin((opts) => {
  const UPDATE_TASK_STATUS_JOB_NAME = "update-task-status";

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

  const statusMap = { TODO: "", DONE: "✅", CANCELED: "❌" } as const;

  const getTasksFromMessage = async (message: string) => {
    const taskIds = opts
      .parseHtml(message)
      .querySelectorAll("slack-status")
      .map((tag) => {
        const id = opts.decodeGlobalId(tag.attributes["data-taskId"])?.id;
        if (!id) return null;
        return parseInt(id);
      })
      .filter((id) => id !== null);
    const tasks = await opts.prisma.task
      .findMany({
        where: { id: { in: taskIds } },
      })
      .then((tasks) => new Map(tasks.map((task) => [task.id, task])));

    return tasks;
  };

  const convertHtmlToSlackMessage = (html: string) => {
    return htmlToSlack(html);
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
          team: { ...body.team, ...teamInfo.team },
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
          data: {
            workspaces: Object.entries(tokenItem).map(([teamId, tokenInfo]) => ({
              connectedAt: tokenInfo.created_at,
              teamId,
              teamName: tokenInfo.team.name,
              teamIcon: tokenInfo.team.icon.image_44,
              teamAvatar: tokenInfo.team.avatar_base_url,
            })),
          } as WorkspacesData,
        };
      },
      getChannels: async (_input: GetChannelsInput) => {
        const tokenItem = await getTokensFromStore().catch(() => null);

        const channels: GetChannelsData["channels"] = [];
        for (const teamId in tokenItem) {
          const tokenInfo = tokenItem[teamId];

          const channelsReq = await fetch(
            `https://slack.com/api/conversations.list?token=${tokenInfo.access_token}`,
            { headers: { Authorization: `Bearer ${tokenInfo.access_token}` } },
          )
            .then(async (res) => (await res.json()) as ChannelsReq)
            .catch(() => null);
          if (!channelsReq) continue;
          channels.push(
            ...(channelsReq.channels.map((channel) => ({
              id: channel.id,
              name: channel.name,
              team: {
                id: tokenInfo.team.id,
                name: tokenInfo.team.name,
                icon: tokenInfo.team.icon.image_44,
                avatar: tokenInfo.team.avatar_base_url,
              },
            })) as GetChannelsData["channels"]),
          );
        }

        return {
          data: { channels } as GetChannelsData,
        };
      },
      postMessage: async (input: PostMessageInput) => {
        if (!input.channels.length)
          throw new opts.GraphQLError("No channels provided.", {
            extensions: {
              code: "NO_CHANNELS_PROVIDED",
              userFriendlyMessage: "No channels selected. Please select at least one channel.",
            },
          });
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

        const tasks = await getTasksFromMessage(input.message);
        const msgParsed = opts.parseHtml(input.message);
        msgParsed.querySelectorAll("slack-status").forEach((tag) => {
          const taskIdRaw = opts.decodeGlobalId(tag.attributes["data-taskId"])?.id;
          if (!taskIdRaw) return;
          const taskId = parseInt(taskIdRaw);
          if (!taskId) return;
          const task = tasks.get(taskId);
          if (!task) return;
          tag.replaceWith(statusMap[task.status]);
        });
        const slackMessage = convertHtmlToSlackMessage(msgParsed.toString());

        const messages: PostMessageData["messages"] = [];
        for (const channel of input.channels) {
          const res = await fetch(
            `https://slack.com/api/chat.postMessage?token=${tokenItem[channel.teamId].access_token}&channel=${channel.channelId}&text=${slackMessage}`,
            { headers: { Authorization: `Bearer ${tokenItem[channel.teamId].access_token}` } },
          ).then(async (req) => (await req.json()) as PostMessageReq);
          if (!res.ok) {
            const channelInfo = await fetch(
              `https://slack.com/api/conversations.info?token=${tokenItem[channel.teamId].access_token}&channel=${channel.channelId}`,
              { headers: { Authorization: `Bearer ${tokenItem[channel.teamId].access_token}` } },
            )
              .then(async (req) => (await req.json()) as ChannelsReq)
              .catch(() => null);
            throw new opts.GraphQLError(`Couldn't post message.`, {
              extensions: {
                code: "COULDNT_POST_MESSAGE",
                userFriendlyMessage: `Couldn't post message to channel ${channelInfo?.channels[0].name ?? "Unknonwn"}. Please try connecting your Slack account again.`,
              },
            });
          }
          messages.push({ teamId: channel.teamId, channelId: channel.channelId, ts: res.ts });
        }
        return {
          data: {
            ok: true,
            messages,
          } as PostMessageData,
        };
      },
      getRoutineStepInfo: async (input) => {
        const {} = input as GetRoutineStepInfoInput;
        const templates = await opts.store
          .getPluginItem<Templates>(TEMPLATES_STORE_KEY)
          .then((res) => res?.value ?? {});
        const template = templates[input.routineStepId]?.template ?? DEFAULT_PLAN_YOUR_DAY;
        const renderedTemplate = await opts.renderTemplate(template, {
          jfdksl: null,
        });

        return { data: { renderedTemplate } } as GetRoutineStepInfoOutput;
      },
    },
    onUpdateTaskStatusEnd: async (_input) => {
      const today = opts.dayjs();
      await opts.pgBoss.send(UPDATE_TASK_STATUS_JOB_NAME, { date: today.toISOString() });
    },
    onAddRoutineStepEnd: async (input) => {
      if (input.step.stepSlug === POST_YOUR_PLAN) {
        // add default template
        await opts.prisma.template.upsert({
          where: { slug: `${opts.pluginSlug}-${input.step.stepSlug}` },
          create: {
            slug: `${opts.pluginSlug}-${input.step.stepSlug}`,
            template: DEFAULT_PLAN_YOUR_DAY,
            routineStepId: input.step.id,
          },
          update: { routineStepId: input.step.id }, // don't update the template if it already exists, just update the routineStepId
        });
      }
    },
    handlebars: {
      helpers: {
        // reminder: handlebars helpers are prefixed with the plugin's slug. Example: if the plugin slug is `slack`, then the helper name should be `slack-helperName`.
        status: function (this: PrismaTypes.Task) {
          return new opts.Handlebars.SafeString(
            `<slack-status data-taskId=\"Task_${this.id}\">${statusMap[this.status]}</slack-status>`,
          );
        },
      },
    },
    handlePgBossWork: (work) => [
      work(UPDATE_TASK_STATUS_JOB_NAME, async (job) => {
        const jobData = job.data as { date: string };

        // find the day's note
        const note = await opts.prisma.note.findFirst({
          where: { date: jobData.date },
        });
        if (!note) return;

        /**  find all <slack-message> tags:
         * <slack-message
         *   data-teamId="<teamId>"
         *   data-channelId="<channelId>"
         *   data-messageId="messageId"
         * >channelName</slack-message>
         */
        const messages = opts
          .parseHtml(note.content)
          .querySelectorAll("slack-message")
          .map((tag) => ({
            teamId: tag.attributes["data-teamId"],
            channelId: tag.attributes["data-channelId"],
            ts: tag.attributes["data-ts"],
          }));
        if (!messages.length) return;

        const tokenItem = await getTokensFromStore().catch(() => null);
        if (!tokenItem) return;

        // replace <slack-status> tags with the status of the task
        const tasks = await getTasksFromMessage(note.content);

        const noteParsed = opts.parseHtml(note.content);
        noteParsed.querySelectorAll("slack-status").forEach((tag) => {
          const taskIdRaw = opts.decodeGlobalId(tag.attributes["data-taskId"])?.id;
          if (!taskIdRaw) return;
          const taskId = parseInt(taskIdRaw);
          if (!taskId) return;
          const task = tasks.get(taskId);
          if (!task) return;
          tag.replaceWith(statusMap[task.status]);
        });
        const slackMessage = convertHtmlToSlackMessage(noteParsed.toString());

        for (const message of messages) {
          const tokenInfo = tokenItem[message.teamId];
          // api/chat.update
          const res = await fetch(
            `https://slack.com/api/chat.update?token=${tokenInfo.access_token}&channel=${message.channelId}&ts=${message.ts}&text=${slackMessage}`,
            { headers: { Authorization: `Bearer ${tokenItem[message.teamId].access_token}` } },
          );
          if (!res.ok) {
            console.log(
              "❌ Slack channel update failed - res.ok is false",
              res.status,
              res.statusText,
            );
            continue;
          }
          console.log("✅ Slack message update successful");
        }
      }),
    ],
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

type PostMessageReq = {
  ok: boolean;
  channel: string;
  ts: string;
  message: {
    text: string;
    username: string;
    bot_id: string;
    attachments: {
      text: string;
      id: number;
      fallback: string;
    }[];
    type: string;
    subtype: string;
    ts: string;
  };
};

type Templates = {
  [routineStepId: string]: {
    template: string;
  };
};
