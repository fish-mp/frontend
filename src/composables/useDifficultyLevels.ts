import { computed } from "vue";
import { useCourseStore } from "../stores/course";

// Конфигурация уровней сложности с явным порядком
const DIFFICULTY_CONFIG = [
  { dbValue: "Сложность 1", label: "Легкий", order: 1 },
  { dbValue: "Сложность 2", label: "Средний", order: 2 },
  { dbValue: "Сложность 3", label: "Профи", order: 3 },
] as const;

export const useDifficultyLevels = () => {
  const courseStore = useCourseStore();

  return computed(() => {
    // Получаем все значения сложности из курсов
    const dbValues = courseStore.courses
      .map((course) => course.tag?.name)
      .filter((name): name is string => !!name); // Фильтрация null/undefined

    // Уникальные значения
    const uniqueValues = [...new Set(dbValues)];

    // Маппим, фильтруем и сортируем по возрастанию сложности
    return uniqueValues
      .map((dbValue) => {
        const config = DIFFICULTY_CONFIG.find((c) => c.dbValue === dbValue);
        return {
          value: dbValue,
          label: config?.label || dbValue, // Если нет в конфиге, используем оригинальное значение
          order: config?.order || Number.MAX_SAFE_INTEGER, // Неизвестные значения в конец
        };
      })
      .sort((a, b) => a.order - b.order); // Сортировка по возрастанию order
  });
};
