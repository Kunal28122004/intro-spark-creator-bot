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

    if (characterRef.current) {
      if (animationType === 'plane') {
        // Enhanced dramatic boarding animation
        const boardingProgress = Math.min((time - 3) * 1.2, 1)
        if (boardingProgress > 0) {
          // More dramatic movement toward plane
          const curve = Math.sin(boardingProgress * Math.PI * 0.5)
          characterRef.current.position.x = 3 + boardingProgress * 8 * curve
          characterRef.current.position.y = -0.5 + boardingProgress * 12 * curve
          characterRef.current.position.z = boardingProgress * -8 * curve
          characterRef.current.scale.setScalar(1 - boardingProgress * 0.9)
          characterRef.current.rotation.y = boardingProgress * Math.PI
        }
      } else if (animationType === 'phone') {
        // Enhanced phone animation with more dramatic movement
        const phoneTime = time - 0.5
        characterRef.current.position.y = -0.5 + Math.sin(phoneTime * 3) * 0.2
        characterRef.current.rotation.y = Math.sin(phoneTime * 2) * 0.2
        characterRef.current.scale.setScalar(1 + Math.sin(phoneTime * 4) * 0.05)
      } else if (!isAnimating) {
        // Enhanced idle animation
        characterRef.current.position.y = Math.sin(time * 1.5) * 0.05 - 0.5
        characterRef.current.rotation.y = Math.sin(time * 0.5) * 0.02
        characterRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.005)
      }
    }

    // Enhanced head movement for phone call
    if (headRef.current && animationType === 'phone') {
      const phoneTime = time - 0.5
      headRef.current.rotation.z = Math.sin(phoneTime * 6) * 0.25 + 0.4
      headRef.current.rotation.y = 0.5 + Math.sin(phoneTime * 3) * 0.15
      headRef.current.rotation.x = Math.sin(phoneTime * 4) * 0.1
    } else if (headRef.current && !isAnimating) {
      headRef.current.rotation.z = Math.sin(time * 1.2) * 0.03
      headRef.current.rotation.y = Math.sin(time * 0.8) * 0.08
    }

    // Enhanced phone animation positioned on right side
    if (phoneRef.current && animationType === 'phone') {
      const phoneTime = time - 0.5
      const phoneProgress = (Math.sin(phoneTime * 4) + 1) * 0.5
      
      // Position phone on character's right side (his right, our left when facing him)
      phoneRef.current.position.x = 0.6 + phoneProgress * 0.3
      phoneRef.current.position.y = 2.0 + phoneProgress * 0.4
      phoneRef.current.position.z = 0.2 + phoneProgress * 0.2
      
      // Rotate phone naturally
      phoneRef.current.rotation.z = phoneProgress * 0.4 + 0.2
      phoneRef.current.rotation.y = phoneProgress * 0.3 + 0.1
      phoneRef.current.rotation.x = Math.sin(phoneTime * 5) * 0.1
      
      // Scale animation
      phoneRef.current.scale.setScalar(1 + phoneProgress * 0.2)
    }
  })

  return (
    <group 
      ref={characterRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered && !isAnimating ? 1.05 : 1}
      position={[3, -0.5, 0]}
    >
      {/* Enhanced Head group */}
      <group ref={headRef}>
        {/* Head with better skin tone */}
        <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial 
            color="#fdbcb4" 
            roughness={0.7} 
            metalness={0.1}
            normalScale={new THREE.Vector2(0.1, 0.1)}
          />
        </mesh>

        {/* Enhanced hair with more volume */}
        <mesh position={[0, 2.7, -0.3]} castShadow>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshStandardMaterial color="#2d1810" roughness={0.9} />
        </mesh>
        
        {/* Hair side volume */}
        <mesh position={[-0.4, 2.5, -0.1]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#2d1810" roughness={0.9} />
        </mesh>
        <mesh position={[0.4, 2.5, -0.1]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#2d1810" roughness={0.9} />
        </mesh>

        {/* Enhanced eyes */}
        <mesh position={[-0.22, 2.3, 0.6]} castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.22, 2.3, 0.6]} castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        
        {/* Enhanced pupils */}
        <mesh position={[-0.22, 2.3, 0.68]} castShadow>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#3d2914" />
        </mesh>
        <mesh position={[0.22, 2.3, 0.68]} castShadow>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial color="#3d2914" />
        </mesh>

        {/* Enhanced glasses */}
        <mesh position={[-0.22, 2.3, 0.7]} castShadow>
          <torusGeometry args={[0.12, 0.015, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.22, 2.3, 0.7]} castShadow>
          <torusGeometry args={[0.12, 0.015, 8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 2.3, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Enhanced beard */}
        <mesh position={[0, 1.7, 0.35]} castShadow>
          <sphereGeometry args={[0.32, 16, 16]} />
          <meshStandardMaterial color="#2d1810" roughness={0.95} />
        </mesh>

        {/* Enhanced mustache */}
        <mesh position={[0, 2, 0.65]} rotation={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 8]} />
          <meshStandardMaterial color="#2d1810" roughness={0.95} />
        </mesh>

        {/* Enhanced nose */}
        <mesh position={[0, 2.08, 0.68]} castShadow>
          <coneGeometry args={[0.04, 0.08, 8]} />
          <meshStandardMaterial color="#e8a598" roughness={0.8} />
        </mesh>
      </group>

      {/* Enhanced shirt */}
      <mesh position={[0, 1.3, 0.4]} castShadow>
        <cylinderGeometry args={[0.45, 0.4, 0.75, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.05} />
      </mesh>

      {/* Enhanced blazer */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.5, 0.95, 32]} />
        <meshStandardMaterial color="#2d7d78" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Enhanced collar */}
      <mesh position={[-0.25, 1.4, 0.35]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.03]} />
        <meshStandardMaterial color="#236b66" roughness={0.6} />
      </mesh>
      <mesh position={[0.25, 1.4, 0.35]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.15, 0.4, 0.03]} />
        <meshStandardMaterial color="#236b66" roughness={0.6} />
      </mesh>

      {/* Enhanced arms */}
      <mesh position={[-0.7, 1.2, 0]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.7, 16]} />
        <meshStandardMaterial color="#2d7d78" roughness={0.6} />
      </mesh>
      <mesh position={[0.7, 1.2, 0]} rotation={[0, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.7, 16]} />
        <meshStandardMaterial color="#2d7d78" roughness={0.6} />
      </mesh>

      {/* Enhanced hands */}
      <mesh position={[-0.9, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" roughness={0.8} />
      </mesh>
      <mesh position={[0.9, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" roughness={0.8} />
      </mesh>

      {/* Enhanced pants */}
      <mesh position={[-0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.8, 16]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
      </mesh>
      <mesh position={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.8, 16]} />
        <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
      </mesh>

      {/* Enhanced shoes */}
      <mesh position={[-0.2, -0.6, 0.12]} castShadow>
        <boxGeometry args={[0.25, 0.12, 0.35]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.2, -0.6, 0.12]} castShadow>
        <boxGeometry args={[0.25, 0.12, 0.35]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Enhanced smartphone with better positioning and animation */}
      {animationType === 'phone' && (
        <group ref={phoneRef} position={[0.6, 2.0, 0.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.08, 0.16, 0.02]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0.015]} castShadow>
            <boxGeometry args={[0.065, 0.13, 0.01]} />
            <meshStandardMaterial 
              color="#4285f4" 
              emissive="#4285f4" 
              emissiveIntensity={0.8}
              roughness={0.1} 
            />
          </mesh>
          {/* Phone screen glow effect */}
          <mesh position={[0, 0, 0.02]} castShadow>
            <boxGeometry args={[0.05, 0.1, 0.005]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff" 
              emissiveIntensity={1.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      )}

      {/* Enhanced speech bubble */}
      {hovered && !isAnimating && (
        <group position={[1.5, 3, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.95} 
              roughness={0.1}
              metalness={0.05}
            />
          </mesh>
          <mesh position={[-0.5, -0.4, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <coneGeometry args={[0.12, 0.25, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <Text
            position={[0, 0.1, 0.15]}
            fontSize={0.12}
            color="#333333"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.4}
            font="/fonts/Inter-Regular.woff"
          >
            Hello! I'm Aniket, a passionate full-stack developer.
            Click any button to start an amazing journey!
          </Text>
        </group>
      )}
    </group>
  )
}

export default RealisticCharacter
