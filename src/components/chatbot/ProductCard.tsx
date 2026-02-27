import { Product } from '@/types/chatbot';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
    onOrder: (product: Product) => void;
}

export function ProductCard({ product, onOrder }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-2"
        >
            <Card className="w-[280px] overflow-hidden border-primary/20 bg-background/95 backdrop-blur shadow-sm">
                <div className="h-32 w-full overflow-hidden relative bg-white flex items-center justify-center p-2">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full object-contain"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                    )}
                    <Badge className="absolute top-2 right-2 bg-background/90 text-foreground backdrop-blur-md shadow-sm z-10 font-bold border-primary/20">
                        ${product.price}
                    </Badge>
                </div>

                <CardHeader className="p-3 pb-1">
                    <CardTitle className="text-sm font-bold leading-tight line-clamp-1">
                        {product.name}
                    </CardTitle>
                    <div className="text-[10px] uppercase font-semibold text-primary/80 mt-0.5">
                        {product.manufacturer} • {product.generic}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-start gap-1 mt-1.5">
                        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/50" />
                        <span className="line-clamp-2 leading-snug">{product.description}</span>
                    </div>
                </CardHeader>

                <CardContent className="p-3 py-2">
                    <div className="bg-primary/5 rounded-md p-2 text-xs border border-primary/10">
                        <span className="font-semibold text-primary block mb-1">Dosage Summary:</span>
                        {product.dosage}
                    </div>
                    <div className="mt-2 text-[10px] font-medium flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${product.stock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className={product.stock ? 'text-emerald-700' : 'text-red-700'}>
                            {product.stock ? 'In Stock - Fast Delivery' : 'Out of Stock'}
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="p-3 pt-0 flex gap-2">
                    <motion.div
                        className="w-1/2"
                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <Button
                            variant="outline"
                            className="w-full h-8 text-xs font-semibold"
                            onClick={() => onOrder(product)}
                            disabled={!product.stock}
                        >
                            Add to Cart
                        </Button>
                    </motion.div>
                    <motion.div
                        className="w-1/2"
                        whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <Button
                            className="w-full h-8 text-xs font-semibold gradient-primary text-white border-0 shadow-sm"
                            onClick={() => onOrder(product)}
                            disabled={!product.stock}
                        >
                            Buy Now
                        </Button>
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
