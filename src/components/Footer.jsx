import React from "react";

const Footer = () => (
  <footer id="contact" className="bg-black py-8 mt-12">
    <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">
      <p>© {new Date().getFullYear()} GymBros. All rights reserved.</p>
      <p className="mt-2">Made with ❤️ by GymBros Dev Team</p>
    </div>
  </footer>
);

export default Footer;
