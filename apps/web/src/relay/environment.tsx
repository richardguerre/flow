import React from "react";
import { Environment, Store, RecordSource, Network } from "relay-runtime";
import { RelayEnvironmentProvider as RelayRelayEnvironmentProvider } from "relay";

export const LOCAL_STORAGE_USER_TOKEN_KEY = "user_token";

export const environment = new Environment({
  network: Network.create((operation, variables) => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY);
    return fetch(import.meta.env.VITE_GRAPHQL_URL, {
      method: "POST",
      headers: { "content-type": "application/json", ...(token ? { token } : {}) },
      body: JSON.stringify({ operationName: operation.name, query: operation.text, variables }),
    }).then((res) => res.json());
  }),
  store: new Store(new RecordSource()),
});

export type RelayEnvironmentProviderProps = {
  children: React.ReactNode;
};

export const RelayEnvironmentProvider: React.FC<RelayEnvironmentProviderProps> = (props) => {
  console.log(import.meta.env.VITE_GRAPHQL_URL);
  return (
    <RelayRelayEnvironmentProvider environment={environment}>
      {props.children}
    </RelayRelayEnvironmentProvider>
  );
};
