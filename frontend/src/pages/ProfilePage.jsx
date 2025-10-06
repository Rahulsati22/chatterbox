import React, { useState, useEffect } from 'react'
import {
  User, Mail, Calendar, Camera, Edit3, Shield, Clock,
  CheckCircle, X, Upload, MapPin, Phone, Globe,
  Heart, MessageCircle, Settings, LogOut
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'
import Loader from '../components/Loader'
import { set } from 'mongoose'

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
      console.log(previewImage)
    }
  }

  // Handle edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }




  return (
    <div
      className="min-h-screen py-8 px-4 mt-0"
      style={{
        backgroundColor: '#1a1a1a',
        backgroundImage: 'radial-gradient(circle at 25% 25%, #075E54 0%, transparent 50%), radial-gradient(circle at 75% 75%, #128C7E 0%, transparent 50%)',
        backgroundSize: '200% 200%'
      }}
    >
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Main Profile Card - Dark Theme */}
        <div
          className="rounded-3xl shadow-2xl border overflow-hidden"
          style={{
            backgroundColor: '#2a2a2a',
            borderColor: '#3a3a3a'
          }}
        >
          {/* Header */}
          <div className="text-center px-8 py-8">
            <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
            <p className="text-gray-400 text-sm">Your profile information</p>
          </div>

          {/* Profile Picture Section */}
          <div className="px-8 pb-6">
            <div className="text-center mb-8">
              <div
                className="relative inline-block cursor-pointer transform transition-transform duration-200 hover:scale-105"
                onClick={() => setShowImageModal(true)}
              >
                <div className="w-32 h-32 rounded-full border-4 border-teal-400 shadow-2xl overflow-hidden mx-auto relative">
                  {userAuth.profile ? (
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
                      <User size={50} className="text-white" />
                    </div>
                  )}

                  {/* Camera Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Camera Icon Badge */}
                <div
                  className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-3 border-gray-700 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>

              <p className="text-gray-400 text-sm mt-4">
                Click the camera icon to update your photo
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <div className="flex items-center mb-3">
                  <User className="w-4 h-4 text-gray-400 mr-2" />
                  <label className="text-gray-400 text-sm font-medium">Full Name</label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={userProfile.name}
                    readOnly={!isEditing}
                    onChange={(e) => isEditing && handleEditChange(e)}
                    name="name"
                    className="w-full px-4 py-4 rounded-xl border text-white text-lg focus:outline-none focus:ring-2 transition-all duration-200"
                    style={{
                      backgroundColor: '#3a3a3a',
                      borderColor: '#4a4a4a',
                      focusRingColor: '#25D366'
                    }}
                  />

                </div>
              </div>

              {/* Email Address */}
              <div>
                <div className="flex items-center mb-3">
                  <Mail className="w-4 h-4 text-gray-400 mr-2" />
                  <label className="text-gray-400 text-sm font-medium">Email Address</label>
                </div>
                <input
                  type="email"
                  value={userProfile.email}
                  readOnly={!isEditing}
                  onChange={(e) => isEditing && handleEditChange(e)}
                  name="email"
                  className="w-full px-4 py-4 rounded-xl border text-white text-lg focus:outline-none focus:ring-2 transition-all duration-200"
                  style={{
                    backgroundColor: '#3a3a3a',
                    borderColor: '#4a4a4a'
                  }}
                />
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>

              <div className="space-y-4">
                {/* Member Since */}
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">Member Since</span>
                  </div>
                  <span className="text-white font-medium">{userProfile.joinedDate}</span>
                </div>

                {/* Account Status */}
                <div className="flex justify-between items-center py-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">Account Status</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#25D366' }}></div>
                    <span className="text-green-400 font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Picture Modal - Dark Theme */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: '#2a2a2a' }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Update Profile Picture</h2>
              <button
                onClick={() => {
                  setShowImageModal(false)
                  setPreviewImage(null)
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Current/Preview Image */}
              <div className="text-center mb-6">
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-teal-400 shadow-2xl">
                  {previewImage || userAuth.profile ? (
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
                      <User size={80} className="text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Section */}
              <div className="space-y-4">
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-teal-400 hover:bg-opacity-10 transition-colors"
                    style={{ borderColor: '#4a4a4a', backgroundColor: 'rgba(37, 211, 102, 0.05)' }}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </label>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={saveProfilePicture}
                    disabled={!previewImage || uploading}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-white transition-all duration-200"
                    style={{
                      backgroundColor: (!previewImage || uploading) ? '#4a4a4a' : '#25D366',
                      cursor: (!previewImage || uploading) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    <CheckCircle size={20} />
                    <span>{uploading ? 'Saving...' : 'Save Picture'}</span>
                  </button>

                  <button
                    disabled={!previewImage || uploading}
                    onClick={() => {
                      setShowImageModal(false)
                      setPreviewImage(null)
                    }}
                    className="flex-1 py-3 px-4 border border-gray-600 rounded-lg font-medium text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
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
