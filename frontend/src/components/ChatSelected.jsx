import React, { useEffect, useState, useRef } from 'react'
import {
    Send, Smile, Paperclip, Mic, Phone, Video,
    MoreVertical, ArrowLeft, User, Check, CheckCheck, MessageCircle,
    Loader
} from 'lucide-react'
import { useChatStore } from '../stores/useChatStore'
import { useUserStore } from '../stores/useUserStore'

const ChatSelected = ({ onBackClick }) => {
    const { messages, getMessages, selectedUser, sendMessage, isMessagesLoading } = useChatStore()
    const { userAuth } = useUserStore()
    const [message, setMessage] = useState('')
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const messagesEndRef = useRef(null)

    // Check if mobile device
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Get messages when selectedUser changes
    useEffect(() => {
        if (selectedUser?._id) {
            getMessages(selectedUser._id)
        }
    }, [selectedUser, getMessages])

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    // Format time
    const formatTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    // Format last seen

    // Send message function
    const handleSendMessage = async () => {
        if (message.trim() && selectedUser?._id) {
            try {
                await sendMessage(
                    selectedUser._id, message.trim()
                )
                setMessage('')
            } catch (error) {
                console.error('Error sending message:', error)
            }
        }
    }

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    // Back button handler for mobile
    const handleBack = () => {
        if (onBackClick) {
            onBackClick()
        }
    }

    if (!selectedUser) {
        return <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting
        </div>
    }

    // MAIN RETURN - INPUT BOX ALWAYS VISIBLE
    return (
        <div
            className="h-full w-full flex flex-col"
            style={{
                backgroundColor: '#0B141A',
                minHeight: '0', // Important for flex
                maxHeight: '100%' // Prevent overflow
            }}
        >
            {/* Chat Header - FIXED */}
            <div
                className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-700"
                style={{ backgroundColor: '#202C33' }}
            >
                <div className="flex items-center space-x-3">
                    {isMobile && (
                        <button
                            onClick={handleBack}
                            className="p-1 hover:bg-gray-600 rounded-full transition-colors mr-2"
                        >
                            <ArrowLeft size={20} className="text-white" />
                        </button>
                    )}

                    {/* User Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        {selectedUser.profile ? (
                            <img
                                src={selectedUser.profile}
                                alt={selectedUser.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-full flex items-center justify-center text-white font-semibold"
                                style={{ backgroundColor: '#25D366' }}
                            >
                                {selectedUser.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                        )}
                    </div>

                    {/* User Info */}
                    <div className="min-w-0">
                        <h3 className="text-white font-medium truncate">
                            {selectedUser.name || 'Unknown User'}
                        </h3>
                    </div>
                </div>


            </div>

            {/* Messages Container - SCROLLABLE */}
            <div
                className="flex-1 overflow-y-auto px-4 py-6"
                style={{
                    minHeight: '0', // Critical for flex
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                }}
            >
                {/* Messages List */}
                <div className="space-y-3">
                    {isMessagesLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                        </div>
                    ) : messages && messages.length > 0 ? (
                        messages.map((msg) => {
                            const isMyMessage = msg.senderId === userAuth?._id

                            return (
                                <div
                                    key={msg._id}
                                    className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${isMyMessage
                                                ? 'rounded-br-md'
                                                : 'rounded-bl-md'
                                            }`}
                                        style={{
                                            backgroundColor: isMyMessage ? '#005C4B' : '#202C33',
                                            color: 'white'
                                        }}
                                    >
                                        <p className="text-sm leading-relaxed break-words">
                                            {msg.text}
                                        </p>

                                        {/* Time and Status */}
                                        <div className="flex items-center justify-end mt-2 space-x-1">
                                            <span className="text-xs opacity-70">
                                                {formatTime(msg.createdAt)}
                                            </span>

                                            {isMyMessage && (
                                                <CheckCheck size={14} className="opacity-70" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex items-center justify-center py-16 text-gray-400">
                            <div className="text-center">
                                <MessageCircle size={64} className="mx-auto mb-4 opacity-30" />
                                <p className="text-lg mb-2">No messages yet</p>
                                <p className="text-sm opacity-70">Start the conversation!</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Auto scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area - ALWAYS FIXED AT BOTTOM */}
            <div
                className="flex-shrink-0 p-4 border-t border-gray-700"
                style={{ backgroundColor: '#202C33' }}
            >
                <div className="flex items-center space-x-3">
                    {/* Attachment Button */}
                    <button className="p-2 hover:bg-gray-600 rounded-full transition-colors flex-shrink-0">
                        <Paperclip size={20} className="text-gray-400" />
                    </button>

                    {/* Message Input */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="w-full px-4 py-3 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                            style={{ backgroundColor: '#2A3942' }}
                        />
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className={`p-3 rounded-full transition-all duration-200 flex-shrink-0 ${message.trim()
                                ? 'hover:scale-105 shadow-lg'
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                        style={{
                            backgroundColor: message.trim() ? '#25D366' : '#4a4a4a'
                        }}
                    >
                        <Send size={18} className="text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatSelected
