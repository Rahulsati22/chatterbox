import React, { useState, useEffect } from 'react'
import { Menu, X, User, Users, LogOut, LogIn, UserPlus, Settings, ChevronDown, Gamepad } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'

const Navbar = () => {
    const { userAuth, logout } = useUserStore()
    //this usestate variable is for the menu
    const [isOpen, setIsOpen] = useState(false)
    // Profile dropdown state
    const [profileDropdown, setProfileDropdown] = useState(false)
    //to set the current user
    const [user, setUser] = useState(null)

    //this function is for toggling the menu in mobile view
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    // Toggle profile dropdown
    const toggleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown)
    }

    useEffect(() => {
        //agr bhar click kiya menu khulne ke baad mobile mein menu ko close krna hoga
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.navbar-container')) {
                setIsOpen(false)
            }
            // Close profile dropdown when clicking outside
            if (profileDropdown && !event.target.closest('.profile-dropdown')) {
                setProfileDropdown(false)
            }
        }

        //agr mouse down kara to tab bhi band hojaega
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen, profileDropdown])

    useEffect(() => {
        //jaise hi width badi hojati hai 768 se bnd krdo menu ko
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false)
                setProfileDropdown(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    //signout krdiya agr to user log in and set is open sb false hojaega
    const handleSignOut = async () => {
        // writing signout logic
        setProfileDropdown(false)
        await logout()
    }

    //agr profile pic pe click krenge to open hojaegi
    const handleProfileClick = () => {
        setIsOpen(false)
        setProfileDropdown(false)
    }

    //agar settings pe click kra to menu bnd hojaega
    const handleSettingsClick = () => {
        setIsOpen(false)
    }

    //agr kahi bhi click kra to menu bnd hojaega
    const handleAllUsersClick = () => {
        setIsOpen(false)
    }

    return (
        <nav
            className="navbar-container fixed top-0 left-0 right-0 z-[9999]" // Added fixed positioning and highest z-index
            style={{
                background: 'linear-gradient(to right, #075E54, #128C7E)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                borderBottom: '1px solid rgba(18, 140, 126, 0.3)'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-white hover:text-green-200 transition-colors duration-200">
                            ChatterBox
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            <Link
                                to="/"
                                className="flex items-center space-x-2 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-200"
                            >
                                <Users size={18} />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/users"
                                className="flex items-center space-x-2 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-200"
                            >
                                <Users size={18} />
                                <span>All Users</span>
                            </Link>

                            {/* Settings Link - Available for all users */}
                            <Link
                                to="/games"
                                className="flex items-center space-x-2 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-200"
                            >
                                <Gamepad size={18} />
                                <span>Games</span>
                            </Link>

                            {userAuth ? (
                                <div className="flex items-center space-x-4">
                                    {/* Enhanced Profile Section with Dropdown */}
                                    <div className="relative profile-dropdown">
                                        <button
                                            onClick={toggleProfileDropdown}
                                            className="flex items-center space-x-3 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-20 px-3 py-2 rounded-lg transition-all duration-200 border border-transparent hover:border-green-300"
                                        >
                                            {/* Profile Picture - Enhanced for navbar */}
                                            <div className="relative">
                                                {userAuth?.profile ? (
                                                    <div className="w-10 h-10 rounded-full border-2 border-green-300 shadow-md overflow-hidden">
                                                        <img
                                                            src={userAuth.profile}
                                                            alt="Profile"
                                                            className="w-full h-full object-cover"
                                                            style={{
                                                                objectPosition: 'center center'
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-green-300 shadow-md">
                                                        <User size={20} className="text-white" />
                                                    </div>
                                                )}
                                                {/* Online Status Indicator */}
                                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                                            </div>

                                            {/* User Name */}
                                            <div className="flex flex-col items-start">
                                                <span className="font-medium text-sm leading-none">
                                                    {userAuth?.name || 'User'}
                                                </span>
                                                <span className="text-xs text-green-200 leading-none mt-0.5">
                                                    Online
                                                </span>
                                            </div>

                                            {/* Dropdown Arrow */}
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform duration-200 ${profileDropdown ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Profile Dropdown Menu - Enhanced with Higher z-index */}
                                        {profileDropdown && (
                                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-[10000] overflow-hidden"> {/* Increased z-index */}
                                                {/* User Info Header with Big Image */}
                                                <div className="px-6 py-6 text-center" style={{
                                                    background: 'linear-gradient(135deg, #DCF8C6 0%, #B8E6B8 100%)'
                                                }}>
                                                    <div className="flex flex-col items-center space-y-4">
                                                        {/* Big Profile Picture - Enhanced */}
                                                        <div className="relative">
                                                            {userAuth?.profile ? (
                                                                <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden">
                                                                    <img
                                                                        src={userAuth.profile}
                                                                        alt="Profile"
                                                                        className="w-full h-full object-cover"
                                                                        style={{
                                                                            objectPosition: 'center center'
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
                                                                    <User size={42} className="text-white" />
                                                                </div>
                                                            )}
                                                            {/* Bigger Online Status */}
                                                            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-400 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                                                                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                                                            </div>
                                                        </div>

                                                        {/* User Details */}
                                                        <div className="text-center">
                                                            <h3 className="font-bold text-xl text-gray-800 mb-1">
                                                                {userAuth?.name || 'User Name'}
                                                            </h3>
                                                            <p className="text-gray-600 text-sm mb-2">
                                                                {userAuth?.email || 'user@example.com'}
                                                            </p>
                                                            <div className="flex items-center justify-center space-x-2">
                                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                                <span className="text-green-600 text-sm font-medium">Active Now</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Dropdown Items with Better Styling */}
                                                <div className="py-3">
                                                    <Link
                                                        to="/profile"
                                                        onClick={handleProfileClick}
                                                        className="flex items-center space-x-4 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                                                    >
                                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                                            <User size={20} className="text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">View Profile</span>
                                                            <p className="text-sm text-gray-500">See your profile details</p>
                                                        </div>
                                                    </Link>

                                                    <Link
                                                        to="/games"
                                                        onClick={() => setProfileDropdown(false)}
                                                        className="flex items-center space-x-4 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-all duration-200 group"
                                                    >
                                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                                            <Settings size={20} className="text-gray-600" />
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Games</span>
                                                            <p className="text-sm text-gray-500">Play Games</p>
                                                        </div>
                                                    </Link>

                                                    <hr className="my-2 mx-4" />

                                                    <button
                                                        onClick={handleSignOut}
                                                        className="flex items-center space-x-4 px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left group"
                                                    >
                                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                                            <LogOut size={20} className="text-red-600" />
                                                        </div>
                                                        <div>
                                                            <span className="font-medium">Sign Out</span>
                                                            <p className="text-sm text-red-400">Logout from your account</p>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    {/* Sign In */}
                                    <Link
                                        to="/signin"
                                        className="flex items-center space-x-2 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-20 px-4 py-2 rounded-lg transition-all duration-200"
                                    >
                                        <LogIn size={18} />
                                        <span>Sign In</span>
                                    </Link>

                                    {/* Sign Up */}
                                    <Link
                                        to="/signup"
                                        className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md"
                                        style={{ backgroundColor: '#25D366' }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#1ea952'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#25D366'}
                                    >
                                        <UserPlus size={18} />
                                        <span>Sign Up</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button - Enhanced z-index */}
                    <div className="md:hidden relative z-[10001]"> {/* Higher z-index for button */}
                        <button
                            onClick={toggleMenu}
                            className="text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-20 p-2 rounded-lg transition-all duration-200 relative z-[10001]"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu - Enhanced with proper z-index */}
            <div
                className={`md:hidden absolute left-0 right-0 top-16 transition-all duration-300 ease-in-out z-[9998] ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden border-t border-white border-opacity-20`}
                style={{ backgroundColor: '#128C7E' }}
            >
                <div className="px-4 pt-2 pb-4 space-y-2">
                    {/* Mobile Profile Section - Enhanced with Bigger Image */}
                    {userAuth && (
                        <div className="bg-black bg-opacity-20 rounded-xl p-4 mb-4">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    {userAuth?.profile ? (
                                        <div className="relative w-16 h-16 rounded-full border-3 border-green-300 shadow-lg overflow-hidden">
                                            <img
                                                src={userAuth.profile}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                                style={{
                                                    objectPosition: 'center center'
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center border-3 border-green-300 shadow-lg">
                                            <User size={28} className="text-white" />
                                        </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-3 border-white rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-white text-lg leading-tight">{userAuth?.name || 'User Name'}</p>
                                    <p className="text-green-200 text-sm leading-tight mt-1">{userAuth?.email || 'user@example.com'}</p>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <p className="text-green-300 text-xs font-medium">Active Now</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    <Link
                        onClick={handleAllUsersClick}
                        to="/"
                        className="flex items-center space-x-3 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-30 px-3 py-3 rounded-lg transition-all duration-200 w-full"
                    >
                        <Users size={20} />
                        <span>Home</span>
                    </Link>

                    {/* All Users Link */}
                    <Link
                        to="/users"
                        onClick={handleAllUsersClick}
                        className="flex items-center space-x-3 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-30 px-3 py-3 rounded-lg transition-all duration-200 w-full"
                    >
                        <Users size={20} />
                        <span>All Users</span>
                    </Link>

                    {/* Settings Link - Mobile */}
                    <Link
                        to="/games"
                        onClick={handleSettingsClick}
                        className="flex items-center space-x-3 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-30 px-3 py-3 rounded-lg transition-all duration-200 w-full"
                    >
                        <Gamepad size={20} />
                        <span>Games</span>
                    </Link>

                    {userAuth ? (
                        <>
                            {/* Profile */}
                            <Link
                                to="/profile"
                                onClick={handleProfileClick}
                                className="flex items-center space-x-3 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-30 px-3 py-3 rounded-lg transition-all duration-200 w-full"
                            >
                                <User size={20} />
                                <span>View Profile</span>
                            </Link>

                            {/* Sign Out */}
                            <button
                                onClick={handleSignOut}
                                className="flex items-center space-x-3 text-white px-3 py-3 rounded-lg transition-all duration-200 w-full font-medium shadow-md"
                                style={{ backgroundColor: '#25D366' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#1ea952'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#25D366'}
                            >
                                <LogOut size={20} />
                                <span>Sign Out</span>
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Sign In */}
                            <Link
                                to="/signin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 text-gray-100 hover:text-white hover:bg-black hover:bg-opacity-30 px-3 py-3 rounded-lg transition-all duration-200 w-full"
                            >
                                <LogIn size={20} />
                                <span>Sign In</span>
                            </Link>

                            {/* Sign Up */}
                            <Link
                                to="/signup"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 text-white px-3 py-3 rounded-lg transition-all duration-200 w-full font-medium shadow-md"
                                style={{ backgroundColor: '#25D366' }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#1ea952'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#25D366'}
                            >
                                <UserPlus size={20} />
                                <span>Sign Up</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
