"use client"

import { useState, useEffect } from "react"
import { MultiFloor } from "./Museum/MultiFloor"
import { Lighting } from "./Museum/Lighting"
import { Painting } from "./Artworks/Painting"
import { Stairs } from "./Museum/Stairs"
import { CameraController } from "./CameraController"
import { oeuvres } from "@/lib/data"
import type { Oeuvre } from "@/lib/types"

interface SceneProps {
  sensitivity: number
  baseSpeed: number
  fogEnabled: boolean
  shadowsEnabled: boolean
}

// Organiser les œuvres par étage
function organizeArtworksByFloor(artworks: Oeuvre[]) {
  return {
    floor0: artworks.slice(0, 6),   // Œuvres 1-6: Rez-de-chaussée
    floor1: artworks.slice(6, 12),  // Œuvres 7-12: 1er étage
    floor2: artworks.slice(12, 17)  // Œuvres 13-17: 2ème étage
  }
}

// Calculer les positions pour les œuvres
function calculateArtworkPositions(artworks: Oeuvre[], floorNumber: number) {
  const floorHeight = floorNumber * 12
  const positions: Array<{
    oeuvre: Oeuvre
    pos: [number, number, number]
    rot: [number, number, number]
  }> = []

  // Mur Nord (z = -29.7)
  const northWall = artworks.slice(0, Math.min(3, artworks.length))
  northWall.forEach((oeuvre, i) => {
    const spacing = 10
    const startX = -(northWall.length - 1) * spacing / 2
    positions.push({
      oeuvre,
      pos: [startX + i * spacing, 4 + floorHeight, -29.7],
      rot: [0, 0, 0]
    })
  })

  // Mur Ouest (x = -29.7)
  const westWall = artworks.slice(3, Math.min(5, artworks.length))
  westWall.forEach((oeuvre, i) => {
    const spacing = 10
    const startZ = -(westWall.length - 1) * spacing / 2
    positions.push({
      oeuvre,
      pos: [-29.7, 4 + floorHeight, startZ + i * spacing],
      rot: [0, Math.PI / 2, 0]
    })
  })

  // Mur Est (x = 29.7)
  const eastWall = artworks.slice(5, Math.min(7, artworks.length))
  eastWall.forEach((oeuvre, i) => {
    const spacing = 10
    const startZ = -(eastWall.length - 1) * spacing / 2
    positions.push({
      oeuvre,
      pos: [29.7, 4 + floorHeight, startZ + i * spacing],
      rot: [0, -Math.PI / 2, 0]
    })
  })

  // Mur Sud (z = 29.7) - pour les étages avec plus d'œuvres
  if (artworks.length > 7) {
    const southWall = artworks.slice(7)
    southWall.forEach((oeuvre, i) => {
      const spacing = 10
      const startX = -(southWall.length - 1) * spacing / 2
      positions.push({
        oeuvre,
        pos: [startX + i * spacing, 4 + floorHeight, 29.7],
        rot: [0, Math.PI, 0]
      })
    })
  }

  return positions
}

export function Scene({ sensitivity, baseSpeed, fogEnabled, shadowsEnabled }: SceneProps) {
  const [currentFloor, setCurrentFloor] = useState(0)
  const organizedArtworks = organizeArtworksByFloor(oeuvres)

  // Gérer le changement d'étage
  const handleFloorChange = (newFloor: number) => {
    setCurrentFloor(newFloor)
    // Dispatcher un événement pour mettre à jour le HUD
    window.dispatchEvent(new CustomEvent('floor-changed', { detail: { floor: newFloor } }))
  }

  // Écouter les événements de changement d'étage depuis le HUD
  useEffect(() => {
    const handleFloorChangeEvent = (e: CustomEvent) => {
      setCurrentFloor(e.detail.floor)
    }
    window.addEventListener('change-floor', handleFloorChangeEvent as EventListener)
    return () => window.removeEventListener('change-floor', handleFloorChangeEvent as EventListener)
  }, [])

  // Obtenir les œuvres pour l'étage actuel
  const currentArtworks = currentFloor === 0 
    ? organizedArtworks.floor0 
    : currentFloor === 1 
    ? organizedArtworks.floor1 
    : organizedArtworks.floor2

  const artworkPositions = calculateArtworkPositions(currentArtworks, currentFloor)

  return (
    <>
      {/* Lumières */}
      <Lighting shadowsEnabled={shadowsEnabled} />

      {/* Environnement multi-étages */}
      <MultiFloor currentFloor={currentFloor} />

      {/* Brouillard atmosphérique */}
      {fogEnabled && <fog attach="fog" args={["#1a1a1a", 1, 60]} />}

      {/* Escaliers */}
      {currentFloor < 2 && (
        <Stairs
          position={[20, currentFloor * 12, 20]}
          targetFloor={currentFloor + 1}
          onUse={() => handleFloorChange(currentFloor + 1)}
        />
      )}
      {currentFloor > 0 && (
        <Stairs
          position={[-20, currentFloor * 12, 20]}
          targetFloor={currentFloor - 1}
          onUse={() => handleFloorChange(currentFloor - 1)}
        />
      )}

      {/* Œuvres d'art de l'étage actuel */}
      {artworkPositions.map((item, index) => (
        <Painting
          key={`${currentFloor}-${item.oeuvre.id}`}
          position={item.pos}
          rotation={item.rot}
          title={item.oeuvre.titre}
          artist={item.oeuvre.artiste}
          description={item.oeuvre.description}
          year={item.oeuvre.type}
          imageUrl={item.oeuvre.image}
          imageAttribution=""
          oeuvreId={item.oeuvre.id}
        />
      ))}

      {/* Contrôleur de caméra avec ajustement de hauteur */}
      <CameraController 
        sensitivity={sensitivity} 
        baseSpeed={baseSpeed}
        floorHeight={currentFloor * 12}
      />
    </>
  )
}