import { definePlugin } from "@flowdev/plugin/web";
import { NotificationItemPluginDataMin } from "./server";

export default definePlugin((opts) => {
  const Flow = opts.components;
  // @ts-ignore React is used to when building where JSX is transformed to React.createElement calls
  const React = opts.React;
  const githubIcon = (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );

  return {
    name: "GitHub",
    renderItemCardDetails: async ({ item }) => {
      const itemPluginData = item.pluginDatas.find((pd) => pd.pluginSlug === opts.pluginSlug);
      if (!itemPluginData) return null;
      const min = itemPluginData.min as NotificationItemPluginDataMin;
      const [, owner, repo, number] = min.url.match(
        /https:\/\/(?:api\.)?github\.com\/(?:repos\/)?([^/]+)\/([^/]+)\/pull(?:s)?\/([^/]+)/,
      )!;
      if (!owner || !repo) return null;
      return [
        {
          fullWidth: true,
          component: () => (
            <a
              href={`https://github.com/${owner}/${repo}${number ? `/pull/${number}` : ""}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Flow.Badge className="flex w-fit items-center gap-1 bg-gray-200 text-gray-600">
                {githubIcon}
                <span className="hover:underline">
                  {owner}/{repo}
                  {number ? `#${number}` : ""}
                </span>
              </Flow.Badge>
            </a>
          ),
        },
      ];
    },
    renderTaskCardDetails: async ({ task }) => {
      const itemPluginData = task.pluginDatas.find((pd) => pd.pluginSlug === opts.pluginSlug);
      if (!itemPluginData) return null;
      const min = itemPluginData.min as NotificationItemPluginDataMin;
      const [, owner, repo, number] = min.url.match(
        /https:\/\/(?:api\.)?github\.com\/(?:repos\/)?([^/]+)\/([^/]+)\/pull(?:s)?\/([^/]+)/,
      )!;
      return [
        {
          fullWidth: true,
          component: () => (
            <a
              href={`https://github.com/${owner}/${repo}${number ? `/pull/${number}` : ""}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Flow.Badge className="flex w-fit items-center gap-1 bg-gray-200 text-gray-600">
                {githubIcon}
                <span className="hover:underline">
                  {owner}/{repo}
                  {number ? `#${number}` : ""}
                </span>
              </Flow.Badge>
            </a>
          ),
        },
      ];
    },
  };
});
