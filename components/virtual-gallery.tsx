"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, Html } from "@react-three/drei"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"
import { useState } from "react"
import type { Oeuvre } from "@/lib/types"

interface VirtualGalleryProps {
  oeuvres: Oeuvre[]
  expositionTitre: string
}

function ArtworkFrame({ oeuvre, position }: { oeuvre: Oeuvre; position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[2.2, 1.5, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Artwork plane */}
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[2, 1.3]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      {/* Label */}
      <Html position={[0, -1, 0.1]} center>
        <div className="bg-background/90 backdrop-blur-sm px-3 py-2 rounded text-xs whitespace-nowrap border border-border">
          <p className="font-semibold">{oeuvre.titre}</p>
          <p className="text-muted-foreground">{oeuvre.artiste}</p>
        </div>
      </Html>
    </group>
  )
}

function GalleryScene({ oeuvres }: { oeuvres: Oeuvre[] }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.6, 5]} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <spotLight position={[-10, 10, -10]} angle={0.15} penumbra={1} intensity={0.5} />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Gallery room */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e5e5e5" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2.5, -5]}>
        <boxGeometry args={[20, 5, 0.1]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      {/* Artworks on wall */}
      {oeuvres.slice(0, 4).map((oeuvre, index) => (
        <ArtworkFrame key={oeuvre.id} oeuvre={oeuvre} position={[-6 + index * 4, 2, -4.9]} />
      ))}
    </>
  )
}

export function VirtualGallery({ oeuvres, expositionTitre }: VirtualGalleryProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Visite Virtuelle 3D</h3>
          <p className="text-sm text-muted-foreground">Explorez {expositionTitre} en 3D</p>
        </div>
        <Button variant="outline" size="sm" onClick={toggleFullscreen}>
          <Maximize2 className="h-4 w-4 mr-2" />
          {isFullscreen ? "Réduire" : "Plein écran"}
        </Button>
      </div>

      <div className={isFullscreen ? "fixed inset-0 z-50 bg-background" : "aspect-video"}>
        {isFullscreen && (
          <div className="absolute top-4 right-4 z-10">
            <Button variant="outline" onClick={toggleFullscreen}>
              Fermer
            </Button>
          </div>
        )}
        <Canvas shadows>
          <GalleryScene oeuvres={oeuvres} />
        </Canvas>
      </div>

      <div className="p-4 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          💡 Utilisez votre souris pour naviguer : clic gauche pour tourner, molette pour zoomer, clic droit pour vous
          déplacer
        </p>
      </div>
    </Card>
  )
}
