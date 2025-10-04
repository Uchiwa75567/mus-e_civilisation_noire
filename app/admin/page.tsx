"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Exposition, Evenement } from "@/lib/types"
import { Calendar, Users, Ticket, TrendingUp, Plus, Edit, Trash2 } from "lucide-react"

export default function AdminPage() {
  const [expositions, setExpositions] = useState<Exposition[]>([])
  const [evenements, setEvenements] = useState<Evenement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetch("/api/expositions").then((r) => r.json()), fetch("/api/evenements").then((r) => r.json())])
      .then(([expos, events]) => {
        setExpositions(expos)
        setEvenements(events)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const stats = {
    totalExpositions: expositions.length,
    activeExpositions: expositions.filter((e) => new Date(e.dateFin) > new Date()).length,
    totalEvenements: evenements.length,
    upcomingEvenements: evenements.filter((e) => new Date(e.date) > new Date()).length,
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-background border-b border-border py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2 font-[family-name:var(--font-playfair)]">
                  Tableau de bord administrateur
                </h1>
                <p className="text-muted-foreground">Gérez les expositions, événements et contenus du musée</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Expositions totales</CardTitle>
                  <Calendar className="text-muted-foreground" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalExpositions}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stats.activeExpositions} actives</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Événements</CardTitle>
                  <Users className="text-muted-foreground" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.totalEvenements}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stats.upcomingEvenements} à venir</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Billets vendus</CardTitle>
                  <Ticket className="text-muted-foreground" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground mt-1">+12% ce mois</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Revenus</CardTitle>
                  <TrendingUp className="text-muted-foreground" size={20} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4.2M</div>
                  <p className="text-xs text-muted-foreground mt-1">FCFA ce mois</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Content Management */}
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="expositions" className="space-y-6">
              <TabsList>
                <TabsTrigger value="expositions">Expositions</TabsTrigger>
                <TabsTrigger value="evenements">Événements</TabsTrigger>
              </TabsList>

              <TabsContent value="expositions" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Gérer les expositions</h2>
                  <Button>
                    <Plus className="mr-2" size={16} />
                    Nouvelle exposition
                  </Button>
                </div>

                {loading ? (
                  <Card>
                    <CardContent className="py-12 text-center">Chargement...</CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {expositions.map((expo) => (
                      <Card key={expo.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <CardTitle className="font-[family-name:var(--font-playfair)]">{expo.titre}</CardTitle>
                                <Badge variant={expo.featured ? "default" : "secondary"}>
                                  {expo.featured ? "En vedette" : expo.categorie}
                                </Badge>
                              </div>
                              <CardDescription>
                                {new Date(expo.dateDebut).toLocaleDateString("fr-FR")} -{" "}
                                {new Date(expo.dateFin).toLocaleDateString("fr-FR")}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit size={16} />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{expo.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="evenements" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Gérer les événements</h2>
                  <Button>
                    <Plus className="mr-2" size={16} />
                    Nouvel événement
                  </Button>
                </div>

                {loading ? (
                  <Card>
                    <CardContent className="py-12 text-center">Chargement...</CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {evenements.map((event) => (
                      <Card key={event.id}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="font-[family-name:var(--font-playfair)] mb-2">
                                {event.titre}
                              </CardTitle>
                              <CardDescription>
                                {new Date(event.date).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}{" "}
                                • {event.lieu}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit size={16} />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}
