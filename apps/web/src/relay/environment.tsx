import React from "react";
import { Environment, Store, RecordSource, Network } from "relay-runtime";
import { RelayEnvironmentProvider as RelayRelayEnvironmentProvider } from "@flowdev/relay";

export const LOCAL_STORAGE_USER_TOKEN_KEY = "token";

export const environment = new Environment({
  network: Network.create(async (operation, variables) => {
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
  }),
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
