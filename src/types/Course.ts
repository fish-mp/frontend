interface File {
  id: number;
  file: string;
  title: string;
}

export interface Course {
  id: 1;
  files: File[];
  enrollment_state: string;
  title: string;
  description: string;
  short_description: string;
}
