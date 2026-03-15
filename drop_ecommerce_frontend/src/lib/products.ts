export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
  variants?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Celestial Chronograph",
    price: 299.00,
    description: "Experience timeless elegance with the Celestial Chronograph. Crafted from premium stainless steel and featuring a genuine leather strap, this watch is designed for the modern individual who values precision and style.",
    category: "Accessories",
    image: "https://picsum.photos/seed/watch1/600/600",
    rating: 4.8,
    stock: 12,
    variants: ["Midnight Black", "Silver Gray"]
  },
  {
    id: "2",
    title: "Aura Noise-Cancelling Headphones",
    price: 189.00,
    description: "Immerse yourself in pure sound with Aura. Our industry-leading noise cancellation technology ensures that you hear every detail of your music, even in the busiest environments. Lightweight and comfortable for all-day wear.",
    category: "Electronics",
    image: "https://picsum.photos/seed/tech1/600/600",
    rating: 4.9,
    stock: 8,
    variants: ["Shadow Blue", "Snow White"]
  },
  {
    id: "3",
    title: "Urban Minimalist Sneakers",
    price: 120.00,
    description: "Step into comfort with our Urban Minimalist Sneakers. Designed with a breathable mesh upper and a responsive cushioned sole, these sneakers are perfect for navigating city streets in style.",
    category: "Footwear",
    image: "https://picsum.photos/seed/shoes1/600/600",
    rating: 4.5,
    stock: 25,
    variants: ["Size 8", "Size 9", "Size 10"]
  },
  {
    id: "4",
    title: "Saffron Leather Tote",
    price: 350.00,
    description: "The Saffron Tote is the ultimate companion for your daily adventures. Made from ethically sourced, full-grain leather, it features multiple compartments to keep your essentials organized and secure.",
    category: "Accessories",
    image: "https://picsum.photos/seed/bag1/600/600",
    rating: 4.7,
    stock: 5,
  },
  {
    id: "5",
    title: "Velvet Oud Parfum",
    price: 145.00,
    description: "A rich and mysterious fragrance that combines the depth of oud with the softness of velvet. Long-lasting and captivating, Velvet Oud is perfect for special evenings and sophisticated gatherings.",
    category: "Beauty",
    image: "https://picsum.photos/seed/perfume1/600/600",
    rating: 4.6,
    stock: 15,
  },
  {
    id: "6",
    title: "Classic Mirrorless Camera",
    price: 899.00,
    description: "Capture life's precious moments with professional-grade quality. Our Classic Mirrorless Camera features a high-resolution sensor and fast autofocus, all housed in a beautifully designed vintage-inspired body.",
    category: "Electronics",
    image: "https://picsum.photos/seed/camera1/600/600",
    rating: 4.8,
    stock: 3,
  }
];
