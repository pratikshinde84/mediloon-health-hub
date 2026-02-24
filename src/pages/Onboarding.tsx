import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    setSelected((prev) => 
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  return (
    <div className="relative h-screen w-full flex items-center justify-center p-4 md:p-6 overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/background_image.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Main Content Card - Fixed height management */}
      <FadeUp className="relative z-10 w-full max-w-md lg:max-w-lg shadow-2xl">
        <div className="bg-background/95 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-[2rem] text-center flex flex-col max-h-[90vh]">
          
          {/* Header Section */}
          <div className="flex-shrink-0">
            <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-foreground font-bold text-2xl">M</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              Personalize Your Experience
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Select your health interests
            </p>
          </div>

          {/* Selection Grid - Scrollable if content exceeds height */}
          <div className="overflow-y-auto px-1 mb-6 custom-scrollbar">
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const active = selected.includes(cat.id);
                return (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggle(cat.id)}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                      active 
                        ? "border-primary bg-primary/10 shadow-sm" 
                        : "border-border bg-card/50 hover:border-primary/30"
                    }`}
                  >
                    {active && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 h-5 w-5 rounded-full gradient-primary flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary-foreground" />
                      </motion.div>
                    )}
                    <Icon className={`h-6 w-6 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="text-sm font-bold text-foreground leading-tight">{cat.label}</p>
                    <p className="text-[11px] text-muted-foreground leading-tight mt-1">{cat.desc}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Footer Section - Fixed at bottom */}
          <div className="flex-shrink-0 space-y-3">
            <Link to="/dashboard" className="block">
              <motion.button 
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.99 }} 
                className="w-full h-12 md:h-14 rounded-xl gradient-primary text-primary-foreground font-bold flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </motion.button>
            </Link>

            <Link 
              to="/dashboard" 
              className="inline-block text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Skip for now
            </Link>
          </div>
        </div>
      </FadeUp>
    </div>
  );
};

export default Onboarding;