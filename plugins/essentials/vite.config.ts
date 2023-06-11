import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      name: "flow-essentials",
      entry: { web: "src/web.tsx", server: "src/server.ts" },
      // TODO: figure out how to get es just for web and cjs for server
      formats: ["es", "cjs"],
      fileName: (format, entryAlias) => {
        if (entryAlias === "web" && format === "es") {
          return "web.js";
        } else if (entryAlias === "server" && format === "cjs") {
          return "server.js";
        }
        return `_ignore_${entryAlias}.js`;
      },
    },
    outDir: "out",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
