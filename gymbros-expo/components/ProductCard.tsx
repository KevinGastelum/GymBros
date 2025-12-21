import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import { formatPrice } from "../lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isNew,
}: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} asChild>
      <Pressable className="bg-card rounded-lg overflow-hidden border border-border">
        <View className="relative aspect-square">
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {isNew && (
            <View className="absolute top-2 left-2 bg-primary px-2 py-1 rounded-sm">
              <Text className="text-[10px] font-bold text-black uppercase">
                Nuevo
              </Text>
            </View>
          )}
        </View>
        <View className="p-3">
          <Text
            className="text-accent text-[10px] uppercase tracking-wider mb-1"
            numberOfLines={1}
          >
            {category}
          </Text>
          <Text
            className="text-foreground text-sm font-bold mb-1"
            numberOfLines={1}
          >
            {name}
          </Text>
          <Text className="text-foreground text-sm font-medium">
            {formatPrice(price)}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
