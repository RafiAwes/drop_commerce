
"use client";

import { useState } from "react";
import { User, Mail, Shield, Camera, Save, Key, Lock, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminProfilePage() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  
  // Profile Info State
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Password Change State
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveProfile = () => {
    updateProfile(formData);
    toast({
      title: "Profile Updated",
      description: "Admin credentials have been saved successfully.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.new !== passwordForm.confirm) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "New passwords do not match.",
      });
      return;
    }

    setIsChangingPassword(true);
    
    // Simulate API call to change master password
    setTimeout(() => {
      toast({
        title: "Security Updated",
        description: "Master password has been changed successfully.",
      });
      setIsChangingPassword(false);
      setIsPasswordDialogOpen(false);
      setPasswordForm({ current: "", new: "", confirm: "" });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-headline font-bold">Admin Profile</h1>
          <p className="text-slate-500">Manage your administrative identity and security.</p>
        </div>
        <Badge className="bg-primary text-white h-6 px-4 font-bold uppercase tracking-widest text-[10px]">
          <Shield className="h-3 w-3 mr-1" /> Superadmin
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1 border-slate-200">
          <CardContent className="pt-8 flex flex-col items-center text-center">
            <div className="relative group mb-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-2xl font-bold bg-indigo-50 text-primary">{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h3 className="font-bold text-lg">{user?.name}</h3>
            <p className="text-sm text-slate-500 mb-4">{user?.email}</p>
            <div className="w-full pt-6 border-t space-y-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Session Login</p>
              <p className="text-xs font-medium">March 12, 2024 - 10:45 AM</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-xl font-bold">Identity Details</CardTitle>
            <CardDescription>Primary contact info for this admin session.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="admin-name">Full Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="admin-name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="pl-10 h-11"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    id="admin-email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10 h-11"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              <h4 className="text-sm font-bold flex items-center space-x-2">
                <Key className="h-4 w-4 text-primary" />
                <span>Security Credentials</span>
              </h4>
              <div className="p-4 rounded-xl border bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">Master Password</p>
                  <p className="text-xs text-slate-500">Last changed 4 months ago</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 rounded-lg font-bold"
                  onClick={() => setIsPasswordDialogOpen(true)}
                >
                  Change
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-slate-50/50 justify-end p-6">
            <Button onClick={handleSaveProfile} className="btn-primary px-8 rounded-xl font-bold">
              <Save className="h-4 w-4 mr-2" /> Save Profile
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">Change Master Password</DialogTitle>
            <DialogDescription>
              Update the primary access key for the Admin Terminal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePasswordChange} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-pass">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="current-pass" 
                  type="password" 
                  className="pl-10 h-11"
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-pass">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="new-pass" 
                  type="password" 
                  className="pl-10 h-11"
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pass">Confirm New Password</Label>
              <div className="relative">
                <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  id="confirm-pass" 
                  type="password" 
                  className="pl-10 h-11"
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                  required 
                />
              </div>
            </div>

            <DialogFooter className="pt-6 gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                className="font-bold"
                onClick={() => setIsPasswordDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="btn-primary px-6 font-bold" 
                disabled={isChangingPassword}
              >
                {isChangingPassword ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Update Key
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
