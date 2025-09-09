import React from 'react'
import { useContext } from 'react'
import { store } from '../context/Context'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

const Verify = () => {

    const {navigate, token, url, setCartItem} = useContext(store)
    const [search, setSearch] = useSearchParams()

    const success = search.get('success')
    const orderId = search.get('orderId')

    const verifyPayment = async()=>{
        try {

        const response = await axios.post(`${url}/order/verify`, {success, orderId}, {headers:{token}})

        if (!token) {
            return null
        }
        if (response.data.success) {
            navigate('/myorders')
            setCartItem({})
            toast.success(response.data.message)
        }
        
        else{
            navigate('/cart')
            toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div className='flex items-center justify-center'>
      <AiOutlineLoading className='w-20 h-20 animate-spin text-gray-700'/>
    </div>
  )
}

export default Verify
