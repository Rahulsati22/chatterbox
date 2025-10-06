import React, { useState, useEffect } from 'react'
import { UserPlus, Upload, Eye, EyeOff, Mail, User, Lock, Camera, X, Check, Sparkles, Stars, Zap, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { axios2 } from '../lib/axios'
import toast from 'react-hot-toast'
import { useUserStore } from '../stores/useUserStore'

const SignupPage = () => {
    const { signup, signuploading } = useUserStore()
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profile: null
    })
    
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)
    const [dragActive, setDragActive] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [formProgress, setFormProgress] = useState(0)

    // Animation and progress tracking
    useEffect(() => {
        setMounted(true)
    }, [])

    // Calculate form progress
    useEffect(() => {
        const fields = [formValue.name, formValue.email, formValue.password, formValue.confirmPassword]
        const filledFields = fields.filter(field => field && field.trim()).length
        setFormProgress((filledFields / 4) * 100)
    }, [formValue])

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    // Handle image upload
    const handleImageChange = (file) => {
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, profile: 'Please select a valid image file' })
                return
            }

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

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        handleImageChange(file)
    }

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

    const removeImage = () => {
        setPreviewImage(null)
        setFormValue({ ...formValue, profile: null })
        document.getElementById('profile-upload').value = ''
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formValue.name || formValue.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long'
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formValue.email) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(formValue.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!formValue.password) {
            newErrors.password = 'Password is required'
        } else if (formValue.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long'
        }

        if (!formValue.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password'
        } else if (formValue.password !== formValue.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmission = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        await signup({
            name: formValue.name,
            email: formValue.email,
            password: formValue.password,
            image: formValue.profile
        })
        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Advanced CSS Animations */}
            <style>{`
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(2deg); }
                    66% { transform: translateY(-10px) rotate(-1deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
                
                @keyframes slideInUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(40px) scale(0.95); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) scale(1); 
                    }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                    40%, 43% { transform: translateY(-30px); }
                    70% { transform: translateY(-15px); }
                    90% { transform: translateY(-4px); }
                }
                
                @keyframes rotateHue {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
                
                .gradient-bg {
                    background: linear-gradient(45deg, #075E54, #128C7E, #25D366, #34C759, #40E0D0);
                    background-size: 500% 500%;
                    animation: gradientShift 10s ease infinite;
                }
                
                .floating-element {
                    animation: float 6s ease-in-out infinite;
                }
                
                .pulse-element {
                    animation: pulse 2.5s ease-in-out infinite;
                }
                
                .slide-up {
                    animation: slideInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
                }
                
                .shimmer-effect {
                    position: relative;
                    overflow: hidden;
                }
                
                .shimmer-effect::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    animation: shimmer 2.5s infinite;
                }
                
                .bounce-element {
                    animation: bounce 2s infinite;
                }
                
                .progress-bar {
                    width: ${formProgress}%;
                    transition: width 0.5s ease;
                    animation: rotateHue 3s linear infinite;
                }
                
                .field-glow:focus-within {
                    box-shadow: 0 0 20px rgba(37, 211, 102, 0.4);
                }
            `}</style>

            {/* Animated Background - Static now */}
            <div className="gradient-bg fixed inset-0" />

            {/* Floating Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full floating-element"
                    style={{ animationDelay: '0s' }} />
                <div className="absolute top-1/4 right-10 w-16 h-16 bg-green-300 bg-opacity-20 rounded-full floating-element"
                    style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-1/4 left-16 w-24 h-24 bg-teal-300 bg-opacity-15 rounded-full floating-element"
                    style={{ animationDelay: '4s' }} />

                {/* Floating Icons */}
                <div className="absolute top-20 right-1/4 opacity-20">
                    <Stars className="w-12 h-12 text-white floating-element bounce-element" style={{ animationDelay: '1s' }} />
                </div>
                <div className="absolute bottom-32 right-20 opacity-20">
                    <Heart className="w-10 h-10 text-pink-300 floating-element" style={{ animationDelay: '3s' }} />
                </div>
                <div className="absolute top-1/2 left-8 opacity-20">
                    <Zap className="w-8 h-8 text-yellow-300 floating-element bounce-element" style={{ animationDelay: '5s' }} />
                </div>

                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle at 20% 20%, #25D366 1px, transparent 1px), 
                                      radial-gradient(circle at 80% 80%, #128C7E 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                    backgroundPosition: '0 0, 30px 30px'
                }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen py-8 px-4 flex items-center justify-center">
                <div className={`max-w-md mx-auto w-full ${mounted ? 'slide-up' : 'opacity-0'}`}>
                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="bg-white bg-opacity-20 rounded-full h-2 backdrop-blur-sm">
                            <div className="progress-bar bg-gradient-to-r from-green-400 via-teal-400 to-green-500 h-2 rounded-full shadow-lg" />
                        </div>
                        <p className="text-white text-sm mt-2 text-center font-medium">
                            Profile Setup: {Math.round(formProgress)}% Complete
                        </p>
                    </div>

                    {/* Animated Card */}
                    <div className="relative">
                        {/* Glowing Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-400 to-green-500 rounded-3xl blur-xl opacity-40 pulse-element" />

                        {/* Main Card */}
                        <div className="relative bg-white bg-opacity-95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white border-opacity-20 overflow-hidden">
                            {/* Enhanced Header */}
                            <div className="relative px-8 py-10 text-center overflow-hidden">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-teal-500 to-green-700"
                                    style={{ animation: 'gradientShift 8s ease infinite' }} />

                                {/* Floating Sparkles */}
                                <div className="absolute top-4 left-4 opacity-30">
                                    <Sparkles className="w-6 h-6 text-white floating-element" style={{ animationDelay: '1s' }} />
                                </div>
                                <div className="absolute top-4 right-4 opacity-30">
                                    <Stars className="w-6 h-6 text-white floating-element" style={{ animationDelay: '3s' }} />
                                </div>
                                <div className="absolute bottom-4 left-8 opacity-30">
                                    <Heart className="w-5 h-5 text-pink-200 floating-element" style={{ animationDelay: '2s' }} />
                                </div>

                                {/* Main Icon */}
                                <div className="relative">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl pulse-element shimmer-effect"
                                        style={{
                                            background: 'linear-gradient(135deg, #25D366 0%, #34C759 50%, #40E0D0 100%)',
                                            boxShadow: '0 20px 40px rgba(37, 211, 102, 0.4)'
                                        }}>
                                        <UserPlus className="w-10 h-10 text-white drop-shadow-lg" />
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">Join ChatterBox</h1>
                                <p className="text-white text-opacity-90 text-lg">Create your account and start chatting!</p>
                            </div>

                            {/* Enhanced Form */}
                            <div className="px-8 py-8">
                                <form onSubmit={handleSubmission} className="space-y-6">
                                    {/* Enhanced Profile Picture Upload */}
                                    <div className="slide-up" style={{ animationDelay: '0.1s' }}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Profile Picture (Optional) ✨
                                        </label>

                                        {!previewImage ? (
                                            <div
                                                className={`relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer field-glow ${
                                                    dragActive
                                                        ? 'border-green-400 bg-green-50 bg-opacity-80 scale-105'
                                                        : 'border-gray-300 hover:border-green-400 hover:bg-green-50 hover:bg-opacity-50 hover:scale-102'
                                                }`}
                                                onDrop={handleDrop}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onClick={() => document.getElementById('profile-upload').click()}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                                                <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4 group-hover:text-green-500 transition-all duration-300 group-hover:scale-110" />
                                                <p className="text-base text-gray-600 mb-2 font-medium">
                                                    Click to upload or drag and drop
                                                </p>
                                                <p className="text-sm text-gray-500">
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
                                            <div className="text-center">
                                                <div className="relative inline-block">
                                                    <img
                                                        src={previewImage}
                                                        alt="Profile preview"
                                                        className="w-32 h-32 rounded-full object-cover border-4 border-green-300 shadow-xl"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 shadow-lg hover:scale-110"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => document.getElementById('profile-upload').click()}
                                                    className="mt-4 text-sm text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 hover:underline"
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
                                            <p className="mt-2 text-sm text-red-600 animate-bounce">{errors.profile}</p>
                                        )}
                                    </div>

                                    {/* Enhanced Name Field */}
                                    <div className="slide-up" style={{ animationDelay: '0.2s' }}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Full Name 👤
                                        </label>
                                        <div className="relative group field-glow">
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-0 group-focus-within:opacity-20 transition-all duration-300 blur-sm" />
                                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formValue.name || ''}
                                                onChange={handleChange}
                                                placeholder="Enter your full name"
                                                className={`relative w-full pl-12 pr-12 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                                                    errors.name
                                                        ? 'border-red-300 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-blue-500 focus:border-transparent focus:shadow-xl'
                                                }`}
                                            />
                                            {formValue.name && !errors.name && (
                                                <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 animate-bounce" />
                                            )}
                                        </div>
                                        {errors.name && (
                                            <p className="mt-2 text-sm text-red-600 animate-bounce">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Enhanced Email Field */}
                                    <div className="slide-up" style={{ animationDelay: '0.3s' }}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Email Address 📧
                                        </label>
                                        <div className="relative group field-glow">
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl opacity-0 group-focus-within:opacity-20 transition-all duration-300 blur-sm" />
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formValue.email || ''}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                className={`relative w-full pl-12 pr-12 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                                                    errors.email
                                                        ? 'border-red-300 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-green-500 focus:border-transparent focus:shadow-xl'
                                                }`}
                                            />
                                            {formValue.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValue.email) && (
                                                <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 animate-bounce" />
                                            )}
                                        </div>
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600 animate-bounce">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Enhanced Password Field */}
                                    <div className="slide-up" style={{ animationDelay: '0.4s' }}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Password 🔒
                                        </label>
                                        <div className="relative group field-glow">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl opacity-0 group-focus-within:opacity-20 transition-all duration-300 blur-sm" />
                                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-200" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formValue.password || ''}
                                                onChange={handleChange}
                                                placeholder="Create a strong password"
                                                className={`relative w-full pl-12 pr-16 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                                                    errors.password
                                                        ? 'border-red-300 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-purple-500 focus:border-transparent focus:shadow-xl'
                                                }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-2 text-sm text-red-600 animate-bounce">{errors.password}</p>
                                        )}
                                        <div className="mt-2 text-xs text-gray-600 bg-blue-50 p-2 rounded-lg">
                                            💡 Password must be at least 6 characters long
                                        </div>
                                    </div>

                                    {/* Enhanced Confirm Password Field */}
                                    <div className="slide-up" style={{ animationDelay: '0.5s' }}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Confirm Password 🔐
                                        </label>
                                        <div className="relative group field-glow">
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl opacity-0 group-focus-within:opacity-20 transition-all duration-300 blur-sm" />
                                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={formValue.confirmPassword || ''}
                                                onChange={handleChange}
                                                placeholder="Confirm your password"
                                                className={`relative w-full pl-12 pr-16 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-lg bg-white bg-opacity-80 backdrop-blur-sm ${
                                                    errors.confirmPassword
                                                        ? 'border-red-300 focus:ring-red-500'
                                                        : 'border-gray-300 focus:ring-orange-500 focus:border-transparent focus:shadow-xl'
                                                }`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                                            >
                                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                            {formValue.confirmPassword && formValue.password === formValue.confirmPassword && (
                                                <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 animate-bounce" />
                                            )}
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="mt-2 text-sm text-red-600 animate-bounce">{errors.confirmPassword}</p>
                                        )}
                                    </div>

                                    {/* Super Enhanced Submit Button */}
                                    <div className="slide-up" style={{ animationDelay: '0.6s' }}>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-transform duration-200 ${
                                                isSubmitting
                                                    ? 'cursor-not-allowed opacity-70'
                                                    : 'hover:scale-105'
                                            }`}
                                            style={{
                                                backgroundColor: isSubmitting ? '#9CA3AF' : '#25D366'
                                            }}
                                            onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#1ea952')}
                                            onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#25D366')}
                                        >
                                            <div className="flex items-center justify-center space-x-3">
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        <span>Creating Account...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus size={22} />
                                                        <span>Create Account</span>
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>

                                </form>

                                {/* Enhanced Sign In Link */}
                                <div className="mt-8 text-center slide-up" style={{ animationDelay: '0.7s' }}>
                                    <p className="text-gray-600">
                                        Already have an account?{' '}
                                        <Link
                                            to="/signin"
                                            className="font-semibold hover:underline transition-all duration-300 hover:scale-105 inline-block shimmer-effect"
                                            style={{ color: '#25D366' }}
                                        >
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
