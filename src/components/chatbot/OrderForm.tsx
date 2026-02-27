import { useState } from 'react';
import { OrderDetails, Product } from '@/types/chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface OrderFormProps {
    product: Product;
    onSubmit: (details: OrderDetails) => void;
    onCancel: () => void;
}

export function OrderForm({ product, onSubmit, onCancel }: OrderFormProps) {
    const [details, setDetails] = useState<OrderDetails>({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!details.name || !details.email || !details.address || !details.phone || !details.city || !details.zip) return;
        onSubmit(details);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="flex flex-col h-full bg-background relative"
        >
            <div className="flex items-center gap-2 border-b p-4 bg-muted/30">
                <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8 rounded-full">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium text-sm">Delivery Details</h3>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-6 flex items-start gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded bg-background object-cover" />
                    <div>
                        <p className="font-semibold text-sm">{product.name}</p>
                        <p className="text-sm font-bold text-primary">₹{product.price}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-2">
                        <Label htmlFor="name" className="text-xs">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            value={details.name}
                            onChange={(e) => setDetails({ ...details, name: e.target.value })}
                            required
                            className="h-9 text-sm"
                        />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-2">
                        <Label htmlFor="email" className="text-xs">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={details.email}
                            onChange={(e) => setDetails({ ...details, email: e.target.value })}
                            required
                            className="h-9 text-sm"
                        />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-2">
                        <Label htmlFor="phone" className="text-xs">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={details.phone}
                            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                            required
                            className="h-9 text-sm"
                        />
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
                        <Label htmlFor="address" className="text-xs">Delivery Address</Label>
                        <textarea
                            id="address"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                            placeholder="Full address for delivery"
                            value={details.address}
                            onChange={(e) => setDetails({ ...details, address: e.target.value })}
                            required
                        />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-xs">City</Label>
                            <Input
                                id="city"
                                placeholder="Mumbai"
                                value={details.city}
                                onChange={(e) => setDetails({ ...details, city: e.target.value })}
                                required
                                className="h-9 text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip" className="text-xs">ZIP / PIN Code</Label>
                            <Input
                                id="zip"
                                placeholder="400001"
                                value={details.zip}
                                onChange={(e) => setDetails({ ...details, zip: e.target.value })}
                                required
                                className="h-9 text-sm"
                            />
                        </div>
                    </motion.div>
                </form>
            </div>

            <div className="p-4 border-t bg-background mt-auto">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                        boxShadow: ["0px 0px 0px rgba(16,185,129,0.4)", "0px 0px 15px rgba(16,185,129,0.8)", "0px 0px 0px rgba(16,185,129,0.4)"]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-card-hover border-0 text-white gap-2 h-11"
                        onClick={handleSubmit}
                        disabled={!details.name || !details.email || !details.address || !details.phone || !details.city || !details.zip}
                    >
                        <CheckCircle2 className="w-4 h-4" />
                        Proceed to Payment
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    );
}
