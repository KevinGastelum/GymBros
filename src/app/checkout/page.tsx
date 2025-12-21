'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order (will integrate with Supabase later)
      alert('Order placed successfully!');
      clearCart();
      router.push('/');
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-black mb-6">Your cart is empty</h1>
          <button onClick={() => router.push('/shop')} className="text-primary hover:underline">
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  const subtotal = totalPrice;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-accent hover:text-primary transition-colors mb-8 uppercase tracking-wider font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase mb-8">Checkout</h1>

            {/* Progress Steps */}
            <div className="flex items-center mb-12">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                    step >= s ? 'bg-primary text-background' : 'bg-secondary text-accent'
                  }`}>
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-secondary'}`} />}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Shipping Address</h2>
                  <div>
                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">ZIP Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 uppercase tracking-wider">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Payment (Demo)</h2>
                  <div className="p-6 bg-card border border-border rounded">
                    <p className="text-accent mb-4">This is a demo checkout. No payment will be processed.</p>
                    <p className="text-sm">In production, this would integrate with Stripe or another payment processor.</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-4 border-2 border-border hover:border-primary rounded font-bold uppercase tracking-widest transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-primary text-background font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  {step === 3 ? 'Place Order' : 'Continue'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-8 bg-card border border-border rounded-lg">
              <h2 className="text-2xl font-black mb-6 tracking-tighter uppercase">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 bg-secondary rounded flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{item.name}</p>
                      <p className="text-xs text-accent">Qty: {item.quantity} • Size: {item.size}</p>
                      <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-t border-border pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-accent">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-accent">Shipping</span>
                  <span className="font-semibold text-primary">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-accent">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
