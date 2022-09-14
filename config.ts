const constants = {
  nameInLinear: "Richard Guerre",
  linearStatusesICareAbout: ["Todo", "In Progress", "Under Review"],
};

export const externalSourceConfig: ExternalSourceConfig = {
  Linear: {
    description: "Linear is a project management tool",
    webhook: {
      onWebhookEvent: async (event: LinearWebhookEvent) => {
        if (event.type !== "Issue") return null;
        if (event.data?.assignee?.name !== constants.nameInLinear) return null;

        return {
          id: event.data.id,
          title: `[${event.data.team.key}-${event.data.number}] ` + event.data.title,
          url: event.url,
          isRelevant: constants.linearStatusesICareAbout.includes(event.data.state.name),
          deletedAt: event.action === "delete" ? new Date() : undefined,
        };
      },
    },
  },
  GitHub: {
    description: "Github is a code hosting platform",
  },
};
