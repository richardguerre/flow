import { definePlugin } from "@flowdev/plugin/web";
import { TOKEN_STORE_KEY } from "./server";

export default definePlugin((opts) => {
  return {
    name: "GitStart",
    settings: {
      [TOKEN_STORE_KEY]: {
        type: "textfield",
        label: "Token",
        helper:
          "You can find this in your localStorage when logged in to GitStart under the key `user_token`.",
        isSecret: true, // once set, it cannot be seen again, but each time the setting is saved again it will be overwritten
      },
    },
  };
});
