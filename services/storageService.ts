import { Design, Order } from '../types';

const DESIGNS_KEY = 'ar_designs_data';
const ORDERS_KEY = 'ar_orders_data';

const INITIAL_DESIGNS: Design[] = [
  {
    id: '1',
    title: 'Floral Elegance',
    description: 'Soft pastel watercolors meet classic typography for a timeless wedding invite.',
    category: 'Wedding',
    price: 150,
    imageUrl: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2072&auto=format&fit=crop',
    createdAt: Date.now(),
  },
  {
    id: '2',
    title: 'Golden Gala',
    description: 'Luxurious black and gold accents perfect for corporate events and galas.',
    category: 'Corporate',
    price: 200,
    imageUrl: 'https://images.unsplash.com/photo-1507915977619-6ccfe8003ae6?q=80&w=1974&auto=format&fit=crop',
    createdAt: Date.now() - 100000,
  },
  {
    id: '3',
    title: 'Rainbow Unicorn',
    description: 'Vibrant colors and playful illustrations for a magical birthday celebration.',
    category: 'Birthday',
    price: 80,
    imageUrl: 'https://images.unsplash.com/photo-1531171000775-866416f4fc92?q=80&w=2000&auto=format&fit=crop',
    createdAt: Date.now() - 200000,
  }
];

export const getDesigns = (): Design[] => {
  const stored = localStorage.getItem(DESIGNS_KEY);
  if (!stored) {
    localStorage.setItem(DESIGNS_KEY, JSON.stringify(INITIAL_DESIGNS));
    return INITIAL_DESIGNS;
  }
  return JSON.parse(stored);
};

export const saveDesign = (design: Design): void => {
  const designs = getDesigns();
  const updated = [design, ...designs];
  localStorage.setItem(DESIGNS_KEY, JSON.stringify(updated));
};

export const getOrders = (): Order[] => {
  const stored = localStorage.getItem(ORDERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveOrder = (order: Order): void => {
  const orders = getOrders();
  const updated = [order, ...orders];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
};