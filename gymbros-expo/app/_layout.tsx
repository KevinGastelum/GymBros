import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "../contexts/CartContext";
import { AuthProvider } from "../contexts/AuthContext";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
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
            <Stack.Screen 
              name="auth/login" 
              options={{ 
                presentation: "modal",
                animation: "slide_from_bottom",
              }} 
            />
            <Stack.Screen 
              name="auth/signup" 
              options={{ 
                presentation: "modal",
                animation: "slide_from_bottom",
              }} 
            />
            <Stack.Screen 
              name="orders" 
              options={{ 
                animation: "slide_from_right",
              }} 
            />
            <Stack.Screen 
              name="order/[id]" 
              options={{ 
                animation: "slide_from_right",
              }} 
            />
            <Stack.Screen 
              name="order-success" 
              options={{ 
                presentation: "fullScreenModal",
                animation: "fade",
              }} 
            />
          </Stack>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
