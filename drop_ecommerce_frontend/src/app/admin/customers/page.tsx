"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  ShieldAlert, 
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const MOCK_CUSTOMERS = [
  { id: "1", name: "John Doe", email: "john@example.com", orders: 12, spent: 1240.50, status: "Active", ltv: "High" },
  { id: "2", name: "Jane Smith", email: "jane@smith.io", orders: 3, spent: 450.00, status: "Active", ltv: "Medium" },
  { id: "3", name: "Mike Ross", email: "mike.r@legal.com", orders: 8, spent: 890.20, status: "Inactive", ltv: "High" },
  { id: "4", name: "Sarah Connor", email: "sarah@future.net", orders: 1, spent: 120.00, status: "Active", ltv: "Low" },
];

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Customer CRM</h1>
          <p className="text-slate-500">Database of all registered users and their lifetime value.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-10 h-11 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Button variant="outline" className="h-11 rounded-xl border-slate-200">
            <Filter className="h-4 w-4 mr-2" /> Segment
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Customer</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>LTV Segment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CUSTOMERS.map((customer) => (
              <TableRow key={customer.id} className="group hover:bg-slate-50/30 transition-colors">
                <TableCell>
                   <div className="flex items-center space-x-4">
                      <Avatar className="h-9 w-9 border border-slate-100 shadow-sm">
                        <AvatarFallback className="bg-indigo-50 text-primary font-bold text-xs">{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                         <p className="font-bold">{customer.name}</p>
                         <p className="text-[10px] text-slate-400 font-medium">{customer.email}</p>
                      </div>
                   </div>
                </TableCell>
                <TableCell className="font-medium text-slate-600">{customer.orders} orders</TableCell>
                <TableCell className="font-black text-foreground">${customer.spent.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={cn(
                    "font-bold",
                    customer.ltv === 'High' ? "bg-indigo-50 text-primary border-indigo-100" :
                    customer.ltv === 'Medium' ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-slate-50 text-slate-500 border-slate-100"
                  )}>
                    {customer.ltv} Value
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1.5">
                    <div className={cn("h-2 w-2 rounded-full", customer.status === 'Active' ? "bg-emerald-500" : "bg-slate-300")}></div>
                    <span className="text-sm font-medium text-slate-500">{customer.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-50">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-xl border-slate-100">
                      <DropdownMenuLabel>Customer Management</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="rounded-lg px-3 py-2 cursor-pointer">
                        <History className="h-4 w-4 mr-2 text-slate-400" /> View History
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg px-3 py-2 cursor-pointer">
                        <Mail className="h-4 w-4 mr-2 text-slate-400" /> Send Email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="rounded-lg px-3 py-2 cursor-pointer text-destructive focus:text-destructive">
                        <ShieldAlert className="h-4 w-4 mr-2" /> Suspend Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
