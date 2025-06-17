
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AirplaneProps {
  isFlying: boolean
  targetPosition?: [number, number, number]
}

const Airplane = ({ isFlying, targetPosition = [0, 3, 0] }: AirplaneProps) => {
  const planeRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (planeRef.current && isFlying) {
      // Flying animation
      const time = state.clock.elapsedTime
      planeRef.current.position.x = Math.sin(time * 0.5) * 2 + targetPosition[0]
      planeRef.current.position.y = Math.sin(time * 0.3) * 0.3 + targetPosition[1]
      planeRef.current.position.z = Math.cos(time * 0.5) * 1 + targetPosition[2]
      planeRef.current.rotation.z = Math.sin(time * 0.5) * 0.1
      planeRef.current.rotation.y = time * 0.5
    }
  })

  if (!isFlying) return null

  return (
    <group ref={planeRef} position={targetPosition} scale={0.8}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.08, 2, 8]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <coneGeometry args={[0.08, 0.3, 8]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.5, 0.05, 0.4]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
      
      {/* Tail wings */}
      <mesh position={[0, -0.8, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.05, 0.3]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
      
      {/* Vertical tail */}
      <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.6, 0.4]} />
        <meshStandardMaterial color="#b0b0b0" />
      </mesh>
      
      {/* Propeller */}
      <mesh position={[0, 1.3, 0]} rotation={[0, state.clock.elapsedTime * 20, 0]} castShadow>
        <boxGeometry args={[0.8, 0.02, 0.02]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0.05, 0.5, 0.1]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-0.05, 0.5, 0.1]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

export default Airplane
