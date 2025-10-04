"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"

interface QRCodeDisplayProps {
  data: string
  size?: number
  className?: string
}

export function QRCodeDisplay({ data, size = 200, className = "" }: QRCodeDisplayProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")

  useEffect(() => {
    QRCode.toDataURL(data, {
      width: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
      .then(url => {
        setQrCodeUrl(url)
      })
      .catch(err => {
        console.error('Error generating QR code:', err)
      })
  }, [data, size])

  if (!qrCodeUrl) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`} style={{ width: size, height: size }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <img
      src={qrCodeUrl}
      alt="QR Code"
      className={`rounded-lg ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
