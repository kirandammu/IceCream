import React from 'react'
import Home from './components/Home'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Seller from './pages/Seller'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './pages/Login'
import { useContext } from 'react'
import { store } from './context/Context'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import Myorders from './pages/Myorders'
import Verify from './pages/Verify'
import About from './pages/About'

const App = () => {
  const {showLogin,  user} = useContext(store)
  const isSeller = useLocation().pathname.includes('seller')

  return (
    <div>
      {!isSeller &&<Navbar/>}
      {showLogin &&  <Login/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/myorders' element={<Myorders/>}/>
        <Route path='/verify' element={<Verify/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/seller' element={user === 'admin' ? <Seller /> : <Navigate to="/" replace/>}>
            <Route index element={ <Add/>}/>
            <Route path='list' element={<List/>}/>
            <Route path='orders' element={<Order/>}/>
        </Route>
      </Routes>
      {!isSeller && <Footer/>}
    </div>
  )
}

export default App
