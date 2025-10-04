"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Camera, RefreshCw, Users, Clock } from "lucide-react"
import QRCode from "qrcode"

interface ReservationData {
  id: string
  nom: string
  prenom: string
  type: string
  quantite: number
  heure: string
}

export default function AccueilPage() {
  const [scanning, setScanning] = useState(false)
  const [lastScan, setLastScan] = useState<{
    valid: boolean
    message: string
    reservation?: ReservationData
  } | null>(null)
  const [scanHistory, setScanHistory] = useState<Array<{
    timestamp: Date
    valid: boolean
    reservation?: ReservationData
  }>>([])

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setScanning(true)
        setLastScan(null)
      }
    } catch (error) {
      console.error("Erreur d'accès à la caméra:", error)
      setLastScan({
        valid: false,
        message: "Impossible d'accéder à la caméra"
      })
    }
  }

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setScanning(false)
    }
  }

  const verifyQRCode = async (qrData: string) => {
    try {
      const response = await fetch('/api/verify-qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrData }),
      })

      const result = await response.json()

      setLastScan(result)

      // Add to history
      setScanHistory(prev => [{
        timestamp: new Date(),
        valid: result.valid,
        reservation: result.reservation
      }, ...prev.slice(0, 9)]) // Keep only last 10 scans

    } catch (error) {
      console.error("Erreur de vérification:", error)
      setLastScan({
        valid: false,
        message: "Erreur de vérification"
      })
    }
  }

  const simulateScan = () => {
    // For demo purposes - simulate a valid QR code scan
    const mockQRData = JSON.stringify({
      id: "MCN-1735923456789-ABC123",
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@email.com",
      date: new Date().toISOString().slice(0, 10),
      heure: "10:00",
      type: "Adulte",
      quantite: 2,
      total: 10000,
      valide: true
    })

    verifyQRCode(mockQRData)
  }

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="absolute inset-0 bg-[url('/african-traditional-textiles-patterns.jpg')] bg-cover bg-center opacity-5" />
          <div className="relative container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[family-name:var(--font-playfair)] text-foreground">
              Contrôle d'Accès
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scannez les QR codes des visiteurs pour vérifier leur accès au musée
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Scanner Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Scanner QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
                    {scanning ? (
                      <>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        <div className="absolute inset-4 border-4 border-primary/50 rounded-lg" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-24 h-24 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {!scanning ? (
                      <>
                        <Button onClick={startScanning} className="flex-1">
                          <Camera className="mr-2 h-4 w-4" />
                          Démarrer le scan
                        </Button>
                        <Button onClick={simulateScan} variant="outline" className="flex-1">
                          Simulation
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={simulateScan} className="flex-1">
                          Détecter QR Code
                        </Button>
                        <Button onClick={stopScanning} variant="outline">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <div className="space-y-6">

                {/* Last Scan Result */}
                {lastScan && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {lastScan.valid ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                        Résultat du scan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Badge variant={lastScan.valid ? "default" : "destructive"} className="w-full justify-center py-2">
                          {lastScan.valid ? "Accès autorisé" : "Accès refusé"}
                        </Badge>

                        <p className="text-sm text-muted-foreground text-center">
                          {lastScan.message}
                        </p>

                        {lastScan.reservation && (
                          <div className="bg-muted p-4 rounded-lg space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Visiteur:</span>
                              <span className="text-sm">{lastScan.reservation.prenom} {lastScan.reservation.nom}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Type:</span>
                              <span className="text-sm">{lastScan.reservation.type}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Quantité:</span>
                              <span className="text-sm">{lastScan.reservation.quantite} personne(s)</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Créneau:</span>
                              <span className="text-sm">{lastScan.reservation.heure}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Statistiques du jour
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {scanHistory.filter(scan => scan.valid).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Accès autorisés</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {scanHistory.filter(scan => !scan.valid).length}
                        </div>
                        <div className="text-sm text-muted-foreground">Accès refusés</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Scans */}
                {scanHistory.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Scans récents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {scanHistory.map((scan, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-3">
                              {scan.valid ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <div>
                                <div className="text-sm font-medium">
                                  {scan.reservation ? `${scan.reservation.prenom} ${scan.reservation.nom}` : 'Scan invalide'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {scan.timestamp.toLocaleTimeString('fr-FR')}
                                </div>
                              </div>
                            </div>
                            {scan.reservation && (
                              <Badge variant="outline" className="text-xs">
                                {scan.reservation.quantite}p
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
