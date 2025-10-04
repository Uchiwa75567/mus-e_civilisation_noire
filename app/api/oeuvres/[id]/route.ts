import { NextResponse } from "next/server"
import { oeuvres } from "@/lib/data"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const oeuvre = oeuvres.find((o) => o.id === params.id)

  if (!oeuvre) {
    return NextResponse.json({ error: "Œuvre non trouvée" }, { status: 404 })
  }

  return NextResponse.json(oeuvre)
}
