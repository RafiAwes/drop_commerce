"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowUpDown, 
  Eye, 
  Edit, 
  Trash2, 
  AlertTriangle,
  Globe,
  Tag,
  Layers,
  Save,
  X,
  Image as ImageIcon,
  CheckCircle2
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
import { PRODUCTS } from "@/lib/products";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState<any>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredProducts = PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Product Saved",
      description: "The product has been successfully updated in your catalog.",
    });
    setIsCreateOpen(false);
    setProductImages([]); // Reset for next time
  };

  const handleAddImage = () => {
    // Simulate an image upload by adding a random placeholder
    const newImage = `https://picsum.photos/seed/${Math.random()}/600/600`;
    setProductImages([...productImages, newImage]);
  };

  const removeImage = (index: number) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold">Products Catalog</h1>
          <p className="text-muted-foreground">Manage your items, variants, and stock levels.</p>
        </div>
        <Button 
          onClick={() => {
            setProductImages([]);
            setIsCreateOpen(true);
          }}
          className="btn-primary h-12 px-6 rounded-xl font-bold shadow-lg shadow-indigo-200"
        >
          <Plus className="h-4 w-4 mr-2" /> Add New Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search SKU or name..." 
            className="pl-10 h-11 bg-muted/30 border-none focus-visible:ring-1 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Button variant="outline" className="h-11 rounded-xl border-border flex-grow md:flex-grow-0">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </Button>
          <Button variant="outline" className="h-11 rounded-xl border-border flex-grow md:flex-grow-0">
            Export CSV
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer hover:text-primary transition-colors">
                  Product Name <ArrowUpDown className="ml-2 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="group hover:bg-muted/10 transition-colors">
                <TableCell>
                  <div className="relative h-12 w-12 rounded-lg border border-border/50 overflow-hidden bg-background">
                    <Image 
                      src={product.image} 
                      alt={product.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                  </div>
                </TableCell>
                <TableCell className="font-bold">
                  <div>
                    {product.title}
                    <p className="text-[10px] text-muted-foreground font-normal uppercase tracking-widest mt-0.5">CF-{product.id}00X</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-muted/30 text-muted-foreground font-medium border-border">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="font-bold">${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className={cn(
                      "font-bold",
                      product.stock < 5 ? "text-destructive" : "text-foreground"
                    )}>
                      {product.stock}
                    </span>
                    {product.stock < 5 && <AlertTriangle className="h-3 w-3 text-destructive" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={cn(
                    "font-bold",
                    product.stock > 0 ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-destructive/10 text-destructive border-destructive/20"
                  )}>
                    {product.stock > 0 ? "Active" : "Out of Stock"}
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
                      <DropdownMenuLabel>Product Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="rounded-lg px-3 py-2 cursor-pointer"
                        onClick={() => setViewProduct(product)}
                      >
                        <Eye className="h-4 w-4 mr-2 text-muted-foreground" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="rounded-lg px-3 py-2 cursor-pointer" 
                        onClick={() => {
                          setProductImages([product.image]);
                          setIsCreateOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2 text-muted-foreground" /> Edit Catalog
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="rounded-lg px-3 py-2 cursor-pointer text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" /> Archive Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Details Dialog */}
      <Dialog open={!!viewProduct} onOpenChange={(open) => !open && setViewProduct(null)}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">Product Summary</DialogTitle>
            <DialogDescription>Quick overview of catalog item details.</DialogDescription>
          </DialogHeader>
          {viewProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
              <div className="relative aspect-square rounded-xl overflow-hidden border bg-muted shadow-inner">
                <Image src={viewProduct.image} alt={viewProduct.title} fill className="object-cover" />
              </div>
              <div className="space-y-6">
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-indigo-50/50 text-primary border-indigo-100 uppercase tracking-widest text-[10px] px-2">{viewProduct.category}</Badge>
                  <h3 className="text-2xl font-headline font-bold">{viewProduct.title}</h3>
                  <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">SKU: CF-{viewProduct.id}00X</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 border-y py-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Retail Price</p>
                    <p className="text-3xl font-black text-foreground">${viewProduct.price.toFixed(2)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Stock Status</p>
                    <div className="flex items-center">
                      <Badge className={cn(
                        "font-bold px-3 py-1",
                        viewProduct.stock > 5 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                        viewProduct.stock > 0 ? "bg-amber-50 text-amber-600 border-amber-100" :
                        "bg-rose-50 text-rose-600 border-rose-100"
                      )}>
                        {viewProduct.stock} Available
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Public Description</p>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-5">
                    {viewProduct.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="border-t pt-6 gap-2">
            <Button variant="ghost" onClick={() => setViewProduct(null)} className="h-11 px-6 rounded-xl font-bold">Close Preview</Button>
            <Button 
              className="btn-primary h-11 px-8 rounded-xl font-bold"
              onClick={() => {
                const p = viewProduct;
                setViewProduct(null);
                setProductImages([p.image]);
                setIsCreateOpen(true);
              }}
            >
              <Edit className="h-4 w-4 mr-2" /> Modify Catalog Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Creation/Edit Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline font-bold">Product Configuration</DialogTitle>
            <DialogDescription>
              Define your product details, gallery, variants, and SEO settings.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProduct} className="space-y-8 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Basic Info */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prod-title" className="font-bold">Product Title</Label>
                  <Input id="prod-title" placeholder="e.g., Midnight Chronograph" className="h-11" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prod-desc" className="font-bold">Description</Label>
                  <Textarea id="prod-desc" placeholder="Describe the product's features and benefits..." className="min-h-[120px]" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prod-price" className="font-bold">Base Price ($)</Label>
                    <Input id="prod-price" type="number" placeholder="0.00" className="h-11" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prod-compare" className="font-bold">Compare-at ($)</Label>
                    <Input id="prod-compare" type="number" placeholder="0.00" className="h-11 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prod-cat" className="font-bold">Category</Label>
                  <Select>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acc">Accessories</SelectItem>
                      <SelectItem value="elec">Electronics</SelectItem>
                      <SelectItem value="foot">Footwear</SelectItem>
                      <SelectItem value="beauty">Beauty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column: Media & Organization */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="font-bold">Media Collection</Label>
                  
                  {/* Upload Dropzone */}
                  <div 
                    onClick={handleAddImage}
                    className="border-2 border-dashed border-border rounded-xl p-6 text-center bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col items-center">
                      <Plus className="h-6 w-6 text-muted-foreground/30 group-hover:text-primary transition-colors mb-2" />
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Add Product Image</p>
                    </div>
                  </div>

                  {/* Image Gallery Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {productImages.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg border border-border/50 group overflow-hidden bg-background shadow-sm">
                        <Image src={img} alt={`Gallery ${idx}`} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                           <button 
                             type="button"
                             onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                             className="p-1.5 bg-background text-destructive rounded-full hover:scale-110 transition-transform"
                           >
                             <Trash2 className="h-3 w-3" />
                           </button>
                        </div>
                        {idx === 0 && (
                          <div className="absolute top-1 left-1">
                             <Badge className="h-4 px-1 text-[8px] bg-emerald-500 border-none">Main</Badge>
                          </div>
                        )}
                      </div>
                    ))}
                    {productImages.length === 0 && (
                      <div className="col-span-3 flex flex-col items-center justify-center py-8 bg-muted/10 rounded-xl border border-border/50">
                        <ImageIcon className="h-8 w-8 text-muted-foreground/20 mb-2" />
                        <p className="text-[10px] text-muted-foreground font-bold uppercase">No media uploaded</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 p-4 border border-border/50 rounded-xl bg-muted/10">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold">SEO & Meta Tags</span>
                  </div>
                  <div className="space-y-3">
                    <Input placeholder="URL Slug (e.g., midnight-watch)" className="h-9 text-xs" />
                    <Input placeholder="Meta Title" className="h-9 text-xs" />
                    <Textarea placeholder="Meta Description for search engines..." className="min-h-[60px] text-xs" />
                  </div>
                </div>

                <div className="space-y-4 p-4 border border-border/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Layers className="h-4 w-4 text-primary" />
                      <span className="text-sm font-bold">Inventory & Variants</span>
                    </div>
                    <button type="button" className="text-primary text-[10px] font-bold hover:underline">Add Variant</button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                      <span>Variant Name</span>
                      <span>Stock</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Standard" className="h-9 text-xs flex-grow" />
                      <Input type="number" placeholder="0" className="h-9 w-20 text-xs" />
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive"><X className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-border/50 pt-6 gap-2">
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="h-11 rounded-xl font-bold">Discard</Button>
              <Button type="submit" className="btn-primary h-11 px-8 rounded-xl font-bold">
                <Save className="h-4 w-4 mr-2" /> Publish Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
