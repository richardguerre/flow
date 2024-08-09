/**
 * Import map of plugins in development to make it easier to develop plugins.
 *
 * (1) is commented out by default. Uncomment it during development.
 * (2) is uncommented in by default so that the build passes without type checking the plugins.
 *
 * Recommend using `git update-index --skip-worktree apps/mobile-pwa/src/getPlugin/plugin.dev.ts` to ignore changes to this file and not commit it.
 */

// (1) you can uncomment the following lines during development
// export const devImportMap = {
//   essentials: import("../../../../plugins/essentials/src/mobile-pwa"),
//   github: import("../../../../plugins/github/src/mobile-pwa"),
//   gitstart: import("../../../../plugins/gitstart/src/mobile-pwa"),
//   linear: import("../../../../plugins/linear/src/mobile-pwa"),
//   "google-calendar": import("../../../../plugins/google-calendar/src/mobile-pwa"),
//   "repeating-tasks": import("../../../../plugins/repeating-tasks/src/mobile-pwa"),
// } as const;

// (2) uncomment the following line when doing a production build
export const devImportMap = {};
