/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GRAPHQL_URL: string;
  readonly VITE_SERVER_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Prisma's JSON type for inputs and outputs. */
type JsonValue = string | number | boolean | { [Key in string]?: JsonValue } | Array<JsonValue>;
