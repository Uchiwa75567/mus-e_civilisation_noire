import { NextResponse } from "next/server"
import { expositions } from "@/lib/data"

export async function GET() {
  return NextResponse.json(expositions)
}
