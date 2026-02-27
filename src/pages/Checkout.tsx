import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CreditCard, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Modal from "@/components/ui/Modal";
import { FadeUp } from "@/components/animations/PageTransition";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";

const Checkout = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const { items, reloadCart } = useCart();
  const { reloadOrders } = useOrders();

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  const handlePay = async () => {
    // fire off order creation
    try {
      const userEmail = localStorage.getItem("user_email");
      const res = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(userEmail && { "user-email": userEmail }),
        },
        body: JSON.stringify({
          items: items.map((it) => ({ medicine_id: it.id, quantity: it.qty })),
        }),
      });
      if (res.ok) {
        await reloadOrders();
        await reloadCart();
        setShowSuccess(true);
      } else {
        console.warn("order creation failed", res.statusText);
      }
    } catch (e) {
      console.error("failed to create order", e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-8 max-w-2xl">
        <FadeUp>
          <h1 className="text-2xl font-bold text-foreground mb-6">Checkout</h1>

          {/* Address */}
          <div className="bg-card rounded-xl border border-border p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Delivery Address</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input placeholder="Full Name" className="h-11 px-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
              <input placeholder="Phone Number" className="h-11 px-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
              <input placeholder="Address Line 1" className="h-11 px-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 md:col-span-2" />
              <input placeholder="City" className="h-11 px-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
              <input placeholder="PIN Code" className="h-11 px-4 rounded-lg border border-input bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-xl border border-border p-5 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Payment</h3>
            </div>
            <div className="space-y-2">
              {["Razorpay (UPI / Card / Wallet)", "Cash on Delivery"].map((opt, i) => (
                <label key={opt} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${i === 0 ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                  <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${i === 0 ? "border-primary" : "border-border"}`}>
                    {i === 0 && <div className="h-2 w-2 rounded-full gradient-primary" />}
                  </div>
                  <span className="text-sm font-medium text-foreground">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl border border-border p-5 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Items (3)</span><span>₹435</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span className="text-green-600 font-medium">FREE</span></div>
              <div className="border-t border-border pt-2 flex justify-between text-foreground font-bold text-base"><span>Total</span><span>₹435</span></div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePay}
            className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            disabled={items.length === 0}
          >
            Pay ₹{subtotal}
          </motion.button>
        </FadeUp>
      </main>
      <Footer />

      {/* Success Modal */}
      <Modal open={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="text-center py-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-20 w-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground animate-bounce-check" />
          </motion.div>
          <h3 className="text-xl font-bold text-foreground mb-2">Order Placed!</h3>
          <p className="text-sm text-muted-foreground mb-1">Your order #MED-2026-4821 has been confirmed.</p>
          <p className="text-xs text-muted-foreground mb-6">Estimated delivery: 30 minutes</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowSuccess(false)}
            className="px-8 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold"
          >
            Done
          </motion.button>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
