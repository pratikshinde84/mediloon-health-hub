import { Product } from '@/types/chatbot';

export const mockProducts: Record<string, Product> = {
    paracetamol: {
        id: 1,
        name: 'Paracetamol 500mg',
        generic: 'Acetaminophen',
        description: 'Effective for mild to moderate pain and fever',
        dosage: '500mg every 4-6 hours',
        maxDose: '4000mg per day',
        onset: '30-60 minutes',
        duration: '4-6 hours',
        manufacturer: 'German Pharma',
        composition: 'Paracetamol IP 500mg',
        quantity: '100 tablets',
        price: 9.99,
        stock: true,
        icon: '💊',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
    },
    ibuprofen: {
        id: 2,
        name: 'Ibuprofen 400mg',
        generic: 'NSAID',
        description: 'Anti-inflammatory pain relief',
        dosage: '200-400mg every 6-8 hours',
        manufacturer: 'HealthCare GmbH',
        composition: 'Ibuprofen IP 400mg',
        quantity: '50 tablets',
        price: 12.99,
        stock: true,
        icon: '💊',
        image: 'https://images.unsplash.com/photo-1550572017-edb7348e3575?w=400&q=80',
    }
};

export const findProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();

    if (lowercaseQuery.includes('paracetamol')) return [mockProducts.paracetamol];
    if (lowercaseQuery.includes('ibuprofen')) return [mockProducts.ibuprofen];
    if (lowercaseQuery.includes('pain') || lowercaseQuery.includes('fever')) return [mockProducts.paracetamol, mockProducts.ibuprofen];

    return [];
};
