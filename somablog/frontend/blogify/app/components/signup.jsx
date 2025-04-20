'use client'
import { motion } from 'framer-motion';
import Input from "./input"
import { useState } from "react"
import Button from './button';
import { useUserStore } from '@/context/useUserStore';
import {toast} from 'react-hot-toast';
import { useRouter } from "next/navigation";

const Signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '', 
        first_name: '', 
        last_name: '',
    })
    const{register, loading} = useUserStore()
    const handleSignup = async(e)=>{
        e.preventDefault();
        try{
            await register(formData.username, formData.email,formData.password, formData.first_name,formData.last_name, router)
        }catch(err){
            console.error("signup failed:", err);
            const errorMessage = err.response?.data?.messsage || "signup failed!";
            toast.error( errorMessage);   
        }

    }

    function handleChange(e){
        setFormData( (prev)=>({
            ...prev,
            [e.target.name]: e.target.value,
        }));
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
  Create an account
</motion.h1>
<form
className='w-full p-4'>
      <Input
            label="Username" 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username}
            onChange={handleChange} 
        />

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

         <Input
            label="firstName" 
            type="text" 
            id="first_name" 
            name="first_name" 
            value={formData.first_name}
            onChange={handleChange} 
        />

         <Input
            label="LastName" 
            type="text" 
            id="last_name" 
            name="last_name" 
            value={formData.last_name}
            onChange={handleChange} 
        />    
<Button 
    onClick={handleSignup} 
    label='signup' 
    loading={loading}/>
       <p>or</p>

<Button 
    onClick={handleSignup} 
    label='continue with google' 
    />
<Button 
    onClick={handleSignup} 
    label='continue with apple' 
    />

</form>
</div>
</div>
  )
}

export default Signup
