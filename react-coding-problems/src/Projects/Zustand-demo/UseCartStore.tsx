import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type CartStore = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  devtools(
    (set) => ({
      cart: [],
      addToCart: (product) =>
        set((state) => ({
          cart: [...state.cart, product],
        })),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((product) => product.id !== productId),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "CartStore" }
  )
);
