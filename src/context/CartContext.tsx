// import { createContext, useContext, useState, ReactNode } from "react";

// export interface CartItem {
//   id: number;
//   name: string;
//   brand: string;
//   price: number;
//   image: string;
//   qty: number;
// }

// interface CartContextType {
//   items: CartItem[];
//   addToCart: (item: Omit<CartItem, "qty">) => void;
//   removeFromCart: (id: number) => void;
//   updateQty: (id: number, qty: number) => void;
//   clearCart: () => void;
// }

// const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addToCart = (item: Omit<CartItem, "qty">) => {
//     setItems((prev) => {
//       const existing = prev.find((p) => p.id === item.id);
//       if (existing) {
//         return prev.map((p) =>
//           p.id === item.id ? { ...p, qty: p.qty + 1 } : p
//         );
//       }
//       return [...prev, { ...item, qty: 1 }];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setItems((prev) => prev.filter((p) => p.id !== id));
//   };

//   const updateQty = (id: number, qty: number) => {
//     setItems((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, qty } : p))
//     );
//   };

//   const clearCart = () => setItems([]);

//   return (
//     <CartContext.Provider
//       value={{ items, addToCart, removeFromCart, updateQty, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside CartProvider");
//   return ctx;
// };


import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};