import express from 'express'
import cors from 'cors'
import connectDB from './utils/db.js'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'
import foodRouter from './routes/foodRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()

app.use(cors())
app.use(express.json())

const port = 'https://icecream-dcsz.onrender.com'

connectDB()

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to Ice Cream Parlour </h1>')
})
app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

app.listen(port, ()=>console.log('welcome to icecream'))
