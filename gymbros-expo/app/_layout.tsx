import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "../contexts/CartContext";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#000000" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="product/[id]" 
            options={{ 
              presentation: "card",
              animation: "slide_from_bottom",
            }} 
          />
          <Stack.Screen 
            name="checkout" 
            options={{ 
              presentation: "modal",
            }} 
          />
        </Stack>
      </CartProvider>
    </SafeAreaProvider>
  );
}
