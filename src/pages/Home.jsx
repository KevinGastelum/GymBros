import React from "react";
import ProductGrid from "../components/ProductGrid";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Gear</h2>
        <ProductGrid limit={4} />
      </section>
    </div>
  );
};

export default Home;
