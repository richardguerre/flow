// This file is at the root of the repo so that the VSCode extension can work correctly
import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    screens: {}, // don't know what screens to use, so until I do I'll just leave it empty
    backgroundColor: {
      gray: {
        50: "#f9fafb",
      },
    },
  },
  attributify: false,
});
