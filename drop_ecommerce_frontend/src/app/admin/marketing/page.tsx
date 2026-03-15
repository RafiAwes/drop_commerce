"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  MousePointer2,
  Megaphone,
  Layout,
  ArrowRight,
  Globe,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function AdminMarketingPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Marketing & Storefront</h1>
          <p className="text-slate-500">Manage your brand presentation and customer communication.</p>
        </div>
        <Button className="btn-primary h-12 px-6 rounded-xl font-bold shadow-lg shadow-indigo-200">
          <Plus className="h-4 w-4 mr-2" /> New Campaign
        </Button>
      </div>

      <Tabs defaultValue="storefront" className="space-y-8">
        <TabsList className="bg-white border p-1 rounded-xl shadow-sm">
          <TabsTrigger value="storefront" className="rounded-lg font-bold data-[state=active]:bg-indigo-50 data-[state=active]:text-primary px-8">
            <Layout className="h-4 w-4 mr-2" /> Storefront CMS
          </TabsTrigger>
          <TabsTrigger value="seo" className="rounded-lg font-bold data-[state=active]:bg-indigo-50 data-[state=active]:text-primary px-8">
            <Globe className="h-4 w-4 mr-2" /> SEO Global
          </TabsTrigger>
        </TabsList>

        <TabsContent value="storefront" className="space-y-8 animate-in fade-in duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Homepage Banners */}
              <Card className="border-slate-200 shadow-sm">
                 <CardHeader>
                    <div className="flex items-center space-x-2">
                       <Megaphone className="h-5 w-5 text-primary" />
                       <CardTitle className="text-lg font-bold">Promo Banners</CardTitle>
                    </div>
                    <CardDescription>Update announcements across your site.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    {[
                       { title: "Black Friday Sale", active: true, color: "bg-black" },
                       { title: "Newsletter Signup", active: false, color: "bg-indigo-600" },
                       { title: "Free Shipping Worldwide", active: true, color: "bg-emerald-500" }
                    ].map((banner, i) => (
                       <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-slate-50/50">
                          <div className="flex items-center space-x-4">
                             <div className={cn("h-8 w-12 rounded shadow-sm", banner.color)} />
                             <div>
                                <p className="text-sm font-bold">{banner.title}</p>
                                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{banner.active ? 'Live Now' : 'Draft'}</p>
                             </div>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-lg font-bold text-xs h-8">Edit</Button>
                       </div>
                    ))}
                    <Button variant="ghost" className="w-full text-primary font-bold text-xs mt-2">
                       <Plus className="h-3 w-3 mr-2" /> Add New Announcement
                    </Button>
                 </CardContent>
              </Card>

              {/* Featured Carousel Control */}
              <Card className="border-slate-200 shadow-sm">
                 <CardHeader>
                    <div className="flex items-center space-x-2">
                       <MousePointer2 className="h-5 w-5 text-primary" />
                       <CardTitle className="text-lg font-bold">Featured Selections</CardTitle>
                    </div>
                    <CardDescription>Curate items for the homepage hero carousel.</CardDescription>
                 </CardHeader>
                 <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                       {[1, 2, 3, 4].map(i => (
                          <div key={i} className="relative aspect-video rounded-xl border-2 border-slate-100 overflow-hidden group cursor-pointer">
                             <div className="absolute inset-0 bg-slate-200 animate-pulse group-hover:bg-primary/5 transition-colors" />
                             <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                                <p className="text-white text-[10px] font-bold truncate">Featured Product Slot {i}</p>
                             </div>
                             <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="secondary" size="icon" className="h-7 w-7 rounded-lg"><Plus className="h-4 w-4" /></Button>
                             </div>
                          </div>
                       ))}
                    </div>
                    <Button className="w-full btn-primary h-11 mt-6 rounded-xl font-bold">
                       Sync Storefront <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="seo" className="animate-in fade-in duration-500">
           <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                 <div className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-bold">Global SEO Defaults</CardTitle>
                 </div>
                 <CardDescription>Set fallback metadata for search engines and social sharing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <p className="text-sm font-bold">Site Title Suffix</p>
                    <input 
                       className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-1 focus:ring-primary text-sm"
                       placeholder="e.g. | CartFlow Premium"
                    />
                 </div>
                 <div className="space-y-2">
                    <p className="text-sm font-bold">Default Meta Description</p>
                    <textarea 
                       className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-1 focus:ring-primary text-sm min-h-[100px]"
                       placeholder="Discover the finest curated collections..."
                    />
                 </div>
                 <Button className="btn-primary h-11 px-8 rounded-xl font-bold">Save SEO Defaults</Button>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
