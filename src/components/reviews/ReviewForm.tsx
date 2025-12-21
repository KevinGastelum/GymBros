'use client';

import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/Button';

interface ReviewFormProps {
  productId: string;
  onSubmit?: (review: { rating: number; title: string; content: string }) => void;
}

export function ReviewForm({ productId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor selecciona una calificación');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onSubmit) {
      onSubmit({ rating, title, content });
    }
    
    // Reset form
    setRating(0);
    setTitle('');
    setContent('');
    setIsSubmitting(false);
    
    alert('¡Gracias por tu reseña!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card border border-border rounded-lg">
      <h3 className="text-lg font-bold uppercase tracking-wider">Escribe una Reseña</h3>
      
      <div>
        <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Tu Calificación</label>
        <StarRating rating={rating} size="lg" interactive onChange={setRating} />
      </div>
      
      <div>
        <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resume tu experiencia"
          required
          className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Tu Reseña</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Cuéntanos qué te pareció el producto..."
          required
          rows={4}
          className="w-full px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>
      
      <Button type="submit" variant="primary" isLoading={isSubmitting} className="w-full">
        ENVIAR RESEÑA
      </Button>
    </form>
  );
}
