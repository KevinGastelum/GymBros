import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/ProductCard";

const PRODUCTS = [
  {
    id: "1",
    name: "Sudadera Oversized Esencial",
    price: 1100.0,
    category: "Lifestyle Hombres",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "2",
    name: "Mallas Seamless High-Rise",
    price: 900.0,
    category: "Performance Mujeres",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "3",
    name: "Set Deportivo Pink",
    price: 1300.0,
    category: "Performance Mujeres",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Sudadera Gym Pro",
    price: 1200.0,
    category: "Lifestyle Hombres",
    image:
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Cinturón de Levantamiento",
    price: 1500.0,
    category: "Accesorios",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Pantalones Deportivos Track",
    price: 1200.0,
    category: "Entrenamiento Hombres",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop",
  },
];

export default function ShopScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-6">
          <Text className="text-3xl font-black text-foreground uppercase tracking-tight mb-2">
            TIENDA
          </Text>
          <Text className="text-accent">
            Descubre nuestra colección completa
          </Text>
        </View>

        {/* Filters */}
        <View className="px-4 mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {["Todos", "Hombres", "Mujeres", "Accesorios"].map((filter, idx) => (
              <Pressable
                key={filter}
                className={`px-4 py-2 mr-2 rounded-sm border ${
                  idx === 0
                    ? "bg-primary border-primary"
                    : "bg-transparent border-border"
                }`}
              >
                <Text
                  className={`text-xs font-bold uppercase tracking-wider ${
                    idx === 0 ? "text-black" : "text-foreground"
                  }`}
                >
                  {filter}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Product Grid */}
        <View className="px-4 flex-row flex-wrap justify-between">
          {PRODUCTS.map((product) => (
            <View key={product.id} className="w-[48%] mb-4">
              <ProductCard {...product} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
