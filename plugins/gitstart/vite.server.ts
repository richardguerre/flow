import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "out",
    emptyOutDir: false,
    lib: {
      name: "flow-gitstart",
      entry: "src/server.ts",
      formats: ["cjs"],
      fileName: () => "server.js",
    },
  },
});
