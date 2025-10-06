import React, { useState, useEffect } from 'react'
import {
  Search, Send, Smile, Paperclip, Mic, Phone, Video,
  MoreVertical, ArrowLeft, User, Clock, Check, CheckCheck
} from 'lucide-react'
import { useUserStore } from '../stores/useUserStore'
import Loader from '../components/Loader'
import { useChatStore } from '../stores/useChatStore'
import NoChatSelected from '../components/NoChatSelected'
import ChatSelected from '../components/ChatSelected'

const AllUsersPage = () => {
  const { userAuth, onlineUsers } = useUserStore()
  const { selectedUser, setSelectedUser } = useChatStore()
  const { allUsers, isUsersLoading } = useChatStore()
  const [searchTerm, setSearchTerm] = useState('')

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Check if mobile device
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const func = (user) => {
    setSelectedUser(user)
  }

  // Handle back click - Clear selected user
  const handleBackClick = () => {
    setSelectedUser(null)
  }

  // Check if user is online (mock logic - replace with real logic)
   

  // Filter users based on search
  const filteredUsers = allUsers?.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  return (
    isUsersLoading ? <Loader /> : <div
      className="fixed inset-0 flex"
      style={{
        backgroundColor: '#111B21',
        top: '64px', // Adjust this based on your navbar height
        height: 'calc(100vh - 64px)' // Full height minus navbar
      }}
    >
      {/* Users List Panel */}
      <div
        className={`${isMobile && selectedUser ? 'hidden' : 'flex'
          } flex-col border-r border-gray-700 ${isMobile ? 'w-full' : 'w-80'
          }`}
        style={{ backgroundColor: '#111B21' }}
      >
        {/* Header - Fixed height */}
        <div
          className="flex-shrink-0 p-4 border-b border-gray-700"
          style={{ backgroundColor: '#202C33' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                {userAuth?.profile ? (
                  <img
                    src={userAuth.profile}
                    alt="My Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <User size={20} className="text-white" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-white font-semibold text-lg">Chats</h2>
              </div>
            </div>

          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search or start new chat"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ backgroundColor: '#2A3942' }}
            />
          </div>
        </div>

        {/* Users List - Scrollable */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ height: '0' }} // This forces flex-1 to work properly
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              const isOnline = onlineUsers.includes(user._id)
              return (
                <div
                  key={user._id || user.email}
                  onClick={() => func(user)}
                  className={`flex items-center p-4 cursor-pointer hover:bg-gray-700 transition-colors ${selectedUser?.email === user.email ? 'bg-gray-600' : ''
                    }`}
                  style={{
                    backgroundColor: selectedUser?.email === user.email ? '#2A3942' : 'transparent'
                  }}
                >
                  <div className="relative mr-3 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      {user.profile ? (
                        <img
                          src={user.profile}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-white font-semibold"
                          style={{ backgroundColor: '#25D366' }}
                        >
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${isOnline ? 'animate-pulse' : ''
                        }`}
                      style={{
                        backgroundColor: isOnline ? '#25D366' : '#8B8B8B',
                        borderColor: '#111B21'
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-white font-medium truncate">
                          {user.name || 'Unknown User'}
                        </h3>
                        {/* Online/Offline Status */}
                        <p className={`text-xs ${isOnline ? 'text-green-400' : 'text-gray-400'} mt-1`}>
                          {isOnline ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-gray-400">
              <div>
                <User size={48} className="mx-auto mb-4 opacity-50" />
                <p>No users found</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Panel - Fixed with onBackClick prop */}
      <div
        className={`${isMobile && !selectedUser ? 'hidden' : 'flex'
          } flex-1 flex flex-col`}
        style={{ backgroundColor: '#0B141A' }}
      >
        {selectedUser ? (
          <ChatSelected onBackClick={handleBackClick} />
        ) : (
          <NoChatSelected />
        )}
      </div>
    </div>
  )
}

export default AllUsersPage
