import { useState } from 'react';
import { useChatbotContext } from './ChatbotContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Loader2, Power, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function RightChatPanel() {
    const {
        messages,
        handleSendMessage,
        messagesEndRef,
        closeChatbot,
        endSession
    } = useChatbotContext();

    const [inputText, setInputText] = useState('');
    const isTyping = messages.some(m => m.isTyping);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || isTyping) return;
        handleSendMessage(inputText);
        setInputText('');
    };

    return (
        <div className="h-full flex flex-col bg-white relative">
            {/* Header */}
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4 border-b border-slate-200 shrink-0 z-20 flex justify-between items-center bg-white"
            >
                <div>
                    <motion.h3
                        className="text-[15px] font-bold text-slate-800"
                    >
                        Your Consultation
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[12px] text-slate-500 font-medium"
                    >
                        Ask our AI Pharmacy Assistant
                    </motion.p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={endSession}
                        className="h-8 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                    >
                        <Power className="w-3.5 h-3.5 mr-1" />
                        End Session
                    </Button>
                    <div className="h-4 w-px bg-slate-200 mx-1" />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={closeChatbot}
                        className="h-8 w-8 rounded-full hover:bg-slate-100 text-slate-500"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </motion.div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar pb-24 bg-slate-50/50">
                <AnimatePresence>
                    {messages.filter(m => m.sender === 'user').map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="flex justify-end mb-4 items-start gap-3"
                        >
                            <div className="max-w-[80%] flex flex-col items-end">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="px-4 py-3 rounded-2xl rounded-tr-sm bg-red-600 shadow-sm text-white font-medium"
                                >
                                    <p className="text-[14px] leading-relaxed break-words">{msg.text}</p>
                                </motion.div>
                                <p className="text-[10px] text-slate-400 mt-1.5 font-medium px-1">
                                    {msg.time}
                                </p>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 border border-red-200 shadow-sm text-red-600">
                                <User className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {messages.filter(m => m.sender === 'user').length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="h-full flex flex-col items-center justify-center text-center text-slate-500 max-w-sm mx-auto space-y-4"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center border border-red-200 shadow-sm"
                        >
                            <Send className="w-8 h-8 text-red-500" />
                        </motion.div>
                        <div>
                            <p className="font-semibold text-slate-800 mb-1">Welcome to Mediloon AI</p>
                            <p className="text-sm">Send a message to start chatting with the Pharmacy Assistant. Try asking "Tell me about paracetamol".</p>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white"
            >
                <form
                    onSubmit={handleSend}
                    className="flex items-center gap-2 bg-slate-50 rounded-full border border-slate-200 p-1.5 pr-2 focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-300 transition-all shadow-sm max-w-2xl mx-auto"
                >
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your health query here..."
                        disabled={isTyping}
                        className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-[14px] px-4 text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
                    />
                    <motion.button
                        type="submit"
                        disabled={!inputText.trim() || isTyping}
                        whileHover={(!inputText.trim() || isTyping) ? {} : { scale: 1.05 }}
                        whileTap={(!inputText.trim() || isTyping) ? {} : { scale: 0.95 }}
                        className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center disabled:opacity-50 disabled:bg-slate-300 shadow-sm shrink-0"
                    >
                        {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4 -ml-0.5" />}
                    </motion.button>
                </form>
                <div className="text-center mt-3">
                    <span className="text-[10px] text-slate-400 font-medium">
                        AI generated responses. Verify before purchasing.
                    </span>
                </div>
            </motion.div>
        </div>
    );
}
