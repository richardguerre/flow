import { definePlugin, type ServerTypes } from "@flowdev/plugin/server";
import { POST_TO_SLACK, SLACK_SUMMARY, getDefaultPlanYourDayTemplate } from "./common";

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";
const CACHED_CHANNELS = "slack-cached-channels";

export default definePlugin((opts) => {
  const UPDATE_SLACK_MESSAGES_JOB_NAME = "update-slack-messages";
  const UPDATE_CACHED_CHANNELS_JOB_NAME = "update-cached-channels";

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

  const getTasksFromNote = async (note: string) => {
    const taskIds = opts.html
      .parse(note)
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

  /**  find all <slack-message> tags:
   * <slack-message
   *   data-team-id="<teamId>"
   *   data-channel-id="<channelId>"
   *   data-messageId="messageId"
   * >channelName</slack-message>
   */
  const getMessagesFromNote = (note: string) => {
    const messages = opts.html
      .parse(note)
      .querySelectorAll("slack-message")
      .map((tag) => ({
        teamId: tag.attributes["data-team-id"],
        channelId: tag.attributes["data-channel-id"],
        ts: tag.attributes["data-ts"],
      }));
    return messages;
  };

  const getSlackChannels = async (props?: {}) => {
    const tokenItem = await getTokensFromStore().catch(() => null);

    const channels: GetChannelsData["channels"] = [];
    for (const teamId in tokenItem) {
      const tokenInfo = tokenItem[teamId];
      const token = tokenInfo.access_token ?? tokenInfo.authed_user.access_token;

      const channelsReq = await fetch(
        `https://slack.com/api/conversations.list?exclude_archived=true&limit=999`,
        { headers: { Authorization: `Bearer ${token}` } },
      )
        .then(async (res) => (await res.json()) as ConversationsListReq)
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

      let cursor = channelsReq.response_metadata?.next_cursor;
      while (cursor) {
        const nextChannelsReq = await fetch(
          `https://slack.com/api/conversations.list?exclude_archived=true&limit=999&cursor=${cursor}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
          .then(async (req) => (await req.json()) as ConversationsListReq)
          .catch(() => null);
        if (!nextChannelsReq?.ok) break;
        channels.push(
          ...(nextChannelsReq.channels.map((channel) => ({
            id: channel.id,
            name: channel.name,
            team: {
              id: tokenInfo.team.id,
              name: tokenInfo.team.name,
              icon: tokenInfo.team.icon.image_44,
            },
          })) as GetChannelsData["channels"]),
        );
        cursor = nextChannelsReq.response_metadata?.next_cursor;
      }
    }

    return channels;
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

        // get channels the user has access to in the team/workspace
        await opts.pgBoss.send(UPDATE_CACHED_CHANNELS_JOB_NAME, {});

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
      getChannels: async (input: GetChannelsInput) => {
        const cachedChannelsItem = await opts.store
          .getPluginItem<CachedChannels>(CACHED_CHANNELS)
          .then((i) => i?.value)
          .catch(() => null);
        const cachedRecently =
          !!cachedChannelsItem &&
          opts.dayjs(cachedChannelsItem.updatedAt).isAfter(opts.dayjs().subtract(1, "minute"));

        if (input.forceRefresh && !cachedRecently) {
          console.log("[slack] refreshing channels");
          const channels = await getSlackChannels();
          const updatedAt = opts.dayjs().toISOString();
          await opts.store.setSecretItem<CachedChannels>(CACHED_CHANNELS, {
            updatedAt,
            channels,
          });
          return { data: { channels, lastCachedAt: updatedAt } satisfies GetChannelsData };
        }

        console.log(`[slack] using cached channels (cached recently: ${cachedRecently})`);
        return {
          data: {
            channels: cachedChannelsItem?.channels ?? [],
            lastCachedAt: cachedChannelsItem?.updatedAt ?? opts.dayjs().toISOString(),
          } satisfies GetChannelsData,
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

        const messagesFromNote = getMessagesFromNote(input.message);
        if (messagesFromNote.length) {
          const date = opts.dayjs(messagesFromNote[0].ts).toISOString();
          // HACK: need to wait for the note to be updated by the frontend before updating the messages, waiting 10 seconds should be enough
          opts.pgBoss.send(
            UPDATE_SLACK_MESSAGES_JOB_NAME,
            { date },
            { startAfter: opts.dayjs().add(10, "seconds").toISOString() },
          );
          return {
            data: {
              ok: true,
              messages: [], // don't append existing messages to the note
            } as PostMessageData,
          };
        }

        const tasks = await getTasksFromNote(input.message);
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
          if (tag.parentNode.tagName === "P") tag = tag.parentNode;
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
      getSlackSummary: async (input: GetSlackSummaryInput) => {
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

        const fromDate = opts.dayjs(input.fromDate);
        const toDate = opts.dayjs(input.toDate);
        const maxMessages = input.maxMessages ?? 100;

        // Parse user prompt to get filters
        let messageFilter: MessageFilter = {};
        if (input.userPrompt) {
          const filterResult = await opts.llm.generateObject({
            messages: `Parse this user request for filtering Slack messages: "${input.userPrompt}"
            
            Return a structured filter object based on the user's request. Available options:
            - ignoreBots: boolean (ignore bot messages)
            - authors: string[] (specific user IDs to include/exclude)
            - keywords: string[] (keywords to filter by)
            - messageTypes: ('text' | 'file' | 'link')[] (types of messages to include)
            
            If the user mentions "ignore bots" or similar, set ignoreBots to true.
            If they mention specific people, try to extract user IDs or names.
            If they mention keywords or topics, extract them into the keywords array.`,
            schema: opts.z.object({
              ignoreBots: opts.z.boolean(),
              authors: opts.z.array(opts.z.string()),
              keywords: opts.z.array(opts.z.string()),
              messageTypes: opts.z.array(opts.z.enum(["text", "file", "link"])),
            }),
          });
          messageFilter = filterResult.object;
        }

        // Get all channels for the team(s)
        const channels = await getSlackChannels();
        const filteredChannels = channels.filter((channel) => {
          if (input.channelsToIgnore?.includes(channel.id)) return false;
          if (input.teamId && channel.team.id !== input.teamId) return false;
          return true;
        });

        // Fetch messages from all channels
        const allMessages: SlackMessage[] = [];
        const allThreads: SlackThread[] = [];

        for (const channel of filteredChannels) {
          const token = tokenItem[channel.team.id].authed_user.access_token;

          // Get channel history
          const messages = await fetchChannelHistory(
            token,
            channel.id,
            fromDate.unix(),
            toDate.unix(),
            maxMessages - allMessages.length,
          );

          // Apply filters
          const filteredMessages = applyMessageFilters(messages, messageFilter);
          allMessages.push(...filteredMessages);

          // Collect threads
          const threads = await fetchThreadReplies(token, channel.id, filteredMessages);
          allThreads.push(...threads);
        }

        // Sort by timestamp (latest first) and limit
        allMessages.sort((a, b) => parseFloat(b.ts) - parseFloat(a.ts));
        const limitedMessages = allMessages.slice(0, maxMessages);

        // Get user info for @mentions
        const userInfo = await getUserInfo(tokenItem);

        console.log({ limitedMessages, allThreads, userInfo, userPrompt: input.userPrompt });

        // Generate summary using LLM
        const summary = await generateSlackSummary(
          limitedMessages,
          allThreads,
          userInfo,
          input.userPrompt,
          opts,
        );

        return {
          data: {
            summary,
            messageCount: limitedMessages.length,
            threadCount: allThreads.length,
            dateRange: {
              from: fromDate.toISOString(),
              to: toDate.toISOString(),
            },
          } as GetSlackSummaryData,
        };
      },
      getThreadSummary: async (input: GetThreadSummaryInput) => {
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

        const token = tokenItem[input.teamId].authed_user.access_token;

        // Get thread messages
        const threadMessages = await fetchThreadMessages(token, input.channelId, input.threadTs);

        // Get user info for @mentions
        const userInfo = await getUserInfo(tokenItem);

        // Generate thread summary
        const summary = await generateThreadSummary(threadMessages, userInfo, opts);

        const uniqueUserIds = [...new Set(threadMessages.map((m) => m.user))];
        const participants = uniqueUserIds.map((userId) => {
          const user = userInfo.get(userId);
          return {
            id: userId,
            name: user?.name || "Unknown",
            real_name: user?.real_name || "Unknown User",
            avatar: user?.profile.image_48 || "",
          };
        });

        return {
          data: {
            summary,
            messageCount: threadMessages.length,
            participants,
          } as GetThreadSummaryData,
        };
      },
      createTaskFromMessage: async (input: CreateTaskFromMessageInput) => {
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

        // Get the original message
        const token = tokenItem[input.teamId].authed_user.access_token;
        const message = await getMessageByTs(token, input.channelId, input.messageTs);

        if (!message) {
          throw new opts.GraphQLError("Message not found.", {
            extensions: {
              code: "MESSAGE_NOT_FOUND",
              userFriendlyMessage: "The original Slack message could not be found.",
            },
          });
        }

        // Get channel and team info for URL construction
        const channelInfo = await fetch(
          `https://slack.com/api/conversations.info?channel=${input.channelId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        )
          .then(async (req) => (await req.json()) as ConversationInfoReq)
          .catch(() => null);

        const teamInfo = tokenItem[input.teamId].team;
        const channelName = channelInfo?.channel?.name || "unknown";
        const teamName = teamInfo.name;
        const url = `https://${teamInfo.domain || teamInfo.id}.slack.com/archives/${input.channelId}/p${input.messageTs.replace(".", "")}`;

        // Generate item title using LLM
        const titleResult = await opts.llm.prompt({
          messages: `Generate a concise, actionable title for this task based on the action item: "${input.actionItem}"
          
          The title should be:
          - Clear and specific
          - Action-oriented (start with a verb when possible)
          - Under 100 characters
          - Professional tone
          
          Just return the title, nothing else.`,
        });

        // Create Flow item
        const item = await opts.prisma.item.create({
          data: {
            title: titleResult.text.trim(),
            pluginDatas: {
              create: {
                pluginSlug: opts.pluginSlug,
                min: {
                  slackMessageTs: input.messageTs,
                  slackChannelId: input.channelId,
                  slackTeamId: input.teamId,
                  channelName,
                  teamName,
                  url,
                } as SlackMessageItemMin,
                full: {
                  slackMessageTs: input.messageTs,
                  slackChannelId: input.channelId,
                  slackTeamId: input.teamId,
                  originalMessage: message.text,
                  originalUser: message.user,
                  originalTimestamp: message.ts,
                  channelName,
                  teamName,
                  url,
                } as SlackMessageItemFull,
              },
            },
          },
        });

        // Create Flow task
        const task = await opts.prisma.task.create({
          data: {
            title: titleResult.text.trim(),
            itemId: item.id,
            date: input.date, // Use the provided date
            pluginDatas: {
              create: {
                pluginSlug: opts.pluginSlug,
                min: {
                  slackMessageTs: input.messageTs,
                  slackChannelId: input.channelId,
                  slackTeamId: input.teamId,
                  channelName,
                  teamName,
                  url,
                } as SlackMessageItemMin,
                full: {
                  slackMessageTs: input.messageTs,
                  slackChannelId: input.channelId,
                  slackTeamId: input.teamId,
                  originalMessage: message.text,
                  originalUser: message.user,
                  originalTimestamp: message.ts,
                  channelName,
                  teamName,
                  url,
                } as SlackMessageItemFull,
              },
            },
          },
        });

        return {
          data: {
            taskId: task.id.toString(),
            itemId: item.id.toString(),
          } as CreateTaskFromMessageData,
        };
      },
      quickReply: async (input: QuickReplyInput) => {
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

        const token = tokenItem[input.teamId].authed_user.access_token;

        // Convert rich text to Slack format
        const slackMessage = opts.html.toSlack(input.messageInHTML);

        // Post reply to thread
        const response = await fetch(`https://slack.com/api/chat.postMessage`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel: input.channelId,
            thread_ts: input.threadTs,
            text: slackMessage,
          }),
        });

        const result = (await response.json()) as { ok: boolean; ts: string; error?: string };

        if (!result.ok) {
          throw new opts.GraphQLError(`Failed to send reply: ${result.error}`, {
            extensions: {
              code: "REPLY_FAILED",
              userFriendlyMessage: "Could not send the reply to Slack.",
            },
          });
        }

        return {
          data: {
            ok: true,
            ts: result.ts,
          } as QuickReplyData,
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
    onUpdateTaskEnd: async (input) => {
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
      } else if (input.step.stepSlug === SLACK_SUMMARY) {
        // No default template needed for Slack Summary step
        // The step is self-contained and doesn't need a template
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
        "future-tasks": async function (options: Handlebars.HelperOptions | undefined) {
          if (!options || !("fn" in options)) return "";
          const filter = options.hash.filter ?? {};
          const filterStr = opts.html.escape(JSON.stringify(filter));
          const innerHTML = await options.fn({});
          return new opts.Handlebars.SafeString(
            `<slack-future-tasks filter="${filterStr}">${innerHTML}</slack-future-tasks>`,
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

        const tasks = await getTasksFromNote(note.content);
        const messages = getMessagesFromNote(note.content);
        if (!messages.length) return; // return if the note was never posted to Slack

        /**
         * 1. find <slack-future-tasks> tag
         * 2. render the innerHTML of the tag
         * 3. if tag is in <p> tag, make tag the p tag
         * 4. if tag is in <li> tag, make tag the li tag
         * 5. replace the tag with the rendered HTML
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
              ...filter,
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
          if (tag.parentNode.tagName === "P") tag = tag.parentNode;
          if (tag.parentNode.tagName === "LI") tag = tag.parentNode;
          tag.replaceWith(renderedHtml);
        }

        // replace <slack-status> tags with the status of the task
        noteParsed.querySelectorAll("slack-status").forEach((tag) => {
          if (!tag.attributes["data-task-id"]) return;
          const taskIdRaw = opts.decodeGlobalId(tag.attributes["data-task-id"])?.id;
          if (!taskIdRaw) return;
          const taskId = parseInt(taskIdRaw);
          if (!taskId) return;
          const task = tasks.get(taskId);
          if (task) tag.replaceWith(statusMap[task.status]);
          else tag.replaceWith(tag.innerHTML);
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
      work(UPDATE_CACHED_CHANNELS_JOB_NAME, async (_job) => {
        const channels = await getSlackChannels();
        await opts.store.setSecretItem<CachedChannels>(CACHED_CHANNELS, {
          updatedAt: opts.dayjs().toISOString(),
          channels,
        });
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

type ConversationsListReq = {
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
  response_metadata?: {
    next_cursor?: string;
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

type CachedChannels = {
  updatedAt: string;
  channels: GetChannelsData["channels"];
};

// Helper types for Slack API
type SlackMessage = {
  ts: string;
  user: string;
  text: string;
  channel: string;
  thread_ts?: string;
  subtype?: string;
  bot_id?: string;
  files?: any[];
  attachments?: any[];
};

type SlackThread = {
  channel: string;
  thread_ts: string;
  messages: SlackMessage[];
  summary?: string;
};

type SlackUser = {
  id: string;
  name: string;
  real_name: string;
  profile: {
    image_24: string;
    image_32: string;
    image_48: string;
    image_72: string;
    image_192: string;
    image_512: string;
  };
};

// Helper functions
async function fetchChannelHistory(
  token: string,
  channelId: string,
  oldest: number,
  latest: number,
  limit: number,
): Promise<SlackMessage[]> {
  const messages: SlackMessage[] = [];
  let cursor: string | undefined;

  while (messages.length < limit) {
    const url = new URL("https://slack.com/api/conversations.history");
    url.searchParams.set("channel", channelId);
    url.searchParams.set("oldest", oldest.toString());
    url.searchParams.set("latest", latest.toString());
    url.searchParams.set("limit", Math.min(limit - messages.length, 100).toString());
    if (cursor) url.searchParams.set("cursor", cursor);

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = (await response.json()) as {
      ok: boolean;
      messages: SlackMessage[];
      response_metadata?: { next_cursor?: string };
    };

    if (!data.ok) break;

    messages.push(...data.messages);
    cursor = data.response_metadata?.next_cursor;

    if (!cursor) break;
  }

  return messages;
}

async function fetchThreadMessages(
  token: string,
  channelId: string,
  threadTs: string,
): Promise<SlackMessage[]> {
  const url = new URL("https://slack.com/api/conversations.replies");
  url.searchParams.set("channel", channelId);
  url.searchParams.set("ts", threadTs);
  url.searchParams.set("limit", "100");

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = (await response.json()) as {
    ok: boolean;
    messages: SlackMessage[];
  };

  return data.ok ? data.messages : [];
}

async function fetchThreadReplies(
  token: string,
  channelId: string,
  messages: SlackMessage[],
): Promise<SlackThread[]> {
  const threads: SlackThread[] = [];
  const threadMessages = messages.filter((m) => m.thread_ts);

  for (const message of threadMessages) {
    if (!message.thread_ts) continue;

    const threadMessages = await fetchThreadMessages(token, channelId, message.thread_ts);
    if (threadMessages.length > 1) {
      // Only include threads with replies
      threads.push({
        channel: channelId,
        thread_ts: message.thread_ts,
        messages: threadMessages,
      });
    }
  }

  return threads;
}

async function getMessageByTs(
  token: string,
  channelId: string,
  messageTs: string,
): Promise<SlackMessage | null> {
  const url = new URL("https://slack.com/api/conversations.history");
  url.searchParams.set("channel", channelId);
  url.searchParams.set("latest", messageTs);
  url.searchParams.set("limit", "1");
  url.searchParams.set("inclusive", "true");

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = (await response.json()) as {
    ok: boolean;
    messages: SlackMessage[];
  };

  return data.ok && data.messages.length > 0 ? data.messages[0] : null;
}

async function getUserInfo(tokenItem: AccountsTokens): Promise<Map<string, SlackUser>> {
  const userMap = new Map<string, SlackUser>();

  for (const teamId in tokenItem) {
    const token = tokenItem[teamId].authed_user.access_token;

    const response = await fetch("https://slack.com/api/users.list", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = (await response.json()) as {
      ok: boolean;
      members: SlackUser[];
    };

    if (data.ok) {
      for (const user of data.members) {
        userMap.set(user.id, user);
      }
    }
  }

  return userMap;
}

function applyMessageFilters(messages: SlackMessage[], filter: MessageFilter): SlackMessage[] {
  return messages.filter((message) => {
    if (filter.ignoreBots && (message.bot_id || message.subtype === "bot_message")) {
      return false;
    }

    if (filter.authors && filter.authors.length > 0) {
      if (!filter.authors.includes(message.user)) {
        return false;
      }
    }

    if (filter.keywords && filter.keywords.length > 0) {
      const messageText = message.text.toLowerCase();
      if (!filter.keywords.some((keyword) => messageText.includes(keyword.toLowerCase()))) {
        return false;
      }
    }

    if (filter.messageTypes && filter.messageTypes.length > 0) {
      const hasFiles = message.files && message.files.length > 0;
      const hasAttachments = message.attachments && message.attachments.length > 0;
      const hasLinks = message.text.includes("http");

      if (filter.messageTypes.includes("text") && !hasFiles && !hasAttachments) return true;
      if (filter.messageTypes.includes("file") && hasFiles) return true;
      if (filter.messageTypes.includes("link") && hasLinks) return true;

      return false;
    }

    return true;
  });
}

async function generateSlackSummary(
  messages: SlackMessage[],
  threads: SlackThread[],
  userInfo: Map<string, SlackUser>,
  userPrompt?: string,
  opts?: any,
): Promise<string> {
  // Replace @mentions with display names
  const processedMessages = messages.map((msg) => ({
    ...msg,
    text: replaceMentions(msg.text, userInfo),
  }));

  const processedThreads = threads.map((thread) => ({
    ...thread,
    messages: thread.messages.map((msg) => ({
      ...msg,
      text: replaceMentions(msg.text, userInfo),
    })),
  }));

  // Generate summary using LLM
  const prompt = `Summarize these Slack messages and extract action items. ${userPrompt ? `Focus on: ${userPrompt}` : ""}

Messages:
${processedMessages.map((msg) => `[${msg.ts}] ${msg.user}: ${msg.text}`).join("\n")}

Threads:
${processedThreads
  .map(
    (thread) =>
      `Thread ${thread.thread_ts}:\n${thread.messages.map((msg) => `  [${msg.ts}] ${msg.user}: ${msg.text}`).join("\n")}`,
  )
  .join("\n\n")}

Return enhanced markdown with:
1. A summary of the key discussions
2. Individual message references using <slack-message> tags
3. Action items using <task> tags
4. Thread summaries using <slack-thread> tags

Format:
- <slack-message ts="timestamp" user="userId" channel="channelId">message text</slack-message>
- <task message_ts="timestamp">action item text</task>
- <slack-thread channel="channelId" thread_ts="timestamp">thread summary</slack-thread>`;

  const result = await opts.llm.prompt({ prompt });
  return result.text;
}

async function generateThreadSummary(
  messages: SlackMessage[],
  userInfo: Map<string, SlackUser>,
  opts?: any,
): Promise<string> {
  if (messages.length <= 5) {
    // For short threads, just return the messages
    return messages
      .map(
        (msg) =>
          `<slack-message ts="${msg.ts}" user="${msg.user}">${replaceMentions(msg.text, userInfo)}</slack-message>`,
      )
      .join("\n");
  }

  // For long threads, summarize first + last 5 messages
  const firstMessage = messages[0];
  const lastMessages = messages.slice(-5);

  const prompt = `Summarize this Slack thread discussion:

First message: [${firstMessage.ts}] ${firstMessage.user}: ${replaceMentions(firstMessage.text, userInfo)}

Last messages:
${lastMessages.map((msg) => `[${msg.ts}] ${msg.user}: ${replaceMentions(msg.text, userInfo)}`).join("\n")}

Return:
1. A brief summary of the thread discussion
2. The last message for context

Format:
<slack-thread-summary>brief summary</slack-thread-summary>
<slack-message ts="${lastMessages[lastMessages.length - 1].ts}" user="${lastMessages[lastMessages.length - 1].user}">${replaceMentions(lastMessages[lastMessages.length - 1].text, userInfo)}</slack-message>`;

  const result = await opts.llm.prompt({ prompt });
  return result.text;
}

function replaceMentions(text: string, userInfo: Map<string, SlackUser>): string {
  return text.replace(/<@([A-Z0-9]+)>/g, (match, userId) => {
    const user = userInfo.get(userId);
    return user ? `@${user.real_name || user.name}` : match;
  });
}
