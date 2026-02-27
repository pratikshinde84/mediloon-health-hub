import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  image?: string;
  description?: string;
}

// no static data any more; we'll pull details from the API
const ProductDetail = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8000/medicines/${id}`);
        if (res.status === 404) {
          setError("Product not found");
          setProduct(null);
        } else if (!res.ok) {
          throw new Error(`Status ${res.status}`);
        } else {
          const data: Product = await res.json();
          setProduct(data);
        }
      } catch (err: any) {
        console.error("failed to load product", err);
        setError(err.message || "unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!product) return <div className="p-10">Product not found</div>;

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