export type ProductParamsKey =
  | "keyword"
  | "page"
  | "price[gte]"
  | "price[lte]"
  | "ratings[gte]";

export type ProductParams = {
  [key in ProductParamsKey]?: string | number;
};

export interface ProductImage {
  public_id: string;
  url: string;
  _id: string;
}

export interface ProductReview {
  user: string;
  name: string;
  rating: number;
  comment: string;
  _id: string;
}

export interface ProductRecord {
  _id: string;
  name: string;
  description: string;
  price: number;
  ratings: number;
  images: ProductImage[];
  category: string;
  stock: number;
  numOfReviews: number;
  user: string; // createdBy user
  reviews: ProductReview[];
  createdAt: string;
  __v: number;
}

export interface ProductsRes {
  success: boolean;
  products: ProductRecord[];
  productCount: number;
  resultPerPage: number;
}
