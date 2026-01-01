import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Package, ChevronRight, ShoppingBag } from 'lucide-react-native';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useCurrency } from '../lib/currency';

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: {
    id: string;
    product_name: string;
    product_image: string;
    quantity: number;
  }[];
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pendiente', color: 'bg-yellow-500/20 text-yellow-400' },
  confirmed: { label: 'Confirmado', color: 'bg-blue-500/20 text-blue-400' },
  processing: { label: 'Procesando', color: 'bg-purple-500/20 text-purple-400' },
  shipped: { label: 'Enviado', color: 'bg-cyan-500/20 text-cyan-400' },
  delivered: { label: 'Entregado', color: 'bg-green-500/20 text-green-400' },
  cancelled: { label: 'Cancelado', color: 'bg-red-500/20 text-red-400' },
  refunded: { label: 'Reembolsado', color: 'bg-gray-500/20 text-gray-400' },
};

export default function OrdersScreen() {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          order_number,
          status,
          total_amount,
          created_at,
          order_items (
            id,
            product_name,
            product_image,
            quantity
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center px-6">
        <Package color="#666" size={64} />
        <Text className="text-white text-xl font-bold mt-4 text-center">
          Inicia sesión para ver tus pedidos
        </Text>
        <Pressable
          onPress={() => router.push('/auth/login')}
          className="bg-primary px-8 py-4 rounded-xl mt-6"
        >
          <Text className="text-black font-bold uppercase tracking-wider">
            Iniciar Sesión
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b border-white/10">
        <Pressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft color="#fff" size={24} />
        </Pressable>
        <Text className="text-xl font-black text-white uppercase tracking-tight">
          MIS PEDIDOS
        </Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#c4fb6d" />
        </View>
      ) : orders.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <ShoppingBag color="#666" size={64} />
          <Text className="text-white text-xl font-bold mt-4 text-center">
            No tienes pedidos aún
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            Tus pedidos aparecerán aquí una vez que realices una compra
          </Text>
          <Pressable
            onPress={() => router.push('/(tabs)/shop')}
            className="bg-primary px-8 py-4 rounded-xl mt-6"
          >
            <Text className="text-black font-bold uppercase tracking-wider">
              Ir a la Tienda
            </Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView 
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20, paddingBottom: 100 }}
        >
          {orders.map((order) => {
            const status = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
            const itemCount = order.order_items.reduce((sum, item) => sum + item.quantity, 0);
            
            return (
              <Pressable
                key={order.id}
                onPress={() => router.push(`/order/${order.id}`)}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 active:bg-white/10"
              >
                {/* Header */}
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-white font-bold text-lg">
                      {order.order_number}
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1">
                      {formatDate(order.created_at)}
                    </Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${status.color.split(' ')[0]}`}>
                    <Text className={`text-xs font-bold ${status.color.split(' ')[1]}`}>
                      {status.label}
                    </Text>
                  </View>
                </View>

                {/* Items Preview */}
                <View className="flex-row items-center mb-3">
                  {order.order_items.slice(0, 3).map((item, idx) => (
                    <View
                      key={item.id}
                      className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden border border-white/10"
                      style={{ marginLeft: idx > 0 ? -8 : 0, zIndex: 3 - idx }}
                    >
                      {item.product_image && (
                        <Image
                          source={{ uri: item.product_image }}
                          className="w-full h-full"
                          resizeMode="cover"
                        />
                      )}
                    </View>
                  ))}
                  {order.order_items.length > 3 && (
                    <View className="w-12 h-12 bg-white/10 rounded-lg items-center justify-center border border-white/10 -ml-2">
                      <Text className="text-gray-400 text-xs font-bold">
                        +{order.order_items.length - 3}
                      </Text>
                    </View>
                  )}
                  <Text className="text-gray-400 ml-3 text-sm">
                    {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}
                  </Text>
                </View>

                {/* Footer */}
                <View className="flex-row justify-between items-center pt-3 border-t border-white/10">
                  <Text className="text-white font-black text-lg">
                    {formatPrice(order.total_amount)}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-primary font-medium text-sm mr-1">
                      Ver detalles
                    </Text>
                    <ChevronRight color="#c4fb6d" size={16} />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
