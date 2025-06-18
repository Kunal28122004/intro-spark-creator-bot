
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
  const headRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (characterRef.current && !isAnimating) {
      // Gentle breathing animation when not animating
      characterRef.current.position.y = Math.sin(time * 1.2) * 0.03
      characterRef.current.rotation.y = Math.sin(time * 0.4) * 0.015
    }

    // Head movement during phone animation
    if (headRef.current && animationType === 'phone') {
      headRef.current.rotation.z = Math.sin(time * 3) * 0.1 + 0.2
      headRef.current.rotation.y = 0.3
    } else if (headRef.current && !isAnimating) {
      headRef.current.rotation.z = Math.sin(time * 0.8) * 0.02
      headRef.current.rotation.y = Math.sin(time * 0.6) * 0.05
    }

    if (phoneRef.current && animationType === 'phone') {
      // Smooth phone animation - bring to ear
      const phoneProgress = Math.sin(time * 2) * 0.5 + 0.5
      phoneRef.current.position.x = 0.3 + phoneProgress * 0.1
      phoneRef.current.position.y = 2.2 + phoneProgress * 0.1
      phoneRef.current.rotation.z = phoneProgress * 0.2
    }
  })

  return (
    <group 
      ref={characterRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered && !isAnimating ? 1.02 : 1}
      position={[-1, -0.5, 0]}
    >
      {/* Head group for better animation control */}
      <group ref={headRef}>
        {/* More realistic head with better proportions */}
        <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshStandardMaterial color="#fdbcb4" roughness={0.8} />
        </mesh>

        {/* Detailed hair styling */}
        <mesh position={[0, 2.6, -0.25]} castShadow>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#2d1810" roughness={0.9} />
        </mesh>
        
        {/* Hair volume on sides */}
        <mesh position={[-0.35, 2.4, -0.1]} castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#2d1810" roughness={0.9} />
        </mesh>
        <mesh position={[0.35, 2.4, -0.1]} castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#2d1810" roughness={0.9} />
        </mesh>

        {/* More detailed eyes */}
        <mesh position={[-0.2, 2.25, 0.55]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.2, 2.25, 0.55]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Brown pupils */}
        <mesh position={[-0.2, 2.25, 0.62]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#3d2914" />
        </mesh>
        <mesh position={[0.2, 2.25, 0.62]} castShadow>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#3d2914" />
        </mesh>

        {/* Modern stylish glasses */}
        <mesh position={[-0.2, 2.25, 0.64]} castShadow>
          <torusGeometry args={[0.11, 0.012, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0.2, 2.25, 0.64]} castShadow>
          <torusGeometry args={[0.11, 0.012, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Glasses bridge */}
        <mesh position={[0, 2.25, 0.64]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Well-groomed beard with texture */}
        <mesh position={[0, 1.75, 0.3]} castShadow>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial color="#2d1810" roughness={0.9} />
        </mesh>

        {/* Styled mustache */}
        <mesh position={[0, 1.98, 0.58]} rotation={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.1, 16, 8]} />
          <meshStandardMaterial color="#2d1810" roughness={0.9} />
        </mesh>

        {/* Realistic nose */}
        <mesh position={[0, 2.05, 0.62]} castShadow>
          <coneGeometry args={[0.035, 0.07, 8]} />
          <meshStandardMaterial color="#e8a598" roughness={0.8} />
        </mesh>
      </group>

      {/* Crisp white dress shirt */}
      <mesh position={[0, 1.25, 0.35]} castShadow>
        <cylinderGeometry args={[0.42, 0.38, 0.7, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </mesh>

      {/* Professional teal blazer with better fit */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.52, 0.48, 0.9, 32]} />
        <meshStandardMaterial color="#2d7d78" roughness={0.6} />
      </mesh>

      {/* Blazer collar and lapels */}
      <mesh position={[-0.22, 1.35, 0.3]} rotation={[0, 0, 0.25]} castShadow>
        <boxGeometry args={[0.12, 0.35, 0.02]} />
        <meshStandardMaterial color="#236b66" roughness={0.6} />
      </mesh>
      <mesh position={[0.22, 1.35, 0.3]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[0.12, 0.35, 0.02]} />
        <meshStandardMaterial color="#236b66" roughness={0.6} />
      </mesh>

      {/* Arms in natural pose */}
      <mesh position={[-0.65, 1.15, 0]} rotation={[0, 0, 0.15]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.65, 16]} />
        <meshStandardMaterial color="#2d7d78" roughness={0.6} />
      </mesh>
      <mesh position={[0.65, 1.15, 0]} rotation={[0, 0, -0.15]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.65, 16]} />
        <meshStandardMaterial color="#2d7d78" roughness={0.6} />
      </mesh>

      {/* Natural hand positions */}
      <mesh position={[-0.85, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" roughness={0.8} />
      </mesh>
      <mesh position={[0.85, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" roughness={0.8} />
      </mesh>

      {/* Tailored pants */}
      <mesh position={[-0.18, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.75, 16]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
      </mesh>
      <mesh position={[0.18, -0.05, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.75, 16]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
      </mesh>

      {/* Polished dress shoes */}
      <mesh position={[-0.18, -0.55, 0.1]} castShadow>
        <boxGeometry args={[0.22, 0.1, 0.32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.18, -0.55, 0.1]} castShadow>
        <boxGeometry args={[0.22, 0.1, 0.32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Modern smartphone during call */}
      {animationType === 'phone' && (
        <group ref={phoneRef} position={[0.4, 2.25, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.07, 0.14, 0.015]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.012]} castShadow>
            <boxGeometry args={[0.055, 0.11, 0.008]} />
            <meshStandardMaterial 
              color="#4285f4" 
              emissive="#4285f4" 
              emissiveIntensity={0.4}
              roughness={0.1} 
            />
          </mesh>
        </group>
      )}

      {/* Interactive speech bubble */}
      {hovered && !isAnimating && (
        <group position={[1.2, 2.8, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[-0.4, -0.35, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <coneGeometry args={[0.1, 0.2, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <Text
            position={[0, 0.05, 0.1]}
            fontSize={0.1}
            color="#333333"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.2}
            font="/fonts/Inter-Regular.woff"
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
