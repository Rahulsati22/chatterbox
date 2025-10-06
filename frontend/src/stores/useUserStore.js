import { create } from 'zustand'
import { axios2 } from '../lib/axios'
import { toast } from 'react-hot-toast'
import { io } from 'socket.io-client'


const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:3000' : "/"

const useUserStore = create((set, get) => ({
    userAuth: null,
    signuploading: false,
    signinloading: false,
    checkingAuth: true,
    onlineUsers: [],
    socket: null,

    signup: async ({ name, email, password, image }) => {
        try {
            set({ signuploading: true })
            const response = await axios2.post('/auth/register', { name, email, password, image })

            set({ signuploading: false })
            //setting user auth here
            set({ userAuth: response.data.user })
            toast.success('account created successfully')
            get().connectSocket()
        } catch (error) {
            set({ signuploading: false })
            console.log('error in signup function', error.message)
            set({ signuploading: false })
            toast.error(error.response.data.message || 'something went wrong')
        }
    },


    login: async ({ email, password }) => {
        try {
            set({ signinloading: true })
            const response = await axios2.post('/auth/login', { email, password })
            set({ userAuth: response.data.user })
            set({ signinloading: false })
            toast.success('account logged in successfully')
            get().connectSocket()
        } catch (error) {
            set({ signinloading: false })
            console.log('error in signup function', error)
            set({ signinloading: false })
            toast.error(error.response.data.message || 'something went wrong')
        }
    },

    checkAuth: async () => {
        try {
            const response = await axios2.get('/auth/checkauth')
            set({ userAuth: response.data.user })
            get().connectSocket()
        } catch (error) {
            set({ userAuth: null })
            console.log("error in checkAuth")
        } finally {
            set({ checkingAuth: false })
        }
    },

    logout: async () => {
        try {
            await axios2.post('/auth/logout')
            set({ userAuth: null })
            toast.success('account logged out successfully')
            get().disconnectSocket()
        } catch (error) {
            console.log("error in logout")
            toast.error(error.message || 'something went wrong')
        }
    },

    saveProfile: async (image) => {
        try {
            const response = await axios2.put('/auth/updateprofile', { image })
            set({ userAuth: response.data.user })
            toast.success("profile updated successfully")
        } catch (error) {
            console.log("error in saving profile")
            toast.error(error.response.data.message || 'something went wrong')
        }
    },

    connectSocket: async () => {
        const { userAuth } = get()
        if (!userAuth || get().socket?.connected) return
        const socket = io(BASE_URL, {
            query: {
                userId: userAuth._id
            }
        })
        socket.connect()
        set({ socket: socket })

        socket.on("getOnlineUsers", (users) => {
            set({ onlineUsers: users })
        })
    },
    disconnectSocket: async () => {
        if (!get().socket?.connected) return
        get().socket.disconnect()
    }
}))

export { useUserStore }