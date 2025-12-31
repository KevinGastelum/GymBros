import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react-native";
import { useCart } from "../../contexts/CartContext";
import { useCurrency } from "../../lib/currency";

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  if (items.length === 0) {
    return (
      <View className="flex-1 bg-black justify-center items-center px-6">
        <Text className="text-4xl font-black text-white uppercase tracking-tighter mb-4 text-center">
          Tu Carrito{"\n"}está Vacío
        </Text>
        <Text className="text-gray-400 text-center mb-8 font-medium">
          ¡Agrega ropa nueva y sube de nivel tu entrenamiento!
        </Text>
        <Link href="/shop" asChild>
          <Pressable className="flex-row items-center bg-primary px-8 py-4 rounded-full active:scale-95 transition-transform">
            <Text className="text-black font-bold uppercase tracking-widest mr-2">
              COMPRAR AHORA
            </Text>
            <ArrowRight color="#000" size={18} />
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="px-6 py-8 flex-row justify-between items-center">
            <Text className="text-4xl font-black text-white uppercase tracking-tighter">
              CARRITO
            </Text>
            <Pressable onPress={clearCart}>
              <Text className="text-primary text-xs uppercase tracking-widest font-bold">
                Vaciar
              </Text>
            </Pressable>
          </View>

          {/* Cart Items */}
          <View className="px-6">
            {items.map((item) => (
              <View
                key={item.id}
                className="flex-row bg-white/5 border border-white/10 rounded-2xl p-4 mb-4"
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-24 h-24 rounded-xl"
                  resizeMode="cover"
                />
                <View className="flex-1 ml-4 justify-between py-1">
                  <View>
                    <Text
                      className="text-white font-bold text-base"
                      numberOfLines={1}
                    >
                      {item.name}
                    </Text>
                    {item.size && (
                      <Text className="text-gray-400 text-xs mt-1">
                        Talla: {item.size}
                      </Text>
                    )}
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center bg-white/10 rounded-full px-2 py-1">
                      <Pressable
                        onPress={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-1.5"
                      >
                        <Minus color="#fff" size={14} />
                      </Pressable>
                      <Text className="text-white font-bold mx-3">
                        {item.quantity}
                      </Text>
                      <Pressable
                        onPress={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-1.5"
                      >
                        <Plus color="#fff" size={14} />
                      </Pressable>
                    </View>
                    <Text className="text-primary font-bold text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => removeFromCart(item.id, item.size)}
                  className="p-2 -mr-2 -mt-2"
                >
                  <Trash2 color="#ff4444" size={18} />
                </Pressable>
              </View>
            ))}
          </View>

          {/* Order Summary */}
          <View className="px-6 py-8 mt-4 border-t border-white/10 bg-white/5 rounded-t-[32px]">
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-400 font-medium">Subtotal</Text>
              <Text className="text-white font-semibold">
                {formatPrice(totalPrice)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-400 font-medium">Envío</Text>
              <Text className="text-primary font-bold">GRATIS</Text>
            </View>
            <View className="flex-row justify-between mb-6">
              <Text className="text-gray-400 font-medium">IVA (16%)</Text>
              <Text className="text-white font-semibold">
                {formatPrice(totalPrice * 0.16)}
              </Text>
            </View>
            <View className="flex-row justify-between pt-6 border-t border-white/10 mb-8">
              <Text className="text-white text-xl font-black tracking-tight">TOTAL</Text>
              <Text className="text-white text-xl font-black tracking-tight">
                {formatPrice(totalPrice * 1.16)}
              </Text>
            </View>
            
            <Pressable
              onPress={() => router.push("/checkout")}
              className="bg-primary py-4 rounded-full flex-row justify-center items-center mb-8 active:scale-95 transition-transform"
            >
              <Text className="text-black font-bold uppercase tracking-widest mr-2">
                PAGAR AHORA
              </Text>
              <ArrowRight color="#000" size={20} />
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
