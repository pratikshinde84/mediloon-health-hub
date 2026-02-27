import { Message, Product } from '@/types/chatbot';
import { ProductCard } from './ProductCard';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface LeftPanelProps {
    messages: Message[];
    onOrder: (product: Product) => void;
}

export function LeftPanel({ messages, onOrder }: LeftPanelProps) {
    return (
        <div className="h-full bg-muted/30 border-r flex flex-col relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="p-4 border-b bg-background/50 backdrop-blur-md z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-md">
                    <Bot className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="font-semibold leading-tight">AI Assistant</h2>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Online • Mediloon Pharmacy
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 z-10 custom-scrollbar">
                {messages.filter(m => m.sender === 'bot').map((msg, idx) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.8, x: -20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-3"
                    >
                        {/* The Text Bubble */}
                        <div className="bg-background border shadow-sm rounded-2xl rounded-tl-sm p-4 relative text-sm text-foreground/90 leading-relaxed max-w-[95%] whitespace-pre-wrap">
                            {msg.isTyping ? (
                                <div className="flex gap-1.5 items-center justify-center p-1 w-fit">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, -8, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2, ease: "easeInOut" }}
                                            className="w-2 h-2 bg-primary/60 rounded-full"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <TypewriterText
                                    text={msg.text}
                                    delay={idx === 0 ? 0 : 20}
                                />
                            )}
                        </div>

                        {/* The Products Grid */}
                        {!msg.isTyping && msg.products && msg.products.length > 0 && (
                            <StaggeredProductDisplay products={msg.products} onOrder={onOrder} delayStart={msg.text.length * 20} />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Simple internal typewriter effect component for ChatGPT style vibe
import { useState, useEffect } from 'react';

function TypewriterText({ text, delay = 40 }: { text: string; delay?: number }) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        // Reset state when text changes
        setDisplayText('');
        setIsTyping(true);
        setShowCursor(true);

        if (delay === 0) {
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
        }, delay);

        return () => clearInterval(typing);
    }, [text, delay]);

    useEffect(() => {
        if (!isTyping) return;
        const cursor = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursor);
    }, [isTyping]);

    return (
        <span>
            {displayText}
            {isTyping && showCursor && (
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-0.5 h-4 bg-primary align-middle ml-0.5"
                />
            )}
        </span>
    );
}

// Delay the product rendering until typing is likely done based on string length
function StaggeredProductDisplay({ products, onOrder, delayStart }: { products: Product[], onOrder: any, delayStart: number }) {
    const [show, setShow] = useState(delayStart === 0);

    useEffect(() => {
        if (delayStart === 0) return;
        const t = setTimeout(() => setShow(true), delayStart + 500); // give it a tiny bit of breathing room after text
        return () => clearTimeout(t);
    }, [delayStart]);

    if (!show) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full overflow-x-auto pb-2 -mx-4 px-4 snap-x hide-scrollbar flex gap-3"
        >
            {products.map(product => (
                <div key={product.id} className="snap-start shrink-0">
                    <ProductCard product={product} onOrder={onOrder} />
                </div>
            ))}
        </motion.div>
    );
}
