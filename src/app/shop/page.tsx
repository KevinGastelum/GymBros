'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import ProductCard from '@/components/products/ProductCard';

const PRODUCTS = [
  {
    id: '1',
    name: 'Sudadera Oversized Esencial',
    price: 1100.00,
    category: 'Lifestyle Hombres',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    isNew: true
  },
  {
    id: '2',
    name: 'Mallas Seamless High-Rise',
    price: 900.00,
    category: 'Performance Mujeres',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=600&auto=format&fit=crop',
    isNew: true
  },
  {
    id: '3',
    name: 'Camiseta Compresión Pro',
    price: 700.00,
    category: 'Entrenamiento Hombres',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Botella Signature 1L',
    price: 500.00,
    category: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1602143303410-7199ec42ac0a?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Cinturón de Levantamiento',
    price: 1500.00,
    category: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'Pantalones Deportivos Track',
    price: 1200.00,
    category: 'Entrenamiento Hombres',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop',
  },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter uppercase mb-4">TIENDA</h1>
          <p className="text-accent text-lg">Descubre nuestra colección completa de ropa deportiva premium</p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
          <p className="text-sm text-accent">{PRODUCTS.length} Productos</p>
          <div className="flex items-center gap-4">
            <select className="px-4 py-2 bg-card border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Destacados</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
              <option>Más Recientes</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </main>
  );
}
