"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Eye, Calendar, Trophy } from "lucide-react"

export function StatsSection() {
  const [stats, setStats] = useState({
    oeuvres: 0,
    expositions: 0,
    evenements: 0,
    visiteurs: 0
  })

  useEffect(() => {
    // Fetch stats from APIs
    Promise.all([
      fetch("/api/oeuvres").then(res => res.ok ? res.json() : []).catch(() => []),
      fetch("/api/expositions").then(res => res.json()),
      fetch("/api/evenements").then(res => res.json())
    ]).then(([oeuvres, expositions, evenements]) => {
      setStats({
        oeuvres: Array.isArray(oeuvres) ? oeuvres.length : 0,
        expositions: expositions.length,
        evenements: evenements.length,
        visiteurs: 15420 // Simulated visitor count
      })
    })
  }, [])

  const statItems = [
    {
      icon: Eye,
      value: stats.oeuvres,
      label: "Œuvres d'art",
      description: "Pièces uniques"
    },
    {
      icon: Calendar,
      value: stats.expositions,
      label: "Expositions",
      description: "Collections permanentes"
    },
    {
      icon: Trophy,
      value: stats.evenements,
      label: "Événements",
      description: "Activités culturelles"
    },
    {
      icon: Users,
      value: stats.visiteurs.toLocaleString(),
      label: "Visiteurs",
      description: "Depuis l'ouverture"
    }
  ]

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Le MCN en chiffres
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Découvrez l'impact et la richesse de notre collection à travers ces statistiques
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <Card key={index} className="bg-white/10 border-white/20 text-center hover:bg-white/20 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-full">
                    <item.icon size={32} className="text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-white">
                  {item.value}
                </div>
                <div className="text-lg font-semibold mb-1 text-white">
                  {item.label}
                </div>
                <div className="text-sm text-white/70">
                  {item.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/80 max-w-3xl mx-auto leading-relaxed">
            Ces chiffres témoignent de notre engagement à préserver et promouvoir le patrimoine culturel africain,
            en rendant accessible à tous la richesse et la diversité des civilisations noires.
          </p>
        </div>
      </div>
    </section>
  )
}
