export interface Fish {
  id: string;
  name: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}

export const fishData: Fish[] = [
  {
    id: "1",
    name: "Золотая рыбка",
    description: "Небольшая пресноводная рыбка с яркой чешуёй.",
    image: "/goldFish.jpg",
    lat: 55.751244,
    lng: 37.618423,
  },
  {
    id: "2",
    name: "Неон",
    description: "Яркая аквариумная рыбка из южноамериканских водоёмов.",
    image: "/neonFish.jpg",
    lat: 59.9342802,
    lng: 30.3350986,
  },
];
