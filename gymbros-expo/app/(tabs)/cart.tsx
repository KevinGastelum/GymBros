import React from "react";
import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react-native";
import { useCart } from "../../contexts/CartContext";
import { formatPrice } from "../../lib/utils";

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center px-4">
        <Text className="text-3xl font-black text-foreground uppercase tracking-tight mb-4 text-center">
          Tu Carrito{"\n"}está Vacío
        </Text>
        <Text className="text-accent text-center mb-8">
          ¡Agrega ropa nueva y sube de nivel tu entrenamiento!
        </Text>
        <Link href="/shop" asChild>
          <Pressable className="flex-row items-center bg-primary px-6 py-3 rounded-sm">
            <Text className="text-black font-bold uppercase tracking-wider mr-2">
              COMPRAR AHORA
            </Text>
            <ArrowRight color="#000" size={18} />
          </Pressable>
        </Link>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-6 flex-row justify-between items-center">
          <Text className="text-2xl font-black text-foreground uppercase tracking-tight">
            CARRITO
          </Text>
          <Pressable onPress={clearCart}>
            <Text className="text-accent text-xs uppercase tracking-wider">
              Vaciar
            </Text>
          </Pressable>
        </View>

        {/* Cart Items */}
        <View className="px-4">
          {items.map((item) => (
            <View
              key={item.id}
              className="flex-row bg-card border border-border rounded-lg p-4 mb-4"
            >
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-md"
                resizeMode="cover"
              />
              <View className="flex-1 ml-4 justify-between">
                <View>
                  <Text
                    className="text-foreground font-bold text-sm"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  {item.size && (
                    <Text className="text-accent text-xs">
                      Talla: {item.size}
                    </Text>
                  )}
                </View>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Pressable
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2"
                    >
                      <Minus color="#888" size={16} />
                    </Pressable>
                    <Text className="text-foreground font-bold mx-3">
                      {item.quantity}
                    </Text>
                    <Pressable
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2"
                    >
                      <Plus color="#888" size={16} />
                    </Pressable>
                  </View>
                  <Text className="text-foreground font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={() => removeFromCart(item.id)}
                className="p-2 ml-2"
              >
                <Trash2 color="#ff4444" size={18} />
              </Pressable>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View className="px-4 py-6 mt-4 border-t border-border">
          <View className="flex-row justify-between mb-2">
            <Text className="text-accent">Subtotal</Text>
            <Text className="text-foreground font-semibold">
              {formatPrice(totalPrice)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-accent">Envío</Text>
            <Text className="text-primary font-semibold">GRATIS</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-accent">IVA (16%)</Text>
            <Text className="text-foreground font-semibold">
              {formatPrice(totalPrice * 0.16)}
            </Text>
          </View>
          <View className="flex-row justify-between mt-4 pt-4 border-t border-border">
            <Text className="text-foreground text-lg font-black">TOTAL</Text>
            <Text className="text-foreground text-lg font-black">
              {formatPrice(totalPrice * 1.16)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View className="px-4 pb-6">
        <Pressable
          onPress={() => router.push("/checkout")}
          className="bg-primary py-4 rounded-sm flex-row justify-center items-center"
        >
          <Text className="text-black font-bold uppercase tracking-wider mr-2">
            PAGAR AHORA
          </Text>
          <ArrowRight color="#000" size={18} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
