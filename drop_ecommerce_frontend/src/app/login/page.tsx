"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check for Admin Credentials
      if (formData.email === 'admin@cartflow.io' && formData.password === 'admin123') {
        login({
          id: 'admin-1',
          name: 'Alex Johnson',
          email: formData.email,
          role: 'admin',
          avatar: 'https://picsum.photos/seed/admin/200/200'
        });
        toast({
          title: "Admin Access Granted",
          description: "Welcome to the command center.",
        });
        router.push('/admin');
      } else if (formData.email && formData.password) {
        // Standard User Login
        login({
          id: '1',
          name: 'John Doe',
          email: formData.email,
          role: 'user'
        });
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        router.push('/account');
      } else {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Please check your credentials and try again.",
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[80vh]">
      <Card className="w-full max-w-md shadow-2xl border-indigo-50 dark:border-slate-800 dark:bg-slate-900/50">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-headline font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 h-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary font-bold hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 py-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-xs font-medium cursor-pointer">Remember me for 30 days</Label>
            </div>
            <Button type="submit" className="w-full btn-primary h-12 text-base font-bold" disabled={loading}>
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-bold transition-colors">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 border-slate-200 dark:border-slate-800">
              Google
            </Button>
            <Button variant="outline" className="h-11 border-slate-200 dark:border-slate-800">
              Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t border-slate-50 dark:border-slate-800 pt-6">
          <p className="text-sm text-center text-slate-500">
            Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Create one now</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
