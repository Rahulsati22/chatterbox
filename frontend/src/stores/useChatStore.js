import { create } from 'zustand'
import { axios2 } from '../lib/axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'
import { useUserStore } from './useUserStore'



export const useChatStore = create((set, get) => ({
    allUsers: null,
    messages: null,
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,


    getUsers: async () => {
        try {
            set({ isUsersLoading: true })
            const response = await axios2.get('/message/users')
            set({ allUsers: response.data.users })

            set({ isUsersLoading: false })
        } catch (error) {
            set({ isUsersLoading: false })
            console.log("error in getting users", error.message)
            toast.error(error.response.data.message || 'something went wrong')
        }
    },

    getMessages: async (userId) => {
        try {
            set({ isMessagesLoading: true })
            const response = await axios2.get(`/message/getmessages/${userId}`)
            set({ messages: response.data.messages })

            set({ isMessagesLoading: false })
        } catch (error) {
            console.log("error in getting messages", error.message)
            toast.error(error.response.data.message || 'something went wrong')
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    //todo update later
    setSelectedUser: async (selectedUser) => { set({ selectedUser: selectedUser }) },

    sendMessage: async (id, message, selectedImage) => {
        try {
            const response = await axios2.post(`/message/sendmessages/${id}`, { message, image: selectedImage })
            set({ messages: response.data.messages })
        } catch (error) {
            console.log('error while sending message', error)
            toast.error(error.response.data.message || 'something went wrong')
        }
    },

    subscribeToMessage: async () => {
        if (!get().selectedUser) return
        const socket = useUserStore.getState().socket
        socket.on('newMessage', (newMessage) => {
            if (newMessage.senderId !== get().selectedUser._id) return
            set({ messages: [...get().messages, newMessage] })
        })
    },

    unsubscribeFromMessage: async () => {
        const socket = useUserStore.getState().socket
        socket.off('newMessage')
    }
}))