import { useState, useEffect } from 'react';
import { useChatbotContext } from './ChatbotContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, FileText, ArrowLeft, Info } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { OrderForm } from './OrderForm';
import { QRPayment } from './QRPayment';
import { Message, Product } from '@/types/chatbot';

export function LeftAIPanel() {
    const {
        messages,
        handleOrderNow,
        currentState,
        selectedProduct,
        submitOrder,
        orderDetails,
        completePayment
    } = useChatbotContext();

    return (
        <div className="h-full flex flex-col bg-slate-50 relative overflow-hidden">
            {/* Header */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p-4 border-b border-slate-200 bg-white shrink-0 z-20 flex items-center gap-3"
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md relative"
                >
                    <Bot className="w-6 h-6" />
                </motion.div>
                <div>
                    <h2 className="text-[15px] font-bold text-slate-800 leading-tight">AI Pharmacy Assistant</h2>
                    <p className="text-[12px] text-slate-500 flex items-center gap-1.5 mt-0.5 font-medium">
                        <motion.span
                            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block"
                        />
                        Online and ready to help
                    </p>
                </div>
            </motion.div>

            {/* Dynamic Content Area */}
            <div className="flex-1 relative overflow-y-auto custom-scrollbar h-full">
                <AnimatePresence mode="wait">
                    {currentState === 'chat' && (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="absolute inset-0 overflow-y-auto pb-20 p-6 space-y-6 custom-scrollbar h-full"
                        >
                            {messages.filter(m => m.sender === 'bot').map((msg, idx) => (
                                <BotMessage key={msg.id} msg={msg} idx={idx} onOrder={handleOrderNow} />
                            ))}
                            <div className="h-4" />
                        </motion.div>
                    )}

                    {currentState === 'orderForm' && selectedProduct && (
                        <motion.div
                            key="order"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm z-30"
                        >
                            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col h-[90%] overflow-hidden">
                                <OrderForm
                                    product={selectedProduct}
                                    onSubmit={submitOrder}
                                    onCancel={() => handleOrderNow(selectedProduct)}
                                />
                            </div>
                        </motion.div>
                    )}

                    {currentState === 'qrPayment' && selectedProduct && orderDetails && (
                        <motion.div
                            key="payment"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute inset-0 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm z-30"
                        >
                            <div className="w-full max-w-md bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden">
                                <QRPayment
                                    product={selectedProduct}
                                    orderDetails={orderDetails}
                                    onComplete={completePayment}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function BotMessage({ msg, idx, onOrder }: { msg: Message, idx: number, onOrder: any }) {
    if (msg.isTyping) {
        return (
            <div className="flex gap-3 max-w-[90%]">
                <div className="shrink-0 pt-1">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200 text-orange-500 shadow-sm">
                        <Bot className="w-4 h-4" />
                    </div>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-slate-100 mt-1">
                    <div className="flex gap-1.5 items-center h-4 w-10 text-orange-500 justify-center">
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-orange-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} />
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-orange-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }} />
                        <motion.div className="w-1.5 h-1.5 rounded-full bg-orange-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }} />
                    </div>
                </div>
            </div>
        );
    }

    const lines = msg.text.split('\n').filter(l => l.trim() !== '');
    const mainText = lines[0];
    const bulletPoints = lines.slice(1).filter(l => l.startsWith('•')).map(l => l.replace('•', '').trim());

    // Slight delay for non-initial messages to simulate thinking after text appears slightly
    const entryDelay = idx === 0 ? 0.3 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: entryDelay, duration: 0.4 }}
            className="w-full flex gap-3"
        >
            <div className="shrink-0 pt-1">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200 text-orange-500 shadow-sm">
                    <Bot className="w-4 h-4" />
                </div>
            </div>

            <div className="w-full max-w-[90%]">
                <motion.div
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-slate-100"
                >
                    {bulletPoints.length > 0 ? (
                        <>
                            <TypewriterText
                                text={mainText}
                                speed={idx === 0 ? 0 : 25}
                                className="text-slate-700 leading-relaxed text-[15px] mb-4 block"
                            />
                            <motion.ul className="space-y-2 ml-4">
                                {bulletPoints.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={idx === 0 ? {} : { opacity: 0, x: -10 }}
                                        animate={idx === 0 ? {} : { opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 + (mainText.length * 0.025) }}
                                        whileHover={{ x: 5, color: "#f97316" }} // orange-500
                                        className="text-slate-600 flex items-center gap-2 text-[14px]"
                                    >
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                            className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0"
                                        />
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </>
                    ) : (
                        <TypewriterText
                            text={msg.text}
                            speed={idx === 0 ? 0 : 25}
                            className="text-slate-700 leading-relaxed text-[15px] block whitespace-pre-wrap"
                        />
                    )}
                </motion.div>

                {/* Attached Products */}
                {msg.products && msg.products.length > 0 && (
                    <StaggeredProductDisplay
                        products={msg.products}
                        onOrder={onOrder}
                        delayStart={idx === 0 ? 0 : (msg.text.length * 25) + (bulletPoints.length * 100) + 300}
                    />
                )}
            </div>
        </motion.div>
    );
}

// Internal standard Typewriter
function TypewriterText({ text, speed = 30, className }: { text: string; speed?: number; className?: string }) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setDisplayText('');
        setIsTyping(true);

        if (speed === 0) {
            setDisplayText(text);
            setIsTyping(false);
            return;
        }

        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.substring(0, i + 1));
                i++;
            } else {
                setIsTyping(false);
                clearInterval(typing);
            }
        }, speed);

        return () => clearInterval(typing);
    }, [text, speed]);

    return (
        <span className={className}>
            {displayText}
            {isTyping && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-0.5 h-3.5 bg-orange-400 align-middle ml-1"
                />
            )}
        </span>
    );
}

// Using user's ProductCard instead of custom dark ones
function StaggeredProductDisplay({ products, onOrder, delayStart }: { products: Product[], onOrder: any, delayStart: number }) {
    const [show, setShow] = useState(delayStart === 0);

    useEffect(() => {
        if (delayStart === 0) {
            setShow(true);
            return;
        }

        const baseDelay = Math.min(delayStart, 2500);
        const t = setTimeout(() => setShow(true), baseDelay);
        return () => clearTimeout(t);
    }, [delayStart]);

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 border-t border-slate-200 pt-6 w-full"
        >
            <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Recommended Products</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                {products.map((product, idx) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                        className="snap-start shrink-0 w-[260px] md:w-[280px]"
                    >
                        <ProductCard product={product} onOrder={onOrder} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
