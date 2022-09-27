import { defineConfig } from "vitest/config";
import checker from "vite-plugin-checker";

export default defineConfig({
  test: {},
  plugins: [checker({ typescript: true })],
});
