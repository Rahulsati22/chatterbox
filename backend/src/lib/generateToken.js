import jwt from 'jsonwebtoken'

export const generateToken = (id)=>{
    const token = jwt.sign({userId : id}, process.env.JWT_SECRET, {expiresIn : '7d'})
    return token
}