import jwt from 'jsonwebtoken'

const Auth = async(req, res, next)=>{
    const {token} = req.headers;
    if (!token) {
        res.json({success:false, message:'Not Authorized please login'})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decode.userId
        next()
    } catch (error) {
        console.log(error)
        res.json({success:true, message:"Error"})
    }
}
export default Auth
