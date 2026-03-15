"use client";

import { useState } from 'react';
import { useAuth, MOCK_ORDERS, MOCK_ADDRESSES, MOCK_PAYMENTS } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { 
  Package, 
  MapPin, 
  User as UserIcon, 
  LogOut, 
  Settings, 
  CreditCard, 
  ChevronRight, 
  CheckCircle2, 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Bell, 
  ShieldCheck, 
  CircleUser,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function AccountPage() {
  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  if (!isAuthenticated) {
     return (
        <div className="container mx-auto px-4 py-32 text-center space-y-8 animate-in fade-in duration-700">
           <div className="inline-flex p-6 bg-indigo-50 rounded-full text-primary">
              <UserIcon className="h-12 w-12" />
           </div>
           <div className="space-y-2">
              <h1 className="text-4xl font-headline font-bold">Account Dashboard</h1>
              <p className="text-slate-500 max-w-md mx-auto">Sign in to track orders, manage your profile, and access exclusive member benefits.</p>
           </div>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/login">
                <Button className="btn-primary px-10 h-12 text-base font-bold w-full sm:w-auto">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="px-10 h-12 text-base font-bold w-full sm:w-auto border-slate-200">Register</Button>
              </Link>
           </div>
        </div>
     )
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your information has been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center space-x-4">
             <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user?.name.charAt(0)}
             </div>
             <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold">Hello, {user?.name.split(' ')[0]}</h1>
                <p className="text-slate-500 text-sm">Member since Oct 2023 • <span className="text-accent font-bold">Gold Tier</span></p>
             </div>
          </div>
          <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/5 font-bold" onClick={logout}>
             <LogOut className="h-4 w-4 mr-2" />
             Sign Out
          </Button>
       </div>

       <Tabs defaultValue="profile" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 my-4 px-4">Account Menu</p>
              <TabsList className="flex flex-col items-stretch h-auto bg-transparent p-0 space-y-1">
                <TabsTrigger value="profile" className="justify-start px-4 h-11 text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-primary font-medium rounded-xl border-none">
                    <UserIcon className="h-4 w-4 mr-3" /> Profile Info
                </TabsTrigger>
                <TabsTrigger value="orders" className="justify-start px-4 h-11 text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-primary font-medium rounded-xl border-none">
                    <Package className="h-4 w-4 mr-3" /> Order History
                </TabsTrigger>
                <TabsTrigger value="addresses" className="justify-start px-4 h-11 text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-primary font-medium rounded-xl border-none">
                    <MapPin className="h-4 w-4 mr-3" /> Saved Addresses
                </TabsTrigger>
                <TabsTrigger value="payment" className="justify-start px-4 h-11 text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-primary font-medium rounded-xl border-none">
                    <CreditCard className="h-4 w-4 mr-3" /> Payment Methods
                </TabsTrigger>
                <TabsTrigger value="settings" className="justify-start px-4 h-11 text-sm data-[state=active]:bg-indigo-50 data-[state=active]:text-primary font-medium rounded-xl border-none">
                    <Settings className="h-4 w-4 mr-3" /> Account Settings
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
             {/* Statistics Cards */}
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <Card className="bg-white border-slate-100 shadow-sm overflow-hidden group">
                   <div className="h-1 bg-primary w-0 group-hover:w-full transition-all duration-500"></div>
                   <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Orders</p>
                            <p className="text-3xl font-bold">{MOCK_ORDERS.length}</p>
                         </div>
                         <div className="p-3 bg-indigo-50 text-primary rounded-xl">
                            <ShoppingBag className="h-5 w-5" />
                         </div>
                      </div>
                   </CardContent>
                </Card>
                <Card className="bg-white border-slate-100 shadow-sm overflow-hidden group">
                   <div className="h-1 bg-accent w-0 group-hover:w-full transition-all duration-500"></div>
                   <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rewards Points</p>
                            <p className="text-3xl font-bold">2,450</p>
                         </div>
                         <div className="p-3 bg-amber-50 text-accent rounded-xl">
                            <ChevronRight className="h-5 w-5 rotate-45" />
                         </div>
                      </div>
                   </CardContent>
                </Card>
             </div>

             {/* Profile Section */}
             <TabsContent value="profile" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-0">
                <Card className="border-slate-100 shadow-sm">
                   <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50">
                      <div>
                        <CardTitle className="text-xl font-headline font-bold">Personal Information</CardTitle>
                        <CardDescription>Manage your public profile and contact details.</CardDescription>
                      </div>
                      {!isEditing && (
                         <Button variant="ghost" className="text-primary font-bold hover:bg-indigo-50" onClick={() => setIsEditing(true)}>
                            Edit Profile
                         </Button>
                      )}
                   </CardHeader>
                   <CardContent className="pt-8">
                      {isEditing ? (
                         <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="space-y-2">
                                  <Label htmlFor="prof-name">Full Name</Label>
                                  <Input 
                                     id="prof-name" 
                                     value={profileForm.name} 
                                     onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                                     className="h-11"
                                  />
                               </div>
                               <div className="space-y-2">
                                  <Label htmlFor="prof-email">Email Address</Label>
                                  <Input 
                                     id="prof-email" 
                                     type="email" 
                                     value={profileForm.email} 
                                     onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                                     className="h-11"
                                  />
                               </div>
                               <div className="space-y-2">
                                  <Label htmlFor="prof-phone">Phone Number</Label>
                                  <Input 
                                     id="prof-phone" 
                                     placeholder="+1 (555) 000-0000" 
                                     value={profileForm.phone} 
                                     onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                                     className="h-11"
                                  />
                               </div>
                               <div className="space-y-2">
                                  <Label htmlFor="prof-addr">Primary Address</Label>
                                  <Input 
                                     id="prof-addr" 
                                     placeholder="123 Street, City" 
                                     value={profileForm.address} 
                                     onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                                     className="h-11"
                                  />
                               </div>
                            </div>
                            <div className="flex space-x-3 pt-4">
                               <Button type="submit" className="btn-primary px-8 font-bold">Save Changes</Button>
                               <Button variant="ghost" onClick={() => setIsEditing(false)} className="px-8 font-bold">Cancel</Button>
                            </div>
                         </form>
                      ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-1">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                               <p className="font-medium text-lg">{user?.name}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                               <p className="font-medium text-lg">{user?.email}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                               <p className="font-medium text-lg">{user?.phone || 'Not provided'}</p>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Shipping Address</p>
                               <p className="font-medium text-lg">{user?.address || 'Not provided'}</p>
                            </div>
                         </div>
                      )}
                   </CardContent>
                </Card>
             </TabsContent>

             {/* Orders Section */}
             <TabsContent value="orders" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 m-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-headline font-bold">Order History</h3>
                  <Button variant="ghost" className="text-primary text-sm font-bold">View All</Button>
                </div>
                <div className="space-y-4">
                   {MOCK_ORDERS.map((order) => (
                      <Card key={order.id} className="border-slate-100 shadow-sm hover:border-primary/20 transition-all group">
                         <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                               <div className="flex items-center space-x-4">
                                  <div className="bg-indigo-50 p-4 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                     <Package className="h-6 w-6" />
                                  </div>
                                  <div>
                                     <p className="font-bold">{order.id}</p>
                                     <p className="text-xs text-slate-500">Placed on {order.date} • {order.items} items</p>
                                  </div>
                               </div>
                               <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                                  <div className="text-right">
                                     <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                                     <Badge className={
                                        order.status === 'Delivered' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                        order.status === 'Shipped' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                        "bg-amber-50 text-amber-600 border-amber-100"
                                     }>
                                        {order.status}
                                     </Badge>
                                  </div>
                                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-indigo-50">
                                     <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                                  </Button>
                               </div>
                            </div>
                         </CardContent>
                      </Card>
                   ))}
                </div>
             </TabsContent>

             {/* Addresses Section */}
             <TabsContent value="addresses" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 m-0">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-headline font-bold">Saved Addresses</h3>
                   <Button variant="outline" className="border-primary text-primary font-bold rounded-xl">
                      <Plus className="h-4 w-4 mr-2" /> Add New Address
                   </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {MOCK_ADDRESSES.map((addr) => (
                      <Card key={addr.id} className={`relative overflow-hidden ${addr.isDefault ? 'border-primary bg-indigo-50/20' : 'border-slate-100'}`}>
                         {addr.isDefault && (
                            <div className="absolute top-4 right-4 text-primary">
                               <CheckCircle2 className="h-5 w-5" />
                            </div>
                         )}
                         <CardContent className="p-6 pt-8 space-y-4">
                            <div className="space-y-1">
                               <div className="flex items-center space-x-2 mb-2">
                                  <p className="font-bold">{addr.label}</p>
                                  {addr.isDefault && <Badge variant="outline" className="text-[8px] h-4 bg-white">Default</Badge>}
                               </div>
                               <p className="text-sm text-slate-800 font-medium">{addr.name}</p>
                               <p className="text-sm text-slate-600">{addr.street}</p>
                               <p className="text-sm text-slate-600">{addr.city}, {addr.state} {addr.zip}</p>
                               <p className="text-sm text-slate-600">{addr.country}</p>
                            </div>
                            <div className="flex space-x-4 pt-2">
                               <button className="text-xs text-primary font-bold hover:underline">Edit Address</button>
                               {!addr.isDefault && <button className="text-xs text-slate-400 font-bold hover:underline">Set as Default</button>}
                               <button className="text-xs text-destructive/60 font-bold hover:underline ml-auto flex items-center">
                                  <Trash2 className="h-3 w-3 mr-1" /> Remove
                               </button>
                            </div>
                         </CardContent>
                      </Card>
                   ))}
                </div>
             </TabsContent>

             {/* Payment Methods Section */}
             <TabsContent value="payment" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 m-0">
                <div className="flex justify-between items-center">
                   <h3 className="text-xl font-headline font-bold">Payment Methods</h3>
                   <Button variant="outline" className="border-primary text-primary font-bold rounded-xl">
                      <Plus className="h-4 w-4 mr-2" /> Add Payment
                   </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {MOCK_PAYMENTS.map((method) => (
                      <Card key={method.id} className={`relative overflow-hidden ${method.isDefault ? 'border-primary bg-indigo-50/20 shadow-md' : 'border-slate-100 shadow-sm'}`}>
                         <CardContent className="p-6 pt-8">
                            <div className="flex justify-between items-start mb-6">
                               <div className="bg-white p-3 rounded-lg border shadow-sm">
                                  {method.type === 'visa' && <CreditCard className="h-8 w-8 text-blue-600" />}
                                  {method.type === 'paypal' && <ExternalLink className="h-8 w-8 text-indigo-500" />}
                               </div>
                               {method.isDefault && <Badge className="bg-primary/10 text-primary border-none text-[10px]">Primary</Badge>}
                            </div>
                            
                            <div className="space-y-1">
                               {method.type === 'visa' ? (
                                  <>
                                     <p className="font-bold text-lg">•••• •••• •••• {method.last4}</p>
                                     <p className="text-xs text-slate-400 uppercase tracking-widest">Expires {method.expiry}</p>
                                  </>
                               ) : (
                                  <>
                                     <p className="font-bold text-lg">{method.email}</p>
                                     <p className="text-xs text-slate-400 uppercase tracking-widest">Connected PayPal Account</p>
                                  </>
                               )}
                            </div>

                            <div className="flex space-x-4 pt-8">
                               <button className="text-xs text-primary font-bold hover:underline">Update</button>
                               <button className="text-xs text-destructive/60 font-bold hover:underline ml-auto">Delete</button>
                            </div>
                         </CardContent>
                      </Card>
                   ))}
                </div>
             </TabsContent>

             {/* Account Settings Section */}
             <TabsContent value="settings" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 m-0">
                <div className="space-y-6">
                   <h3 className="text-xl font-headline font-bold">Account Settings</h3>
                   
                   {/* Notifications */}
                   <Card className="border-slate-100 shadow-sm">
                      <CardHeader className="border-b border-slate-50 pb-4">
                         <div className="flex items-center space-x-2">
                            <Bell className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">Notifications</CardTitle>
                         </div>
                         <CardDescription>Control how you receive updates and promotions.</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-6">
                         <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                               <Label className="text-sm font-bold">Order Status Updates</Label>
                               <p className="text-xs text-slate-500">Receive SMS or Email when your order ships.</p>
                            </div>
                            <Switch defaultChecked />
                         </div>
                         <Separator />
                         <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                               <Label className="text-sm font-bold">Marketing & Drops</Label>
                               <p className="text-xs text-slate-500">Stay in the loop about new collection releases.</p>
                            </div>
                            <Switch />
                         </div>
                      </CardContent>
                   </Card>

                   {/* Security */}
                   <Card className="border-slate-100 shadow-sm">
                      <CardHeader className="border-b border-slate-50 pb-4">
                         <div className="flex items-center space-x-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <CardTitle className="text-lg">Security</CardTitle>
                         </div>
                         <CardDescription>Secure your account with multi-factor authentication.</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                               <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center border">
                                  <CircleUser className="h-5 w-5 text-slate-400" />
                                </div>
                                <div>
                                   <p className="text-sm font-bold">Account Password</p>
                                   <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                                </div>
                            </div>
                            <Button variant="outline" className="rounded-xl font-bold border-slate-200">Change Password</Button>
                         </div>
                      </CardContent>
                   </Card>

                   {/* Danger Zone */}
                   <div className="pt-10">
                      <h4 className="text-sm font-bold text-destructive uppercase tracking-widest mb-4">Danger Zone</h4>
                      <Card className="border-destructive/20 bg-destructive/5 overflow-hidden">
                         <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-1 text-center md:text-left">
                               <p className="font-bold text-destructive">Deactivate Account</p>
                               <p className="text-xs text-slate-500 max-w-sm">
                                  Temporarily disable your account. Your data will be preserved but your profile will be hidden.
                               </p>
                            </div>
                            <Button variant="destructive" className="px-8 font-bold rounded-xl">Deactivate</Button>
                         </CardContent>
                      </Card>
                   </div>
                </div>
             </TabsContent>
          </div>
       </Tabs>
    </div>
  );
}
