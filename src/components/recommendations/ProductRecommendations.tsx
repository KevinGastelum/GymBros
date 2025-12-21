'use client';

import React from 'react';
import ProductCard from '@/components/products/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
}

interface ProductRecommendationsProps {
  title?: string;
  products: Product[];
  excludeId?: string;
}

export function ProductRecommendations({ 
  title = 'También Te Puede Gustar', 
  products,
  excludeId 
}: ProductRecommendationsProps) {
  const filteredProducts = excludeId 
    ? products.filter(p => p.id !== excludeId) 
    : products;

  if (filteredProducts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black uppercase tracking-tighter">{title}</h2>
        <div className="flex gap-2">
          <button className="p-2 border border-border hover:border-primary rounded transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 border border-border hover:border-primary rounded transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 4).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
