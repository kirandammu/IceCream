import express from 'express'
import {addToCart, removeCart, getCart} from '../controllers/cartController.js'
import Auth from '../middleware/AuthMiddleware.js'
const cartRouter = express.Router()

cartRouter.post('/add', Auth, addToCart)
cartRouter.post('/remove', Auth, removeCart)
cartRouter.get('/get', Auth, getCart)

export default cartRouter