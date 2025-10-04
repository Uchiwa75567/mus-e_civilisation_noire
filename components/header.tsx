"use client"

import Link from "next/link"
import { Menu, X, QrCode } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold font-[family-name:var(--font-playfair)]">MCN</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#expositions" className="text-sm hover:text-primary transition-colors">
              Expositions
            </Link>
            <Link href="/#evenements" className="text-sm hover:text-primary transition-colors">
              Événements
            </Link>
            <Link href="/billetterie" className="text-sm hover:text-primary transition-colors">
              Billetterie
            </Link>
            <Link href="/visite-virtuelle" className="text-sm hover:text-primary transition-colors">
              Visite 3D
            </Link>
            <Link href="/#a-propos" className="text-sm hover:text-primary transition-colors">
              À propos
            </Link>
            <Link href="/stats" className="text-sm hover:text-primary transition-colors">
              Statistiques
            </Link>
            <Link href="/#contact" className="text-sm hover:text-primary transition-colors">
              Contact
            </Link>
            <Button asChild variant="ghost" size="icon">
              <Link href="/scanner" aria-label="Scanner QR Code">
                <QrCode className="h-5 w-5" />
              </Link>
            </Button>
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/billetterie">Réserver</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/#expositions"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Expositions
              </Link>
              <Link
                href="/#evenements"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Événements
              </Link>
              <Link
                href="/billetterie"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Billetterie
              </Link>
              <Link
                href="/visite-virtuelle"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Visite 3D
              </Link>
              <Link
                href="/#a-propos"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                href="/stats"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Statistiques
              </Link>
              <Link
                href="/#contact"
                className="text-sm hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                <Link href="/scanner">
                  <QrCode className="h-4 w-4 mr-2" />
                  Scanner QR Code
                </Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link href="/billetterie">Réserver</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
