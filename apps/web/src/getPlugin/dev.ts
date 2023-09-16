export const devImportMap = import.meta.env.DEV
  ? {
      essentials: import("../../../../plugins/essentials/src/web"),
      gitstart: import("../../../../plugins/gitstart/src/web"),
      "google-calendar": import("../../../../plugins/google-calendar/src/web"),
    }
  : {};
