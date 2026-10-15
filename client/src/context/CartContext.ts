import { createContext, useContext } from 'react';

export interface CartContextValue {
  /** Ids of services in the cart. */
  items: ReadonlySet<string>;
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
