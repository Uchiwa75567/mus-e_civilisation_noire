import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/lib/theme-provider"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Musée des Civilisations Noires | MCN",
  description: "Découvrez l'histoire et la richesse des civilisations africaines au Musée des Civilisations Noires",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="mcn-theme">
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
