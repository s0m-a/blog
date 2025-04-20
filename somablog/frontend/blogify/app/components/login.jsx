'use client'
import React from 'react'
import Input from './input'
import Button from './button'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useUserStore } from '@/context/useUserStore';
import {toast} from 'react-hot-toast';
import { useRouter } from "next/navigation";


const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const{login, loading} = useUserStore();

    const handleChange = (e)=>{
        setFormData( (prev)=>({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            await login(formData.email, formData.password, router);
          } catch (err) {
            console.err("Login failed:", err);
            const errorMessage = err.response?.data?.messsage || "login failed!";
            toast.error( errorMessage);   
          }
    }

  return (
<div className="min-h-[65vh] flex flex-col items-center justify-center">
<div className='w-[90%] m-auto text-center p-6 bg-primary shadow-md md:shadow-xl rounded-xl md:max-w-[60%]'>
<motion.h1
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="uppercase mt-10 mb-6  antialiased text-lg tracking-tight md:text-xl font-cursive"
>
  Welcome back to Belicious
</motion.h1>
<form
className='w-full p-4'>
<Input 
    label="Email" 
    type="email" 
    id="email" 
    name="email" 
    value={formData.email}
    onChange={handleChange} 
    />

<Input 
    label="Password" 
    type="password" 
    id="password" 
    name="password" 
    value={formData.password}
    onChange={handleChange}
    />


<Button 
    onClick={handleLogin} 
    label='log in' 
    loading={loading}/>
       <p>or</p>

<Button 
    onClick={handleLogin} 
    label='continue with google' 
    />
<Button 
    onClick={handleLogin} 
    label='continue with apple' 
    />


</form>
</div>
</div>

  )
}

export default Login
