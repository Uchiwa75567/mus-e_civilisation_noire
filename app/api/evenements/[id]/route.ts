import { NextResponse } from "next/server"
import { evenements } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const evenement = evenements.find((e) => e.id === params.id)

  if (!evenement) {
    return NextResponse.json({ error: "Événement non trouvé" }, { status: 404 })
  }

  return NextResponse.json(evenement)
}
