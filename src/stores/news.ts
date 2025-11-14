import { defineStore } from "pinia";
import { ref } from "vue";
import type { NewsItem } from "../types/News";

export const useNewsStore = defineStore("news", () => {
  const news = ref<NewsItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchNews = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${BACKEND_URL}/api/news/`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "GET",
      });
      if (!response.ok) throw new Error("Не удалось загрузить новости");
      news.value = await response.json();
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    news,
    loading,
    error,
    fetchNews,
  };
});
