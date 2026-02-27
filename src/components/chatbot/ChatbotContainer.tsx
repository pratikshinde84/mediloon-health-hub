import { useState, useEffect } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { Product } from '@/types/chatbot';
import { Button } from '@/components/ui/button';
import { X, Bot, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';
import { OrderForm } from './OrderForm';
import { QRPayment } from './QRPayment';
import { ChatbotIcon } from './ChatbotIcon';

export function ChatbotContainer() {
    const {
        isOpen,
        hasUserMessaged,
        toggleChatbot,
        closeChatbot,
        messages,
        handleSendMessage,
        currentState,
        selectedProduct,
        handleOrderNow,
        submitOrder,
        orderDetails,
        completePayment,
        endSession,
        messagesEndRef,
    } = useChatbot();

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkViewport = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => window.removeEventListener('resize', checkViewport);
    }, []);

    const isTyping = messages.some(m => m.isTyping);

    return (
        <>
            <ChatbotIcon />

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 pointer-events-none flex flex-col md:flex-row overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Left Panel */}
                        <AnimatePresence>
                            {(hasUserMessaged || isMobile) && currentState === 'chat' && (
                                <motion.div
                                    initial={isMobile ? { y: "-100%" } : { x: "-100%" }}
                                    animate={isMobile ? { y: 0 } : { x: 0 }}
                                    exit={isMobile ? { y: "-100%" } : { x: "-100%" }}
                                    transition={{ duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
                                    className={`${isMobile ? 'w-full h-1/3 border-b' : 'w-1/2 h-full border-r'} bg-background pointer-events-auto overflow-hidden shadow-2xl z-50 relative`}
                                >
                                    <LeftPanel messages={messages} onOrder={handleOrderNow} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Spacer if left panel is closed on Desktop */}
                        {!(hasUserMessaged || isMobile) && !isMobile && (
                            <div className="w-1/2 h-full hidden md:block" />
                        )}

                        {/* Spacer if left panel is closed on Mobile */}
                        {!(hasUserMessaged || isMobile) && isMobile && (
                            <div className="w-full h-1/3 md:hidden" />
                        )}

                        {/* Right Panel */}
                        <motion.div
                            initial={isMobile ? { y: "100%" } : { x: "100%" }}
                            animate={isMobile ? { y: 0 } : { x: 0 }}
                            exit={isMobile ? { y: "100%" } : { x: "100%" }}
                            transition={{ duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
                            className={`${isMobile ? 'w-full flex-1' : 'w-1/2 h-full'} bg-background overflow-hidden pointer-events-auto shadow-2xl z-50 flex flex-col relative`}
                        >
                            {/* Header */}
                            <div className="h-14 border-b bg-background flex items-center justify-between px-4 shrink-0 transition-colors z-20">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center justify-center bg-primary/10 text-primary w-8 h-8 rounded-lg">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm">Mediloon AI Pharmacy</h3>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Virtual Assistant</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={endSession}
                                        className="h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10 hidden sm:flex"
                                    >
                                        <Power className="w-3.5 h-3.5 mr-1" />
                                        End Session
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={closeChatbot}
                                        className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 overflow-hidden relative flex flex-col">
                                {currentState === 'chat' && (
                                    <RightPanel
                                        messages={messages}
                                        onSendMessage={handleSendMessage}
                                        isTyping={isTyping}
                                        messagesEndRef={messagesEndRef}
                                    />
                                )}

                                {currentState === 'orderForm' && selectedProduct && (
                                    <div className="w-full h-full p-4 overflow-auto">
                                        <div className="max-w-md mx-auto">
                                            <OrderForm
                                                product={selectedProduct}
                                                onSubmit={submitOrder}
                                                onCancel={() => endSession()}
                                            />
                                        </div>
                                    </div>
                                )}

                                {currentState === 'qrPayment' && selectedProduct && orderDetails && (
                                    <div className="w-full h-full p-4 overflow-auto">
                                        <div className="max-w-md mx-auto">
                                            <QRPayment
                                                product={selectedProduct}
                                                orderDetails={orderDetails}
                                                onComplete={completePayment}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile End Session Button inline */}
                            {isMobile && currentState === 'chat' && (
                                <div className="p-2 border-t bg-muted/20 pb-safe shrink-0">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={endSession}
                                        className="w-full h-10 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <Power className="w-3.5 h-3.5 mr-1" />
                                        End Session Request
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
