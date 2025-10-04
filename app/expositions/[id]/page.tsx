"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Exposition, Oeuvre } from "@/lib/types"
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react"
import { oeuvres } from "@/lib/data"
import { VirtualGallery } from "@/components/virtual-gallery"
import { QrCode } from "lucide-react"

export default function ExpositionDetailPage() {
  const params = useParams()
  const [exposition, setExposition] = useState<Exposition | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedOeuvres, setRelatedOeuvres] = useState<Oeuvre[]>([])

  useEffect(() => {
    if (params.id) {
      fetch(`/api/expositions/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setExposition(data)
          // Get related artworks
          const related = oeuvres.filter((o) => o.expositionId === params.id)
          setRelatedOeuvres(related)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 lg:px-8 py-20 text-center">Chargement...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!exposition) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Exposition non trouvée</h1>
            <Button asChild>
              <Link href="/expositions">Retour aux expositions</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Image */}
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={exposition.image || "/placeholder.svg"}
            alt={exposition.titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto px-4 lg:px-8">
              <Button asChild variant="ghost" className="mb-4 text-white hover:text-white hover:bg-white/20">
                <Link href="/expositions">
                  <ArrowLeft className="mr-2" size={16} />
                  Retour aux expositions
                </Link>
              </Button>
              <Badge className="mb-4">{exposition.categorie}</Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-playfair)] mb-4">
                {exposition.titre}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
                  À propos de l'exposition
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{exposition.description}</p>

                {relatedOeuvres.length > 0 && (
                  <div className="mb-12">
                    <VirtualGallery oeuvres={relatedOeuvres} expositionTitre={exposition.titre} />
                  </div>
                )}

                {relatedOeuvres.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
                      Œuvres présentées
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {relatedOeuvres.map((oeuvre) => (
                        <Card key={oeuvre.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={oeuvre.image || "/placeholder.svg"}
                              alt={oeuvre.titre}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-lg">{oeuvre.titre}</CardTitle>
                            <p className="text-sm text-muted-foreground">{oeuvre.artiste}</p>
                          </CardHeader>
                          <CardContent>
                            <Button asChild variant="outline" className="w-full bg-transparent" size="sm">
                              <Link href={`/oeuvres/${oeuvre.id}`}>Voir les détails</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations pratiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Dates</p>
                        <p className="text-sm text-muted-foreground">
                          Du {new Date(exposition.dateDebut).toLocaleDateString("fr-FR")} au{" "}
                          {new Date(exposition.dateFin).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Lieu</p>
                        <p className="text-sm text-muted-foreground">Musée des Civilisations Noires, Dakar</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Horaires</p>
                        <p className="text-sm text-muted-foreground">
                          Mardi - Dimanche
                          <br />
                          9h00 - 18h00
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle>Réservez votre visite</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4 opacity-90">Achetez vos billets en ligne et évitez la file d'attente</p>
                    <Button asChild className="w-full bg-white text-black hover:bg-white/90">
                      <Link href="/billetterie">Acheter un billet</Link>
                    </Button>
                  </CardContent>
                </Card>

                {exposition?.qrCode && relatedOeuvres.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="text-primary" size={20} />
                        Accès Direct aux Œuvres
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Code QR</span>
                        <span className="font-medium">{exposition.qrCode}</span>
                      </div>
                      <div className="w-full h-24 bg-white rounded flex items-center justify-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=96x96&data=${encodeURIComponent(exposition.qrCode)}`}
                          alt="QR Code Exposition"
                          className="w-full h-full rounded"
                        />
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/oeuvres/${relatedOeuvres[0].id}`}>
                          Voir la première œuvre
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
