import React, { useContext, useEffect, useState } from 'react'
import { store } from '../context/Context'
import axios from 'axios'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'
import Title from '../components/Title'

const Myorders = () => {
  
  const {url, token} = useContext(store)
  const [orders, setOrders] = useState([])

  const myOrders = async ()=>{
    const response = await axios.get(`${url}/order/myorders`,{headers:{token}})
      setOrders(response?.data?.data)
  }

  useEffect(()=>{
if (token) {
      myOrders()
} else{
    toast('please login')
}
  },[token])

  return (
    <div className='py-8 px-40'>
      <Title text1={'My'} text2={'Orders'} />
      <div>
                  <table className=" w-full overflow-hidden">
                                          <thead className="text-gray-900 text-sm text-left">
                                              <tr className=''>
                                                  <th className="px-4 py-3 font-semibold truncate">Items List</th>
                                                  <th className="px-4 py-3 font-semibold truncate">Amount</th>
                                                  <th className="px-4 py-3 font-semibold truncate hidden md:block">Items Count</th>
                                                  <th className="px-4 py-3 font-semibold truncate">Status</th>
                                                  <th className="px-4 py-3 font-semibold truncate">Check</th>
                                              </tr>
                                          </thead>
                                          <tbody className="text-sm text-gray-500">
                                              {orders?.map((item) => {
                                                return (
                                                <tr key={item._id} className="border-t border-gray-500/20">
                                                      <td className="px-4 py-3 flex items-center"><img src={assets.parcel_icon} className='w-10 pr-1 mr-2 '/>{item.items.map((i,index)=>{
                                                        if (index === item.items.length-1) {
                                                          return i.name + ' x ' + i.quantity
                                                        }else{
                                                          return i.name + ' x ' + i.quantity+ ',  '
                                                        }
                                                      })}</td>
                                                      <td className="px-4 py-3 "><div className={` flex flex-col items-center justify-center ${item.paymentType === 'online' ? "text-green-500" : "text-blue-600"}`}><p>₹{item.amount}</p><p> {item.paymentType}</p></div></td>
                                                      <td className="px-4 py-3 max-sm:hidden ">items: {item.items.length}</td>
                                                      <td className={item?.status === 'delivered' ?"px-8 py-2 font-medium text-green-500 w-40" : item?.status === 'out for delivery' ?"px-8 py-2 font-medium text-orange-500 w-40":"px-8 py-2 font-medium text-blue-600 w-40"}>{item.status}</td>
                                                      <td className="px-8 py-2 " onClick={myOrders}><li className='bg-amber-100 text-gray-900 font-medium py-1 list-none flex justify-center w-20 cursor-pointer'>Track Order</li></td>
                                                  </tr>
                                              )})}
                                          </tbody>
                                      </table>
      </div>
    </div>
  )
}

export default Myorders
