// import { motion } from "framer-motion";
// import { ShoppingCart, Sparkles } from "lucide-react";

// interface ProductCardProps {
//   name: string;
//   brand: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   aiRecommended?: boolean;
//   refillSoon?: boolean;
//   onAddToCart?: () => void;
// }

// const ProductCard = ({
//   name,
//   brand,
//   price,
//   originalPrice,
//   image,
//   aiRecommended,
//   refillSoon,
//   onAddToCart,
// }: ProductCardProps) => {
//   const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.2 }}
//       className="group relative bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-shadow overflow-hidden"
//     >
//       {/* Badges */}
//       <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
//         {aiRecommended && (
//           <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full gradient-primary text-primary-foreground animate-pulse_badge">
//             <Sparkles className="h-3 w-3" /> AI Pick
//           </span>
//         )}
//         {refillSoon && (
//           <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-accent text-accent-foreground">
//             Refill Soon
//           </span>
//         )}
//         {discount > 0 && (
//           <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary">
//             {discount}% OFF
//           </span>
//         )}
//       </div>

//       {/* Image */}
//       <div className="aspect-square bg-secondary/50 flex items-center justify-center p-6 overflow-hidden">
//         <motion.img
//           src={image}
//           alt={name}
//           className="h-full w-full object-contain"
//           whileHover={{ scale: 1.08 }}
//           transition={{ duration: 0.3 }}
//         />
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <p className="text-xs text-muted-foreground mb-1">{brand}</p>
//         <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2">{name}</h3>
//         <div className="flex items-center justify-between">
//           <div className="flex items-baseline gap-1.5">
//             <span className="text-lg font-bold text-foreground">₹{price}</span>
//             {originalPrice && (
//               <span className="text-xs text-muted-foreground line-through">₹{originalPrice}</span>
//             )}
//           </div>
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={onAddToCart}
//             className="p-2 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
//           >
//             <ShoppingCart className="h-4 w-4" />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductCard;



// import { motion } from "framer-motion";
// import { ShoppingCart, Sparkles } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// interface ProductCardProps {
//   id: number; // 🔥 required for navigation
//   name: string;
//   brand: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   aiRecommended?: boolean;
//   refillSoon?: boolean;
//   onAddToCart?: () => void;
// }

// const ProductCard = ({
//   id,
//   name,
//   brand,
//   price,
//   originalPrice,
//   image,
//   aiRecommended,
//   refillSoon,
//   onAddToCart,
// }: ProductCardProps) => {
//   const navigate = useNavigate();

//   const discount = originalPrice
//     ? Math.round(((originalPrice - price) / originalPrice) * 100)
//     : 0;

//   const handleCardClick = () => {
//     navigate(`/product/${id}`);
//   };

//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.2 }}
//       onClick={handleCardClick}
//       className="group relative bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-shadow overflow-hidden cursor-pointer"
//     >
//       {/* Badges */}
//       <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
//         {aiRecommended && (
//           <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full gradient-primary text-primary-foreground animate-pulse_badge">
//             <Sparkles className="h-3 w-3" /> AI Pick
//           </span>
//         )}

//         {refillSoon && (
//           <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-accent text-accent-foreground">
//             Refill Soon
//           </span>
//         )}

//         {discount > 0 && (
//           <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary">
//             {discount}% OFF
//           </span>
//         )}
//       </div>

//       {/* Image */}
//       <div className="aspect-square bg-secondary/50 flex items-center justify-center p-6 overflow-hidden">
//         <motion.img
//           src={image}
//           alt={name}
//           className="h-full w-full object-contain"
//           whileHover={{ scale: 1.08 }}
//           transition={{ duration: 0.3 }}
//         />
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <p className="text-xs text-muted-foreground mb-1">
//           {brand}
//         </p>

//         <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2">
//           {name}
//         </h3>

//         <div className="flex items-center justify-between">
//           <div className="flex items-baseline gap-1.5">
//             <span className="text-lg font-bold text-foreground">
//               ₹{price}
//             </span>

//             {originalPrice && (
//               <span className="text-xs text-muted-foreground line-through">
//                 ₹{originalPrice}
//               </span>
//             )}
//           </div>

//           {/* 🔥 STOP PROPAGATION so cart button does not open detail page */}
//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               onAddToCart?.();
//             }}
//             className="p-2 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
//           >
//             <ShoppingCart className="h-4 w-4" />
//           </motion.button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductCard;



import { motion } from "framer-motion";
import { ShoppingCart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  aiRecommended?: boolean;
  refillSoon?: boolean;
  onAddToCart?: () => void;
}

const ProductCard = ({
  id,
  name,
  brand,
  price,
  originalPrice,
  image,
  aiRecommended,
  refillSoon,
  onAddToCart,
}: ProductCardProps) => {
  const navigate = useNavigate();

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className="group relative bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-shadow overflow-hidden cursor-pointer"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {aiRecommended && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full gradient-primary text-primary-foreground">
            <Sparkles className="h-3 w-3" />
            AI Pick
          </span>
        )}

        {refillSoon && (
          <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full bg-accent text-accent-foreground">
            Refill Soon
          </span>
        )}

        {discount > 0 && (
          <span className="inline-flex px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary/10 text-primary">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Image */}
      <div className="aspect-square bg-secondary/50 flex items-center justify-center p-6 overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="h-full w-full object-contain"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{brand}</p>

        <h3 className="text-sm font-semibold text-foreground leading-tight mb-2 line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-foreground">
              ₹{price}
            </span>

            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>

          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation
              onAddToCart?.();
            }}
            className="p-2 rounded-lg gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;