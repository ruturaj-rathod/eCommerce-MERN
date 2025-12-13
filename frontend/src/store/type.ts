import { ProductRecord } from "@/api/products";

export interface CartItem extends ProductRecord {
  quantity: number;
}
