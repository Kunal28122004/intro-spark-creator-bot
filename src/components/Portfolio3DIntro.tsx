
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RealisticCharacter from './RealisticCharacter'
import Airplane from './Airplane'
import { Button } from '@/components/ui/button'

const Portfolio3DIntro = () => {
  const navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationType, setAnimationType] = useState<'phone' | 'plane' | null>(null)

  const handleNavigation = (path: string) => {
    console.log(`${path} clicked`)
    setIsAnimating(true)
    setAnimationType('phone')
    
    // Phone call animation
    setTimeout(() => {
      setAnimationType('plane')
    }, 2000)
    
    // Navigate after plane animation
    setTimeout(() => {
      navigate(path)
    }, 4000)
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 relative">
      <Canvas 
        camera={{ position: [0, 2, 8], fov: 60 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={1.5} />
          <directionalLight 
            position={[10, 10, 10]} 
            intensity={2.5} 
            castShadow 
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-5, 5, 5]} color="#ff6b6b" intensity={1.2} />
          <pointLight position={[5, -2, -2]} color="#4299e1" intensity={1.2} />
          
          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Ground plane for shadows */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#f0f0f0" transparent opacity={0.15} />
          </mesh>
          
          {/* Realistic Character */}
          <RealisticCharacter isAnimating={isAnimating} animationType={animationType} />
          
          {/* Airplane */}
          <Airplane isFlying={animationType === 'plane'} targetPosition={[2.5, 3, 0]} />
          
          {/* Enhanced floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh key={i} position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 12 + 4,
              (Math.random() - 0.5) * 10
            ]} castShadow>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial 
                color={Math.random() > 0.5 ? "#ffd700" : "#ff6b6b"} 
                emissive={Math.random() > 0.5 ? "#ffd700" : "#ff6b6b"}
                emissiveIntensity={0.4}
              />
            </mesh>
          ))}
          
          {/* Controls */}
          <OrbitControls 
            enablePan={false} 
            enableZoom={true}
            minDistance={4}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
      
      {/* Left side content with Gujarati text */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white z-10">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Hey! Hu rahiyo chu<br />
            Aniket! 👋 Mari journey<br />
            explore karvan a<br />
            taiyaar cho?
          </h1>
        </div>
        
        {/* Navigation buttons */}
        <div className="space-y-4">
          <Button 
            className="w-64 h-12 text-lg font-semibold bg-white text-blue-900 hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => handleNavigation('/about')}
            disabled={isAnimating}
          >
            Enter My World
          </Button>
          
          <Button 
            className="w-64 h-12 text-lg font-semibold bg-white text-blue-900 hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => handleNavigation('/projects')}
            disabled={isAnimating}
          >
            Meet My Projects
          </Button>
          
          <Button 
            className="w-64 h-12 text-lg font-semibold bg-white text-blue-900 hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => handleNavigation('/accomplishments')}
            disabled={isAnimating}
          >
            Accomplishments
          </Button>
          
          <Button 
            className="w-64 h-12 text-lg font-semibold bg-white text-blue-900 hover:bg-gray-100 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => handleNavigation('/about')}
            disabled={isAnimating}
          >
            About Me
          </Button>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-8 right-8 text-white text-sm bg-black bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
        <p>🖱️ Drag to rotate view</p>
        <p>🔍 Scroll to zoom</p>
        <p>📱 Click buttons to call & fly!</p>
        {isAnimating && (
          <p className="text-yellow-300 font-bold">✈️ Animation in progress...</p>
        )}
      </div>
    </div>
  )
}

export default Portfolio3DIntro
