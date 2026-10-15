import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { CartContext } from '../../context/CartContext';

/** In-memory cart. Swap for the cart API once it exists. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ReadonlySet<string>>(() => new Set());

  const toggle = useCallback((id: string) => {
    setItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ items, count: items.size, has: (id: string) => items.has(id), toggle }),
    [items, toggle],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
