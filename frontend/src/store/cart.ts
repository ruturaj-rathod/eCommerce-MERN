import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductRecord } from "@/api/products";
import { CartItem } from "./type";

interface CartState {
  cart: CartItem[];

  // actions
  addToCart: (product: ProductRecord) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;

  // computed values
  cartCount: number;
  cartTotal: number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find((item) => item._id === product._id);

          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        })),

      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item._id === id
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ cart: [] }),

      get cartCount() {
        return get().cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      get cartTotal() {
        return get().cart.reduce(
          (acc, item) => acc + item.price * item.stock,
          0
        );
      },
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);

export default useCartStore;
