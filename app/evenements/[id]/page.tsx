"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import type { Evenement } from "@/lib/types"
import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react"

export default function EvenementDetailPage() {
  const params = useParams()
  const [evenement, setEvenement] = useState<Evenement | null>(null)
  const [loading, setLoading] = useState(true)
  const [registrationStatus, setRegistrationStatus] = useState<"idle" | "loading" | "success">("idle")
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    nombrePersonnes: "1",
  })

  useEffect(() => {
    if (params.id) {
      fetch(`/api/evenements/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setEvenement(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [params.id])

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegistrationStatus("loading")

    // Simulate registration
    setTimeout(() => {
      setRegistrationStatus("success")
      setFormData({ nom: "", email: "", telephone: "", nombrePersonnes: "1" })
    }, 1000)
  }

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

  if (!evenement) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16">
          <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
            <h1 className="text-3xl font-bold mb-4">Événement non trouvé</h1>
            <Button asChild>
              <Link href="/evenements">Retour aux événements</Link>
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
        <section className="relative h-[50vh] overflow-hidden">
          <img
            src={evenement.image || "/placeholder.svg"}
            alt={evenement.titre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto px-4 lg:px-8">
              <Button asChild variant="ghost" className="mb-4 text-white hover:text-white hover:bg-white/20">
                <Link href="/evenements">
                  <ArrowLeft className="mr-2" size={16} />
                  Retour aux événements
                </Link>
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
                {evenement.titre}
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
                  À propos de l'événement
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">{evenement.description}</p>

                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Informations importantes</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• L'inscription est gratuite mais obligatoire</li>
                    <li>• Les places sont limitées</li>
                    <li>• Merci d'arriver 15 minutes avant le début</li>
                    <li>• Une confirmation vous sera envoyée par email</li>
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Détails de l'événement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(evenement.date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Horaire</p>
                        <p className="text-sm text-muted-foreground">14h00 - 17h00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Lieu</p>
                        <p className="text-sm text-muted-foreground">{evenement.lieu}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Capacité</p>
                        <p className="text-sm text-muted-foreground">Places limitées</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle>Inscription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {registrationStatus === "success" ? (
                      <div className="text-center py-4">
                        <p className="font-medium mb-2">Inscription confirmée!</p>
                        <p className="text-sm opacity-90">Vous recevrez un email de confirmation</p>
                      </div>
                    ) : (
                      <form onSubmit={handleRegistration} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="nom" className="text-primary-foreground">
                            Nom complet
                          </Label>
                          <Input
                            id="nom"
                            value={formData.nom}
                            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                            required
                            className="bg-white text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-primary-foreground">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="bg-white text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telephone" className="text-primary-foreground">
                            Téléphone
                          </Label>
                          <Input
                            id="telephone"
                            type="tel"
                            value={formData.telephone}
                            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                            required
                            className="bg-white text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nombrePersonnes" className="text-primary-foreground">
                            Nombre de personnes
                          </Label>
                          <Input
                            id="nombrePersonnes"
                            type="number"
                            min="1"
                            max="10"
                            value={formData.nombrePersonnes}
                            onChange={(e) => setFormData({ ...formData, nombrePersonnes: e.target.value })}
                            required
                            className="bg-white text-black"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-white text-black hover:bg-white/90"
                          disabled={registrationStatus === "loading"}
                        >
                          {registrationStatus === "loading" ? "Inscription..." : "S'inscrire"}
                        </Button>
                      </form>
                    )}
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
