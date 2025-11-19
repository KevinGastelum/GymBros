import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-90 fixed w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-gymGold text-2xl font-bold tracking-wide">
          GYMBROS
        </Link>
        <div className="space-x-8 text-sm uppercase font-medium">
          <Link to="/" className="hover:text-gymGold transition">Home</Link>
          <Link to="/shop" className="hover:text-gymGold transition">Shop</Link>
          <a href="#contact" className="hover:text-gymGold transition">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
