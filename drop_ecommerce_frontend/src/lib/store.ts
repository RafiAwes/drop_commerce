
"use client";

import { useState, useEffect } from 'react';
import { Product } from './products';

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role?: 'admin' | 'user';
  phone?: string;
  address?: string;
  city?: string;
  zip?: string;
  avatar?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  items: number;
}

export interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'paypal';
  last4?: string;
  expiry?: string;
  isDefault: boolean;
  email?: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cartflow_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cartflow_cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      const newQuantity = Math.min(existing.quantity + quantity, product.stock);
      saveCart(cart.map(item => item.id === product.id ? { ...item, quantity: newQuantity } : item));
    } else {
      saveCart([...cart, { ...product, quantity: Math.min(quantity, product.stock) }]);
    }
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    const newQuantity = Math.max(1, Math.min(quantity, item.stock));
    saveCart(cart.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('cartflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('cartflow_user', JSON.stringify(userData));
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('cartflow_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cartflow_user');
    window.location.href = '/';
  };

  return { user, login, logout, updateProfile, isAuthenticated: !!user, isAdmin: user?.role === 'admin' };
}

export const MOCK_ORDERS: Order[] = [
  { id: 'FLOW-19283', date: 'Oct 12, 2023', total: 149.00, status: 'Delivered', items: 2 },
  { id: 'FLOW-18452', date: 'Sep 28, 2023', total: 89.50, status: 'Delivered', items: 1 },
  { id: 'FLOW-17331', date: 'Aug 15, 2023', total: 420.00, status: 'Shipped', items: 4 },
];

export const MOCK_ADDRESSES: SavedAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    name: 'John Doe',
    street: '123 Flow Modern Way, Apt 4B',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    country: 'United States',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Office',
    name: 'John Doe',
    street: '500 Tech Plaza, Suite 200',
    city: 'Palo Alto',
    state: 'CA',
    zip: '94301',
    country: 'United States',
    isDefault: false
  }
];

export const MOCK_PAYMENTS: PaymentMethod[] = [
  {
    id: 'pay-1',
    type: 'visa',
    last4: '4242',
    expiry: '12/25',
    isDefault: true
  },
  {
    id: 'pay-2',
    type: 'paypal',
    email: 'j.doe@example.com',
    isDefault: false
  }
];
