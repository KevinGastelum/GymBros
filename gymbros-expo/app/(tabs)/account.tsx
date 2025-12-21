import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Heart, Package, Settings, ChevronRight } from "lucide-react-native";

const MENU_ITEMS = [
  { icon: Package, label: "Mis Pedidos", href: "/orders" },
  { icon: Heart, label: "Lista de Deseos", href: "/wishlist" },
  { icon: Settings, label: "Configuración", href: "/settings" },
];

export default function AccountScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-4">
        {/* Header */}
        <View className="py-6">
          <Text className="text-2xl font-black text-foreground uppercase tracking-tight">
            MI CUENTA
          </Text>
        </View>

        {/* Profile Card */}
        <View className="bg-card border border-border rounded-lg p-6 mb-6 items-center">
          <View className="w-20 h-20 bg-secondary rounded-full items-center justify-center mb-4">
            <User color="#888" size={32} />
          </View>
          <Text className="text-foreground font-bold text-lg mb-1">
            Iniciar Sesión
          </Text>
          <Text className="text-accent text-sm text-center mb-4">
            Accede a tu cuenta para ver pedidos y más
          </Text>
          <Pressable className="bg-primary px-6 py-3 rounded-sm">
            <Text className="text-black font-bold uppercase tracking-wider">
              INICIAR SESIÓN
            </Text>
          </Pressable>
        </View>

        {/* Menu Items */}
        <View className="bg-card border border-border rounded-lg overflow-hidden">
          {MENU_ITEMS.map((item, idx) => (
            <Pressable
              key={item.label}
              className={`flex-row items-center justify-between p-4 ${
                idx < MENU_ITEMS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <View className="flex-row items-center">
                <item.icon color="#888" size={20} />
                <Text className="text-foreground font-semibold ml-4">
                  {item.label}
                </Text>
              </View>
              <ChevronRight color="#888" size={18} />
            </Pressable>
          ))}
        </View>

        {/* Loyalty Banner */}
        <View className="mt-6 bg-primary/20 border border-primary/30 rounded-lg p-4">
          <Text className="text-primary font-bold uppercase tracking-wider text-sm mb-1">
            Programa de Lealtad
          </Text>
          <Text className="text-foreground text-lg font-black">
            0 <Text className="text-accent font-normal text-sm">puntos</Text>
          </Text>
          <Text className="text-accent text-xs mt-1">
            Inicia sesión para ver tus recompensas
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
