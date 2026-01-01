// Auto-generated TypeScript types for Supabase
// Run `npx supabase gen types typescript` to regenerate from your actual schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          avatar_url: string | null;
          preferred_currency: string;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          preferred_currency?: string;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          preferred_currency?: string;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      addresses: {
        Row: {
          id: string;
          user_id: string;
          address_type: string;
          full_name: string;
          street_line1: string;
          street_line2: string | null;
          city: string;
          state_province: string | null;
          postal_code: string;
          country_code: string;
          phone: string | null;
          is_default: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          address_type?: string;
          full_name: string;
          street_line1: string;
          street_line2?: string | null;
          city: string;
          state_province?: string | null;
          postal_code: string;
          country_code?: string;
          phone?: string | null;
          is_default?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          address_type?: string;
          full_name?: string;
          street_line1?: string;
          street_line2?: string | null;
          city?: string;
          state_province?: string | null;
          postal_code?: string;
          country_code?: string;
          phone?: string | null;
          is_default?: boolean;
          created_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          parent_id: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          sku: string;
          name: string;
          description: string | null;
          price: number;
          category_id: string | null;
          images: string[];
          sizes: string[];
          features: string[];
          is_new: boolean;
          is_active: boolean;
          inventory_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          sku: string;
          name: string;
          description?: string | null;
          price: number;
          category_id?: string | null;
          images?: string[];
          sizes?: string[];
          features?: string[];
          is_new?: boolean;
          is_active?: boolean;
          inventory_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          sku?: string;
          name?: string;
          description?: string | null;
          price?: number;
          category_id?: string | null;
          images?: string[];
          sizes?: string[];
          features?: string[];
          is_new?: boolean;
          is_active?: boolean;
          inventory_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string;
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          shipping_address_id: string | null;
          billing_address_id: string | null;
          subtotal: number;
          tax_amount: number;
          shipping_amount: number;
          total_amount: number;
          currency: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number?: string;
          user_id: string;
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          shipping_address_id?: string | null;
          billing_address_id?: string | null;
          subtotal: number;
          tax_amount?: number;
          shipping_amount?: number;
          total_amount: number;
          currency?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          user_id?: string;
          status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
          shipping_address_id?: string | null;
          billing_address_id?: string | null;
          subtotal?: number;
          tax_amount?: number;
          shipping_amount?: number;
          total_amount?: number;
          currency?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          quantity: number;
          size: string | null;
          unit_price: number;
          total_price: number;
          product_name: string;
          product_image: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          quantity: number;
          size?: string | null;
          unit_price: number;
          total_price: number;
          product_name: string;
          product_image?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          quantity?: number;
          size?: string | null;
          unit_price?: number;
          total_price?: number;
          product_name?: string;
          product_image?: string | null;
          created_at?: string;
        };
      };
      wishlists: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          size: string | null;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          size?: string | null;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          size?: string | null;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      order_status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
    };
  };
}
