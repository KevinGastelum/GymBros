import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
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

const FILTERS = ["Todos", "Hombres", "Mujeres", "Accesorios"];

export default function ShopScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [activeFilter, setActiveFilter] = useState("Todos");

  useEffect(() => {
    if (category) {
        if (category === 'Men') setActiveFilter('Hombres');
        else if (category === 'Women') setActiveFilter('Mujeres');
        else if (category === 'Accessories') setActiveFilter('Accesorios');
        else setActiveFilter(category);
    }
  }, [category]);

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeFilter === "Todos") return true;
    if (activeFilter === "Hombres") return product.category.includes("Hombres");
    if (activeFilter === "Mujeres") return product.category.includes("Mujeres");
    if (activeFilter === "Accesorios") return product.category.includes("Accesorios");
    return true;
  });

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="px-6 py-8 flex-row justify-between items-end">
             <View>
                <Text className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
                TIENDA
                </Text>
                <Text className="text-gray-400 font-medium tracking-wide">
                Descubre nuestra colección completa
                </Text>
             </View>
             <View>
                <Text className="text-lg font-black text-white tracking-tighter">
                    GYM<Text className="text-primary italic">BROS</Text>
                </Text>
             </View>
          </View>

          {/* Filters */}
          <View className="px-6 mb-8">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {FILTERS.map((filter) => (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 mr-3 rounded-full border ${
                    activeFilter === filter
                      ? "bg-primary border-primary"
                      : "bg-white/5 border-white/20"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold uppercase tracking-widest ${
                        activeFilter === filter ? "text-black" : "text-white"
                    }`}
                  >
                    {filter}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Product Grid */}
          <View className="px-4 flex-row flex-wrap justify-between pb-24">
            {filteredProducts.map((product) => (
              <View key={product.id} className="w-[48%] mb-6">
                <ProductCard {...product} />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
