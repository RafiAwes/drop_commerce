"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Hide the storefront footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-950 text-slate-200 pt-16 pb-8 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-headline font-bold text-white">
              Cart<span className="text-primary">Flow</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Premium shopping experience powered by innovation. Discover the finest curated collections from around the globe.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-accent">Shop</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">Featured</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/products" className="hover:text-destructive transition-colors">Flash Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-accent">Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-accent">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-900 border-slate-800 rounded-l-md px-4 py-2 w-full text-sm text-slate-200 focus:ring-1 focus:ring-primary outline-none"
              />
              <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-r-md text-sm font-bold transition-colors text-white">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} CartFlow Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}