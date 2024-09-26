import { definePlugin, type ServerTypes } from "@flowdev/plugin/server";
import { POST_TO_SLACK, getDefaultPlanYourDayTemplate } from "./common";

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";

export default definePlugin((opts) => {
  const UPDATE_SLACK_MESSAGES_JOB_NAME = "update-slack-messages";

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

  const statusMap: Record<ServerTypes.PrismaTypes.TaskStatus, string> = {
    TODO: "",
    DONE: "✅",
    CANCELED: "❌",
  };

  const getTasksFromMessage = async (message: string) => {
    const taskIds = opts.html
      .parse(message)
      .querySelectorAll("slack-status")
      .map((tag) => {
        if (!tag.attributes["data-task-id"]) return null;
        const id = opts.decodeGlobalId(tag.attributes["data-task-id"])?.id;
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

  return {
    onRequest: async (req) => {
      if (req.path === "/auth") {
        return Response.redirect(
          `https://slack-api-flow-dev.vercel.app/api/auth?api_endpoint=${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth/callback`,
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
          return { data: { workspaces: [] } };
        }

        return {
          data: {
            workspaces: Object.entries(tokenItem).map(([teamId, tokenInfo]) => ({
              connectedAt: tokenInfo.created_at,
              teamId,
              teamName: tokenInfo.team.name,
              teamIcon: tokenInfo.team.icon.image_44,
            })),
          } as WorkspacesData,
        };
      },
      getChannels: async (_input: GetChannelsInput) => {
        const tokenItem = await getTokensFromStore().catch(() => null);

        const channels: GetChannelsData["channels"] = [];
        for (const teamId in tokenItem) {
          const tokenInfo = tokenItem[teamId];

          const channelsReq = await fetch(`https://slack.com/api/conversations.list`, {
            headers: { Authorization: `Bearer ${tokenInfo.authed_user.access_token}` },
          })
            .then(async (res) => (await res.json()) as ChannelsReq)
            .catch(() => null);
          if (!channelsReq?.ok) continue;
          channels.push(
            ...(channelsReq.channels.map((channel) => ({
              id: channel.id,
              name: channel.name,
              team: {
                id: tokenInfo.team.id,
                name: tokenInfo.team.name,
                icon: tokenInfo.team.icon.image_44,
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
        const msgParsed = opts.html.parse(input.message);
        msgParsed.querySelectorAll("slack-status").forEach((tag) => {
          if (!tag.attributes["data-task-id"]) return;
          const taskIdRaw = opts.decodeGlobalId(tag.attributes["data-task-id"])?.id;
          if (!taskIdRaw) return;
          const taskId = parseInt(taskIdRaw);
          if (!taskId) return;
          const task = tasks.get(taskId);
          if (!task) return;
          tag.replaceWith(statusMap[task.status]);
        });
        // remove the <slack-message> tags
        msgParsed.querySelectorAll("slack-message").forEach((tag) => {
          tag.replaceWith("");
        });
        // remove p tags that are direct children of li tags
        msgParsed.querySelectorAll("li").forEach((tag) => {
          tag.querySelectorAll("p").forEach((pTag) => {
            pTag.replaceWith(pTag.innerHTML);
          });
        });
        // remove <slack-future-tasks> tags and wrapping <li> tags
        msgParsed.querySelectorAll("slack-future-tasks").forEach((tag) => {
          if (tag.parentNode.tagName === "LI") tag = tag.parentNode;
          tag.replaceWith("");
        });
        const slackMessage = opts.html.toSlack(msgParsed.toString());

        const messages: PostMessageData["messages"] = [];
        for (const channel of input.channels) {
          const token = tokenItem[channel.teamId].authed_user.access_token;
          const res = await fetch(
            `https://slack.com/api/chat.postMessage?channel=${channel.channelId}&blocks=${JSON.stringify(slackMessage)}`,
            { headers: { Authorization: `Bearer ${token}` } },
          ).then(async (req) => (await req.json()) as PostMessageReq);
          if (!res.ok) {
            const channelInfo = await fetch(
              `https://slack.com/api/conversations.info?channel=${channel.channelId}`,
              { headers: { Authorization: `Bearer ${token}` } },
            )
              .then(async (req) => (await req.json()) as ConversationInfoReq)
              .catch(() => null);
            throw new opts.GraphQLError(`Couldn't post message.`, {
              extensions: {
                code: "COULDNT_POST_MESSAGE",
                userFriendlyMessage: `Couldn't post message to channel ${channelInfo?.channel.name ? `#${channelInfo?.channel.name}` : "Unknonwn"}. The message may be too complex.`,
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
    },
    onUpdateTaskStatusEnd: async (input) => {
      const date = opts.dayjs(input.task.date);
      await opts.pgBoss.send(UPDATE_SLACK_MESSAGES_JOB_NAME, { date: date.toISOString() });
    },
    onCreateTask: async (input) => {
      const date = opts.dayjs(input.task.date);
      await opts.pgBoss.send(UPDATE_SLACK_MESSAGES_JOB_NAME, { date: date.toISOString() });
    },
    onAddRoutineStepEnd: async (input) => {
      if (input.step.stepSlug === POST_TO_SLACK) {
        const plugins = await opts.getInstalledPlugins();
        // add default template
        await opts.prisma.template.upsert({
          where: { slug: `${opts.pluginSlug}-${input.step.stepSlug}` },
          create: {
            slug: `${opts.pluginSlug}-${input.step.stepSlug}`,
            template: getDefaultPlanYourDayTemplate({
              withLinear: plugins.some((p) => p.slug === "linear"),
            }),
            routineStepId: input.step.id,
          },
          update: { routineStepId: input.step.id }, // don't update the template if it already exists, just update the routineStepId
        });
      }
    },
    handlebars: {
      helpers: {
        // reminder: handlebars helpers are prefixed with the plugin's slug. Example: if the plugin slug is `slack`, then the full helper name will be `slack-helperName`.
        status: function (this: ServerTypes.TaskInTemplate) {
          if (!("status" in this) || !("id" in this)) return "";
          return new opts.Handlebars.SafeString(
            `<slack-status data-task-id=\"Task_${this.id}\">${statusMap[this.status]}</slack-status>`,
          );
        },
        "future-tasks": function (options: Handlebars.HelperOptions | undefined) {
          if (!options || !("fn" in options)) return "";
          const filter = options.hash.filter ?? {};
          const filterStr = opts.html.escape(JSON.stringify(filter));
          return new opts.Handlebars.SafeString(
            `<slack-future-tasks filter="${filterStr}">${options.fn({})}</slack-future-tasks>`,
          );
        },
      },
    },
    handlePgBossWork: (work) => [
      work(UPDATE_SLACK_MESSAGES_JOB_NAME, async (job) => {
        const jobData = job.data as { date: string };

        const tokenItem = await getTokensFromStore().catch(() => null);
        if (!tokenItem) return; // return if the user is not authenticated yet

        // find the day's note
        const note = await opts.prisma.note.findFirst({
          where: { date: jobData.date },
        });
        if (!note) return;

        const tasks = await getTasksFromMessage(note.content);
        /**  find all <slack-message> tags:
         * <slack-message
         *   data-team-id="<teamId>"
         *   data-channel-id="<channelId>"
         *   data-messageId="messageId"
         * >channelName</slack-message>
         */
        const messages = opts.html
          .parse(note.content)
          .querySelectorAll("slack-message")
          .map((tag) => ({
            teamId: tag.attributes["data-team-id"],
            channelId: tag.attributes["data-channel-id"],
            ts: tag.attributes["data-ts"],
          }));
        if (!messages.length) return; // return if the note was never posted to Slack

        /**
         * 1. find <slack-future-tasks> tag
         * 2. render the innerHTML of the tag
         * 3. if tag is in <li> tag, make tag the li tag
         * 3. replace the tag with the rendered HTML
         */
        const noteParsed = opts.html.parse(note.content);
        for (let tag of noteParsed.querySelectorAll("slack-future-tasks")) {
          const innerHTML = tag.innerHTML;
          let filter = {} as Parameters<typeof opts.prisma.task.findMany>[0];
          try {
            const filterStr = opts.html.unescape(tag.getAttribute("filter") ?? "{}");
            const filterStrRendered = await opts.renderTemplate(filterStr, {});
            filter = JSON.parse(filterStrRendered);
          } catch {
            // do nothing
          }
          const tasksNotInNote = await opts.prisma.task
            .findMany({
              where: {
                date: jobData.date,
                id: { notIn: Array.from(tasks.keys()) },
                ...(filter?.where ?? {}),
              },
              include: {
                tags: true,
                pluginDatas: true,
                item: { select: { id: true } },
                ...(filter?.include ?? {}),
              },
              ...filter,
            })
            .then((tasks) =>
              tasks.map((task) => {
                // remove wrapping <p> tags from the title
                const titleParsed = opts.html.parse(task.title);
                titleParsed.querySelectorAll("p").forEach((tag) => {
                  tag.replaceWith(tag.innerHTML);
                });
                return { ...task, title: new opts.Handlebars.SafeString(titleParsed.toString()) };
              }),
            );
          let renderedHtml = "";
          for (const task of tasksNotInNote) {
            renderedHtml += await opts.renderTemplate(innerHTML, task);
          }
          if (tag.parentNode.tagName === "LI") tag = tag.parentNode;
          tag.replaceWith(renderedHtml);
          return innerHTML;
        }

        // replace <slack-status> tags with the status of the task
        noteParsed.querySelectorAll("slack-status").forEach((tag) => {
          if (!tag.attributes["data-task-id"]) return;
          const taskIdRaw = opts.decodeGlobalId(tag.attributes["data-task-id"])?.id;
          if (!taskIdRaw) return;
          const taskId = parseInt(taskIdRaw);
          if (!taskId) return;
          const task = tasks.get(taskId);
          if (!task) return;
          tag.replaceWith(statusMap[task.status]);
        });
        // remove the <slack-message> tags
        noteParsed.querySelectorAll("slack-message").forEach((tag) => {
          tag.replaceWith("");
        });
        // remove p tags that are direct children of li tags
        noteParsed.querySelectorAll("li").forEach((tag) => {
          tag.querySelectorAll("p").forEach((pTag) => {
            pTag.replaceWith(pTag.innerHTML);
          });
        });
        const slackMessage = opts.html.toSlack(noteParsed.toString());

        for (const message of messages) {
          const token = tokenItem[message.teamId].authed_user.access_token;
          const res = await fetch(
            `https://slack.com/api/chat.update?channel=${message.channelId}&ts=${message.ts}&blocks=${JSON.stringify(slackMessage)}`,
            { headers: { Authorization: `Bearer ${token}` } },
          ).then(async (req) => (await req.json()) as ChatUpdateReq);
          if (!res.ok) {
            console.log("❌ Slack message update failed - res.ok is false", res.error);
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
/*
{
  "T07KTQ7M30R": {
    "team": {
      "id": "T07KTQ7M30R",
      "url": "https://flow-mz35357.slack.com/",
      "icon": {
        "image_34": "https://a.slack-edge.com/80588/img/avatars-teams/ava_0013-34.png",
        "image_44": "https://a.slack-edge.com/80588/img/avatars-teams/ava_0013-44.png",
        "image_68": "https://a.slack-edge.com/80588/img/avatars-teams/ava_0013-68.png",
        "image_88": "https://a.slack-edge.com/80588/img/avatars-teams/ava_0013-88.png",
        "image_102": "https://a.slack-edge.com/80588/img/avatars-teams/ava_0013-102.png",
        "image_132": "https://a.slack-edge.com/80588/img/avatars-teams/ava_0013-132.png",
        "image_230": "https://a.slack-edge.com/80588/img/avatars-teams/ava_0013-230.png",
        "image_default": true
      },
      "name": "Flow",
      "domain": "flow-mz35357",
      "is_verified": false,
      "email_domain": "",
      "avatar_base_url": "https://ca.slack-edge.com/",
      "lob_sales_home_enabled": false
    },
    "app_id": "A07K8FUUDGE",
    "created_at": "2024-09-20T23:53:44.308Z",
    "enterprise": null,
    "authed_user": {
      "id": "U07KF1ETGFM",
      "scope": "channels:read,groups:read,im:read,mpim:read,team:read,chat:write",
      "token_type": "user",
      "access_token": ""
    },
    "is_enterprise_install": false
  }
}
*/

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

type ConversationInfoReq = {
  ok: boolean;
  channel: {
    id: string;
    name: string;
    is_channel: boolean;
    is_group: boolean;
    is_im: boolean;
    is_mpim: boolean;
    is_private: boolean;
    created: number;
    is_archived: boolean;
    is_general: boolean;
    unlinked: number;
    name_normalized: string;
    is_shared: boolean;
    is_org_shared: boolean;
    is_pending_ext_shared: boolean;
    pending_shared: string[];
    context_team_id: string;
    updated: number;
    parent_conversation: null;
    creator: string;
    is_ext_shared: boolean;
    shared_team_ids: string[];
    pending_connected_team_ids: string[];
    is_member: boolean;
    last_read: string;
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
    properties: {
      canvas: {
        file_id: string;
        quip_thread_id: string;
      };
      tabs: {
        id: string;
        label: string;
        type: string;
      }[];
      use_case: string;
    };
    previous_names: string[];
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

type ChatUpdateReq =
  | {
      ok: true;
      channel: string;
      ts: string;
      text: string;
      message: {
        text: string;
        user: string;
      };
    }
  | {
      ok: false;
      error: string;
    };
