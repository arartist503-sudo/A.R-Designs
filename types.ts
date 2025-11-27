export interface Design {
  id: string;
  title: string;
  description: string;
  category: 'Wedding' | 'Birthday' | 'Corporate' | 'Party' | 'Other';
  price: number;
  imageUrl: string;
  createdAt: number;
}

export interface Order {
  id: string;
  designId: string;
  designTitle: string;
  customerName: string;
  customerEmail: string;
  eventDate: string;
  customMessage: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  totalPrice: number;
  placedAt: number;
}

export interface NavItem {
  label: string;
  value: 'home' | 'admin';
}