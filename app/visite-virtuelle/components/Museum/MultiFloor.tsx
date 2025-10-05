"use client"

import { Floor } from "./Floor"
import { Walls } from "./Walls"
import { Ceiling } from "./Ceiling"

interface MultiFloorProps {
  currentFloor: number
}

export function MultiFloor({ currentFloor }: MultiFloorProps) {
  const floorHeight = 12 // Hauteur entre chaque étage

  return (
    <>
      {/* Rez-de-chaussée (Étage 0) */}
      {currentFloor === 0 && (
        <>
          <Floor yPosition={0} />
          <Walls yPosition={0} />
          <Ceiling yPosition={0} />
        </>
      )}

      {/* Premier étage */}
      {currentFloor === 1 && (
        <>
          <Floor yPosition={floorHeight} />
          <Walls yPosition={floorHeight} />
          <Ceiling yPosition={floorHeight} />
        </>
      )}

      {/* Deuxième étage */}
      {currentFloor === 2 && (
        <>
          <Floor yPosition={floorHeight * 2} />
          <Walls yPosition={floorHeight * 2} />
          <Ceiling yPosition={floorHeight * 2} />
        </>
      )}
    </>
  )
}