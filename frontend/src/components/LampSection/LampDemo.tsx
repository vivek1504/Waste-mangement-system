"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./Lamp";

export function LampDemo() {
  return (
<div className="min-h-screen ">
<LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-blue-400 to-blue-800 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-5xl"
      >
        <div className="flex justify-between items-center">
        <motion.span className="mr-8"  whileHover={{
          scale: 1.2,
          textShadow: "0px 0px 8px rgb(255, 255, 255)",

        }}>
        <button type="button" className="text-white w-[200px] h-[70px] bg-blue-500 hover:bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-2xl px-5 py-2.5 me-2 mb-2  focus:outline-none dark:focus:ring-white">User's Sign In</button>
        </motion.span>

        <motion.span whileHover={{
          scale: 1.2,
          textShadow: "0px 0px 8px rgb(255, 255, 255)",
        }}>
        <button type="button" className="text-white w-[200px] h-[70px] bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-2xl px-5 py-2.5 me-2 mb-2   focus:outline-none dark:focus:ring-white ">Worker's Sign In</button>
        </motion.span>
                
        
        </div>
      </motion.h1>
    </LampContainer>
</div>
  );
}
