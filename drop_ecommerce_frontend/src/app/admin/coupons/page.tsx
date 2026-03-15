"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Tag, 
  Calendar, 
  Trash2, 
  Edit, 
  Copy,
  CheckCircle2,
  Clock,
  AlertCircle
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
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const MOCK_COUPONS = [
  { id: "1", code: "FLOW20", type: "Percentage", value: "20%", usage: 45, limit: 100, status: "Active", expires: "Oct 30, 2023" },
  { id: "2", code: "SAVE10", type: "Fixed Amount", value: "$10.00", usage: 82, limit: 200, status: "Active", expires: "Nov 15, 2023" },
  { id: "3", code: "WELCOME", type: "Percentage", value: "15%", usage: 124, limit: 500, status: "Active", expires: "Dec 31, 2023" },
  { id: "4", code: "EXPIRED50", type: "Percentage", value: "50%", usage: 50, limit: 50, status: "Expired", expires: "Sep 01, 2023" },
];

export default function AdminCouponsPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [coupons, setCoupons] = useState(MOCK_COUPONS);

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied",
      description: `${code} has been copied to your clipboard.`,
    });
  };

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter(c => c.id !== id));
    toast({
      title: "Coupon Deleted",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Coupon Engine</h1>
          <p className="text-slate-500">Create and manage promotional codes to drive conversions.</p>
        </div>
        <Button 
          onClick={() => setIsCreateOpen(true)}
          className="btn-primary h-12 px-6 rounded-xl font-bold shadow-lg shadow-indigo-200"
        >
          <Plus className="h-4 w-4 mr-2" /> Generate New Code
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            placeholder="Search coupon codes..." 
            className="w-full pl-10 h-11 bg-slate-50 border-none rounded-xl focus:ring-1 focus:ring-primary outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Button variant="outline" className="h-11 rounded-xl border-slate-200">
            <Filter className="h-4 w-4 mr-2" /> All Status
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Code</TableHead>
              <TableHead>Type & Value</TableHead>
              <TableHead>Usage Tracking</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.map((coupon) => (
              <TableRow key={coupon.id} className="group hover:bg-slate-50/30 transition-colors">
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="bg-indigo-50 text-primary font-black px-3 py-1 rounded-lg text-xs tracking-wider">
                      {coupon.code}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-300 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleCopy(coupon.code)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-bold">{coupon.value}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-medium">{coupon.type}</p>
                  </div>
                </TableCell>
                <TableCell className="min-w-[200px]">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>{coupon.usage} used</span>
                      <span>Limit: {coupon.limit}</span>
                    </div>
                    <Progress value={(coupon.usage / coupon.limit) * 100} className="h-1.5" />
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium text-slate-600">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-2 text-slate-400" />
                    {coupon.expires}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn(
                    "font-bold",
                    coupon.status === 'Active' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                    coupon.status === 'Expired' ? "bg-rose-50 text-rose-600 border-rose-100" :
                    "bg-slate-50 text-slate-500 border-slate-100"
                  )}>
                    {coupon.status === 'Active' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                    {coupon.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-50">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 shadow-xl border-slate-100">
                      <DropdownMenuItem className="rounded-lg px-3 py-2 cursor-pointer">
                        <Edit className="h-4 w-4 mr-2 text-slate-400" /> Edit Rules
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg px-3 py-2 cursor-pointer">
                        <Clock className="h-4 w-4 mr-2 text-slate-400" /> View History
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="rounded-lg px-3 py-2 cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => handleDelete(coupon.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Coupon
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">New Coupon Code</DialogTitle>
            <DialogDescription>Configure discount parameters and usage restrictions.</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
             <div className="space-y-4">
                <div className="space-y-2">
                   <Label htmlFor="c-code" className="font-bold">Coupon Code</Label>
                   <Input id="c-code" placeholder="e.g. FLASH50" className="h-11 font-mono uppercase" />
                </div>
                <div className="space-y-2">
                   <Label className="font-bold">Discount Type</Label>
                   <Select defaultValue="perc">
                      <SelectTrigger className="h-11">
                         <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                         <SelectItem value="perc">Percentage Discount (%)</SelectItem>
                         <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                         <SelectItem value="ship">Free Shipping</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                <div className="space-y-2">
                   <Label htmlFor="c-val" className="font-bold">Discount Value</Label>
                   <Input id="c-val" type="number" placeholder="20" className="h-11" />
                </div>
             </div>

             <div className="space-y-4">
                <div className="space-y-2">
                   <Label htmlFor="c-limit" className="font-bold">Usage Limit</Label>
                   <Input id="c-limit" type="number" placeholder="100" className="h-11" />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="c-min" className="font-bold">Min. Spend Requirement ($)</Label>
                   <Input id="c-min" type="number" placeholder="0.00" className="h-11" />
                </div>
                <div className="space-y-2">
                   <Label htmlFor="c-exp" className="font-bold">Expiry Date</Label>
                   <Input id="c-exp" type="date" className="h-11" />
                </div>
             </div>
          </div>

          <DialogFooter className="pt-8 gap-2">
             <Button variant="ghost" onClick={() => setIsCreateOpen(false)} className="h-11 px-6 rounded-xl font-bold">Cancel</Button>
             <Button className="btn-primary h-11 px-8 rounded-xl font-bold">Save Coupon</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
