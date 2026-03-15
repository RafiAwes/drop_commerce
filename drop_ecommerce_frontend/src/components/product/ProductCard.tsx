"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/store';
import { Product } from '@/lib/products';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative bg-card rounded-xl border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Wishlist Button */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors"
      >
        <Heart className={cn("h-4 w-4", isLiked && "fill-destructive text-destructive")} />
      </button>

      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image 
            src={product.image} 
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            data-ai-hint="product image"
          />
          {product.stock < 5 && product.stock > 0 && (
            <Badge variant="destructive" className="absolute bottom-3 left-3">
              Low Stock
            </Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge variant="outline" className="bg-white/90 text-foreground font-bold">
                Sold Out
              </Badge>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{product.category}</span>
          <div className="flex items-center text-accent">
            <Star className="h-3 w-3 fill-accent" />
            <span className="text-[10px] font-bold ml-1">{product.rating}</span>
          </div>
        </div>
        
        <Link href={`/products/${product.id}`}>
          <h3 className="font-headline text-lg font-bold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-card-foreground">${product.price.toFixed(2)}</p>
          <Button 
            onClick={() => addToCart(product)} 
            disabled={product.stock === 0}
            size="sm"
            className="bg-primary text-white hover:bg-primary/90 rounded-full h-8 w-8 p-0"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}