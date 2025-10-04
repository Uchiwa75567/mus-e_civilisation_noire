import { NextResponse } from "next/server"
import { expositions } from "@/lib/data"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const exposition = expositions.find((e) => e.id === id)

  if (!exposition) {
    return NextResponse.json({ error: "Exposition non trouvée" }, { status: 404 })
  }

  return NextResponse.json(exposition)
}
