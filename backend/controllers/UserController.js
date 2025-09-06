import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

//registration
export const register = async (req,res)=>{
    const {name, email, password} = req.body
    try {
        const exist = await User.findOne({email})
        if (exist) {
            res.json({success:false, message:'Please try another email'})   
        }
        if(password.length<6){
            res.json({success:false, message:'Please enter strong password'})   
        }
        const hashpassword = await bcrypt.hash(password, 10)

        const user =await new User({name, email, password:hashpassword})
        
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET)

        await user.save()

        res.json({success:true, message:`Welcome ${user.name}`, 'token':token, user
})

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})   
    }
}


export const login = async (req,res)=>{
    try {
        const {email, password} = req.body
    const existOne = await User.findOne({email})
    if (!existOne) {
        res.json({success:false, message:'Invalid email'})   
    }
    const isMatch = await bcrypt.compare(password, existOne.password)
    if(!isMatch){
        res.json({success:false, message:'Invalid password'})
    }
    const token = jwt.sign({userId:existOne.id}, process.env.JWT_SECRET)

    res.json({message:'Login Successful',success:true, user:{name:existOne.name, email:existOne.email, role:existOne?.role}, token})

    } catch (error) {
        res.json({success:false, message:error.message})

    }
}