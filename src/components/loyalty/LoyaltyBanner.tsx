'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface LoyaltyBannerProps {
  points?: number;
  className?: string;
}

const TIERS = [
  { name: 'Bronce', min: 0, max: 999, color: 'text-orange-400' },
  { name: 'Plata', min: 1000, max: 4999, color: 'text-gray-300' },
  { name: 'Oro', min: 5000, max: Infinity, color: 'text-yellow-400' },
];

function getTier(points: number) {
  return TIERS.find(tier => points >= tier.min && points <= tier.max) || TIERS[0];
}

export function LoyaltyBanner({ points = 0, className = '' }: LoyaltyBannerProps) {
  const tier = getTier(points);
  const nextTier = TIERS[TIERS.indexOf(tier) + 1];
  const pointsToNext = nextTier ? nextTier.min - points : 0;

  return (
    <div className={`bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded-full">
            <Gift className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold uppercase tracking-wider">Programa de Lealtad</span>
              <span className={`text-xs font-black uppercase ${tier.color}`}>
                {tier.name}
              </span>
            </div>
            <p className="text-sm text-accent">
              <span className="font-bold text-foreground">{points.toLocaleString()}</span> puntos
              {nextTier && (
                <span> • {pointsToNext.toLocaleString()} para {nextTier.name}</span>
              )}
            </p>
          </div>
        </div>
        
        <Link 
          href="/rewards" 
          className="flex items-center gap-1 text-xs font-bold text-primary hover:underline uppercase tracking-wider"
        >
          Ver Recompensas <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
