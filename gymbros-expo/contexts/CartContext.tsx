import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (id: string, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  syncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = '@gymbros_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [syncing, setSyncing] = useState(false);
  const { user } = useAuth();

  // Load cart from AsyncStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };
    saveCart();
  }, [items]);

  // Sync cart with Supabase when user logs in
  useEffect(() => {
    if (user) {
      syncCartWithServer();
    }
  }, [user]);

  const syncCartWithServer = async () => {
    if (!user) return;

    setSyncing(true);
    try {
      // Fetch server cart
      const { data: serverCart, error } = await supabase
        .from('cart_items')
        .select('*, products(*)')
        .eq('user_id', user.id);

      if (error) throw error;

      // Merge local cart with server cart
      const mergedItems = [...items];

      // Add server items that aren't in local cart
      serverCart?.forEach((serverItem: any) => {
        const localItem = mergedItems.find(
          (item) => item.id === serverItem.product_id && item.size === serverItem.size
        );
        if (!localItem && serverItem.products) {
          mergedItems.push({
            id: serverItem.product_id,
            name: serverItem.products.name,
            price: parseFloat(serverItem.products.price),
            image: serverItem.products.images?.[0] || '',
            size: serverItem.size,
            quantity: serverItem.quantity,
          });
        } else if (localItem) {
          // Combine quantities
          localItem.quantity = Math.max(localItem.quantity, serverItem.quantity);
        }
      });

      setItems(mergedItems);

      // Sync merged cart back to server
      await syncToServer(mergedItems);
    } catch (error) {
      console.error('Error syncing cart:', error);
    } finally {
      setSyncing(false);
    }
  };

  const syncToServer = async (cartItems: CartItem[]) => {
    if (!user) return;

    try {
      // Delete all existing cart items for user
      await supabase.from('cart_items').delete().eq('user_id', user.id);

      // Insert new cart items
      if (cartItems.length > 0) {
        const insertItems = cartItems.map((item) => ({
          user_id: user.id,
          product_id: item.id,
          size: item.size || null,
          quantity: item.quantity,
        }));

        await supabase.from('cart_items').insert(insertItems);
      }
    } catch (error) {
      console.error('Error syncing to server:', error);
    }
  };

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
      let newItems: CartItem[];
      
      if (existing) {
        newItems = prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        newItems = [...prev, { ...item, quantity }];
      }

      // Sync to server if logged in
      if (user) {
        syncToServer(newItems);
      }

      return newItems;
    });
  }, [user]);

  const removeFromCart = useCallback((id: string, size?: string) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => !(item.id === id && item.size === size));
      
      // Sync to server if logged in
      if (user) {
        syncToServer(newItems);
      }

      return newItems;
    });
  }, [user]);

  const updateQuantity = useCallback((id: string, size: string | undefined, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    
    setItems((prev) => {
      const newItems = prev.map((item) => 
        (item.id === id && item.size === size) ? { ...item, quantity } : item
      );
      
      // Sync to server if logged in
      if (user) {
        syncToServer(newItems);
      }

      return newItems;
    });
  }, [user, removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    
    // Clear server cart if logged in
    if (user) {
      supabase.from('cart_items').delete().eq('user_id', user.id);
    }
  }, [user]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        syncing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
