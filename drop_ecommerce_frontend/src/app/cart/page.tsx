"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-6">
        <div className="inline-flex p-8 bg-indigo-50 rounded-full text-primary">
          <ShoppingBag className="h-16 w-16" />
        </div>
        <h1 className="text-4xl font-headline font-bold">Your cart is empty</h1>
        <p className="text-slate-500 max-w-sm mx-auto">
          It looks like you haven't added anything to your cart yet. Explore our curated collections to find your flow.
        </p>
        <Link href="/products">
          <Button className="btn-primary px-8 py-6 text-base font-bold">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold mb-12">Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border p-6 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pb-6 border-b last:border-0 last:pb-0">
                <div className="relative w-full sm:w-24 h-24 rounded-lg overflow-hidden border flex-shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-xs text-slate-400 uppercase tracking-widest">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-300 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white h-10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 hover:bg-slate-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 hover:bg-slate-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/products" className="inline-flex items-center text-primary font-bold hover:underline group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border p-8 space-y-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-headline font-bold">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal ({totalItems} items)</span>
                <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="text-emerald-500 font-medium">Calculated at next step</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Estimated Tax</span>
                <span className="font-medium text-foreground">$0.00</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button className="w-full btn-primary py-6 text-lg font-bold rounded-xl mt-4">
                Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold pt-4">
               <span>Secured by</span>
               <div className="h-4 w-12 bg-slate-100 rounded flex items-center justify-center">VISA</div>
               <div className="h-4 w-12 bg-slate-100 rounded flex items-center justify-center">PAYPAL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}