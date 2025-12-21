'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import Navbar from '@/components/navigation/Navbar';

const FEATURED_PRODUCTS = [
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
];

const CATEGORIES = [
  { name: 'Hombres', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop', link: '/men' },
  { name: 'Mujeres', image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop', link: '/women' },
  { name: 'Accesorios', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop', link: '/accessories' },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop"
            alt="GymBros Hero"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase mb-6 drop-shadow-2xl">
              DESAFÍA TUS <span className="text-primary italic">LÍMITES</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-medium tracking-wide">
              Ropa deportiva premium diseñada para quienes exigen excelencia. 
              Experimenta la fusión perfecta entre rendimiento y estilo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/shop">
                <Button size="lg" variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  COMPRAR AHORA
                </Button>
              </Link>
              <Link href="/shop?category=new">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  NUEVOS LANZAMIENTOS
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories - "Bento" Style */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-12 text-center"
          >
            COMPRA POR CATEGORÍA
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px] md:h-[500px]">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group h-full overflow-hidden rounded-sm cursor-pointer"
              >
                <Link href={cat.link} className="block w-full h-full">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest border-2 border-transparent group-hover:border-white px-8 py-4 transition-all duration-300">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Drops */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Acaba De Llegar</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">ÚLTIMO EQUIPO</h2>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
              VER TODO <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/shop">
              <Button variant="outline" className="w-full">VER TODO</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-primary text-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            ÚNETE AL <span className="italic">MOVIMIENTO</span>
          </h2>
          <p className="text-lg md:text-xl font-medium mb-8 max-w-xl mx-auto">
            Regístrate para acceso exclusivo a lanzamientos, guías de entrenamiento y eventos de la comunidad.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="INGRESA TU EMAIL" 
              className="flex-1 px-6 py-4 bg-black/10 border-2 border-black placeholder-black/60 font-bold uppercase focus:outline-none focus:bg-white focus:border-white transition-colors"
            />
            <button className="px-8 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              SUSCRIBIRSE
            </button>
          </form>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black uppercase leading-none whitespace-nowrap">
            GYM BROS
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="text-3xl font-black tracking-tighter mb-6 block">
                GYM<span className="text-primary italic">BROS</span>
              </Link>
              <p className="text-gray-400 max-w-sm">
                Elevando tu potencial con ropa de alto rendimiento. Diseñado para los dedicados, construido para los audaces.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest mb-6">Tienda</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="/shop" className="hover:text-primary transition-colors">Nuevos Lanzamientos</Link></li>
                <li><Link href="/men" className="hover:text-primary transition-colors">Hombres</Link></li>
                <li><Link href="/women" className="hover:text-primary transition-colors">Mujeres</Link></li>
                <li><Link href="/accessories" className="hover:text-primary transition-colors">Accesorios</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest mb-6">Ayuda</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link href="/faq" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
                <li><Link href="/shipping" className="hover:text-primary transition-colors">Envíos y Devoluciones</Link></li>
                <li><Link href="/size-guide" className="hover:text-primary transition-colors">Guía de Tallas</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contáctanos</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500 uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} GymBros Inc. Todos los derechos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/terms" className="hover:text-white transition-colors">Términos</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
