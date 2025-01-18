import { motion, useTransform, useScroll } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8]); // Smooth opacity transition

  return (
    <motion.nav
      style={{
        opacity,
        background: "black", // Fixed black background
      }}
      className="fixed top-0 left-0 right-0 z-50 py-6 w-full"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-white font-bold text-2xl cursor-pointer"
            onClick={() => {
                 navigate("/");
            }
            }
          >
            AccessAI
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex gap-8"
          >
            <a
              href="#features"
              className="text-white hover:text-blue-300 transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-white hover:text-blue-300 transition"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-white hover:text-blue-300 transition"
            >
              Testimonials
            </a>
            <button
              onClick={() => {
                navigate("/preview");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
