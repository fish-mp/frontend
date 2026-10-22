export interface Direction {
  id: string;
  title: string;
  audience: string;
  description: string;
  color: string;
  tint: string;
  icon: string;
  to?: string;
}

export const directions: Direction[] = [
  {
    id: 'dpo',
    title: 'ДПО',
    audience: 'Для взрослых',
    description:
      'Дополнительное профессиональное образование. Новые знания для развития и профессионального роста.',
    color: '#8450cf',
    tint: '#f0e8fc',
    icon: 'graduation',
  },
  {
    id: 'preschool',
    title: 'Подготовка к школе',
    audience: '3–7 лет',
    description:
      'Знакомимся с буквами и цифрами, развиваем речь, внимание и любознательность. Готовимся к школе с интересом.',
    color: '#209b5d',
    tint: '#e6f8ee',
    icon: 'star',
  },
  {
    id: 'extra',
    title: 'Дополнительные занятия для школьников',
    audience: '7–18 лет',
    description:
      'Пробуем новое, раскрываем способности и находим любимое дело за пределами школьной программы.',
    color: '#c46b0d',
    tint: '#fff1e3',
    icon: 'sparkles',
  },
  {
    id: 'primary',
    title: 'Начальная школа',
    audience: '1–4 классы',
    description:
      'Первые открытия, уверенность в своих силах и прочная основа для дальнейшего обучения.',
    color: '#c35676',
    tint: '#ffedf3',
    icon: 'book',
  },
  {
    id: 'middle',
    title: 'Средняя школа',
    audience: '5–9 классы',
    description: 'Углубляем знания, учимся мыслить самостоятельно и разбираться в сложных темах.',
    color: '#4466c7',
    tint: '#edf1ff',
    icon: 'planet',
  },
  {
    id: 'high',
    title: 'Старшая школа',
    audience: '10–11 классы',
    description: 'Определяем цели, расширяем кругозор и готовимся к следующему этапу образования.',
    color: '#91700b',
    tint: '#fff8da',
    icon: 'graduation',
  },
  {
    id: 'aquarium',
    title: 'Школа аквариумистики',
    audience: 'Для юных исследователей',
    description:
      'Создай свой подводный мир. Узнай всё о рыбках, растениях и уходе за аквариумом вместе с «АкваВселенной».',
    color: '#0987b9',
    tint: '#e6f6fd',
    icon: 'fish',
    to: '/aquarium',
  },
];
