import { definePlugin, type Prisma } from "@flowdev/plugin/server";
import type { calendar_v3 } from "@googleapis/calendar"; // import type only to avoid bundling the library in the plugin which contains unsafe code (process.env access, etc.)

const ACCOUNT_TOKENS_STORE_KEY = "account-tokens";
const CONNECTED_CALENDARS_KEY = "connected-calendars";

export default definePlugin((opts) => {
  const GET_EVENTS_JOB_NAME = `${opts.pluginSlug}-get-events`; // prefixed with the plugin slug to avoid collisions with other plugins
  const CALENDARS_SYNC_JOB_NAME = `${opts.pluginSlug}-calendars-sync`; // prefixed with the plugin slug to avoid collisions with other plugins
  const UPSERT_EVENT_JOB_NAME = `${opts.pluginSlug}-upsert-item-from-event`; // prefixed with the plugin slug to avoid collisions with other plugins
  const PROCESS_EVENTS_WEBHOOK_JOB_NAME = `${opts.pluginSlug}-process-events-webhook`; // prefixed with the plugin slug to avoid collisions with other plugins
  const EVENTS_WEBHOOK_CHANNEL_ID = `flow-${opts.pluginSlug}-events-webhook`;

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
   * Refreshes the tokens if they expired.
   * @throws If the user is not authenticated.
   * @throws If the access token could not be refreshed.
   * @example
   * const tokens = await getRefreshedTokens(params);
   */
  const getRefreshedTokens = async (params: GetTokenParams): Promise<Tokens> => {
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
      const res = await fetch(
        "https://google-calendar-api-flow-dev.vercel.app/api/auth/refresh?refresh_token=" +
          tokens.refresh_token,
      );
      if (!res.ok) {
        throw new opts.GraphQLError("Could not refresh token.", {
          extensions: {
            code: "COULD_NOT_REFRESH_TOKEN",
            userFriendlyMessage:
              "Could not connect to Google Calendar. Please try connecting your account(s) again.",
          },
        });
      }
      const newTokenData = await res.json();
      const newTokens = {
        ...newTokenData,
        refresh_token: tokens.refresh_token, // the refresh token is not returned when refreshing the access token
        expires_at: opts
          .dayjs()
          .add((newTokenData.expires_in ?? 10) - 10, "seconds") // -10 is a 10 second buffer to account for latency in network requests
          .toISOString(),
      } as Tokens;
      await opts.store.setSecretItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY, {
        ...params.accountsTokens,
        [params.account]: newTokens,
      });
      return newTokens;
    }
    return tokens;
  };

  return {
    onRequest: async (req) => {
      if (req.path === "/auth") {
        return Response.redirect(
          `https://google-calendar-api-flow-dev.vercel.app/api/auth?api_endpoint=${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth/callback`,
        );
      } else if (req.path === "/auth/callback" && req.request.method === "POST") {
        // not using getTokensFromStore here because it throws an error if the item doesn't exist, but we want to create it if it doesn't exist
        const accountsTokensItem =
          await opts.store.getPluginItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY);
        const body = req.body as Tokens;
        // store the access token in the user's Flow instance and return 200
        const tokenData = {
          ...body,
          // the refresh token may not be returned if the user has already connected their account before
          // and they are connecting it again, so as a fallback use the one from the store if it exists
          refresh_token:
            body.refresh_token ?? accountsTokensItem?.value?.[body.email].refresh_token,
          expires_at: opts
            .dayjs()
            .add((body.expires_in ?? 10) - 10, "seconds") // -10 is a 10 second buffer to account for latency in network requests
            .toISOString(),
        } as Tokens;
        if ("expires_in" in tokenData) delete tokenData.expires_in; // delete expires_in because it's not needed

        await opts.store.setSecretItem<AccountsTokens>(ACCOUNT_TOKENS_STORE_KEY, {
          ...(accountsTokensItem?.value ?? {}),
          [tokenData.email]: tokenData,
        });
        return new Response(); // return 200
      } else if (req.path === "/events/webhook" && req.request.method === "POST") {
        const resourceUri = req.headers["x-goog-resource-uri"] as string; // example: https://www.googleapis.com/calendar/v3/calendars/calendarId/events?alt=json
        const calendarIdRaw = resourceUri.match(/\/calendars\/(.*)\/events/)?.[1];
        if (!calendarIdRaw) {
          console.log("❌ Could not find calendarId in x-goog-resource-uri header", resourceUri);
          return new Response(); // return 200 to avoid Google retrying the request
        }
        const calendarId = decodeURIComponent(calendarIdRaw);
        await opts.pgBoss.send(PROCESS_EVENTS_WEBHOOK_JOB_NAME, { calendarId });
        return new Response(); // return 200
      }
    },
    operations: {
      /**
       * Get the calendars the user has access to in their Google account and whether they are connected to Flow.
       * @throws If the user is not authenticated.
       */
      calendars: async () => {
        const accountsTokens = await getTokensFromStore();
        const data: CalendarsData = [];
        for (const account of Object.keys(accountsTokens)) {
          const tokens = await getRefreshedTokens({ account, accountsTokens }).catch((e) => ({
            error: e,
          }));
          if ("error" in tokens) {
            data.push({
              account,
              authError: tokens.error.extensions.userFriendlyMessage ?? tokens.error.message,
            });
            continue;
          }
          const calendars = await fetch(
            "https://www.googleapis.com/calendar/v3/users/me/calendarList",
            { headers: { Authorization: `Bearer ${tokens.access_token}` } },
          )
            .then((res) => res.json() as calendar_v3.Schema$CalendarList)
            .then((res) => res.items);

          const connectedCalendarsMap = await opts.store
            .getPluginItem<ConnectedCalendar[]>(CONNECTED_CALENDARS_KEY)
            .then((res) => new Set(res?.value?.map((c) => c.calendarId) ?? []));
          data.push({
            account,
            calendars:
              calendars?.map((calendar) => ({
                ...calendar,
                connected: connectedCalendarsMap.has(calendar.id ?? ""),
              })) ?? [],
          });
        }

        return { data };
      },
      /**
       * Connect the specified calendars to Flow and disconnect any that is not specified.
       * @throws If the user is not authenticated.
       */
      connectCalendars: async (input: { calendarIds: string[] }) => {
        const accountsTokens = await getTokensFromStore();
        const connectedCalendarsMap = await opts.store
          .getPluginItem<ConnectedCalendar[]>(CONNECTED_CALENDARS_KEY)
          .then((res) => new Map(res?.value?.map((c) => [c.calendarId, c]) ?? []));

        const data: CalendarsData = [];
        for (const account of Object.keys(accountsTokens)) {
          const tokens = await getRefreshedTokens({ account, accountsTokens });
          const allCalendarsInAccount = await fetch(
            "https://www.googleapis.com/calendar/v3/users/me/calendarList",
            { headers: { Authorization: `Bearer ${tokens.access_token}` } },
          )
            .then((res) => res.json() as calendar_v3.Schema$CalendarList)
            .then((res) => res.items);

          // connect any calendar that is not already connected
          for (const calendarId of input.calendarIds) {
            // ignore if already connected
            if (connectedCalendarsMap.has(calendarId)) continue;

            // ignore if not in the user's account
            if (!allCalendarsInAccount?.some((calendar) => calendar.id === calendarId)) {
              continue;
            }

            // send a job to get and upsert events
            await opts.pgBoss.send(GET_EVENTS_JOB_NAME, { calendarId, days: 7 });

            // set up webhook
            const res = await fetch(
              `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/watch`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${tokens.access_token}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: EVENTS_WEBHOOK_CHANNEL_ID,
                  type: "web_hook",
                  address: `${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/events/webhook`,
                }),
              },
            ).then((res) => res.json() as calendar_v3.Schema$Channel);
            console.log("✔ Set up webhook for calendar", calendarId);

            // add to connected calendars
            connectedCalendarsMap.set(calendarId, {
              account,
              calendarId,
              lastSyncedAt: opts.dayjs().toISOString(),
              channelId: res.id ?? EVENTS_WEBHOOK_CHANNEL_ID,
              resourceId: res.resourceId!,
              // res.data.expiration is in Unix time, convert it to ISO string
              expiresAt: opts.dayjs(res.expiration ?? 0).toISOString(),
            });
          }

          // disconnect any calendar that is not specified
          for (const calendar of allCalendarsInAccount ?? []) {
            if (!calendar.id || input.calendarIds.includes(calendar.id)) continue;

            // remove webhook
            const calendarConnectInfo = connectedCalendarsMap.get(calendar.id);
            if (!calendarConnectInfo) continue;
            await fetch(`https://www.googleapis.com/calendar/v3/channels/stop`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: calendarConnectInfo.channelId,
                resourceId: calendarConnectInfo.resourceId,
              }),
            });
            console.log("✔ Removed webhook for calendar", calendar.id);

            // remove from connected calendars
            connectedCalendarsMap.delete(calendar.id);
          }

          data.push({
            account,
            calendars:
              allCalendarsInAccount?.map((calendar) => ({
                ...calendar,
                connected: connectedCalendarsMap.has(calendar.id ?? ""),
              })) ?? [],
          });
        }

        await opts.store.setItem<ConnectedCalendar[]>(
          CONNECTED_CALENDARS_KEY,
          Array.from(connectedCalendarsMap.values()),
        );
        // schedule a job to sync calendars every 3 days at 3am (least busy time and not midnight so less likely to be peak time for Google).
        // If the schedule already exists, it will be updated.
        await opts.pgBoss.schedule(CALENDARS_SYNC_JOB_NAME, "0 3 */3 * *", {
          calendarIds: input.calendarIds,
        });
        console.log("✔ Scheduled calendars sync job");

        return {
          operationName: "calendars", // this should invalidate the cache for the calendars operation
          data,
        };
      },
      /**
       * Refreshes the events of the specified calendars for the number of days specified (defaults to 7).
       * @throws If the user is not authenticated.
       */
      refreshEvents: async (input: { days: number }) => {
        const connectedCalendarIds = await opts.store
          .getPluginItem<ConnectedCalendar[]>(CONNECTED_CALENDARS_KEY)
          .then((res) => res?.value.map((cal) => cal.calendarId) ?? []);
        await opts.pgBoss.send(CALENDARS_SYNC_JOB_NAME, {
          calendarIds: connectedCalendarIds ?? [],
          days: input.days ?? 7,
        });
        return {
          data: "Job sent to refresh events.",
        };
      },
    },
    handlePgBossWork: (work) => [
      work(UPSERT_EVENT_JOB_NAME, { batchSize: 5 }, async (jobs) => {
        // process 5 events at a time to go a little faster (processing 100s at a time might consume too much memory as Google Calendar events can be quite large, especially if it includes conference data)
        for (const job of jobs) {
          const event = job.data as calendar_v3.Schema$Event & { calendarColor: string | null };
          const item = await opts.prisma.item.findFirst({
            where: {
              pluginDatas: { some: { originalId: event.id, pluginSlug: opts.pluginSlug } },
            },
            include: {
              pluginDatas: {
                where: { originalId: event.id, pluginSlug: opts.pluginSlug },
                select: { id: true },
              },
              // there should only be at most one task per item for calendar events
              tasks: {
                select: {
                  id: true,
                  pluginDatas: {
                    select: { id: true },
                    take: 1,
                    orderBy: { createdAt: "asc" }, // it should be the first plugin data that was created
                  },
                },
                take: 1,
                orderBy: { createdAt: "asc" },
              },
            },
          });

          if (!item && event.status === "cancelled") {
            // no need to create item if the event was cancelled
            continue;
          } else if (
            !item &&
            ["outOfOffice", "workingLocation"].includes(event.eventType ?? "default")
          ) {
            // no need to create item if the event is a OOO or workingLocation.
            continue;
          }

          const usersTimezone = (await opts.getUsersTimezone()) ?? "Etc/GMT-0"; // this should not be null, but just in case

          const task = item?.tasks[0];
          const isAllDay = !!event.start?.date;
          const scheduledStart = event.start?.date
            ? opts.dayjs(event.start.date).startOf("day")
            : event.start?.dateTime
            ? opts.dayjs(event.start.dateTime)
            : opts.dayjs(); // it should never default to today, but at least we make it a valid day instead of null
          const scheduledEnd = event.end?.date
            ? opts.dayjs(event.end.date).endOf("day")
            : event.end?.dateTime
            ? opts.dayjs(event.end.dateTime)
            : scheduledStart.add(1, "millisecond");
          const isOver = scheduledEnd.isBefore(opts.dayjs());
          const scheduledAtDate = scheduledStart.tz(usersTimezone).utc(true).toISOString();

          const itemCommonBetweenUpdateAndCreate = {
            title: event.summary ?? "No title",
            color: event.calendarColor ? opts.getNearestItemColor(event.calendarColor) : null,
            isAllDay,
            scheduledAt: scheduledStart.toISOString(),
            durationInMinutes: isAllDay
              ? null
              : Math.abs(opts.dayjs(scheduledStart).diff(scheduledEnd, "minute")),
            isRelevant: event.status !== "cancelled",
            inboxPoints: event.status === "tentative" ? 10 : null,
          } satisfies Prisma.ItemUpdateInput;

          const min = {
            eventType: event.eventType as PluginDataFull["eventType"],
            status: event.status as PluginDataMin["status"],
            htmlLink: event.htmlLink!,
            numOfAttendees: event.attendees?.length ?? 0,
            conferenceData: event.conferenceData as any,
            hexBackgroundColor: event.calendarColor,
          } satisfies PluginDataMin;
          const full = {
            ...event,
            ...min,
          } satisfies PluginDataFull as any; // the any is required to make typescript happy with Prisma's type system (theoretically there are no issues since we are getting all events from Google's REST API, which returns serialized JSON)

          const taskCommonBetweenUpdateAndCreate = {
            title: itemCommonBetweenUpdateAndCreate["title"],
            completedAt: isOver ? scheduledEnd.toISOString() : null,
            status: event.status === "cancelled" ? "CANCELED" : isOver ? "DONE" : "TODO",
            day: {
              connectOrCreate: {
                where: { date: scheduledAtDate },
                create: { date: scheduledAtDate, tasksOrder: task?.id ? [task.id] : [] },
              },
            },
          } satisfies Prisma.TaskUpdateInput;

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
                tasks: {
                  upsert: {
                    where: { id: task?.id },
                    update: {
                      ...taskCommonBetweenUpdateAndCreate,
                      pluginDatas: {
                        update: {
                          where: { id: task?.pluginDatas[0]?.id },
                          data: { min, full },
                        },
                      },
                    },
                    create: {
                      ...taskCommonBetweenUpdateAndCreate,
                      pluginDatas: {
                        create: {
                          pluginSlug: opts.pluginSlug,
                          originalId: event.id,
                          min,
                          full,
                        },
                      },
                    },
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
                    originalId: event.id,
                    min,
                    full,
                  },
                },
                tasks: {
                  create: {
                    ...taskCommonBetweenUpdateAndCreate,
                    pluginDatas: {
                      create: {
                        pluginSlug: opts.pluginSlug,
                        originalId: event.id,
                        min,
                        full,
                      },
                    },
                  },
                },
              },
            });
          }
          await opts.pgBoss.sendAfter(
            UPSERT_EVENT_JOB_NAME,
            { ...event },
            {},
            scheduledEnd.toDate(),
          );
          console.log("✔ Upserted item from event", event.summary, scheduledStart?.toISOString());
        }
      }),
      work(GET_EVENTS_JOB_NAME, async (job) => {
        const jobData = job.data as { calendarId: string; days?: number };
        const accountsTokens = await getTokensFromStore();
        for (const account of Object.keys(accountsTokens)) {
          const tokens = await getRefreshedTokens({ account, accountsTokens });
          const calendar = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${jobData.calendarId}`,
            { headers: { Authorization: `Bearer ${tokens.access_token}` } },
          ).then((res) => res.json() as calendar_v3.Schema$CalendarListEntry);

          const events = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${
              jobData.calendarId
            }/events?timeMin=${encodeURIComponent(
              opts.dayjs().startOf("day").toISOString(),
            )}&timeMax=${encodeURIComponent(
              opts
                .dayjs()
                .add(jobData.days ?? 7, "day")
                .toISOString(),
            )}&singleEvents=true&orderBy=startTime`,
            { headers: { Authorization: `Bearer ${tokens.access_token}` } },
          ).then((res) => res.json() as calendar_v3.Schema$Events);
          console.log(
            events.items?.length ?? 0,
            events.items?.length === 1 ? "event" : "events",
            "to process from initial sync of calendar",
            jobData.calendarId,
          );
          for (const event of events.items ?? []) {
            await opts.pgBoss.send(UPSERT_EVENT_JOB_NAME, {
              ...event,
              calendarColor: calendar.backgroundColor ?? null,
            });
          }
        }
      }),
      work(PROCESS_EVENTS_WEBHOOK_JOB_NAME, async (job) => {
        const jobData = job.data as { calendarId: string };
        const connectedCalendars = await opts.store
          .getPluginItem<ConnectedCalendar[]>(CONNECTED_CALENDARS_KEY)
          .then((res) => res?.value ?? []);
        const calendarToProcces = connectedCalendars.find(
          (c) => c.calendarId === jobData.calendarId,
        );
        if (!calendarToProcces) {
          console.log("❌ Could not find calendar to process", jobData.calendarId);
          return;
        }
        const tokens = await getRefreshedTokens({ account: calendarToProcces.account });
        const calendar = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${jobData.calendarId}`,
          { headers: { Authorization: `Bearer ${tokens.access_token}` } },
        ).then((res) => res.json() as calendar_v3.Schema$CalendarListEntry);

        const events = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${
            jobData.calendarId
          }/events?updatedMin=${encodeURIComponent(
            opts.dayjs(calendarToProcces.lastSyncedAt).toISOString(),
          )}&singleEvents=true&orderBy=updated`,
          { headers: { Authorization: `Bearer ${tokens.access_token}` } },
        ).then((res) => res.json() as calendar_v3.Schema$Events);
        console.log(
          events.items?.length ?? 0,
          events.items?.length === 1 ? "event" : "events",
          "to process from webhook of calendar",
          jobData.calendarId,
        );
        for (const event of events.items ?? []) {
          await opts.pgBoss.send(UPSERT_EVENT_JOB_NAME, {
            ...event,
            calendarColor: calendar.backgroundColor ?? null,
          });
        }

        // update lastSyncedAt
        await opts.store.setItem<ConnectedCalendar[]>(CONNECTED_CALENDARS_KEY, [
          ...connectedCalendars.filter((c) => c.calendarId !== jobData.calendarId),
          {
            ...calendarToProcces,
            lastSyncedAt: opts.dayjs().toISOString(),
          },
        ]);
      }),
      work(CALENDARS_SYNC_JOB_NAME, async (job) => {
        const jobData = job.data as { calendarIds: string[]; days?: number };
        for (const calendarId of jobData.calendarIds) {
          await opts.pgBoss.send(GET_EVENTS_JOB_NAME, { calendarId, days: jobData.days ?? 7 });
        }
      }),
    ],
  };
});

