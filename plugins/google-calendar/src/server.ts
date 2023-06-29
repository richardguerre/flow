import { definePlugin } from "@flowdev/plugin/server";

export default definePlugin("google-calendar", (opts) => {
  const TOKENS_STORE_KEY = "tokens";
  return {
    onRequest: async (req, res) => {
      if (req.path === "/auth") {
        return res.redirect("https://google-calendar.vercel.com/api/auth"); // TODO: replace with the actual URL of the plugin api
      } else if (req.path === "/auth/callback" && req.method === "POST") {
        // store the access token in the user's Flow instance and return 200
        const tokenData = {
          ...req.body,
          expires_at: opts
            .dayjs()
            .add((req.body.expires_in ?? 10) - 10, "seconds") // 10 seconds buffer to account for latency in network requests
            .toISOString(),
        };
        delete tokenData.expires_in;
        await opts.store.setSecretItem(TOKENS_STORE_KEY, tokenData);
        return res.status(200).send();
      }
    },
  };
});
