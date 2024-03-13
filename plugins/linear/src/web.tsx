import { definePlugin } from "@flowdev/plugin/web";

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

  const CreateListDialog = (props: { views: ViewsOperationData }) => {
    const [open, setOpen] = React.useState(false);
    type Values = {
      name: string;
      viewId: string;
    };
    const { register, handleSubmit, control } = opts.reactHookForm.useForm<Values>();
    const onSubmit = async (values: Values) => {
      console.log(values);
      const view = props.views.find((view) => view.id === values.viewId);
      if (!view) {
        return;
      }
      await opts.operations.mutation({
        operationName: "createList",
        input: {
          listName: values.name,
          viewId: view.id,
          account: view.account,
        } satisfies CreateListOperationInput,
      });
      return;
    };
    return (
      <Flow.Dialog open={open} onOpenChange={setOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flow.DialogTitle>Create List</Flow.DialogTitle>
          <Flow.DialogContent>
            <Flow.FormInput
              {...register("name", { required: "The list must be named something 😄" })}
              label="Name"
            />
            <Flow.FormSelect name="viewId" control={control}>
              <Flow.SelectTrigger className="max-w-xs">Linear view</Flow.SelectTrigger>
              <Flow.SelectContent>
                {props.views.map((view) => (
                  <Flow.SelectItem key={view.id} value={view.id}>
                    {view.name}
                  </Flow.SelectItem>
                ))}
              </Flow.SelectContent>
            </Flow.FormSelect>
          </Flow.DialogContent>
          <Flow.DialogFooter>
            <Flow.Button>Create</Flow.Button>
          </Flow.DialogFooter>
        </form>
      </Flow.Dialog>
    );
  };

  const Lists = () => {
    const [open, setOpen] = React.useState(false);
    const listsQuery = opts.operations.useLazyQuery<ListsOperationData>({
      operationName: "lists",
    });
    const viewsQuery = opts.operations.useLazyQuery<ViewsOperationData>({
      operationName: "views",
    });

    return (
      <div>
        {listsQuery?.data?.map((list) => {
          return (
            <div
              key={list.name}
              className="flex flex-col gap-2 rounded w-full bg-background-50 shadow px-4 py-2"
            >
              <div className="font-semibold">{list.name}</div>
              <div>{list.description}</div>
              <Flow.Button
                danger
                onClick={async () => {
                  await opts.operations.mutation({
                    operationName: "deleteList",
                    input: {
                      listId: list.id,
                    } satisfies DeleteListOperationInput,
                  });
                }}
              >
                Remove
              </Flow.Button>
            </div>
          );
        })}
        <Flow.Button onClick={() => setOpen(true)}>Create List</Flow.Button>
        {open && <CreateListDialog views={viewsQuery?.data ?? []} />}
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
      lists: {
        type: "custom",
        render: () => {
          return (
            <Flow.ErrorBoundary
              fallbackRender={({ error }) => {
                return <p className="text-sm text-negative-600">{error.message}</p>;
              }}
            >
              <React.Suspense fallback="Loading lists...">
                <Lists />
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
                Refresh All Lists
              </Flow.Button>
              <div>This will refresh all lists and their issues. This may take a while.</div>
            </div>
          );
        },
      },
    },
  };
});
