import { defineStore } from "pinia";
import { ref } from "vue";
import { EventItem } from "../types/Event";

export const useEventStore = defineStore("event", () => {
  const events = ref<EventItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/events/");
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
