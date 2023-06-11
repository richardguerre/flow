import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "out",
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
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
