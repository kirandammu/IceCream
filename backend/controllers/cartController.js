import User from '../models/User.js'

export const addToCart =async (req,res)=>{
    try {
        let userData = await User.findById({_id:req.userId})
        let cartItems =await userData.cartItems
        if(!cartItems[req.body.itemId]){
            cartItems[req.body.itemId] = 1
        }
        else{
            cartItems[req.body.itemId] += 1
        }
        await User.findByIdAndUpdate(req.userId,{cartItems})
        res.json({success:true, message:'Add To Cart'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    }
}

export const removeCart = async (req,res)=>{
    try {
        let userData = await User.findById(req.userId)
        let cartItems = await userData.cartItems
        if(cartItems[req.body.itemId]>0)
        {   cartItems[req.body.itemId] -= 1
        }
        await User.findByIdAndUpdate(req.userId,{cartItems})
        res.json({success:true, message:'Remove From Cart'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    }
}

export const getCart = async (req,res)=>{
    try {
        let userData = await User.findById(req.userId)
        let cartItems = userData?.cartItems
    res.json({success:true, cartItems})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    }
}