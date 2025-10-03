import React, { useState } from 'react'
import { UserPlus, Upload, Eye, EyeOff, Mail, User, Lock, Camera, X, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { axios2 } from '../lib/axios'
import toast from 'react-hot-toast'
import { useUserStore } from '../stores/useUserStore'

const SignupPage = () => {
    const { signup, signuploading } = useUserStore()
    //setting all the values of the form initially as null
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profile: null
    })

    //checking if the user is filling form correctly or not
    const [errors, setErrors] = useState({})

    //for password and confirm password
    const [showPassword, setShowPassword] = useState(false)

    //for password and confirm password
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    //for image preview
    const [previewImage, setPreviewImage] = useState(null)

    //for drag and drop
    const [dragActive, setDragActive] = useState(false)

    //for loading
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    // Handle image upload
    const handleImageChange = (file) => {
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, profile: 'Please select a valid image file' })
                return
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, profile: 'Image size should be less than 5MB' })
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setFormValue({ ...formValue, profile: reader.result })
                setPreviewImage(reader.result)
                setErrors({ ...errors, profile: '' })
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle file input change
    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        handleImageChange(file)
    }

    // Handle drag and drop
    const handleDrop = (e) => {
        e.preventDefault()
        setDragActive(false)
        const file = e.dataTransfer.files[0]
        handleImageChange(file)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        setDragActive(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDragActive(false)
    }

    // Remove selected image
    const removeImage = () => {
        setPreviewImage(null)
        setFormValue({ ...formValue, profile: null })
        document.getElementById('profile-upload').value = ''
    }

    // Form validation
    const validateForm = () => {
        const newErrors = {}

        // Name validation
        if (!formValue.name || formValue.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long'
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formValue.email) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(formValue.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Password validation
        if (!formValue.password) {
            newErrors.password = 'Password is required'
        } else if (formValue.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long'
        }

        // Confirm password validation
        if (!formValue.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formValue.password !== formValue.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Form submission(make api changes here)
    const handleSubmission = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        await signup({ name: formValue.name, email: formValue.email, password: formValue.password, image: formValue.profile })
        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#ECE5DD' }}>
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div
                        className="p-6 text-center"
                        style={{ background: 'linear-gradient(to right, #075E54, #128C7E)' }}
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Create Account</h2>
                        <p className="text-white/80 mt-2">Join ChatterBox today</p>
                    </div>

                    {/* Form */}
                    <div className="p-6">
                        <form onSubmit={handleSubmission} className="space-y-6">
                            {/* Profile Picture Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Picture (Optional)
                                </label>

                                {!previewImage ? (
                                    <div
                                        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer ${dragActive
                                            ? 'border-green-400 bg-green-50'
                                            : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                                            }`}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onClick={() => document.getElementById('profile-upload').click()}
                                    >
                                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-sm text-gray-600 mb-2">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG up to 5MB
                                        </p>
                                        <input
                                            id="profile-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileInputChange}
                                            className="hidden"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={previewImage}
                                            alt="Profile preview"
                                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-green-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors duration-200"
                                        >
                                            <X size={16} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('profile-upload').click()}
                                            className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium"
                                        >
                                            Change Photo
                                        </button>
                                        <input
                                            id="profile-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileInputChange}
                                            className="hidden"
                                        />
                                    </div>
                                )}
                                {errors.profile && (
                                    <p className="mt-1 text-sm text-red-600">{errors.profile}</p>
                                )}
                            </div>

                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formValue.name || ''}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${errors.name
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                                            }`}
                                    />
                                    {formValue.name && !errors.name && (
                                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                                    )}
                                </div>
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formValue.email || ''}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${errors.email
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                                            }`}
                                    />
                                    {formValue.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue.email) && (
                                        <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                                    )}
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formValue.password || ''}
                                        onChange={handleChange}
                                        placeholder="Create a password"
                                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${errors.password
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                                <div className="mt-1 text-xs text-gray-500">
                                    Password must be at least 6 characters long
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formValue.confirmPassword || ''}
                                        onChange={handleChange}
                                        placeholder="Confirm your password"
                                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${errors.confirmPassword
                                            ? 'border-red-300 focus:ring-red-500'
                                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                    {formValue.confirmPassword && formValue.password === formValue.confirmPassword && (
                                        <Check className="absolute right-10 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                                    )}
                                </div>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 shadow-md ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'hover:shadow-lg'
                                    }`}
                                style={{
                                    backgroundColor: isSubmitting ? '#9CA3AF' : '#25D366'
                                }}
                                onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#1ea952')}
                                onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#25D366')}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <UserPlus size={20} />
                                        <span>Create Account</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link
                                    to="/signin"
                                    className="font-medium hover:underline transition-colors duration-200"
                                    style={{ color: '#25D366' }}
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
