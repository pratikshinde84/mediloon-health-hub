import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface OrderItem {
  id: string;
  order_id: string;
  medicine_id: string;
  quantity: number;
  price_at_time: number;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_status: string;
  items: OrderItem[];
}

interface OrderContextType {
  orders: Order[];
  reloadOrders: () => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const reloadOrders = async () => {
    const userEmail = localStorage.getItem("user_email");
    if (!userEmail) return;

    try {
      const res = await fetch("http://localhost:8000/orders", {
        headers: { "user-email": userEmail },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setOrders(data);
      } else {
        console.warn("Failed to load orders", res.statusText);
        setOrders([]);
      }
    } catch (e) {
      console.error("Error fetching orders", e);
      setOrders([]);
    }
  };

  useEffect(() => {
    reloadOrders();
  }, []);

  const cancelOrder = async (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "CANCELLED" } : o))
    );
    try {
      const userEmail = localStorage.getItem("user_email");
      const res = await fetch(`http://localhost:8000/orders/${id}/cancel`, {
        method: "PUT",
        headers: {
          ...(userEmail && { "user-email": userEmail }),
        },
      });
      if (!res.ok) {
        console.warn("Cancel order failed", res.statusText);
        await reloadOrders();
      }
    } catch (e) {
      console.error("Error cancelling order", e);
      await reloadOrders();
    }
  };

  return (
    <OrderContext.Provider value={{ orders, reloadOrders, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};
