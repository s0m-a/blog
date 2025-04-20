'use client'
import { useState } from 'react'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { User, ChevronDown, LogIn, UserPlus, Search, Menu,X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"
import { useUserStore } from '@/context/useUserStore';
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [isChecked, setIsChecked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isProfile, setIsProfile] = useState(false)
  const { user, checkAuth, logout } = useUserStore();
  const router = useRouter()
useEffect( ()=>{
    checkAuth(router);
  }, [checkAuth])

  const toggleDropDown = () => {
    setIsOpen(!isOpen)
  }

  const toggleProfile = () => {
    setIsProfile(!isProfile)
  }

  return (
    <nav className="w-[90%] relative border-b border-gray-600 p-6 m-auto lg:w-[80%] flex items-center justify-between mb-6">

      {/* Logo */}
      <Link href={"/"}>
      <div className='flex items-center'>
      <div className=''>
        <Image src="/logo.png" width={40} height={40} alt="logo image" />
        </div>
        <div className='hidden md:flex items-center'> 
        <span className=" uppercase font-bold">Blolicious</span>
      </div>
      </div>
      </Link>

      {/* Large Screen Navigation Links */}
      <div className="hidden lg:flex items-center">
        <Link href={"/"} className="p-2 capitalize">home</Link>

        <div>
          <input
            type="checkbox"
            id="dropdown"
            className="hidden"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />

          <label htmlFor="dropdown" className="block relative p-2 rounded-[25px] cursor-pointer">
            <div className='flex'>Categories <ChevronDown/> </div>
          </label>
          <AnimatePresence>
  {isChecked && (
    <motion.ul
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: '#9ca490' }}
      className="absolute right-0 w-full justify-between p-4 rounded-[25px] flex text-white z-20"
    >
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_1</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_2</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_3</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_4</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_5</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_6</Link></li>
    </motion.ul>
  )}
</AnimatePresence>

        </div>

        <Link href={"/"} className="p-2 capitalize">blog</Link>
        <Link href={"/"} className="p-2 capitalize">about</Link>
      </div>


      <div className="lg:hidden flex items-center justify-center ">
        
      <div className="  flex justify-end items-center ">

        <Link href={"/"} className=" capitalize m-2">
          <Search />
        </Link>

        <button 
        className="  flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100"
        onClick={toggleProfile}>
        <User size={20} />
        <ChevronDown size={20} />
        </button>

        {isProfile && (
          !user ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-30 w-40 bg-white border-0 rounded-xl p-4 z-20"
              >
                <Link href="/auth/login" className="flex mb-4">
                  <LogIn size={16} className="mr-2" /> Login
                </Link>

                <Link href="/auth/register" className="flex">
                  <UserPlus size={16} className="mr-2" /> Register
                </Link>
              </motion.div>
            </AnimatePresence>
            ) :
            (
              <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-30 w-40 bg-white border-0 rounded-xl p-4 z-20"
              >
                <Link href="/dashboard/profile" className="flex mb-4">
                  <LogIn size={16} className="mr-2" /> profile
                </Link>

                <Link href="#" className="flex" onClick={()=> logout(router)}>
                  <UserPlus size={16} className="mr-2" /> logout
                </Link>
              </motion.div>
            </AnimatePresence>
            ))}


      </div>

        <button onClick={toggleDropDown} className="text-3xl m-2">
          {isOpen ? <X/> : <Menu/>}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white p-4 rounded-lg mt-6 transition-all duration-300 z-20 ${isOpen ? 'block' : 'hidden'}`}
      >
        <Link href={"/"} className="block p-2 capitalize">home</Link>
        <Link href={"/"} className="block p-2 capitalize">blog</Link>
        <Link href={"/"} className="block p-2 capitalize">about</Link>
        <div className="mr-4">
          <input
            type="checkbox"
            id="dropdown"
            className="hidden"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />

          <label htmlFor="dropdown" className="block relative p-2 rounded-[25px] cursor-pointer">
          <div className='flex'>Categories <ChevronDown/> </div>
          </label>

          <AnimatePresence>
          {isChecked && (
        <motion.ul
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: '#9ca490' }}
      className="absolute right-0 w-full justify-between p-4 rounded-[25px]  text-white z-20"
    >
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_1</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_2</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_3</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_4</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_5</Link></li>
      <li className="mb-4 p-2"><Link href={"/"} className="capitalize">category_6</Link></li>
    </motion.ul>
  )}
</AnimatePresence>

        </div>
      </div>

      {/* Search and User icons */}
      <div className="lg:flex items-center hidden">
      <div className="  flex justify-end items-center ">

        <Link href={"/"} className=" capitalize m-2">
          <Search />
        </Link>

        <button 
        className="  flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100"
        onClick={toggleProfile}>
        <User size={20} />
        <ChevronDown size={20} />
        </button>

        {isProfile && (
          !user ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-30 w-40 bg-white border-0 rounded-xl p-4 z-20"
              >
                <Link href="/auth/login" className="flex mb-4">
                  <LogIn size={16} className="mr-2" /> Login
                </Link>

                <Link href="/auth/register" className="flex">
                  <UserPlus size={16} className="mr-2" /> Register
                </Link>
              </motion.div>
            </AnimatePresence>
            ) :
            (
              <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-30 w-40 bg-white border-0 rounded-xl p-4 z-20"
              >
                <Link href="/auth/login" className="flex mb-4">
                  <LogIn size={16} className="mr-2" /> profile
                </Link>

                <Link href="#" className="flex" onClick={()=> logout(router)}>
                  <UserPlus size={16} className="mr-2" /> logout
                </Link>
              </motion.div>
            </AnimatePresence>
            ))}

      </div>
      </div>
    </nav>
  )
}
