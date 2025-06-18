
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

    if (planeRef.current && isFlying) {
      // Smooth entry animation
      const progress = Math.min(time * 0.5, 1)
      setFlyProgress(progress)
      
      // More realistic flight pattern
      const baseX = targetPosition[0] + Math.sin(time * 0.8) * 1.5
      const baseY = targetPosition[1] + Math.sin(time * 0.6) * 0.2 + Math.sin(time * 1.2) * 0.1
      const baseZ = targetPosition[2] + Math.cos(time * 0.8) * 0.8
      
      // Smooth entrance from the distance
      planeRef.current.position.x = baseX * progress + (1 - progress) * 8
      planeRef.current.position.y = baseY * progress + (1 - progress) * 6
      planeRef.current.position.z = baseZ * progress + (1 - progress) * -5
      
      // Banking and turning animations
      planeRef.current.rotation.z = Math.sin(time * 0.8) * 0.15 * progress
      planeRef.current.rotation.y = -Math.PI / 2 + time * 0.3 * progress
      planeRef.current.rotation.x = Math.sin(time * 1.1) * 0.05 * progress
    }
    
    // Fast spinning propeller
    setPropellerRotation(time * 25)
  })

  if (!isFlying) return null

  return (
    <group ref={planeRef} position={targetPosition} scale={1.2}>
      {/* Main fuselage with better proportions */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.06, 2.2, 12]} />
        <meshStandardMaterial color="#e8e8e8" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Nose cone */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <coneGeometry args={[0.06, 0.25, 12]} />
        <meshStandardMaterial color="#d0d0d0" metalness={0.7} roughness={0.2} />
      </mesh>
      
      {/* Main wings with airfoil shape */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.8, 0.04, 0.45]} />
        <meshStandardMaterial color="#c8c8c8" metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Wing tips */}
      <mesh position={[-1.3, 0.32, 0]} rotation={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[0.3, 0.03, 0.15]} />
        <meshStandardMaterial color="#4285f4" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.3, 0.32, 0]} rotation={[0, 0, -0.1]} castShadow>
        <boxGeometry args={[0.3, 0.03, 0.15]} />
        <meshStandardMaterial color="#4285f4" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Tail wings */}
      <mesh position={[0, -0.9, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.0, 0.04, 0.25]} />
        <meshStandardMaterial color="#c8c8c8" metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Vertical stabilizer */}
      <mesh position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.5, 0.35]} />
        <meshStandardMaterial color="#b8b8b8" metalness={0.5} roughness={0.4} />
      </mesh>
      
      {/* Propeller hub */}
      <mesh position={[0, 1.35, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 8]} />
        <meshStandardMaterial color="#2c2c2c" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Spinning propeller blades */}
      <mesh position={[0, 1.38, 0]} rotation={[0, propellerRotation, 0]} castShadow>
        <boxGeometry args={[0.9, 0.015, 0.015]} />
        <meshStandardMaterial color="#8b4513" roughness={0.8} />
      </mesh>
      
      {/* Cockpit windows */}
      <mesh position={[0.08, 0.6, 0.08]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.7} 
          metalness={0.1} 
          roughness={0.05} 
        />
      </mesh>
      <mesh position={[-0.08, 0.6, 0.08]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.7} 
          metalness={0.1} 
          roughness={0.05} 
        />
      </mesh>
      
      {/* Landing gear */}
      <mesh position={[0, -0.15, 0.15]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
        <meshStandardMaterial color="#2c2c2c" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Engine details */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Exhaust pipes */}
      <mesh position={[0.06, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.06, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.15, 6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

export default Airplane
