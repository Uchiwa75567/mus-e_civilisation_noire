import { NextResponse } from "next/server"
import { oeuvres } from "@/lib/data"

export async function GET() {
  return NextResponse.json(oeuvres)
}
