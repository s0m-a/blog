"use client"
import { useState } from "react"
import {motion} from 'framer-motion'


const Input = ({label, type='text', id, name, value, onChange}) => {
    const [isFocused, setIsFocused] = useState(false);
    const shouldFloat = isFocused || value?.length > 0;
  return (
    <div className="relative">
      <input
      type = {type}
      id = {id}
      name = {name}
      value={value}
      onFocus={ ()=> setIsFocused(true)}
      onBlur={ ()=> setIsFocused(false)}
      onChange={onChange}
      className="border-2 border-gray-400 p-2 md:p-4 rounded-2xl w-full mb-4 md:mb-6 bg-white outline-0"
      />
      <motion.label
      htmlFor={id}
      initial={false}
      animate={{
        top: shouldFloat ? '-0.9rem' : '0.25rem',
        left: '1.75rem',
        fontSize: shouldFloat ? '0.75rem' : '1rem',
        color: shouldFloat ? '#130b07' : '#6b7280',
      }}
      transition={{ type: 'string', stiffness:300, damping:25}}
      className="absolute"
      >
        {value? '' : label}
      </motion.label>
    </div>
  )
}

export default Input
