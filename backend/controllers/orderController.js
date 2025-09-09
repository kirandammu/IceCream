import Order from '../models/Order.js'
import User from '../models/User.js'
import Stripe from 'stripe'



export const placeOrderStripe = async (req,res)=>{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const {origin} = req.headers
    try {
        const newOrder = new Order({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            paymentType:'online'
        })
        await newOrder.save()

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:'inr',
                product_data:{name:item.name},
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:'inr',
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:40*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:'error'})
    }
}

export const placeOrder = async (req,res)=>{
    try {
        const newOrder = new Order({
            userId:req.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            paymentType:'COD'
        })
        await newOrder.save()
        await User.findByIdAndUpdate(req.userId, {cartItems:{}})

        res.json({success:true, message:'order placed', newOrder})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:'error'})
    }
}

export const stripeVerify = async (req,res)=>{
    const { orderId, success} = req.body
    try {
        if (success === 'true') {
            await Order.findByIdAndUpdate(orderId, {payment:true})
            await User.findByIdAndUpdate(req.userId, {cartItems:{}})
            res.json({success:true, message:'payment success'})
        } else{
            await Order.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'error'})
    }
}


export const userOrders = async (req, res)=>{
    try {
        const orders = await Order.find({userId:req.userId}).sort({createdAt:-1})
        res.json({success:true, data:orders})
    } catch (error) {
        res.json({success:false, message:error})
    }
}

export const AllOrders = async (req, res)=>{
    try {
        const orders = await Order.find({}).sort({createdAt:-1})
        res.json({success:true, data:orders})
    } catch (error) {
        res.json({success:false, message:error})
    }
}

export const updateStatus = async (req,res)=>{
    try {
        const {orderId, status} = req.body
        await Order.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:'Status Updated'})
    } catch (error) {
        res.json({success:false, message:error})
        console.log(error)
    }
}