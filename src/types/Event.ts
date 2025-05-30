export interface EventPhoto {
  id: number;
  image: string;
  description: string;
  created_at: string;
}

export interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  registration_link: string;
  status: "upcoming" | "finished";
  achieved_places?: string;
  photos?: EventPhoto[];
  certificates?: any[];
}
