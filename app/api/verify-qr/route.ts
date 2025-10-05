import { NextRequest, NextResponse } from "next/server"
import { hasReservation, getReservation } from "@/lib/reservations-store"

export async function POST(request: NextRequest) {
  try {
    const { qrData } = await request.json()

    if (!qrData) {
      return NextResponse.json(
        { error: "Données QR manquantes" },
        { status: 400 }
      )
    }

    let reservationData
    try {
      reservationData = JSON.parse(qrData)
    } catch (error) {
      return NextResponse.json(
        { error: "Format QR invalide" },
        { status: 400 }
      )
    }

    // Check if reservation exists in the store
    if (!hasReservation(reservationData.id)) {
      return NextResponse.json(
        {
          valid: false,
          message: "Réservation non trouvée ou expirée"
        },
        { status: 200 }
      )
    }

    // Get full reservation details
    const reservation = getReservation(reservationData.id)
    if (!reservation) {
      return NextResponse.json(
        {
          valid: false,
          message: "Erreur lors de la récupération de la réservation"
        },
        { status: 200 }
      )
    }

    // Check if the reservation is for today
    const today = new Date().toISOString().slice(0, 10)
    if (reservationData.date !== today) {
      return NextResponse.json(
        {
          valid: false,
          message: `Cette réservation est pour le ${reservationData.date}, pas pour aujourd'hui`
        },
        { status: 200 }
      )
    }

    // Check if it's not too early (museum opens at 9:00)
    const currentHour = new Date().getHours()
    if (currentHour < 9) {
      return NextResponse.json(
        {
          valid: false,
          message: "Le musée ouvre à 9h00"
        },
        { status: 200 }
      )
    }

    // Check if it's not too late (museum closes at 18:00)
    if (currentHour >= 18) {
      return NextResponse.json(
        {
          valid: false,
          message: "Le musée ferme à 18h00"
        },
        { status: 200 }
      )
    }

    // Check if the visit time matches current time slot
    const currentTime = new Date().toTimeString().slice(0, 5) // HH:MM format
    const visitHour = parseInt(reservationData.heure.split(':')[0])

    // Allow entry 30 minutes before and during the time slot
    const currentHourNum = parseInt(currentTime.split(':')[0])
    const currentMinute = parseInt(currentTime.split(':')[1])

    const timeSlotStart = visitHour
    const timeSlotEnd = visitHour + 1

    if (currentHourNum < timeSlotStart - 1 || (currentHourNum === timeSlotStart - 1 && currentMinute < 30)) {
      return NextResponse.json(
        {
          valid: false,
          message: `Votre créneau horaire commence à ${reservationData.heure}`
        },
        { status: 200 }
      )
    }

    if (currentHourNum >= timeSlotEnd) {
      return NextResponse.json(
        {
          valid: false,
          message: `Votre créneau horaire était de ${reservationData.heure} à ${timeSlotEnd}:00`
        },
        { status: 200 }
      )
    }

    // Valid entry
    return NextResponse.json({
      valid: true,
      message: "Accès autorisé - Bienvenue au Musée des Civilisations Noires",
      reservation: {
        id: reservation.id,
        nom: reservation.nom,
        prenom: reservation.prenom,
        type: reservation.type,
        quantite: reservation.quantite,
        heure: reservation.heure
      }
    })

  } catch (error) {
    console.error("Erreur lors de la vérification du QR code:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
