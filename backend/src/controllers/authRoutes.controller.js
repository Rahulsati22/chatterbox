import bcrypt from "bcryptjs"
import User from "../models/User.js"
import jwt from 'jsonwebtoken'
import { generateToken } from "../lib/generateToken.js"
import dotenv from 'dotenv'
import cloudinary from "../lib/cloudinary.js"
dotenv.config()


export const register = async (req, res) => {
    try {
        const { name, email, password, image } = req.body
        if (await User.findOne({ email })) return res.status(400).json({ message: "user already exists" })
        const cloudinary_url = await cloudinary.uploader.upload(image, {
            folder: "chats"
        })
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)
        const user = await User.create({ name, email, password: newPassword, profile: cloudinary_url.secure_url })
        if (!user) return res.status(400).json({ message: "user not created" })


        //generating token
        const token = generateToken(user._id)
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ user, message: "user registered successfully" })
    } catch (error) {
        console.log("error in register user controller", error.message)
        return res.status(500).json({ message: error.message })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ message: "email and password are required" })

        const user = await User.findOne({ email })
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" })

        const token = generateToken(user._id)
        await res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ user, message: "user logged in successfully" })
    } catch (error) {
        console.log("error in login controller", error.message)
        return res.status(500).json({ message: error.message })
    }
}



export const logout = async (req, res) => {
    try {
        if (req.cookies.token) {
            await res.clearCookie('token')
        }
        return res.status(200).json({ message: "user logged out successfully" })
    } catch (error) {
        console.log("error in logout", error.message)
        return res.status(500).json({ message: error.message })
    }
}



export const updateProfile = async (req, res) => {
    try {
        const { image } = req.body
        if (!image) return res.status(400).json({ message: "image is required" })
        const user = await User.findById(req.user._id)
        if (user.profile) {
            const publicId = user.profile.split("/").pop().split("")[0]
            try {
                await cloudinary.uploader.destroy(`chats/${publicId}`)
            } catch (error) {
                return res.status(500).json({ message: error.message })
            }
        }


        const cloudinary_url = await cloudinary.uploader.upload(image, {
            folder: "chats"
        })
        user.profile = cloudinary_url.secure_url
        await user.save()
        return res.status(200).json({ user, message: "profile updated successfully" })
    } catch (error) {
        console.log("error in update profile", error.message)
        return res.status(500).json({ message: error.message })
    }
}


export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json({ user: req.user, message: "user logged in successfully" })
    } catch (error) {
        console.log("error in check auth", error.message)
        return res.status(500).json({ message: error.message })
    }
}