import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export const store = createContext()


const ContextProvider = (props) => {

   const url='https://icecream-dcsz.onrender.com'
    const [foodList, setFoodList] = useState([])
    const [token, setToken] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()
    const [cartItem,setCartItem] = useState({})
    const [user, setUser] = useState([])

  
    const fetchList =async ()=>{
      try {
        const response =await axios.get(`${url}/food/list`)
        setFoodList(response.data.foodlist)
      } catch (error) {
        console.log(error.message)
      }
    }
    

  const AddCart =async (itemId)=>{
    if(!cartItem?.[itemId]){
      setCartItem((prev)=> ({...prev,[itemId]:1}))
    }
    else{
      setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    if (token) {
      await axios.post(`${url}/cart/add`,{itemId},{headers:{token}})
    }
    else{
      toast('please login')
    }
  }

  const RemoveCart =async (itemId)=>{
    setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    if (token) {
      await axios.post(`${url}/cart/remove`,{itemId},{headers:{token}})
    }
    else{
      toast('please login')
    }
  }

  const getTotalAmount =()=>{
    let total = 0;
    for(const item in cartItem){
      if(cartItem[item]>0){
        let itemInfo = foodList?.find((product)=>product._id===item)
        total+= itemInfo?.price * cartItem[item]
      }

    }
    return total
  }
  const getCartCount = ()=> {
        let totalCount = 0
        for(const items in cartItem){
                if(cartItem[items] > 0){
                    totalCount += cartItem[items]
            }
        }
        return totalCount
    }

    const removeFood = async(itemId)=>{
      const response = await axios.post(`${url}/food/delete/${itemId}`)
      if(response.data.success){
        toast.success('Product Removed')
      }
      await fetchList()

    }

    const Logout =()=>{
      setToken('')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      toast.success('Logout Successfully')
      navigate('/')
      getCartData(localStorage.removeItem('token'))
    }

    const getCartData = async (token)=>{
      const {data} = await axios.get(`${url}/cart/get`,{headers:{token}})
      setCartItem(data.cartItems)
    }

    useEffect(()=>{
      fetchList()
       if (localStorage.getItem('token')) {
          setToken(localStorage.getItem('token'))
          getCartData(localStorage.getItem('token'))
        }
       
    },[])
    
    useEffect(()=>{
       if(localStorage.getItem('user')){
          setUser(localStorage.getItem('user'))
          navigate('/')
        }
    },[user])

 
    

    const contextValue={
            fetchList,
            cartItem, setCartItem,
            AddCart,
            RemoveCart,
            getTotalAmount,
            navigate,
            getCartCount,
            axios,
            foodList,
            removeFood,
            url,
            token, setToken,
            showLogin, setShowLogin,
            Logout,
            user, setUser,
            
    }
  return (
   <store.Provider value={contextValue}>
        {props.children}
   </store.Provider>
  )
}

export default ContextProvider
