"use client"

interface MiniMapProps {
  onClose: () => void
  currentOeuvre?: string
}

export function MiniMap({ onClose, currentOeuvre }: MiniMapProps) {
  const artworks = [
    { name: "Masque Baoulé", pos: { x: 200, y: 40 } },
    { name: "Trône Ashanti", pos: { x: 260, y: 40 } },
    { name: "Textile Kente", pos: { x: 140, y: 40 } },
    { name: "Djembé Traditionnel", pos: { x: 40, y: 150 } },
    { name: "Sculpture Dogon", pos: { x: 40, y: 190 } },
    { name: "Parure Royale", pos: { x: 40, y: 110 } },
    { name: "Photographie Moderne", pos: { x: 360, y: 150 } },
    { name: "Poterie Ancienne", pos: { x: 360, y: 190 } },
    { name: "Art Contemporain", pos: { x: 360, y: 110 } },
    { name: "Bijoux Akan", pos: { x: 200, y: 260 } },
    { name: "Statuette Yoruba", pos: { x: 260, y: 260 } },
    { name: "Masque Fang", pos: { x: 140, y: 260 } },
  ]

  const currentArtwork = artworks.find(artwork => artwork.name === currentOeuvre)

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm pointer-events-auto">
      <div className="bg-gradient-to-br from-black/95 to-black/90 backdrop-blur-md text-white p-8 rounded-3xl border-2 border-amber-600/30 shadow-2xl max-w-3xl w-full mx-4">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            🗺️ Plan du Musée
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

        {/* Carte */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl overflow-hidden border-2 border-amber-600/20 shadow-inner">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {/* Fond */}
            <rect x="0" y="0" width="400" height="300" fill="#0f172a" />

            {/* Grille */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
            <rect x="0" y="0" width="400" height="300" fill="url(#grid)" />

            {/* Contour du musée */}
            <rect x="15" y="15" width="370" height="270" fill="none" stroke="#d97706" strokeWidth="3" opacity="0.8" rx="8" />

            {/* Salles */}
            <g>
              {/* Nord */}
              <rect x="80" y="20" width="240" height="80" fill="#1e293b" stroke="#ff6b6b" strokeWidth="2" opacity="0.3" rx="8" />
              <text x="200" y="65" textAnchor="middle" className="text-sm font-bold" fill="#ff6b6b">NORD</text>

              {/* Ouest */}
              <rect x="20" y="80" width="80" height="140" fill="#1e293b" stroke="#4ecdc4" strokeWidth="2" opacity="0.3" rx="8" />
              <text x="60" y="155" textAnchor="middle" className="text-sm font-bold" fill="#4ecdc4">OUEST</text>

              {/* Est */}
              <rect x="300" y="80" width="80" height="140" fill="#1e293b" stroke="#ffe66d" strokeWidth="2" opacity="0.3" rx="8" />
              <text x="340" y="155" textAnchor="middle" className="text-sm font-bold" fill="#ffe66d">EST</text>

              {/* Sud */}
              <rect x="80" y="220" width="240" height="80" fill="#1e293b" stroke="#95e1d3" strokeWidth="2" opacity="0.3" rx="8" />
              <text x="200" y="265" textAnchor="middle" className="text-sm font-bold" fill="#95e1d3">SUD</text>
            </g>

            {/* Œuvres */}
            {artworks.map((artwork, idx) => {
              const isCurrentOeuvre = artwork.name === currentOeuvre
              return (
                <g key={idx}>
                  <circle
                    cx={artwork.pos.x}
                    cy={artwork.pos.y}
                    r="6"
                    fill={isCurrentOeuvre ? "#ef4444" : "#fbbf24"}
                    opacity={isCurrentOeuvre ? "1" : "0.8"}
                    className="cursor-pointer hover:opacity-100"
                  />
                  <circle
                    cx={artwork.pos.x}
                    cy={artwork.pos.y}
                    r="3"
                    fill="white"
                  />
                  {/* Indicateur spécial pour l'œuvre actuelle */}
                  {isCurrentOeuvre && (
                    <>
                      {/* Cercle pulsant */}
                      <circle
                        cx={artwork.pos.x}
                        cy={artwork.pos.y}
                        r="12"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="2"
                        opacity="0.6"
                        className="animate-ping"
                      />
                      {/* Flèche pointant vers l'œuvre */}
                      <polygon
                        points={`${artwork.pos.x},${artwork.pos.y - 20} ${artwork.pos.x - 5},${artwork.pos.y - 10} ${artwork.pos.x + 5},${artwork.pos.y - 10}`}
                        fill="#ef4444"
                        opacity="0.8"
                      />
                      {/* Texte "VOUS ÊTES ICI" */}
                      <text
                        x={artwork.pos.x}
                        y={artwork.pos.y - 25}
                        textAnchor="middle"
                        className="text-xs font-bold"
                        fill="#ef4444"
                      >
                        VOUS ÊTES ICI
                      </text>
                    </>
                  )}
                </g>
              )
            })}

            {/* Entrée */}
            <rect x="180" y="295" width="40" height="5" fill="#10b981" rx="2"/>
            <text x="200" y="293" textAnchor="middle" className="text-xs font-bold" fill="#10b981">
              ENTRÉE
            </text>

            {/* Boussole */}
            <g transform="translate(350, 30)">
              <circle cx="0" cy="0" r="20" fill="#0f172a" opacity="0.8" stroke="#d97706" strokeWidth="2"/>
              <polygon points="0,-12 -4,8 0,4 4,8" fill="#ef4444"/>
              <text y="-25" textAnchor="middle" className="text-xs font-bold" fill="#fbbf24">N</text>
            </g>
          </svg>

          {/* Overlay d'information pour l'œuvre actuelle */}
          {currentArtwork && (
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-red-500/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-sm font-bold text-red-400">Position actuelle</span>
              </div>
              <p className="text-xs text-white/80 mt-1">{currentOeuvre}</p>
            </div>
          )}
        </div>

        {/* Légende */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-4 h-4 rounded-full bg-amber-400"></div>
            <span className="text-sm">Œuvre d'art</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm">Votre position</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm">Entrée</span>
          </div>
        </div>
      </div>
    </div>
  )
}
