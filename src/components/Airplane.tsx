import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AirplaneProps {
  isFlying: boolean
  targetPosition?: [number, number, number]
}

const Airplane = ({ isFlying, targetPosition = [0, 3, 0] }: AirplaneProps) => {
  const planeRef = useRef<THREE.Group>(null)
  const [propellerRotation, setPropellerRotation] = useState(0)
  const [flyProgress, setFlyProgress] = useState(0)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (planeRef.current) {
      if (isFlying) {
        // Horizontal flight animation to top left
        const progress = Math.min(time * 0.6, 1)
        setFlyProgress(progress)
        
        // Start from character position and fly horizontally to top left
        const startX = 3
        const startY = 3
        const startZ = 0
        
        const endX = -15  // Far left
        const endY = 8    // Higher up
        const endZ = -5   // Slightly back
        
        // Smooth horizontal flight path
        planeRef.current.position.x = startX + (endX - startX) * progress
        planeRef.current.position.y = startY + (endY - startY) * progress + Math.sin(progress * Math.PI * 2) * 0.5
        planeRef.current.position.z = startZ + (endZ - startZ) * progress
        
        // Keep airplane horizontal orientation
        planeRef.current.rotation.x = 0
        planeRef.current.rotation.y = -Math.PI / 2 // Point left
        planeRef.current.rotation.z = Math.sin(time * 3) * 0.1 // Slight banking
        
        // Scale grows as it flies
        planeRef.current.scale.setScalar(0.5 + progress * 1.5)
      } else {
        // Reset position when not flying
        planeRef.current.position.set(50, 20, -50)
        planeRef.current.scale.setScalar(0.1)
        setFlyProgress(0)
      }
    }
    
    // Ultra-fast spinning propeller
    setPropellerRotation(time * 60)
  })

  return (
    <group ref={planeRef} position={[50, 20, -50]} scale={0.1}>
      {/* Enhanced main fuselage */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.08, 2.5, 16]} />
        <meshStandardMaterial 
          color="#e8e8e8" 
          metalness={0.7} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Enhanced nose cone */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <coneGeometry args={[0.08, 0.3, 16]} />
        <meshStandardMaterial 
          color="#d0d0d0" 
          metalness={0.8} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Enhanced main wings */}
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[3.2, 0.06, 0.55]} />
        <meshStandardMaterial 
          color="#c8c8c8" 
          metalness={0.6} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Enhanced wing tips */}
      <mesh position={[-1.5, 0.44, 0]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.35, 0.04, 0.18]} />
        <meshStandardMaterial 
          color="#4285f4" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#4285f4"
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[1.5, 0.44, 0]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.35, 0.04, 0.18]} />
        <meshStandardMaterial 
          color="#4285f4" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#4285f4"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Enhanced tail */}
      <mesh position={[0, -1, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.06, 0.3]} />
        <meshStandardMaterial 
          color="#c8c8c8" 
          metalness={0.6} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Enhanced vertical stabilizer */}
      <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.6, 0.4]} />
        <meshStandardMaterial 
          color="#b8b8b8" 
          metalness={0.6} 
          roughness={0.3}
        />
      </mesh>
      
      {/* Enhanced propeller hub */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 12]} />
        <meshStandardMaterial 
          color="#2c2c2c" 
          metalness={0.95} 
          roughness={0.05}
        />
      </mesh>
      
      {/* Enhanced spinning propeller */}
      <mesh position={[0, 1.54, 0]} rotation={[0, propellerRotation, 0]} castShadow>
        <boxGeometry args={[1.2, 0.02, 0.02]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.7}
          transparent
          opacity={flyProgress > 0.3 ? 0.3 : 0.9}
        />
      </mesh>
      
      {/* Enhanced cockpit */}
      <mesh position={[0.1, 0.8, 0.1]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.8} 
          metalness={0.1} 
          roughness={0.05}
        />
      </mesh>
      <mesh position={[-0.1, 0.8, 0.1]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.8} 
          metalness={0.1} 
          roughness={0.05}
        />
      </mesh>
      
      {/* Enhanced landing gear */}
      <mesh position={[0, -0.2, 0.2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial 
          color="#2c2c2c" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Enhanced engine details */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.25, 12]} />
        <meshStandardMaterial 
          color="#a0a0a0" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Enhanced exhaust with glow */}
      <mesh position={[0.08, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial 
          color="#ff4500" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#ff4500"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[-0.08, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial 
          color="#ff4500" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#ff4500"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Navigation lights */}
      <mesh position={[-1.6, 0.44, 0]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000"
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[1.6, 0.44, 0]} castShadow>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial 
          color="#00ff00" 
          emissive="#00ff00"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  )
}

export default Airplane
