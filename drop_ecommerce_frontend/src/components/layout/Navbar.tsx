"use client";

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, LogOut, Settings, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart, useAuth } from '@/lib/store';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide the storefront navbar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="glass-nav transition-all">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold transform transition-transform group-hover:rotate-12">C</div>
          <span className="text-2xl font-headline font-bold text-foreground">
            Cart<span className="text-primary">Flow</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">New Arrivals</Link>
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Featured</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-400 hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 animate-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-transparent hover:border-indigo-100 p-0 overflow-hidden transition-all">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-indigo-50 text-primary font-bold">{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 border-slate-100 dark:border-slate-800 shadow-xl" align="end">
                <DropdownMenuLabel className="font-headline text-base px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">{user?.name}</span>
                    <span className="text-xs text-slate-400 font-medium truncate">{user?.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl px-4 py-2.5 cursor-pointer focus:bg-indigo-50 dark:focus:bg-indigo-500/10" asChild>
                  <Link href="/account" className="flex items-center">
                    <User className="mr-3 h-4 w-4 text-slate-400" />
                    <span className="font-medium">Account Overview</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl px-4 py-2.5 cursor-pointer focus:bg-indigo-50 dark:focus:bg-indigo-500/10" asChild>
                  <Link href="/account?tab=orders" className="flex items-center">
                    <Package className="mr-3 h-4 w-4 text-slate-400" />
                    <span className="font-medium">My Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-xl px-4 py-2.5 cursor-pointer focus:bg-indigo-50 dark:focus:bg-indigo-500/10" asChild>
                  <Link href="/account?tab=settings" className="flex items-center">
                    <Settings className="mr-3 h-4 w-4 text-slate-400" />
                    <span className="font-medium">Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="rounded-xl px-4 py-2.5 cursor-pointer focus:bg-destructive/5 text-destructive focus:text-destructive" 
                  onClick={() => logout()}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="font-bold">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="hidden sm:flex rounded-full border-slate-200 dark:border-slate-800 font-bold px-6 h-10">
                Sign In
              </Button>
              <Button variant="ghost" size="icon" className="sm:hidden text-slate-400">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-slate-600 dark:text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b dark:border-slate-800 transition-all duration-300 ease-in-out overflow-hidden z-[100]",
        isMenuOpen ? "max-h-[80vh] opacity-100 shadow-xl" : "max-h-0 opacity-0"
      )}>
        <nav className="flex flex-col p-6 space-y-6">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Main Menu</p>
            <Link href="/products" className="text-lg font-headline font-bold block" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
            <Link href="/products" className="text-lg font-headline font-bold block" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
            <Link href="/products" className="text-lg font-headline font-bold block" onClick={() => setIsMenuOpen(false)}>Featured Selections</Link>
          </div>
          
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
            {isAuthenticated ? (
              <>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</p>
                <Link href="/account" className="flex items-center text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-5 w-5 mr-3 text-primary" /> Profile Dashboard
                </Link>
                <Link href="/account" className="flex items-center text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                  <Package className="h-5 w-5 mr-3 text-primary" /> My Orders
                </Link>
                <button 
                  className="flex items-center text-base font-bold text-destructive" 
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                >
                  <LogOut className="h-5 w-5 mr-3" /> Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full btn-primary font-bold rounded-xl h-12">Sign In</Button>
                </Link>
                <Link href="/register" className="w-full" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-slate-200 dark:border-slate-800 font-bold rounded-xl h-12">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}