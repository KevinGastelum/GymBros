'use client';

import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-black mb-6 tracking-tighter uppercase">Tu Carrito está Vacío</h1>
          <p className="text-accent mb-8">¡Agrega ropa nueva y sube de nivel tu entrenamiento!</p>
          <Link href="/shop">
            <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
              COMPRAR AHORA
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Carrito de Compras</h1>
          <button 
            onClick={clearCart}
            className="text-sm text-accent hover:text-primary transition-colors uppercase tracking-wider font-semibold"
          >
            Vaciar Carrito
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 p-6 bg-card border border-border rounded-lg">
                <div className="relative w-32 h-32 flex-shrink-0 bg-secondary rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                    {item.size && (
                      <p className="text-sm text-accent">Talla: {item.size}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-secondary rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-secondary rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="text-xl font-bold">{formatPrice(item.price * item.quantity)}</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-8 bg-card border border-border rounded-lg">
              <h2 className="text-2xl font-black mb-6 tracking-tighter uppercase">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-accent">Subtotal</span>
                  <span className="font-semibold">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-accent">Envío</span>
                  <span className="font-semibold text-primary">GRATIS</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-accent">IVA (16%)</span>
                  <span className="font-semibold">{formatPrice(totalPrice * 0.16)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-8 text-xl font-black">
                <span>Total</span>
                <span>{formatPrice(totalPrice * 1.16)}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" variant="primary" className="w-full" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  PAGAR AHORA
                </Button>
              </Link>

              <Link 
                href="/shop"
                className="block text-center mt-4 text-sm text-accent hover:text-primary transition-colors uppercase tracking-wider font-semibold"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
