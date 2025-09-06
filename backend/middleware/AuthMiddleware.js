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



// import jwt from "jsonwebtoken";

// const Auth = (req, res, next) => {
//   try {
//     const authHeader = req.headers["authorization"]; // standard header
//     if (!authHeader) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     // Format: "Bearer token"
//     const token = authHeader.split(" ")[1];
//     console.log(token)
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Token missing" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, "dammukiran4"); // replace with process.env.JWT_SECRET in production

//     // Attach userId to request
//     req.userId = decoded.userId;

//     next();
//   } catch (error) {
//     console.error("Auth error:", error.message);
//     return res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default Auth;
