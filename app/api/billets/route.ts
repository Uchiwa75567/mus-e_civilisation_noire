import { NextResponse } from "next/server"
import { billets } from "@/lib/data"

export async function GET() {
  return NextResponse.json(billets)
}

export async function POST(request: Request) {
  const body = await request.json()

  // Simulate ticket purchase
  return NextResponse.json({
    success: true,
    orderId: `ORD-${Date.now()}`,
    message: "Billet acheté avec succès",
  })
}
