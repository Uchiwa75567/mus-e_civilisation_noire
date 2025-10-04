"use client"

import { Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Stats } from "@react-three/drei"
import * as THREE from "three"
import { Scene } from "./visite-virtuelle/components/Scene"
import { HUD } from "./visite-virtuelle/components/UI/HUD"

// Gestion du compteur de visites
if (typeof window !== 'undefined') {
  let visited = 0
  window.addEventListener('painting-visited', () => {
    visited += 1
    const el = document.getElementById('visited')
    if (el) el.textContent = `${visited}/12`
  })
}

// Écran de chargement
function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
      <div className="relative">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-amber-600"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-4xl">🏛️</span>
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
        Chargement du musée virtuel
      </h2>
      <p className="mt-2 text-amber-300/70">Préparation de votre visite immersive...</p>
      <div className="mt-6 flex gap-2">
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  )
}

// Composant principal
export default function VisiteVirtuellePage() {
  useEffect(() => {
    // Empêcher le scroll de la page
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className="w-full h-screen relative bg-black overflow-hidden">
      <Canvas
        camera={{ 
          position: [0, 1.6, 10], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        shadows
        gl={{ 
          antialias: true, 
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true
        }}
        onCreated={({ gl, scene }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.2
          scene.background = new THREE.Color('#0a0a0a')
        }}
      >
        <Suspense fallback={null}>
          <Scene 
            sensitivity={1}
            baseSpeed={5}
            fogEnabled={true}
            shadowsEnabled={true}
          />
        </Suspense>
        <Stats />
      </Canvas>
      
      <HUD />

      {/* Message de bienvenue */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="bg-gradient-to-br from-black/90 to-black/80 backdrop-blur-md text-white px-8 py-6 rounded-2xl border-2 border-amber-600/30 shadow-2xl text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Bienvenue au MCN
          </h2>
          <p className="text-amber-300/80 text-sm">
            Cliquez et déplacez-vous pour explorer
          </p>
        </div>
      </div>
    </div>
  )
}