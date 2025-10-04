"use client"

import { useState } from "react"
import { MapPin, Maximize2, Navigation } from "lucide-react"

interface MuseumMapProps {
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

export function MuseumMap({ location, titre }: MuseumMapProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const artworks = [
    { name: "Masque Baoulé", room: "Nord", pos: { x: 200, y: 40 } },
    { name: "Trône Ashanti", room: "Nord", pos: { x: 260, y: 40 } },
    { name: "Textile Kente", room: "Nord", pos: { x: 140, y: 40 } },
    { name: "Djembé Traditionnel", room: "Ouest", pos: { x: 40, y: 150 } },
    { name: "Sculpture Dogon", room: "Ouest", pos: { x: 40, y: 190 } },
    { name: "Parure Royale", room: "Ouest", pos: { x: 40, y: 110 } },
    { name: "Photographie Moderne", room: "Est", pos: { x: 360, y: 150 } },
    { name: "Poterie Ancienne", room: "Est", pos: { x: 360, y: 190 } },
    { name: "Art Contemporain", room: "Est", pos: { x: 360, y: 110 } },
    { name: "Bijoux Akan", room: "Sud", pos: { x: 200, y: 260 } },
    { name: "Statuette Yoruba", room: "Sud", pos: { x: 260, y: 260 } },
    { name: "Masque Fang", room: "Sud", pos: { x: 140, y: 260 } },
  ]

  const rooms = [
    { name: "Nord", color: "#ff6b6b", bounds: { x: 80, y: 20, w: 240, h: 80 } },
    { name: "Ouest", color: "#4ecdc4", bounds: { x: 20, y: 80, w: 80, h: 140 } },
    { name: "Est", color: "#ffe66d", bounds: { x: 300, y: 80, w: 80, h: 140 } },
    { name: "Sud", color: "#95e1d3", bounds: { x: 80, y: 220, w: 240, h: 80 } },
  ]

  const currentArtwork = artworks.find(a => a.name === titre)

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-black/95 p-8' : 'relative'}`}>
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-amber-600/20">
        <div className="bg-gradient-to-r from-amber-600/20 to-amber-800/20 backdrop-blur-sm p-6 border-b border-amber-600/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-amber-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Plan du Musée MCN</h3>
                <p className="text-amber-200/80 text-sm">Localisation interactive</p>
              </div>
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all"
            >
              <Maximize2 className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-amber-600/10 to-amber-800/10 p-4 rounded-xl border border-amber-600/20">
              <p className="text-amber-300/80 text-xs uppercase tracking-wider mb-1">Étage</p>
              <p className="text-white font-bold text-lg">{location.etage}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-600/10 to-amber-800/10 p-4 rounded-xl border border-amber-600/20">
              <p className="text-amber-300/80 text-xs uppercase tracking-wider mb-1">Salle</p>
              <p className="text-white font-bold text-lg">{location.salle}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-600/10 to-amber-800/10 p-4 rounded-xl border border-amber-600/20">
              <p className="text-amber-300/80 text-xs uppercase tracking-wider mb-1">Œuvres</p>
              <p className="text-white font-bold text-lg">12</p>
            </div>
          </div>

          <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl overflow-hidden shadow-2xl border border-amber-600/20">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <defs>
                <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#1e293b", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#0f172a", stopOpacity: 1 }} />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <radialGradient id="spotlight">
                  <stop offset="0%" style={{ stopColor: "#fbbf24", stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: "#fbbf24", stopOpacity: 0 }} />
                </radialGradient>
              </defs>

              <rect x="0" y="0" width="400" height="300" fill="url(#floorGradient)" />

              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
              <rect x="0" y="0" width="400" height="300" fill="url(#grid)" />

              <rect x="15" y="15" width="370" height="270" fill="none" stroke="#d97706" strokeWidth="4" opacity="0.6" />
              <rect x="18" y="18" width="364" height="264" fill="none" stroke="#b45309" strokeWidth="2" opacity="0.4" />

              {rooms.map((room) => {
                const isHovered = hoveredRoom === room.name
                const isCurrent = currentArtwork?.room === room.name
                
                return (
                  <g key={room.name}>
                    <rect
                      x={room.bounds.x}
                      y={room.bounds.y}
                      width={room.bounds.w}
                      height={room.bounds.h}
                      fill={isHovered || isCurrent ? room.color : "#1e293b"}
                      stroke={room.color}
                      strokeWidth={isCurrent ? "3" : "2"}
                      opacity={isHovered ? 0.4 : isCurrent ? 0.3 : 0.2}
                      className="transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredRoom(room.name)}
                      onMouseLeave={() => setHoveredRoom(null)}
                      rx="8"
                    />
                    
                    <text
                      x={room.bounds.x + room.bounds.w / 2}
                      y={room.bounds.y + room.bounds.h / 2}
                      textAnchor="middle"
                      className="text-sm font-bold uppercase tracking-wider pointer-events-none"
                      fill={isHovered || isCurrent ? room.color : "#64748b"}
                      opacity={isHovered || isCurrent ? 1 : 0.6}
                    >
                      {room.name}
                    </text>

                    {isCurrent && (
                      <circle
                        cx={room.bounds.x + room.bounds.w / 2}
                        cy={room.bounds.y + room.bounds.h / 2}
                        r={Math.max(room.bounds.w, room.bounds.h) * 0.7}
                        fill="url(#spotlight)"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                )
              })}

              {artworks.map((artwork, idx) => {
                const isCurrent = artwork.name === titre
                const artworkColor = rooms.find(r => r.name === artwork.room)?.color || "#fbbf24"
                
                return (
                  <g key={idx} filter={isCurrent ? "url(#glow)" : ""}>
                    <circle
                      cx={artwork.pos.x}
                      cy={artwork.pos.y}
                      r={isCurrent ? 8 : 5}
                      fill={artworkColor}
                      opacity={isCurrent ? 1 : 0.7}
                      className="transition-all duration-300"
                    />
                    
                    {isCurrent && (
                      <>
                        <circle
                          cx={artwork.pos.x}
                          cy={artwork.pos.y}
                          r="15"
                          fill="none"
                          stroke={artworkColor}
                          strokeWidth="2"
                          opacity="0.6"
                          className="animate-ping"
                        />
                        <circle
                          cx={artwork.pos.x}
                          cy={artwork.pos.y}
                          r="12"
                          fill="none"
                          stroke={artworkColor}
                          strokeWidth="2"
                          opacity="0.8"
                        />
                      </>
                    )}
                    
                    <circle
                      cx={artwork.pos.x}
                      cy={artwork.pos.y}
                      r={isCurrent ? 4 : 2}
                      fill="white"
                    />
                  </g>
                )
              })}

              <g>
                <rect x="180" y="295" width="40" height="5" fill="#10b981" rx="2"/>
                <text x="200" y="293" textAnchor="middle" className="text-xs font-bold" fill="#10b981">
                  ENTRÉE
                </text>
              </g>

              <g transform="translate(350, 30)">
                <circle cx="0" cy="0" r="20" fill="#0f172a" opacity="0.8" stroke="#d97706" strokeWidth="2"/>
                <polygon points="0,-12 -4,8 0,4 4,8" fill="#ef4444"/>
                <polygon points="0,-12 -4,8 0,4 4,8" fill="#3b82f6" transform="rotate(180)"/>
                <text y="-25" textAnchor="middle" className="text-xs font-bold" fill="#fbbf24">N</text>
              </g>
            </svg>

            {hoveredRoom && (
              <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-md px-4 py-3 rounded-lg border border-amber-600/30 shadow-xl">
                <p className="text-white font-semibold">{hoveredRoom}</p>
                <p className="text-amber-300/80 text-sm">
                  {artworks.filter(a => a.room === hoveredRoom).length} œuvre(s)
                </p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-amber-600/10 to-transparent p-4 rounded-xl border border-amber-600/20 flex items-start gap-3">
            <Navigation className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium text-sm mb-1">
                Vous êtes ici : <span className="text-amber-400">{titre}</span>
              </p>
              <p className="text-slate-400 text-xs">
                Le point lumineux indique l'emplacement exact de l'œuvre dans la salle {location.salle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}