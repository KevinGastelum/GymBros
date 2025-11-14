import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return (
      <div className="py-20 text-center text-gray-400">
        <p>Product not found.</p>
        <Link to="/shop" className="text-gymRed underline hover:text-red-600">
          Go back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12">
      {/* Image Section */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl shadow-lg w-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col justify-center">
        <h2 className="text-4xl font-semibold mb-4">{product.name}</h2>
        <p className="text-gray-400 mb-2 uppercase text-sm">
          {product.category}
        </p>
        <p className="text-gymRed text-2xl font-bold mb-6">${product.price}</p>
        <p className="text-gray-300 mb-8 leading-relaxed">
          {product.description}
        </p>

        {/* Size Selector */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Select Size</h3>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded border ${
                  selectedSize === size
                    ? "bg-gymRed border-gymRed text-white"
                    : "border-gray-500 text-gray-300 hover:border-gymRed"
                } transition`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          disabled={!selectedSize}
          className={`w-full md:w-auto px-8 py-3 rounded-lg text-white font-semibold transition ${
            selectedSize
              ? "bg-gymRed hover:bg-red-700"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          {selectedSize ? "Add to Cart" : "Select a Size"}
        </button>

        <Link
          to="/shop"
          className="block mt-8 text-gray-400 hover:text-white underline"
        >
          ← Back to Shop
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
