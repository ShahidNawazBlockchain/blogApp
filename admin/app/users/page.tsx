'use client'
import BlogTable from '@/Components/BlogTable'
import UserTable from '@/Components/UserTable'
import useUserStore from '@/zustand/useUserStore'
import React, { FC, useEffect } from 'react'

const page: FC =() => {
  const {getAllUsers} = useUserStore()
  useEffect(() => {
    getAllUsers()
  }, [])
  
  return (
    <div className='ml-20 mr-4'>
      <UserTable />
    </div>
  )
}

export default page