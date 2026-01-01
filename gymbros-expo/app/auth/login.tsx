import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await signIn(email, password);

    if (error) {
      setError('Email o contraseña incorrectos');
      setLoading(false);
    } else {
      router.replace('/(tabs)/account');
    }
  };

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header */}
          <View className="flex-row items-center px-6 py-4">
            <Pressable 
              onPress={() => router.back()} 
              className="w-10 h-10 bg-white/10 rounded-full items-center justify-center"
            >
              <ArrowLeft color="#fff" size={20} />
            </Pressable>
          </View>

          <View className="flex-1 px-6 justify-center">
            {/* Logo */}
            <View className="items-center mb-12">
              <Text className="text-4xl font-black text-white tracking-tighter">
                GYM<Text className="text-primary italic">BROS</Text>
              </Text>
              <Text className="text-gray-400 mt-2 font-medium">
                Inicia sesión en tu cuenta
              </Text>
            </View>

            {/* Error Message */}
            {error && (
              <View className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 mb-6">
                <Text className="text-red-400 text-center font-medium">{error}</Text>
              </View>
            )}

            {/* Email Input */}
            <View className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-row items-center mb-4">
              <Mail color="#666" size={20} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 ml-3 text-white text-base"
              />
            </View>

            {/* Password Input */}
            <View className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex-row items-center mb-6">
              <Lock color="#666" size={20} />
              <TextInput
                placeholder="Contraseña"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                className="flex-1 ml-3 text-white text-base"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff color="#666" size={20} />
                ) : (
                  <Eye color="#666" size={20} />
                )}
              </Pressable>
            </View>

            {/* Login Button */}
            <Pressable
              onPress={handleLogin}
              disabled={loading}
              className={`bg-primary py-4 rounded-xl items-center mb-6 ${loading ? 'opacity-70' : ''}`}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text className="text-black font-bold text-base uppercase tracking-wider">
                  Iniciar Sesión
                </Text>
              )}
            </Pressable>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-white/10" />
              <Text className="mx-4 text-gray-500 font-medium">O</Text>
              <View className="flex-1 h-px bg-white/10" />
            </View>

            {/* Google Button */}
            <Pressable
              onPress={() => signInWithGoogle()}
              className="bg-white py-4 rounded-xl items-center mb-8 flex-row justify-center"
            >
              <Text className="text-black font-black text-lg mr-3">G</Text>
              <Text className="text-black font-bold text-base">
                Continuar con Google
              </Text>
            </Pressable>

            {/* Sign Up Link */}
            <View className="flex-row justify-center">
              <Text className="text-gray-400">¿No tienes cuenta? </Text>
              <Pressable onPress={() => router.push('/auth/signup')}>
                <Text className="text-primary font-bold">Regístrate</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
