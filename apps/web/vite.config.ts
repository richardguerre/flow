import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import WindiCSS from "vite-plugin-windicss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // @ts-ignore as WindiCSS types are not updated to those of Vite 4.0, but the plugin works fine
    WindiCSS(),
  ],
});
