import { definePlugin } from "@flowdev/plugin/server";
import { calendar, type calendar_v3, auth } from "@googleapis/calendar";

const TOKENS_STORE_KEY = "tokens";
const CONNECTED_CALENDARS_KEY = "connected_calendars";
const CHANNELS_STORE_KEY = "channels";
const LAST_SYNC_STORE_KEY = "last_sync";

export default definePlugin("google-calendar", (opts) => {
  const GET_EVENTS_JOB_NAME = `${opts.pluginSlug}-get-events`; // prefixed with the plugin slug to avoid collisions with other plugins
  const CALENDARS_SYNC_JOB_NAME = `${opts.pluginSlug}-calendars-sync`; // prefixed with the plugin slug to avoid collisions with other plugins
  const UPSERT_EVENT_JOB_NAME = `${opts.pluginSlug}-upsert-item-from-event`; // prefixed with the plugin slug to avoid collisions with other plugins
  const PROCESS_EVENTS_WEBHOOK_JOB_NAME = `${opts.pluginSlug}-process-events-webhook`; // prefixed with the plugin slug to avoid collisions with other plugins
  const EVENTS_WEBHOOK_JOB_NAME = `flow-${opts.pluginSlug}-events-webhook`; // prefixed with the plugin slug to avoid collisions with other plugins

  /**
   * Get the tokens from the database. If the access token has expired, it will be refreshed.
   * @throws {Error} If the user is not authenticated.
   * @throws {Error} If the access token could not be refreshed.
   * @example
   * const tokens = await getTokens();
   */
  const getTokens = async (): Promise<Tokens> => {
    const tokensItem = await opts.store.getPluginItem<Tokens>(TOKENS_STORE_KEY);
    if (!tokensItem) {
      throw new Error(
        "NOT_AUTHENTICATED: You are not authenticated and will need to connect your Google account first."
      );
    }
    if (opts.dayjs().isAfter(tokensItem.value.expires_at)) {
      // access token has expired, refresh it
      const res = await fetch(
        "https://google-calendar-api-flow-dev.vercel.app/api/auth/refresh?refresh_token=" +
          tokensItem.value.refresh_token
      );
      if (!res.ok) {
        throw new Error("COULD_NOT_REFRESH_TOKEN: Could not refresh token.");
      }
      const newTokenData = await res.json();
      const newTokens = {
        ...newTokenData,
        refresh_token: tokensItem.value.refresh_token, // the refresh token is not returned when refreshing the access token
        expires_at: opts
          .dayjs()
          .add((newTokenData.expires_in ?? 10) - 10, "seconds") // -10 is a 10 second buffer to account for latency in network requests
          .toISOString(),
      } as Tokens;
      await opts.store.setSecretItem(TOKENS_STORE_KEY, newTokens);
      return newTokens;
    }
    return tokensItem.value;
  };

  const getCalendarClient = async () => {
    const tokens = await getTokens();
    const authClient = new auth.OAuth2();
    authClient.setCredentials(tokens);
    return calendar({
      version: "v3",
      auth: authClient,
    });
  };

  return {
    onRequest: async (req, res) => {
      if (req.path === "/auth") {
        return res.redirect(
          `https://google-calendar-api-flow-dev.vercel.app/api/auth?api_endpoint=${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/auth/callback`
        );
      } else if (req.path === "/auth/callback" && req.method === "POST") {
        // store the access token in the user's Flow instance and return 200
        const tokenData = {
          ...req.body,
          expires_at: opts
            .dayjs()
            .add((req.body.expires_in ?? 10) - 10, "seconds") // -10 is a 10 second buffer to account for latency in network requests
            .toISOString(),
        } as Tokens;
        delete tokenData.expires_in;
        await opts.store.setSecretItem(TOKENS_STORE_KEY, tokenData);
        return res.status(200).send();
      } else if (req.path === "/events/webhook" && req.method === "POST") {
        const resourceUri = req.headers["x-goog-resource-uri"] as string; // example: https://www.googleapis.com/calendar/v3/calendars/calendarId/events?alt=json
        const calendarIdRaw = resourceUri.match(/\/calendars\/(.*)\/events/)?.[1];
        if (!calendarIdRaw) {
          console.log("❌ Could not find calendarId in x-goog-resource-uri header", resourceUri);
          return res.status(200).send();
        }
        const calendarId = decodeURIComponent(calendarIdRaw);
        await opts.pgBoss.send(PROCESS_EVENTS_WEBHOOK_JOB_NAME, { calendarId });
        return res.status(200).send();
      }
    },
    operations: {
      /**
       * Get the calendars the user has access to in their Google account and whether they are connected to Flow.
       * @throws {Error} If the user is not authenticated.
       */
      calendars: async () => {
        const calendarClient = await getCalendarClient();
        const calendars = await calendarClient.calendarList.list();
        const connectedCalendarsItem = await opts.store.getPluginItem<string[]>(
          CONNECTED_CALENDARS_KEY
        );
        const connectedCalendarsSet = new Set(connectedCalendarsItem?.value ?? []);
        return {
          data:
            calendars.data.items?.map((calendar) => ({
              ...calendar,
              connected: connectedCalendarsSet.has(calendar.id ?? ""),
            })) ?? [],
        };
      },
      /**
       * Connect the specified calendars to Flow and disconnect any that is not specified.
       * @throws {Error} If the user is not authenticated.
       */
      connectCalendars: async (input: { calendarIds: string[] }) => {
        const calendarClient = await getCalendarClient();
        const allCalendars = await calendarClient.calendarList.list();
        const connectedCalendars = await opts.store.getPluginItem<string[]>(
          CONNECTED_CALENDARS_KEY
        );
        const connectedCalendarsSet = new Set(connectedCalendars?.value ?? []);
        const connectedChannels = await opts.store.getPluginItem<StoreChannel[]>(
          CHANNELS_STORE_KEY
        );
        const connectedChannelsMap = new Map(
          connectedChannels?.value?.map((channel) => [channel.calendarId, channel]) ?? []
        );

        // connect any calendar that is not already connected
        for (const calendarId of input.calendarIds) {
          // ignore if already connected
          if (connectedCalendarsSet.has(calendarId)) continue;

          // ignore if not in the user's account
          if (!allCalendars.data.items?.some((calendar) => calendar.id === calendarId)) continue;

          // add to connected calendars
          connectedCalendarsSet.add(calendarId);

          // send a job to get and upsert events
          await opts.pgBoss.send(GET_EVENTS_JOB_NAME, { calendarId, days: 7 });

          // set up webhook
          const res = await calendarClient.events.watch({
            calendarId,
            requestBody: {
              id: EVENTS_WEBHOOK_JOB_NAME,
              type: "web_hook",
              address: `${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/events/webhook`,
            },
          });
          console.log("✔ Set up webhook for calendar", calendarId);
          connectedChannelsMap.set(calendarId, {
            calendarId,
            id: res.data.id ?? EVENTS_WEBHOOK_JOB_NAME,
            resourceId: res.data.resourceId!,
            // res.data.expiration is in Unix time, convert it to ISO string
            expires_at: opts.dayjs(res.data.expiration ?? 0).toISOString(),
          });
        }

        // disconnect any calendar that is not specified
        for (const calendarId of allCalendars.data.items?.map((calendar) => calendar.id) ?? []) {
          if (!calendarId || input.calendarIds.includes(calendarId)) continue;
          // remove from connected calendars
          connectedCalendarsSet.delete(calendarId);

          // remove webhook
          const channel = connectedChannelsMap.get(calendarId);
          if (!channel) continue;
          await calendarClient.channels.stop({
            requestBody: {
              id: channel.id,
              resourceId: channel.resourceId,
            },
          });
          console.log("✔ Removed webhook for calendar", calendarId);
          connectedChannelsMap.delete(calendarId);
        }

        await opts.store.setItem(CONNECTED_CALENDARS_KEY, Array.from(connectedCalendarsSet));
        await opts.store.setItem(CHANNELS_STORE_KEY, Array.from(connectedChannelsMap.values()));
        // schedule a job to sync calendars every 3 days. If the schedule already exists, it will be updated.
        await opts.pgBoss.schedule(CALENDARS_SYNC_JOB_NAME, "0 0 */3 * *", {
          calendarIds: input.calendarIds,
        });
        console.log("✔ Scheduled calendars sync job");

        return {
          operationName: "calendars", // this should invalidate the cache for the calendars operation
          data:
            allCalendars.data.items?.map((calendar) => ({
              ...calendar,
              connected: connectedCalendarsSet.has(calendar.id ?? ""),
            })) ?? [],
        };
      },
      /**
       * Refreshes the events of the specified calendars for the number of days specified (defaults to 7).
       * @throws {Error} If the user is not authenticated.
       */
      refreshEvents: async (input: { days: number }) => {
        const connectedCalendars = await opts.store.getPluginItem<string[]>(
          CONNECTED_CALENDARS_KEY
        );
        await opts.pgBoss.send(CALENDARS_SYNC_JOB_NAME, {
          calendarIds: connectedCalendars?.value ?? [],
          days: input.days ?? 7,
        });
        return {
          data: "Job sent to refresh events.",
        };
      },
    },
    handlePgBossWork: (work) => [
      work(UPSERT_EVENT_JOB_NAME, { batchSize: 5 }, async (jobs) => {
        // process 5 events at a time to go a little faster
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
            },
          });
          if (event.status === "cancelled" && !!item) {
            try {
              await opts.prisma.itemPluginData.delete({ where: { id: item.pluginDatas[0]?.id } });
              await opts.prisma.item.delete({ where: { id: item.id } });
            } catch (e) {
              console.log("Error deleting item and it's dependencies:", e);
            }
            console.log("✔ Deleted item from event", item.title, item.scheduledAt);
            continue;
          }
          const commonBetweenUpdateAndCreate = {
            title: event.summary ?? "No title",
            color: event.calendarColor ? opts.getNearestItemColor(event.calendarColor) : null,
            isAllDay: !!event.start?.date ? true : false,
            scheduledAt: event.start?.dateTime ?? null,
            durationInMinutes: opts
              .dayjs(event.end?.dateTime)
              .diff(event.start?.dateTime, "minute"),
            isRelevant: true, // for now all calendar events are relevant
          };
          const min = {
            status: event.status,
            htmlLink: event.htmlLink,
            numOfAttendees: event.attendees?.length ?? 0,
          };
          const full = {
            ...min,
            description: event.description,
            attendees: event.attendees as any, // the any is required to make typescript happy with Prisma's type system
            eventType: event.eventType,
            organizer: event.organizer,
            hangoutLink: event.hangoutLink,
            conferenceData: event.conferenceData as any, // the any is required to make typescript happy with Prisma's type system
            backgroundColor: event.calendarColor,
          };
          if (item) {
            await opts.prisma.item.update({
              where: { id: item.id },
              data: {
                ...commonBetweenUpdateAndCreate,
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
                ...commonBetweenUpdateAndCreate,
                pluginDatas: {
                  create: {
                    pluginSlug: opts.pluginSlug,
                    originalId: event.id,
                    min,
                    full,
                  },
                },
              },
            });
          }
          console.log("✔ Upserted item from event", event.summary, event.start?.dateTime);
        }
      }),
      work(GET_EVENTS_JOB_NAME, async (job) => {
        const jobData = job.data as { calendarId: string; days?: number };
        const calendarClient = await getCalendarClient();
        const calendar = await calendarClient.calendarList.get({ calendarId: jobData.calendarId });
        // get events in the next jobData.days days, start from the start of today
        const events = await calendarClient.events.list({
          calendarId: jobData.calendarId,
          timeMin: opts.dayjs().startOf("day").toISOString(),
          timeMax: opts
            .dayjs()
            .add(jobData.days ?? 7, "day")
            .toISOString(),
          singleEvents: true,
          orderBy: "startTime",
        });
        console.log(
          events.data.items?.length ?? 0,
          events.data.items?.length === 1 ? "event" : "events",
          "to process from initial sync of calendar",
          jobData.calendarId
        );
        for (const event of events.data.items ?? []) {
          await opts.pgBoss.send(UPSERT_EVENT_JOB_NAME, {
            ...event,
            calendarColor: calendar.data.backgroundColor ?? null,
          });
        }
      }),
      work(PROCESS_EVENTS_WEBHOOK_JOB_NAME, async (job) => {
        const jobData = job.data as { calendarId: string };
        const lastSyncItem = await opts.store.getPluginItem<string>(LAST_SYNC_STORE_KEY);
        const lastSync = lastSyncItem?.value ? opts.dayjs(lastSyncItem.value) : null;
        const calendarClient = await getCalendarClient();
        const calendar = await calendarClient.calendarList.get({ calendarId: jobData.calendarId });
        // get events updated since last sync or in the last 10 minutes if this is the first sync
        const events = await calendarClient.events.list({
          calendarId: jobData.calendarId,
          updatedMin: lastSync?.toISOString() ?? opts.dayjs().subtract(10, "minute").toISOString(),
          singleEvents: true,
          orderBy: "updated",
        });
        console.log(
          events.data.items?.length ?? 0,
          events.data.items?.length === 1 ? "event" : "events",
          "to process from webhook of calendar",
          jobData.calendarId
        );
        for (const event of events.data.items ?? []) {
          await opts.pgBoss.send(UPSERT_EVENT_JOB_NAME, {
            ...event,
            calendarColor: calendar.data.backgroundColor ?? null,
          });
        }
        await opts.store.setServerOnlyItem(LAST_SYNC_STORE_KEY, opts.dayjs().toISOString());
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

type Tokens = {
  access_token: string;
  expires_at: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expires_in?: never; // this is deleted before storing in the database, hence it's optional and will never be present
};

type StoreChannel = {
  calendarId: string;
  id: string;
  resourceId: string;
  expires_at: string;
};
