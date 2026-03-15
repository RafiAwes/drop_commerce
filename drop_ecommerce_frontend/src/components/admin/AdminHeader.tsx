"use client";

import { Search, Bell, Command, User, Activity, LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/store";
import Link from "next/link";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  onOpenSearch: () => void;
}

export function AdminHeader({ onOpenSearch }: AdminHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-background px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 transition-colors">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="hidden lg:flex items-center space-x-3 mr-4">
           <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20 font-bold text-[10px] py-0 px-2 h-5">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></div>
             Live
           </Badge>
           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v2.4.0</span>
        </div>
        <Button 
          variant="outline" 
          className="hidden md:flex items-center space-x-2 w-80 justify-between text-slate-400 font-normal h-10 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50"
          onClick={onOpenSearch}
        >
          <div className="flex items-center">
            <Search className="h-4 w-4 mr-2" />
            <span>Search anything...</span>
          </div>
          <div className="flex items-center space-x-1 text-[10px] font-bold bg-white dark:bg-slate-800 border dark:border-slate-700 px-1.5 py-0.5 rounded shadow-sm">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </Button>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <ThemeToggle />
        
        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-primary">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 h-2 w-2 bg-destructive rounded-full border-2 border-white dark:border-slate-900"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-slate-200 dark:border-slate-800 p-0 overflow-hidden transition-all">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-indigo-50 text-primary font-bold">{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 rounded-xl p-2 border-slate-100 dark:border-slate-800 shadow-xl" align="end">
            <DropdownMenuLabel className="px-4 py-3">
              <div className="flex flex-col">
                <span className="font-bold text-foreground">{user?.name}</span>
                <span className="text-xs text-slate-400 font-medium truncate">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg px-4 py-2.5 cursor-pointer focus:bg-indigo-50 dark:focus:bg-indigo-500/10" asChild>
              <Link href="/admin/profile" className="flex items-center">
                <User className="h-4 w-4 mr-2 text-slate-400" /> My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg px-4 py-2.5 cursor-pointer focus:bg-indigo-50 dark:focus:bg-indigo-500/10" asChild>
              <Link href="/admin/health" className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-slate-400" /> System Health
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="rounded-lg px-4 py-2.5 cursor-pointer focus:bg-destructive/5 text-destructive focus:text-destructive"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
