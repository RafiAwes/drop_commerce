"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Layers,
  Save,
  ImageIcon,
  LayoutGrid,
  ChevronRight,
  Package,
  CheckCircle2,
  X
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PRODUCTS } from "@/lib/products";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

const MOCK_CATEGORIES = [
  { id: "1", name: "Accessories", description: "Watches, bags, and premium lifestyle goods.", products: 42, status: "Active", image: "https://picsum.photos/seed/cat1/200/200" },
  { id: "2", name: "Electronics", description: "High-end audio, cameras, and modern gadgets.", products: 28, status: "Active", image: "https://picsum.photos/seed/cat2/200/200" },
  { id: "3", name: "Footwear", description: "Minimalist sneakers and designer shoes.", products: 15, status: "Active", image: "https://picsum.photos/seed/cat3/200/200" },
  { id: "4", name: "Beauty", description: "Fragrances, skincare, and premium cosmetics.", products: 12, status: "Inactive", image: "https://picsum.photos/seed/cat4/200/200" },
];

export default function AdminCategoriesPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    toast({
      title: "Category Removed",
      description: "The category has been deleted from your store records.",
      variant: "destructive",
    });
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const handleAddProducts = (category: any) => {
    setSelectedCategory(category);
    setIsProductsOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(c => c.id === editingCategory.id ? { ...c, ...editingCategory } : c));
      toast({ title: "Category Updated", description: "Changes have been saved successfully." });
    } else {
      toast({ title: "Category Created", description: "New department added to storefront." });
    }
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const toggleProductInSelection = (productId: string) => {
    toast({
      title: "Assignment Updated",
      description: `Product ${productId} status updated for ${selectedCategory?.name}.`,
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Categories</h1>
          <p className="text-slate-500">Organize your products into logical departments for better discovery.</p>
        </div>
        <Button 
          onClick={() => { setEditingCategory(null); setIsDialogOpen(true); }}
          className="btn-primary h-12 px-6 rounded-xl font-bold shadow-lg shadow-indigo-200"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Category
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search categories..." 
            className="pl-10 h-11 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id} className="group hover:bg-muted/10 transition-colors">
                <TableCell>
                  <div className="relative h-12 w-12 rounded-lg border border-border/50 overflow-hidden bg-background">
                    <Image 
                      src={category.image} 
                      alt={category.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </TableCell>
                <TableCell className="font-bold">{category.name}</TableCell>
                <TableCell className="max-w-md">
                   <p className="text-sm text-muted-foreground line-clamp-1">{category.description}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <LayoutGrid className="h-4 w-4 text-primary/50" />
                    <span className="font-bold">{category.products} items</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn(
                    "font-bold",
                    category.status === 'Active' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"
                  )}>
                    {category.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 shadow-xl border-border">
                      <DropdownMenuLabel>Management</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="rounded-lg px-3 py-2 cursor-pointer"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="h-4 w-4 mr-2 text-muted-foreground" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="rounded-lg px-3 py-2 cursor-pointer"
                        onClick={() => handleAddProducts(category)}
                      >
                        <Package className="h-4 w-4 mr-2 text-muted-foreground" /> Manage Products
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="rounded-lg px-3 py-2 cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" /> Delete Category
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) setEditingCategory(null); }}>
        <DialogContent className="max-w-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">
              {editingCategory ? 'Edit Category' : 'New Category Configuration'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory ? 'Modify your department details and visual presentation.' : 'Create a new department for your storefront organization.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveCategory} className="space-y-6 pt-4">
             <div className="space-y-4">
                <div className="space-y-2">
                   <Label htmlFor="cat-name" className="font-bold">Category Name</Label>
                   <Input 
                     id="cat-name" 
                     placeholder="e.g. Premium Tech" 
                     className="h-11" 
                     required 
                     value={editingCategory?.name || ""}
                     onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                   />
                </div>
                
                <div className="space-y-2">
                   <Label htmlFor="cat-desc" className="font-bold">Short Description</Label>
                   <Textarea 
                     id="cat-desc" 
                     placeholder="Briefly describe what this category contains..." 
                     className="min-h-[100px]" 
                     value={editingCategory?.description || ""}
                     onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                   />
                </div>

                <div className="space-y-2">
                   <Label className="font-bold">Cover Image</Label>
                   {editingCategory?.image ? (
                     <div className="relative aspect-video rounded-xl overflow-hidden border group">
                        <Image src={editingCategory.image} alt="Preview" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Button 
                             type="button" 
                             variant="destructive" 
                             size="sm" 
                             className="rounded-full"
                             onClick={() => setEditingCategory({ ...editingCategory, image: null })}
                           >
                             <X className="h-4 w-4 mr-2" /> Replace
                           </Button>
                        </div>
                     </div>
                   ) : (
                     <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer">
                        <ImageIcon className="h-8 w-8 text-muted-foreground/30 mb-2" />
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Click to upload banner</p>
                     </div>
                   )}
                </div>
             </div>

             <DialogFooter className="pt-4 gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="h-11 px-6 rounded-xl font-bold">Cancel</Button>
                <Button type="submit" className="btn-primary h-11 px-8 rounded-xl font-bold">
                   <Save className="h-4 w-4 mr-2" /> {editingCategory ? 'Save Changes' : 'Create Category'}
                </Button>
             </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Product Assignment Dialog */}
      <Dialog open={isProductsOpen} onOpenChange={setIsProductsOpen}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-2xl font-headline font-bold">Manage Products: {selectedCategory?.name}</DialogTitle>
            <DialogDescription>Select which items from your catalog belong to this department.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
             <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Filter catalog..." className="pl-10 h-10 border-slate-200" />
             </div>

             <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                   {PRODUCTS.map((product) => (
                      <div 
                        key={product.id} 
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50/50 transition-all group"
                      >
                         <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 relative rounded-lg border overflow-hidden">
                               <Image src={product.image} alt={product.title} fill className="object-cover" />
                            </div>
                            <div>
                               <p className="text-sm font-bold">{product.title}</p>
                               <p className="text-[10px] text-slate-400 uppercase font-medium">SKU: CF-{product.id}00X</p>
                            </div>
                         </div>
                         <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 border-slate-200 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                               {product.category}
                            </Badge>
                            <Checkbox 
                              className="h-5 w-5 rounded-md" 
                              checked={product.category === selectedCategory?.name}
                              onCheckedChange={() => toggleProductInSelection(product.id)}
                            />
                         </div>
                      </div>
                   ))}
                </div>
             </ScrollArea>
          </div>

          <DialogFooter className="border-t pt-6">
             <Button variant="ghost" onClick={() => setIsProductsOpen(false)} className="h-11 px-6 rounded-xl font-bold">Cancel</Button>
             <Button className="btn-primary h-11 px-8 rounded-xl font-bold" onClick={() => setIsProductsOpen(false)}>
                <CheckCircle2 className="h-4 w-4 mr-2" /> Finish Assignment
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
