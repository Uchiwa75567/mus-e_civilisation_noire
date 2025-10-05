"use client"

import { useState } from "react"
import { QRCodeDisplay } from "./qr-code-display"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface EmailPreviewProps {
  reservationId: string
  nom: string
  prenom: string
  date: string
  heure: string
  type: string
  quantite: number
  total: number
  qrCodeData: string
}

export function EmailPreview({
  reservationId,
  nom,
  prenom,
  date,
  heure,
  type,
  quantite,
  total,
  qrCodeData
}: EmailPreviewProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1a365d] to-[#2d3748] text-white p-8 text-center">
        <h1 className="text-3xl font-bold mb-2">🏛️ Musée des Civilisations Noires</h1>
        <h2 className="text-lg opacity-90">Confirmation de réservation</h2>
      </div>

      {/* Content */}
      <div className="p-8">
        <p className="text-base mb-5">
          Bonjour <strong>{prenom} {nom}</strong>,
        </p>

        <p className="mb-6">
          Votre réservation a été confirmée avec succès ! Nous sommes ravis de vous accueillir au Musée des Civilisations Noires.
        </p>

        {/* Reservation Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">📋 Détails de votre réservation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-muted-foreground">Numéro de réservation</span>
              <span className="font-bold">{reservationId}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-muted-foreground">Date de visite</span>
              <span>{new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-muted-foreground">Heure d'arrivée</span>
              <span>{heure}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-muted-foreground">Type de billet</span>
              <span>{type}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-semibold text-muted-foreground">Nombre de personnes</span>
              <span>{quantite} personne{quantite > 1 ? 's' : ''}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-semibold text-muted-foreground">Montant payé</span>
              <span className="font-bold">{total.toLocaleString('fr-FR')} FCFA</span>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Section */}
        <div className="bg-gradient-to-br from-muted to-muted/50 p-8 rounded-lg text-center mb-6">
          <h3 className="text-xl font-bold mb-2">🎫 Votre billet d'entrée</h3>
          <p className="font-semibold mb-2">Présentez ce QR code à l'entrée du musée</p>
          <p className="text-sm text-muted-foreground mb-4">
            Vous pouvez l'afficher sur votre téléphone ou l'imprimer
          </p>
          <div className="inline-block bg-white p-4 rounded-lg shadow-md">
            <QRCodeDisplay data={qrCodeData} size={250} />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Code: {reservationId}
          </p>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border-2 border-yellow-400 p-5 rounded-lg mb-6">
          <h4 className="font-bold text-yellow-800 mb-3">⚠️ Informations importantes</h4>
          <ul className="space-y-2 text-sm text-yellow-800 list-disc list-inside">
            <li><strong>Arrivez 15 minutes avant</strong> l'heure de votre visite pour faciliter votre entrée</li>
            <li>Le musée est ouvert du <strong>mardi au dimanche de 9h00 à 18h00</strong></li>
            <li>Fermé le lundi</li>
            <li>Ce billet est <strong>valable uniquement pour la date et l'heure indiquées</strong></li>
            <li>Conservez ce billet pendant toute votre visite</li>
            <li>Le billet est personnel et non transférable</li>
          </ul>
        </div>

        <div className="text-center mb-6">
          <p className="mb-2">📍 <strong>Adresse :</strong> Route de l'Aéroport, Dakar, Sénégal</p>
          <p>📞 <strong>Contact :</strong> +221 33 849 00 00</p>
        </div>

        <p className="mb-4">
          Nous vous souhaitons une excellente visite et une découverte enrichissante de nos collections !
        </p>

        <p>
          Cordialement,<br />
          <strong>L'équipe du Musée des Civilisations Noires</strong>
        </p>
      </div>

      {/* Footer */}
      <div className="bg-muted text-center p-6 text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Musée des Civilisations Noires</p>
        <p>Route de l'Aéroport, Dakar, Sénégal</p>
        <div className="mt-4 pt-4 border-t border-border">
          <p>📧 contact@mcn.sn | 📞 +221 33 849 00 00</p>
          <p className="text-xs mt-3">
            Cette réservation est personnelle et non cessible.<br />
            Pour toute question, n'hésitez pas à nous contacter.
          </p>
        </div>
      </div>
    </div>
  )
}