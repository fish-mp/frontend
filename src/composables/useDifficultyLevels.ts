import { computed } from "vue";
import { useCourseStore } from "../stores/course";

export const useDifficultyLevels = () => {
  const courseStore = useCourseStore();

  return computed(() => {
    // Получаем все уникальные значения сложности из курсов
    const difficultyValues = courseStore.courses
      .map((course) => course.tag?.name)
      .filter((name): name is string => !!name) // Фильтрация null/undefined
      .filter((value, index, array) => array.indexOf(value) === index); // Уникальные значения

    // Просто возвращаем массив строк - значений сложности
    return difficultyValues;
  });
};
