import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI).then((conn) => {
        console.log("successfully connected to", conn.connection.host)
    }).catch((error) => {
        console.log(error.message)
    })
} 