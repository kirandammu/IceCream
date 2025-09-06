import React, { useState } from 'react'
import { useContext } from 'react'
import { store } from '../context/Context'
import { assets } from '../assets/assets'


const Cart = () => {
    const {foodList, cartItem, RemoveCart, getTotalAmount, navigate} = useContext(store)
  return (
    <div className='p-8 px-40'>
         <div className='text-2xl font-bold pb-5'>
        <p className='text-blue-600'>Cart <span className='text-purple-700 border-b-2'>Items</span></p>
        </div>
      <table className=" w-full overflow-hidden">
                              <thead className="text-black text-sm text-left">
                                  <tr>
                                      <th className="px-4 py-3 font-semibold truncate">Item</th>
                                      <th className="px-4 py-3 font-semibold truncate">Title</th>
                                      <th className="px-4 py-3 font-semibold truncate ">Price</th>
                                      <th className="px-4 py-3 font-semibold truncate">Quantity</th>
                                      <th className="px-4 py-3 font-semibold truncate">Total</th>
                                      <th className="px-4 py-3 font-semibold truncate">Remove</th>
                                  </tr>
                              </thead>
                              <tbody className="text-sm text-gray-500">
                                  {foodList?.map((item) => {
                                    // if(cartItem === 0){
                                    //     return <div>No Items available in Cart</div>
                                    // }
                                    if(cartItem?.[item._id]>0){
                                  return (
                                      <tr key={item._id} className="border-t border-gray-500/20">
                                          <td className="px-4 py-3"><img src={item?.image} alt="Product" className="h-12 rounded-xs" /></td>
                                          <td className="px-4 py-3">{item.name}</td>
                                          <td className="px-4 py-3">₹{item.price}</td>
                                          <td className="px-4 py-3">{cartItem[item._id]}</td>
                                          <td className="px-4 py-3">₹{item.price*cartItem[item._id]}</td>
                                          <td className="px-4 py-3 cursor-pointer">
                                              <img src={assets.remove_icon} alt="Remove" onClick={() => RemoveCart(item._id)} />
                                          </td>
                                      </tr>
                                  )}})}
                              </tbody>
                          </table>
      <div className=" flex flex-col-reverse md:flex md:flex-row items-center justify-between">
        <div className="cart-total">
          <div className='text-2xl font-bold pb-5 pt-8'>
        <p className='text-blue-600'>Cart <span className='text-purple-700 border-b-2'>Total</span></p>
        </div>
          <div className='flex flex-col w-96 gap-y-2 text-gray-600'>
            <div className="flex items-center justify-between">
              <p>Subtotal</p>
              <p>₹{getTotalAmount()}</p>
            </div>
            <div className="flex items-center justify-between">
              <p>delivery fee</p>
              <p>₹{getTotalAmount()===0?0:Math.floor(getTotalAmount()*0.10)}</p>
            </div>
            <div className="flex items-center justify-between font-bold text-black">
              <p>Total</p>
              <p>₹{getTotalAmount()===0?0:getTotalAmount()+Math.floor(getTotalAmount()*0.10)}</p>
            </div>
          </div>
            <button onClick={()=>navigate('/order')} className="bg-gradient-to-r from-purple-700 via-blue-500 to-purple-900 text-white w-full py-2 my-6 rounded-md cursor-pointer">PROCEED TO CHECKOUT</button>
        </div>
        <div className="flex flex-col gap-y-3 text-gray-700">
            <p>If you have a promo code, Enter it here</p>
            <div className="w-full rounded">
              <input type="text " placeholder='promo code' className='bg-gray-200 text-gray-800 p-3 py-1 rounded-l outline-none border-none'/>
            <button className="bg-black outline-none border-none text-white py-1 px-3 rounded-r cursor-pointer">SUBMIT</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
