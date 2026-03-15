
"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  ArrowDownRight, 
  Package, 
  AlertTriangle,
  History,
  BarChart3,
  RefreshCw,
  Plus
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const DASHBOARD_VARIANTS = {
  today: {
    kpis: [
      { title: "Total Revenue", value: "$2,420.50", change: "+4.2%", trend: "up", icon: TrendingUp, color: "indigo" },
      { title: "Total Orders", value: "42", change: "+12.1%", trend: "up", icon: ShoppingBag, color: "amber" },
      { title: "Avg. Order Value", value: "$57.63", change: "-2.4%", trend: "down", icon: BarChart3, color: "emerald" },
      { title: "New Customers", value: "12", change: "+8.5%", trend: "up", icon: Users, color: "rose" },
    ],
    sales: [
      { name: "8 AM", revenue: 120 },
      { name: "10 AM", revenue: 450 },
      { name: "12 PM", revenue: 800 },
      { name: "2 PM", revenue: 300 },
      { name: "4 PM", revenue: 500 },
      { name: "6 PM", revenue: 200 },
      { name: "8 PM", revenue: 50 },
    ]
  },
  week: {
    kpis: [
      { title: "Total Revenue", value: "$18,120.00", change: "+15.2%", trend: "up", icon: TrendingUp, color: "indigo" },
      { title: "Total Orders", value: "312", change: "+8.4%", trend: "up", icon: ShoppingBag, color: "amber" },
      { title: "Avg. Order Value", value: "$58.07", change: "+1.2%", trend: "up", icon: BarChart3, color: "emerald" },
      { title: "New Customers", value: "85", change: "+12.1%", trend: "up", icon: Users, color: "rose" },
    ],
    sales: [
      { name: "Mon", revenue: 2100 },
      { name: "Tue", revenue: 2800 },
      { name: "Wed", revenue: 3500 },
      { name: "Thu", revenue: 2200 },
      { name: "Fri", revenue: 4100 },
      { name: "Sat", revenue: 1800 },
      { name: "Sun", revenue: 1620 },
    ]
  },
  month: {
    kpis: [
      { title: "Total Revenue", value: "$74,500.00", change: "+20.1%", trend: "up", icon: TrendingUp, color: "indigo" },
      { title: "Total Orders", value: "1,284", change: "+12.5%", trend: "up", icon: ShoppingBag, color: "amber" },
      { title: "Avg. Order Value", value: "$58.02", change: "-4.2%", trend: "down", icon: BarChart3, color: "emerald" },
      { title: "New Customers", value: "342", change: "+18.7%", trend: "up", icon: Users, color: "rose" },
    ],
    sales: [
      { name: "Week 1", revenue: 15000 },
      { name: "Week 2", revenue: 18500 },
      { name: "Week 3", revenue: 21000 },
      { name: "Week 4", revenue: 20000 },
    ]
  }
};

const CATEGORY_DATA = [
  { name: "Electronics", value: 450, color: "#4f46e5" },
  { name: "Accessories", value: 300, color: "#fbbf24" },
  { name: "Footwear", value: 200, color: "#10b981" },
  { name: "Beauty", value: 150, color: "#e11d48" },
];

const RECENT_ACTIVITY = [
  { id: 1, user: "John Doe", action: "purchased", item: "Celestial Chronograph", time: "2 mins ago" },
  { id: 2, user: "Jane Smith", action: "created", item: "New account", time: "15 mins ago" },
  { id: 3, user: "Mike Ross", action: "purchased", item: "Aura Headphones", time: "45 mins ago" },
  { id: 4, user: "Sarah Connor", action: "added", item: "Saffron Tote to wishlist", time: "1 hour ago" },
  { id: 5, user: "Peter Parker", action: "purchased", item: "Urban Sneakers", time: "3 hours ago" },
];

const INITIAL_LOW_STOCK = [
  { id: "1", title: "Celestial Chronograph", stock: 2, sku: "WTC-CEL-01" },
  { id: "6", title: "Mirrorless Camera", stock: 3, sku: "CAM-MIR-01" },
  { id: "4", title: "Saffron Leather Tote", stock: 5, sku: "BAG-SAF-02" },
];

