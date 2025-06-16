
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import { Suspense } from 'react'
import CartoonCharacter from './CartoonCharacter'

const Portfolio3DIntro = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#ff6b6b" intensity={0.5} />
          
          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Main title */}
          <Text
            position={[0, 3.5, 0]}
            fontSize={0.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/bold.woff"
          >
            Welcome to My Portfolio
          </Text>
          
          {/* Subtitle */}
          <Text
            position={[0, 2.8, 0]}
            fontSize={0.3}
            color="#f0f0f0"
            anchorX="center"
            anchorY="middle"
          >
            Creative Developer & Problem Solver
          </Text>
          
          {/* Cartoon Character */}
          <CartoonCharacter />
          
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh key={i} position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 8
            ]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial 
                color={Math.random() > 0.5 ? "#ffd700" : "#ff6b6b"} 
                emissive={Math.random() > 0.5 ? "#ffd700" : "#ff6b6b"}
                emissiveIntensity={0.2}
              />
            </mesh>
          ))}
          
          {/* Controls */}
          <OrbitControls 
            enablePan={false} 
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white text-lg mb-4 animate-pulse">
          Hover over the character to see the introduction!
        </p>
        <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
          Explore My Work
        </button>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-8 right-8 text-white text-sm">
        <p>🖱️ Drag to rotate</p>
        <p>👆 Hover character for intro</p>
      </div>
    </div>
  )
}

export default Portfolio3DIntro
