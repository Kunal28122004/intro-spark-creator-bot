
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Text } from '@react-three/drei'
import { Suspense } from 'react'
import CartoonCharacter from './CartoonCharacter'

const Portfolio3DIntro = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Canvas 
        camera={{ position: [0, 2, 8], fov: 60 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Enhanced Lighting */}
          <ambientLight intensity={1.2} />
          <directionalLight 
            position={[10, 10, 10]} 
            intensity={2} 
            castShadow 
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-5, 5, 5]} color="#ff6b6b" intensity={1} />
          <pointLight position={[5, -2, -2]} color="#4299e1" intensity={1} />
          
          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Ground plane for shadows */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#f0f0f0" transparent opacity={0.3} />
          </mesh>
          
          {/* Main title */}
          <Text
            position={[0, 5, 0]}
            fontSize={1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/bold.woff"
          >
            Welcome to My Portfolio
          </Text>
          
          {/* Subtitle */}
          <Text
            position={[0, 4.2, 0]}
            fontSize={0.4}
            color="#f0f0f0"
            anchorX="center"
            anchorY="middle"
          >
            Full-Stack Developer & Creative Problem Solver
          </Text>
          
          {/* Cartoon Character - positioned prominently */}
          <CartoonCharacter />
          
          {/* Enhanced floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh key={i} position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 12 + 3,
              (Math.random() - 0.5) * 10
            ]} castShadow>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial 
                color={Math.random() > 0.5 ? "#ffd700" : "#ff6b6b"} 
                emissive={Math.random() > 0.5 ? "#ffd700" : "#ff6b6b"}
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
          
          {/* Code symbols floating around */}
          {['{ }', '< >', '[ ]', '( )', '/>', '='].map((symbol, i) => (
            <Text
              key={symbol}
              position={[
                Math.cos(i * Math.PI / 3) * 5,
                Math.sin(i * Math.PI / 3) * 3 + 3,
                Math.sin(i * Math.PI / 4) * 4
              ]}
              fontSize={0.4}
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
            minDistance={4}
            maxDistance={15}
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
