'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'new' | 'sale' | 'limited' | 'dark';
  className?: string;
}

export const Badge = ({ children, variant = 'new', className = '' }: BadgeProps) => {
  const variants = {
    new: 'bg-primary text-background',
    sale: 'bg-red-500 text-white',
    limited: 'bg-white text-black',
    dark: 'bg-black text-white'
  };

  return (
    <span className={`
      inline-flex items-center justify-center 
      px-2 py-1 
      text-[10px] font-black uppercase tracking-wider 
      rounded-sm shadow-sm
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </span>
  );
};
