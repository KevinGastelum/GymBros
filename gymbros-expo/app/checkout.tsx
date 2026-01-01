import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft, Check, MapPin, CreditCard, Truck } from "lucide-react-native";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { useCurrency } from "../lib/currency";

export default function CheckoutScreen() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Contact, 2: Shipping, 3: Review

  // Form state
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const taxAmount = totalPrice * 0.16;
  const shippingAmount = 0; // Free shipping
  const totalAmount = totalPrice + taxAmount + shippingAmount;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.email) newErrors.email = 'Requerido';
      if (!formData.phone) newErrors.phone = 'Requerido';
    }

    if (currentStep === 2) {
      if (!formData.firstName) newErrors.firstName = 'Requerido';
      if (!formData.lastName) newErrors.lastName = 'Requerido';
      if (!formData.address) newErrors.address = 'Requerido';
      if (!formData.city) newErrors.city = 'Requerido';
      if (!formData.postalCode) newErrors.postalCode = 'Requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (!validateStep(2)) return;

    setLoading(true);

    try {
      // Create address
      const { data: addressData, error: addressError } = await supabase
        .from('addresses')
        .insert({
          user_id: user.id,
          address_type: 'shipping',
          full_name: `${formData.firstName} ${formData.lastName}`,
          street_line1: formData.address,
          city: formData.city,
          state_province: formData.state,
          postal_code: formData.postalCode,
          country_code: 'MX',
          phone: formData.phone,
        })
        .select()
        .single();

      if (addressError) throw addressError;

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          shipping_address_id: addressData.id,
          billing_address_id: addressData.id,
          subtotal: totalPrice,
          tax_amount: taxAmount,
          shipping_amount: shippingAmount,
          total_amount: totalAmount,
          currency: 'MXN',
          notes: formData.notes || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.id,
        quantity: item.quantity,
        size: item.size || null,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        product_name: item.name,
        product_image: item.image,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      clearCart();

      // Navigate to success
      router.replace({
        pathname: '/order-success',
        params: { orderNumber: orderData.order_number },
      });
    } catch (error) {
      console.error('Order error:', error);
      Alert.alert('Error', 'Hubo un problema al procesar tu pedido. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const InputField = ({ 
    placeholder, 
    field, 
    keyboardType = 'default' as any,
    autoCapitalize = 'sentences' as any,
    className = ''
  }: {
    placeholder: string;
    field: string;
    keyboardType?: string;
    autoCapitalize?: string;
    className?: string;
  }) => (
    <View className={className}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={formData[field as keyof typeof formData]}
        onChangeText={(value) => updateField(field, value)}
        keyboardType={keyboardType as any}
        autoCapitalize={autoCapitalize as any}
        className={`bg-white/5 border rounded-xl px-4 py-3.5 text-white ${
          errors[field] ? 'border-red-500' : 'border-white/10'
        }`}
      />
      {errors[field] && (
        <Text className="text-red-400 text-xs mt-1 ml-1">{errors[field]}</Text>
      )}
    </View>
  );

  // Check if user is logged in
  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center px-6">
        <Text className="text-white text-2xl font-black text-center mb-4">
          Inicia Sesión
        </Text>
        <Text className="text-gray-400 text-center mb-8">
          Necesitas una cuenta para completar tu compra
        </Text>
        <Pressable
          onPress={() => router.push('/auth/login')}
          className="bg-primary px-8 py-4 rounded-xl"
        >
          <Text className="text-black font-bold uppercase tracking-wider">
            Iniciar Sesión
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row items-center px-6 py-4 border-b border-white/10">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft color="#fff" size={24} />
          </Pressable>
          <Text className="text-xl font-black text-white uppercase tracking-tight">
            CHECKOUT
          </Text>
        </View>

        {/* Progress Steps */}
        <View className="flex-row px-6 py-4 justify-between">
          {[
            { num: 1, label: 'Contacto', icon: '📧' },
            { num: 2, label: 'Envío', icon: '📦' },
            { num: 3, label: 'Confirmar', icon: '✓' },
          ].map((s, idx) => (
            <View key={s.num} className="flex-row items-center">
              <Pressable
                onPress={() => s.num < step && setStep(s.num)}
                className={`w-8 h-8 rounded-full items-center justify-center ${
                  step >= s.num ? 'bg-primary' : 'bg-white/10'
                }`}
              >
                <Text className={step >= s.num ? 'text-black font-bold' : 'text-gray-500'}>
                  {s.num}
                </Text>
              </Pressable>
              <Text className={`ml-2 text-xs font-medium ${
                step >= s.num ? 'text-white' : 'text-gray-500'
              }`}>
                {s.label}
              </Text>
              {idx < 2 && (
                <View className={`w-8 h-0.5 mx-2 ${
                  step > s.num ? 'bg-primary' : 'bg-white/10'
                }`} />
              )}
            </View>
          ))}
        </View>

        {/* Step 1: Contact Info */}
        {step === 1 && (
          <View className="px-6 py-6">
            <Text className="text-white font-bold uppercase tracking-wider mb-4 flex-row items-center">
              📧 Información de Contacto
            </Text>
            <InputField placeholder="Email" field="email" keyboardType="email-address" autoCapitalize="none" className="mb-3" />
            <InputField placeholder="Teléfono" field="phone" keyboardType="phone-pad" />
          </View>
        )}

        {/* Step 2: Shipping Address */}
        {step === 2 && (
          <View className="px-6 py-6">
            <Text className="text-white font-bold uppercase tracking-wider mb-4">
              📦 Dirección de Envío
            </Text>
            <View className="flex-row mb-3">
              <View className="flex-1 mr-2">
                <InputField placeholder="Nombre" field="firstName" />
              </View>
              <View className="flex-1">
                <InputField placeholder="Apellido" field="lastName" />
              </View>
            </View>
            <InputField placeholder="Dirección" field="address" className="mb-3" />
            <View className="flex-row mb-3">
              <View className="flex-1 mr-2">
                <InputField placeholder="Ciudad" field="city" />
              </View>
              <View className="flex-1">
                <InputField placeholder="Estado" field="state" />
              </View>
            </View>
            <InputField placeholder="Código Postal" field="postalCode" keyboardType="number-pad" className="mb-3" />
            <TextInput
              placeholder="Notas del pedido (opcional)"
              placeholderTextColor="#666"
              value={formData.notes}
              onChangeText={(value) => updateField('notes', value)}
              multiline
              numberOfLines={3}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
            />
          </View>
        )}

        {/* Step 3: Order Review */}
        {step === 3 && (
          <View className="px-6 py-6">
            <Text className="text-white font-bold uppercase tracking-wider mb-4">
              ✓ Resumen del Pedido
            </Text>

            {/* Items Summary */}
            <View className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              {items.map((item, idx) => (
                <View key={`${item.id}-${item.size}`} className={`flex-row justify-between py-2 ${
                  idx < items.length - 1 ? 'border-b border-white/5' : ''
                }`}>
                  <Text className="text-gray-400 flex-1">
                    {item.name} {item.size && `(${item.size})`} x{item.quantity}
                  </Text>
                  <Text className="text-white font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Shipping Info */}
            <View className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <View className="flex-row items-center mb-2">
                <MapPin color="#c4fb6d" size={16} />
                <Text className="text-gray-400 ml-2 text-xs uppercase tracking-wider">Envío a:</Text>
              </View>
              <Text className="text-white font-medium">
                {formData.firstName} {formData.lastName}
              </Text>
              <Text className="text-gray-400 text-sm">
                {formData.address}, {formData.city}, {formData.state} {formData.postalCode}
              </Text>
            </View>

            {/* Totals */}
            <View className="bg-white/5 border border-white/10 rounded-xl p-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">Subtotal</Text>
                <Text className="text-white font-medium">{formatPrice(totalPrice)}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">Envío</Text>
                <Text className="text-primary font-medium">GRATIS</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">IVA (16%)</Text>
                <Text className="text-white font-medium">{formatPrice(taxAmount)}</Text>
              </View>
              <View className="flex-row justify-between mt-3 pt-3 border-t border-white/10">
                <Text className="text-white text-lg font-black">TOTAL</Text>
                <Text className="text-white text-lg font-black">{formatPrice(totalAmount)}</Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View className="px-6 pb-6 pt-4 border-t border-white/10">
        {step < 3 ? (
          <Pressable
            onPress={handleNextStep}
            className="bg-primary py-4 rounded-xl flex-row justify-center items-center"
          >
            <Text className="text-black font-bold uppercase tracking-wider">
              Continuar
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={handlePlaceOrder}
            disabled={loading}
            className={`bg-primary py-4 rounded-xl flex-row justify-center items-center ${
              loading ? 'opacity-70' : ''
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Check color="#000" size={18} />
                <Text className="text-black font-bold uppercase tracking-wider ml-2">
                  Confirmar Pedido
                </Text>
              </>
            )}
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
