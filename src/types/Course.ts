
export interface Course {
  id: number;
  title: string;
  description: string;
  short_description: string;
  image?: string;
  enrollment_state: string;
  files: {
    id: number;
    file: string;
    title: string;
  }[];
  tag?: {
    name: string;
    value: string;
  };
   
  progress?: number;
  created_at: string;
  updated_at: string;
}
