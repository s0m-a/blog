'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/context/useUserStore'
import { useRouter } from 'next/navigation'


export default function ClientWrapper({ children }) {
  const { checkAuth } = useUserStore()
  const router = useRouter()


  return( 
    <>
    {children}
    </>
  ) 
}
