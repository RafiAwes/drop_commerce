"use client";

import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  Tag, 
  Megaphone,
  Store,
  Layers
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { title: "Products", icon: Package, href: "/admin/products" },
  { title: "Categories", icon: Layers, href: "/admin/categories" },
  { title: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { title: "Customers", icon: Users, href: "/admin/customers" },
  { title: "Analytics", icon: BarChart3, href: "/admin/analytics" },
];

const MARKETING_ITEMS = [
  { title: "Promotions", icon: Megaphone, href: "/admin/marketing" },
  { title: "Coupons", icon: Tag, href: "/admin/coupons" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 dark:border-slate-800 bg-card transition-colors">
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-slate-50 dark:border-slate-900">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">C</div>
          <span className="text-xl font-headline font-bold text-foreground group-data-[collapsible=icon]:hidden">
            Cart<span className="text-primary">Admin</span>
          </span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={cn(
                      "px-6 h-11 rounded-none border-l-2 border-transparent transition-all",
                      pathname === item.href && "bg-indigo-50/50 dark:bg-indigo-500/10 text-primary border-primary"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Growth</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MARKETING_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={cn(
                      "px-6 h-11 rounded-none border-l-2 border-transparent transition-all",
                      pathname === item.href && "bg-indigo-50/50 dark:bg-indigo-500/10 text-primary border-primary"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-50 dark:border-slate-900 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Storefront">
              <Link href="/" className="flex items-center space-x-2 text-slate-500 hover:text-primary px-2 py-2">
                <Store className="h-4 w-4" />
                <span className="font-medium">View Store</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="/admin/settings" className="flex items-center space-x-2 text-slate-500 hover:text-primary px-2 py-2">
                <Settings className="h-4 w-4" />
                <span className="font-medium">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
