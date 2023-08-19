import React from "react";
import { Environment, Store, RecordSource, Network } from "relay-runtime";
import { RelayEnvironmentProvider as RelayRelayEnvironmentProvider } from "@flowdev/relay";

export const LOCAL_STORAGE_USER_TOKEN_KEY = "token";

export const environment = new Environment({
  network: Network.create(async (operation, variables) => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY);
    const res = await fetch(import.meta.env.VITE_GRAPHQL_URL, {
      method: "POST",
      headers: { "content-type": "application/json", ...(token ? { token } : {}) },
      body: JSON.stringify({ operationName: operation.name, query: operation.text, variables }),
    }).then((res) => res.json());
    res.data = res.data ?? {};
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
