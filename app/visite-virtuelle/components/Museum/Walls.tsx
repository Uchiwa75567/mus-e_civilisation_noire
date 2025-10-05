"use client"

import { useMemo } from "react"
import * as THREE from "three"

function Wall({ position, size }: { position: [number, number, number], size: [number, number, number] }) {
  // Texture murale
  const wallTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Fond blanc cassé
    ctx.fillStyle = '#f5f5f0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Texture subtile
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.02})`
      ctx.fillRect(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 3,
        Math.random() * 3
      )
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 2)

    return texture
  }, [])

  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial 
        map={wallTexture}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

interface WallsProps {
  yPosition?: number
}

export function Walls({ yPosition = 0 }: WallsProps) {
  return (
    <>
      {/* Mur Nord */}
      <Wall position={[0, 6 + yPosition, -30]} size={[60, 12, 1]} />
      
      {/* Mur Sud */}
      <Wall position={[0, 6 + yPosition, 30]} size={[60, 12, 1]} />
      
      {/* Mur Ouest */}
      <Wall position={[-30, 6 + yPosition, 0]} size={[1, 12, 60]} />
      
      {/* Mur Est */}
      <Wall position={[30, 6 + yPosition, 0]} size={[1, 12, 60]} />

      {/* Plinthes dorées */}
      <mesh position={[0, 0.2 + yPosition, -30]} castShadow>
        <boxGeometry args={[60, 0.4, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.2 + yPosition, 30]} castShadow>
        <boxGeometry args={[60, 0.4, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-30, 0.2 + yPosition, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 60]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[30, 0.2 + yPosition, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 60]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
    </>
  )
}