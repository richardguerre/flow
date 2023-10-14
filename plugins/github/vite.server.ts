import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "out",
    emptyOutDir: false,
    rollupOptions: { output: { exports: "named" } },
    lib: {
      name: "flow-github",
      entry: "src/server.ts",
      formats: ["cjs"],
      fileName: () => "server.js",
    },
  },
  plugins: [
    {
      name: "remove-unsafe-code",
      transform: async (code) =>
        code.replace(
          /eval|setTimeout|setInterval|setImmidiate|process|__dirname|__filename/g,
          "undefined",
        ),
    },
  ],
});
