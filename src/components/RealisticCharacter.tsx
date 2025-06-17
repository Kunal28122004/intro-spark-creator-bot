
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface RealisticCharacterProps {
  isAnimating: boolean
  animationType: 'phone' | 'plane' | null
}

const RealisticCharacter = ({ isAnimating, animationType }: RealisticCharacterProps) => {
  const characterRef = useRef<THREE.Group>(null)
  const phoneRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (characterRef.current && !isAnimating) {
      // Gentle floating animation when not animating
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
      characterRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
    }

    if (phoneRef.current && animationType === 'phone') {
      // Phone animation - bring to ear
      phoneRef.current.position.x = Math.sin(state.clock.elapsedTime * 4) * 0.1 + 0.4
      phoneRef.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.05 + 2.3
    }
  })

  return (
    <group 
      ref={characterRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
      position={[2.5, -0.5, 0]}
    >
      {/* More realistic head with better proportions */}
      <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Hair - more styled */}
      <mesh position={[0, 2.5, -0.3]} castShadow>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>
      
      {/* Hair sides */}
      <mesh position={[-0.4, 2.3, -0.1]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>
      <mesh position={[0.4, 2.3, -0.1]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>

      {/* Eyes with more detail */}
      <mesh position={[-0.22, 2.25, 0.55]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.22, 2.25, 0.55]} castShadow>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Pupils */}
      <mesh position={[-0.22, 2.25, 0.63]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.22, 2.25, 0.63]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Modern glasses */}
      <mesh position={[-0.22, 2.25, 0.65]} castShadow>
        <torusGeometry args={[0.12, 0.015, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.22, 2.25, 0.65]} castShadow>
        <torusGeometry args={[0.12, 0.015, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Glasses bridge */}
      <mesh position={[0, 2.25, 0.65]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Well-groomed beard */}
      <mesh position={[0, 1.7, 0.35]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>

      {/* Mustache */}
      <mesh position={[0, 1.95, 0.6]} rotation={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 8]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 2.0, 0.65]} castShadow>
        <coneGeometry args={[0.04, 0.08, 8]} />
        <meshStandardMaterial color="#e8a598" />
      </mesh>

      {/* Professional shirt - white */}
      <mesh position={[0, 1.2, 0.4]} castShadow>
        <cylinderGeometry args={[0.45, 0.4, 0.8, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Teal blazer/jacket */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.5, 1.0, 32]} />
        <meshStandardMaterial color="#2d7d78" />
      </mesh>

      {/* Blazer lapels */}
      <mesh position={[-0.25, 1.3, 0.35]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.02]} />
        <meshStandardMaterial color="#236b66" />
      </mesh>
      <mesh position={[0.25, 1.3, 0.35]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.02]} />
        <meshStandardMaterial color="#236b66" />
      </mesh>

      {/* Arms in professional pose */}
      <mesh position={[-0.7, 1.1, 0]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.7, 16]} />
        <meshStandardMaterial color="#2d7d78" />
      </mesh>
      <mesh position={[0.7, 1.1, 0]} rotation={[0, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.7, 16]} />
        <meshStandardMaterial color="#2d7d78" />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.9, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      <mesh position={[0.9, 0.8, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Professional pants - navy */}
      <mesh position={[-0.2, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.8, 16]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh position={[0.2, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.8, 16]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Professional shoes - black leather */}
      <mesh position={[-0.2, -0.6, 0.12]} castShadow>
        <boxGeometry args={[0.25, 0.12, 0.35]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      <mesh position={[0.2, -0.6, 0.12]} castShadow>
        <boxGeometry args={[0.25, 0.12, 0.35]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>

      {/* Phone when calling */}
      {animationType === 'phone' && (
        <group ref={phoneRef} position={[0.4, 2.3, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.15, 0.02]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          <mesh position={[0, 0, 0.015]} castShadow>
            <boxGeometry args={[0.06, 0.12, 0.01]} />
            <meshStandardMaterial color="#4285f4" emissive="#4285f4" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}

      {/* Speech bubble when hovered */}
      {hovered && !isAnimating && (
        <group position={[1.5, 2.8, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.95} />
          </mesh>
          <mesh position={[-0.5, -0.4, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <coneGeometry args={[0.12, 0.25, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <Text
            position={[0, 0.1, 0.1]}
            fontSize={0.12}
            color="#333333"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.4}
          >
            Hello! I'm Aniket, a passionate full-stack developer.
            Click any button to explore my portfolio!
          </Text>
        </group>
      )}
    </group>
  )
}

export default RealisticCharacter
