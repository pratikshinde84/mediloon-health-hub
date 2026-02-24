import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Pill, Baby, User, ArrowRight, Check } from "lucide-react";
import { FadeUp } from "@/components/animations/PageTransition";

const categories = [
  { id: "chronic", label: "Chronic Care", icon: Heart, desc: "Diabetes, BP, etc." },
  { id: "general", label: "General Health", icon: Pill, desc: "Fever, cold, pain" },
  { id: "maternal", label: "Maternal Care", icon: Baby, desc: "Pregnancy, baby care" },
  { id: "elderly", label: "Elderly Care", icon: User, desc: "Senior health needs" },
];

const Onboarding = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <FadeUp className="w-full max-w-lg text-center">
        <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
          <span className="text-primary-foreground font-bold text-2xl">M</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Personalize Your Experience</h1>
        <p className="text-muted-foreground mb-8">Select your health interests for AI-powered recommendations</p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = selected.includes(cat.id);
            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggle(cat.id)}
                className={`relative p-4 rounded-xl border-2 text-left transition-colors ${
                  active ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
                }`}
              >
                {active && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 h-5 w-5 rounded-full gradient-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </motion.div>
                )}
                <Icon className={`h-6 w-6 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
                <p className="text-sm font-semibold text-foreground">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{cat.desc}</p>
              </motion.button>
            );
          })}
        </div>

        <Link to="/dashboard">
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full h-12 rounded-xl gradient-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            Continue <ArrowRight className="h-4 w-4" />
          </motion.button>
        </Link>

        <Link to="/dashboard" className="block mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
          Skip for now
        </Link>
      </FadeUp>
    </div>
  );
};

export default Onboarding;
