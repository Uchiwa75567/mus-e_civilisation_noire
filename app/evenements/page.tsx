"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Evenement } from "@/lib/types"
import { Calendar, MapPin } from "lucide-react"

export default function EvenementsPage() {
  const [evenements, setEvenements] = useState<Evenement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/evenements")
      .then((res) => res.json())
      .then((data) => {
        setEvenements(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-muted to-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
              Événements Culturels
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Participez à nos événements et découvrez la richesse des traditions et de la culture africaine
            </p>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {loading ? (
              <div className="text-center py-12">Chargement des événements...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {evenements.map((event) => (
                  <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.titre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-[family-name:var(--font-playfair)]">{event.titre}</CardTitle>
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
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <Link href={`/evenements/${event.id}`}>En savoir plus</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && evenements.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">Aucun événement à venir pour le moment</div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
