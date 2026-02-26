import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

import { useToast } from "@/hooks/use-toast";

const dummyProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "Cipla",
    price: 35,
    image: "/placeholder.svg",
    description:
      "Paracetamol is used to treat fever and mild to moderate pain.",
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    brand: "Sun Pharma",
    price: 120,
    image: "/placeholder.svg",
    description: "Antibiotic used for bacterial infections.",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const product = dummyProducts.find((p) => p.id === Number(id));

  if (!product) return <div>Product not found</div>;

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={product.image}
            className="w-full max-w-md rounded-xl"
          />

          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-1">{product.brand}</p>

            <p className="text-2xl font-bold mt-4">₹{product.price}</p>

            <p className="mt-4 text-sm text-muted-foreground">
              {product.description}
            </p>

            <div className="flex gap-4 mt-6">
              <button
  onClick={() => {
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
    });

    toast({
      title: "✅ Added to cart",
      description: "Item added to cart successfully",
    });
  }}
  className="px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold"
>
  Add to Cart
</button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleBuyNow}
                className="px-6 py-3 rounded-xl border font-semibold"
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;