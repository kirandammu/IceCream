import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='w-96 flex flex-col md:flex md:flex-row md:w-5xl mx-auto shadow-2xl md:px-8 md:my-8 items-center bg-gradient-to-b from-purple-800 via-blue-500 md:bg-gradient-to-r md:from-purple-800 md:via-blue-500 rounded-xl'>
       <div className=" p-10">
       <h1 className='text-2xl md:text-4xl font-bold text-white drop-shadow-2xl'>Order Your</h1>
        <h1 className='text-2xl md:text-4xl font-bold text-white'>Favourite Food Here</h1>
        <p className='md:w-xl line-clamp-3 text-white text-[14px]'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingrediients and culianry expertise. 
            Our mission is to satisfy your cravings and elevate your dining experience at a time.
        </p>
        <p className='bg-white px-6 py-2 w-32 mx-auto md:mx-1 md:w-32 my-4 rounded shadow-2xl text-purple-900 font-semibold cursor-pointer'> View More</p>
       </div>
       <img src={assets.header_img} alt="" className='h-60 md:h-96' />
    </div>
  )
}

export default Hero
