import { useState } from 'react';
import { Message } from '@/types/chatbot';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface RightPanelProps {
    messages: Message[];
    onSendMessage: (text: string) => void;
    isTyping: boolean;
    messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function RightPanel({ messages, onSendMessage, isTyping, messagesEndRef }: RightPanelProps) {
    const [inputText, setInputText] = useState('');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || isTyping) return;
        onSendMessage(inputText);
        setInputText('');
    };

    return (
        <div className="h-full flex flex-col bg-background">
            <div className="p-4 border-b bg-background z-10">
                <h3 className="font-semibold text-sm">Your Chat</h3>
                <p className="text-xs text-muted-foreground">Ask about any medication</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                {messages.filter(m => m.sender === 'user').map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3 justify-end"
                    >
                        <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 max-w-[85%] text-sm shadow-sm break-words">
                            {msg.text}
                            <span className="text-[10px] opacity-70 block mt-1 text-right">{msg.time}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 mt-1">
                            <User className="w-4 h-4 text-primary" />
                        </div>
                    </motion.div>
                ))}
                {messages.filter(m => m.sender === 'user').length === 0 && (
                    <div className="h-full flex items-center justify-center text-center text-muted-foreground text-sm p-4 opacity-50">
                        Send a message to start chatting with the AI Pharmacy Assistant.
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-background border-t">
                <form
                    onSubmit={handleSend}
                    className="flex items-center gap-2 bg-muted/50 rounded-full border border-border/50 p-1 pr-2 shadow-inner focus-within:ring-1 focus-within:ring-primary/50 transition-all"
                >
                    <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your health query..."
                        className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-10"
                        disabled={isTyping}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!inputText.trim() || isTyping}
                        className="rounded-full h-8 w-8 gradient-primary shrink-0 transition-transform active:scale-95"
                    >
                        {isTyping ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Send className="w-4 h-4 text-white -ml-0.5" />}
                    </Button>
                </form>
                <p className="text-[10px] text-center text-muted-foreground mt-2 opacity-60">
                    AI generated responses. Verify before purchasing.
                </p>
            </div>
        </div>
    );
}
