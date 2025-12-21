import { Tabs } from "expo-router";
import { Home, ShoppingBag, User, Search } from "lucide-react-native";
import { View, Text } from "react-native";
import { useCart } from "../../contexts/CartContext";

export default function TabLayout() {
  const { totalItems } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopColor: "#1a1a1a",
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#c4fb6d",
        tabBarInactiveTintColor: "#888888",
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Tienda",
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Carrito",
          tabBarIcon: ({ color, size }) => (
            <View>
              <ShoppingBag color={color} size={size} />
              {totalItems > 0 && (
                <View className="absolute -top-1 -right-2 bg-primary w-4 h-4 rounded-full items-center justify-center">
                  <Text className="text-[10px] text-black font-bold">{totalItems}</Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Cuenta",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
