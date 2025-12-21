'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu, X, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/shop', label: 'Tienda' },
  { href: '/men', label: 'Hombres' },
  { href: '/women', label: 'Mujeres' },
  { href: '/accessories', label: 'Accesorios' },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? 'border-border bg-background/95 backdrop-blur-lg shadow-sm' 
          : 'border-transparent bg-background/80 backdrop-blur-md'
      }`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              GYM<span className="text-primary italic">BROS</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex p-2 hover:bg-secondary rounded-full transition-colors group">
              <Search className="w-5 h-5 group-hover:text-primary transition-colors" />
            </button>
            
            <Link href="/account" className="hidden sm:flex p-2 hover:bg-secondary rounded-full transition-colors group">
              <User className="w-5 h-5 group-hover:text-primary transition-colors" />
            </Link>

            <Link href="/cart" className="p-2 hover:bg-secondary rounded-full transition-colors relative group">
              <ShoppingBag className="w-5 h-5 group-hover:text-primary transition-colors" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 w-[80vw] max-w-sm h-full bg-background border-l border-border shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="text-lg font-bold tracking-tighter">
                    GYM<span className="text-primary italic">BROS</span>
                  </span>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-secondary rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 overflow-y-auto py-6">
                  <nav className="space-y-1 px-4">
                    {NAV_LINKS.map((link, idx) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center justify-between py-4 border-b border-border text-lg font-bold uppercase tracking-wider hover:text-primary transition-colors"
                        >
                          {link.label}
                          <ChevronRight className="w-5 h-5 text-accent" />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border space-y-3">
                  <Link
                    href="/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors"
                  >
                    <User className="w-5 h-5" /> Mi Cuenta
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 bg-primary text-background font-bold uppercase tracking-widest w-full"
                  >
                    <ShoppingBag className="w-5 h-5" /> 
                    Ver Carrito {totalItems > 0 && `(${totalItems})`}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
