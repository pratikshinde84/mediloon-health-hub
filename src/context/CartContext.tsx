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


import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  reloadCart: () => Promise<void>;            // expose manual reload
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // only load cart if user is authenticated
  // during registration there is no token yet, so skip the fetch entirely.
  // caller can invoke `reloadCart` manually once the user has an access token
  // (for example after registration/login or when entering the dashboard).
  const reloadCart = async () => {
    const userEmail = localStorage.getItem("user_email");
    if (!userEmail) {
      console.log("skip cart load: no user email");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/cart", {
        headers: { "user-email": userEmail },
      });
      console.log("Cart fetch response:", res.status);
      if (res.ok) {
        const data = await res.json();
        console.log("Loaded cart:", data);
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.warn("Cart response is not an array", data);
          setItems([]);
        }
      } else {
        console.warn("Cart fetch failed:", res.statusText);
        setItems([]);
      }
    } catch (e) {
      console.error("failed to load cart from server:", e);
      setItems([]);
    }
  };

  // initial load when provider mounts, but only if there's already a token
  useEffect(() => {
    reloadCart();
  }, []);


  const addToCart = async (product: Omit<CartItem, "qty">) => {
    // optimistic update
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    // send to backend
    try {
      const userEmail = localStorage.getItem("user_email");
      const res = await fetch("http://localhost:8000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userEmail && { "user-email": userEmail }),
        },
        body: JSON.stringify({ medicine_id: product.id, quantity: 1 }),
      });
      console.log("Add to cart response:", res.status);
      if (!res.ok) {
        console.warn("Add to cart failed:", res.statusText);
      }
    } catch (e) {
      console.error("failed to add to server cart", e);
    }
  };

  const removeFromCart = async (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    
    try {
      const userEmail = localStorage.getItem("user_email");
      const res = await fetch(`http://localhost:8000/cart/item/${id}`, {
        method: "DELETE",
        headers: {
          ...(userEmail && { "user-email": userEmail }),
        },
      });
      console.log("Remove from cart response:", res.status);
      if (!res.ok) {
        console.warn("Remove from cart failed:", res.statusText);
        await reloadCart();
      }
    } catch (e) {
      console.error("failed to remove from server cart", e);
      await reloadCart();
    }
  };

  const updateQty = async (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );

    try {
      const userEmail = localStorage.getItem("user_email");
      const res = await fetch(`http://localhost:8000/cart/item/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(userEmail && { "user-email": userEmail }),
        },
        body: JSON.stringify({ quantity: qty }),
      });
      console.log("Update qty response:", res.status);
      if (!res.ok) {
        console.warn("Update qty failed:", res.statusText);
        await reloadCart();
      }
    } catch (e) {
      console.error("failed to update qty on server cart", e);
      await reloadCart();
    }
  };

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQty, reloadCart }}
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