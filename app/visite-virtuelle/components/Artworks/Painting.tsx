"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Html } from "@react-three/drei"
import * as THREE from "three"

interface PaintingProps {
  position: [number, number, number]
  rotation: [number, number, number]
  title: string
  artist: string
  description: string
  year: string
  imageUrl: string
  imageAttribution: string
  oeuvreId?: string
}

export function Painting({ 
  position, 
  rotation, 
  title, 
  artist, 
  description, 
  year,
  imageUrl,
  imageAttribution,
  oeuvreId
}: PaintingProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [visited, setVisited] = useState(false)

  // Charger la texture depuis l'URL
  const artTexture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load(imageUrl)
    return texture
  }, [imageUrl])

  // Animation de pulsation au survol
  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.02)
    } else if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  // Gestion du curseur
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
  }, [hovered])

  const handleClick = () => {
    setShowInfo(!showInfo)
    if (!visited) {
      setVisited(true)
      try {
        window.dispatchEvent(new CustomEvent('painting-visited', { detail: { title } }))
      } catch (e) {
        // Ignore
      }
    }
  }

  return (
    <>
      <group
        ref={groupRef}
        position={position}
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        {/* Cadre doré */}
        <mesh castShadow>
          <boxGeometry args={[5.4, 4.4, 0.3]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            roughness={0.2} 
            metalness={0.9}
            emissive="#D4AF37"
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>

        {/* Œuvre d'art */}
        <mesh position={[0, 0, 0.16]} castShadow>
          <planeGeometry args={[5, 4]} />
          <meshStandardMaterial 
            map={artTexture}
            roughness={0.7}
            emissive={hovered ? '#D4AF37' : '#000000'}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>

        {/* Titre */}
        <Text
          position={[0, -2.6, 0.2]}
          fontSize={0.25}
          color="#D4AF37"
          anchorX="center"
          anchorY="middle"
          maxWidth={4.5}
        >
          {title}
        </Text>

        {/* Spotlight sur l'œuvre */}
        <spotLight
          position={[0, 2, 2]}
          angle={0.4}
          penumbra={0.5}
          intensity={hovered ? 2 : 1}
          color="#FFF8DC"
          castShadow
        />

        {/* Indicateur de visite */}
        {visited && (
          <mesh position={[2.5, 2, 0.2]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color="#10b981" 
              emissive="#10b981"
              emissiveIntensity={0.5}
            />
          </mesh>
        )}
      </group>

      {/* Panneau d'information */}
      {showInfo && (
        <Html position={[position[0], position[1], position[2] + 3]} center>
          <div className="bg-gradient-to-br from-black/95 to-black/90 backdrop-blur-md text-white p-6 rounded-2xl max-w-md border-2 border-amber-600/30 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {title}
                </h3>
                <p className="text-amber-300/80 text-sm">{artist}</p>
                <p className="text-amber-300/60 text-xs">{year}</p>
              </div>
              <button
                className="ml-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setShowInfo(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {description}
            </p>

            <div className="flex gap-2">
              {oeuvreId && (
                <a
                  href={`/oeuvres/${oeuvreId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 px-4 py-2 rounded-lg transition-all transform hover:scale-105 text-sm font-medium text-center"
                >
                  📖 Voir détails
                </a>
              )}
              <button className="flex-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all text-sm font-medium">
                📷 Partager
              </button>
            </div>
          </div>
        </Html>
      )}
    </>
  )
}