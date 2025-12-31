'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

export default function ProductCard({ id, name, price, image, category, isNew }: ProductCardProps) {
  const { addToCart } = useCart();
  
  // Fake add to cart delay for effect
  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image, size: 'M' }); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative flex flex-col cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary mb-4 isolate">
        {isNew && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="new" className="bg-white/90 backdrop-blur-sm text-black shadow-sm font-bold border-none">New In</Badge>
          </div>
        )}
        
        <Link href={`/product/${id}`} className="block w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>

        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 delay-75">
          <button className="p-2.5 bg-white/90 backdrop-blur-md text-black rounded-full hover:bg-black hover:text-white transition-colors shadow-sm">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add Overlay - Glassmorphism */}
        <div className="absolute inset-x-3 bottom-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] z-20">
            <button 
              onClick={handleQuickAdd}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-white/80 backdrop-blur-xl text-black rounded-xl font-bold text-sm hover:bg-black hover:text-white transition-all shadow-lg border border-white/20"
            >
              <ShoppingBag className="w-4 h-4" /> Quick Add
            </button>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-start">
            <h3 className="text-sm font-bold text-foreground group-hover:text-muted-foreground transition-colors line-clamp-1">
            <Link href={`/product/${id}`}>{name}</Link>
            </h3>
            <span className="text-sm font-bold text-foreground">{formatPrice(price)}</span>
        </div>
        <span className="text-xs font-medium text-muted-foreground">{category}</span>
      </div>
    </motion.div>
  );
}
