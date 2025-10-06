import jwt from 'jsonwebtoken'
import User from '../models/User.js'
export const protectRoute = async (req, res, next) => {
    try {
        if (!req.cookies.token) return res.status(401).json({ message: "unauthorized" })
        const userId = await jwt.verify(req.cookies.token, process.env.JWT_SECRET).userId
        if (!userId)
            return res.status(401).json({ message: "unauthorized" })

        const user = await User.findById(userId).select("-password")
        
        if (!user)
            return res.status(401).json({ message: "unauthorized" })
        req.user = user
        next()
    } catch (error) {
        console.log("error in protect route middleware", error.message)
        return res.status(500).json({ message: error.message })
    }
}