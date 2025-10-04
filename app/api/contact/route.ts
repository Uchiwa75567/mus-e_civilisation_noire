import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // Validate required fields
  if (!body.nom || !body.email || !body.sujet || !body.message) {
    return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
  }

  // Simulate saving contact message
  return NextResponse.json({
    success: true,
    message: "Message envoyé avec succès",
  })
}
