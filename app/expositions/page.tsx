"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Exposition } from "@/lib/types"
import { Calendar, Filter } from "lucide-react"

export default function ExpositionsPage() {
  const [expositions, setExpositions] = useState<Exposition[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    fetch("/api/expositions")
      .then((res) => res.json())
      .then((data) => {
        setExpositions(data)
        setLoading(false)
      })
  }, [])

  const categories = ["all", ...Array.from(new Set(expositions.map((e) => e.categorie)))]
  const filteredExpositions =
    selectedCategory === "all" ? expositions : expositions.filter((e) => e.categorie === selectedCategory)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-muted to-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
              Nos Expositions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explorez notre collection d'expositions qui célèbrent la richesse et la diversité des civilisations
              africaines
            </p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Filter size={16} />
                Filtrer par catégorie:
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === "all" ? "Toutes" : cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Expositions Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {loading ? (
              <div className="text-center py-12">Chargement des expositions...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredExpositions.map((expo) => (
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
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {expo.description}
                      </p>
                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <Link href={`/expositions/${expo.id}`}>Découvrir</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && filteredExpositions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Aucune exposition trouvée dans cette catégorie
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
