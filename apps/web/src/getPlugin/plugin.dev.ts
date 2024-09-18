/**
 * Import map of plugins in development to make it easier to develop plugins.
 *
 * (1) is commented out by default. Uncomment it during development.
 * (2) is uncommented in by default so that the build passes without type checking the plugins.
 *
 * Recommend using `git update-index --skip-worktree apps/web/src/getPlugin/plugin.dev.ts` to ignore changes to this file and not commit it.
 */

// (1) you can uncomment the following lines during development
// export const devImportMap = {
//   essentials: import("../../../../plugins/essentials/src/web"),
//   github: import("../../../../plugins/github/src/web"),
//   gitstart: import("../../../../plugins/gitstart/src/web"),
//   "google-calendar": import("../../../../plugins/google-calendar/src/web"),
//   slack: import("../../../../plugins/slack/src/web"),
// } as const;

// (2) uncomment the following line when doing a production build
export const devImportMap = {};
