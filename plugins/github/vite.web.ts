import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "out",
    emptyOutDir: false,
    lib: {
      name: "flow-github",
      entry: "src/web.tsx",
      formats: ["es"],
      fileName: () => "web.js",
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  plugins: [react({ jsxRuntime: "classic" })],
});
