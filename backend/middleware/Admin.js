import User from '../models/User.js'
const Admin = async(req, res, next)=>{

    
    try {
        const admin = await User.findById(req.userId)
        if (admin?.email !== 'admin@gmail.com') {
             console.log(admin.email)
        res.json({success:false, message:"You are not admin"})
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"})
    }
}
export default Admin