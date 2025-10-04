"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Oeuvre } from "@/lib/types"
import { Eye, MapPin } from "lucide-react"

export function OeuvresSection() {
  const [oeuvres, setOeuvres] = useState<Oeuvre[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/oeuvres")
      .then((res) => res.json())
      .then((data) => {
        setOeuvres(data.slice(0, 6))
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">Chargement...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Œuvres emblématiques
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Découvrez quelques-unes de nos pièces maîtresses qui témoignent de la richesse artistique africaine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {oeuvres.map((oeuvre) => (
            <Card key={oeuvre.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={oeuvre.image || "/placeholder.svg"}
                  alt={oeuvre.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {oeuvre.type}
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button asChild size="sm" variant="secondary">
                    <Link href={`/oeuvres/${oeuvre.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Voir détails
                    </Link>
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)] text-lg">{oeuvre.titre}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span>Par {oeuvre.artiste}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{oeuvre.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin size={12} />
                    {oeuvre.location.salle}
                  </div>
                  <span>QR: {oeuvre.qrCode}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/oeuvres">Explorer toutes les œuvres</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
