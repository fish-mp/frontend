import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import type { Course } from "../types/Course";

export const useCourseStore = defineStore("course", () => {
  const courses = ref<Course[]>([]);
  const myCourses = ref<Course[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const auth = useAuthStore();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchCourses = async () => {
    try {
      isLoading.value = true;
      const response = await fetch(`${BACKEND_URL}/api/courses/`, {
        headers: {
          // Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (!response.ok) {
        const body = await response.text();
        console.error("Ошибка /api/courses/:", response.status, body);
        throw new Error(`Сервер вернул ${response.status}`);
      }

      courses.value = await response.json();
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchMyCourses = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      
      if (!auth.isAuthenticated) {
        throw new Error("Требуется авторизация");
      }

      const response = await fetch(`${BACKEND_URL}/api/my-courses/`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });

      if (!response.ok) {
        const body = await response.text();
        console.error("Ошибка /api/my-courses/:", response.status, body);
        throw new Error(`Сервер вернул ${response.status}`);
      }

      myCourses.value = await response.json();
    } catch (err: any) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const enrollToCourse = async (courseId: number) => {
    try {
      if (!auth.isAuthenticated) {
        throw new Error("Требуется авторизация");
      }

      const response = await fetch(
        `${BACKEND_URL}/api/courses/${courseId}/enroll/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Ошибка записи на курс");

      // Обновляем состояние курса в списке всех курсов
      const updatedCourses = courses.value.map((course) =>
        course.id === courseId
          ? { ...course, enrollment_state: "applied" }
          : course
      );
      courses.value = updatedCourses;

      return true;
    } catch (err: any) {
      error.value = err.message;
      return false;
    }
  };

  return {
    courses,
    myCourses,
    isLoading,
    error,
    fetchCourses,
    fetchMyCourses,
    enrollToCourse,
  };
});