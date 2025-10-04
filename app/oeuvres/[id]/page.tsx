"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Oeuvre, Exposition } from "@/lib/types"
import { ArrowLeft, Calendar, MapPin, Palette, Volume2, Video, QrCode } from "lucide-react"
import { oeuvres } from "@/lib/data"
import { MuseumMap } from "@/components/museum-map"

export default function OeuvreDetailPage() {
  const params = useParams()
  const [oeuvre, setOeuvre] = useState<Oeuvre | null>(null)
  const [exposition, setExposition] = useState<Exposition | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const foundOeuvre = oeuvres.find((o) => o.id === params.id)
      setOeuvre(foundOeuvre || null)

      if (foundOeuvre?.expositionId) {
        fetch(`/api/expositions/${foundOeuvre.expositionId}`)
          .then((res) => res.json())
          .then((data) => {
            setExposition(data)
            setLoading(false)
          })
          .catch(() => setLoading(false))
      } else {
        setLoading(false)
      }
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

  if (!oeuvre) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Œuvre non trouvée</h1>
            <Button asChild>
              <Link href="/">Retour à l'accueil</Link>
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
        {/* Breadcrumb */}
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <Button asChild variant="ghost" size="sm">
              <Link href={exposition ? `/expositions/${exposition.id}` : "/"}>
                <ArrowLeft className="mr-2" size={16} />
                {exposition ? `Retour à ${exposition.titre}` : "Retour"}
              </Link>
            </Button>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="relative">
                <div className="sticky top-24 space-y-6">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                    <img
                      src={oeuvre.image || "/placeholder.svg"}
                      alt={oeuvre.titre}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <QrCode className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Code QR</p>
                          <p className="text-xs text-muted-foreground">{oeuvre.qrCode}</p>
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-white rounded flex items-center justify-center self-end sm:self-auto">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=${encodeURIComponent(`${window.location.origin}/oeuvres/${oeuvre.id}`)}`}
                          alt="QR Code"
                          className="w-full h-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
                    {oeuvre.titre}
                  </h1>
                  <p className="text-2xl text-muted-foreground mb-4">{oeuvre.artiste}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{oeuvre.type}</Badge>
                  </div>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-playfair)]">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{oeuvre.description}</p>
                </div>

                {(oeuvre.audioUrl || oeuvre.videoUrl) && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Contenu multimédia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {oeuvre.audioUrl && (
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full bg-transparent justify-start" asChild>
                            <a href={oeuvre.audioUrl} target="_blank" rel="noopener noreferrer">
                              <Volume2 className="mr-2 h-4 w-4" />
                              Écouter le guide audio
                            </a>
                          </Button>
                          <audio controls className="w-full">
                            <source src={oeuvre.audioUrl} type="audio/mpeg" />
                            Votre navigateur ne supporte pas l'élément audio.
                          </audio>
                        </div>
                      )}
                      {oeuvre.videoUrl && (
                        <Button variant="outline" className="w-full bg-transparent justify-start" asChild>
                          <a href={oeuvre.videoUrl} target="_blank" rel="noopener noreferrer">
                            <Video className="mr-2 h-4 w-4" />
                            Regarder la vidéo
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="text-primary" size={20} />
                      Détails techniques
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Artiste</span>
                      <span className="font-medium">{oeuvre.artiste}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium">{oeuvre.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Code</span>
                      <span className="font-medium">{oeuvre.qrCode}</span>
                    </div>
                  </CardContent>
                </Card>

                <MuseumMap location={oeuvre.location} titre={oeuvre.titre} />

                {exposition && (
                  <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin size={20} />
                        Où voir cette œuvre
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="font-medium mb-1">{exposition.titre}</p>
                        <p className="text-sm opacity-90 flex items-center gap-2">
                          <Calendar size={14} />
                          Du {new Date(exposition.dateDebut).toLocaleDateString("fr-FR")} au{" "}
                          {new Date(exposition.dateFin).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <Button asChild className="w-full bg-white text-black hover:bg-white/90">
                        <Link href={`/expositions/${exposition.id}`}>Voir l'exposition</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>Visitez le musée</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Découvrez cette œuvre et bien d'autres lors de votre visite au Musée des Civilisations Noires
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/billetterie">Réserver un billet</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
