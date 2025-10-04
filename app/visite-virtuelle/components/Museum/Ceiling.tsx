"use client"

import { useMemo } from "react"
import * as THREE from "three"

export function Ceiling() {
  // Texture du plafond
  const ceilingTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    // Fond blanc
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Motifs décoratifs
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 2
    const spacing = 64
    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.strokeRect(x + 10, y + 10, spacing - 20, spacing - 20)
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(8, 8)

    return texture
  }, [])

  return (
    <>
      {/* Plafond principal */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 12, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial 
          map={ceilingTexture}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Moulures dorées */}
      <mesh position={[0, 11.8, 0]}>
        <torusGeometry args={[15, 0.15, 16, 100]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>
    </>
  )
}