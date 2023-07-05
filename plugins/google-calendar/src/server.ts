import { definePlugin } from "@flowdev/plugin/server";
import { calendar, type calendar_v3 } from "@googleapis/calendar";

const TOKENS_STORE_KEY = "tokens";
const CONNECTED_CALENDARS_KEY = "connected_calendars";
const UPSERT_EVENT_JOB_NAME = "upsert-item-from-event";
const CHANNELS_STORE_KEY = "channels";

export default definePlugin("google-calendar", (opts) => {
  /**
   * Get the tokens from the database. If the access token has expired, it will be refreshed.
   * @throws {Error} If the user is not authenticated.
   * @throws {Error} If the access token could not be refreshed.
   * @example
   * const tokens = await getTokens();
   */
  const getTokens = async (): Promise<Tokens> => {
    const tokensItem = await opts.store.getPluginItem(TOKENS_STORE_KEY);
    if (!tokensItem) {
      throw new Error(
        "NOT_AUTHENTICATED: You are not authenticated and will need to connect your Google account first."
      );
    }
    const tokens = tokensItem.value as Tokens;
    if (opts.dayjs().isAfter(tokens.expires_at)) {
      // access token has expired, refresh it
      const res = await fetch(
        "https://google-calendar.vercel.com/api/auth/refresh?refresh_token=" + tokens.refresh_token
      );
      if (!res.ok) {
        throw new Error("COULD_NOT_REFRESH_TOKEN: Could not refresh token.");
      }
      const newTokenData = await res.json();
      const newTokens = {
        ...newTokenData,
        expires_at: opts
          .dayjs()
          .add((newTokenData.expires_in ?? 10) - 10, "seconds") // 10 seconds buffer to account for latency in network requests
          .toISOString(),
      } as Tokens;
      await opts.store.setSecretItem(TOKENS_STORE_KEY, newTokens);
      return newTokens;
    }
    return tokens;
  };

  const getCalendarClient = async () => {
    const tokens = await getTokens();
    return calendar({
      version: "v3",
      auth: tokens.access_token,
    });
  };

  return {
    onRequest: async (req, res) => {
      if (req.path === "/auth") {
        return res.redirect("https://google-calendar.vercel.com/api/auth"); // TODO: replace with the actual URL of the plugin api
      } else if (req.path === "/auth/callback" && req.method === "POST") {
        // store the access token in the user's Flow instance and return 200
        const tokenData = {
          ...req.body,
          expires_at: opts
            .dayjs()
            .add((req.body.expires_in ?? 10) - 10, "seconds") // 10 seconds buffer to account for latency in network requests
            .toISOString(),
        } as Tokens;
        delete tokenData.expires_in;
        await opts.store.setSecretItem(TOKENS_STORE_KEY, tokenData);
        return res.status(200).send();
      }
    },
    operations: {
      calendars: async () => {
        const calendarClient = await getCalendarClient();
        const calendars = await calendarClient.calendarList.list();
        const connectedCalendarsItem = await opts.store.getPluginItem(CONNECTED_CALENDARS_KEY);
        const connectedCalendarsSet = new Set((connectedCalendarsItem?.value as string[]) ?? []);
        return {
          data:
            calendars.data.items?.map((calendar) => ({
              ...calendar,
              connected: connectedCalendarsSet.has(calendar.id ?? ""),
            })) ?? [],
        };
      },
      connectCalendars: async (input: { calendarIds: string[] }) => {
        const calendarClient = await getCalendarClient();
        const connectedCalendarsItem = await opts.store.getPluginItem(CONNECTED_CALENDARS_KEY);
        const connectedCalendarsSet = new Set((connectedCalendarsItem?.value as string[]) ?? []);
        const oldChannelsItem = await opts.store.getPluginItem(CHANNELS_STORE_KEY);
        const oldChannels = oldChannelsItem?.value as StoreChannel[];
        const newChannels: StoreChannel[] = [];

        for (const calendarId of input.calendarIds) {
          if (connectedCalendarsSet.has(calendarId)) continue;
          // 1. add to connected calendars
          connectedCalendarsSet.add(calendarId);
          const connectedCalendar = await calendarClient.calendarList.get({ calendarId });

          // 2. get first 7 days worth of events
          const events = await calendarClient.events.list({
            calendarId: calendarId,
            timeMin: opts.dayjs().toISOString(),
            timeMax: opts.dayjs().add(7, "day").toISOString(), // get events for the next 7 days in first sync
            singleEvents: true,
            orderBy: "startTime",
          });

          // 3. create items in the database
          for (const event of events.data.items ?? []) {
            await opts.pgBoss.send(UPSERT_EVENT_JOB_NAME, {
              ...event,
              calendarColor: connectedCalendar.data.backgroundColor ?? null,
            });
          }

          // 4. set up webhook
          const res = await calendarClient.events.watch({
            calendarId,
            requestBody: {
              id: "flow-calendar-events-webhook",
              type: "web_hook",
              address:
                opts.serverOrigin +
                `${opts.serverOrigin}/api/plugin/${opts.pluginSlug}/events/webhook`,
            },
          });
          newChannels.push({
            calendarId,
            id: res.data.id ?? "flow-calendar-events-webhook",
            resourceId: res.data.resourceId!,
          });
        }
        await opts.store.setItem(CHANNELS_STORE_KEY, [...oldChannels, ...newChannels]);
        await opts.store.setItem(CONNECTED_CALENDARS_KEY, Array.from(connectedCalendarsSet));

        const allCalendars = await calendarClient.calendarList.list();
        return {
          operationName: "calendars", // this should invalidate the cache for the calendars operation
          data:
            allCalendars.data.items?.map((calendar) => ({
              ...calendar,
              connected: connectedCalendarsSet.has(calendar.id ?? ""),
            })) ?? [],
        };
      },
      disconnectCalendars: async (input: { calendarIds: string[] }) => {
        const calendarClient = await getCalendarClient();
        const connectedCalendarsItem = await opts.store.getPluginItem(CONNECTED_CALENDARS_KEY);
        const connectedCalendarsSet = new Set((connectedCalendarsItem?.value as string[]) ?? []);
        const oldChannelsItem = await opts.store.getPluginItem(CHANNELS_STORE_KEY);
        const oldChannels = oldChannelsItem?.value as StoreChannel[];
        const stoppedChannels: StoreChannel[] = [];

        for (const calendarId of input.calendarIds) {
          if (!connectedCalendarsSet.has(calendarId)) continue;
          // 1. remove from connected calendars
          connectedCalendarsSet.delete(calendarId);

          // 2. remove webhook
          const channel = oldChannels.find((channel) => channel.calendarId === calendarId);
          if (!channel) continue;
          await calendarClient.channels.stop({
            requestBody: {
              id: channel.id,
              resourceId: channel.resourceId,
            },
          });
          stoppedChannels.push(channel);
        }
        await opts.store.setItem(
          CHANNELS_STORE_KEY,
          oldChannels.filter((channel) => !stoppedChannels.includes(channel))
        );
        await opts.store.setItem(CONNECTED_CALENDARS_KEY, Array.from(connectedCalendarsSet));

        const allCalendars = await calendarClient.calendarList.list();
        return {
          operationName: "calendars", // this should invalidate the cache for the calendars operation
          data:
            allCalendars.data.items?.map((calendar) => ({
              ...calendar,
              connected: connectedCalendarsSet.has(calendar.id ?? ""),
            })) ?? [],
        };
      },
    },
    pgBossWorkHandlers: {
      [UPSERT_EVENT_JOB_NAME]: {
        fn: async (job) => {
          const data = job.data as calendar_v3.Schema$Event & { calendarColor: string | null };
          const item = await opts.prisma.item.findFirst({
            where: { pluginDatas: { some: { originalId: data.id, pluginSlug: opts.pluginSlug } } },
            include: {
              pluginDatas: {
                where: { originalId: data.id, pluginSlug: opts.pluginSlug },
                select: { id: true },
              },
            },
          });
          const commonBetweenUpdateAndCreate = {
            title: data.summary ?? "No title",
            color: data.calendarColor ? opts.getNearestItemColor(data.calendarColor) : null,
            isAllDay: !!data.start?.date ? true : false,
            scheduledAt: data.start?.dateTime ?? null,
            durationInMinutes: opts.dayjs(data.end?.dateTime).diff(data.start?.dateTime, "minute"),
            isRelevant: true, // for now all calendar events are relevant
          };
          const min = {
            htmlLink: data.htmlLink,
            numOfAttendees: data.attendees?.length ?? 0,
          };
          const full = {
            ...min,
            description: data.description ?? null,
            attendees: data.attendees?.map((attendee) => ({ ...attendee })) ?? [], // the map is required to make typescript happy with Prisma's type system
            eventType: data.eventType ?? null,
            organizer: data.organizer ?? null,
            hangoutLink: data.hangoutLink,
            conferenceData: JSON.parse(JSON.stringify(data.conferenceData)) ?? null, // the parse/stringify is required to make typescript happy with Prisma's type system
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
                    originalId: data.id,
                    min,
                    full,
                  },
                },
              },
            });
          }
        },
      },
    },
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
};
