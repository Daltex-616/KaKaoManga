import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const existing = get().cartItems.find((i) => i.id === item.id);
        if (existing) {
          set({
            cartItems: get().cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, { ...item, quantity: 1 }],
          });
        }
      },
      removeFromCart: (id) =>
        set({ cartItems: get().cartItems.filter((i) => i.id !== id) }),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);