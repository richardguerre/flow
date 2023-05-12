import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      name: "flow-plugin-flow",
      entry: { web: "src/web.tsx" },
      formats: ["es"],
      fileName: (_format, entryAlias) => `${entryAlias}.js`,
    },
    outDir: "out",
  },
});
