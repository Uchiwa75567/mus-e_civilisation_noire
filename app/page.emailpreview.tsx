"use client"

import { EmailPreview } from "@/components/email-preview"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function EmailPreviewPage() {
  // Mock data for preview
  const mockReservationData = {
    reservationId: "MCN-1735923456789-ABC123",
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    date: "2025-06-15",
    heure: "10:00",
    type: "Adulte",
    quantite: 2,
    total: 10000
  }

  const qrCodeData = JSON.stringify({
    id: mockReservationData.reservationId,
    nom: mockReservationData.nom,
    prenom: mockReservationData.prenom,
    email: mockReservationData.email,
    date: mockReservationData.date,
    heure: mockReservationData.heure,
    type: mockReservationData.type,
    quantite: mockReservationData.quantite,
    total: mockReservationData.total,
    valide: true
  })

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
                Prévisualisation Email de Confirmation
              </h1>
              <p className="text-muted-foreground">
                Aperçu de l'email que les visiteurs reçoivent après leur réservation
              </p>
            </div>

            <EmailPreview
              reservationId={mockReservationData.reservationId}
              nom={mockReservationData.nom}
              prenom={mockReservationData.prenom}
              date={mockReservationData.date}
              heure={mockReservationData.heure}
              type={mockReservationData.type}
              quantite={mockReservationData.quantite}
              total={mockReservationData.total}
              qrCodeData={qrCodeData}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}