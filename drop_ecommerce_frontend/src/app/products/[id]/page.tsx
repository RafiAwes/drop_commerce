"use client";

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star, ShoppingBag, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/store';
import { PRODUCTS } from '@/lib/products';
import { AIInsight } from '@/components/product/AIInsight';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-headline font-bold mb-4">Product Not Found</h1>
        <Link href="/products">
          <Button className="btn-primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Link href="/products" className="inline-flex items-center text-sm text-slate-500 hover:text-primary mb-8 transition-colors group">
        <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill 
              className="object-cover"
              priority
              data-ai-hint="large product image"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border bg-white hover:border-primary transition-colors cursor-pointer">
                <Image 
                  src={`https://picsum.photos/seed/prod${i+10}/200/200`} 
                  alt={`Thumbnail ${i}`} 
                  fill 
                  className="object-cover opacity-80 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-indigo-50 text-primary border-indigo-100 uppercase tracking-widest text-[10px] px-3 py-1">
                {product.category}
              </Badge>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-slate-200'}`} />
                ))}
                <span className="text-sm font-bold ml-2">{product.rating} (124 reviews)</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
              {product.title}
            </h1>
            
            <p className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</p>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 mb-8">
            <p>{product.description}</p>
          </div>

          {/* AI Insights Tool */}
          <AIInsight productDescription={product.description} />

          {/* Selection UI */}
          <div className="space-y-8 mb-8">
            {product.variants && (
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Select Variant</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(v => (
                    <Button 
                      key={v}
                      variant={selectedVariant === v ? "default" : "outline"}
                      className={selectedVariant === v ? "bg-primary text-white" : "border-slate-200"}
                      onClick={() => setSelectedVariant(v)}
                    >
                      {v}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-slate-200 rounded-lg bg-white h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 h-full hover:bg-slate-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 h-full hover:bg-slate-50 transition-colors"
                >
                  +
                </button>
              </div>
              
              <Button 
                onClick={() => addToCart(product, quantity)}
                disabled={product.stock === 0}
                className="flex-grow btn-primary h-12 text-base font-bold"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                {product.stock === 0 ? "Out of Stock" : "Add to Shopping Cart"}
              </Button>
            </div>
          </div>

          {/* Quick Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-8">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-slate-400" />
              <div className="text-xs">
                <p className="font-bold">Free Shipping</p>
                <p className="text-slate-500">Orders over $100</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 text-slate-400" />
              <div className="text-xs">
                <p className="font-bold">30-Day Returns</p>
                <p className="text-slate-500">Hassle-free process</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-5 w-5 text-slate-400" />
              <div className="text-xs">
                <p className="font-bold">Safe Payments</p>
                <p className="text-slate-500">Fully encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-20">
        <Tabs defaultValue="details">
          <TabsList className="bg-transparent border-b border-slate-200 rounded-none w-full justify-start h-auto p-0 mb-8">
            <TabsTrigger 
              value="details" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger 
              value="specifications" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-widest"
            >
              Customer Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="animate-in fade-in duration-500">
            <div className="max-w-3xl space-y-4">
              <p>Designed for excellence, the {product.title} combines performance with unmatched aesthetics. Whether you're at work or enjoying leisure time, this item seamlessly integrates into your lifestyle.</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li>Premium materials for long-lasting durability</li>
                <li>Ergonomic design for maximum comfort</li>
                <li>Exclusive limited edition release</li>
                <li>Comes with a 1-year manufacturer's warranty</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 border rounded-xl overflow-hidden">
                <div className="flex justify-between p-4 bg-slate-50 border-b">
                   <span className="font-bold text-slate-500">Weight</span>
                   <span>0.85 kg</span>
                </div>
                <div className="flex justify-between p-4 bg-white border-b">
                   <span className="font-bold text-slate-500">Dimensions</span>
                   <span>24 x 18 x 12 cm</span>
                </div>
                <div className="flex justify-between p-4 bg-white border-b md:bg-slate-50">
                   <span className="font-bold text-slate-500">Material</span>
                   <span>Premium Grade A</span>
                </div>
                <div className="flex justify-between p-4 bg-slate-50 border-b md:bg-white">
                   <span className="font-bold text-slate-500">Origin</span>
                   <span>Italy</span>
                </div>
             </div>
          </TabsContent>

          <TabsContent value="reviews">
             <div className="space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-bold font-headline">What Customers Say</h3>
                   <Button variant="outline" className="border-primary text-primary font-bold">Write a Review</Button>
                </div>
                {[1, 2].map(i => (
                  <div key={i} className="border-b border-slate-100 pb-8 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, star) => (
                          <Star key={star} className="h-3 w-3 fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="text-xs font-bold">Verified Buyer</span>
                    </div>
                    <h4 className="font-bold text-sm">Absolutely stunning quality!</h4>
                    <p className="text-sm text-slate-600">The product exceeded all my expectations. The packaging was beautiful and the delivery was prompt. Highly recommend to anyone looking for premium value.</p>
                    <div className="flex items-center space-x-2 mt-2">
                       <div className="w-8 h-8 rounded-full bg-indigo-50 border flex items-center justify-center text-[10px] font-bold">JD</div>
                       <span className="text-[10px] text-slate-400">John Doe - 2 days ago</span>
                    </div>
                  </div>
                ))}
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
