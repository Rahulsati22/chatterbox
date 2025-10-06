import React, { useEffect, useState, useRef } from 'react'
import {
    Send, Smile, Paperclip, Mic, Phone, Video,
    MoreVertical, ArrowLeft, User, Check, CheckCheck, MessageCircle,
    Loader, X, Image as ImageIcon
} from 'lucide-react'
import { useChatStore } from '../stores/useChatStore'
import { useUserStore } from '../stores/useUserStore'

const ChatSelected = ({ onBackClick }) => {
    const { messages, getMessages, selectedUser, sendMessage, isMessagesLoading } = useChatStore()
    const { userAuth } = useUserStore()
    const [message, setMessage] = useState('')
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [selectedImage, setSelectedImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [isSending, setIsSending] = useState(false) // Add sending state
    const messagesEndRef = useRef(null)
    const fileInputRef = useRef(null)

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

    // Handle file selection
    const handleFileSelect = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file)

            // Create preview URL
            const reader = new FileReader()
            reader.onload = (e) => {
                setImagePreview(e.target.result)
            }
            reader.readAsDataURL(file)
        } else {
            alert('Please select an image file only')
        }

        // Clear the input
        event.target.value = ''
    }

    // Remove selected image
    const removeSelectedImage = () => {
        setSelectedImage(null)
        setImagePreview(null)
    }

    // Send message function - Updated with loading state
    const handleSendMessage = async () => {
        if (!selectedUser?._id || isSending) return

        // Check if there's content to send
        if (!message.trim() && !selectedImage) return

        setIsSending(true) // Start sending

        try {
            if (selectedImage) {
                // Send image with optional caption
                await sendMessage(selectedUser._id, message.trim() || null, imagePreview)
                removeSelectedImage()
                setMessage('') // Clear caption
            } else if (message.trim()) {
                // Send text message
                await sendMessage(selectedUser._id, message.trim())
                setMessage('')
            }
        } catch (error) {
            console.error('Error sending message:', error)
            // You can show error toast here
        } finally {
            setIsSending(false) // End sending
        }
    }

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (!isSending) {
                handleSendMessage()
            }
        }
    }

    // Handle paperclip click
    const handlePaperclipClick = () => {
        if (!isSending) {
            fileInputRef.current?.click()
        }
    }

    // Back button handler for mobile
    const handleBack = () => {
        if (onBackClick && !isSending) {
            onBackClick()
        }
    }

    if (!selectedUser) {
        return <div className="flex-1 flex items-center justify-center text-gray-400">
            Select a user to start chatting
        </div>
    }

    return (
        <div
            className="h-full w-full flex flex-col"
            style={{
                backgroundColor: '#0B141A',
                minHeight: '0',
                maxHeight: '100%'
            }}
        >
            {/* Chat Header */}
            <div
                className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-700"
                style={{ backgroundColor: '#202C33' }}
            >
                <div className="flex items-center space-x-3">
                    {isMobile && (
                        <button
                            onClick={handleBack}
                            disabled={isSending}
                            className={`p-1 hover:bg-gray-600 rounded-full transition-colors mr-2 ${isSending ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
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
                        {isSending && (
                            <p className="text-xs text-green-400 animate-pulse">
                                Sending...
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div
                className="flex-1 overflow-y-auto px-4 py-6"
                style={{
                    minHeight: '0',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                }}
            >
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
                                        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${isMyMessage ? 'rounded-br-md' : 'rounded-bl-md'
                                            }`}
                                        style={{
                                            backgroundColor: isMyMessage ? '#005C4B' : '#202C33',
                                            color: 'white'
                                        }}
                                    >
                                        {/* Handle both text and image messages */}
                                        {msg.image ? (
                                            <div className="mb-2">
                                                <img
                                                    src={msg.image}
                                                    alt="Shared image"
                                                    className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                                                    onClick={() => window.open(msg.image, '_blank')}
                                                />
                                                {msg.text && (
                                                    <p className="text-sm leading-relaxed break-words mt-2">
                                                        {msg.text}
                                                    </p>
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-sm leading-relaxed break-words">
                                                {msg.text}
                                            </p>
                                        )}

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

                <div ref={messagesEndRef} />
            </div>

            {/* Image Preview Section */}
            {imagePreview && (
                <div
                    className="flex-shrink-0 p-4 border-t border-gray-700"
                    style={{ backgroundColor: '#1a1a1a' }}
                >
                    <div className="relative inline-block">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-w-xs max-h-32 rounded-lg object-cover"
                        />
                        <button
                            onClick={removeSelectedImage}
                            disabled={isSending}
                            className={`absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors ${isSending ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <X size={16} />
                        </button>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                        {isSending ? 'Sending image...' : 'Ready to send image'}
                    </p>
                </div>
            )}

            {/* Message Input Area */}
            <div
                className="flex-shrink-0 p-4 border-t border-gray-700"
                style={{ backgroundColor: '#202C33' }}
            >
                <div className="flex items-center space-x-3">
                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={isSending}
                    />

                    {/* Attachment Button */}
                    <button
                        onClick={handlePaperclipClick}
                        disabled={isSending}
                        className={`p-2 hover:bg-gray-600 rounded-full transition-colors flex-shrink-0 ${isSending ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        title={isSending ? 'Sending...' : 'Attach Image'}
                    >
                        <Paperclip size={20} className="text-gray-400 hover:text-gray-300" />
                    </button>

                    {/* Message Input */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={
                                isSending
                                    ? 'Sending...'
                                    : imagePreview
                                        ? "Add a caption..."
                                        : "Type a message..."
                            }
                            disabled={isSending}
                            className={`w-full px-4 py-3 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 transition-all ${isSending ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            style={{ backgroundColor: '#2A3942' }}
                        />
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={handleSendMessage}
                        disabled={(!message.trim() && !selectedImage) || isSending}
                        className={`p-3 rounded-full transition-all duration-200 flex-shrink-0 ${(message.trim() || selectedImage) && !isSending
                                ? 'hover:scale-105 shadow-lg'
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                        style={{
                            backgroundColor: (message.trim() || selectedImage) && !isSending ? '#25D366' : '#4a4a4a'
                        }}
                        title={
                            isSending
                                ? 'Sending...'
                                : selectedImage
                                    ? 'Send Image'
                                    : 'Send Message'
                        }
                    >
                        {isSending ? (
                            <Loader size={18} className="text-white animate-spin" />
                        ) : selectedImage ? (
                            <ImageIcon size={18} className="text-white" />
                        ) : (
                            <Send size={18} className="text-white" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatSelected
