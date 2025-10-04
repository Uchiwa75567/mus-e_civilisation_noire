"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Camera, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function QRScanner() {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Simulate QR code reading from image
    // In production, use a library like jsQR
    setTimeout(() => {
      // Mock: redirect to first artwork
      router.push("/oeuvres/1")
    }, 1000)
  }

  const simulateScan = () => {
    // For demo purposes - simulate successful scan
    setTimeout(() => {
      router.push("/oeuvres/1")
    }, 1500)
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden relative">
            {scanning ? (
              <>
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-0 border-4 border-primary/50 m-12 rounded-lg" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-24 h-24 text-muted-foreground" />
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <div className="flex gap-3">
            {!scanning ? (
              <>
                <Button onClick={startCamera} className="flex-1">
                  <Camera className="mr-2 h-4 w-4" />
                  Scanner avec caméra
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <label>
                    <Upload className="mr-2 h-4 w-4" />
                    Importer une image
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </label>
                </Button>
              </>
            ) : (
              <>
                <Button onClick={simulateScan} className="flex-1">
                  Détecter le QR Code
                </Button>
                <Button onClick={stopCamera} variant="outline">
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Scannez le QR code présent sur les cartels des œuvres</p>
        <p>pour accéder aux informations détaillées</p>
      </div>
    </div>
  )
}
