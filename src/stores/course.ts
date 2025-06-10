import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";

interface CourseFile {
  id: number;
  file: string;
  title: string;
}

interface Course {
  id: number;
  files: CourseFile[];
  enrollment_state: string | null;
  title: string;
  description: string;
  short_description: string;
}

export const useCourseStore = defineStore("course", () => {
  const courses = ref<Course[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const auth = useAuthStore();

  const fetchCourses = async () => {
    try {
      isLoading.value = true;
      const response = await fetch(
        "http://fish-mp.miv-dev.ru:8000/api/courses/",
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const body = await response.text();
        console.error("Ошибка /api/courses/:", response.status, body);
        throw new Error(`Сервер вернул ${response.status}`);
      }

      courses.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  const enrollToCourse = async (courseId: number) => {
    try {
      const response = await fetch(
        `http://fish-mp.miv-dev.ru:8000/api/courses/${courseId}/enroll/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Ошибка записи на курс");

      const updatedCourses = courses.value.map((course) =>
        course.id === courseId
          ? { ...course, enrollment_state: "applied" }
          : course
      );
      courses.value = updatedCourses;

      return true;
    } catch (err) {
      error.value = err.message;
      return false;
    }
  };

  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    enrollToCourse,
  };
});
