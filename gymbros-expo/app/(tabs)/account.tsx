import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User, Heart, Package, Settings, ChevronRight } from "lucide-react-native";

const MENU_ITEMS = [
  { icon: Package, label: "Mis Pedidos", href: "/orders" },
  { icon: Heart, label: "Lista de Deseos", href: "/wishlist" },
  { icon: Settings, label: "Configuración", href: "/settings" },
];

export default function AccountScreen() {
  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView 
          className="flex-1 px-6" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Header */}
          <View className="py-8">
            <Text className="text-4xl font-black text-white uppercase tracking-tighter">
              MI CUENTA
            </Text>
          </View>

          {/* Profile Card */}
          <View className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 items-center">
            <View className="w-24 h-24 bg-white/10 rounded-full items-center justify-center mb-6 border border-white/5">
              <User color="#fff" size={40} />
            </View>
            <Text className="text-white font-black text-xl mb-2 tracking-tight">
              Iniciar Sesión
            </Text>
            <Text className="text-gray-400 text-sm text-center mb-6 font-medium">
              Accede a tu cuenta para ver pedidos y más
            </Text>
            <View className="w-full gap-3">
               <Pressable className="bg-white/10 px-8 py-4 rounded-full w-full active:scale-95 transition-transform flex-row justify-center items-center border border-white/10">
                  <Text className="text-white font-bold uppercase tracking-widest text-center">
                    Continue with Google
                  </Text>
               </Pressable>
               <Pressable className="bg-white/10 px-8 py-4 rounded-full w-full active:scale-95 transition-transform flex-row justify-center items-center border border-white/10">
                  <Text className="text-white font-bold uppercase tracking-widest text-center">
                    Continue with Apple
                  </Text>
               </Pressable>
                <Pressable className="bg-primary px-8 py-4 rounded-full w-full active:scale-95 transition-transform mt-2">
                  <Text className="text-black font-bold uppercase tracking-widest text-center">
                    Continue with Email
                  </Text>
                </Pressable>
            </View>
          </View>

          {/* Menu Items */}
          <View className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            {MENU_ITEMS.map((item, idx) => (
              <Pressable
                key={item.label}
                className={`flex-row items-center justify-between p-5 ${
                  idx < MENU_ITEMS.length - 1 ? "border-b border-white/5" : ""
                } active:bg-white/5 transition-colors`}
              >
                <View className="flex-row items-center">
                  <item.icon color="#c4fb6d" size={22} />
                  <Text className="text-white font-bold ml-4 tracking-wide">
                    {item.label}
                  </Text>
                </View>
                <ChevronRight color="#666" size={20} />
              </Pressable>
            ))}
          </View>

          {/* Loyalty Banner */}
          <View className="mt-8 bg-black border border-primary/30 rounded-2xl p-6 relative overflow-hidden">
            <View className="absolute right-0 top-0 w-20 h-20 bg-primary/10 rounded-full -mr-10 -mt-10 blur-xl" />
            <Text className="text-primary font-bold uppercase tracking-widest text-xs mb-2">
              Programa de Lealtad
            </Text>
            <Text className="text-white text-3xl font-black tracking-tighter">
              0 <Text className="text-gray-500 font-medium text-lg">puntos</Text>
            </Text>
            <Text className="text-gray-400 text-xs mt-2 font-medium">
              Inicia sesión para ver tus recompensas
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
