import express from 'express'
import Auth from '../middleware/AuthMiddleware.js'
import {AllOrders, placeOrder, placeOrderStripe, stripeVerify, updateStatus, userOrders} from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/place', Auth, placeOrder)
orderRouter.post('/stripe', Auth, placeOrderStripe)
orderRouter.post('/verify', Auth, stripeVerify)
orderRouter.get('/myorders', Auth, userOrders)
orderRouter.get('/allorders', Auth, AllOrders)
orderRouter.post('/status', Auth, updateStatus)

export default orderRouter