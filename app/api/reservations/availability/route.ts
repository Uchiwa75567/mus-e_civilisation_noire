import { NextRequest, NextResponse } from "next/server"
import { getAvailability } from "@/lib/reservations-store"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get("date")
  if (!date) return NextResponse.json({ error: "Paramètre 'date' requis" }, { status: 400 })
  try {
    const data = getAvailability(date)
    return NextResponse.json(data)
  } catch (e) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
