import React, { useContext, useState } from 'react'
import { store } from '../context/Context'
import axios from 'axios'
import { AiOutlineLoading } from 'react-icons/ai';

const PlaceOrder = () => {

    const {getTotalAmount, token, foodList, navigate, cartItem, setCartItem, url} = useContext(store)
    const [loading, setLoading] = useState(false)
    const [method, setMethod] = useState(false)


    const [data, setData] = useState({
      firstName:'',
      lastName:'',
      email:'',
      street:'',
      city:'',
      state:'',
      zipcode:'',
      country:'',
      phone:''
    })
  const onChangeHandler = (e)=>{
      const name = e.target.name;
      const value= e.target.value;
      setData((data)=>({...data,[name]:value}))
  }
 
  const orderSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)

    let orderItems = [];
    foodList.map((item)=>{
      if (cartItem?.[item._id]>0) {
        let itemInfo = item
        itemInfo["quantity"] = cartItem?.[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalAmount()
    }
    switch (method) {
      case 'online':
        let response = await axios.post(`${url}/order/stripe`, orderData, {headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data
      window.location.replace(session_url)
      setLoading(false)
    }
    else{
      alert('error')
    }

        break;
    
        case 'COD':
        {let response = await axios.post(`${url}/order/place`, orderData, {headers:{token}})
    if (response.data.success) {
      navigate('/myorders')
      setCartItem({})
      setLoading(false)
    }
    else{
      alert('error')
    }}

        break;
    
      default:
        break;
    }
  }

  return (
    <form onSubmit={(orderSubmit)} className="flex flex-col px-3 md:flex md:flex-row items-center justify-between md:px-32 py-8">
      <div className="flex flex-col w-96 gap-y-3">
        <div className='text-2xl font-bold pb-5 pt-8 '>
        <p className='text-blue-600'>Delivery <span className='text-purple-700 border-b-2'>Information</span></p>
        </div>
        <div className="flex items-center justify-between ">
          <input required type="text" placeholder='First name' onChange={onChangeHandler} value={data.firstName} name='firstName' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
          <input required type="text" placeholder='Last name' onChange={onChangeHandler} value={data.lastName} name='lastName' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        </div>
          <input required type="text" placeholder='Email Address' onChange={onChangeHandler} value={data.email} name='email' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
          <input required type="text" placeholder='Street' onChange={onChangeHandler} value={data.street} name='street' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        <div className="flex items-center justify-between">
          <input required type="text" placeholder='City' onChange={onChangeHandler} value={data.city} name='city' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
          <input required type="text" placeholder='State' onChange={onChangeHandler} value={data.state} name='state' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        </div>
        <div className="flex items-center justify-between">
          <input required type="text" placeholder='Zip code' onChange={onChangeHandler} value={data.zipcode} name='zipcode' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
          <input required type="text" placeholder='Country' onChange={onChangeHandler} value={data.country} name='country' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        </div>
        <input required type="text" placeholder='Phone Number' onChange={onChangeHandler} value={data.phone} name='phone' className='border border-gray-400 px-2 outline-none rounded-xs py-0.5' />
        </div>

      <div className="order-right">

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
          <div className='flex gap-x-4'>
            <p onClick={()=>{setMethod('online')}} className=' flex items-center justify-center border border-blue-600 text-blue-600 w-full py-2 my-6 rounded cursor-pointer'><span className={`${method === 'online' ? 'w-2 h-2 rounded-full bg-green-500 mr-2':''}`}></span>Online Payment</p>
            <p onClick={()=>{setMethod('COD')}} className=' flex items-center justify-center border border-blue-600 text-blue-600 w-full py-2 my-6 rounded cursor-pointer'><span className={`${method === 'COD' ? 'w-2 h-2 rounded-full bg-green-500 mr-2':''}`}></span>Cash On Delivery</p>
          </div>
          { method && <button disabled={loading} type='submit' className="bg-gradient-to-r from-purple-700 via-blue-500 to-purple-900 flex items-center justify-center text-white w-full py-2 my-6 rounded-md cursor-pointer">{loading ? <AiOutlineLoading className='text-2xl font-bold animate-spin'/>: method === 'COD' ? "PLACE ORDER":'PROCEED TO PAYMENT'}</button>}        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
