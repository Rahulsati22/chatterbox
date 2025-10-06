import Message from "../models/Message.js"
import User from "../models/User.js"
import cloudinary from "../lib/cloudinary.js"


//function to get all the users
export const getAllUsers = async (req, res) => {
    try {
        const userId = req.user._id
        const users = await User.find({ _id: { $ne: userId } })
        return res.status(200).json({ users, message: "users fetched successfully" })
    } catch (error) {
        console.log("error in get users for sidebar", error.message)
        return res.status(500).json({ message: error.message })
    }
}



//function to search the user
export const searchUser = async (req, res) => {
    try {
        const { name } = req.body
        const users = await User.find({ name: { $regex: name, $options: "i" } })
        return res.status(200).json({ users, message: "users fetched successfully" })
    } catch (error) {
        console.log("error in search user", error.message)
        return res.status(500).json({ message: error.message })
    }
}



//function to get all chats of the user
export const myChats = async (req, res) => {
    try {
        const chats = (await Message.find({ senderId: req.user._id }).populate("receiverId", "name email profile")).sort({ createdAt: -1 })
        return res.status(200).json({ chats, message: "chats fetched successfully" })
    } catch (error) {
        console.log("error in my chats", error.message)
        return res.status(500).json({ message: error.message })
    }
}



//function to get all the messages
export const getMessages = async (req, res) => {
    try {
        if (!req.params.id) return res.status(400).json({ message: "user id is required" })
        const messages = await Message.find({ $or: [{ senderId: req.user._id, receiverId: req.params.id }, { senderId: req.params.id, receiverId: req.user._id }] })
        return res.status(200).json({ messages, message: "messages fetched successfully" })
    } catch (error) {
        console.log("error in get messages", error.message)
        return res.status(500).json({ message: error.message })
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { message, image } = req.body
        if (!message && !image) return res.status(400).json({ message: "message is required" })

        const receiverId = req.params.id
        if (!receiverId) return res.status(400).json({ message: "receiver id is required" })

        let imageUrl;
        if (image) {
            // console.log(image)
            const cloudinary_url = await cloudinary.uploader.upload(image, {
                folder: "chats"
            })
            imageUrl = cloudinary_url.secure_url
        }

        if (message && imageUrl)
            await Message.create({ image: imageUrl, text: message, senderId: req.user._id, receiverId })
        else if (message)
            await Message.create({ text: message, senderId: req.user._id, receiverId })
        else if (imageUrl)
            await Message.create({ image: imageUrl, senderId: req.user._id, receiverId })

        //real time message logic using socket.io




        const messageAll = await Message.find({ $or: [{ senderId: req.user._id, receiverId: req.params.id }, { senderId: req.params.id, receiverId: req.user._id }] })
        return res.status(200).json({ messages: messageAll, message: "message sent successfully" })
    } catch (error) {
        console.log("error in send message", error.message)
        return res.status(500).json({ message: error.message })
    }
}