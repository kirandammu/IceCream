import React from 'react'
import { menu_list } from '../assets/assets'
import Title from './Title'

const MenuList = ({category, setCategory}) => {
  return (
    <div className='py-5'>
      <div className='text-2xl font-medium'>
        <Title text1={'Explore'} text2={'Our Menu'} />
        <p className='text-[13px] text-purple-800 w-96 md:w-xl py-1'>Choose from a diverse menu a detectable array of dishes. Our mission is to satisfy your cravings and elevate your during experience, one delicious meal at a time.</p>
      </div>

      <div className='flex w-xl md:w-6xl overflow-x-scroll'>
        {menu_list.map((item,index)=>{
            return(
                <div key={index} onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}
                 className='flex flex-col items-center md:w-6xl gap-auto py-6 cursor-pointer'>
                    <img src={item.menu_image} alt=""  className={category===item.menu_name?'border-blue-700 border-3 rounded-full p-1 w-12 md:w-20 ':'w-12 md:w-20 rounded-full shadow-2xl'}/>
                    <p className={category===item.menu_name?'text-xs md:text-base py-1 text-blue-700':'text-xs md:text-base py-1 text-gray-700'}>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default MenuList
