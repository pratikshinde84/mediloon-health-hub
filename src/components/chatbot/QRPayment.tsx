import { useState } from 'react';
import { Product, OrderDetails } from '@/types/chatbot';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, QrCode } from 'lucide-react';

interface QRPaymentProps {
    product: Product;
    orderDetails: OrderDetails;
    onComplete: () => void;
}

export function QRPayment({ product, orderDetails, onComplete }: QRPaymentProps) {
    const [isSuccess, setIsSuccess] = useState(false);

    const handleComplete = () => {
        setIsSuccess(true);
        setTimeout(() => {
            onComplete();
        }, 2000);
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="flex flex-col h-full bg-background items-center justify-center p-6 text-center"
            >
                <div className="bg-emerald-600 rounded-xl p-6 text-center shadow-lg">
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 0.5 }}
                        className="text-6xl mb-4 flex justify-center"
                    >
                        ✅
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white font-semibold text-lg"
                    >
                        Payment Successful!
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-sm text-emerald-200 mt-2"
                    >
                        Order confirmed • Tracking ID: ORD{Math.floor(Math.random() * 10000)}
                    </motion.p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ scale: 0.8, rotateY: 90 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full bg-background items-center justify-center p-6 text-center"
        >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary shrink-0">
                <QrCode className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold mb-2">Scan to Pay</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-[250px]">
                Complete payment of <strong className="text-foreground">₹{product.price}</strong> for {product.name}
            </p>

            {/* Mock QR Code */}
            <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="bg-white p-4 rounded-xl shadow-card border border-border/50 mb-4"
            >
                <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UPI://pay?pa=mediloon@upi&pn=Mediloon&am=${product.price}&cu=INR`}
                    alt="Payment QR Code"
                    className="w-[150px] h-[150px] object-contain"
                />
            </motion.div>

            <div className="flex gap-2 justify-center mb-6 flex-wrap w-full">
                {['📱 GPay', '📲 PhonePe', '💳 Paytm'].map((method, i) => (
                    <motion.div
                        key={method}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-3 py-2 bg-muted rounded-lg cursor-pointer text-sm font-medium border border-border"
                    >
                        {method}
                    </motion.div>
                ))}
            </div>

            <Button
                className="w-full gradient-primary shadow-card-hover border-0 text-white gap-2 h-12 shrink-0 mt-auto"
                onClick={handleComplete}
            >
                <CheckCircle2 className="w-5 h-5" />
                I have paid ₹{product.price}
            </Button>
        </motion.div>
    );
}
