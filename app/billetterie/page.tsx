"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, CalendarIcon, Users, Clock, Info, Download, Mail } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { QRCodeDisplay } from "@/components/qr-code-display"
import { EmailConfigHelp } from "@/components/email-config-help"

const ticketTypes = [
  { id: "adulte", label: "Adulte", price: 5000, description: "À partir de 18 ans" },
  { id: "etudiant", label: "Étudiant", price: 2500, description: "Avec carte d'étudiant valide" },
  { id: "enfant", label: "Enfant", price: 1000, description: "6-17 ans" },
  { id: "gratuit", label: "Gratuit", price: 0, description: "Moins de 6 ans" },
]


export default function BilletteriePage() {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date>()
  const [timeSlot, setTimeSlot] = useState<string>("09:00")
  const [ticketType, setTicketType] = useState("adulte")
  const [quantity, setQuantity] = useState(1)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  })

  const selectedTicket = ticketTypes.find((t) => t.id === ticketType)
  const totalPrice = selectedTicket ? selectedTicket.price * quantity : 0

  const [paymentMethod, setPaymentMethod] = useState("orange-money")
  const [reservationId, setReservationId] = useState<string>("")
  const [qrCodeData, setQrCodeData] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [showEmailHelp, setShowEmailHelp] = useState(false)

  // Availability from server
  const [availability, setAvailability] = useState<{
    closed: boolean;
    slots: Record<string, { capacity: number; reserved: number; available: number }>
  } | null>(null)
  const [loadingAvailability, setLoadingAvailability] = useState(false)
  const [availabilityError, setAvailabilityError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!date) return
    const d = date.toISOString().slice(0, 10)
    setLoadingAvailability(true)
    setAvailabilityError(null)
    fetch(`/api/reservations/availability?date=${d}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Erreur"))))
      .then((data) => setAvailability(data))
      .catch(() => setAvailabilityError("Impossible de charger les disponibilités"))
      .finally(() => setLoadingAvailability(false))
  }, [date])

  

  const generateReservationId = () => {
    return `MCN-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) {
      alert("Veuillez sélectionner une date.")
      return
    }
    if (availability?.closed) {
      alert("Le musée est fermé ce jour-là.")
      return
    }
    setSubmitting(true)
    const payload = {
      nom: formData.nom,
      prenom: formData.prenom,
      email: formData.email,
      telephone: formData.telephone,
      date: date.toISOString().slice(0, 10),
      heure: timeSlot,
      type: selectedTicket?.label || "",
      quantite: quantity,
      total: totalPrice,
    }

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        alert(j?.message || "Réservation impossible pour ce créneau.")
        return
      }

      const data = await res.json()
      const reservation = data.reservation as { id: string }
      setReservationId(reservation.id)

      const qrData = JSON.stringify({
        id: reservation.id,
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        date: payload.date,
        heure: payload.heure,
        type: payload.type,
        quantite: payload.quantite,
        total: payload.total,
        valide: true,
      })
      setQrCodeData(qrData)

      // Send confirmation email (best-effort)
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            nom: formData.nom,
            prenom: formData.prenom,
            reservationId: reservation.id,
            date: payload.date,
            heure: payload.heure,
            type: payload.type,
            quantite: payload.quantite,
            total: payload.total,
            qrCodeData: qrData,
          }),
        })
      } catch {}

      setStep(4)
    } catch (err) {
      alert("Erreur lors de la réservation. Veuillez réessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  const downloadQRCode = () => {
    // In a real app, this would download the QR code as an image
    alert("Téléchargement du QR code simulé. Dans une vraie application, cela téléchargerait l'image du QR code.")
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/african-traditional-textiles-patterns.jpg')] bg-cover bg-center opacity-5" />
          <div className="relative container mx-auto px-4 lg:px-8 text-center">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-playfair)] text-foreground">
                Billetterie
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Réservez vos billets en ligne et profitez de votre visite au musée des Civilisations Noires
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-8 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Réservation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Instantané</div>
                <div className="text-sm text-muted-foreground">Confirmation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">Mobile</div>
                <div className="text-sm text-muted-foreground">Billets</div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Process */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center space-x-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                        step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      {step > s ? <Check size={20} /> : s}
                    </div>
                    {s < 4 && <div className={cn("w-16 h-1", step > s ? "bg-primary" : "bg-muted")} />}
                  </div>
                ))}
              </div>
            </div>

            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-[family-name:var(--font-playfair)]">
                    Choisissez votre visite
                  </CardTitle>
                  <CardDescription>Sélectionnez la date et le type de billet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Date de visite</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP", { locale: fr }) : <span>Choisissez une date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) => d < new Date(new Date().toDateString()) || d.getDay() === 1}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-2">
                    <Label>Heure de visite</Label>
                    <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="flex flex-wrap gap-4">
                      {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"].map((slot) => {
                        const slotInfo = availability?.slots?.[slot]
                        const isFull = !!(availability?.closed || (slotInfo && slotInfo.available < quantity))
                        const disabled = isFull || loadingAvailability || !availability
                        return (
                          <div key={slot} className="flex items-center space-x-2">
                            <RadioGroupItem value={slot} id={slot} disabled={disabled} />
                            <Label htmlFor={slot} className={disabled ? "text-red-600 cursor-not-allowed" : "cursor-pointer"}>
                              {slot} {availability?.closed ? "(Fermé)" : (slotInfo ? (slotInfo.available < quantity ? "(Complet)" : `(${slotInfo.available} restants)`) : "")}
                            </Label>
                          </div>
                        )
                      })}
                    </RadioGroup>
                  </div>

                  {/* Ticket Type */}
                  <div className="space-y-2">
                    <Label>Type de billet</Label>
                    <RadioGroup value={ticketType} onValueChange={setTicketType}>
                      {ticketTypes.map((ticket) => (
                        <div key={ticket.id} className="flex items-center space-x-3 border rounded-lg p-4">
                          <RadioGroupItem value={ticket.id} id={ticket.id} />
                          <Label htmlFor={ticket.id} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="font-medium">{ticket.label}</p>
                                <p className="text-sm text-muted-foreground">{ticket.description}</p>
                              </div>
                              <p className="font-bold">{ticket.price.toLocaleString("fr-FR")} FCFA</p>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Nombre de billets</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                        className="w-20 text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-medium">{totalPrice.toLocaleString("fr-FR")} FCFA</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{totalPrice.toLocaleString("fr-FR")} FCFA</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={() => setStep(2)} disabled={!date}>
                    Continuer
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-[family-name:var(--font-playfair)]">Vos informations</CardTitle>
                  <CardDescription>Remplissez vos coordonnées pour finaliser la réservation</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setStep(3)
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nom">Nom</Label>
                        <Input
                          id="nom"
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="prenom">Prénom</Label>
                        <Input
                          id="prenom"
                          value={formData.prenom}
                          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => setStep(1)}
                      >
                        Retour
                      </Button>
                      <Button type="submit" className="flex-1">
                        Continuer
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-[family-name:var(--font-playfair)]">Paiement</CardTitle>
            <CardDescription>Vérifiez votre commande et procédez au paiement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold">Récapitulatif de la commande</h3>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <CalendarIcon size={16} />
                    Date de visite
                  </span>
                  <span className="font-medium">{date && format(date, "PPP", { locale: fr })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users size={16} />
                    Type de billet
                  </span>
                  <span className="font-medium">{selectedTicket?.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Quantité</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Visiteur</span>
                  <span className="font-medium">
                    {formData.prenom} {formData.nom}
                  </span>
                </div>
                <div className="border-t border-border pt-2 mt-2">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total à payer</span>
                    <span>{totalPrice.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <Label>Méthode de paiement</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-4">
                <RadioGroupItem value="orange-money" id="orange-money" />
                <Label htmlFor="orange-money" className="cursor-pointer">Orange Money</Label>
                <RadioGroupItem value="wave" id="wave" />
                <Label htmlFor="wave" className="cursor-pointer">Wave</Label>
                <RadioGroupItem value="carte-bancaire" id="carte-bancaire" />
                <Label htmlFor="carte-bancaire" className="cursor-pointer">Carte Bancaire</Label>
              </RadioGroup>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <Info className="inline mr-2" size={16} />
                Le paiement est sécurisé. Vous recevrez votre billet par email après confirmation du paiement.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setStep(2)}
                >
                  Retour
                </Button>
                <Button type="submit" className="flex-1" disabled={submitting}>
                  {submitting ? "Traitement..." : `Payer ${totalPrice.toLocaleString("fr-FR")} FCFA`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

            {step === 4 && (
              <>
                {showEmailHelp && (
                  <div className="mb-6">
                    <EmailConfigHelp 
                      error={emailError} 
                      onClose={() => setShowEmailHelp(false)}
                    />
                  </div>
                )}
                
                <Card className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mb-4">
                      <Check className="text-green-600 dark:text-green-400" size={32} />
                    </div>
                    <CardTitle className="text-2xl font-[family-name:var(--font-playfair)]">
                      Réservation confirmée!
                    </CardTitle>
                    <CardDescription>
                      {emailError 
                        ? "Votre réservation est confirmée (email non envoyé)"
                        : `Votre billet a été envoyé à ${formData.email}`
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted p-6 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-4">Numéro de réservation</p>
                      <p className="text-2xl font-bold font-mono">
                        {reservationId}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Présentez votre billet (imprimé ou sur mobile) à l'entrée</p>
                      <p>• Arrivez 15 minutes avant l'heure de votre visite</p>
                      <p>• Le musée ouvre à 9h00 et ferme à 18h00</p>
                    </div>

                    <Button className="w-full" onClick={() => (window.location.href = "/")}>
                      Retour à l'accueil
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Clock className="text-primary mb-2" size={32} />
                  <CardTitle>Horaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Mardi - Dimanche
                    <br />
                    9h00 - 18h00
                    <br />
                    Fermé le lundi
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="text-primary mb-2" size={32} />
                  <CardTitle>Tarifs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Adulte: 5 000 FCFA</li>
                    <li>Étudiant: 2 500 FCFA</li>
                    <li>Enfant (6-17): 1 000 FCFA</li>
                    <li>Moins de 6 ans: Gratuit</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Info className="text-primary mb-2" size={32} />
                  <CardTitle>Informations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Visites guidées disponibles
                    <br />
                    Audioguides en français et anglais
                    <br />
                    Accessibilité PMR
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
