// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const slogans = [
//   "Built for Performance.",
//   "Engineered for Strength.",
//   "Designed for Athletes.",
//   "Made for Movement.",
// ];

// const features = [
//   { label: "Sweat-Wicking", icon: "💧" },
//   { label: "Ultra-Stretch Fabric", icon: "🧵" },
//   { label: "Anti-Odor Tech", icon: "🛡️" },
//   { label: "Athlete Approved", icon: "🏋️‍♂️" },
// ];

// const Hero = () => {
//   const [text, setText] = useState("");
//   const [index, setIndex] = useState(0);
//   const [subIndex, setSubIndex] = useState(0);
//   const [deleting, setDeleting] = useState(false);
//   const [blink, setBlink] = useState(true);

//   // Typewriter Effect
//   useEffect(() => {
//     if (subIndex === slogans[index].length + 1 && !deleting) {
//       setTimeout(() => setDeleting(true), 1000);
//       return;
//     }

//     if (subIndex === 0 && deleting) {
//       setDeleting(false);
//       setIndex((prev) => (prev + 1) % slogans.length);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setSubIndex((prev) => prev + (deleting ? -1 : 1));
//       setText(slogans[index].slice(0, subIndex));
//     }, deleting ? 50 : 100);

//     return () => clearTimeout(timeout);
//   }, [subIndex, index, deleting]);

//   // Cursor Blink
//   useEffect(() => {
//     const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
//     return () => clearTimeout(timeout2);
//   }, [blink]);

//   return (
//     <section
//       className="relative h-[100vh] bg-cover bg-center flex items-center justify-center"
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.jpg)`,
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1.1 }}
//         className="relative z-10 text-center px-6 max-w-4xl"
//       >
//         <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
//           Train Hard. <span className="text-gymRed">Look Good.</span>
//         </h1>

//         {/* Typewriter */}
//         <p className="mt-4 text-xl md:text-3xl font-medium text-gray-200 h-12">
//           {text}
//           <span className={`${blink ? "opacity-100" : "opacity-0"}`}>|</span>
//         </p>

//         {/* CTA */}
//         <Link
//           to="/shop"
//           className="inline-block mt-10 px-10 py-4 text-lg font-semibold text-white bg-gymRed rounded-xl shadow-lg
//           transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,50,50,0.8)]
//           hover:bg-red-600 active:scale-95"
//         >
//           Shop Now
//         </Link>

//         {/* Feature Badges */}
//         <motion.div
//           className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-white"
//           initial="hidden"
//           animate="show"
//           variants={{
//             hidden: { opacity: 0, y: 20 },
//             show: {
//               opacity: 1,
//               y: 0,
//               transition: { staggerChildren: 0.2 },
//             },
//           }}
//         >
//           {features.map((f, i) => (
//             <motion.div
//               key={i}
//               variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
//               className="flex flex-col items-center bg-white/10 backdrop-blur-md py-4 rounded-xl shadow-md
//               border border-white/20 hover:bg-white/20 transition-all cursor-default"
//             >
//               <span className="text-3xl mb-1">{f.icon}</span>
//               <span className="text-sm font-medium">{f.label}</span>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;



// ==========================================================
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const slogans = [
  "Built for Performance.",
  "Engineered for Strength.",
  "Designed for Athletes.",
  "Made for Movement.",
];

const Hero = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // ---- Typewriter Effect ----
  useEffect(() => {
    if (subIndex === slogans[index].length + 1 && !deleting) {
      // Pause before deleting
      setTimeout(() => setDeleting(true), 1000);
      return;
    }

    if (subIndex === 0 && deleting) {
      // Switch to next slogan
      setDeleting(false);
      setIndex((prev) => (prev + 1) % slogans.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setText(slogans[index].slice(0, subIndex));
    }, deleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <section
      className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/hero.jpg'})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
          Train Hard. <span className="text-gymRed">Look Good.</span>
        </h1>

        {/* Typewriter text */}
        <p className="mt-4 text-xl md:text-3xl font-medium text-gray-200 h-12">
          {text}
          <span className={`${blink ? "opacity-100" : "opacity-0"}`}>|</span>
        </p>

        <Link
          to="/shop"
          className="inline-block mt-12 px-10 py-4 text-lg font-semibold text-white bg-gymRed rounded-xl shadow-lg
          transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,50,50,0.8)]
          hover:bg-red-600 active:scale-95"
        >
          Shop Now
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;


// ============================================================
// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Hero = () => (
//   <section
//     className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
//     style={{
//       backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.jpg)`,
//       backgroundAttachment: "fixed", // parallax effect
//     }}
//   >
//     {/* Dark gradient overlay */}
//     <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1.1, ease: "easeOut" }}
//       className="relative z-10 text-center px-5"
//     >
//       <motion.h1
//         className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.4, duration: 1 }}
//       >
//         Train Hard.
//         <span className="text-gymRed"> Look Good.</span>
//       </motion.h1>

//       <motion.p
//         className="text-lg md:text-2xl text-gray-200 mt-5 max-w-2xl mx-auto"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.9, duration: 1 }}
//       >
//         Premium sportswear engineered for peak performance and all-day comfort.
//       </motion.p>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.4 }}
//       >
//         <Link
//           to="/shop"
//           className="inline-block mt-10 px-10 py-4 text-lg font-semibold text-white bg-gymRed rounded-xl shadow-lg
//                      transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,50,50,0.8)]
//                      hover:bg-red-600 active:scale-95"
//         >
//           Shop Now
//         </Link>
//       </motion.div>
//     </motion.div>
//   </section>
// );

// export default Hero;


// ===================================================
// import React from "react";
// import { Link } from "react-router-dom";

// const Hero = () => (
//   <section
//     className="bg-cover bg-center h-[80vh] flex items-center justify-center text-center"
//     style={{
//       backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero.jpg)`
//     }}
//   >
//     <div className="bg-black bg-opacity-60 p-10 rounded-xl">
//       <h1 className="text-4xl md:text-6xl font-bold mb-6">
//         Train Hard. Look Good. <span className="text-gymRed">GYMBROS</span>
//       </h1>
//       <p className="text-lg mb-8 text-gray-300">
//         Premium sportswear designed for peak performance.
//       </p>
//       <Link
//         to="/shop"
//         className="bg-gymRed text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
//       >
//         Shop Now
//       </Link>
//     </div>
//   </section>
// );

// export default Hero;
