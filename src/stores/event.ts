import { defineStore } from "pinia";
import { ref } from "vue";
import type { EventItem } from "../types/Event";

export const useEventStore = defineStore("event", () => {
  const events = ref<EventItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${BACKEND_URL}/api/events/`);
      if (!response.ok) throw new Error("Не удалось загрузить события");
      const data = await response.json();
      events.value = data;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
  };
});
