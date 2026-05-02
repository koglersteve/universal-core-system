"use client";

import { motion } from "framer-motion";

export function LaughMeter() {
  return (
    <div className="w-full mt-2">
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: ["0%", "40%", "80%", "60%", "100%"] }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-2 rounded-full bg-gradient-to-r from-brand-pink to-brand-yellow shadow-md"
      />
    </div>
  );
}
