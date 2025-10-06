//importing various things in our project
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDb } from './lib/db.js'
import authRouter from './router/authRoutes.routes.js'
import messageRouter from './router/messageRoutes.routes.js'
import { app, server } from './lib/socket.js'

import path from 'path'
//import various things in our project



const __dirname = path.resolve()


//using dotenv in our project
dotenv.config()
//using dotenv in our project

















//here we will call the connectDb function
connectDb()
//here we will call the connectDb function







//these are middlewares
app.use(cookieParser())
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(express.json({ limit: "50mb" }))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}))
//these are middlewares









//here we are using the authRouter
app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)
//here we are using the authRouter


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}






//here we are listening on port
server.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})
//here we are listening on port