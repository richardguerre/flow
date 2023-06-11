import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "out",
    emptyOutDir: false,
    lib: {
      name: "flow-essentials",
      entry: "src/web.tsx",
      formats: ["umd"],
      fileName: () => "web.js",
    },
    rollupOptions: {
      external: [
        // react is a UMD global from the script tag in index.html
        "react",
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
    'require("react")': "React", // makes the bundle even smaller
  },
});
