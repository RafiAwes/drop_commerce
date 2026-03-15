"use client";

import { useState } from 'react';
import { useCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ChevronRight, Lock, CreditCard, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0 && step < 3) {
     return (
        <div className="container mx-auto px-4 py-20 text-center">
           <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
           <Link href="/products"><Button>Go Shopping</Button></Link>
        </div>
     )
  }

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  
  const handleFinish = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-16 space-x-4">
        <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary' : 'text-slate-300'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 mb-2 ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-slate-200'}`}>1</div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Shipping</span>
        </div>
        <div className={`h-0.5 w-12 mb-6 ${step >= 2 ? 'bg-primary' : 'bg-slate-200'}`}></div>
        <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary' : 'text-slate-300'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 mb-2 ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-slate-200'}`}>2</div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Payment</span>
        </div>
        <div className={`h-0.5 w-12 mb-6 ${step >= 3 ? 'bg-primary' : 'bg-slate-200'}`}></div>
        <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary' : 'text-slate-300'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 mb-2 ${step >= 3 ? 'border-primary bg-primary text-white' : 'border-slate-200'}`}>3</div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Done</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center space-x-3 mb-6">
                 <Truck className="h-6 w-6 text-primary" />
                 <h2 className="text-2xl font-headline font-bold">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="h-12" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Flow Street" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Modern City" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="12345" className="h-12" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-12" />
                </div>
              </div>
              <Button onClick={handleNext} className="w-full btn-primary h-12 text-lg">
                Continue to Payment <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="flex items-center space-x-3 mb-6">
                 <CreditCard className="h-6 w-6 text-primary" />
                 <h2 className="text-2xl font-headline font-bold">Secure Payment</h2>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardNum">Card Number</Label>
                  <div className="relative">
                     <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                     <Input id="cardNum" placeholder="0000 0000 0000 0000" className="h-12 pl-10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <Label htmlFor="expiry">Expiry Date</Label>
                     <Input id="expiry" placeholder="MM/YY" className="h-12" />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="cvv">CVV</Label>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input id="cvv" placeholder="123" className="h-12 pl-10" />
                     </div>
                   </div>
                </div>
              </div>
              <div className="flex space-x-4">
                 <Button variant="outline" onClick={handleBack} className="h-12 px-8">Back</Button>
                 <Button 
                   onClick={handleFinish} 
                   disabled={isProcessing}
                   className="flex-grow btn-primary h-12 text-lg"
                 >
                   {isProcessing ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
                 </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12 space-y-6 animate-in zoom-in duration-500">
              <div className="inline-flex p-6 bg-emerald-50 text-emerald-500 rounded-full mb-4">
                 <CheckCircle2 className="h-16 w-16" />
              </div>
              <h2 className="text-4xl font-headline font-bold">Order Confirmed!</h2>
              <p className="text-slate-500 max-w-sm mx-auto">
                Thank you for choosing CartFlow. Your order #FLOW-7821 is being prepared for shipment.
              </p>
              <Link href="/products">
                <Button className="btn-primary px-8 py-6 rounded-full font-bold">Continue Shopping</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mini Cart Summary */}
        {step < 3 && (
           <div className="space-y-6">
              <div className="bg-white rounded-2xl border p-6 shadow-sm sticky top-24">
                 <h3 className="font-bold mb-4">In Your Bag</h3>
                 <div className="space-y-4 max-h-60 overflow-auto mb-6">
                    {cart.map(item => (
                       <div key={item.id} className="flex space-x-3">
                          <div className="relative h-12 w-12 rounded border flex-shrink-0">
                             <Image src={item.image} alt={item.title} fill className="object-cover rounded" />
                          </div>
                          <div className="flex-grow">
                             <p className="text-xs font-bold line-clamp-1">{item.title}</p>
                             <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-xs font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                       </div>
                    ))}
                 </div>
                 <Separator className="mb-4" />
                 <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-500">Subtotal</span>
                       <span className="font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-500">Shipping</span>
                       <span className="text-emerald-500 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                       <span>Total</span>
                       <span className="text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}