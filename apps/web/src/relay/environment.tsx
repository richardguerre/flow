import React from "react";
import {
  Environment,
  Observable,
  Store,
  RecordSource,
  RequestParameters,
  Variables,
  Network,
  // GraphQLResponse,
} from "relay-runtime";
import { RelayEnvironmentProvider as RelayRelayEnvironmentProvider } from "@flowdev/relay";
import { createClient } from "graphql-sse";

export const LOCAL_STORAGE_USER_TOKEN_KEY = "token";

// graphql-sse setup copied from https://the-guild.dev/graphql/sse/recipes#with-relay
const subscriptionsClient = createClient({
  url: import.meta.env.PROD ? "/graphql" : import.meta.env.VITE_GRAPHQL_URL,
  headers: () => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY);
    return {
      ...(token ? { Authorization: `Bearer ${token.slice(-1)}` } : {}),
    };
  },
});

function executeSubscription(operation: RequestParameters, variables: Variables) {
  Observable.onUnhandledError(console.log);
  return Observable.create<any>((sink) => {
    if (!operation.text) {
      return sink.error(new Error("Operation text cannot be empty"));
    }
    return subscriptionsClient.subscribe(
      { operationName: operation.name, query: operation.text, variables },
      {
        ...sink,
        next: (res) => {
          if (res.errors) {
            const errorsSet = new Set(res.errors.map((e: any) => e.message));
            sink.error(new Error(Array.from(errorsSet).join("\n"), { cause: res.errors }));
          }
          sink.next(res);
        },
      }
    );
  });
}

const executeQueryOrMutation = async (operation: RequestParameters, variables: Variables) => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY);
  const res = await fetch(import.meta.env.PROD ? "/graphql" : import.meta.env.VITE_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ operationName: operation.name, query: operation.text, variables }),
  }).then((res) => res.json());
  if (res.errors) {
    const errorsSet = new Set(res.errors.map((e: any) => e.message));
    throw new Error(Array.from(errorsSet).join("\n"), { cause: res.errors });
  }
  return res;
};

export const environment = new Environment({
  network: Network.create(executeQueryOrMutation, executeSubscription),
  store: new Store(new RecordSource()),
});

export type RelayEnvironmentProviderProps = {
  children: React.ReactNode;
};

export const RelayEnvironmentProvider = (props: RelayEnvironmentProviderProps) => {
  return (
    <RelayRelayEnvironmentProvider environment={environment}>
      {props.children}
    </RelayRelayEnvironmentProvider>
  );
};
