export interface Comic {
  id: number;
  title: string;
  description?: string;
  image?: string;
  price?: number;
  onsaleDate?: string;
  creators?: {
    name: string;
    role: string;
  }[];
  characters?: string[];
}
