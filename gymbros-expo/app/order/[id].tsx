import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Package, MapPin, Calendar, Truck, CreditCard } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { useCurrency } from '../../lib/currency';

interface OrderDetails {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  total_amount: number;
  currency: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  addresses: {
    full_name: string;
    street_line1: string;
    city: string;
    state_province: string;
    postal_code: string;
    phone: string;
  } | null;
  order_items: {
    id: string;
    product_name: string;
    product_image: string;
    size: string | null;
    quantity: number;
    unit_price: number;
    total_price: number;
  }[];
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  pending: { label: 'Pendiente', color: 'bg-yellow-500', icon: '⏳' },
  confirmed: { label: 'Confirmado', color: 'bg-blue-500', icon: '✓' },
  processing: { label: 'Procesando', color: 'bg-purple-500', icon: '📦' },
  shipped: { label: 'Enviado', color: 'bg-cyan-500', icon: '🚚' },
  delivered: { label: 'Entregado', color: 'bg-green-500', icon: '✅' },
  cancelled: { label: 'Cancelado', color: 'bg-red-500', icon: '✕' },
  refunded: { label: 'Reembolsado', color: 'bg-gray-500', icon: '↩' },
};

const STATUS_ORDER = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && user) {
      fetchOrderDetails();
    }
  }, [id, user]);

  const fetchOrderDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          addresses:shipping_address_id (*),
          order_items (*)
        `)
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#c4fb6d" />
      </SafeAreaView>
    );
  }

  if (!order) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center px-6">
        <Package color="#666" size={64} />
        <Text className="text-white text-xl font-bold mt-4">Pedido no encontrado</Text>
        <Pressable onPress={() => router.back()} className="mt-6">
          <Text className="text-primary font-bold">Volver</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const currentStatusIndex = STATUS_ORDER.indexOf(order.status);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b border-white/10">
        <Pressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="#fff" size={24} />
        </Pressable>
        <View className="flex-1">
          <Text className="text-xl font-black text-white uppercase tracking-tight">
            {order.order_number}
          </Text>
          <Text className="text-gray-500 text-xs mt-0.5">
            {formatDate(order.created_at)}
          </Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Status Banner */}
        <View className={`mx-6 mt-6 p-4 rounded-2xl ${status.color}/20 border ${status.color}/30`}>
          <View className="flex-row items-center">
            <Text className="text-2xl mr-3">{status.icon}</Text>
            <View>
              <Text className={`font-bold text-lg ${status.color.replace('bg-', 'text-')}`}>
                {status.label}
              </Text>
              <Text className="text-gray-400 text-sm">
                Actualizado: {formatDate(order.updated_at)}
              </Text>
            </View>
          </View>
        </View>

        {/* Progress Timeline */}
        {order.status !== 'cancelled' && order.status !== 'refunded' && (
          <View className="px-6 py-6">
            <View className="flex-row justify-between items-center">
              {STATUS_ORDER.map((s, idx) => {
                const isCompleted = idx <= currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;
                return (
                  <View key={s} className="items-center" style={{ flex: 1 }}>
                    <View className={`w-8 h-8 rounded-full items-center justify-center ${
                      isCompleted ? 'bg-primary' : 'bg-white/10'
                    } ${isCurrent ? 'border-2 border-primary' : ''}`}>
                      <Text className={isCompleted ? 'text-black' : 'text-gray-500'}>
                        {STATUS_CONFIG[s].icon}
                      </Text>
                    </View>
                    {idx < STATUS_ORDER.length - 1 && (
                      <View className={`absolute top-4 left-1/2 w-full h-0.5 ${
                        idx < currentStatusIndex ? 'bg-primary' : 'bg-white/10'
                      }`} style={{ transform: [{ translateX: 16 }] }} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Items */}
        <View className="px-6">
          <Text className="text-white font-bold uppercase tracking-wider mb-4">
            Artículos
          </Text>
          <View className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {order.order_items.map((item, idx) => (
              <View
                key={item.id}
                className={`flex-row p-4 ${
                  idx < order.order_items.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <View className="w-16 h-16 bg-white/10 rounded-xl overflow-hidden">
                  {item.product_image && (
                    <Image
                      source={{ uri: item.product_image }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  )}
                </View>
                <View className="flex-1 ml-4">
                  <Text className="text-white font-bold">{item.product_name}</Text>
                  <Text className="text-gray-500 text-sm">
                    {item.size && `Talla: ${item.size} · `}Cantidad: {item.quantity}
                  </Text>
                  <Text className="text-primary font-bold mt-1">
                    {formatPrice(item.total_price)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Shipping Address */}
        {order.addresses && (
          <View className="px-6 mt-6">
            <Text className="text-white font-bold uppercase tracking-wider mb-4">
              Dirección de Envío
            </Text>
            <View className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <View className="flex-row items-center mb-2">
                <MapPin color="#c4fb6d" size={16} />
                <Text className="text-gray-400 ml-2 text-xs uppercase tracking-wider">
                  Enviar a
                </Text>
              </View>
              <Text className="text-white font-medium">
                {order.addresses.full_name}
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                {order.addresses.street_line1}
              </Text>
              <Text className="text-gray-400 text-sm">
                {order.addresses.city}, {order.addresses.state_province} {order.addresses.postal_code}
              </Text>
              {order.addresses.phone && (
                <Text className="text-gray-400 text-sm mt-1">
                  Tel: {order.addresses.phone}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Order Summary */}
        <View className="px-6 mt-6">
          <Text className="text-white font-bold uppercase tracking-wider mb-4">
            Resumen
          </Text>
          <View className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">Subtotal</Text>
              <Text className="text-white">{formatPrice(order.subtotal)}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">Envío</Text>
              <Text className="text-primary">GRATIS</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">IVA</Text>
              <Text className="text-white">{formatPrice(order.tax_amount)}</Text>
            </View>
            <View className="flex-row justify-between pt-3 mt-2 border-t border-white/10">
              <Text className="text-white font-black text-lg">Total</Text>
              <Text className="text-white font-black text-lg">{formatPrice(order.total_amount)}</Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {order.notes && (
          <View className="px-6 mt-6">
            <Text className="text-white font-bold uppercase tracking-wider mb-4">
              Notas
            </Text>
            <View className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <Text className="text-gray-400">{order.notes}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
