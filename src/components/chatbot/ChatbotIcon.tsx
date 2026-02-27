import { motion } from 'framer-motion';
import { Bot, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatbotContext } from './ChatbotContext';

export function ChatbotIcon() {
    const { isOpen, toggleChatbot } = useChatbotContext();

    return (
        <div className="fixed bottom-6 right-6 z-[1001]">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={isOpen ? { scale: 1, rotate: 0 } : {
                    scale: [1, 1.1, 1],
                    rotate: [0, 0, 0],
                    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                transition={isOpen ? { type: "spring", damping: 10 } : undefined}
                whileHover={!isOpen ? {
                    scale: 1.2,
                    rotate: 10,
                    boxShadow: "0 20px 30px rgba(59,130,246,0.5)"
                } : undefined}
                whileTap={{ scale: 0.9 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50 ${isOpen
                    ? 'bg-muted border border-border text-muted-foreground'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 border-2 border-white text-white'
                    }`}
                onClick={toggleChatbot}
                aria-label="Toggle AI Pharmacy Chatbot"
            >
                {isOpen ? (
                    <MessageSquare className="h-6 w-6" />
                ) : (
                    <motion.span
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="text-3xl leading-none flex items-center justify-center"
                    >
                        💬
                    </motion.span>
                )}
            </motion.div>
        </div>
    );
}
