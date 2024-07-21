import React from 'react'
import { motion } from 'framer-motion'

function Buttons() {
  return (
    <>
     <div className="flex items-center justify-center mb-8">
            <motion.span className="mr-8" 
             whileHover={{
            scale: 1.2,
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
            
            >
            <button type="button" className="text-white w-[250px] h-[70px] bg-blue-500 hover:bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-2xl px-5 py-2.5 me-2 mb-2  focus:outline-none dark:focus:ring-white">User's Sign In</button>
            </motion.span>

            <motion.span whileHover={{
            scale: 1.2,
            textShadow: "0px 0px 8px rgb(255, 255, 255)",
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
            >
            <button type="button" className="text-white w-[250px] h-[70px] bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-2xl px-5 py-2.5 me-2 mb-2   focus:outline-none dark:focus:ring-white ">Worker's Sign In</button>
            </motion.span>
        </div>
    </>
  )
}

export default Buttons