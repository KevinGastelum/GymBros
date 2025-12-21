'use client';

import React from 'react';
import { StarRating } from './StarRating';
import { ThumbsUp } from 'lucide-react';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="py-6 border-b border-border last:border-b-0">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <StarRating rating={review.rating} size="sm" />
            <span className="text-sm font-bold">{review.title}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-accent">
            <span className="font-semibold">{review.author}</span>
            {review.verified && (
              <span className="px-1.5 py-0.5 bg-primary/20 text-primary rounded text-[10px] font-bold uppercase">
                Compra Verificada
              </span>
            )}
            <span>•</span>
            <span>{review.date}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-accent leading-relaxed mb-4">{review.content}</p>
      
      <button className="flex items-center gap-2 text-xs text-accent hover:text-primary transition-colors">
        <ThumbsUp className="w-3.5 h-3.5" />
        <span>Útil ({review.helpful})</span>
      </button>
    </div>
  );
}
