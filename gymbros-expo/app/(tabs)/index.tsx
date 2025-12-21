import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/ProductCard";

const { width } = Dimensions.get("window");

const FEATURED_PRODUCTS = [
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
];

const CATEGORIES = [
  {
    name: "Hombres",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Mujeres",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Accesorios",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 py-4">
          <Text className="text-2xl font-bold text-foreground tracking-tight">
            GYM<Text className="text-primary italic">BROS</Text>
          </Text>
        </View>

        {/* Hero Section */}
        <View className="relative h-96 mx-4 rounded-lg overflow-hidden mb-8">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop",
            }}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/50" />
          <View className="absolute inset-0 justify-center items-center p-6">
            <Text className="text-4xl font-black text-white text-center uppercase tracking-tight mb-2">
              DESAFÍA TUS{"\n"}
              <Text className="text-primary italic">LÍMITES</Text>
            </Text>
            <Text className="text-gray-300 text-center mb-6 text-sm">
              Ropa deportiva premium diseñada para quienes exigen excelencia.
            </Text>
            <Link href="/shop" asChild>
              <Pressable className="flex-row items-center bg-primary px-6 py-3 rounded-sm">
                <Text className="text-black font-bold uppercase tracking-wider mr-2">
                  COMPRAR AHORA
                </Text>
                <ArrowRight color="#000" size={18} />
              </Pressable>
            </Link>
          </View>
        </View>

        {/* Categories */}
        <View className="px-4 mb-8">
          <Text className="text-xl font-black text-foreground uppercase tracking-tight mb-4">
            CATEGORÍAS
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-3"
          >
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.name}
                className="relative w-32 h-40 rounded-lg overflow-hidden mr-3"
              >
                <Image
                  source={{ uri: cat.image }}
                  className="absolute inset-0 w-full h-full"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/40" />
                <View className="absolute inset-0 justify-center items-center">
                  <Text className="text-white font-bold uppercase tracking-widest text-sm">
                    {cat.name}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View className="px-4 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                Acaba De Llegar
              </Text>
              <Text className="text-xl font-black text-foreground uppercase tracking-tight">
                ÚLTIMO EQUIPO
              </Text>
            </View>
            <Link href="/shop" asChild>
              <Pressable>
                <Text className="text-primary text-xs font-bold uppercase tracking-wider">
                  Ver Todo
                </Text>
              </Pressable>
            </Link>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {FEATURED_PRODUCTS.map((product) => (
              <View key={product.id} className="w-[48%] mb-4">
                <ProductCard {...product} />
              </View>
            ))}
          </View>
        </View>

        {/* Newsletter CTA */}
        <View className="mx-4 mb-8 bg-primary p-6 rounded-lg">
          <Text className="text-2xl font-black text-black uppercase tracking-tight mb-2 text-center">
            ÚNETE AL{"\n"}
            <Text className="italic">MOVIMIENTO</Text>
          </Text>
          <Text className="text-black/70 text-center text-sm mb-4">
            Acceso exclusivo a lanzamientos y eventos.
          </Text>
          <Pressable className="bg-black py-3 rounded-sm">
            <Text className="text-white font-bold text-center uppercase tracking-wider">
              SUSCRIBIRSE
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
