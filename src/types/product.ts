
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  subcategory?: string; 
  brand: string;
  imageUrl: string;
  rating: number;
  inStock: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;
}

export interface ProductFilter {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
}
