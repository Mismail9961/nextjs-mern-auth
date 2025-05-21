import React from 'react'

const page = ({params}:any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p className='text-4xl'>Profile Page</p>
        <span className='p-2 rounded bg-orange-400 text-black'>{params.id}</span>
    </div>
  )
}

export default page