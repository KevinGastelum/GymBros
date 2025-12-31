import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import ProductCard from "../../components/ProductCard";
import { getShopProducts } from "../../lib/products";

const PRODUCTS = getShopProducts();

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
