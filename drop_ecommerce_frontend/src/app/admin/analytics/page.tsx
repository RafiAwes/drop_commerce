"use client";

import { useState } from "react";
import { 
  Calendar, 
  Download, 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronDown,
  Filter,
  MousePointer2
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const PERFORMANCE_DATA = [
  { date: "Oct 01", revenue: 4200, orders: 45 },
  { date: "Oct 05", revenue: 3800, orders: 40 },
  { date: "Oct 10", revenue: 5100, orders: 58 },
  { date: "Oct 15", revenue: 4600, orders: 52 },
  { date: "Oct 20", revenue: 5800, orders: 65 },
  { date: "Oct 25", revenue: 6200, orders: 70 },
  { date: "Oct 30", revenue: 5400, orders: 60 },
];

const CATEGORY_BREAKDOWN = [
  { name: "Electronics", value: 45, color: "hsl(var(--primary))" },
  { name: "Accessories", value: 30, color: "hsl(var(--accent))" },
  { name: "Footwear", value: 15, color: "#10b981" },
  { name: "Beauty", value: 10, color: "#e11d48" },
];

const TOP_PRODUCTS = [
  { id: "1", name: "Celestial Chronograph", sales: 124, revenue: 37076, growth: "+12%" },
  { id: "2", name: "Aura Headphones", sales: 98, revenue: 18522, growth: "+8%" },
  { id: "3", name: "Urban Sneakers", sales: 85, revenue: 10200, growth: "-2%" },
  { id: "4", name: "Saffron Leather Tote", sales: 42, revenue: 14700, growth: "+15%" },
];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Business Intelligence</h1>
          <p className="text-slate-500">Deep dive into your store's performance metrics.</p>
        </div>
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-11 rounded-xl border-slate-200">
                <Calendar className="h-4 w-4 mr-2" />
                {timeRange}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setTimeRange("Last 7 Days")}>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("Last 30 Days")}>Last 30 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("This Year")}>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="btn-primary h-11 px-6 rounded-xl font-bold">
            <Download className="h-4 w-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsKPI 
          title="Total Revenue" 
          value="$128,430.00" 
          change="+14.2%" 
          trend="up" 
          icon={DollarSign}
        />
        <AnalyticsKPI 
          title="Total Orders" 
          value="2,451" 
          change="+8.1%" 
          trend="up" 
          icon={ShoppingBag}
        />
        <AnalyticsKPI 
          title="Avg. Order Value" 
          value="$52.40" 
          change="-2.4%" 
          trend="down" 
          icon={TrendingUp}
        />
        <AnalyticsKPI 
          title="Conversion Rate" 
          value="3.24%" 
          change="+0.5%" 
          trend="up" 
          icon={MousePointer2}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Revenue vs Orders</CardTitle>
              <CardDescription>Performance trend over the selected period.</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Revenue</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Orders</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Share */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg font-bold">Category Distribution</CardTitle>
            <CardDescription>Market share by department.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8 flex flex-col items-center">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_BREAKDOWN}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CATEGORY_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-4 mt-6">
              {CATEGORY_BREAKDOWN.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Top Performing Products</CardTitle>
              <CardDescription>Ranked by revenue generation.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold">View Catalog</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {TOP_PRODUCTS.map((product) => (
                <div key={product.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-primary font-bold text-xs">
                      {product.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{product.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{product.sales} Sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-foreground">${product.revenue.toLocaleString()}</p>
                    <p className={cn(
                      "text-[10px] font-bold",
                      product.growth.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                    )}>
                      {product.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Acquisition (Horizontal Bar) */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg font-bold">Acquisition Channels</CardTitle>
            <CardDescription>Where your customers are coming from.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-6">
              {[
                { label: "Organic Search", value: 75, color: "bg-indigo-500" },
                { label: "Direct Traffic", value: 54, color: "bg-amber-400" },
                { label: "Social Media", value: 42, color: "bg-emerald-500" },
                { label: "Email Marketing", value: 31, color: "bg-rose-500" },
                { label: "Referrals", value: 18, color: "bg-slate-400" },
              ].map((channel) => (
                <div key={channel.label} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>{channel.label}</span>
                    <span className="text-slate-600">{channel.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full rounded-full transition-all duration-1000", channel.color)}
                      style={{ width: `${channel.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">Conversion Optimization</p>
                  <p className="text-[10px] text-slate-500">Search traffic is up 12% this month.</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-8 text-[10px] font-bold uppercase border-indigo-200 text-primary">Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AnalyticsKPI({ title, value, change, trend, icon: Icon }: any) {
  return (
    <Card className="border-slate-200 shadow-sm group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
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
