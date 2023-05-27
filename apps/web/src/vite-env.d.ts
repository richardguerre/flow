/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type JsonValue = string | number | boolean | { [Key in string]?: JsonValue } | Array<JsonValue>;
