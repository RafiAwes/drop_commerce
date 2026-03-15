"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { CommandMenu } from "@/components/admin/CommandMenu";
import { useAuth } from "@/lib/store";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Admin Auth
    setTimeout(() => {
      if (formData.email === 'admin@cartflow.io' && formData.password === 'admin123') {
        login({
          id: 'admin-1',
          name: 'Alex Johnson',
          email: formData.email,
          role: 'admin',
          avatar: 'https://picsum.photos/seed/admin/200/200'
        });
        toast({ title: "Admin Access Granted", description: "Welcome back to the command center." });
        router.push('/admin');
      } else {
        toast({ 
          variant: "destructive", 
          title: "Access Denied", 
          description: "Invalid admin credentials." 
        });
      }
      setLoading(false);
    }, 1200);
  };

  // If not authenticated or not an admin, show the admin login screen
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
        <Card className="w-full max-w-md shadow-2xl border-slate-800 bg-slate-950 text-slate-200">
          <CardHeader className="space-y-1 text-center border-b border-slate-800 pb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold mx-auto mb-4 text-xl">C</div>
            <CardTitle className="text-2xl font-headline font-bold text-white">Admin Terminal</CardTitle>
            <CardDescription className="text-slate-500">Authorized personnel only</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-slate-400">Admin Identifier</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                  <Input 
                    id="admin-email" 
                    type="email" 
                    placeholder="admin@cartflow.io" 
                    className="pl-10 h-12 bg-slate-900 border-slate-800 text-white placeholder:text-slate-700"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-pass" className="text-slate-400">Access Key</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                  <Input 
                    id="admin-pass" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 bg-slate-900 border-slate-800 text-white placeholder:text-slate-700"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full btn-primary h-12 font-bold" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Initialize Session <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>
          </CardContent>
          <div className="p-4 text-center border-t border-slate-800">
            <p className="text-[10px] text-slate-600 font-mono uppercase tracking-tighter">System ID: CF-ADM-X92 • Encryption: AES-256</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50">
        <AdminSidebar />
        <SidebarInset className="flex flex-col">
          <AdminHeader onOpenSearch={() => setOpen(true)} />
          <main className="flex-1 p-4 md:p-8 animate-in fade-in duration-500">
            {children}
          </main>
        </SidebarInset>
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </SidebarProvider>
  );
}
