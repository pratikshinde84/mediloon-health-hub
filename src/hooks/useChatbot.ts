import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, Product, OrderDetails, ChatbotState } from '@/types/chatbot';
import { findProducts } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

const INITIAL_MESSAGE: Message = {
    id: 'init-1',
    text: 'Hello! I am your AI Pharmacy Assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date(),
    time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date())
};

export const useChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasUserMessaged, setHasUserMessaged] = useState(false);

    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [currentState, setCurrentState] = useState<ChatbotState>('chat');

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

    const { toast } = useToast();

    // Ref to automatically scroll to bottom of chat
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(scrollToBottom, 100);
        }
    }, [messages, isOpen]);

    const toggleChatbot = () => setIsOpen((prev) => !prev);

    const closeChatbot = () => {
        setIsOpen(false);
        // Reset state after closing animation
        setTimeout(() => {
            // Keep the previous chat up unless explicitly ended, just close the sidebar
        }, 300);
    };

    const handleSendMessage = useCallback((text: string) => {
        if (!text.trim()) return;

        if (!hasUserMessaged) {
            setHasUserMessaged(true);
        }

        const exactTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date());

        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
            time: exactTime
        };

        setMessages((prev) => [...prev, userMessage]);

        // Simulate AI thinking and typing
        const typingId = (Date.now() + 1).toString();
        setMessages((prev) => [
            ...prev,
            {
                id: typingId,
                text: '',
                sender: 'bot',
                timestamp: new Date(),
                time: exactTime,
                isTyping: true,
            },
        ]);

        setTimeout(() => {
            const foundProducts = findProducts(text);
            const lowercaseText = text.toLowerCase();

            let botResponseText = "I'm sorry, I couldn't find any specific medications for that. Could you please rephrase or ask about common medications like painkillers or vitamins?";

            // Exact logic match for V2 requirement
            if (lowercaseText.includes('paracetamol')) {
                botResponseText = "Paracetamol (Acetaminophen) is highly effective for mild to moderate pain and fever reduction.\n\n• Dosage: 500mg every 4-6 hours\n• Maximum dose: 4000mg per day\n• Onset time: 30-60 minutes\n• Duration: 4-6 hours\n\nHere is a highly rated option available in stock for immediate delivery:";
            } else if (lowercaseText.includes('ibuprofen')) {
                botResponseText = "Ibuprofen is a trusted nonsteroidal anti-inflammatory drug (NSAID) used for reducing inflammation and pain relief.\n\n• Dosage: 200-400mg every 6-8 hours\n• Note: Always take with food to prevent stomach upset.\n\nHere is a highly rated option available in stock for immediate delivery:";
            } else if (foundProducts.length > 0) {
                botResponseText = `I found some excellent options that might help. Here are the products related to your query:`;
            } else if (lowercaseText.includes('payment') || lowercaseText.includes('order') || lowercaseText.includes('cart')) {
                botResponseText = "You can order directly from the product cards using the 'Add to Cart' or 'Buy Now' buttons. Once selected, you'll provide delivery details and we accept secure UPI/QR payments.";
            }

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === typingId
                        ? {
                            ...msg,
                            text: botResponseText,
                            isTyping: false,
                            products: foundProducts.length > 0 ? foundProducts : undefined,
                        }
                        : msg
                )
            );
        }, 1200); // 1.2s thinking time
    }, [hasUserMessaged]);

    const handleOrderNow = (product: Product) => {
        setSelectedProduct(product);
        setCurrentState('orderForm');
    };

    const submitOrder = (details: OrderDetails) => {
        setOrderDetails(details);
        setCurrentState('qrPayment');

        toast({
            title: "Details Verified",
            description: "Please proceed with payment to confirm your order.",
        });
    };

    const completePayment = () => {
        const exactTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date());

        const successMsg: Message = {
            id: Date.now().toString(),
            text: `Payment successful! Your order for ${selectedProduct?.name} has been confirmed and will be delivered to ${orderDetails?.address}.`,
            sender: 'bot',
            timestamp: new Date(),
            time: exactTime
        };

        setMessages(prev => [...prev, successMsg]);
        setCurrentState('chat');
        setSelectedProduct(null);
        setOrderDetails(null);

        toast({
            title: "Payment Successful",
            description: "Your receipt has been sent to your registered email.",
            variant: "default",
        });
    };

    const endSession = () => {
        // Hide panels
        setHasUserMessaged(false);
        setIsOpen(false);

        // Reset fully after animation completes
        setTimeout(() => {
            setMessages([INITIAL_MESSAGE]);
            setCurrentState('chat');
            setSelectedProduct(null);
            setOrderDetails(null);
            toast({
                title: "Session Ended",
                description: "Chat history cleared.",
            });
        }, 500);
    };

    return {
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
    };
};
