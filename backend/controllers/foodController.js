import food from "../models/Food.js";
import fs from 'fs'
import imagekit from '../utils/ImageKit.js';


//add food Item

export const addFood = async (req,res)=>{
   try {
    const {name, price, category, description} = req.body

  const imageFile = fs.readFileSync(req.file.path);
  

    const imageUrl = await imagekit.upload({
      file:imageFile,
      fileName: req.file.originalname,
      folder: '/food'
    });

      const foodItem = new food({name, price, category, description, image:imageUrl.url})
        const foodsaved = await foodItem.save()
        res.json({message:' Food added successfully',foodsaved, success:true} )
   } catch (error) {
        res.json({success:false,message:'Error',error})
        console.log(error)

    }
}

// all Food List

export const listFood = async (req, res) => {
    try {
        const foodlist = await food.find({}).sort({createdAt:-1})
        res.json({success:true ,foodlist})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

// remove food items from list

export const removeFood = async (req,res) => {
    try {
        const {foodId} = req.params
        await food.findByIdAndDelete({_id:foodId});
        res.json({success:true,message:"Food Removed"})
} catch (error) {
        console.log(error);
        res.json({success:false,message:"error "})
    }
}

