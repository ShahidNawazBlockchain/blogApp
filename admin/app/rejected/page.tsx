'use client'
import Card from '@/Components/Card/Card'
import Empty from '@/Components/Empty'
import useBlogStore from '@/zustand/useBlogStore'
import React, { useEffect } from 'react'

const page = () => {
  const { Disapproved, getAllBlog } = useBlogStore()
  useEffect(() => {
    getAllBlog()

  }, [])
  return (
    <div>
      <div className='relative flex justify-center items-center'>
        {Disapproved.length===0?<Empty/>:<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 md:gap-2 gap-3 flex-wrap md:m-4 m-2 relative left-12'>
          {Disapproved?.map((blog: any) => {
            return (
              <Card blog={blog} key={blog?._id} />
            )
          })}
        </div>}
      </div>
    </div>
  )
}

export default page