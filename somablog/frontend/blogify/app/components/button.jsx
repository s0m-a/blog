'use client';

import { motion } from 'framer-motion';
import {  Loader } from 'lucide-react';
export default function Button({ onClick, label = 'Login', loading }) {
  return (
    <motion.button
     type='submit'
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      disabled={loading}
      className="w-full bg-primary-2 text-white py-4 rounded-xl font-medium text-sm shadow-md hover:bg-primary-3 focus:outline-none focus:ring-2  mb-2 md:mb-4 max-w-[80%] capitalize items-center" 
    >
    {loading ? (
     <span className="flex justify-center items-center ">
    <Loader className="w-5 h-5 animate-spin" />
    Loading...
  </span>
   ) : (
  <>{label}</>
)}
    </motion.button>
  );
}
