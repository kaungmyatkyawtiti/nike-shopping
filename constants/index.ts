import { Product } from "@/types";

export const products = [
  {
    id: 1,
    title: "Air Max Pulse",
    imageSrc: "/shoes/shoe-1.jpg",
    description: "image description",
    pirce: 100,
    badge: { label: "New", tone: "orange" }
  },
  {
    id: 2,
    title: "Air Max Pulse",
    imageSrc: "/shoes/shoe-2.webp",
    description: "image description",
    pirce: 100,
    badge: { label: "Hot", tone: "red" }
  },
  {
    id: 3,
    title: "Air Max Pulse",
    imageSrc: "/shoes/shoe-3.webp",
    description: "image description",
    pirce: 100,
    badge: { label: "Trending", tone: "green" }
  },
  {
    id: 4,
    title: "Air Max Pulse",
    description: "image description",
    pirce: 100,
    imageSrc: "/shoes/shoe-4.webp",
    badge: { label: "Trending", tone: "green" }
  },
  {
    id: 5,
    title: "Air Max Pulse",
    description: "image description",
    pirce: 100,
    imageSrc: "/shoes/shoe-4.webp",
    badge: { label: "Trending", tone: "green" }
  },
  {
    id: 6,
    title: "Air Max Pulse",
    description: "image description",
    imageSrc: "/shoes/shoe-4.webp",
    pirce: 100,
    badge: { label: "Trending", tone: "green" }
  },
  {
    id: 7,
    title: "Air Max Pulse",
    description: "image description",
    imageSrc: "/shoes/shoe-4.webp",
    pirce: 100,
    badge: { label: "Trending", tone: "green" }
  },
]

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Nike Air Max Pulse",
    subtitle: "Men's Shoes",
    gender: "men",
    sizes: ["M", "L", "XL"],
    colors: ["white", "black"],
    price: 149.99,
    meta: "6 Colour",
    image: "/shoes/shoe-1.jpg",
    createdAt: "2025-08-01T00:00:00.000Z",
    badge: { label: "Best Seller", tone: "orange" },
  },
  {
    id: "2",
    name: "Nike Air Zoom Pegasus",
    subtitle: "Women's Shoes",
    gender: "women",
    sizes: ["S", "M", "L"],
    colors: ["red", "white"],
    price: 129.99,
    meta: "4 Colour",
    image: "/shoes/shoe-2.webp",
    createdAt: "2025-07-20T00:00:00.000Z",
    badge: { label: "Extra 20% off", tone: "green" },
  },
  {
    id: "3",
    name: "Nike InfinityRN 4",
    subtitle: "Unisex Shoes",
    gender: "unisex",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "green"],
    price: 159.99,
    meta: "6 Colour",
    image: "/shoes/shoe-3.webp",
    createdAt: "2025-07-28T00:00:00.000Z",
    badge: { label: "Sustainable Materials", tone: "green" },
  },
  {
    id: "4",
    name: "Nike Metcon 9",
    subtitle: "Men's Training Shoes",
    gender: "men",
    sizes: ["M", "L", "XL"],
    colors: ["grey", "black"],
    price: 139.99,
    meta: "3 Colour",
    image: "/shoes/shoe-4.webp",
    createdAt: "2025-06-10T00:00:00.000Z",
    badge: { label: "New", tone: "orange" },
  },
  {
    id: "5",
    name: "Nike Blazer Low '77 Jumbo",
    subtitle: "Women's Shoes",
    gender: "women",
    sizes: ["S", "M", "L"],
    colors: ["white", "blue"],
    price: 98.3,
    meta: "1 Colour",
    image: "/shoes/shoe-3.webp",
    createdAt: "2025-08-10T00:00:00.000Z",
    badge: { label: "Best Seller", tone: "red" },
  },
];


