'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag, Heart, Truck, Shield, RefreshCw } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/reviews/StarRating';
import { ReviewCard, Review } from '@/components/reviews/ReviewCard';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { ProductRecommendations } from '@/components/recommendations/ProductRecommendations';

// Mock product data (will be replaced with Supabase later)
const PRODUCTS = {
  '1': {
    id: '1',
    name: 'Sudadera Oversized Esencial',
    price: 1100.00,
    category: 'Lifestyle Hombres',
    description: 'La combinación perfecta de comodidad y estilo. Nuestra Sudadera Oversized Esencial está confeccionada con una mezcla de algodón premium para una suavidad inigualable. Cuenta con un ajuste relajado, hombros caídos y puños acanalados para un look contemporáneo.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    features: [
      'Mezcla premium de algodón y poliéster',
      'Ajuste relajado oversized',
      'Puños y dobladillo acanalados',
      'Bolsillo canguro',
      'Lavable a máquina'
    ],
    rating: 4.8,
    reviewCount: 127,
  },
  '2': {
    id: '2',
    name: 'Mallas Seamless High-Rise',
    price: 900.00,
    category: 'Performance Mujeres',
    description: 'Diseñadas para el máximo rendimiento. Estas mallas sin costuras de cintura alta brindan compresión donde más la necesitas mientras mantienen la transpirabilidad. Perfectas para HIIT, yoga o uso diario.',
    images: [
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518609571773-39b7d303a87b?q=80&w=800&auto=format&fit=crop',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'Construcción sin costuras',
      'Cintura alta',
      'Tejido a prueba de sentadillas',
      'Absorción de humedad',
      'Estiramiento en cuatro direcciones'
    ],
    rating: 4.9,
    reviewCount: 89,
  },
};

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'María G.',
    rating: 5,
    date: '15 Dic 2024',
    title: '¡Increíble calidad!',
    content: 'La tela es súper suave y el corte es perfecto. Ya pedí otro color. 100% recomendado.',
    verified: true,
    helpful: 24,
  },
  {
    id: 'r2',
    author: 'Carlos R.',
    rating: 4,
    date: '10 Dic 2024',
    title: 'Muy buena sudadera',
    content: 'Excelente para el gym y para salir. El único detalle es que tarda un poco el envío.',
    verified: true,
    helpful: 12,
  },
];

const RECOMMENDED_PRODUCTS = [
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

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const productId = params?.id as string;
  const product = PRODUCTS[productId as keyof typeof PRODUCTS];

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-black mb-6">Producto No Encontrado</h1>
          <Link href="/shop" className="text-primary hover:underline">Volver a la Tienda</Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
    }, quantity);
    
    router.push('/cart');
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors mb-8 uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-secondary rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square bg-secondary rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">{product.category}</p>
              <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">{product.name}</h1>
              
              {/* Rating Summary */}
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} size="sm" />
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-sm text-accent">({product.reviewCount} reseñas)</span>
              </div>
              
              <p className="text-3xl font-bold mb-6">{formatPrice(product.price)}</p>
              <p className="text-accent leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold uppercase tracking-wider">Seleccionar Talla</label>
                <button className="text-xs text-primary hover:underline">Guía de Tallas</button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border-2 rounded font-bold text-sm uppercase tracking-wider transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-background'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider mb-3">Cantidad</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-border hover:border-primary rounded transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-border hover:border-primary rounded transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-1"
                leftIcon={<ShoppingBag className="w-5 h-5" />}
              >
                AGREGAR AL CARRITO
              </Button>
              <button className="p-4 border-2 border-border hover:border-primary rounded transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="pt-6 border-t border-border space-y-4">
              <h3 className="font-bold uppercase tracking-wider">Características Clave</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-accent">
                    <span className="text-primary mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 border border-border rounded">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wider">Envío Gratis</p>
              </div>
              <div className="text-center p-4 border border-border rounded">
                <RefreshCw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wider">Devoluciones Fáciles</p>
              </div>
              <div className="text-center p-4 border border-border rounded">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs font-semibold uppercase tracking-wider">Pago Seguro</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-20 pt-12 border-t border-border">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Reseñas de Clientes</h2>

              {/* Review Summary */}
              <div className="flex items-center gap-6 mb-8 p-6 bg-card border border-border rounded-lg">
                <div className="text-center">
                  <p className="text-5xl font-black">{product.rating}</p>
                  <StarRating rating={product.rating} size="md" />
                  <p className="text-sm text-accent mt-2">{product.reviewCount} reseñas</p>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs w-3">{star}</span>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 10}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-0">
                {MOCK_REVIEWS.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>

            {/* Review Form */}
            <div className="lg:col-span-1">
              <ReviewForm productId={product.id} />
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <ProductRecommendations 
          title="También Te Puede Gustar" 
          products={RECOMMENDED_PRODUCTS} 
          excludeId={product.id}
        />
      </div>
    </main>
  );
}
