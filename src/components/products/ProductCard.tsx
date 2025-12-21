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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image, size: 'M' }); // Default 'M' for quick add logic example
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary rounded-sm mb-4">
        {isNew && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="new">New Arrival</Badge>
          </div>
        )}
        
        <Link href={`/product/${id}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
          <button 
            onClick={handleQuickAdd}
            className="w-full py-3 bg-white/90 backdrop-blur-md text-black font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-background transition-colors shadow-lg"
          >
            Quick Add
          </button>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button className="p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <Link href={`/product/${id}`} className="p-2 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-colors">
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{category}</span>
        <h3 className="text-sm font-bold group-hover:text-primary transition-colors line-clamp-1">
          <Link href={`/product/${id}`}>{name}</Link>
        </h3>
        <span className="text-sm font-medium">{formatPrice(price)}</span>
      </div>
    </motion.div>
  );
}
