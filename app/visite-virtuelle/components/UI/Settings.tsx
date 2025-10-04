"use client"

import { useState } from "react"

interface SettingsProps {
  onClose: () => void
}

export function Settings({ onClose }: SettingsProps) {
  const [sensitivity, setSensitivity] = useState(50)
  const [speed, setSpeed] = useState(50)
  const [fog, setFog] = useState(true)
  const [shadows, setShadows] = useState(true)
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('high')

  const handleReset = () => {
    window.dispatchEvent(new Event('reset-camera'))
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto">
      <div className="bg-gradient-to-br from-black/95 to-black/90 backdrop-blur-md text-white p-8 rounded-3xl border-2 border-amber-600/30 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            ⚙️ Paramètres
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Sensibilité */}
          <div>
            <label className="block text-sm font-medium text-amber-300 mb-3">
              Sensibilité de la souris: {sensitivity}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Vitesse */}
          <div>
            <label className="block text-sm font-medium text-amber-300 mb-3">
              Vitesse de déplacement: {speed}%
            </label>
            <input
              type="range"
              min="20"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Qualité graphique */}
          <div>
            <label className="block text-sm font-medium text-amber-300 mb-3">
              Qualité graphique
            </label>
            <div className="flex gap-3">
              {(['low', 'medium', 'high'] as const).map((q) => (
                <button
                  key={q}
                  onClick={() => setQuality(q)}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                    quality === q
                      ? 'bg-amber-600 border-amber-600 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {q === 'low' ? 'Basse' : q === 'medium' ? 'Moyenne' : 'Haute'}
                </button>
              ))}
            </div>
          </div>

          {/* Options visuelles */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <span className="text-sm font-medium">Brouillard atmosphérique</span>
              <button
                onClick={() => setFog(!fog)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  fog ? 'bg-amber-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    fog ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <span className="text-sm font-medium">Ombres dynamiques</span>
              <button
                onClick={() => setShadows(!shadows)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  shadows ? 'bg-amber-600' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    shadows ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleReset}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 px-6 rounded-xl transition-all transform hover:scale-105 font-medium"
            >
              🔄 Réinitialiser position
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 py-3 px-6 rounded-xl transition-all transform hover:scale-105 font-medium"
            >
              ✓ Appliquer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}