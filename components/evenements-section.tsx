"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Evenement } from "@/lib/types"
import { Calendar, MapPin } from "lucide-react"

export function EvenementsSection() {
  const [evenements, setEvenements] = useState<Evenement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/evenements")
      .then((res) => res.json())
      .then((data) => {
        setEvenements(data.slice(0, 3))
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section id="evenements" className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">Chargement...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="evenements" className="py-20 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Événements à venir
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Participez à nos événements culturels et découvrez la richesse des traditions africaines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {evenements.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img src={event.image || "/placeholder.svg"} alt={event.titre} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)] text-lg">{event.titre}</CardTitle>
                <CardDescription className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(event.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    {event.lieu}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{event.description}</p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={`/evenements/${event.id}`}>S'inscrire</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/evenements">Voir tous les événements</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
