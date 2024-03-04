'use client'
import Login from '@/Components/login/Login'
import { useRouter } from 'next/navigation'
import React, { useEffect, useLayoutEffect } from 'react'

const page = () => {
  const router = useRouter()
  useLayoutEffect(() => {
    let localAuthToken:any = localStorage.getItem('Auth')
    localAuthToken = JSON.parse(localAuthToken);

    if (localAuthToken?.state?.isLoggedin ) {
        router.push('/dashboard')
    }
    else{
        router.push('/auth/login')
    }
}, [])
  
  return (
    <div className='flex justify-center items-center'>
        <Login/>
    </div>
  )
}

export default page