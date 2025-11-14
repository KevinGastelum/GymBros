import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <div className="bg-zinc-900 p-4 rounded-xl shadow hover:scale-105 transition-transform">
    <img
      src={product.image}
      alt={product.name}
      className="rounded-lg w-full h-64 object-cover mb-4"
    />
    <h3 className="text-lg font-semibold">{product.name}</h3>
    <p className="text-gray-400 text-sm mb-2">{product.category}</p>
    <p className="text-gymRed font-bold mb-4">${product.price}</p>
    <Link
      to={`/product/${product.id}`}
      className="bg-gymRed text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      View Details
    </Link>
  </div>
);

export default ProductCard;
