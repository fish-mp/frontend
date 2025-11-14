import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [vue()],
    transformIndexHtml(html: string) {
      return html.replace(/VITE_YMAPS_API_KEY/g, env.VITE_YMAPS_API_KEY || "");
    },
  };
});
