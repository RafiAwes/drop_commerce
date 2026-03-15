"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ExternalLink,
  Package,
  User,
  CreditCard,
  History,
  Mail,
  RefreshCw
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
import { MOCK_ORDERS } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isFulfilling, setIsFulfilling] = useState(false);
  const { toast } = useToast();

  const filteredOrders = MOCK_ORDERS.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkShipped = () => {
    setIsFulfilling(true);
    setTimeout(() => {
      toast({
        title: "Order Fulfilled",
        description: `Order ${selectedOrder?.id} has been marked as shipped. Email notification sent to customer.`,
      });
      setIsFulfilling(false);
      setSelectedOrder(null);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Orders Management</h1>
          <p className="text-slate-500">Track and fulfill your customer purchases.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search Order ID or customer..." 
            className="pl-10 h-11 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="flex border border-slate-200 rounded-xl overflow-hidden shadow-sm">
             <Button variant="ghost" className="h-11 rounded-none bg-indigo-50 text-primary border-r font-bold text-xs px-4">All</Button>
             <Button variant="ghost" className="h-11 rounded-none text-slate-400 hover:text-primary border-r font-bold text-xs px-4">Pending</Button>
             <Button variant="ghost" className="h-11 rounded-none text-slate-400 hover:text-primary font-bold text-xs px-4">Shipped</Button>
          </div>
          <Button variant="outline" className="h-11 rounded-xl border-slate-200">
            <Filter className="h-4 w-4 mr-2" /> More
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="group hover:bg-slate-50/30 transition-colors">
                <TableCell 
                  className="font-black text-primary group-hover:underline cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  {order.id}
                </TableCell>
                <TableCell>
                   <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold">JD</div>
                      <span className="font-medium">John Doe</span>
                   </div>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">{order.date}</TableCell>
                <TableCell>
                  <Badge className={cn(
                    "font-bold",
                    order.status === 'Delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                    order.status === 'Shipped' ? "bg-blue-50 text-blue-600 border-blue-100" :
                    "bg-amber-50 text-amber-600 border-amber-100"
                  )}>
                    {order.status === 'Delivered' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                    {order.status === 'Shipped' && <Truck className="h-3 w-3 mr-1" />}
                    {order.status === 'Processing' && <Clock className="h-3 w-3 mr-1" />}
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500">{order.items} products</TableCell>
                <TableCell className="font-bold">${order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-50">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-xl border-slate-100">
                      <DropdownMenuLabel>Fulfillment</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="rounded-lg px-3 py-2 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                        <ExternalLink className="h-4 w-4 mr-2 text-slate-400" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg px-3 py-2 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                        <Truck className="h-4 w-4 mr-2 text-slate-400" /> Mark as Shipped
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="rounded-lg px-3 py-2 cursor-pointer text-destructive focus:text-destructive">
                        <XCircle className="h-4 w-4 mr-2" /> Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Detail View Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl overflow-hidden p-0 rounded-2xl">
          <div className="bg-slate-50 p-6 border-b">
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-headline font-bold">{selectedOrder?.id}</h2>
                      <Badge className="bg-amber-50 text-amber-600 border-amber-100 font-bold">{selectedOrder?.status}</Badge>
                   </div>
                   <p className="text-sm text-slate-400">Placed on {selectedOrder?.date} • Via Storefront</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Amount</p>
                   <p className="text-3xl font-black text-primary">${selectedOrder?.total.toFixed(2)}</p>
                </div>
             </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-h-[60vh] overflow-y-auto">
             {/* Left: Customer & Items */}
             <div className="space-y-8">
                <div className="space-y-4">
                   <div className="flex items-center space-x-2 text-primary">
                      <User className="h-4 w-4" />
                      <span className="text-sm font-bold uppercase tracking-widest">Customer Details</span>
                   </div>
                   <div className="bg-white border rounded-xl p-4 space-y-2">
                      <p className="font-bold">John Doe</p>
                      <p className="text-xs text-slate-500">john.doe@example.com</p>
                      <p className="text-xs text-slate-500">+1 (555) 000-0000</p>
                      <Separator className="my-2" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Shipping To</p>
                      <p className="text-xs text-slate-600">123 Flow Street, Modern City, 12345</p>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center space-x-2 text-primary">
                      <Package className="h-4 w-4" />
                      <span className="text-sm font-bold uppercase tracking-widest">Line Items ({selectedOrder?.items})</span>
                   </div>
                   <div className="space-y-3">
                      {[1, 2].map(i => (
                         <div key={i} className="flex justify-between items-center bg-slate-50/50 p-3 rounded-lg border border-transparent hover:border-indigo-100">
                            <div className="flex items-center space-x-3">
                               <div className="h-10 w-10 bg-white border rounded p-1">
                                  <div className="w-full h-full bg-slate-100 rounded" />
                               </div>
                               <div>
                                  <p className="text-xs font-bold">Premium Watch Variant {i}</p>
                                  <p className="text-[10px] text-slate-400">SKU: CF-WTC-0{i}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-xs font-bold">$74.50</p>
                               <p className="text-[10px] text-slate-400">Qty: 1</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Right: Payment & Fulfillment */}
             <div className="space-y-8">
                <div className="space-y-4">
                   <div className="flex items-center space-x-2 text-primary">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-sm font-bold uppercase tracking-widest">Payment Info</span>
                   </div>
                   <div className="bg-indigo-50/30 border border-indigo-100 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                         <span className="text-xs text-slate-500">Gateway</span>
                         <Badge variant="outline" className="bg-white text-[10px] uppercase">Stripe</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-xs text-slate-500">Transaction ID</span>
                         <span className="text-[10px] font-mono text-slate-400">txn_5A2zR891q</span>
                      </div>
                      <Separator className="bg-indigo-100" />
                      <div className="flex justify-between items-center">
                         <span className="text-xs font-bold">Paid Amount</span>
                         <span className="text-sm font-black text-primary">${selectedOrder?.total.toFixed(2)}</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center space-x-2 text-primary">
                      <History className="h-4 w-4" />
                      <span className="text-sm font-bold uppercase tracking-widest">Order Timeline</span>
                   </div>
                   <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-1 before:bottom-1 before:w-px before:bg-slate-200">
                      <div className="relative">
                         <div className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-primary border-2 border-white" />
                         <p className="text-xs font-bold">Order Confirmed</p>
                         <p className="text-[10px] text-slate-400">10:45 AM, Oct 12</p>
                      </div>
                      <div className="relative">
                         <div className="absolute -left-6 top-1 h-3 w-3 rounded-full bg-slate-200 border-2 border-white" />
                         <p className="text-xs text-slate-400">Processing Payment</p>
                         <p className="text-[10px] text-slate-400">10:46 AM, Oct 12</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <DialogFooter className="p-6 bg-slate-50 border-t flex flex-row justify-between items-center">
             <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-9 rounded-lg font-bold">
                   <Mail className="h-3 w-3 mr-2" /> Contact
                </Button>
                <Button variant="outline" size="sm" className="h-9 rounded-lg font-bold text-destructive">
                   <RefreshCw className="h-3 w-3 mr-2" /> Refund
                </Button>
             </div>
             <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => setSelectedOrder(null)} className="h-10 px-6 rounded-xl font-bold">Close</Button>
                <Button 
                   onClick={handleMarkShipped}
                   disabled={isFulfilling}
                   className="btn-primary h-10 px-8 rounded-xl font-bold"
                >
                   {isFulfilling ? "Fulfilling..." : "Mark as Shipped"}
                </Button>
             </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
