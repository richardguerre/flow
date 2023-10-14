import { definePlugin } from "@flowdev/plugin/web";

export default definePlugin((options) => {
  // @ts-ignore as React is used during compilation and is required to make sure the plugin works with the host's React version
  const React = options.React;
  const Flow = options.components;

  const Calendars = () => {
    const calendarsQuery = options.operations.useLazyQuery<CalendarsData>({
      pluginSlug: options.pluginSlug,
      operationName: "calendars",
    });
    const initiallyConnectedCalendars = new Set(
      calendarsQuery?.data
        ?.flatMap((googleAccount) => googleAccount.calendars)
        .filter((cal) => cal.connected && !!cal.id)
        .map((cal) => cal.id!) ?? [],
    );
    const [connected, setConnected] = React.useState(initiallyConnectedCalendars);
    const [debouncedConnected, debouncing] = options.hooks.useDebounce(connected, 1000);
    const [saving, setSaving] = React.useState(false);

    const handleCheckboxChange = (calendarId: string) => {
      if (connected.has(calendarId)) {
        connected.delete(calendarId);
      } else {
        connected.add(calendarId);
      }
      setConnected(new Set(connected));
    };

    options.hooks.useAsyncEffect(async () => {
      setSaving(true);
      // this mutation will return with the same ID as the query, so it will update the cache directly
      await options.operations.mutation({
        pluginSlug: options.pluginSlug,
        operationName: "connectCalendars",
        input: { calendars: Array.from(debouncedConnected) },
      });
      setSaving(false);
    }, [debouncedConnected]);

    let feedback = "Saved";
    if (debouncing && !saving) {
      feedback = "Not saved yet...";
    } else if (!debouncing && saving) {
      feedback = "Saving...";
    } else {
      feedback = "Saved";
    }

    return (
      <div>
        <div>{feedback}</div>
        {calendarsQuery?.data?.map((googleAccount) => (
          <div>
            <div>{googleAccount.account}</div>
            <div>
              {googleAccount.calendars.map((calendar) => (
                <label>
                  <input
                    type="checkbox"
                    checked={connected.has(calendar.id!)}
                    onChange={() => handleCheckboxChange(calendar.id!)}
                  />
                  {calendar.summary}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return {
    name: "Google Calendar",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => {
          return (
            <div>
              <a href="/api/plugin/google-calendar/auth">
                <Flow.Button>Connect an account</Flow.Button>
              </a>
              <React.Suspense>
                <Calendars />
              </React.Suspense>
            </div>
          );
        },
      },
    },
    routineSteps: {
      "create-tasks-from-events": {
        name: "Create tasks from events",
        description: "Create tasks from events in your connected Google Calendars.",
        component: (props) => {
          return (
            <div>
              <div>
                <props.BackButton />
                <props.NextButton />
              </div>
            </div>
          );
        },
      },
    },
  };
});
