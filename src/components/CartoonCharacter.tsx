
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
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 + 0.5
      characterRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group 
      ref={characterRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.2 : 1}
      position={[0, 0, 0]}
    >
      {/* Head */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.2, 1.7, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.2, 1.7, 0.5]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Eye pupils */}
      <mesh position={[-0.2, 1.7, 0.55]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, 1.7, 0.55]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Eyebrows */}
      <mesh position={[-0.2, 1.85, 0.5]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.15, 0.03, 0.02]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[0.2, 1.85, 0.5]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.15, 0.03, 0.02]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.6, 0.55]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#ffb8ac" />
      </mesh>

      {/* Mouth - smile */}
      <mesh position={[0, 1.45, 0.55]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.9, -0.1]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.4, 1, 32]} />
        <meshStandardMaterial color="#4299e1" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.6, 0.9, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.6, 0.9, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Hands */}
      <mesh position={[-0.8, 0.7, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.8, 0.7, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, -0.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      <mesh position={[0.2, -0.2, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.2, -0.65, 0.1]}>
        <boxGeometry args={[0.25, 0.12, 0.35]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, -0.65, 0.1]}>
        <boxGeometry args={[0.25, 0.12, 0.35]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Glasses */}
      <mesh position={[0, 1.7, 0.6]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Speech bubble */}
      {hovered && (
        <group position={[1.5, 2.2, 0]}>
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.95} />
          </mesh>
          <mesh position={[-0.7, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
            <coneGeometry args={[0.15, 0.3, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <Text
            position={[0, 0.2, 0.1]}
            fontSize={0.15}
            color="#333333"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.6}
          >
            Hi! I'm a passionate full-stack developer
            who loves creating innovative solutions.
            I specialize in React, Node.js, and 3D web experiences.
            Let's build something amazing together!
          </Text>
        </group>
      )}

      {/* Laptop accessory - fixed the silver color issue */}
      <mesh position={[0.3, 0.8, 0.4]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.02, 0.2]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
      <mesh position={[0.3, 0.9, 0.3]} rotation={[-0.5, 0, 0]}>
        <boxGeometry args={[0.3, 0.2, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}

export default CartoonCharacter