export default function AdminDashboard() {
  const [range, setRange] = useState<keyof typeof DASHBOARD_VARIANTS>("month");
  const [lowStockItems, setLowStockItems] = useState(INITIAL_LOW_STOCK);
  const { toast } = useToast();
  const activeData = DASHBOARD_VARIANTS[range];

  const handleQuickRestock = (id: string) => {
    setLowStockItems(prev => prev.map(item => 
      item.id === id ? { ...item, stock: item.stock + 10 } : item
    ));
    toast({
      title: "Inventory Updated",
      description: "Successfully added 10 units to stock.",
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Store Overview</h1>
          <p className="text-slate-500">Real-time performance metrics for CartFlow.</p>
        </div>
        <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm">
          {(["today", "week", "month"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                range === r 
                  ? "bg-primary/10 text-primary" 
                  : "text-slate-400 hover:bg-slate-50"
              )}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeData.kpis.map((kpi, i) => (
          <KPIItem 
            key={i}
            title={kpi.title} 
            value={kpi.value} 
            change={kpi.change} 
            trend={kpi.trend} 
            icon={kpi.icon} 
            color={kpi.color} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg font-bold">Revenue Trend</CardTitle>
            <CardDescription>
              {range === 'today' ? 'Hourly' : range === 'week' ? 'Daily' : 'Weekly'} sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeData.sales}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    tickFormatter={(value) => `$${value > 1000 ? (value/1000) + 'k' : value}`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="revenue" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={range === 'month' ? 60 : 40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg font-bold">Sales by Category</CardTitle>
            <CardDescription>Order distribution across departments.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8 flex flex-col items-center">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {CATEGORY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 mt-4">
              {CATEGORY_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-slate-500 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold">{Math.round((item.value / 1100) * 100)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Activity Feed */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Live Activity</CardTitle>
              <CardDescription>Real-time storefront events.</CardDescription>
            </div>
            <History className="h-5 w-5 text-slate-300" />
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[350px]">
              <div className="divide-y divide-slate-50">
                {RECENT_ACTIVITY.map((activity) => (
                  <div key={activity.id} className="p-4 flex items-center space-x-4 hover:bg-slate-50/50 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                      {activity.user.charAt(0)}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">
                        <span className="font-bold">{activity.user}</span> {activity.action} <span className="text-primary font-bold">{activity.item}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{activity.time}</p>
                    </div>
                    <ArrowUpRight className="h-3 w-3 text-slate-300" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Inventory Alerts</CardTitle>
              <CardDescription>Items requiring immediate restock.</CardDescription>
            </div>
            <AlertTriangle className="h-5 w-5 text-amber-400 animate-pulse" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-amber-50/50 border border-amber-100 group">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-white border border-amber-200 flex items-center justify-center">
                      <Package className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{item.title}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest">{item.sku}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-xl font-black text-amber-600">{item.stock}</p>
                      <p className="text-[10px] font-bold text-amber-500 uppercase">Left</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full bg-white border border-amber-200 text-amber-600 hover:bg-amber-100 hover:text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      onClick={() => handleQuickRestock(item.id)}
                      title="Quick Restock +10"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/admin/products" className="block w-full">
                <Button variant="outline" className="w-full py-6 text-xs font-bold text-primary uppercase tracking-widest border-indigo-100 hover:bg-indigo-50 rounded-xl transition-all">
                  Manage Full Inventory
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KPIItem({ title, value, change, trend, icon: Icon, color }: any) {
  const colors: any = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden group">
      <div className={cn("h-1 w-0 group-hover:w-full transition-all duration-500", colors[color].split(' ')[1].replace('text', 'bg'))}></div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2.5 rounded-xl border", colors[color])}>
            <Icon className="h-5 w-5" />
          </div>
          <div className={cn(
            "flex items-center text-xs font-bold px-2 py-1 rounded-full",
            trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {change}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
          <p className="text-2xl font-black text-foreground tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
