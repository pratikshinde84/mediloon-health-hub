import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/PageTransition";
import { useOrders } from "@/context/OrderContext";

const Orders = () => {
  const { orders, cancelOrder } = useOrders();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-8">
        <FadeUp>
          <h1 className="text-2xl font-bold text-foreground mb-6">
            Your Orders ({orders.length})
          </h1>
        </FadeUp>

        <StaggerContainer className="space-y-4">
          {orders.map((o) => (
            <StaggerItem key={o.id}>
              <div className="bg-card rounded-xl border border-border p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Order #{o.id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Status: {o.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Total: ₹{o.total_amount}
                    </p>
                  </div>
                  {o.status !== "CANCELLED" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-3 py-1 rounded-lg bg-destructive text-destructive-foreground text-sm"
                      onClick={() => cancelOrder(o.id)}
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
                {o.items.length > 0 && (
                  <div className="mt-3 space-y-1 text-sm">
                    {o.items.map((it) => (
                      <div key={it.id} className="flex justify-between">
                        <span>Item {it.medicine_id.slice(0, 6)}</span>
                        <span>Qty: {it.quantity}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">You have no orders yet.</p>
            </div>
          )}
        </StaggerContainer>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;