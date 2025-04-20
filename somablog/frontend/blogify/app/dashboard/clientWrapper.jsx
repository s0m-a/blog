'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/context/useUserStore'
import { useRouter } from 'next/navigation'
import AuthInterceptor from '../components/AuthInterceptor'

export default function ClientWrapper({ children }) {
  const { checkAuth } = useUserStore()
  const router = useRouter()

 
  useEffect(() => {
    const user = checkAuth()
    if (!user) {
      router.push('/auth/login')
    }
  }, [])


  return( 
    <>
    <AuthInterceptor />
    {children}
    </>
  ) 
}
