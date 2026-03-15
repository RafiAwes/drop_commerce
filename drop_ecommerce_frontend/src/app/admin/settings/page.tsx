"use client";

import { useState } from "react";
import { 
  Settings, 
  Store, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Users, 
  Save,
  Globe,
  DollarSign,
  Mail,
  LocateFixed
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings Updated",
        description: "Global store configurations have been saved successfully.",
      });
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Global Configuration</h1>
          <p className="text-slate-500">Core foundation and behavioral settings for CartFlow.</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary h-12 px-8 rounded-xl font-bold shadow-lg shadow-indigo-200"
        >
          {isSaving ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
        </Button>
      </div>

      <Tabs defaultValue="general" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
            <TabsList className="flex flex-col items-stretch h-auto bg-transparent p-0 space-y-1">
              <TabsTrigger value="general" className="justify-start px-4 h-11 text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-primary font-medium rounded-xl border-none">
                <Store className="h-4 w-4 mr-3" /> General Store
              </TabsTrigger>
              <TabsTrigger value="shipping" className="justify-start px-4 h-11 text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-primary font-medium rounded-xl border-none">
                <Truck className="h-4 w-4 mr-3" /> Shipping & Tax
              </TabsTrigger>
              <TabsTrigger value="payments" className="justify-start px-4 h-11 text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-primary font-medium rounded-xl border-none">
                <CreditCard className="h-4 w-4 mr-3" /> Payment Gateways
              </TabsTrigger>
              <TabsTrigger value="permissions" className="justify-start px-4 h-11 text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-primary font-medium rounded-xl border-none">
                <ShieldCheck className="h-4 w-4 mr-3" /> Staff & RBAC
              </TabsTrigger>
            </TabsList>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <TabsContent value="general" className="m-0 space-y-6 animate-in fade-in duration-500">
            <Card className="border-slate-200 shadow-sm">
               <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-xl font-headline font-bold">Store Identity</CardTitle>
                  <CardDescription>Primary identification for your commerce instance.</CardDescription>
               </CardHeader>
               <CardContent className="pt-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <Label htmlFor="st-name" className="font-bold">Public Store Name</Label>
                        <Input id="st-name" defaultValue="CartFlow Premium" className="h-11" />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="st-email" className="font-bold">Contact Email</Label>
                        <div className="relative">
                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                           <Input id="st-email" defaultValue="support@cartflow.io" className="pl-10 h-11" />
                        </div>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <Label className="font-bold">Currency</Label>
                        <Select defaultValue="usd">
                           <SelectTrigger className="h-11">
                              <SelectValue placeholder="USD" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="usd">USD ($)</SelectItem>
                              <SelectItem value="eur">EUR (€)</SelectItem>
                              <SelectItem value="gbp">GBP (£)</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label className="font-bold">Time Zone</Label>
                        <Select defaultValue="pst">
                           <SelectTrigger className="h-11">
                              <SelectValue placeholder="UTC-8 (PST)" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="pst">UTC-8 (PST)</SelectItem>
                              <SelectItem value="utc">UTC (GMT)</SelectItem>
                              <SelectItem value="est">UTC-5 (EST)</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                     <div className="space-y-2">
                        <Label className="font-bold">Measurement</Label>
                        <Select defaultValue="metric">
                           <SelectTrigger className="h-11">
                              <SelectValue placeholder="Metric (kg/cm)" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="metric">Metric (kg/cm)</SelectItem>
                              <SelectItem value="imperial">Imperial (lb/in)</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
               <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-xl font-headline font-bold">Maintenance & Visibility</CardTitle>
               </CardHeader>
               <CardContent className="pt-8 space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <p className="text-sm font-bold">Maintenance Mode</p>
                        <p className="text-xs text-slate-500">Hides the storefront from public access during updates.</p>
                     </div>
                     <Switch />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <p className="text-sm font-bold">Robots Indexing</p>
                        <p className="text-xs text-slate-500">Allows search engines like Google to crawl your products.</p>
                     </div>
                     <Switch defaultChecked />
                  </div>
               </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="m-0 space-y-6 animate-in fade-in duration-500">
             <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-50">
                   <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-headline font-bold">Shipping Zones</CardTitle>
                      <Button variant="outline" size="sm" className="rounded-xl border-primary text-primary font-bold h-9">
                         Add Zone
                      </Button>
                   </div>
                </CardHeader>
                <CardContent className="p-0">
                   <div className="divide-y">
                      {[
                         { region: "North America", countries: "USA, Canada, Mexico", rate: "$0.00 (Free)" },
                         { region: "European Union", countries: "France, Germany, Italy...", rate: "Flat $15.00" },
                         { region: "Rest of World", countries: "All other regions", rate: "Calculated" }
                      ].map((zone, i) => (
                         <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                            <div className="flex items-center space-x-4">
                               <div className="p-2.5 bg-indigo-50 text-primary rounded-xl">
                                  <LocateFixed className="h-5 w-5" />
                               </div>
                               <div>
                                  <p className="text-sm font-bold">{zone.region}</p>
                                  <p className="text-xs text-slate-400">{zone.countries}</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-sm font-black text-foreground">{zone.rate}</p>
                               <button className="text-[10px] font-bold text-primary uppercase hover:underline">Edit Rates</button>
                            </div>
                         </div>
                      ))}
                   </div>
                </CardContent>
             </Card>

             <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-50">
                   <CardTitle className="text-xl font-headline font-bold">Taxation Profiles</CardTitle>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <p className="text-sm font-bold">Automated VAT Calculation</p>
                         <p className="text-xs text-slate-500">Automatically calculate taxes based on customer location.</p>
                      </div>
                      <Switch defaultChecked />
                   </div>
                   <div className="space-y-4 pt-2">
                      <Label className="font-bold text-xs uppercase text-slate-400 tracking-widest">Base Tax Percentages</Label>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border">
                            <span className="text-xs font-bold text-slate-500 w-12">USA</span>
                            <Input defaultValue="7.5" className="h-8 text-xs text-right" />
                            <span className="text-xs font-bold">%</span>
                         </div>
                         <div className="flex items-center space-x-2 bg-slate-50 p-3 rounded-lg border">
                            <span className="text-xs font-bold text-slate-500 w-12">EU</span>
                            <Input defaultValue="20.0" className="h-8 text-xs text-right" />
                            <span className="text-xs font-bold">%</span>
                         </div>
                      </div>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="payments" className="m-0 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                   { name: "Stripe", status: "Connected", desc: "Credit Card & Apple Pay", active: true },
                   { name: "PayPal", status: "Active", desc: "Digital wallet processing", active: true },
                   { name: "Afterpay", status: "Not Setup", desc: "Buy now, pay later", active: false },
                   { name: "Coinbase", status: "Disabled", desc: "Crypto payments", active: false }
                ].map((gate, i) => (
                   <Card key={i} className={cn("border-slate-200 transition-all", gate.active ? "bg-white shadow-sm" : "bg-slate-50/50 opacity-60")}>
                      <CardContent className="p-6">
                         <div className="flex justify-between items-start mb-6">
                            <div className="h-10 w-16 bg-slate-100 rounded border flex items-center justify-center font-black text-[10px] text-slate-400 uppercase">
                               {gate.name}
                            </div>
                            <Badge className={cn("font-bold text-[10px]", gate.active ? "bg-emerald-50 text-emerald-600" : "bg-slate-200 text-slate-500")}>
                               {gate.status}
                            </Badge>
                         </div>
                         <h3 className="font-bold text-sm">{gate.name} Payments</h3>
                         <p className="text-xs text-slate-400 mb-6">{gate.desc}</p>
                         <Button variant={gate.active ? "outline" : "default"} className="w-full h-10 rounded-xl font-bold text-xs">
                            {gate.active ? 'Configure Gateway' : 'Setup Now'}
                         </Button>
                      </CardContent>
                   </Card>
                ))}
             </div>
          </TabsContent>

          <TabsContent value="permissions" className="m-0 space-y-6">
             <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
                   <div>
                      <CardTitle className="text-xl font-headline font-bold">Admin Staff</CardTitle>
                      <CardDescription>Manage user roles and dashboard accessibility.</CardDescription>
                   </div>
                   <Button className="btn-primary h-10 px-6 rounded-xl font-bold">Invite Admin</Button>
                </CardHeader>
                <CardContent className="p-0">
                   <div className="divide-y">
                      {[
                         { name: "Alex Johnson", email: "alex@cartflow.io", role: "Superadmin", color: "indigo" },
                         { name: "Sarah Miller", email: "sarah.m@cartflow.io", role: "Editor", color: "amber" },
                         { name: "James Wilson", email: "support@cartflow.io", role: "Support", color: "emerald" }
                      ].map((staff, i) => (
                         <div key={i} className="p-6 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                               <div className={cn("h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-xs", 
                                  staff.role === 'Superadmin' ? 'bg-primary' : 
                                  staff.role === 'Editor' ? 'bg-amber-500' : 'bg-emerald-500'
                               )}>
                                  {staff.name.charAt(0)}
                               </div>
                               <div>
                                  <p className="text-sm font-bold">{staff.name}</p>
                                  <p className="text-xs text-slate-400">{staff.email}</p>
                               </div>
                            </div>
                            <div className="flex items-center space-x-6">
                               <Badge className={cn("font-bold text-[10px]", 
                                  staff.role === 'Superadmin' ? "bg-indigo-50 text-primary" : 
                                  staff.role === 'Editor' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                               )}>
                                  {staff.role}
                               </Badge>
                               <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300"><Settings className="h-4 w-4" /></Button>
                            </div>
                         </div>
                      ))}
                   </div>
                </CardContent>
             </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
