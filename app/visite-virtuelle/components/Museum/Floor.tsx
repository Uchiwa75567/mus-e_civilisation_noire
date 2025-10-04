"use client"

import { useRef, useMemo } from "react"
import * as THREE from "three"

export function Floor() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Texture procédurale pour le sol
  const floorTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Fond marbre
    ctx.fillStyle = '#2a2a2a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Motif de carrelage
    const tileSize = 64
    for (let x = 0; x < canvas.width; x += tileSize) {
      for (let y = 0; y < canvas.height; y += tileSize) {
        // Alternance de teintes
        const shade = ((x / tileSize) + (y / tileSize)) % 2 === 0 ? '#252525' : '#2f2f2f'
        ctx.fillStyle = shade
        ctx.fillRect(x, y, tileSize - 2, tileSize - 2)

        // Bordures
        ctx.strokeStyle = '#1a1a1a'
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, tileSize, tileSize)
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(10, 10)

    return texture
  }, [])

  return (
    <mesh 
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, 0, 0]} 
      receiveShadow
    >
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial 
        map={floorTexture}
        roughness={0.8} 
        metalness={0.2}
      />
    </mesh>
  )
}