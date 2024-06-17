import { BsArrowClockwise, BsCloudHaze2Fill } from "@flowdev/icons";
import { definePlugin } from "@flowdev/plugin/web";
import { BsChevronDown } from "react-icons/bs";

export default definePlugin((opts) => {
  // @ts-ignore as React is used during compilation and is required to make sure the plugin works with the host's React version
  const React = opts.React;
  const Flow = opts.components;

  const Accounts = () => {
    const accountsQuery = opts.operations.useLazyQuery<AccountsOperationData>({
      operationName: "accounts",
    });
    return (
      <div>
        {accountsQuery?.data?.map((account) => {
          const expiresAt = opts.dayjs(account.expiresAt);
          return (
            <div
              key={account.email}
              className="flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2"
            >
              <div className="font-semibold">{account.email}</div>
              <div>Expires: {expiresAt.fromNow()}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const LinearIcon = (props: { size?: number }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={props.size ?? 20}
      height={props.size ?? 20}
      viewBox="0 0 100 100"
    >
      <path
        fill="currentColor"
        d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5964C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228ZM.00189135 46.8891c-.01764375.2833.08887215.5599.28957165.7606L52.3503 99.7085c.2007.2007.4773.3075.7606.2896 2.3692-.1476 4.6938-.46 6.9624-.9259.7645-.157 1.0301-1.0963.4782-1.6481L2.57595 39.4485c-.55186-.5519-1.49117-.2863-1.648174.4782-.465915 2.2686-.77832 4.5932-.92588465 6.9624ZM4.21093 29.7054c-.16649.3738-.08169.8106.20765 1.1l64.77602 64.776c.2894.2894.7262.3742 1.1.2077 1.7861-.7956 3.5171-1.6927 5.1855-2.684.5521-.328.6373-1.0867.1832-1.5407L8.43566 24.3367c-.45409-.4541-1.21271-.3689-1.54074.1832-.99132 1.6684-1.88843 3.3994-2.68399 5.1855ZM12.6587 18.074c-.3701-.3701-.393-.9637-.0443-1.3541C21.7795 6.45931 35.1114 0 49.9519 0 77.5927 0 100 22.4073 100 50.0481c0 14.8405-6.4593 28.1724-16.7199 37.3375-.3903.3487-.984.3258-1.3542-.0443L12.6587 18.074Z"
      />
    </svg>
  );

  const Views = () => {
    const viewsQuery = opts.operations.useLazyQuery<ViewsOperationData>({
      operationName: "views",
    });

    return (
      <div className="flex flex-col gap-2">
        <View
          isUserIssues
          view={{
            id: "user-issues",
            name: "My Issues",
            account: "me",
            synced: true,
            color: null,
            icon: null,
          }}
        />
        {viewsQuery?.data?.views.map((view) => <View key={view.id} view={view} />)}
      </div>
    );
  };

  const View = (props: { view: ViewsOperationData["views"][number]; isUserIssues?: boolean }) => {
    const [addViewToSync, addingView] =
      opts.operations.useMutation<AddViewToSyncOperationInput>("addViewToSync");
    const [removeViewToSync, removingView] =
      opts.operations.useMutation<RemoveViewToSyncOperationInput>("removeViewToSync");

    return (
      <div className="flex gap-2 rounded w-full items-center bg-background-50 shadow px-4 py-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: props.view.color ?? "#3b82f6" }}
        />
        <div className="font-semibold">{props.view.name}</div>
        {props.isUserIssues ? (
          <div>Connected</div>
        ) : props.view.synced ? (
          <Flow.Button
            sm
            onClick={() => removeViewToSync({ viewId: props.view.id, account: props.view.account })}
            loading={removingView}
          >
            Disconnect
          </Flow.Button>
        ) : (
          <Flow.Button
            sm
            onClick={() => addViewToSync({ viewId: props.view.id, account: props.view.account })}
            loading={addingView}
          >
            Connect
          </Flow.Button>
        )}
      </div>
    );
  };

  const ListView = () => {
    const [loading, setLoading] = React.useState(true);
    const [connected, setConnected] = React.useState(false);
    const [views, setViews] = React.useState<ViewsOperationData["views"]>([]);
    const [selectedView, setSelectedView] = React.useState<{ viewId: ViewId; account: string }>({
      viewId: "my-issues",
      account: "me",
    });
    opts.hooks.useAsyncEffect(async () => {
      setLoading(true);
      const res = await opts.operations
        .query<ViewsOperationData>({
          operationName: "views",
        })
        .finally(() => setLoading(false));
      setConnected(res?.data?.connected ?? false);
      setViews(res?.data?.views ?? []);
    }, []);

    const [refreshMyIssues, isRefreshingMyIssues] = opts.operations.useMutation("syncUserIssues", {
      minimumWait: 1000,
    });
    const [refreshView, isRefreshingView] = opts.operations.useMutation<SyncViewOperationInput>(
      "syncView",
      { minimumWait: 1000 },
    );
    const isRefreshing = isRefreshingMyIssues || isRefreshingView;

    const handleRefresh = () => {
      if (selectedView.viewId === "my-issues") {
        refreshMyIssues();
      } else {
        refreshView(selectedView);
      }
    };

    return (
      <div className="flex flex-col gap-2 bg-background-100 h-full">
        <div className="px-4 pt-3 flex">
          <span className="text-xl font-semibold">Linear</span>
        </div>
        <div className="px-3 flex justify-between gap-2 items-center">
          <Flow.Select
            defaultValue="my-issues"
            onValueChange={(id) =>
              setSelectedView((currSelectedView) => {
                const selectedView = views.find((view) => view.id === id);
                if (!selectedView) return currSelectedView;
                return { viewId: id, account: selectedView.account };
              })
            }
          >
            <Flow.SelectUnstyledTrigger className="flex items-center gap-2 text-foreground-700 text-base font-semibold hover:text-primary-500">
              <Flow.SelectValue />
              <BsChevronDown size={14} color="currentColor" />
            </Flow.SelectUnstyledTrigger>
            <Flow.SelectContent align="start">
              <Flow.SelectItem value="my-issues">My Issues</Flow.SelectItem>
              {views.map((view) => (
                <Flow.SelectItem value={view.id}>{view.name}</Flow.SelectItem>
              ))}
              <Flow.SelectSeparator />
              <div className="max-w-48 text-foreground-700 text-center">
                Go to{" "}
                <a href="/settings/plugin/linear" className="underline hover:no-underline">
                  settings
                </a>{" "}
                to connect views from Linear.
              </div>
            </Flow.SelectContent>
          </Flow.Select>
          <Flow.Button tertiary sm onClick={handleRefresh} disabled={isRefreshing}>
            <BsArrowClockwise size={20} className={opts.tw(isRefreshing && "animate-spin")} />
          </Flow.Button>
        </div>
        {!loading ? (
          <>
            {!connected && (
              <div className="h-full flex items-center justify-center p-3">
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-center">Connect your Linear account to get started.</div>
                  <a href={`${opts.serverOrigin}/api/plugin/linear/auth`}>
                    <Flow.Button>Connect Linear</Flow.Button>
                  </a>
                </div>
              </div>
            )}
            <Flow.ItemsList
              where={{
                isRelevant: true,
                pluginDatas: {
                  some: {
                    pluginSlug: opts.pluginSlug,
                    min: { path: ["views"] as MinPath, array_contains: [selectedView.viewId] },
                  },
                },
              }}
              emptyState={
                connected ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2">
                      <BsCloudHaze2Fill size={32} className="text-foreground-700" />
                      <div className="text-foreground-700">No issues found</div>
                    </div>
                  </div>
                ) : null
              }
            />
          </>
        ) : (
          <div className="h-full flex items-center justify-center transform scale-70">
            <Flow.Loading />
          </div>
        )}
      </div>
    );
  };

  return {
    name: "Linear",
    settings: {
      "connect-account": {
        type: "custom",
        render: () => {
          return (
            <div className="flex flex-col gap-2">
              <a href={`${opts.serverOrigin}/api/plugin/linear/auth`}>
                <Flow.Button>Connect Linear</Flow.Button>
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
                  <Accounts />
                </React.Suspense>
              </Flow.ErrorBoundary>
            </div>
          );
        },
      },
      views: {
        type: "custom",
        render: () => {
          return (
            <Flow.ErrorBoundary
              fallbackRender={({ error }) => {
                return <p className="text-sm text-negative-600">{error.message}</p>;
              }}
            >
              <React.Suspense fallback="Loading views...">
                <Views />
              </React.Suspense>
            </Flow.ErrorBoundary>
          );
        },
      },
      syncAllViews: {
        type: "custom",
        render: () => {
          const [loading, setLoading] = React.useState(false);
          return (
            <div>
              <Flow.Button
                onClick={async () => {
                  setLoading(true);
                  await opts.operations.mutation({
                    operationName: "syncAllViews",
                  });
                  setLoading(false);
                }}
                loading={loading}
              >
                Refresh All Views
              </Flow.Button>
              <div>This will refresh all views and their issues. This may take a while.</div>
            </div>
          );
        },
      },
    },
    renderLists: async () => [{ id: "linear", name: "Linear", icon: <LinearIcon /> }],
    renderList: async () => ({ component: ListView }),
    renderItemCardDetails: async ({ item }) => {
      const pluginData = item.pluginDatas.find((data) => data.pluginSlug === opts.pluginSlug);
      if (!pluginData) return null;
      const min = pluginData.min as LinearIssueItemMin;
      const stateColor = opts.nearestTailwindColor(min.state.color);
      return [
        {
          component: () => (
            <Flow.Badge className={`bg-${stateColor}-200 text-${stateColor}-700`}>
              {min.state.name}
            </Flow.Badge>
          ),
        },
      ];
    },
    renderItemCardActions: async ({ item }) => {
      const pluginData = item.pluginDatas.find((data) => data.pluginSlug === opts.pluginSlug);
      if (!pluginData) return null;
      const min = pluginData.min as LinearIssueItemMin;
      return [
        {
          component: () => (
            <a
              href={min.url}
              target="_blank"
              rel="noreferrer"
              className="bg-background-200 text-foreground-700 hover:bg-background-300 active:bg-background-300 flex h-6 w-6 items-center justify-center rounded-full bg-opacity-50 text-sm hover:bg-opacity-70 active:bg-opacity-100"
            >
              <LinearIcon size={16} />
            </a>
          ),
        },
      ];
    },
  };
});

type MinPath = [keyof LinearIssueItemMin];
