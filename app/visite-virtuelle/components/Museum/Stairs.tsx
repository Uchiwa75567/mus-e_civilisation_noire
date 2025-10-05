"use client"

import { useRef } from "react"
import { Text } from "@react-three/drei"
import * as THREE from "three"

interface StairsProps {
  position: [number, number, number]
  targetFloor: number
  onUse: () => void
}

export function Stairs({ position, targetFloor, onUse }: StairsProps) {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef} position={position}>
      {/* Base de l'escalier */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 6]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Marches */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, i * 0.3, -2.5 + i * 0.5]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[4, 0.15, 0.5]} />
          <meshStandardMaterial color="#654321" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}

      {/* Rampe gauche */}
      <mesh position={[-1.8, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 6, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rampe droite */}
      <mesh position={[1.8, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 6, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Panneau indicateur */}
      <mesh position={[0, 3.5, -3]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      <Text
        position={[0, 3.5, -2.9]}
        fontSize={0.3}
        color="#D4AF37"
        anchorX="center"
        anchorY="middle"
      >
        {targetFloor === 0 ? "⬇ Rez-de-chaussée" : `⬆ Étage ${targetFloor}`}
      </Text>

      {/* Zone d'interaction */}
      <mesh
        position={[0, 1, 0]}
        onClick={onUse}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[4, 3, 6]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Éclairage */}
      <pointLight position={[0, 3, 0]} intensity={1} color="#FFF8DC" distance={10} />
    </group>
  )
}