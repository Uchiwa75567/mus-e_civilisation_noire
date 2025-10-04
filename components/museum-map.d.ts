declare module 'components/museum-map' {
  import React from 'react'

  export interface MuseumMapProps {
    location: {
      salle: string
      etage: string
      position: {
        x: number
        y: number
      }
    }
    titre: string
  }

  export const MuseumMap: React.FC<MuseumMapProps>
}
