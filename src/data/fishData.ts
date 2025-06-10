export interface Fish {
  id: number;
  name: string;
  description: string;
  lat: number;
  lng: number;
  image: string;
  location: string;
}

export const fishData: Fish[] = [
  {
    id: 1,
    name: "Щука",
    lat: 47.2369,
    lng: 39.713,
    description:
      "Крупная хищная рыба семейства щуковых, обитает в медленнотекущих участках реки Дон.",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Hecht.jpg",
    location: "Река Дон",
  },
  {
    id: 2,
    name: "Окунь",
    lat: 48.022,
    lng: 45.223,
    description:
      "Речной окунь с характерными тёмными полосами, предпочитает каменистые перекаты реки Волга.",
    image:
      "https://fly-fishing.ru/media/photologue/flies/2011/01/29/jcs-perca-fluviatilis-23942.jpg",
    location: "Река Волга",
  },
  {
    id: 3,
    name: "Сом",
    lat: 44.9778,
    lng: 38.9753,
    description:
      "Ночная донная рыба, может достигать значительных размеров и веса, часто встречается в реке Кубань.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/21/Especies-invasoras-el-siluro-gigante-europeo.jpg",
    location: "Река Кубань",
  },
  {
    id: 4,
    name: "Карп",
    lat: 54.737,
    lng: 55.972,
    description:
      "Всеядный карп, часто встречается в спокойных заводях и заливах реки Ока.",
    image:
      "https://carptoday.ru/wp-content/uploads/2022/02/1000x600-text-kopiya-kopiya-kopiya-kopiya-768x461.png",
    location: "Река Ока",
  },
  {
    id: 5,
    name: "Голавль",
    lat: 50.2,
    lng: 31.35,
    description:
      "Стремительная хищная рыба, живёт в быстрых перекатах со средним течением реки Волчья.",
    image: "https://www.salmo.by/upload/medialibrary/6d2/2.JPG",
    location: "Река Волчья",
  },
  {
    id: 6,
    name: "Сиг",
    lat: 53.5587,
    lng: 108.165,
    description:
      "Эндемик озера Байкал, высокопитательная рыба с нежным вкусом.",
    image:
      "https://adriaticnature.ru/wp-content/uploads/2016/12/Coregonus-lavaretus-724x451.jpg",
    location: "Озеро Байкал",
  },
  {
    id: 7,
    name: "Налим",
    lat: 40.3167,
    lng: 45.3667,
    description:
      "Ночная хищная рыба, предпочитает глубокие и холодные участки озера Севан.",
    image:
      "https://dikoved.ru/upload/iblock/90d/8x6m7wd01h15dak7tc8rb4lh94d9oluu.jpg",
    location: "Озеро Севан",
  },
  {
    id: 8,
    name: "Корюшка",
    lat: 60.8469,
    lng: 32.1903,
    description:
      "Небольшая сельдевидная рыба, массово мигрирует вдоль побережья Ладожского озера.",
    image:
      "https://images.gastronom.ru/_91f_35Q6jBGNVMooPvhhVnI8IifLLS886lc8xL6NhY/pr:article-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2JmNWYyNzhmLWNlZWUtNGRjNC1hMGJiLTJmZThjYzVhMGE3OC5qcGc.webp",
    location: "Ладожское озеро",
  },
  {
    id: 9,
    name: "Рипус",
    lat: 58.6186,
    lng: 27.2959,
    description:
      "Подвид сиговых рыб, обитает в холодных и глубоких зонах Чудского озера.",
    image:
      "https://animals.pibig.info/uploads/posts/2023-04/1680566237_animals-pibig-info-p-ripus-riba-zhivotnie-krasivo-1.jpg",
    location: "Чудское озеро",
  },
  {
    id: 10,
    name: "Плотва",
    lat: 58.0042,
    lng: 31.6699,
    description:
      "Мелкая стайная рыба, часто встречается в прибрежной растительности озера Ильмень.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/ad/Rutilus_rutilus_Prague_Vltava_3.jpg",
    location: "Озеро Ильмень",
  },
  {
    id: 11,
    name: "Треска",
    lat: 68.8,
    lng: 34.8,
    description:
      "Основная промысловая пелагическая рыба, живёт на глубоководных участках Баренцева моря.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cf/Gadus_morhua-Cod-2-Atlanterhavsparken-Norway.JPG",
    location: "Баренцево море",
  },
  {
    id: 12,
    name: "Сельдь",
    lat: 59.4,
    lng: 19.4,
    description:
      "Мигрирующий косяк рыбы, формирует большие скопления в водах Балтийского моря.",
    image:
      "https://thumbs.dreamstime.com/b/%D1%81%D0%B5%D0%BB%D1%8C%D0%B4%D1%8C-%D1%80%D1%8B%D0%B1%D0%B0-%D0%B2%D1%8B%D0%BF%D1%80%D1%8B%D0%B3%D0%B8%D0%B2%D0%B0%D0%B5%D1%82-%D0%B8%D0%B7-%D0%B2%D0%BE%D0%B4%D1%8B-%D0%BE%D0%B1%D1%89%D0%B8%D0%B9-%D0%B2%D1%81%D0%BF%D0%BE%D0%BC%D0%BE%D0%B3%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9-%D0%BE%D0%B1%D1%80%D0%B0%D0%B7-%D0%BE%D0%B1%D1%89%D0%B5%D0%B5-279800366.jpg",
    location: "Балтийское море",
  },
  {
    id: 13,
    name: "Скумбрия",
    lat: 44.1,
    lng: 37.1,
    description:
      "Пелагическая рыба, водится в приповерхностных слоях Чёрного моря.",
    image: "https://wildfauna.ru/wp-content/uploads/2019/08/skymbria-9.jpg",
    location: "Чёрное море",
  },
  {
    id: 14,
    name: "Кефаль",
    lat: 46.7,
    lng: 38.9,
    description:
      "Живёт в мелководных и тёплых заливах Азовского моря, ценится за вкусное мясо.",
    image:
      "https://travelask.ru/system/images/files/001/460/714/wysiwyg_jpg/%D0%9A%D0%B5%D1%84%D0%B0%D0%BB%D1%8C1.jpg?1614952764",
    location: "Азовское море",
  },
  {
    id: 15,
    name: "Белуга",
    lat: 41.7,
    lng: 50.3,
    description:
      "Крупная осетровая рыба, встречается в дельтовых зонах рек, впадающих в Каспийское море.",
    image:
      "https://olimp-fish.ru/wp-content/webp-express/webp-images/uploads/2021/02/%D0%B1%D0%B5%D0%BB%D1%83%D0%B3%D0%B0-%D1%80%D1%8B%D0%B1%D0%B0.jpg.webp",
    location: "Каспийское море",
  },
  {
    id: 16,
    name: "Карп",
    lat: 56.0,
    lng: 37.5,
    description:
      "Популярен среди рыболовов кубковых турниров на берегах Канала имени Москвы.",
    image:
      "https://media.istockphoto.com/id/527524506/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BA%D0%B0%D1%80%D0%BF.jpg?s=612x612&w=0&k=20&c=DjUI-mz3RmZY-innWsJyaDMsTqyvfk5nnfkxho63_fo=",
    location: "Канал имени Москвы",
  },
  {
    id: 17,
    name: "Форель",
    lat: 55.92,
    lng: 37.84,
    description:
      "Искусственно зарыбленный пруд Подмосковья с холодной и чистой водой.",
    image: "https://vniiprh.vniro.ru/upload/iblock/d39/Krymskaya.jpg",
    location: "Пруд Подмосковья",
  },
  {
    id: 18,
    name: "Сиг",
    lat: 61.7833,
    lng: 34.35,
    description:
      "Пруд в Карелии с естественным населением сиговых рыб, впадающих в речку.",
    image: "https://lovlu.ru/uploads/fish/file/306/main_mobile.jpg",
    location: "Пруд Карелии",
  },
  {
    id: 19,
    name: "Окунь",
    lat: 59.85,
    lng: 30.3,
    description:
      "Мелкие и средние экземпляры, охотно берут блесну в прудах Ленинградской области.",
    image: "https://fishmanual.ru/images/2018/11/21/okun.jpg",
    location: "Пруды Ленинградской обл.",
  },
  {
    id: 20,
    name: "Плотва",
    lat: 56.32,
    lng: 43.999,
    description:
      "Стайная рыба, любит мелководье с густой растительностью прудов Нижегородской области.",
    image: "https://silverfish.ucoz.ru/_si/1/84210773.jpg",
    location: "Пруды Нижегородской обл.",
  },
  {
    id: 21,
    name: "Акула",
    lat: 43.6,
    lng: 36.6,
    description:
      "Пелагическая хищная рыба, встречается в приповерхностных слоях Чёрного моря.",
    image:
      "https://img2.fedpress.ru/thumbs/800/2023/07/1793/6bf55329189c8eda438f966e1d517792.jpg",
    location: "Чёрное море",
  },
  {
    id: 22,
    name: "Скат",
    lat: 42.9,
    lng: 36.3,
    description: "Донная рыба из отряда хрящевых, обитает на дне Чёрного моря.",
    image:
      "https://faktodrom.com/i/00006a00wx4z0gw/1ba67ae5179d9afb3872168720ba7a5b.jpg",
    location: "Чёрное море",
  },
  {
    id: 23,
    name: "Камбала",
    lat: 46.7,
    lng: 37.0,
    description: "Плоская донная рыба, широко распространена в Азовском море.",
    image:
      "https://www.balticarium.com/pics/zoom/animals/stornia1-duza_00f15470.jpg",
    location: "Азовское море",
  },
  {
    id: 24,
    name: "Морской окунь",
    lat: 59.6,
    lng: 19.2,
    description:
      "Пелагическая рыба, встречается в приповерхностных слоях Балтийского моря.",
    image:
      "https://fishing-guides-slovenia.b-cdn.net/wp-content/uploads/sea-bass-1.webp",
    location: "Балтийское море",
  },
  {
    id: 25,
    name: "Морской ерш",
    lat: 41.6,
    lng: 50.8,
    description:
      "Колючая донная рыба, обитает в прибрежных зонах Каспийского моря.",
    image: "https://anapacity.com/content/images/morskoy-ersh.jpg",
    location: "Каспийское море",
  },
  {
    id: 26,
    name: "Палтус",
    lat: 69.2,
    lng: 35.2,
    description: "Крупная донная рыба, встречается в глубинах Баренцево моря.",
    image:
      "https://storage.delikateska.ru/f/5/3f644001-58e1-40c7-bd4c-0d2cd44bfc41.jpg",
    location: "Баренцево море",
  },
  {
    id: 27,
    name: "Морской конёк",
    lat: 44.6,
    lng: 37.4,
    description:
      "Небольшая пелагическая рыба с вытянутым телом, встречается в Чёрном море.",
    image:
      "https://news-img.gismeteo.st/ru/2023/09/shutterstock_1438258328-1.jpg",
    location: "Чёрное море",
  },
  {
    id: 28,
    name: "Сардина",
    lat: 43.4,
    lng: 36.9,
    description: "Стая пелагических рыб, мигрирует вдоль берегов Чёрного моря.",
    image: "https://i.ytimg.com/vi/67Yhut4bCwo/maxresdefault.jpg",
    location: "Чёрное море",
  },
  {
    id: 29,
    name: "Морской лещ",
    lat: 59.2,
    lng: 18.7,
    description:
      "Пелагическая рыба семейства лещевых, встречается в Балтийском море.",
    image:
      "https://media.istockphoto.com/id/863843390/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BC%D0%BE%D1%80%D1%81%D0%BA%D0%BE%D0%B9-%D0%BB%D0%B5%D1%89-%D0%B8-%D0%BF%D0%BE%D0%B4%D0%B2%D0%BE%D0%B4%D0%BD%D0%B0%D1%8F-%D0%BF%D0%BE%D0%B2%D0%B5%D1%80%D1%85%D0%BD%D0%BE%D1%81%D1%82%D1%8C.jpg?s=170667a&w=0&k=20&c=NPRwoADw2Gyi1AsfHzIaUQFqT2fFF7NOo8uh_ouFH4g=",
    location: "Балтийское море",
  },
  {
    id: 30,
    name: "Рыба-меч",
    lat: 44.2,
    lng: 36.6,
    description:
      "Пелагическая хищная рыба с продолговатым клювом, обитает в Чёрном море.",
    image: "https://i.ytimg.com/vi/BqTEb7Wxc1E/maxresdefault.jpg",
    location: "Чёрное море",
  },
];
