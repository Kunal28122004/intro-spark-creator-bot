
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
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      characterRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  return (
    <group 
      ref={characterRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
      position={[0, -0.5, 0]}
    >
      {/* Head */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffdbac" />
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

      {/* Nose */}
      <mesh position={[0, 1.9, 0.7]} castShadow>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ffb8ac" />
      </mesh>

      {/* Mouth - smile */}
      <mesh position={[0, 1.7, 0.7]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 2.4, -0.2]} castShadow>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#2d1810" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.6, 0.5, 1.2, 32]} />
        <meshStandardMaterial color="#4299e1" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.8, 1.2, 0]} rotation={[0, 0, 0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[0.8, 1.2, 0]} rotation={[0, 0, -0.4]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.8, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Hands */}
      <mesh position={[-1.0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>
      <mesh position={[1.0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffdbac" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.25, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>
      <mesh position={[0.25, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.25, -0.9, 0.15]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.25, -0.9, 0.15]} castShadow>
        <boxGeometry args={[0.3, 0.15, 0.4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Speech bubble */}
      {hovered && (
        <group position={[2, 2.5, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.95} />
          </mesh>
          <mesh position={[-0.8, -0.6, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <coneGeometry args={[0.2, 0.4, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <Text
            position={[0, 0.3, 0.1]}
            fontSize={0.18}
            color="#333333"
            anchorX="center"
            anchorY="middle"
            maxWidth={2}
          >
            Hello! I'm a passionate full-stack developer
            who loves creating innovative solutions.
            I specialize in React, Node.js, and 3D web experiences.
            Let's build something amazing together!
          </Text>
        </group>
      )}

      {/* Laptop accessory */}
      <mesh position={[0.4, 1, 0.5]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.03, 0.25]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
      <mesh position={[0.4, 1.1, 0.35]} rotation={[-0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.4, 0.25, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}

export default CartoonCharacter
