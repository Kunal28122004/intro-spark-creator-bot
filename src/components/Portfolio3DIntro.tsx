
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import { Suspense } from 'react'
import CartoonCharacter from './CartoonCharacter'

const Portfolio3DIntro = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Canvas camera={{ position: [0, 1, 6], fov: 60 }}>
        <Suspense fallback={null}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <pointLight position={[-5, 2, 2]} color="#ff6b6b" intensity={0.6} />
          <pointLight position={[5, -2, -2]} color="#4299e1" intensity={0.6} />
          
          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Main title */}
          <Text
            position={[0, 4, 0]}
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
            position={[0, 3.3, 0]}
            fontSize={0.35}
            color="#f0f0f0"
            anchorX="center"
            anchorY="middle"
          >
            Full-Stack Developer & Creative Problem Solver
          </Text>
          
          {/* Cartoon Character - positioned prominently */}
          <CartoonCharacter />
          
          {/* Enhanced floating particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <mesh key={i} position={[
              (Math.random() - 0.5) * 12,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial 
                color={Math.random() > 0.5 ? "#ffd700" : "#ff6b6b"} 
                emissive={Math.random() > 0.5 ? "#ffd700" : "#ff6b6b"}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
          
          {/* Code symbols floating around */}
          {['{ }', '< >', '[ ]', '( )', '/>', '='].map((symbol, i) => (
            <Text
              key={symbol}
              position={[
                Math.cos(i * Math.PI / 3) * 4,
                Math.sin(i * Math.PI / 3) * 2 + 2,
                Math.sin(i * Math.PI / 4) * 3
              ]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {symbol}
            </Text>
          ))}
          
          {/* Controls */}
          <OrbitControls 
            enablePan={false} 
            enableZoom={true}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
          />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white text-lg mb-4 animate-pulse">
          Hover over the character to learn more about me!
        </p>
        <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
          Explore My Work
        </button>
      </div>
      
      {/* Instructions */}
      <div className="absolute top-8 right-8 text-white text-sm bg-black bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
        <p>🖱️ Drag to rotate view</p>
        <p>🔍 Scroll to zoom</p>
        <p>👆 Hover character for intro</p>
      </div>
    </div>
  )
}

export default Portfolio3DIntro
