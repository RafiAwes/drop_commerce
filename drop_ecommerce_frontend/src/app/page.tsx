import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Star, 
  TrendingUp, 
  Clock, 
  Heart,
  ChevronRight,
  Quote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const newArrivals = PRODUCTS.slice(2, 6);

  return (
    <div className="space-y-24 pb-20 overflow-x-hidden">
      {/* Hero Carousel Section */}
      <section className="relative">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {/* Slide 1 */}
            <CarouselItem>
              <div className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" 
                    alt="Luxury Fashion"
                    fill
                    className="object-cover opacity-50"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-2xl space-y-6 animate-in slide-in-from-left-8 duration-700">
                    <Badge className="bg-primary/20 backdrop-blur-md border border-primary/30 text-white uppercase tracking-widest px-4 py-1.5">
                      New Collection 2024
                    </Badge>
                    <h1 className="text-6xl md:text-8xl font-headline font-bold text-white leading-tight">
                      Pure <span className="premium-text">Elegance</span>. <br />
                      Redefined.
                    </h1>
                    <p className="text-xl text-slate-300 max-w-lg font-light leading-relaxed">
                      Discover curated masterpieces crafted for the discerning eye. Experience the perfect harmony of form and function.
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                      <Link href="/products">
                        <Button size="lg" className="btn-primary px-10 py-7 text-lg font-bold">
                          Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
            {/* Slide 2 */}
            <CarouselItem>
              <div className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=2000" 
                    alt="Modern Tech"
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-indigo-950/40 to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                  <div className="max-w-2xl space-y-6">
                    <Badge className="bg-accent/20 backdrop-blur-md border border-accent/30 text-white uppercase tracking-widest px-4 py-1.5">
                      Limited Drop
                    </Badge>
                    <h1 className="text-6xl md:text-8xl font-headline font-bold text-white leading-tight">
                      The Future <br /> Is <span className="text-accent">Aura</span>.
                    </h1>
                    <p className="text-xl text-slate-300 max-w-lg font-light leading-relaxed">
                      Sound so pure it changes your perception. Meet the new standard in audio engineering.
                    </p>
                    <div className="flex pt-4">
                      <Link href="/products/2">
                        <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm px-10 py-7 text-lg font-bold">
                          Explore Aura
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-8 bg-black/20 text-white border-white/20 hover:bg-black/40" />
            <CarouselNext className="right-8 bg-black/20 text-white border-white/20 hover:bg-black/40" />
          </div>
        </Carousel>
      </section>

      {/* Brand Trust Strip */}
      <section className="container mx-auto px-4 py-8 border-y border-slate-100 dark:border-slate-800">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-2xl font-black italic">VOGUE</div>
          <div className="text-2xl font-black">Forbes</div>
          <div className="text-2xl font-black font-headline tracking-tighter italic">HYPEBEAST</div>
          <div className="text-2xl font-black tracking-widest">ELLE</div>
          <div className="text-2xl font-black italic">GQ</div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              name: 'Accessories', 
              img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
              link: '/products?category=Accessories'
            },
            { 
              name: 'Electronics', 
              img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
              link: '/products?category=Electronics'
            },
            { 
              name: 'Footwear', 
              img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
              link: '/products?category=Footwear'
            }
          ].map((cat, i) => (
            <Link key={i} href={cat.link} className="group relative h-80 rounded-3xl overflow-hidden block">
              <Image 
                src={cat.img} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-white text-3xl font-headline font-bold mb-2">{cat.name}</h3>
                <div className="flex items-center text-white/80 font-bold text-sm">
                  Explore Collection <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Best Sellers</h2>
            <div className="h-1.5 w-24 bg-primary"></div>
          </div>
          <Link href="/products" className="text-primary font-bold hover:underline flex items-center group text-lg">
            Shop All Catalog <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Editorial Promo Section */}
      <section className="relative h-[600px] bg-slate-100 flex items-center overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <Image 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200" 
            alt="Editorial" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl space-y-8 py-12 md:py-0">
            <div className="space-y-4">
              <p className="text-primary font-bold tracking-widest uppercase text-sm">Summer Essential</p>
              <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight">The Modern <br /> Uniform.</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Clean lines, premium fabrics, and intentional design. Discover our latest drop featuring seasonal tones and breathable materials.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button size="lg" className="btn-primary rounded-full px-10 font-bold h-14">Shop The Drop</Button>
              <Button variant="ghost" size="lg" className="font-bold h-14 hover:bg-transparent hover:underline">View Lookbook</Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <p className="text-3xl font-bold font-headline">100%</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Organic Cotton</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-headline">12</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">New Tones</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-headline">Limited</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Quantity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Slider */}
      <section className="container mx-auto px-4">
        <div className="flex items-center space-x-4 mb-12">
          <h2 className="text-3xl font-headline font-bold">New Arrivals</h2>
          <div className="h-px bg-slate-200 flex-grow"></div>
        </div>
        
        <Carousel className="w-full" opts={{ align: 'start' }}>
          <CarouselContent className="-ml-4">
            {newArrivals.map(product => (
              <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-end mt-8 space-x-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-12">
            <Quote className="h-12 w-12 text-primary/20 mx-auto" />
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="space-y-6">
                    <p className="text-2xl md:text-3xl font-headline italic leading-relaxed text-slate-700 dark:text-slate-300">
                      "CartFlow has completely transformed my shopping experience. The curation is impeccable, and the AI insights help me make informed decisions instantly."
                    </p>
                    <div>
                      <p className="font-bold text-lg text-primary">Sarah Jenkins</p>
                      <p className="text-sm text-slate-400 font-medium">Verified Customer • Verified Buyer</p>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="space-y-6">
                    <p className="text-2xl md:text-3xl font-headline italic leading-relaxed text-slate-700 dark:text-slate-300">
                      "I've never seen such attention to detail in a storefront. From the smooth transitions to the high-quality product imagery, it's premium at every touchpoint."
                    </p>
                    <div>
                      <p className="font-bold text-lg text-primary">Marcus Thorne</p>
                      <p className="text-sm text-slate-400 font-medium">Tech Enthusiast • Verified Buyer</p>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-12 md:p-20">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 text-primary shadow-sm border border-slate-100 dark:border-slate-700">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-headline font-bold">Secure Transactions</h3>
            <p className="text-slate-500 text-sm max-w-xs">Your security is our priority. We use industry-leading encryption for every purchase.</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 text-primary shadow-sm border border-slate-100 dark:border-slate-700">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-headline font-bold">Worldwide Delivery</h3>
            <p className="text-slate-500 text-sm max-w-xs">Connecting products with people across 150+ countries with expedited logistics.</p>
          </div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 text-primary shadow-sm border border-slate-100 dark:border-slate-700">
              <TrendingUp className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-headline font-bold">Smart Curation</h3>
            <p className="text-slate-500 text-sm max-w-xs">Shop smarter with generated bullet-point summaries for every item in our catalog.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-[3rem] overflow-hidden bg-primary p-12 md:p-24 text-center text-white">
          <div className="absolute inset-0 z-0 opacity-10">
            <Image src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000" alt="Pattern" fill className="object-cover" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-headline font-bold">Join the Flow Community</h2>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                Subscribe for early access to limited drops, curated lifestyle guides, and exclusive member-only pricing.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full sm:w-96 px-8 py-5 rounded-full bg-white text-foreground outline-none focus:ring-4 focus:ring-accent/50 text-lg"
              />
              <Button size="lg" className="w-full sm:w-auto bg-slate-900 text-white hover:bg-black rounded-full px-12 py-5 text-lg font-bold shadow-2xl h-16 transition-all active:scale-95">
                Join Now
              </Button>
            </div>
            <p className="text-xs text-indigo-200/60 font-medium">No spam, only pure inspiration. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
