import express from 'express'
import {addFood, listFood, removeFood} from '../controllers/foodController.js'
import upload from '../utils/multer.js'
import Admin from '../middleware/Admin.js'
import Auth from '../middleware/AuthMiddleware.js'

const foodRouter = express.Router()

foodRouter.post('/add' ,upload.single('image'), addFood)
foodRouter.get('/list', listFood)
foodRouter.post('/delete/:foodId', removeFood)


export default foodRouter