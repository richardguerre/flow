const constants = {
  nameInLinear: "Richard Guerre",
  linearStatusesICareAbout: ["Todo", "In Progress", "Under Review"],
};

export const externalSources: ExternalSources = {
  Linear: {
    description: "Linear issues that I'm assigned and that are in a status I care about",
    webhook: {
      onWebhookEvent: async (event: LinearWebhookEvent) => {
        if (event.type !== "Issue") return null;
        if (event.data?.assignee?.name !== constants.nameInLinear) return null;
        if (!event.data.id || !event.url) return null;

        return {
          id: event.data.id,
          title: `${event.data.team?.key || ""}-${event.data.number}: ` + event.data.title,
          url: event.url,
          isRelevant:
            !!event.data?.state?.name &&
            constants.linearStatusesICareAbout.includes(event.data.state.name),
        };
      },
    },
  },
  GitHub: {
    description: "GitHub PRs that need my review and aren't closed",
  },
};
