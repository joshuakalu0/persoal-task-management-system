"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "dark"
      : "dark"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (selected) => {
    setTheme(selected);
  };

  // Thumb position: 4px for Light, 80px for Dark (w-40 = 160px, 2 options)
  const thumbLeft = theme === "dark" ? 80 : 4;

  return (
    <div className="absolute bottom-2.5 z-50 flex items-center">
      <div className="relative flex bg-[#232428] rounded-full p-1 w-44 h-9 shadow">
        {/* Animated thumb */}
        <motion.div
          className="absolute top-1 h-9 w-[72px] rounded-full bg-[#393A3E] z-0"
          animate={{ left: thumbLeft }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        {/* Light Option */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="relative z-10 flex-1 flex items-center justify-center gap-2 rounded-full focus:outline-none"
          style={{
            color: theme === "light" ? "#fff" : "#9ca3af",
            fontWeight: theme === "light" ? 600 : 400,
            transition: "color 0.2s, font-weight 0.2s",
          }}
          onClick={() => toggleTheme("light")}
        >
          <span className="text-xl">☀️</span> Light
        </motion.button>
        {/* Dark Option */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="relative z-10 flex-1 flex items-center justify-center gap-2 rounded-full focus:outline-none"
          style={{
            color: theme === "dark" ? "#fff" : "#9ca3af",
            fontWeight: theme === "dark" ? 600 : 400,
            transition: "color 0.2s, font-weight 0.2s",
          }}
          onClick={() => toggleTheme("dark")}
        >
          <span className="text-xl">🌙</span> Dark
        </motion.button>
      </div>
    </div>
  );
}
