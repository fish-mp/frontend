import { computed } from "vue";
import { useCourseStore } from "../stores/course";

// Конфигурация уровней сложности
const difficultyConfig = [
  { dbValue: "Сложность 1", label: "Легкий", order: 1 },
  { dbValue: "Сложность 2", label: "Средний", order: 2 },
  { dbValue: "Сложность 3", label: "Профи", order: 3 },
];

export const useDifficultyLevels = () => {
  const courseStore = useCourseStore();

  return computed(() => {
    // Получаем все значения сложности из курсов
    const dbValues = courseStore.courses
      .map((c) => c.tag?.name)
      .filter((name): name is string => !!name);

    // Создаем Set для уникальных значений
    const uniqueValues = [...new Set(dbValues)];

    // Маппим и сортируем
    return uniqueValues
      .map((dbValue) => {
        const config = difficultyConfig.find((c) => c.dbValue === dbValue);
        return {
          value: dbValue,
          label: config?.label || dbValue,
          order: config?.order || 999,
        };
      })
      .sort((a, b) => a.order - b.order);
  });
};
