"use client";

import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/products';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Accessories', 'Electronics', 'Footwear', 'Beauty'];
  
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Our Catalog</h1>
          <p className="text-muted-foreground">Explore our curated collection of premium products.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl shadow-sm border border-border/50 backdrop-blur-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for products..." 
              className="pl-10 h-12 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 border-border flex items-center space-x-2 min-w-[140px]">
                  <span>{selectedCategory}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {categories.map(cat => (
                  <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)}>
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="h-12 border-border">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> results
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <button className="text-sm font-bold flex items-center hover:text-primary transition-colors">
              Featured <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex p-6 bg-muted rounded-full mb-4">
              <Search className="h-12 w-12 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-headline font-bold">No products found</h3>
            <p className="text-muted-foreground max-w-sm mx-auto mt-2">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              variant="link" 
              className="mt-4 text-primary font-bold"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
