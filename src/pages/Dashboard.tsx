
// const Dashboard = () => {
// const [aiMedicine, setAiMedicine] = useState<string | null>(null);
//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       <Navbar />

//       <main className="flex-1">
//         {/* ================= HERO ================= */}
//         <section className="relative overflow-hidden bg-gradient-to-r from-[#E53935] to-[#FF7A00]">
//           <div className="absolute inset-0 opacity-20 bg-[url('/wave-pattern.png')] bg-cover bg-center pointer-events-none" />

//           <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
//             {/* LEFT */}
//             <FadeUp>
//               <div className="text-white space-y-6">
//                 <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
//                   ✨ AI-Powered Pharmacy
//                 </div>

//                 <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//                   YOUR HEALTH — OUR
//                   <span className="block">COMMITMENT</span>
//                 </h1>

//                 <p className="text-white/90 max-w-xl text-lg">
//                   Trust in German pharmacy quality with fast delivery.
//                   Over 50,000 health products from medicines to dietary
//                   supplements — discreet, safe and fairly priced.
//                 </p>

//                 <div className="flex flex-wrap gap-4 pt-2">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-white text-[#E53935] px-6 py-3 rounded-xl font-bold shadow-lg"
//                   >
//                     🛒 Shop now
//                   </motion.button>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="border border-white/40 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
//                   >
//                     Upload Prescription
//                   </motion.button>
//                 </div>
//               </div>
//             </FadeUp>

//             {/* RIGHT IMAGE */}
//             <FadeUp delay={0.2}>
//               <div className="relative flex justify-center lg:justify-end">
//                 <img
//                   src="/doctor.png"
//                   alt="Doctor"
//                   className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
//                 />
//               </div>
//             </FadeUp>
//           </div>
//         </section>

//         {/* ================= TRUST BAR ================= */}
//         <section className="border-b border-border bg-card">
//           <div className="container py-4">
//             <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-xs md:text-sm text-muted-foreground">
//               {[
//                 { icon: Shield, text: "100% Genuine Medicines" },
//                 { icon: Clock, text: "30-Min Express Delivery" },
//                 { icon: TrendingUp, text: "Best Price Guaranteed" },
//                 { icon: Sparkles, text: "AI Health Insights" },
//               ].map(({ icon: Icon, text }) => (
//                 <div key={text} className="flex items-center gap-2">
//                   <Icon className="h-4 w-4 text-primary" />
//                   <span className="font-medium">{text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ================= AI RESULT SPLIT ================= */}
//         {aiMedicine && (
//           <section className="container py-10">
//             <div className="grid lg:grid-cols-2 gap-6 items-start">
//               {/* LEFT */}
//               <motion.div
//                 initial={{ opacity: 0, x: -40 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="bg-card rounded-2xl p-6 shadow-card"
//               >
//                 <TypingInfo medicine={aiMedicine} />
//               </motion.div>

//               {/* RIGHT */}
//               <motion.div
//                 initial={{ opacity: 0, x: 40 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="space-y-4"
//               >
//                 <h3 className="text-xl font-bold">
//                   Best matches for "{aiMedicine}"
//                 </h3>

//                 <div className="grid grid-cols-2 gap-4">
//                   {products
//                     .filter((p) =>
//                       p.name
//                         ?.toLowerCase()
//                         .includes(aiMedicine.toLowerCase())
//                     )
//                     .slice(0, 4)
//                     .map((product, i) => (
//                       <ProductCard
//                         key={i}
//                         {...product}
//                         onAddToCart={() => {}}
//                       />
//                     ))}
//                 </div>
//               </motion.div>
//             </div>
//           </section>
//         )}

//         {/* ================= PRODUCTS ================= */}
//         <section className="container py-10">
//           <FadeUp>
//             <div className="flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-xl md:text-2xl font-bold text-foreground">
//                   Recommended for You
//                 </h2>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   Personalized by AI based on your health profile
//                 </p>
//               </div>
//             </div>
//           </FadeUp>

//           <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {products.map((product, i) => (
//               <StaggerItem key={i}>
//                 <ProductCard
//                   {...product}
//                   onAddToCart={() => {}}
//                 />
//               </StaggerItem>
//             ))}
//           </StaggerContainer>
//         </section>
//       </main>

//       <Footer />

//       {/* ✅ AI CHATBOT */}
//       <AIChatbot onMedicineFound={setAiMedicine} />
//     </div>
//   );
// };

// export default Dashboard;



import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Clock, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import { useState, useEffect } from "react";
import TypingInfo from "@/components/ai/TypingInfo";
import AIChatbot from "@/components/ai/AIChatbot";

import {
  StaggerContainer,
  StaggerItem,
  FadeUp,
} from "@/components/animations/PageTransition";

import { useCart } from "@/context/CartContext"; // ✅ IMPORTANT

// fetch products from backend instead of using static data

interface Product {
  id: string; // UUID from backend
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  aiRecommended?: boolean;
  refillSoon?: boolean;
  description?: string; // for detail view
}

// stateful collection of products, loaded from API
// the initial value is an empty array; `useEffect` below will populate it.
const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  // load products from local backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/medicines");
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        console.error("failed to load products", err);
        setProductError(err.message || "unknown error");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const [aiMedicine, setAiMedicine] = useState<string | null>(null);
  const { addToCart } = useCart(); // ✅ real cart

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#E53935] to-[#FF7A00]">
          <div className="absolute inset-0 opacity-20 bg-[url('/wave-pattern.png')] bg-cover bg-center pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div className="text-white space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ AI-Powered Pharmacy
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                  YOUR HEALTH — OUR
                  <span className="block">COMMITMENT</span>
                </h1>

                <p className="text-white/90 max-w-xl text-lg">
                  Trust in German pharmacy quality with fast delivery.
                  Over 50,000 health products from medicines to dietary
                  supplements — discreet, safe and fairly priced.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative flex justify-center lg:justify-end">
                <img
                  src="/doctor.png"
                  alt="Doctor"
                  className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
                />
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ================= TRUST BAR ================= */}
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

        {/* ================= AI RESULT ================= */}
        {aiMedicine && (
          <section className="container py-10">
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-2xl p-6 shadow-card"
              >
                <TypingInfo medicine={aiMedicine} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold">
                  Best matches for "{aiMedicine}"
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {products
                    .filter((p) =>
                      p.name
                        .toLowerCase()
                        .includes(aiMedicine.toLowerCase())
                    )
                    .slice(0, 4)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        onAddToCart={() => addToCart({
                          id: product.id,
                          name: product.name,
                          brand: product.brand || "",
                          price: product.price,
                          image: product.image || "",
                        })}
                      />
                    ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* ================= PRODUCTS ================= */}
        <section className="container py-10">
          <FadeUp>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Recommended for You
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Personalized by AI based on your health profile
                </p>
              </div>
            </div>
          </FadeUp>

          {loadingProducts && <p className="text-center">Loading products…</p>}
          {productError && <p className="text-center text-red-500">Error: {productError}</p>}
          {!loadingProducts && !productError && (
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard
                    {...product}
                    onAddToCart={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        brand: product.brand || "",
                        price: product.price,
                        image: product.image || "",
                      })
                    }
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </section>
      </main>

      <Footer />

      {/* ✅ AI CHATBOT */}
      <AIChatbot onMedicineFound={setAiMedicine} />
    </div>
  );
};

export default Dashboard;