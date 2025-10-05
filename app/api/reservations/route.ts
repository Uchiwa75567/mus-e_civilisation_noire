import { NextRequest, NextResponse } from "next/server"
import { ReservationInputSchema, reserve } from "@/lib/reservations-store"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = ReservationInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Payload invalide", details: parsed.error.format() }, { status: 400 })
    }
    const result = reserve(parsed.data)
    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 409 })
    }
    return NextResponse.json({ success: true, reservation: result.reservation })
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
