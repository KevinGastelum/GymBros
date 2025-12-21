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
import { useLocalSearchParams, router } from "expo-router";
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react-native";
import { useCart } from "../../contexts/CartContext";
import { formatPrice } from "../../lib/utils";

const { width } = Dimensions.get("window");

const PRODUCTS: Record<string, any> = {
  "1": {
    id: "1",
    name: "Sudadera Oversized Esencial",
    price: 1100.0,
    category: "Lifestyle Hombres",
    description:
      "La combinación perfecta de comodidad y estilo. Nuestra Sudadera Oversized Esencial está confeccionada con una mezcla de algodón premium para una suavidad inigualable.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: [
      "Mezcla premium de algodón y poliéster",
      "Ajuste relajado oversized",
      "Puños y dobladillo acanalados",
      "Bolsillo canguro",
    ],
  },
  "2": {
    id: "2",
    name: "Mallas Seamless High-Rise",
    price: 900.0,
    category: "Performance Mujeres",
    description:
      "Diseñadas para el máximo rendimiento. Estas mallas sin costuras de cintura alta brindan compresión donde más la necesitas.",
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "Construcción sin costuras",
      "Cintura alta",
      "Tejido a prueba de sentadillas",
      "Absorción de humedad",
    ],
  },
  "3": {
    id: "3",
    name: "Set Deportivo Pink",
    price: 1300.0,
    category: "Performance Mujeres",
    description:
      "Destaca en el gimnasio con este set coordinado de alto rendimiento. Incluye top deportivo de soporte medio y leggings con tecnología seamless para máxima comodidad.",
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["XS", "S", "M", "L"],
    features: [
      "Tecnología absorbe-sudor",
      "Tejido elástico 4-way stretch",
      "Soporte medio compresivo",
      "Cintura alta favorecedora",
    ],
  },
  "4": {
    id: "4",
    name: "Sudadera Gym Pro",
    price: 1200.0,
    category: "Lifestyle Hombres",
    description:
      "Tu compañera ideal para entrar en calor o para el día a día. Esta sudadera técnica combina estilo urbano con funcionalidad deportiva.",
    images: [
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Interior de felpa suave",
      "Capucha ajustable",
      "Bolsillo frontal grande",
      "Transpirable y cálida",
    ],
  },
  "5": {
    id: "5",
    name: "Cinturón de Levantamiento",
    price: 1500.0,
    category: "Accesorios",
    description:
      "Soporte profesional para tus levantamientos más pesados. Fabricado con cuero premium de 10mm para máxima estabilidad del core.",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL"],
    features: [
      "Cuero genuino de 10mm",
      "Hebilla de acero inoxidable",
      "Ancho uniforme de 10cm",
      "Costuras reforzadas",
    ],
  },
  "6": {
    id: "6",
    name: "Pantalones Deportivos Track",
    price: 1200.0,
    category: "Entrenamiento Hombres",
    description:
      "Versatilidad para dentro y fuera del gym. Estos pantalones track combinan comodidad premium con un look atlético moderno.",
    images: [
      "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    features: [
      "Tela elástica 4 direcciones",
      "Bolsillos con cierre",
      "Cintura elástica con cordón",
      "Puños elásticos",
    ],
  },
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addToCart } = useCart();

  const product = PRODUCTS[id || "1"];
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-background justify-center items-center">
        <Text className="text-foreground text-xl font-bold">
          Producto no encontrado
        </Text>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
      },
      quantity
    );

    router.push("/cart");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-black/50 rounded-full items-center justify-center"
        >
          <ArrowLeft color="#fff" size={20} />
        </Pressable>

        {/* Product Image */}
        <View className="w-full aspect-square">
          <Image
            source={{ uri: product.images[selectedImage] }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Image Thumbnails */}
        {product.images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-4 py-3"
          >
            {product.images.map((img: string, idx: number) => (
              <Pressable
                key={idx}
                onPress={() => setSelectedImage(idx)}
                className={`w-16 h-16 mr-2 rounded-md overflow-hidden border-2 ${
                  selectedImage === idx ? "border-primary" : "border-transparent"
                }`}
              >
                <Image
                  source={{ uri: img }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </ScrollView>
        )}

        {/* Product Info */}
        <View className="px-4 py-6">
          <Text className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
            {product.category}
          </Text>
          <Text className="text-foreground text-2xl font-black uppercase tracking-tight mb-2">
            {product.name}
          </Text>
          <Text className="text-foreground text-2xl font-bold mb-4">
            {formatPrice(product.price)}
          </Text>
          <Text className="text-accent leading-relaxed mb-6">
            {product.description}
          </Text>

          {/* Size Selection */}
          <Text className="text-foreground font-bold uppercase tracking-wider mb-3">
            Seleccionar Talla
          </Text>
          <View className="flex-row flex-wrap mb-6">
            {product.sizes.map((size: string) => (
              <Pressable
                key={size}
                onPress={() => setSelectedSize(size)}
                className={`w-12 h-12 mr-2 mb-2 rounded-md items-center justify-center border-2 ${
                  selectedSize === size
                    ? "bg-primary border-primary"
                    : "bg-transparent border-border"
                }`}
              >
                <Text
                  className={`font-bold text-sm ${
                    selectedSize === size ? "text-black" : "text-foreground"
                  }`}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Quantity */}
          <Text className="text-foreground font-bold uppercase tracking-wider mb-3">
            Cantidad
          </Text>
          <View className="flex-row items-center mb-6">
            <Pressable
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border border-border rounded-md items-center justify-center"
            >
              <Text className="text-foreground text-lg">-</Text>
            </Pressable>
            <Text className="text-foreground font-bold text-xl mx-4 w-8 text-center">
              {quantity}
            </Text>
            <Pressable
              onPress={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border border-border rounded-md items-center justify-center"
            >
              <Text className="text-foreground text-lg">+</Text>
            </Pressable>
          </View>

          {/* Features */}
          <Text className="text-foreground font-bold uppercase tracking-wider mb-3">
            Características
          </Text>
          {product.features.map((feature: string, idx: number) => (
            <View key={idx} className="flex-row items-start mb-2">
              <Text className="text-primary mr-2">•</Text>
              <Text className="text-accent text-sm flex-1">{feature}</Text>
            </View>
          ))}

          {/* Trust Badges */}
          <View className="flex-row justify-between mt-6 pt-6 border-t border-border">
            <View className="items-center flex-1">
              <Truck color="#c4fb6d" size={24} />
              <Text className="text-foreground text-[10px] font-semibold uppercase mt-2 text-center">
                Envío{"\n"}Gratis
              </Text>
            </View>
            <View className="items-center flex-1">
              <RefreshCw color="#c4fb6d" size={24} />
              <Text className="text-foreground text-[10px] font-semibold uppercase mt-2 text-center">
                Devoluciones{"\n"}Fáciles
              </Text>
            </View>
            <View className="items-center flex-1">
              <Shield color="#c4fb6d" size={24} />
              <Text className="text-foreground text-[10px] font-semibold uppercase mt-2 text-center">
                Pago{"\n"}Seguro
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="flex-row px-4 pb-6 pt-4 border-t border-border">
        <Pressable className="w-14 h-14 border-2 border-border rounded-md items-center justify-center mr-3">
          <Heart color="#888" size={22} />
        </Pressable>
        <Pressable
          onPress={handleAddToCart}
          className="flex-1 bg-primary h-14 rounded-md flex-row items-center justify-center"
        >
          <ShoppingBag color="#000" size={20} />
          <Text className="text-black font-bold uppercase tracking-wider ml-2">
            AGREGAR AL CARRITO
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
