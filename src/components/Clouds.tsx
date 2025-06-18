
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CloudsProps {
  isVisible: boolean
}

const Clouds = ({ isVisible }: CloudsProps) => {
  const cloudsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (cloudsRef.current && isVisible) {
      const time = state.clock.elapsedTime
      // Enhanced dramatic cloud movement
      cloudsRef.current.position.y = Math.sin(time * 0.8) * 0.3 + 4
      
      // Dynamic cloud formation
      cloudsRef.current.children.forEach((cloud, index) => {
        cloud.rotation.y = time * 0.15 + index * 0.8
        cloud.position.x = Math.sin(time * 0.4 + index) * 3 + (Math.random() - 0.5) * 2
        cloud.position.z = Math.cos(time * 0.3 + index) * 2
        cloud.scale.setScalar(1 + Math.sin(time * 0.6 + index) * 0.2)
      })
    }
  })

  if (!isVisible) return null

  return (
    <group ref={cloudsRef} position={[0, 4, -3]}>
      {/* Enhanced cloud formations */}
      {Array.from({ length: 12 }).map((_, i) => (
        <group key={i} position={[
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 12
        ]}>
          {/* Main cloud body */}
          <mesh castShadow>
            <sphereGeometry args={[1, 20, 20]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.9}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
          
          {/* Enhanced cloud bumps */}
          <mesh position={[0.5, 0.3, 0]} castShadow>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.8}
              roughness={0.8}
            />
          </mesh>
          
          <mesh position={[-0.4, 0.2, 0.3]} castShadow>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.7}
              roughness={0.8}
            />
          </mesh>
          
          <mesh position={[0.2, -0.4, -0.2]} castShadow>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.6}
              roughness={0.8}
            />
          </mesh>

          {/* Additional cloud details */}
          <mesh position={[-0.6, -0.1, 0.4]} castShadow>
            <sphereGeometry args={[0.4, 12, 12]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.5}
              roughness={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default Clouds
