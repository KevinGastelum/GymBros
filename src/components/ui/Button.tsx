'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    
    const variants = {
      primary: 'bg-primary text-background hover:brightness-110 active:scale-95 border border-transparent',
      secondary: 'bg-white text-black hover:bg-gray-100 active:scale-95 border border-transparent',
      outline: 'bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background active:scale-95',
      ghost: 'bg-transparent text-foreground hover:bg-secondary active:scale-95 border border-transparent'
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs font-bold tracking-wider',
      md: 'px-6 py-3 text-sm font-bold tracking-widest',
      lg: 'px-8 py-4 text-base font-bold tracking-[0.2em]'
    };

    const baseStyles = 'inline-flex items-center justify-center gap-2 uppercase transition-all duration-300 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
