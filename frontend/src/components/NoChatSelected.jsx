import React from 'react'
import { MessageCircle, Users, Lock } from 'lucide-react'

const NoChatSelected = () => {
  return (
    <div 
      className="flex-1 flex items-center justify-center px-4"
      style={{ backgroundColor: '#0B141A' }}
    >
      <div className="text-center max-w-sm">
        {/* Animated Illustration */}
        <div className="w-48 h-48 mx-auto mb-6 relative">
          {/* Animated Background Circle */}
          <div 
            className="absolute inset-0 rounded-full opacity-5 animate-pulse"
            style={{ 
              background: 'radial-gradient(circle, #25D366 0%, #128C7E 100%)',
              animation: 'breathe 4s ease-in-out infinite'
            }}
          />
          
          {/* Chat Illustration with Animations */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Left Bubble - Slide in from left */}
            <div 
              className="absolute left-8 top-12 w-16 h-10 rounded-lg rounded-bl-sm opacity-10"
              style={{ 
                backgroundColor: '#202C33',
                animation: 'slideInLeft 2s ease-out infinite alternate'
              }}
            />
            
            {/* Right Bubble - Slide in from right */}
            <div 
              className="absolute right-8 top-20 w-18 h-10 rounded-lg rounded-br-sm opacity-10"
              style={{ 
                backgroundColor: '#005C4B',
                animation: 'slideInRight 2s ease-out infinite alternate',
                animationDelay: '0.5s'
              }}
            />
            
            {/* Center Icon with Multiple Animations */}
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{ 
                backgroundColor: '#25D366',
                animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate'
              }}
            >
              {/* Rotating Background Effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: 'conic-gradient(from 0deg, #25D366, #128C7E, #075E54, #25D366)',
                  animation: 'rotate 8s linear infinite'
                }}
              />
              
              {/* Message Icon with Pulse */}
              <MessageCircle 
                size={40} 
                className="text-white relative z-10"
                style={{
                  animation: 'iconPulse 2s ease-in-out infinite'
                }}
              />
              
              {/* Ripple Effect */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-white opacity-20"
                style={{
                  animation: 'ripple 3s ease-out infinite'
                }}
              />
            </div>

            {/* Floating Particles */}
            <div 
              className="absolute top-8 right-12 w-2 h-2 rounded-full bg-green-400 opacity-60"
              style={{ animation: 'floatParticle 4s ease-in-out infinite' }}
            />
            <div 
              className="absolute bottom-8 left-12 w-1.5 h-1.5 rounded-full bg-green-300 opacity-50"
              style={{ animation: 'floatParticle 3s ease-in-out infinite', animationDelay: '1s' }}
            />
            <div 
              className="absolute top-16 left-4 w-1 h-1 rounded-full bg-green-500 opacity-40"
              style={{ animation: 'floatParticle 5s ease-in-out infinite', animationDelay: '2s' }}
            />
          </div>
        </div>

        {/* Animated Text */}
        <div className="space-y-3 mb-6">
          <h2 
            className="text-xl font-light text-white"
            style={{ animation: 'fadeInUp 1s ease-out' }}
          >
            ChatterBox Web
          </h2>
          <p 
            className="text-gray-400 text-sm leading-relaxed"
            style={{ animation: 'fadeInUp 1s ease-out', animationDelay: '0.2s' }}
          >
            Send and receive messages without keeping your phone online.
          </p>
          <p 
            className="text-gray-500 text-xs"
            style={{ animation: 'fadeInUp 1s ease-out', animationDelay: '0.4s' }}
          >
            Use ChatterBox on up to 4 linked devices and 1 phone at the same time.
          </p>
        </div>

        {/* Animated Features */}
        <div className="space-y-3 mb-6">
          <FeatureItem 
            icon={<Lock size={14} />}
            text="End-to-end encrypted"
            delay="0.6s"
          />
          <FeatureItem 
            icon={<Users size={14} />}
            text="Multi-device support"
            delay="0.8s"
          />
          <FeatureItem 
            icon={<MessageCircle size={14} />}
            text="Always in sync"
            delay="1s"
          />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div 
            className="flex items-center justify-center space-x-2 text-gray-500 text-xs mb-4"
            style={{ animation: 'fadeInUp 1s ease-out', animationDelay: '1.2s' }}
          >
            <div className="w-8 h-px bg-gray-600" />
            <span>Select a chat to start messaging</span>
            <div className="w-8 h-px bg-gray-600" />
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes glow {
            0% { box-shadow: 0 0 20px rgba(37, 211, 102, 0.3); }
            100% { box-shadow: 0 0 30px rgba(37, 211, 102, 0.6), 0 0 40px rgba(37, 211, 102, 0.3); }
          }

          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes iconPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          @keyframes ripple {
            0% { transform: scale(1); opacity: 0.3; }
            50% { opacity: 0.1; }
            100% { transform: scale(1.5); opacity: 0; }
          }

          @keyframes slideInLeft {
            0% { transform: translateX(-10px); opacity: 0.05; }
            100% { transform: translateX(0px); opacity: 0.1; }
          }

          @keyframes slideInRight {
            0% { transform: translateX(10px); opacity: 0.05; }
            100% { transform: translateX(0px); opacity: 0.1; }
          }

          @keyframes floatParticle {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-15px) translateX(5px); }
            50% { transform: translateY(-10px) translateX(-5px); }
            75% { transform: translateY(-20px) translateX(3px); }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  )
}

// Animated Feature Item Component
const FeatureItem = ({ icon, text, delay }) => (
  <div 
    className="flex items-center justify-center space-x-2 text-gray-400"
    style={{ 
      animation: 'fadeInUp 1s ease-out',
      animationDelay: delay,
      animationFillMode: 'both'
    }}
  >
    <div 
      className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
      style={{ backgroundColor: 'rgba(37, 211, 102, 0.1)' }}
    >
      <div style={{ color: '#25D366' }}>
        {icon}
      </div>
    </div>
    <span className="text-xs">{text}</span>
  </div>
)

export default NoChatSelected
