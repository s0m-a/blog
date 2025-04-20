"use client"
import { motion } from "framer-motion";


export default function Home() {
  return (
    <div className="bg-gray-100 rounded-3xl p-2 md:bg-bgColor w-[95%] md:w-[80%] m-auto shadow-2xl"> 
      
<section 
  className="  grid  md:grid-cols-2 md:gap-4 min-h-[30vh] w-[90%] md:w-[80%] m-auto rounded-xl " 
>
  
  <div className="  md:bg-bgColor md:text-white rounded-b-2xl bg-gray-100 p-4 pt-16 ">
    <h1 className="text-3xl md:text-2xl uppercase antialiased border-b mb-2 md:mb-4 font-bold">
      welcome to <span style={{ color: "#c8611e" }}>blolicious</span>
    </h1>
    <p className="text-sm md:text-base capitalize">
      Discover and share your love for food with a community that celebrates every flavor. 
      this is your space to explore, express, and eat with joy.
    </p>
  </div>


  
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="flex justify-center items-center bg-bgColor rounded-4xl "
  >
    <img 
      src="/home-banner-image.png"
      alt="decorative blog"
      className="w-[80%] max-w-xs md:max-w-full"
    />
  </motion.div>


</section>


</div>
  )
}