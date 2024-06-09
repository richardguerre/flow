import config from "./vite.server";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    ...config.build,
    outDir: "../../apps/server/plugins",
    emptyOutDir: false,
    lib: {
      name: "flow-linear",
      entry: "src/server.ts",
      formats: ["cjs"],
      fileName: () => "linear.js",
    },
  },
});
