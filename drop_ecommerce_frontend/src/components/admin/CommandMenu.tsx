"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Package,
  ShoppingBag,
  Users,
  Megaphone,
  Search,
  Zap,
  Layers,
  LayoutDashboard
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

interface CommandMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CommandMenu({ open, setOpen }: CommandMenuProps) {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Management">
          <CommandItem onSelect={() => setOpen(false)}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <Package className="mr-2 h-4 w-4" />
            <span>Products</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <Layers className="mr-2 h-4 w-4" />
            <span>Categories</span>
            <CommandShortcut>⌘G</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Orders</span>
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <Users className="mr-2 h-4 w-4" />
            <span>Customers</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => setOpen(false)}>
            <Zap className="mr-2 h-4 w-4 text-amber-400" />
            <span>Create New Product</span>
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <Megaphone className="mr-2 h-4 w-4" />
            <span>New Promotion</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => setOpen(false)}>
            <User className="mr-2 h-4 w-4" />
            <span>Admin Profile</span>
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Store Settings</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
