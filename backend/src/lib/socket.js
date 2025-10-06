//creating socket.io server

import { Server } from 'socket.io'
import http from 'http'

import express from 'express'
const app = express()
const server = http.createServer(app)






const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
})


const userSocketMap = {}

//jb hum login kr rhe hai tb hum connect kr rhe hai socket se
io.on('connection', (socket) => {

    console.log('user connected', socket.id)
    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id

    //used to sent message to all the connected users (we can listen this event from frontend using socket.on('getOnlineUsers'))
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    //jb hum logout kr rhe hai tb hum disconnect kr rhe hai socket se
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})



export function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}


export { io, app, server }