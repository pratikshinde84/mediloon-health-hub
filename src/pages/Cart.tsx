import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/animations/PageTransition";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, updateQty, removeFromCart } = useCart();
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-8">
        <FadeUp>
          <h1 className="text-2xl font-bold text-foreground mb-6">Your Cart ({items.length})</h1>
        </FadeUp>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2">
            <StaggerContainer className="space-y-3">
              {items.map((item) => (
                <StaggerItem key={item.id}>
                  <div className="bg-card rounded-xl border border-border p-4 flex gap-4 items-center">
                    <div className="h-16 w-16 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
                      <img src={item.image} alt={item.name} className="h-12 w-12 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                      <p className="text-sm font-bold text-foreground mt-1">₹{item.price * item.qty}</p>
                    </div>
                    <QuantityStepper value={item.qty} onChange={(v) => updateQty(item.id, v)} />
                    <button onClick={() => removeFromCart(item.id)} className="p-2 rounded-lg hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </StaggerItem>
              ))}
              {items.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Your cart is empty</p>
                  <Link to="/dashboard" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">Browse medicines</Link>
                </div>
              )}
            </StaggerContainer>
          </div>

          {/* Summary */}
          <FadeUp delay={0.2}>
            <div className="bg-card rounded-xl border border-border p-5 h-fit sticky top-20">
              <h3 className="text-base font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span className="text-green-600 font-medium">FREE</span></div>
                <div className="border-t border-border pt-2 flex justify-between text-foreground font-bold"><span>Total</span><span>₹{subtotal}</span></div>
              </div>
              <Link to="/checkout">
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full h-11 mt-5 rounded-lg gradient-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" disabled={items.length === 0}>
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
