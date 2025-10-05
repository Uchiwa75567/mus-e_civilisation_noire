import { z } from "zod"

export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  // pause déjeuner 13:00 non proposée
  "14:00",
  "15:00",
  "16:00",
  "17:00",
] as const

export const RESERVATION_CAPACITY_PER_SLOT = 100

export const ReservationInputSchema = z.object({
  nom: z.string().min(1),
  prenom: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().min(3),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  heure: z.enum(TIME_SLOTS),
  type: z.string().min(1),
  quantite: z.number().int().min(1).max(10),
  total: z.number().int().nonnegative(),
})

export type ReservationInput = z.infer<typeof ReservationInputSchema>

export interface Reservation extends ReservationInput {
  id: string
  createdAt: string
}

// In-memory stores
const bookings = new Map<string, number>() // key: `${date} ${heure}` => reserved count
const reservationsById = new Map<string, Reservation>()

export function isClosed(date: string): boolean {
  // Monday closed
  const d = new Date(date + 'T00:00:00Z')
  // Convert to local day; if TZ differences matter, a real implementation should consider museum TZ
  const day = d.getUTCDay() // 0=Sun,1=Mon,...
  return day === 1 // Monday
}

export function getAvailability(date: string) {
  const closed = isClosed(date)
  const slots = TIME_SLOTS.reduce((acc, slot) => {
    const key = `${date} ${slot}`
    const reserved = bookings.get(key) || 0
    acc[slot] = {
      capacity: RESERVATION_CAPACITY_PER_SLOT,
      reserved,
      available: Math.max(0, RESERVATION_CAPACITY_PER_SLOT - reserved),
    }
    return acc
  }, {} as Record<(typeof TIME_SLOTS)[number], { capacity: number; reserved: number; available: number }>)
  return { closed, slots }
}

export function generateReservationId() {
  return `MCN-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

export function reserve(input: ReservationInput): { success: true; reservation: Reservation } | { success: false; message: string } {
  if (isClosed(input.date)) {
    return { success: false, message: "Le musée est fermé le lundi" }
  }
  const key = `${input.date} ${input.heure}`
  const current = bookings.get(key) || 0
  if (current + input.quantite > RESERVATION_CAPACITY_PER_SLOT) {
    return { success: false, message: "Ce créneau est complet" }
  }
  const reservation: Reservation = {
    ...input,
    id: generateReservationId(),
    createdAt: new Date().toISOString(),
  }
  bookings.set(key, current + input.quantite)
  reservationsById.set(reservation.id, reservation)
  return { success: true, reservation }
}

export function hasReservation(id: string) {
  return reservationsById.has(id)
}

export function getReservation(id: string) {
  return reservationsById.get(id) || null
}
