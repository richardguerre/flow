import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      name: "flow-essentials",
      entry: { web: "src/web.tsx" },
      formats: ["es"],
      fileName: (_format, entryAlias) => `${entryAlias}.js`,
    },
    outDir: "out",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
