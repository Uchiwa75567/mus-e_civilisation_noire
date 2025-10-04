"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Image, Calendar, Users, MapPin, Music } from "lucide-react"
import { expositions, oeuvres, evenements, billets } from "@/lib/data"

export default function StatsPage() {
  const [stats, setStats] = useState({
    totalOeuvres: 0,
    totalExpositions: 0,
    totalEvenements: 0,
    totalBillets: 0,
    oeuvresByType: {} as Record<string, number>,
    expositionsByCategory: {} as Record<string, number>,
  })

  useEffect(() => {
    // Calculate stats
    const oeuvresByType = oeuvres.reduce((acc, oeuvre) => {
      acc[oeuvre.type] = (acc[oeuvre.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const expositionsByCategory = expositions.reduce((acc, expo) => {
      acc[expo.categorie] = (acc[expo.categorie] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    setStats({
      totalOeuvres: oeuvres.length,
      totalExpositions: expositions.length,
      totalEvenements: evenements.length,
      totalBillets: billets.length,
      oeuvresByType,
      expositionsByCategory,
    })
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <BarChart3 className="mx-auto h-16 w-16 text-primary mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
              Statistiques du Musée
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez les chiffres clés de la collection du Musée des Civilisations Noires
            </p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <Image className="mx-auto h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-2xl">{stats.totalOeuvres}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Œuvres dans la collection</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <MapPin className="mx-auto h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-2xl">{stats.totalExpositions}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Expositions actives</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Calendar className="mx-auto h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-2xl">{stats.totalEvenements}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Événements programmés</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="mx-auto h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-2xl">{stats.totalBillets}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Types de billets</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="text-primary" size={20} />
                    Œuvres par Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats.oeuvresByType).map(([type, count]) => (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm">{type}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="text-primary" size={20} />
                    Expositions par Catégorie
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats.expositionsByCategory).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm">{category}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Stats */}
            <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-center">À propos du Musée</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Le Musée des Civilisations Noires présente une collection exceptionnelle d'art et d'artisanat africains,
                  témoignant de la richesse et de la diversité des cultures du continent.
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span>📍 Dakar, Sénégal</span>
                  <span>🕒 Ouvert tous les jours</span>
                  <span>🎫 Billetterie en ligne</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
