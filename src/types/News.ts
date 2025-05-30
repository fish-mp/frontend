export interface NewsPhoto {
  id: number;
  image: string;
  description: string;
  created_at: string;
}

export interface NewsItem {
  id: number;
  title: string;
  text: string;
  created_at: string;
  updated_at: string;
  photos?: NewsPhoto[];
}
