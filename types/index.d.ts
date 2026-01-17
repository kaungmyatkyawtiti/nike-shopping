type BadgeTone = "red" | "green" | "orange";

type Gender = "men" | "women" | "unisex";

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  meta?: string | string[];
  gender: Gender;
  sizes: string[];
  colors: string[];
  price: number;
  image: string;
  createdAt: string;
  badge?: { label: string; tone?: BadgeTone };
};

