
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Sphere, Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

const CartoonCharacter = () => {
  const characterRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (characterRef.current) {
      // Gentle floating animation
      characterRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      characterRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group 
      ref={characterRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Head */}
      <Sphere args={[0.5, 32, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>

      {/* Eyes */}
      <Sphere args={[0.08, 16, 16]} position={[-0.15, 1.6, 0.4]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.15, 1.6, 0.4]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>
      
      {/* Eye pupils */}
      <Sphere args={[0.04, 16, 16]} position={[-0.15, 1.6, 0.45]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere args={[0.04, 16, 16]} position={[0.15, 1.6, 0.45]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>

      {/* Nose */}
      <Sphere args={[0.03, 16, 16]} position={[0, 1.5, 0.45]}>
        <meshStandardMaterial color="#ffb8ac" />
      </Sphere>

      {/* Body */}
      <Cylinder args={[0.4, 0.35, 0.8, 32]} position={[0, 0.6, 0]}>
        <meshStandardMaterial color="#4299e1" />
      </Cylinder>

      {/* Arms */}
      <Cylinder args={[0.08, 0.08, 0.5, 16]} position={[-0.5, 0.8, 0]} rotation={[0, 0, 0.3]}>
        <meshStandardMaterial color="#ffdbac" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.5, 16]} position={[0.5, 0.8, 0]} rotation={[0, 0, -0.3]}>
        <meshStandardMaterial color="#ffdbac" />
      </Cylinder>

      {/* Hands */}
      <Sphere args={[0.1, 16, 16]} position={[-0.7, 0.6, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>
      <Sphere args={[0.1, 16, 16]} position={[0.7, 0.6, 0]}>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>

      {/* Legs */}
      <Cylinder args={[0.1, 0.1, 0.6, 16]} position={[-0.15, -0.1, 0]}>
        <meshStandardMaterial color="#2d3748" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 0.6, 16]} position={[0.15, -0.1, 0]}>
        <meshStandardMaterial color="#2d3748" />
      </Cylinder>

      {/* Feet */}
      <Box args={[0.2, 0.1, 0.3]} position={[-0.15, -0.45, 0.1]}>
        <meshStandardMaterial color="#000000" />
      </Box>
      <Box args={[0.2, 0.1, 0.3]} position={[0.15, -0.45, 0.1]}>
        <meshStandardMaterial color="#000000" />
      </Box>

      {/* Hair */}
      <Sphere args={[0.45, 32, 32]} position={[0, 1.8, -0.1]}>
        <meshStandardMaterial color="#8b4513" />
      </Sphere>

      {/* Speech bubble */}
      {hovered && (
        <group position={[1.2, 1.8, 0]}>
          <Sphere args={[0.8, 32, 32]}>
            <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
          </Sphere>
          <Text
            position={[0, 0.1, 0.1]}
            fontSize={0.12}
            color="#333333"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.2}
          >
            Hello! I'm a passionate developer
            ready to bring your ideas to life!
          </Text>
        </group>
      )}
    </group>
  )
}

export default CartoonCharacter
