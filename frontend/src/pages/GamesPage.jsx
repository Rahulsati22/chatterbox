import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, RotateCcw, Trophy, Zap, Target } from 'lucide-react'

const GamesPage = () => {
  const canvasRef = useRef(null)
  const gameLoopRef = useRef(null)
  const keysRef = useRef({ left: false, right: false })
  
  // Game settings
  const CANVAS_WIDTH = 400
  const CANVAS_HEIGHT = 600
  const ROAD_WIDTH = 300
  const CAR_WIDTH = 40
  const CAR_HEIGHT = 80
  
  // Game state
  const [gameState, setGameState] = useState('menu') // menu, playing, paused, gameOver
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('carHighScore')) || 0)
  const [speed, setSpeed] = useState(3)
  const [lives, setLives] = useState(3)

  // Game objects
  const gameObjects = useRef({
    player: {
      x: CANVAS_WIDTH / 2 - CAR_WIDTH / 2,
      y: CANVAS_HEIGHT - 120,
      width: CAR_WIDTH,
      height: CAR_HEIGHT,
      speed: 5
    },
    enemies: [],
    roadLines: [],
    particles: []
  })

  // Initialize canvas and start game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    
    // Initialize road lines
    for (let i = 0; i < 15; i++) {
      gameObjects.current.roadLines.push({
        x: CANVAS_WIDTH / 2 - 2,
        y: i * 50,
        width: 4,
        height: 30
      })
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault()
          keysRef.current.left = true
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault()
          keysRef.current.right = true
          break
        case ' ':
          e.preventDefault()
          if (gameState === 'playing') togglePause()
          break
      }
    }

    const handleKeyUp = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keysRef.current.left = false
          break
        case 'ArrowRight':
        case 'd':
        case 'D':
          keysRef.current.right = false
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameState])

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Clear canvas
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw road
    const roadX = (CANVAS_WIDTH - ROAD_WIDTH) / 2
    ctx.fillStyle = '#2a2a2a'
    ctx.fillRect(roadX, 0, ROAD_WIDTH, CANVAS_HEIGHT)

    // Draw road edges
    ctx.fillStyle = '#FFD700'
    ctx.fillRect(roadX - 5, 0, 5, CANVAS_HEIGHT)
    ctx.fillRect(roadX + ROAD_WIDTH, 0, 5, CANVAS_HEIGHT)

    // Update and draw road lines
    gameObjects.current.roadLines.forEach(line => {
      line.y += speed * 2
      if (line.y > CANVAS_HEIGHT) {
        line.y = -line.height
      }
      
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(line.x, line.y, line.width, line.height)
    })

    // Update player
    const player = gameObjects.current.player
    if (keysRef.current.left && player.x > roadX + 10) {
      player.x -= player.speed
    }
    if (keysRef.current.right && player.x < roadX + ROAD_WIDTH - CAR_WIDTH - 10) {
      player.x += player.speed
    }

    // Spawn enemies
    if (Math.random() < 0.02) {
      const lanes = [roadX + 30, roadX + 90, roadX + 150, roadX + 210]
      const randomLane = lanes[Math.floor(Math.random() * lanes.length)]
      
      gameObjects.current.enemies.push({
        x: randomLane,
        y: -CAR_HEIGHT,
        width: CAR_WIDTH,
        height: CAR_HEIGHT,
        speed: speed + Math.random() * 2,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      })
    }

    // Update and draw enemies
    gameObjects.current.enemies = gameObjects.current.enemies.filter(enemy => {
      enemy.y += enemy.speed
      
      // Check collision
      if (enemy.x < player.x + player.width &&
          enemy.x + enemy.width > player.x &&
          enemy.y < player.y + player.height &&
          enemy.y + enemy.height > player.y) {
        
        // Create explosion particles
        for (let i = 0; i < 20; i++) {
          gameObjects.current.particles.push({
            x: player.x + player.width / 2,
            y: player.y + player.height / 2,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
            life: 30,
            color: `hsl(${Math.random() * 60}, 100%, 50%)`
          })
        }
        
        setLives(prev => {
          const newLives = prev - 1
          if (newLives <= 0) {
            setGameState('gameOver')
          }
          return newLives
        })
        
        return false // Remove enemy
      }

      // Draw enemy car
      ctx.fillStyle = enemy.color
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
      
      // Car details
      ctx.fillStyle = 'rgba(255,255,255,0.3)'
      ctx.fillRect(enemy.x + 5, enemy.y + 60, enemy.width - 10, 15)
      
      // Headlights
      ctx.fillStyle = '#FFFF00'
      ctx.fillRect(enemy.x + 5, enemy.y + 5, 8, 6)
      ctx.fillRect(enemy.x + enemy.width - 13, enemy.y + 5, 8, 6)

      return enemy.y < CANVAS_HEIGHT + 50
    })

    // Update and draw particles
    gameObjects.current.particles = gameObjects.current.particles.filter(particle => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life--
      
      ctx.fillStyle = particle.color
      ctx.globalAlpha = particle.life / 30
      ctx.fillRect(particle.x, particle.y, 3, 3)
      ctx.globalAlpha = 1
      
      return particle.life > 0
    })

    // Draw player car
    ctx.fillStyle = '#25D366'
    ctx.fillRect(player.x, player.y, player.width, player.height)
    
    // Player car details
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    ctx.fillRect(player.x + 5, player.y + 10, player.width - 10, 20)
    
    // Player headlights
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(player.x + 5, player.y + 5, 10, 8)
    ctx.fillRect(player.x + player.width - 15, player.y + 5, 10, 8)
    
    // Racing stripes
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(player.x + player.width / 2 - 2, player.y, 4, player.height)

    // Update score and speed
    setScore(prev => {
      const newScore = prev + 1
      if (newScore > highScore) {
        setHighScore(newScore)
        localStorage.setItem('carHighScore', newScore.toString())
      }
      return newScore
    })
    
    setSpeed(prev => Math.min(8, prev + 0.002))

    gameLoopRef.current = requestAnimationFrame(gameLoop)
  }, [gameState, speed, highScore])

  // Start/Stop game loop
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    } else {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState, gameLoop])

  // Game controls
  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setSpeed(3)
    setLives(3)
    gameObjects.current.enemies = []
    gameObjects.current.particles = []
    gameObjects.current.player.x = CANVAS_WIDTH / 2 - CAR_WIDTH / 2
  }

  const togglePause = () => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing')
  }

  const resetGame = () => {
    setGameState('menu')
    setScore(0)
    setSpeed(3)
    setLives(3)
  }

  // Touch controls
  const handleTouchStart = (direction) => {
    keysRef.current[direction] = true
  }

  const handleTouchEnd = () => {
    keysRef.current.left = false
    keysRef.current.right = false
  }

  return (
    <div 
      className="min-h-screen py-4 px-2 flex flex-col items-center justify-center"
      style={{ 
        backgroundColor: '#0a0a0a',
        backgroundImage: `
          radial-gradient(circle at 30% 30%, rgba(7, 94, 84, 0.4) 0%, transparent 60%), 
          radial-gradient(circle at 70% 70%, rgba(18, 140, 126, 0.4) 0%, transparent 60%),
          linear-gradient(45deg, transparent 48%, rgba(37, 211, 102, 0.1) 50%, transparent 52%)
        `,
        backgroundSize: '300px 300px, 300px 300px, 30px 30px'
      }}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          🏎️ <span style={{ color: '#25D366' }}>HIGHWAY RUSH</span>
        </h1>
        <p className="text-sm text-gray-400">
          Survive the highway chaos! 🔥
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-8 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{score}</div>
          <div className="text-xs text-gray-400">SCORE</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#25D366' }}>{highScore}</div>
          <div className="text-xs text-gray-400">BEST</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#FF4757' }}>
            {'❤️'.repeat(lives)}
          </div>
          <div className="text-xs text-gray-400">LIVES</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: '#FFD700' }}>
            {Math.round(speed * 30)}
          </div>
          <div className="text-xs text-gray-400">KMH</div>
        </div>
      </div>

      {/* Game Canvas */}
      <div className="relative mb-4">
        <canvas
          ref={canvasRef}
          className="border-4 rounded-xl shadow-2xl"
          style={{
            borderColor: '#25D366',
            boxShadow: '0 0 40px rgba(37, 211, 102, 0.5)',
            maxWidth: '90vw',
            height: 'auto'
          }}
        />

        {/* Menu Overlay */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-black bg-opacity-90 rounded-xl flex items-center justify-center">
            <div className="text-center text-white p-6">
              <div className="text-6xl mb-4">🏁</div>
              <h2 className="text-3xl font-bold mb-4">HIGHWAY RUSH</h2>
              <p className="text-lg mb-6 text-gray-300">
                Dodge traffic, survive as long as you can!
              </p>
              <button
                onClick={startGame}
                className="px-8 py-4 rounded-xl text-xl font-bold text-white transition-all duration-200 hover:scale-110 shadow-lg"
                style={{ 
                  backgroundColor: '#25D366',
                  boxShadow: '0 0 20px rgba(37, 211, 102, 0.5)'
                }}
              >
                🚀 START RACE
              </button>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-black bg-opacity-95 rounded-xl flex items-center justify-center">
            <div className="text-center text-white p-6">
              <div className="text-6xl mb-4">💥</div>
              <h2 className="text-3xl font-bold mb-2 text-red-400">CRASHED!</h2>
              <p className="text-xl mb-2">Final Score: <span className="text-yellow-400">{score}</span></p>
              {score === highScore && score > 0 && (
                <p className="text-lg mb-4 text-green-400 animate-pulse">
                  🎉 NEW HIGH SCORE! 🎉
                </p>
              )}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={startGame}
                  className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#25D366' }}
                >
                  🔄 RETRY
                </button>
                <button
                  onClick={resetGame}
                  className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
                  style={{ backgroundColor: '#FF4757' }}
                >
                  🏠 MENU
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pause Overlay */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-black bg-opacity-80 rounded-xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-5xl mb-4">⏸️</div>
              <h2 className="text-2xl font-bold mb-4">PAUSED</h2>
              <button
                onClick={togglePause}
                className="px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
                style={{ backgroundColor: '#25D366' }}
              >
                ▶️ RESUME
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Controls */}
      <div className="hidden md:flex gap-4 mb-4">
        <button
          onClick={startGame}
          disabled={gameState === 'playing'}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 disabled:opacity-50 shadow-lg"
          style={{ backgroundColor: '#25D366' }}
        >
          <Play size={20} />
          {gameState === 'menu' ? 'START RACE' : 'NEW RACE'}
        </button>

        <button
          onClick={togglePause}
          disabled={gameState === 'menu' || gameState === 'gameOver'}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 disabled:opacity-50"
          style={{ backgroundColor: '#128C7E' }}
        >
          {gameState === 'paused' ? <Play size={20} /> : <Pause size={20} />}
          {gameState === 'paused' ? 'RESUME' : 'PAUSE'}
        </button>

        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: '#FF4757' }}
        >
          <RotateCcw size={20} />
          MENU
        </button>
      </div>

      {/* Mobile Controls */}
      <div className="md:hidden w-full max-w-sm">
        <div className="flex gap-2 justify-center mb-4">
          <button
            onClick={startGame}
            disabled={gameState === 'playing'}
            className="px-4 py-2 rounded-lg font-bold text-white text-sm disabled:opacity-50"
            style={{ backgroundColor: '#25D366' }}
          >
            {gameState === 'menu' ? 'START' : 'NEW'}
          </button>
          <button
            onClick={togglePause}
            disabled={gameState === 'menu' || gameState === 'gameOver'}
            className="px-4 py-2 rounded-lg font-bold text-white text-sm disabled:opacity-50"
            style={{ backgroundColor: '#128C7E' }}
          >
            {gameState === 'paused' ? 'RESUME' : 'PAUSE'}
          </button>
          <button
            onClick={resetGame}
            className="px-4 py-2 rounded-lg font-bold text-white text-sm"
            style={{ backgroundColor: '#FF4757' }}
          >
            MENU
          </button>
        </div>

        <div className="flex gap-6 justify-center">
          <button
            onTouchStart={() => handleTouchStart('left')}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => handleTouchStart('left')}
            onMouseUp={handleTouchEnd}
            className="bg-gray-800 active:bg-green-600 text-white px-12 py-6 rounded-xl text-3xl font-bold transition-all duration-100 shadow-lg select-none"
            style={{ touchAction: 'manipulation' }}
          >
            ⬅️
          </button>
          
          <button
            onTouchStart={() => handleTouchStart('right')}
            onTouchEnd={handleTouchEnd}
            onMouseDown={() => handleTouchStart('right')}
            onMouseUp={handleTouchEnd}
            className="bg-gray-800 active:bg-green-600 text-white px-12 py-6 rounded-xl text-3xl font-bold transition-all duration-100 shadow-lg select-none"
            style={{ touchAction: 'manipulation' }}
          >
            ➡️
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-500 mt-4 max-w-md">
        <p className="mb-2">🎮 <strong>PC:</strong> A/D or ← → to steer, SPACE to pause</p>
        <p>📱 <strong>Mobile:</strong> Use steering buttons</p>
      </div>
    </div>
  )
}

export default GamesPage
