
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
      // Gentle floating motion for clouds
      cloudsRef.current.position.y = Math.sin(time * 0.5) * 0.2
      
      // Slowly rotate clouds
      cloudsRef.current.children.forEach((cloud, index) => {
        cloud.rotation.y = time * 0.1 + index * 0.5
        cloud.position.x = Math.sin(time * 0.3 + index) * 2
      })
    }
  })

  if (!isVisible) return null

  return (
    <group ref={cloudsRef} position={[0, 4, -3]}>
      {/* Multiple cloud shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} position={[
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 8
        ]}>
          {/* Main cloud body */}
          <mesh castShadow>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.8}
              roughness={0.1}
            />
          </mesh>
          
          {/* Cloud bumps for realistic shape */}
          <mesh position={[0.4, 0.2, 0]} castShadow>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.7}
              roughness={0.1}
            />
          </mesh>
          
          <mesh position={[-0.3, 0.1, 0.2]} castShadow>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.6}
              roughness={0.1}
            />
          </mesh>
          
          <mesh position={[0.1, -0.3, -0.1]} castShadow>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.5}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default Clouds
