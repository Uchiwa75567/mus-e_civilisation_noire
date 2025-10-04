"use client"

import { useRef } from "react"
import { Floor } from "./Museum/Floor"
import { Walls } from "./Museum/Walls"
import { Ceiling } from "./Museum/Ceiling"
import { Lighting } from "./Museum/Lighting"
import { Painting } from "./Artworks/Painting"
import { CameraController } from "./CameraController"
import { Fog } from "three"

interface SceneProps {
  sensitivity: number
  baseSpeed: number
  fogEnabled: boolean
  shadowsEnabled: boolean
}

export function Scene({ sensitivity, baseSpeed, fogEnabled, shadowsEnabled }: SceneProps) {
  const paintingsData = [
    { 
      pos: [0, 4, -29.7] as [number, number, number], 
      rot: [0, 0, 0] as [number, number, number], 
      title: "Masque Baoulé",
      artist: "Artisan Baoulé",
      description: "Masque cérémoniel traditionnel de la culture Baoulé de Côte d'Ivoire, utilisé lors des rituels sacrés.",
      year: "XIXe siècle",
      imageUrl: "https://images.unsplash.com/photo-1719169396058-0afb3bf33dd3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxhZnJpY2FuJTIwbWFzayUyMHdvb2RlbiUyMG1hc2slMjB0cmliYWwlMjBhcnQlMjBjZXJlbW9uaWFsJTIwbWFza3xlbnwwfDF8fHwxNzU5NTk4NTY0fDA&ixlib=rb-4.1.0&q=85",
      imageAttribution: "The Cleveland Museum of Art on Unsplash"
    },
    { 
      pos: [10, 4, -29.7] as [number, number, number], 
      rot: [0, 0, 0] as [number, number, number], 
      title: "Trône Ashanti",
      artist: "Royaume Ashanti",
      description: "Trône royal du royaume Ashanti, symbole de pouvoir et de prestige.",
      year: "XVIIIe siècle",
      imageUrl: "https://images.unsplash.com/photo-1701206886274-f41d3abe0fc6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxhZnJpY2FuJTIwdGhyb25lJTIwZ29sZGVuJTIwc3Rvb2wlMjByb3lhbCUyMGZ1cm5pdHVyZSUyMGFzaGFudGl8ZW58MHwyfHx5ZWxsb3d8MTc1OTU5ODU2NHww&ixlib=rb-4.1.0&q=85",
      imageAttribution: "The Cleveland Museum of Art on Unsplash"
    },
    { 
      pos: [-10, 4, -29.7] as [number, number, number], 
      rot: [0, 0, 0] as [number, number, number], 
      title: "Textile Kente",
      artist: "Tisserands Akan",
      description: "Tissu royal aux motifs géométriques complexes, symbole de richesse et de statut.",
      year: "XXe siècle",
      imageUrl: "https://images.unsplash.com/photo-1730835359985-9ded86e12ccb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxrZW50ZSUyMGNsb3RoJTIwYWZyaWNhbiUyMHRleHRpbGUlMjB3b3ZlbiUyMGZhYnJpYyUyMGdlb21ldHJpYyUyMHBhdHRlcm5zfGVufDB8Mnx8fDE3NTk1OTg1NjR8MA&ixlib=rb-4.1.0&q=85",
      imageAttribution: "Virginia Commonwealth University Libraries on Unsplash"
    },
    { 
      pos: [-29.7, 4, 0] as [number, number, number], 
      rot: [0, Math.PI/2, 0] as [number, number, number], 
      title: "Djembé Traditionnel",
      artist: "Artisan Mandingue",
      description: "Instrument de percussion sacré utilisé dans les cérémonies et célébrations.",
      year: "XXe siècle",
      imageUrl: "https://images.unsplash.com/photo-1708512935636-36a3dba7cfc4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxkamVtYmUlMjBkcnVtJTIwYWZyaWNhbiUyMGRydW0lMjBwZXJjdXNzaW9uJTIwaW5zdHJ1bWVudCUyMHdvb2RlbiUyMGRydW18ZW58MHwxfHx8MTc1OTU5ODU2NHww&ixlib=rb-4.1.0&q=85",
      imageAttribution: "Nana Adwuma on Unsplash"
    },
    { 
      pos: [-29.7, 4, 10] as [number, number, number], 
      rot: [0, Math.PI/2, 0] as [number, number, number], 
      title: "Sculpture Dogon",
      artist: "Peuple Dogon",
      description: "Sculpture ancestrale représentant les esprits protecteurs du village.",
      year: "XVe siècle",
      imageUrl: "https://images.unsplash.com/photo-1700985958097-c75dea592121?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxkb2dvbiUyMHNjdWxwdHVyZSUyMGFmcmljYW4lMjBzdGF0dWUlMjB3b29kZW4lMjBjYXJ2aW5nJTIwdHJpYmFsJTIwYXJ0fGVufDB8MXx8fDE3NTk1OTg1NjR8MA&ixlib=rb-4.1.0&q=85",
      imageAttribution: "Jinish Shah on Unsplash"
    },
    { 
      pos: [-29.7, 4, -10] as [number, number, number], 
      rot: [0, Math.PI/2, 0] as [number, number, number], 
      title: "Parure Royale",
      artist: "Orfèvres Akan",
      description: "Bijoux et ornements portés par les membres de la cour royale.",
      year: "XVIIe siècle",
      imageUrl: "https://images.unsplash.com/photo-1606689518099-4437c5dd3b21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxhZnJpY2FuJTIwamV3ZWxyeSUyMGdvbGQlMjBuZWNrbGFjZSUyMHJveWFsJTIwb3JuYW1lbnRzJTIwYmVhZGVkJTIwamV3ZWxyeXxlbnwwfDJ8fHllbGxvd3wxNzU5NTk4NTY0fDA&ixlib=rb-4.1.0&q=85",
      imageAttribution: "Shamblen Studios on Unsplash"
    },
    { 
      pos: [29.7, 4, 0] as [number, number, number], 
      rot: [0, -Math.PI/2, 0] as [number, number, number], 
      title: "Photographie Moderne",
      artist: "Seydou Keïta",
      description: "Portrait photographique capturant l'élégance et la dignité africaine.",
      year: "1950",
      imageUrl: "https://images.unsplash.com/photo-1532334836699-88e90d97c8fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcG9ydHJhaXQlMjB2aW50YWdlJTIwcGhvdG9ncmFwaHklMjBlbGVnYW50JTIwcG9ydHJhaXQlMjBjdWx0dXJhbCUyMHBob3RvZ3JhcGh5fGVufDB8MXx8YmxhY2tfYW5kX3doaXRlfDE3NTk1OTg1Njd8MA&ixlib=rb-4.1.0&q=85",
      imageAttribution: "Joshua Oluwagbemiga on Unsplash"
    },
    { 
      pos: [29.7, 4, 10] as [number, number, number], 
      rot: [0, -Math.PI/2, 0] as [number, number, number], 
      title: "Poterie Ancienne",
      artist: "Artisans Nok",
      description: "Céramique ancienne aux formes élégantes et aux motifs symboliques.",
      year: "500 av. J.-C.",
      imageUrl: "https://images.unsplash.com/photo-1654399733889-0492421b115f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwcG90dGVyeSUyMHRlcnJhY290dGElMjB2ZXNzZWwlMjBhbmNpZW50JTIwY2VyYW1pY3MlMjBjbGF5JTIwcG90fGVufDB8Mnx8b3JhbmdlfDE3NTk1OTg1Njd8MA&ixlib=rb-4.1.0&q=85",
      imageAttribution: "Humberto Arce on Unsplash"
    },
    { 
      pos: [29.7, 4, -10] as [number, number, number], 
      rot: [0, -Math.PI/2, 0] as [number, number, number], 
      title: "Art Contemporain",
      artist: "El Anatsui",
      description: "Œuvre contemporaine explorant les thèmes de l'identité et de la mondialisation.",
      year: "2010",
      imageUrl: "https://images.unsplash.com/photo-1575905430170-00d272865e0a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxjb250ZW1wb3JhcnklMjBhZnJpY2FuJTIwYXJ0JTIwbW9kZXJuJTIwcGFpbnRpbmclMjBjb2xvcmZ1bCUyMGFydHdvcmslMjBhYnN0cmFjdCUyMGFydHxlbnwwfDJ8fHwxNzU5NTk4NTY4fDA&ixlib=rb-4.1.0&q=85",
      imageAttribution: "Steve Johnson on Unsplash"
    },
    { 
      pos: [0, 4, 29.7] as [number, number, number], 
      rot: [0, Math.PI, 0] as [number, number, number], 
      title: "Bijoux Akan",
      artist: "Orfèvres Akan",
      description: "Collection de bijoux en or symbolisant le pouvoir et la richesse.",
      year: "XVIIIe siècle",
      imageUrl: "https://images.unsplash.com/photo-1606689518099-4437c5dd3b21?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxha2FuJTIwZ29sZCUyMGFmcmljYW4lMjBnb2xkJTIwamV3ZWxyeSUyMGdvbGRlbiUyMG9ybmFtZW50cyUyMHRyYWRpdGlvbmFsJTIwamV3ZWxyeXxlbnwwfDJ8fHllbGxvd3wxNzU5NTk4NTY4fDA&ixlib=rb-4.1.0&q=85",
      imageAttribution: "Shamblen Studios on Unsplash"
    },
    { 
      pos: [10, 4, 29.7] as [number, number, number], 
      rot: [0, Math.PI, 0] as [number, number, number], 
      title: "Statuette Yoruba",
      artist: "Sculpteurs Yoruba",
      description: "Statuette représentant une divinité du panthéon Yoruba.",
      year: "XIXe siècle",
      imageUrl: "https://images.unsplash.com/photo-1696586904914-075bb15acc40?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHx5b3J1YmElMjBzdGF0dWUlMjBhZnJpY2FuJTIwZmlndXJpbmUlMjB3b29kZW4lMjBjYXJ2aW5nJTIwdHJpYmFsJTIwc2N1bHB0dXJlfGVufDB8MXx8fDE3NTk1OTg1Njh8MA&ixlib=rb-4.1.0&q=85",
      imageAttribution: "The Cleveland Museum of Art on Unsplash"
    },
    { 
      pos: [-10, 4, 29.7] as [number, number, number], 
      rot: [0, Math.PI, 0] as [number, number, number], 
      title: "Masque Fang",
      artist: "Peuple Fang",
      description: "Masque rituel utilisé lors des cérémonies d'initiation.",
      year: "XIXe siècle",
      imageUrl: "https://images.unsplash.com/photo-1606715895880-29abb9237bce?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxmYW5nJTIwbWFzayUyMHdoaXRlJTIwdHJpYmFsJTIwbWFzayUyMGdhYm9uJTIwbWFzayUyMGNlcmVtb25pYWwlMjBtYXNrfGVufDB8MXx8d2hpdGV8MTc1OTU5ODU2OHww&ixlib=rb-4.1.0&q=85",
      imageAttribution: "Girl with red hat on Unsplash"
    }
  ]

  return (
    <>
      {/* Lumières */}
      <Lighting shadowsEnabled={shadowsEnabled} />

      {/* Environnement */}
      <Floor />
      <Walls />
      <Ceiling />

      {/* Brouillard atmosphérique */}
      {fogEnabled && <fog attach="fog" args={["#1a1a1a", 1, 60]} />}

      {/* Œuvres d'art */}
      {paintingsData.map((painting, index) => (
        <Painting
          key={index}
          position={painting.pos}
          rotation={painting.rot}
          title={painting.title}
          artist={painting.artist}
          description={painting.description}
          year={painting.year}
          imageUrl={painting.imageUrl}
          imageAttribution={painting.imageAttribution}
        />
      ))}

      {/* Contrôleur de caméra */}
      <CameraController sensitivity={sensitivity} baseSpeed={baseSpeed} />
    </>
  )
}