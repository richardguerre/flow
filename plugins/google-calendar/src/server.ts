import { definePlugin } from "@flowdev/plugin/server";

export default definePlugin("google-calendar", (opts) => {
  const TOKENS_STORE_KEY = "tokens";
  return {
    onRequest: async (req, res) => {
      if (req.path === "/auth") {
        return res.redirect("https://google-calendar.vercel.com/api/auth"); // TODO: replace with the actual URL of the plugin api
      } else if (req.path === "/auth/callback" && req.method === "POST") {
        // store the access token in the user's Flow instance and return 200
        const tokenData = req.body;
        await opts.store.setSecretItem(TOKENS_STORE_KEY, tokenData);
        return res.status(200).send();
      }
    },
  };
});
