export interface Product {
    id: number;
    name: string;
    generic: string;
    description: string;
    dosage: string;
    maxDose?: string;
    onset?: string;
    duration?: string;
    manufacturer: string;
    composition?: string;
    quantity?: string;
    price: number;
    stock: boolean;
    image?: string;
    icon?: string;
}

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    time: string; // The requirement specified time as a string, but can be a date
    timestamp: Date; // Keep internal date for sorting 
    products?: Product[];
    isTyping?: boolean;
}

export interface OrderDetails {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
}

export type ChatbotState = 'chat' | 'orderForm' | 'qrPayment';
