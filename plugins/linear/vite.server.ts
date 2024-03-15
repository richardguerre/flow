import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "out",
    emptyOutDir: false,
    lib: {
      name: "flow-linear",
      entry: "src/server.ts",
      formats: ["cjs"],
      fileName: () => "server.js",
    },
    rollupOptions: {
      external: [
        "fs",
        "url",
        "stream",
        "util",
        "https",
        "querystring",
        "http2",
        "zlib",
        "process",
        "child_process",
        "os",
        "path",
        "events",
        "crypto",
        "buffer",
        "tls",
        "assert",
        "net",
      ],
    },
  },
});
