"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Exposition } from "@/lib/types"
import { Calendar } from "lucide-react"

export function ExpositionsSection() {
  const [expositions, setExpositions] = useState<Exposition[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/expositions")
      .then((res) => res.json())
      .then((data) => {
        setExpositions(data.filter((e: Exposition) => e.featured))
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section id="expositions" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">Chargement...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="expositions" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Expositions en cours
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explorez nos collections exceptionnelles qui célèbrent la richesse des civilisations africaines
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expositions.map((expo) => (
            <Card key={expo.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={expo.image || "/placeholder.svg"}
                  alt={expo.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {expo.categorie}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)]">{expo.titre}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(expo.dateDebut).toLocaleDateString("fr-FR")} -{" "}
                  {new Date(expo.dateFin).toLocaleDateString("fr-FR")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{expo.description}</p>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href={`/expositions/${expo.id}`}>En savoir plus</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/expositions">Voir toutes les expositions</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
