"use client"

interface LightingProps {
  shadowsEnabled: boolean
}

export function Lighting({ shadowsEnabled }: LightingProps) {
  return (
    <>
      {/* Lumière ambiante */}
      <ambientLight intensity={0.4} />

      {/* Lumière directionnelle principale */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.8}
        castShadow={shadowsEnabled}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* Lumières d'accentuation sur les murs */}
      <spotLight
        position={[0, 10, -25]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        castShadow={shadowsEnabled}
        color="#FFF8DC"
      />
      <spotLight
        position={[0, 10, 25]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        castShadow={shadowsEnabled}
        color="#FFF8DC"
      />
      <spotLight
        position={[-25, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        castShadow={shadowsEnabled}
        color="#FFF8DC"
      />
      <spotLight
        position={[25, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.5}
        castShadow={shadowsEnabled}
        color="#FFF8DC"
      />

      {/* Lumières ponctuelles pour l'ambiance */}
      <pointLight position={[0, 8, 0]} intensity={0.5} color="#FFE4B5" />
      <pointLight position={[15, 6, 15]} intensity={0.3} color="#FFE4B5" />
      <pointLight position={[-15, 6, -15]} intensity={0.3} color="#FFE4B5" />
      <pointLight position={[15, 6, -15]} intensity={0.3} color="#FFE4B5" />
      <pointLight position={[-15, 6, 15]} intensity={0.3} color="#FFE4B5" />
    </>
  )
}