import { create } from 'zustand'
import { axios2 } from '../lib/axios'
import { toast } from 'react-hot-toast'


const useUserStore = create((set, get) => ({
    userAuth: null,
    signuploading: false,
    signinloading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, image }) => {
        try {
            set({ signuploading: true })
            const response = await axios2.post('/auth/register', { name, email, password, image })
            console.log(response.data)
            set({ signuploading: false })
            //setting user auth here
            set({ userAuth: response.data.user })
            toast.success('account created successfully')
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
        } catch (error) {
            console.log("error in logout")
            toast.error(error.message || 'something went wrong')
        }
    }
}))

export { useUserStore }