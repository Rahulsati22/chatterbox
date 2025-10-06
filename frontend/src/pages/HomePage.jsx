import React, { useState, useEffect } from 'react'
import {
  MessageCircle, Users, Shield, Zap, Globe,
  ArrowRight, Play, Star, Check, Quote,
  Smartphone, Monitor, Wifi, Lock
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'

const HomePage = () => {
  const { userAuth } = useUserStore()
  const [mounted, setMounted] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setMounted(true)

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Real-time Messaging",
      description: "Instant message delivery with read receipts and typing indicators"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "End-to-end encryption keeps your conversations safe and private"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Chats",
      description: "Create groups, share media, and stay connected with multiple friends"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Cross-Platform",
      description: "Use on any device - desktop, tablet, or mobile seamlessly"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      content: "ChatterBox has transformed how our team communicates. The real-time features are incredible!",
      avatar: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Developer",
      content: "Finally, a chat app that's both beautiful and functional. Love the clean interface!",
      avatar: "MC"
    },
    {
      name: "Emma Davis",
      role: "Designer",
      content: "The user experience is top-notch. Everything just works smoothly and intuitively.",
      avatar: "ED"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Advanced CSS Animations */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .gradient-bg {
          background: linear-gradient(135deg, #075E54, #128C7E, #25D366);
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out both;
        }
        
        .float {
          animation: float 3s ease-in-out infinite;
        }
        
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="lg:mt-10 relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-bg" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px), 
                     radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`${mounted ? 'fade-in-up' : 'opacity-0'}`}>
            {/* Main Logo/Icon */}
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center shadow-2xl float">
                <MessageCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
              Chat Without
              <span className="block bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text text-transparent">
                Boundaries
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white text-opacity-90 mb-6 max-w-3xl mx-auto leading-relaxed">
              Connect instantly with friends, family, and colleagues.
              Experience the future of messaging with ChatterBox.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              {!userAuth ? (
                <>
                  <Link
                    to="/signup"
                    className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 shadow-xl hover:scale-105"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/signin"
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                </>
              ) : (
                <Link
                  to="/users"
                  className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 shadow-xl hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Chatting</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm opacity-80">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50M+</div>
                <div className="text-sm opacity-80">Messages Sent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm opacity-80">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Communication
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for seamless, secure, and enjoyable conversations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`text-center p-6 rounded-2xl transition-all duration-300 cursor-pointer ${activeFeature === index
                    ? 'bg-green-600 text-white transform scale-105 shadow-2xl'
                    : 'bg-white text-gray-900 hover:shadow-xl hover:scale-102'
                  }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${activeFeature === index ? 'bg-white bg-opacity-20' : 'bg-green-100'
                  }`}>
                  <div className={activeFeature === index ? 'text-white' : 'text-green-600'}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`text-sm ${activeFeature === index ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to join the conversation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Create Account</h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up with your email in seconds. No complicated forms or verification delays.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Find Friends</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover and connect with friends, colleagues, or meet new people in our community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white font-bold flex items-center justify-center">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Start Chatting</h3>
              <p className="text-gray-600 leading-relaxed">
                Send messages, share photos, create groups, and enjoy seamless conversations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Users Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what people are saying about ChatterBox
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Quote className="w-10 h-10 text-green-600 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white font-bold flex items-center justify-center mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Communication?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-8">
            Join thousands of users who've already made the switch to ChatterBox
          </p>

          {!userAuth ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl hover:scale-105"
              >
                <span>Start Free Today</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/games"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Try Demo</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/users"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 inline-flex items-center space-x-2 shadow-xl hover:scale-105"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Continue Chatting</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold">ChatterBox</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The future of communication is here. Connect, share, and stay close to the people that matter most.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/games" className="hover:text-white transition-colors">Games</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ChatterBox. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
