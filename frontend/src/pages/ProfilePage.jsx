import React, { useState, useEffect } from 'react'
import {
  User, Mail, Calendar, Camera, Edit3, Shield, Clock,
  CheckCircle, X, Upload, MapPin, Phone, Globe,
  Heart, MessageCircle, Settings, LogOut
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'
import Loader from '../components/Loader'

const Profile = () => {
  const { userAuth, saveProfile } = useUserStore()
  const [showImageModal, setShowImageModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)

  // Mock user data - replace with actual data from your store/API
  const [userProfile, setUserProfile] = useState({
    name: userAuth?.name || 'Jason Doe',
    email: userAuth?.email || 'jason@gmail.com',
    profilePicture: userAuth?.profile || null,
    joinedDate: 'January 15, 2024',
    lastSeen: 'Active now',
    accountStatus: 'Active'
  })

  const [editData, setEditData] = useState({ ...userProfile })

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      setUploading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  // Save new profile picture
  const saveProfilePicture = async () => {
    if (previewImage) {
      setUploading(true)
      await saveProfile(previewImage)
      setUploading(false)
       
      setShowImageModal(false)
      setPreviewImage(null)
    }
  }

  // Handle edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }

  return (
    <div
      className="min-h-screen pt-20 pb-6 px-3 sm:px-4 lg:px-6"
      style={{
        backgroundColor: '#1a1a1a',
        backgroundImage: 'radial-gradient(circle at 25% 25%, #075E54 0%, transparent 50%), radial-gradient(circle at 75% 75%, #128C7E 0%, transparent 50%)',
        backgroundSize: '200% 200%'
      }}
    >
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Main Profile Card - Responsive */}
        <div
          className="rounded-2xl sm:rounded-3xl shadow-2xl border overflow-hidden"
          style={{
            backgroundColor: '#2a2a2a',
            borderColor: '#3a3a3a'
          }}
        >
          {/* Header - Responsive padding */}
          <div className="text-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Profile</h1>
            <p className="text-gray-400 text-xs sm:text-sm">Your profile information</p>
          </div>

          {/* Profile Picture Section - Responsive */}
          <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
            <div className="text-center mb-6 sm:mb-8">
              <div
                className="relative inline-block cursor-pointer transform transition-transform duration-200 hover:scale-105"
                onClick={() => setShowImageModal(true)}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-3 sm:border-4 border-teal-400 shadow-2xl overflow-hidden mx-auto relative">
                  {userAuth?.profile ? (
                    <img
                      src={userAuth.profile}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <User size={window.innerWidth < 640 ? 36 : 50} className="text-white" />
                    </div>
                  )}

                  {/* Camera Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>

                {/* Camera Icon Badge - Responsive */}
                <div
                  className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 sm:border-3 border-gray-700 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4 px-4">
                Click the camera icon to update your photo
              </p>
            </div>

            {/* Form Fields - Responsive spacing */}
            <div className="space-y-4 sm:space-y-6">
              {/* Full Name */}
              <div>
                <div className="flex items-center mb-2 sm:mb-3">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <label className="text-gray-400 text-xs sm:text-sm font-medium">Full Name</label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={userProfile.name}
                    readOnly={!isEditing}
                    onChange={(e) => isEditing && handleEditChange(e)}
                    name="name"
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border text-white text-base sm:text-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      backgroundColor: '#3a3a3a',
                      borderColor: '#4a4a4a'
                    }}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <div className="flex items-center mb-2 sm:mb-3">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <label className="text-gray-400 text-xs sm:text-sm font-medium">Email Address</label>
                </div>
                <input
                  type="email"
                  value={userProfile.email}
                  readOnly={!isEditing}
                  onChange={(e) => isEditing && handleEditChange(e)}
                  name="email"
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border text-white text-base sm:text-lg focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: '#3a3a3a',
                    borderColor: '#4a4a4a'
                  }}
                />
              </div>
            </div>

            {/* Account Information - Responsive */}
            <div className="mt-6 sm:mt-8">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Account Information</h3>

              <div className="space-y-3 sm:space-y-4">
                {/* Member Since */}
                <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-700">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-gray-300 text-sm sm:text-base">Member Since</span>
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">{userProfile.joinedDate}</span>
                </div>

                {/* Account Status */}
                <div className="flex justify-between items-center py-2 sm:py-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-gray-300 text-sm sm:text-base">Account Status</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#25D366' }}></div>
                    <span className="text-green-400 font-medium text-sm sm:text-base">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Picture Modal - PERFECT POSITIONING */}
      {showImageModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-90"
          style={{ 
            padding: '16px', // Consistent padding on all sides
            backdropFilter: 'blur(4px)' // Better visual effect
          }}
        >
          {/* Modal Container with Perfect Centering */}
          <div
            className="relative w-full max-w-lg mx-auto bg-gray-800 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ 
              backgroundColor: '#2a2a2a',
              transform: 'translateY(0)', // Ensures perfect centering
              margin: 'auto' // Additional centering
            }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800 rounded-t-2xl"
                 style={{ backgroundColor: '#2a2a2a' }}>
              <h2 className="text-xl font-bold text-white">Update Profile Picture</h2>
              <button
                onClick={() => {
                  setShowImageModal(false)
                  setPreviewImage(null)
                }}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Preview Image */}
              <div className="text-center mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-teal-400 shadow-xl">
                  {previewImage || userAuth?.profile ? (
                    <img
                      src={previewImage || userAuth.profile}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <User size={72} className="text-white" />
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  {previewImage ? 'Preview of your new picture' : 'Current profile picture'}
                </p>
              </div>

              {/* Upload Section */}
              <div className="space-y-4">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <div
                    className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-teal-400 transition-all duration-200"
                    style={{ 
                      borderColor: uploading ? '#6B7280' : '#4a4a4a', 
                      backgroundColor: 'rgba(37, 211, 102, 0.05)',
                      cursor: uploading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {uploading ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-400 mb-4"></div>
                        <p className="text-gray-300">Processing image...</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </div>
                </label>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={saveProfilePicture}
                    disabled={!previewImage || uploading}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium text-white transition-all duration-200 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: (!previewImage || uploading) ? '#4a4a4a' : '#25D366'
                    }}
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={18} />
                        <span>Save Picture</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setShowImageModal(false)
                      setPreviewImage(null)
                    }}
                    disabled={uploading}
                    className="flex-1 py-3 px-4 border-2 border-gray-600 rounded-xl font-medium text-gray-300 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>

                {/* Tips Section */}
                <div className="mt-6 p-4 bg-gray-800 bg-opacity-50 rounded-xl">
                  <h4 className="text-white font-medium text-sm mb-2">Tips:</h4>
                  <ul className="text-gray-400 text-xs space-y-1">
                    <li>• Use a square image for best results</li>
                    <li>• Minimum 400x400px recommended</li>
                    <li>• Good lighting works best</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
