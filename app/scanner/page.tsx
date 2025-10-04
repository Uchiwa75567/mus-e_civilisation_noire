import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QRScanner } from "@/components/qr-scanner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ScannerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button asChild variant="ghost" className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>

          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold font-[family-name:var(--font-playfair)] mb-4">Scanner QR Code</h1>
              <p className="text-lg text-muted-foreground">Découvrez les détails des œuvres en scannant leur QR code</p>
            </div>

            <QRScanner />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
