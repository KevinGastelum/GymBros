import React from "react";
import { View, Text, Pressable, ScrollView, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { User, Heart, Package, Settings, ChevronRight, LogOut, Mail } from "lucide-react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

const MENU_ITEMS = [
  { icon: Package, label: "Mis Pedidos", href: "/orders" },
  { icon: Heart, label: "Lista de Deseos", href: "/wishlist" },
  { icon: Settings, label: "Configuración", href: "/settings" },
];

export default function AccountScreen() {
  const { user, loading, signOut, signInWithGoogle } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#c4fb6d" />
      </View>
    );
  }

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

          {user ? (
            // ============= LOGGED IN STATE =============
            <>
              {/* Profile Card */}
              <View className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 items-center">
                <View className="w-24 h-24 bg-primary/20 rounded-full items-center justify-center mb-6 border-2 border-primary/30">
                  {user.user_metadata?.avatar_url ? (
                    <Image 
                      source={{ uri: user.user_metadata.avatar_url }}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <User color="#c4fb6d" size={40} />
                  )}
                </View>
                <Text className="text-white font-black text-xl mb-1 tracking-tight">
                  {user.user_metadata?.full_name || 'Usuario'}
                </Text>
                <Text className="text-gray-400 text-sm font-medium mb-4">
                  {user.email}
                </Text>
                <View className="bg-primary/10 px-4 py-2 rounded-full">
                  <Text className="text-primary font-bold text-xs uppercase tracking-wider">
                    Miembro GymBros
                  </Text>
                </View>
              </View>

              {/* Menu Items */}
              <View className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden mb-6">
                {MENU_ITEMS.map((item, idx) => (
                  <Pressable
                    key={item.label}
                    onPress={() => router.push(item.href as any)}
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

              {/* Logout Button */}
              <Pressable 
                onPress={handleLogout}
                className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex-row items-center justify-center"
              >
                <LogOut color="#ef4444" size={20} />
                <Text className="text-red-400 font-bold ml-3 uppercase tracking-wider">
                  Cerrar Sesión
                </Text>
              </Pressable>

              {/* Loyalty Banner */}
              <View className="mt-8 bg-black border border-primary/30 rounded-2xl p-6 relative overflow-hidden">
                <View className="absolute right-0 top-0 w-20 h-20 bg-primary/10 rounded-full -mr-10 -mt-10 blur-xl" />
                <Text className="text-primary font-bold uppercase tracking-widest text-xs mb-2">
                  Programa de Lealtad
                </Text>
                <Text className="text-white text-3xl font-black tracking-tighter">
                  150 <Text className="text-gray-500 font-medium text-lg">puntos</Text>
                </Text>
                <Text className="text-gray-400 text-xs mt-2 font-medium">
                  ¡Sigue comprando para ganar más recompensas!
                </Text>
              </View>
            </>
          ) : (
            // ============= LOGGED OUT STATE =============
            <>
              {/* Profile Card - Login Prompt */}
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
                   {/* Google Button */}
                   <Pressable 
                     onPress={() => signInWithGoogle()}
                     className="bg-white px-8 py-4 rounded-full w-full active:scale-95 transition-transform flex-row justify-center items-center"
                   >
                     <AntDesign name="google" size={24} color="black" style={{ marginRight: 12 }} />
                     <Text className="text-black font-bold uppercase tracking-widest text-center">
                       Continuar con Google
                     </Text>
                   </Pressable>

                   {/* Apple Button */}
                   <Pressable 
                     className="bg-white px-8 py-4 rounded-full w-full active:scale-95 transition-transform flex-row justify-center items-center opacity-50"
                   >
                     <FontAwesome name="apple" size={24} color="black" style={{ marginRight: 12 }} />
                     <Text className="text-black font-bold uppercase tracking-widest text-center">
                       Continuar con Apple
                     </Text>
                   </Pressable>

                   {/* Email Button */}
                   <Pressable 
                     onPress={() => router.push('/auth/login')}
                     className="bg-primary px-8 py-4 rounded-full w-full active:scale-95 transition-transform flex-row justify-center items-center"
                   >
                     <Mail color="#000" size={18} />
                     <Text className="text-black font-bold uppercase tracking-widest text-center ml-2">
                       Continuar con Email
                     </Text>
                   </Pressable>
                </View>
              </View>

              {/* Menu Items - Disabled */}
              <View className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden opacity-50">
                {MENU_ITEMS.map((item, idx) => (
                  <View
                    key={item.label}
                    className={`flex-row items-center justify-between p-5 ${
                      idx < MENU_ITEMS.length - 1 ? "border-b border-white/5" : ""
                    }`}
                  >
                    <View className="flex-row items-center">
                      <item.icon color="#666" size={22} />
                      <Text className="text-gray-500 font-bold ml-4 tracking-wide">
                        {item.label}
                      </Text>
                    </View>
                    <ChevronRight color="#444" size={20} />
                  </View>
                ))}
              </View>

              {/* Loyalty Banner - Locked */}
              <View className="mt-8 bg-black border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                <Text className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">
                  Programa de Lealtad
                </Text>
                <Text className="text-gray-600 text-3xl font-black tracking-tighter">
                  0 <Text className="text-gray-700 font-medium text-lg">puntos</Text>
                </Text>
                <Text className="text-gray-600 text-xs mt-2 font-medium">
                  Inicia sesión para ver tus recompensas
                </Text>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