export type PluginDataMin = {
  eventType: "default" | "outOfOffice" | "focusTime" | "workingLocation";
  status: "confirmed" | "tentative" | "cancelled";
  htmlLink: NonNullable<calendar_v3.Schema$Event["htmlLink"]>;
  numOfAttendees: number;
  conferenceData: calendar_v3.Schema$Event["conferenceData"];
  hexBackgroundColor: string | null;
};

export type PluginDataFull = PluginDataMin &
  Omit<calendar_v3.Schema$Event, keyof PluginDataMin | "eventType"> & {
    eventType: "default" | "outOfOffice" | "focusTime" | "workingLocation";
  };

type GetTokenParams = {
  account: string;
  /** The tokens to use to make the request. If not provided, the tokens will be fetched from the store. */
  accountsTokens?: AccountsTokens; // if the tokens are already known, they can be passed in to avoid fetching them again
};

type AccountsTokens = {
  [account: string]: Tokens;
};

type Tokens = {
  email: string;
  access_token: string;
  expires_at: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
  expires_in?: never; // this is deleted before storing in the database, hence it's optional and will never be present
};

/** This ConnectedCalendars type is used to map the calendarId to the account when processing webhook events (only the calendarId is present when receiving a webhook) */
type ConnectedCalendar = {
  account: string;
  calendarId: string;
  lastSyncedAt: string;
  // the following relate to the notification channel created for the webhook
  channelId: string;
  resourceId: string;
  expiresAt: string;
};
