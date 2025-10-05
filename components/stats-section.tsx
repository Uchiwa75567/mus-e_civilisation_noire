"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Eye, Calendar, Trophy } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

export function StatsSection() {
  const [stats, setStats] = useState({
    oeuvres: 0,
    expositions: 0,
    evenements: 0,
    visiteurs: 0
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [oeuvresRes, expositionsRes, evenementsRes] = await Promise.all([
          fetch("/api/oeuvres").catch(() => null),
          fetch("/api/expositions").catch(() => null),
          fetch("/api/evenements").catch(() => null),
        ])

        const oeuvres = oeuvresRes && oeuvresRes.ok ? await oeuvresRes.json() : []
        const expositions = expositionsRes && expositionsRes.ok ? await expositionsRes.json() : []
        const evenements = evenementsRes && evenementsRes.ok ? await evenementsRes.json() : []

        if (!cancelled) {
          setStats({
            oeuvres: Array.isArray(oeuvres) ? oeuvres.length : 0,
            expositions: Array.isArray(expositions) ? expositions.length : 0,
            evenements: Array.isArray(evenements) ? evenements.length : 0,
            visiteurs: 15420,
          })
          setError(null)
        }
      } catch (e) {
        if (!cancelled) setError("Impossible de charger les statistiques")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
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

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner className="h-10 w-10 text-white" />
          </div>
        ) : (
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
        )}

        <div className="text-center mt-12">
          {error ? (
            <p className="text-red-300">{error}</p>
          ) : (
            <p className="text-white/80 max-w-3xl mx-auto leading-relaxed">
              Ces chiffres témoignent de notre engagement à préserver et promouvoir le patrimoine culturel africain,
              en rendant accessible à tous la richesse et la diversité des civilisations noires.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
