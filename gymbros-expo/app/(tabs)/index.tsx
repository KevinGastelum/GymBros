import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedScrollHandler, 
  interpolate, 
  Extrapolation,
  FadeInUp,
  FadeInDown,
} from "react-native-reanimated";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../contexts/CartContext";

const { width, height } = Dimensions.get("window");

const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Oversized Pump Cover",
    price: 1100.0,
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "2",
    name: "Seamless High-Rise",
    price: 900.0,
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "3",
    name: "Pro Compression Tee",
    price: 700.0,
    category: "Training",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef03a7403f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Matte Black Bottle",
    price: 500.0,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1602143303410-7199ec42ac0a?q=80&w=600&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  {
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  },
];

const HERO_IMAGE = require("../../assets/hero-art.png");

import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const heroStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0, 450],
      [1.2, 1, 1], 
      Extrapolation.CLAMP
    );
    return {
      transform: [{ scale }],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 200],
      [0, -100], 
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollY.value,
      [0, 600], // Extended fade out to keep text visible longer
      [1, 0],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  return (
    <View className="flex-1 bg-black">
      {/* Fixed Header that appears on scroll */}
      <Animated.View 
        style={[headerStyle, { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: 'rgba(0,0,0,0.8)', paddingTop: 50, paddingBottom: 10, paddingHorizontal: 20 }]}
        entering={FadeInDown.duration(800).delay(500).springify()}
      >
         <View className="flex-row justify-between items-center">
            <Animated.Text 
              entering={FadeInUp.duration(1000).springify().damping(12)}
              className="text-xl font-black text-white tracking-tight"
              style={{ color: '#FFFFFF' }}
            >
              GYM<Text className="text-primary italic">BROS</Text>
            </Animated.Text>
         </View>
      </Animated.View>

      <Animated.ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 100 }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* Full Screen Hero Section */}
        <View className="mb-0" style={{ height, position: 'relative' }}>
            <Animated.Image
              source={HERO_IMAGE}
              style={[heroStyle, { width: '100%', height: '100%' }]}
              resizeMode="cover"
            />
            {/* Gradient Overlays for Blending */}
            <LinearGradient
               colors={['transparent', '#000000']}
               style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 400, zIndex: 1 }}
            />
            <LinearGradient
               colors={['#000000', 'transparent']}
               style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 180, opacity: 0.9 }}
            />
            
            {/* Initial Header Overlay */}
            <View className="absolute top-14 left-6 z-10 flex-row">
               <Animated.Text 
                 entering={FadeInUp.duration(1000).delay(300).springify().damping(12)}
                 className="text-2xl font-black text-white tracking-tighter shadow-lg"
                 style={{ opacity: 1, color: '#FFFFFF', zIndex: 50 }} 
               >
                  GYM<Text className="text-primary italic">BROS</Text>
               </Animated.Text>
            </View>

            <Animated.View style={[textStyle, { zIndex: 50, position: 'absolute', bottom: 120, left: 0, right: 0 }]} className="p-8">
               <View className="flex-row mb-4">
                  <View className="bg-primary/20 backdrop-blur-md px-3 py-1 rounded-full border border-primary/30">
                     <Text className="text-primary text-xs font-bold uppercase tracking-widest">Est. 2026</Text>
                  </View>
               </View>
              <Text className="text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-4 shadow-lg">
                Forge{"\n"}
                <Text className="text-primary italic">Yourself</Text>
              </Text>
              <Text className="text-gray-300 font-medium mb-6 max-w-[80%]">
                Premium gear for the modern athlete.
              </Text>
              <Link href="/shop" asChild>
                <Pressable className="bg-white/90 backdrop-blur-sm self-start px-8 py-4 rounded-full active:scale-95 transition-transform">
                  <Text className="text-black font-bold uppercase tracking-widest">
                    Shop Collection
                  </Text>
                </Pressable>
              </Link>
            </Animated.View>
        </View>

        {/* Bento Categories - Dark Mode Blend */}
        <View className="px-4 mb-12 mt-4 bg-black">
          <Text className="text-3xl font-black text-white tracking-tighter mb-6 text-center">
            SHOP BY CATEGORY
          </Text>
          <View className="flex-row gap-3 h-80">
             {/* Left Column (Tall) */}
             <Link href={{ pathname: "/shop", params: { category: "Men" } }} asChild>
               <Pressable className="flex-1 rounded-[24px] overflow-hidden relative active:scale-[0.98] transition-all border border-white/10">
                  <Image 
                     source={{ uri: CATEGORIES[0].image }} 
                     className="absolute inset-0 w-full h-full"
                     resizeMode="cover"
                  />
                  <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} className="absolute inset-0" />
                  <View className="absolute bottom-6 left-6">
                     <Text className="text-white text-2xl font-black uppercase tracking-tighter">{CATEGORIES[0].name}</Text>
                  </View>
               </Pressable>
             </Link>
             
             {/* Right Column (Stacked) */}
             <View className="flex-1 gap-3">
                {CATEGORIES.slice(1).map((cat) => (
                   <Link key={cat.name} href={{ pathname: "/shop", params: { category: cat.name } }} asChild>
                     <Pressable className="flex-1 rounded-[24px] overflow-hidden relative active:scale-[0.98] transition-all border border-white/10">
                        <Image 
                           source={{ uri: cat.image }} 
                           className="absolute inset-0 w-full h-full"
                           resizeMode="cover"
                        />
                        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} className="absolute inset-0" />
                        <View className="absolute bottom-4 left-4">
                           <Text className="text-white text-xl font-black uppercase tracking-tighter">{cat.name}</Text>
                        </View>
                     </Pressable>
                   </Link>
                ))}
             </View>
          </View>
        </View>

        {/* Featured - Carousel */}
        <View className="mb-12">
          <View className="px-6 flex-row justify-between items-end mb-6">
             <View>
              <Text className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                Fresh Drops
              </Text>
              <Text className="text-3xl font-black text-foreground uppercase tracking-tighter">
                Latest Gear
              </Text>
             </View>
             <Link href="/shop" asChild>
                <Pressable className="bg-secondary px-4 py-2 rounded-full">
                   <Text className="text-xs font-bold">View All</Text>
                </Pressable>
             </Link>
          </View>

          <Animated.ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 15 }}
          >
            {FEATURED_PRODUCTS.map((product) => (
              <View key={product.id} className="w-64">
                <ProductCard {...product} />
              </View>
            ))}
          </Animated.ScrollView>
        </View>

        {/* Newsletter - Minimalist */}
        <View className="mx-4 mb-8 bg-secondary p-8 rounded-[32px] items-center">
          <Text className="text-4xl font-black text-foreground uppercase tracking-tighter mb-2 text-center">
            Join The{"\n"}
            <Text className="text-primary italic">Club</Text>
          </Text>
          <Text className="text-muted-foreground text-center font-medium mb-6">
            Early access to drops. No spam.
          </Text>
          <Pressable className="bg-foreground w-full py-4 rounded-full active:opacity-90">
            <Text className="text-background font-bold text-center uppercase tracking-wider">
              Subscribe
            </Text>
          </Pressable>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
