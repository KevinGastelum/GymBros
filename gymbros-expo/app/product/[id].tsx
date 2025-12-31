import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router, useRouter } from "expo-router";
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react-native";
import { useCart } from "../../contexts/CartContext";
import { LinearGradient } from "expo-linear-gradient";
import ZoomableImage from "../../components/ZoomableImage";
import { PRODUCTS } from "../../lib/products";
import { useCurrency } from "../../lib/currency";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const product = PRODUCTS[id || "1"];

  if (!product) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white text-xl font-bold">
          Producto no encontrado
        </Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError("Requerido");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: selectedSize,
    });
    router.push("/cart");
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Immersive Helper Header */}
        <View className="absolute top-0 left-0 right-0 z-10 flex-row justify-between items-center px-6 pt-14 pb-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full items-center justify-center border border-white/10"
          >
            <ArrowLeft color="#fff" size={20} />
          </Pressable>
          <Pressable 
            className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full items-center justify-center border border-white/10"
            onPress={() => router.push('/cart')}
          >
            <ShoppingBag color="#fff" size={20} />
          </Pressable>
        </View>

        {/* Product Image Carousel */}
        <View className="h-[550px] w-full relative">
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {product.images.map((img: string, idx: number) => (
              <View key={idx} style={{ width: Dimensions.get('window').width, height: 550 }}>
                <ZoomableImage
                  source={{ uri: img }}
                  width={Dimensions.get('window').width}
                  height={550}
                >
                  <LinearGradient 
                     colors={['transparent', '#000000']} 
                     style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 150 }} 
                  />
                </ZoomableImage>
              </View>
            ))}
          </ScrollView>
          
          {/* Pagination Dots */}
          <View className="absolute bottom-8 left-0 right-0 flex-row justify-center gap-2">
             {product.images.map((_: any, idx: number) => (
                <View key={idx} className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-primary' : 'bg-white/30'}`} />
             ))}
          </View>
        </View>

        {/* Product Details */}
        <View className="px-6 -mt-6">
          <View className="flex-row justify-between items-start mb-2">
             <Text className="text-3xl font-black text-white uppercase tracking-tighter flex-1 mr-4 leading-8">
                {product.name}
             </Text>
             <Text className="text-2xl font-bold text-primary tracking-tight">
                {formatPrice(product.price)}
             </Text>
          </View>

          <Text className="text-gray-400 leading-6 mb-8 font-medium">
            {product.description}
          </Text>

          {/* Sizes */}
          <View className="flex-row justify-between items-center mb-3">
             <Text className="text-white font-bold uppercase tracking-widest text-xs">
               Selecciona Talla
             </Text>
             {error && (
                <Text className="text-red-500 text-xs font-bold uppercase tracking-widest animate-pulse">
                   * {error}
                </Text>
             )}
          </View>
          <View className="flex-row gap-3 mb-8 flex-wrap">
            {product.sizes.map((size: string) => (
              <Pressable
                key={size}
                onPress={() => {
                   setSelectedSize(size);
                   setError(null);
                }}
                className={`w-14 h-14 rounded-full items-center justify-center border transition-all ${
                  selectedSize === size
                    ? "bg-white border-white"
                    : error 
                      ? "bg-red-500/10 border-red-500"
                      : "bg-white/5 border-white/20"
                }`}
              >
                <Text
                  className={`font-bold ${
                    selectedSize === size 
                      ? "text-black" 
                      : error 
                        ? "text-red-500" 
                        : "text-gray-400"
                  }`}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Features */}
          <View className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10">
            <Text className="text-white font-bold uppercase tracking-widest text-xs mb-4">
              Características
            </Text>
            {product.features.map((feature: string, idx: number) => (
              <View key={idx} className="flex-row items-center mb-2">
                <View className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                <Text className="text-gray-300 font-medium">{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Footer */}
      <View className="px-6 py-6 border-t border-white/10 bg-black">
        <Pressable
          onPress={handleAddToCart}
          className="bg-primary py-4 rounded-full flex-row justify-center items-center active:scale-95 transition-transform"
        >
          <Text className="text-black font-bold uppercase tracking-widest mr-2">
            AGREGAR AL CARRITO
          </Text>
          <Text className="text-black font-bold text-xs bg-black/10 px-2 py-0.5 rounded ml-2">
             {formatPrice(product.price)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
