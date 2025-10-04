import { NextResponse } from "next/server"
import { evenements } from "@/lib/data"

export async function GET() {
  return NextResponse.json(evenements)
}
