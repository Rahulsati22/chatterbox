import React, { useState, useEffect } from 'react'
import { LogIn, Mail, Lock, Eye, EyeOff, MessageCircle, Check, AlertCircle, Sparkles, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useUserStore } from '../stores/useUserStore'

const SignIn = () => {
    const { login } = useUserStore()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Animation effects
    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' })
        }
    }

    // Validate form
    const validateForm = () => {
        const newErrors = {}

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        await login({ email: formData.email, password: formData.password })
        setIsLoading(false)
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
                
                @keyframes bubble {
                    0% { transform: translateY(100vh) scale(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100px) scale(1); opacity: 0; }
                }
                
                .gradient-bg {
                    background: linear-gradient(45deg, #075E54, #128C7E, #25D366, #34C759);
                    background-size: 400% 400%;
                    animation: gradientShift 8s ease infinite;
                }
                
                .floating-element {
                    animation: float 6s ease-in-out infinite;
                }
                
                .pulse-element {
                    animation: pulse 2s ease-in-out infinite;
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
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: shimmer 2s infinite;
                }
                
                .bubble {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(37, 211, 102, 0.1);
                    animation: bubble 15s infinite linear;
                    pointer-events: none;
                }
            `}</style>

            {/* Animated Background - Static now */}
            <div className="gradient-bg fixed inset-0" />

            {/* Floating Geometric Shapes */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Floating Circles */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-5 rounded-full floating-element"
                    style={{ animationDelay: '0s' }} />
                <div className="absolute top-40 right-20 w-24 h-24 bg-green-400 bg-opacity-10 rounded-full floating-element"
                    style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-32 left-20 w-40 h-40 bg-teal-300 bg-opacity-5 rounded-full floating-element"
                    style={{ animationDelay: '4s' }} />

                {/* Animated Bubbles */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="bubble"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 40 + 20}px`,
                            height: `${Math.random() * 40 + 20}px`,
                            animationDelay: `${Math.random() * 15}s`,
                            animationDuration: `${15 + Math.random() * 10}s`
                        }}
                    />
                ))}

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #25D366 1px, transparent 1px), 
                                      radial-gradient(circle at 75% 75%, #128C7E 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    backgroundPosition: '0 0, 25px 25px'
                }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen py-8 px-4 flex items-center justify-center">
                <div className={`max-w-md mx-auto w-full ${mounted ? 'slide-up' : 'opacity-0'}`}>
                    {/* Animated Card */}
                    <div className="relative">
                        {/* Glowing Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-400 to-green-500 rounded-3xl blur-xl opacity-30 pulse-element" />

                        {/* Main Card */}
                        <div className="relative bg-white bg-opacity-95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white border-opacity-20 overflow-hidden">
                            {/* Header with Enhanced Animation */}
                            <div className="relative px-8 py-10 text-center overflow-hidden">
                                {/* Animated Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-teal-500 to-green-700"
                                    style={{ animation: 'gradientShift 6s ease infinite' }} />

                                {/* Floating Icons */}
                                <div className="absolute top-4 left-4 opacity-20">
                                    <Users className="w-8 h-8 text-white floating-element" style={{ animationDelay: '1s' }} />
                                </div>
                                <div className="absolute top-4 right-4 opacity-20">
                                    <Zap className="w-8 h-8 text-white floating-element" style={{ animationDelay: '3s' }} />
                                </div>
                                <div className="absolute bottom-4 left-8 opacity-20">
                                    <Sparkles className="w-6 h-6 text-white floating-element" style={{ animationDelay: '2s' }} />
                                </div>

                                {/* Main Icon with Enhanced Animation */}
                                <div className="relative">
                                    <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-2xl pulse-element shimmer-effect"
                                        style={{
                                            background: 'linear-gradient(135deg, #25D366 0%, #34C759 100%)',
                                            boxShadow: '0 20px 40px rgba(37, 211, 102, 0.3)'
                                        }}>
                                        <MessageCircle className="w-12 h-12 text-white drop-shadow-lg" />
                                    </div>
                                </div>

                                <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Welcome Back</h1>
                                <p className="text-white text-opacity-90 text-lg">Sign in to your ChatterBox account</p>
                            </div>

                            {/* Enhanced Form */}
                            <div className="px-8 py-8">
                                {/* General Error with Animation */}
                                {errors.general && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 slide-up">
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                        <span className="text-red-700 text-sm">{errors.general}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Enhanced Email Field */}
                                    <div className="slide-up" style={{ animationDelay: '0.1s' }}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Email Address
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl opacity-0 group-focus-within:opacity-20 transition-all duration-300 blur-sm" />
                                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                className={`relative w-full pl-12 pr-12 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-lg bg-white bg-opacity-80 backdrop-blur-sm ${errors.email
                                                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                                    : 'border-gray-300 focus:ring-green-500 focus:border-transparent focus:shadow-lg'
                                                    }`}
                                            />
                                            {formData.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                                                <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 animate-bounce" />
                                            )}
                                        </div>
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600 flex items-center space-x-1 animate-bounce">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors.email}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Enhanced Password Field */}
                                    <div className="slide-up" style={{ animationDelay: '0.2s' }}>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            Password
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-xl opacity-0 group-focus-within:opacity-20 transition-all duration-300 blur-sm" />
                                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                className={`relative w-full pl-12 pr-12 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 text-lg bg-white bg-opacity-80 backdrop-blur-sm ${errors.password
                                                    ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                                    : 'border-gray-300 focus:ring-green-500 focus:border-transparent focus:shadow-lg'
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
                                            <p className="mt-2 text-sm text-red-600 flex items-center space-x-1 animate-bounce">
                                                <AlertCircle className="w-4 h-4" />
                                                <span>{errors.password}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Super Enhanced Submit Button */}
                                    <div className="slide-up" style={{ animationDelay: '0.3s' }}>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-transform duration-200 ${isLoading
                                                ? 'cursor-not-allowed opacity-70'
                                                : 'hover:scale-105'
                                                }`}
                                            style={{
                                                backgroundColor: isLoading ? '#9CA3AF' : '#25D366'
                                            }}
                                            onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#1ea952')}
                                            onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#25D366')}
                                        >
                                            <div className="flex items-center justify-center space-x-3">
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                        <span>Signing In...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <LogIn size={22} />
                                                        <span>Sign In</span>
                                                    </>
                                                )}
                                            </div>
                                        </button>
                                    </div>

                                </form>

                                {/* Enhanced Sign Up Link */}
                                <div className="mt-8 text-center slide-up" style={{ animationDelay: '0.4s' }}>
                                    <p className="text-gray-600">
                                        Don't have an account?{' '}
                                        <Link
                                            to="/signup"
                                            className="font-semibold hover:underline transition-all duration-300 hover:scale-105 inline-block shimmer-effect"
                                            style={{ color: '#25D366' }}
                                        >
                                            Sign up for free
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Footer */}
                    <div className="text-center mt-8 text-white text-opacity-80 text-sm slide-up"
                        style={{ animationDelay: '0.5s' }}>
                        <p>&copy; 2025 ChatterBox. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
