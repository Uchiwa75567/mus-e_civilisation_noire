"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Camera, Upload, X, Search, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { oeuvres } from "@/lib/data"

export function QRScanner() {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof oeuvres>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setScanning(true)
        setError(null)
      }
    } catch (err) {
      setError("Impossible d'accéder à la caméra. Veuillez vérifier les permissions.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      setScanning(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const imageData = event.target?.result as string
      setSelectedImage(imageData)
      // Simulate QR code reading from image
      // In production, use a library like jsQR
      setTimeout(() => {
        // Mock: redirect to first artwork
        router.push("/oeuvres/1")
      }, 2000)
    }
    reader.readAsDataURL(file)
  }

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const results = oeuvres.filter(oeuvre =>
      oeuvre.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      oeuvre.artiste.toLowerCase().includes(searchQuery.toLowerCase()) ||
      oeuvre.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResults(results)
  }

  const simulateScan = () => {
    // For demo purposes - simulate successful scan
    setTimeout(() => {
      router.push("/oeuvres/1")
    }, 1500)
  }

  const clearImage = () => {
    setSelectedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* QR Code Scanner Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Scanner QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-square md:aspect-video bg-muted rounded-lg overflow-hidden relative max-w-md mx-auto">
            {selectedImage ? (
              <div className="relative w-full h-full">
                <img src={selectedImage} alt="Image importée" className="w-full h-full object-contain" />
                <Button
                  onClick={clearImage}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : scanning ? (
              <>
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-4 border-4 border-primary/50 rounded-lg" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-16 h-16 md:w-24 md:h-24 text-muted-foreground" />
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-3">
            {!scanning && !selectedImage ? (
              <>
                <Button onClick={startCamera} className="flex-1">
                  <Camera className="mr-2 h-4 w-4" />
                  Scanner avec caméra
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <label>
                    <Upload className="mr-2 h-4 w-4" />
                    Importer une image
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </Button>
              </>
            ) : scanning ? (
              <>
                <Button onClick={simulateScan} className="flex-1">
                  Détecter le QR Code
                </Button>
                <Button onClick={stopCamera} variant="outline">
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : selectedImage ? (
              <div className="flex gap-3 w-full">
                <Button onClick={simulateScan} className="flex-1">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Analyser l'image
                </Button>
                <Button onClick={clearImage} variant="outline">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher une œuvre
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label htmlFor="search" className="sr-only">Rechercher une œuvre</Label>
              <Input
                id="search"
                type="text"
                placeholder="Nom de l'œuvre, artiste ou description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full"
              />
            </div>
            <Button onClick={handleSearch} className="sm:w-auto w-full">
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium">Résultats de recherche :</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {searchResults.map((oeuvre) => (
                  <Card key={oeuvre.id} className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => router.push(`/oeuvres/${oeuvre.id}`)}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <img
                          src={oeuvre.image}
                          alt={oeuvre.titre}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{oeuvre.titre}</h4>
                          <p className="text-sm text-muted-foreground truncate">{oeuvre.artiste}</p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{oeuvre.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucune œuvre trouvée pour "{searchQuery}"
            </p>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground space-y-2">
        <p>Scannez le QR code présent sur les cartels des œuvres</p>
        <p>ou importez une image pour accéder aux informations détaillées</p>
        <p>Vous pouvez également rechercher une œuvre par son nom ou description</p>
      </div>
    </div>
  )
}
