"use client"

import { useState, useEffect } from "react"
import { Settings } from "./Settings"
import { MiniMap } from "./MiniMap"
import { MobileControls } from "./MobileControls"

export function HUD() {
  const [showSettings, setShowSettings] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentFloor, setCurrentFloor] = useState(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Écouter les changements d'étage
    const handleFloorChange = (e: CustomEvent) => {
      setCurrentFloor(e.detail.floor)
    }
    window.addEventListener('floor-changed', handleFloorChange as EventListener)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('floor-changed', handleFloorChange as EventListener)
    }
  }, [])

  const changeFloor = (floor: number) => {
    window.dispatchEvent(new CustomEvent('change-floor', { detail: { floor } }))
  }

  const handleMobileMove = (forward: number, right: number) => {
    window.dispatchEvent(new CustomEvent('mobile-move', { detail: { forward, right } }))
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 select-none">
      {/* En-tête */}
      <div className="absolute top-0 left-0 right-0 p-3 md:p-6 flex items-start justify-between">
        {/* Titre */}
        <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md text-white px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl border border-amber-600/30 pointer-events-auto shadow-2xl">
          <h1 className="text-base md:text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
            <span className="text-xl md:text-3xl">🏛️</span>
            <span className="hidden sm:inline">Musée des Civilisations Noires</span>
            <span className="sm:hidden">MCN</span>
          </h1>
          <p className="text-amber-300/70 text-xs md:text-sm mt-1 hidden sm:block">Visite Virtuelle Immersive</p>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-2 md:gap-3 pointer-events-auto">
          <button
            onClick={() => setShowMap(!showMap)}
            className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md hover:from-black/90 hover:to-black/70 text-white p-2 md:p-4 rounded-lg md:rounded-xl border border-amber-600/30 transition-all transform hover:scale-105 shadow-xl"
            title="Carte"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md hover:from-black/90 hover:to-black/70 text-white p-2 md:p-4 rounded-lg md:rounded-xl border border-amber-600/30 transition-all transform hover:scale-105 shadow-xl"
            title="Paramètres"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sélecteur d'étage */}
      <div className="absolute top-24 right-6 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md text-white p-4 rounded-xl border border-amber-600/30 pointer-events-auto shadow-2xl">
        <h3 className="text-sm font-bold mb-2 text-amber-400">🏢 Étage</h3>
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((floor) => (
            <button
              key={floor}
              onClick={() => changeFloor(floor)}
              className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                currentFloor === floor
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300'
              }`}
            >
              {floor === 0 ? 'RDC' : `Étage ${floor}`}
            </button>
          ))}
        </div>
      </div>

      {/* Contrôles (bas gauche) - Masqué sur mobile */}
      {!isMobile && (
        <div className="absolute bottom-6 left-6 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md text-white p-5 rounded-2xl border border-amber-600/30 pointer-events-auto shadow-2xl max-w-xs">
        <h3 className="text-lg font-bold mb-3 text-amber-400">⌨️ Contrôles</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-3">
            <kbd className="px-3 py-1 bg-amber-600/30 rounded-lg border border-amber-600/50 font-mono text-xs">W/↑</kbd>
            <span className="text-gray-300">Avancer</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-3 py-1 bg-amber-600/30 rounded-lg border border-amber-600/50 font-mono text-xs">S/↓</kbd>
            <span className="text-gray-300">Reculer</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-3 py-1 bg-amber-600/30 rounded-lg border border-amber-600/50 font-mono text-xs">A/←</kbd>
            <kbd className="px-3 py-1 bg-amber-600/30 rounded-lg border border-amber-600/50 font-mono text-xs">D/→</kbd>
            <span className="text-gray-300">Tourner</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-3 py-1 bg-amber-600/30 rounded-lg border border-amber-600/50 font-mono text-xs">Shift</kbd>
            <span className="text-gray-300">Courir</span>
          </div>
          <div className="flex items-center gap-3">
            <kbd className="px-3 py-1 bg-amber-600/30 rounded-lg border border-amber-600/50 font-mono text-xs">Clic</kbd>
            <span className="text-gray-300">Regarder autour</span>
          </div>
        </div>
        </div>
      )}

      {/* Contrôles mobiles */}
      <MobileControls onMove={handleMobileMove} />

      {/* Stats (bas droite) */}
      <div className="absolute bottom-6 right-6 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-md text-white p-3 md:p-5 rounded-xl md:rounded-2xl border border-amber-600/30 pointer-events-auto shadow-2xl">
        <div className="space-y-1 md:space-y-2 font-mono text-xs md:text-sm">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <span className="text-amber-400">FPS:</span>
            <span id="fps" className="text-green-400 font-bold">60</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-amber-400">Position:</span>
            <span id="pos" className="text-blue-400 text-xs">X: 0.0 Z: 10.0</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-amber-400">Œuvres:</span>
            <span id="visited" className="text-purple-400 font-bold">0/17</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-amber-400">Étage:</span>
            <span className="text-cyan-400 font-bold">{currentFloor === 0 ? 'RDC' : currentFloor}</span>
          </div>
        </div>
      </div>

      {/* Réticule central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative w-8 h-8">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-400/70 transform -translate-y-1/2"></div>
          <div className="absolute left-1/2 top-0 w-0.5 h-full bg-amber-400/70 transform -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 border-2 border-amber-400/70 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Panneaux conditionnels */}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      {showMap && <MiniMap onClose={() => setShowMap(false)} />}
    </div>
  )
}