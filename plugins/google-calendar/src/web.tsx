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
      if (
        debouncedConnected.size === initiallyConnectedCalendars.size &&
        Array.from(debouncedConnected).every((calId) => initiallyConnectedCalendars.has(calId))
      ) {
        return;
      }
      setSaving(true);
      // this mutation will return with the same ID as the query, so it will update the cache directly
      await options.operations.mutation({
        pluginSlug: options.pluginSlug,
        operationName: "connectCalendars",
        input: { calendarIds: Array.from(debouncedConnected) },
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
      <div className="flex flex-col gap-2">
        {calendarsQuery?.data?.map((googleAccount) => (
          <div className="flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2">
            <div className="font-semibold">{googleAccount.account}</div>
            <div className="flex flex-col gap-2">
              {googleAccount.calendars.map((calendar) => (
                <Flow.CheckboxWithLabel
                  label={calendar.summary ?? "Unknown calendar"}
                  checked={connected.has(calendar.id!)}
                  onCheckedChange={() => handleCheckboxChange(calendar.id!)}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="italic text-sm text-foreground-700">{feedback}</div>
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
            <div className="flex flex-col gap-2">
              <a href={`${options.serverOrigin}/api/plugin/google-calendar/auth`}>
                <Flow.Button>Connect an account</Flow.Button>
              </a>
              <Flow.ErrorBoundary
                fallbackRender={({ error }) => {
                  if (error.cause?.[0]?.extensions?.code === "NOT_AUTHENTICATED") {
                    return <></>;
                  }
                  return <p className="text-sm text-negative-600">{error.message}</p>;
                }}
              >
                <React.Suspense fallback="Loading connected accounts...">
                  <Calendars />
                </React.Suspense>
              </Flow.ErrorBoundary>
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
