
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const CartoonCharacter = () => {
  const characterRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (characterRef.current) {
      // Gentle floating animation
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
      characterRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.03
    }
  })

  return (
    <group 
      ref={characterRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
      position={[2.5, -0.5, 0]}
    >
      {/* Head */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.25, 2.2, 0.6]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.25, 2.2, 0.6]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Eye pupils */}
      <mesh position={[-0.25, 2.2, 0.7]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.25, 2.2, 0.7]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Glasses frame */}
      <mesh position={[-0.25, 2.2, 0.72]} castShadow>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0.25, 2.2, 0.72]} castShadow>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Glasses bridge */}
      <mesh position={[0, 2.2, 0.72]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Beard */}
      <mesh position={[0, 1.6, 0.4]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>

      {/* Mustache */}
      <mesh position={[0, 1.85, 0.65]} rotation={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 8]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.9, 0.7]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#e8a598" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 2.4, -0.2]} castShadow>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>

      {/* Body - teal jacket */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.5, 1.2, 32]} />
        <meshStandardMaterial color="#2d7d78" />
      </mesh>

      {/* White shirt underneath */}
      <mesh position={[0, 1.1, 0.45]} castShadow>
        <cylinderGeometry args={[0.4, 0.35, 0.6, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.8, 1.2, 0]} rotation={[0, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#2d7d78" />
      </mesh>
      <mesh position={[0.8, 1.2, 0]} rotation={[0, 0, -0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#2d7d78" />
      </mesh>

      {/* Hands - one waving */}
      <mesh position={[-1.0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      <mesh position={[1.0, 0.9, 0]} rotation={[0, 0, 0.3]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      {/* Legs - dark blue pants */}
      <mesh position={[-0.25, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>
      <mesh position={[0.25, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#1e3a8a" />
      </mesh>

      {/* Shoes - brown */}
      <mesh position={[-0.25, -0.9, 0.15]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.4]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0.25, -0.9, 0.15]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.4]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Speech bubble */}
      {hovered && (
        <group position={[1.5, 2.5, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.95} />
          </mesh>
          <mesh position={[-0.6, -0.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <coneGeometry args={[0.15, 0.3, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <Text
            position={[0, 0.2, 0.1]}
            fontSize={0.15}
            color="#333333"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
          >
            Hello! I'm Aniket, a passionate full-stack developer.
            Welcome to my digital world! Let's explore
            my journey together.
          </Text>
        </group>
      )}
    </group>
  )
}

export default CartoonCharacter
