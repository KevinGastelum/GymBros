import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-90 fixed w-full z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 bg-clip-text text-transparent text-2xl font-bold tracking-wide">
          GYMBROS
        </Link>
        <div className="space-x-8 text-sm uppercase font-medium">
          <Link to="/" className="hover:bg-gradient-to-r hover:from-yellow-600 hover:via-yellow-300 hover:to-yellow-600 hover:bg-clip-text hover:text-transparent transition">Home</Link>
          <Link to="/shop" className="hover:bg-gradient-to-r hover:from-yellow-600 hover:via-yellow-300 hover:to-yellow-600 hover:bg-clip-text hover:text-transparent transition">Shop</Link>
          <a href="#contact" className="hover:bg-gradient-to-r hover:from-yellow-600 hover:via-yellow-300 hover:to-yellow-600 hover:bg-clip-text hover:text-transparent transition">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
