import { computed } from 'vue'
import { useCourseStore } from '../stores/course'

// Порядок сложности для сортировки
const difficultyOrder = ['Сложность 1', 'Сложность 2', 'Сложность 3'];

export const useDifficultyLevels = () => {
  const courseStore = useCourseStore()
  
  return computed(() => {
    const levels = Array.from(
      new Set(
        courseStore.courses.map((c) => c.tag?.name).filter((name): name is string => !!name)
      )
    ).map((name) => ({ value: name, label: name }));

    // Сортируем в соответствии с заданным порядком
    return levels.sort((a, b) => {
      const indexA = difficultyOrder.indexOf(a.value);
      const indexB = difficultyOrder.indexOf(b.value);
      return indexA - indexB;
    });
  });
} 