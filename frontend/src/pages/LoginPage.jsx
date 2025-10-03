import React, { useState } from 'react'
import { LogIn, Mail, Lock, Eye, EyeOff, MessageCircle, Check, AlertCircle } from 'lucide-react'
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
    const [rememberMe, setRememberMe] = useState(false)

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
        <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#ECE5DD' }}>
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23075E54' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '30px 30px'
            }} />

            <div className="max-w-md mx-auto relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <div
                        className="px-8 py-10 text-center"
                        style={{ background: 'linear-gradient(135deg, #075E54 0%, #128C7E 100%)' }}
                    >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#25D366' }}>
                            <MessageCircle className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-white/80">Sign in to your ChatterBox account</p>
                    </div>

                    {/* Login Form */}
                    <div className="px-8 py-8">
                        {/* General Error */}
                        {errors.general && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <span className="text-red-700 text-sm">{errors.general}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-lg ${errors.email
                                            ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                                            }`}
                                    />
                                    {formData.email && !errors.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                                        <Check className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                                    )}
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.email}</span>
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-lg ${errors.password
                                            ? 'border-red-300 focus:ring-red-500 bg-red-50'
                                            : 'border-gray-300 focus:ring-green-500 focus:border-transparent'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.password}</span>
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex items-center justify-center space-x-3 py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-200 shadow-lg ${isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'hover:shadow-xl transform hover:-translate-y-0.5'
                                    }`}
                                style={{
                                    backgroundColor: isLoading ? '#9CA3AF' : '#25D366'
                                }}
                                onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#1ea952')}
                                onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#25D366')}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader size="small" />
                                        <span>Signing In...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn size={22} />
                                        <span>Sign In</span>
                                    </>
                                )}
                            </button>
                        </form>


                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="font-semibold hover:underline transition-colors duration-200"
                                    style={{ color: '#25D366' }}
                                >
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                    <p>&copy; 2025 ChatterBox. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
