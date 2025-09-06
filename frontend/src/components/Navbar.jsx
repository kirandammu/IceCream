import React from 'react'
import { useContext } from 'react'
import {NavLink, Link} from 'react-router-dom'
import { store } from '../context/Context'
import { LuShoppingCart } from 'react-icons/lu'


const Navbar = () => {
  const {setShowLogin ,getCartCount, getTotalAmount, token, Logout, user} = useContext(store)
  return (
    <div className='flex w-xl md:w-full justify-between px-10 border-b border-gray-400 py-2'>
      <div className='md:text-2xl font-bold'>
        <Link to={'/'}><p className='text-blue-600'>Ice <span className='text-purple-700 border-b-2'>Creams</span></p></Link>
      </div>
      <ul className='flex gap-x-8 text-blue-600 cursor-pointer'>
        <NavLink className={({isActive})=>`${isActive? 'border-b-2 border-purple-800 text-purple-700' : ''}`}  to='/'>Home</NavLink> 
        <NavLink className={({isActive})=>`${isActive? 'border-b-2 border-purple-800 text-purple-700' : ''}`}  to='/about'>About</NavLink>
        {(user === 'admin') ?(<></>): (<NavLink className={({isActive})=>`${isActive? 'border-b-2 border-purple-800 text-purple-700' : ''}`}  to='/myorders'>My Orders</NavLink>)}
      </ul>
      <div className='flex items-center space-x-8 '>
        {(!token ? (<></>) : (user === 'admin') ?
        (<Link to='/seller'>< p className='text-white font-medium border p-1 px-3 rounded cursor-pointer bg-gradient-to-r from-purple-700 via-blue-500 to-purple-900'>Dashboard</p></Link>):
        (<Link to='/cart'><div className='relative'>
          <LuShoppingCart className='text-blue-600 font-bold text-2xl cursor-pointer'/>
          {getTotalAmount() === 0?<span></span>:<span className={'w-3.5 h-3.5 rounded-full bg-[red] absolute -top-1.5 -right-2.5 flex items-center justify-center text-[9px] text-white'}>{getCartCount()}</span>}
        </div></Link>))}
        {!token?
        <button onClick={()=>setShowLogin(true)} className='bg-gradient-to-r from-purple-700 via-blue-500 to-purple-900 cursor-pointer text-white px-5 py-1 rounded'>Login</button>:
        <button onClick={()=>Logout()} className='bg-[red] cursor-pointer text-white px-5 py-1 rounded'>Logout</button>}
        
      </div>
    </div>
  )
}

export default Navbar
