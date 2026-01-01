import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Check, Package, ArrowRight } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay,
  FadeInUp,
  FadeInDown,
} from 'react-native-reanimated';

export default function OrderSuccessScreen() {
  const { orderNumber } = useLocalSearchParams<{ orderNumber: string }>();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12 });
    opacity.value = withDelay(300, withSpring(1));
  }, []);

  const checkmarkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center px-8">
      {/* Success Checkmark */}
      <Animated.View 
        style={checkmarkStyle}
        className="w-32 h-32 bg-primary/20 rounded-full items-center justify-center mb-8 border-4 border-primary"
      >
        <Check color="#c4fb6d" size={64} strokeWidth={3} />
      </Animated.View>

      {/* Title */}
      <Animated.Text 
        entering={FadeInUp.delay(200).springify()}
        className="text-white text-3xl font-black text-center mb-3 tracking-tight"
      >
        ¡Pedido Confirmado!
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text 
        entering={FadeInUp.delay(300).springify()}
        className="text-gray-400 text-center mb-8"
      >
        Gracias por tu compra. Te enviaremos actualizaciones sobre tu pedido.
      </Animated.Text>

      {/* Order Number Card */}
      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full mb-8"
      >
        <View className="flex-row items-center mb-3">
          <Package color="#c4fb6d" size={20} />
          <Text className="text-gray-400 ml-2 text-xs uppercase tracking-wider">
            Número de Pedido
          </Text>
        </View>
        <Text className="text-white text-2xl font-black tracking-tight">
          {orderNumber || 'GB-XXXXXXXX-XXXX'}
        </Text>
        <Text className="text-gray-500 text-sm mt-2">
          Guarda este número para rastrear tu pedido
        </Text>
      </Animated.View>

      {/* Delivery Info */}
      <Animated.View 
        entering={FadeInUp.delay(500).springify()}
        className="bg-primary/10 border border-primary/30 rounded-2xl p-4 w-full mb-8"
      >
        <Text className="text-primary font-bold text-center">
          🚚 Envío estimado: 3-5 días hábiles
        </Text>
      </Animated.View>

      {/* Buttons */}
      <Animated.View 
        entering={FadeInDown.delay(600).springify()}
        className="w-full gap-3"
      >
        <Pressable
          onPress={() => router.replace('/orders')}
          className="bg-white/10 border border-white/20 py-4 rounded-xl flex-row justify-center items-center"
        >
          <Package color="#fff" size={18} />
          <Text className="text-white font-bold uppercase tracking-wider ml-2">
            Ver Mis Pedidos
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.replace('/')}
          className="bg-primary py-4 rounded-xl flex-row justify-center items-center"
        >
          <Text className="text-black font-bold uppercase tracking-wider">
            Seguir Comprando
          </Text>
          <ArrowRight color="#000" size={18} className="ml-2" />
        </Pressable>
      </Animated.View>
    </SafeAreaView>
  );
}
