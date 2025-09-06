import React, { useContext, useEffect, useState } from 'react'
import { store } from '../context/Context'
import axios from 'axios'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Order = () => {
  
  const {url, token} = useContext(store)
  const [orders, setOrders] = useState([])

  const allOrders = async ()=>{
    const response = await axios.get(`${url}/order/allOrders`,{headers:{token}})
      setOrders(response?.data?.data)
  }
  const status =async (event, orderId)=>{
    const response = await axios.post(`${url}/order/status`,{orderId, status:event.target.value}, {headers:{token}})
    if (response.data.success) {
      await allOrders()
      toast.success(response.data.message)
    }
  }
  
  useEffect(()=>{
if (token) {
      allOrders()
  
}  },[token])

  return (
    <div className='py-3 px-24'>
      <div className='text-2xl font-medium'>
        <p className='text-blue-600'>All <span className='text-purple-700 border-b-2'>Orders</span></p>
      </div>
       <table className="md:table-auto table-fixed w-full overflow-hidden">
                                                <thead className="text-gray-900 text-sm text-left">
                                                    <tr className=''>
                                                        <th className="px-4 py-3 font-semibold truncate">Items List</th>
                                                        <th className="px-4 py-3 font-semibold truncate">Customer Details</th>
                                                        <th className="px-4 py-3 font-semibold truncate hidden md:block">Item Details </th>
                                                        {/* <th className="px-4 py-3 font-semibold truncate">Status</th> */}
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
                                                            <td className="px-4 py-3 "><div className='mb-2 text-purple-700 font-medium'>{item?.address?.firstName+' '+ item?.address?.lastName}</div><div>{item?.address?.street+', '+item?.address?.city+', '+item?.address?.state+', '+item?.address?.zipcode}</div><span>{item?.address?.phone}</span></td>
                                                            <td className="px-4 py-3 max-sm:hidden w-32 "><div className='mb-2 text-blue-700 font-medium'>Amount: ₹{item?.amount}</div><div>Items:{item?.items.length}</div></td>
                                                            {/* <td className="px-8 py-2 font-medium text-[purple] w-40">{item.status}</td> */}
                                                            <td className="px-8 py-2 " >
                                                              <select className='bg-gray-100 p-2 rounded' onChange={(event)=>status(event,item._id)} value={item?.status}>
                                                                <option value="food processing"> Food Processing</option>
                                                                <option value="out for delivery"> Out for Delivery</option>
                                                                <option value="delivered"> Delivered</option>
                                                              </select>
                                                            </td>
                                                        </tr>
                                                    )})}
                                                </tbody>
                                            </table>
    </div>
  )
}

export default Order
