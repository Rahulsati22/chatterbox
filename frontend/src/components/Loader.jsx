import React from 'react'

const Loader = ({ size = 'large', text = '', fullScreen = false }) => {
  // Size configurations
  const sizes = {
    small: { spinner: 'w-12 h-12', text: 'text-base', border: 'border-4' },
    medium: { spinner: 'w-20 h-20', text: 'text-lg', border: 'border-6' },
    large: { spinner: 'w-32 h-32', text: 'text-xl', border: 'border-8' },
    xlarge: { spinner: 'w-40 h-40', text: 'text-2xl', border: 'border-10' }
  }

  const currentSize = sizes[size]

  const LoaderSpinner = () => (
    <div className={`${currentSize.spinner} relative`}>
      <div 
        className={`${currentSize.spinner} rounded-full ${currentSize.border} animate-spin`}
        style={{
          borderColor: '#DCF8C6',
          borderTopColor: '#25D366',
          animationDuration: '1s'
        }}
      />
    </div>
  )

  // Perfect centering - inline styles use karte hain for guaranteed centering
  const containerStyle = {
    position: fullScreen ? 'fixed' : 'relative',
    top: fullScreen ? 0 : 'auto',
    left: fullScreen ? 0 : 'auto',
    right: fullScreen ? 0 : 'auto',
    bottom: fullScreen ? 0 : 'auto',
    width: '100%',
    height: fullScreen ? '100vh' : '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: fullScreen ? 9999 : 'auto',
    minHeight: fullScreen ? '100vh' : '400px',
    ...( fullScreen && {
      backgroundColor: 'rgba(7, 94, 84, 0.95)',
      backdropFilter: 'blur(8px)'
    })
  }

  return (
    <div style={containerStyle}>
      <LoaderSpinner />
      {text && (
        <p 
          style={{ 
            marginTop: '24px',
            fontWeight: '600',
            textAlign: 'center',
            maxWidth: '300px',
            color: fullScreen ? 'white' : '#075E54',
            fontSize: size === 'small' ? '16px' : size === 'medium' ? '18px' : size === 'large' ? '20px' : '24px'
          }}
        >
          {text}
        </p>
      )}
    </div>
  )
}

export default Loader
