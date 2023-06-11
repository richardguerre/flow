import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      name: "flow-essentials",
      entry: { web: "src/web.tsx", server: "src/server.ts" },
      formats: ["cjs"],
      fileName: (_format, entryAlias) => `${entryAlias}.js`,
    },
    outDir: "out",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
