import React from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft, Check } from "lucide-react-native";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../lib/utils";

export default function CheckoutScreen() {
  const { totalPrice, clearCart } = useCart();

  const handlePlaceOrder = () => {
    alert("¡Pedido realizado con éxito! (Demo)");
    clearCart();
    router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-border">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft color="#fff" size={24} />
          </Pressable>
          <Text className="text-xl font-black text-foreground uppercase tracking-tight">
            CHECKOUT
          </Text>
        </View>

        {/* Contact Info */}
        <View className="px-4 py-6 border-b border-border">
          <Text className="text-foreground font-bold uppercase tracking-wider mb-4">
            Información de Contacto
          </Text>
          <TextInput
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            className="bg-card border border-border rounded-md px-4 py-3 text-foreground mb-3"
          />
          <TextInput
            placeholder="Teléfono"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            className="bg-card border border-border rounded-md px-4 py-3 text-foreground"
          />
        </View>

        {/* Shipping Address */}
        <View className="px-4 py-6 border-b border-border">
          <Text className="text-foreground font-bold uppercase tracking-wider mb-4">
            Dirección de Envío
          </Text>
          <View className="flex-row mb-3">
            <TextInput
              placeholder="Nombre"
              placeholderTextColor="#888"
              className="flex-1 bg-card border border-border rounded-md px-4 py-3 text-foreground mr-2"
            />
            <TextInput
              placeholder="Apellido"
              placeholderTextColor="#888"
              className="flex-1 bg-card border border-border rounded-md px-4 py-3 text-foreground"
            />
          </View>
          <TextInput
            placeholder="Dirección"
            placeholderTextColor="#888"
            className="bg-card border border-border rounded-md px-4 py-3 text-foreground mb-3"
          />
          <View className="flex-row mb-3">
            <TextInput
              placeholder="Ciudad"
              placeholderTextColor="#888"
              className="flex-1 bg-card border border-border rounded-md px-4 py-3 text-foreground mr-2"
            />
            <TextInput
              placeholder="Estado"
              placeholderTextColor="#888"
              className="flex-1 bg-card border border-border rounded-md px-4 py-3 text-foreground"
            />
          </View>
          <TextInput
            placeholder="Código Postal"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            className="bg-card border border-border rounded-md px-4 py-3 text-foreground"
          />
        </View>

        {/* Order Summary */}
        <View className="px-4 py-6">
          <Text className="text-foreground font-bold uppercase tracking-wider mb-4">
            Resumen del Pedido
          </Text>
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

      {/* Place Order Button */}
      <View className="px-4 pb-6">
        <Pressable
          onPress={handlePlaceOrder}
          className="bg-primary py-4 rounded-sm flex-row justify-center items-center"
        >
          <Check color="#000" size={18} />
          <Text className="text-black font-bold uppercase tracking-wider ml-2">
            CONFIRMAR PEDIDO
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
