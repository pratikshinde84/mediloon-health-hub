import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Clock, Shield, Bot } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import AIBadge from "@/components/ui/AIBadge";
import { StaggerContainer, StaggerItem, FadeUp } from "@/components/animations/PageTransition";

const products = [
  { name: "Paracetamol 500mg", brand: "Cipla", price: 35, originalPrice: 50, image: "/placeholder.svg", aiRecommended: true },
  { name: "Amoxicillin 250mg", brand: "Sun Pharma", price: 120, originalPrice: 150, image: "/placeholder.svg", refillSoon: true },
  { name: "Vitamin D3 Drops", brand: "HealthVit", price: 280, image: "/placeholder.svg", aiRecommended: true },
  { name: "Cetirizine 10mg", brand: "Dr. Reddy's", price: 45, originalPrice: 65, image: "/placeholder.svg" },
  { name: "Metformin 500mg", brand: "USV", price: 85, originalPrice: 110, image: "/placeholder.svg", refillSoon: true },
  { name: "Azithromycin 500mg", brand: "Alkem", price: 195, image: "/placeholder.svg" },
  { name: "Calcium + D3 Tabs", brand: "Shelcal", price: 320, originalPrice: 380, image: "/placeholder.svg", aiRecommended: true },
  { name: "Omeprazole 20mg", brand: "Mankind", price: 65, image: "/placeholder.svg" },
];

const Dashboard = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar />

    <main className="flex-1">
      {/* Hero Banner */}
      {/* <section className="relative overflow-hidden">
        <div className="gradient-wave py-16 md:py-20 lg:py-24">
          <div className="absolute inset-0 opacity-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-primary-foreground/10" style={{ width: `${100 + i * 60}px`, height: `${100 + i * 60}px`, top: `${Math.random() * 80}%`, left: `${Math.random() * 80}%` }} />
            ))}
          </div>
          <div className="container relative z-10">
            <FadeUp>
              <div className="max-w-2xl">
                <AIBadge label="AI-Powered Pharmacy" />
                <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mt-4 mb-4 leading-tight">
                  Your Health, <br />Intelligently Managed
                </h1>
                <p className="text-primary-foreground/80 text-base md:text-lg mb-6 max-w-lg">
                  Get AI-recommended medicines, smart refill alerts, and personalized health insights—all delivered to your door.
                </p>
                <div className="flex flex-wrap gap-3">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-6 py-3 rounded-xl bg-primary-foreground text-primary font-semibold text-sm hover:bg-primary-foreground/90 transition-colors">
                    Browse Medicines
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="px-6 py-3 rounded-xl border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-colors">
                    Upload Prescription
                  </motion.button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section> */}

      {/* === DASHBOARD HERO SECTION === */}
<section className="relative overflow-hidden bg-gradient-to-r from-[#E53935] to-[#FF7A00]">
  {/* background pattern */}
  <div className="absolute inset-0 opacity-20 bg-[url('/wave-pattern.png')] bg-cover bg-center pointer-events-none" />

  <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div className="text-white space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">

      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
        ✨ AI-Powered Pharmacy
      </div>

      <h1 className="text-4xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
        YOUR HEALTH — OUR  
        <span className="block">COMMITMENT</span>
      </h1>

      <p className="text-white/90 max-w-xl text-lg">
        Trust in German pharmacy quality with fast delivery. 
        Over 50,000 health products from medicines to dietary 
        supplements — discreet, safe and fairly priced.
      </p>

      <div className="flex flex-wrap gap-4 pt-4">
        <button className="bg-white text-[#E53935] px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
          🛒 Shop now
        </button>

        <button className="border border-white/40 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all">
          Upload Prescription
        </button>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    
    <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-700">

      <img
        src="/doctor.png"
        alt="Doctor"
        className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
      />

    </div>
  </div>
</section>

      {/* Trust Bar */}
      <section className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-xs md:text-sm text-muted-foreground">
            {[
              { icon: Shield, text: "100% Genuine Medicines" },
              { icon: Clock, text: "30-Min Express Delivery" },
              { icon: TrendingUp, text: "Best Price Guaranteed" },
              { icon: Sparkles, text: "AI Health Insights" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Insight Banner */}
      <section className="container mt-8">
        <FadeUp delay={0.1}>
          <div className="rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 p-4 md:p-5 flex items-start gap-3">
            <div className="p-2 rounded-lg gradient-primary shrink-0 mt-0.5">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">AI Health Insight</p>
              <p className="text-xs text-muted-foreground mt-0.5">Based on your profile, it might be time to refill your Vitamin D3 supplements. Seasonal changes affect vitamin levels.</p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Products Grid */}
      <section className="container py-10">
        <FadeUp>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Recommended for You</h2>
              <p className="text-sm text-muted-foreground mt-1">Personalized by AI based on your health profile</p>
            </div>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <StaggerItem key={i}>
              <ProductCard {...product} onAddToCart={() => {}} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </main>

    <Footer />

    {/* Floating AI Assistant */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full gradient-primary shadow-elevated flex items-center justify-center z-40"
    >
      <Bot className="h-6 w-6 text-primary-foreground" />
    </motion.button>
  </div>
);

export default Dashboard;
