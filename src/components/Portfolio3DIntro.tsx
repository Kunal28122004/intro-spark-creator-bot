import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RealisticCharacter from './RealisticCharacter'
import Airplane from './Airplane'
import Clouds from './Clouds'
import { Button } from '@/components/ui/button'

const Portfolio3DIntro = () => {
  const navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationType, setAnimationType] = useState<'phone' | 'plane' | null>(null)
  const [showClouds, setShowClouds] = useState(false)

  const handleNavigation = (path: string) => {
    console.log(`${path} clicked`)
    setIsAnimating(true)
    setAnimationType('phone')
    
    // Longer phone call animation
    setTimeout(() => {
      setAnimationType('plane')
      setShowClouds(true)
    }, 4000)
    
    // Navigate after dramatic plane animation with clouds
    setTimeout(() => {
      navigate(path)
    }, 10000)
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <Canvas 
        camera={{ position: [0, 2, 8], fov: 60 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting with more dramatic effects */}
          <ambientLight intensity={2} />
          <directionalLight 
            position={[15, 15, 15]} 
            intensity={3} 
            castShadow 
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
            shadow-camera-far={100}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <pointLight position={[-8, 8, 8]} color="#ff6b6b" intensity={2} />
          <pointLight position={[8, -4, -4]} color="#4299e1" intensity={2} />
          <pointLight position={[0, 10, -5]} color="#ffd700" intensity={1.5} />
          
          {/* Environment with enhanced preset */}
          <Environment preset="city" />
          
          {/* Enhanced ground plane with reflective surface */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial 
              color="#0f172a" 
              transparent 
              opacity={0.3} 
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Realistic Character */}
          <RealisticCharacter isAnimating={isAnimating} animationType={animationType} />
          
          {/* Enhanced Airplane with better targeting */}
          <Airplane isFlying={animationType === 'plane'} targetPosition={[4, 4, 0]} />
          
          {/* Enhanced Clouds */}
          <Clouds isVisible={showClouds} />
          
          {/* Enhanced floating particles with more variety */}
          {Array.from({ length: 30 }).map((_, i) => (
            <mesh key={i} position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 15 + 6,
              (Math.random() - 0.5) * 12
            ]} castShadow>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial 
                color={
                  i % 3 === 0 ? "#ffd700" : 
                  i % 3 === 1 ? "#ff6b6b" : "#4299e1"
                } 
                emissive={
                  i % 3 === 0 ? "#ffd700" : 
                  i % 3 === 1 ? "#ff6b6b" : "#4299e1"
                }
                emissiveIntensity={0.6}
                transparent
                opacity={0.8}
              />
            </mesh>
          ))}
          
          {/* Enhanced Controls */}
          <OrbitControls 
            enablePan={false} 
            enableZoom={true}
            minDistance={4}
            maxDistance={15}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
      
      {/* Enhanced Left side content with Gujarati text */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Hey! Hu rahiyo chu<br />
            Aniket! 👋 Mari journey<br />
            explore karvan a<br />
            taiyaar cho?
          </h1>
        </div>
        
        {/* Enhanced Navigation buttons */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <Button 
            className="w-72 h-14 text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-blue-500/50 transform"
            onClick={() => handleNavigation('/about')}
            disabled={isAnimating}
          >
            {isAnimating ? '✈️ Flying...' : 'Enter My World'}
          </Button>
          
          <Button 
            className="w-72 h-14 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-purple-500/50 transform"
            onClick={() => handleNavigation('/projects')}
            disabled={isAnimating}
          >
            {isAnimating ? '📱 Calling...' : 'Meet My Projects'}
          </Button>
          
          <Button 
            className="w-72 h-14 text-xl font-bold bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-green-500/50 transform"
            onClick={() => handleNavigation('/accomplishments')}
            disabled={isAnimating}
          >
            {isAnimating ? '☁️ Soaring...' : 'Accomplishments'}
          </Button>
          
          <Button 
            className="w-72 h-14 text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-orange-500/50 transform"
            onClick={() => handleNavigation('/about')}
            disabled={isAnimating}
          >
            {isAnimating ? '🌟 Magic...' : 'About Me'}
          </Button>
        </div>
      </div>
      
      {/* Enhanced Instructions with animation */}
      <div className="absolute top-8 right-8 text-white text-sm bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/20 animate-fade-in">
        <p className="flex items-center gap-2">🖱️ Drag to rotate view</p>
        <p className="flex items-center gap-2">🔍 Scroll to zoom</p>
        <p className="flex items-center gap-2">📱 Click buttons to call & fly!</p>
        {isAnimating && (
          <p className="text-yellow-300 font-bold animate-pulse mt-2">
            ✨ Epic animation in progress...
          </p>
        )}
      </div>

      {/* Loading overlay during animation */}
      {isAnimating && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="text-6xl mb-4 animate-bounce">🚀</div>
            <div className="text-2xl font-bold animate-pulse">
              {animationType === 'phone' ? 'Making the call...' : 'Flying to destination...'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Portfolio3DIntro
