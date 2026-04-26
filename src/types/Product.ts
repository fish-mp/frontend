export interface Brand {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  parent: number | null;
  parent_name?: string | null;
}

export interface ProductImage {
  id: number;
  image: string;
  image_url?: string;
  is_main: boolean;
}

// Помощник для извлечения названия цвета из строки или объекта
export type ColorValue = string | { id: string; name: string };

export interface Product {
  id: string; // UUID
  name: string;
  sku: string;
  price: number;
  short_description: string;
  brand_name: string;
  brand?: Brand;
  brand_id?: number;
  category?: Category;
  category_id?: number;
  main_image?: ProductImage;
  average_rating: number;
  is_in_stock: boolean;
  is_new?: boolean;
  weight?: number;
  width?: number;
  height?: number;
  length?: number;
  color?: ColorValue;
  category_name?: string;
  reviews_count?: number;
}

export interface ProductDetail extends Product {
  description: string;
  images: ProductImage[];
}


export const getColorName = (color: ColorValue | undefined): string | undefined => {
  if (!color) return undefined;
  return typeof color === 'object' ? color.name : color;
};