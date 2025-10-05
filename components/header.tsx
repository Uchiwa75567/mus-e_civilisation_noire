"use client"

import Link from "next/link"
import { Menu, X, QrCode } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1))
    }

    handleHashChange() // Set initial hash
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const getActiveLink = (href: string) => {
    if (href.startsWith('/#')) {
      const section = href.split('#')[1]
      return pathname === '/' && currentHash === section
    }
    if (href === '/oeuvres') {
      return pathname.startsWith('/oeuvres')
    }
    if (href === '/expositions') {
      return pathname.startsWith('/expositions')
    }
    if (href === '/evenements') {
      return pathname.startsWith('/evenements')
    }
    return pathname === href
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/placeholder-logo.png" alt="Musée des Civilisations Noires - Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#expositions" className={`text-sm hover:text-primary transition-colors ${getActiveLink('/#expositions') ? 'underline underline-offset-4' : ''}`}>
              Expositions
            </Link>
            <Link href="/#evenements" className={`text-sm hover:text-primary transition-colors ${getActiveLink('/#evenements') ? 'underline underline-offset-4' : ''}`}>
              Événements
            </Link>
            <Link href="/billetterie" className={`text-sm hover:text-primary transition-colors ${getActiveLink('/billetterie') ? 'underline underline-offset-4' : ''}`}>
              Billetterie
            </Link>
            <Link href="/visite-virtuelle" className={`text-sm hover:text-primary transition-colors ${getActiveLink('/visite-virtuelle') ? 'underline underline-offset-4' : ''}`}>
              Visite 3D
            </Link>
            <Link href="/#a-propos" className={`text-sm hover:text-primary transition-colors ${getActiveLink('/#a-propos') ? 'underline underline-offset-4' : ''}`}>
              À propos
            </Link>
                        <Link href="/#contact" className={`text-sm hover:text-primary transition-colors ${getActiveLink('/#contact') ? 'underline underline-offset-4' : ''}`}>
              Contact
            </Link>
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
                className={`text-sm hover:text-primary transition-colors ${getActiveLink('/#expositions') ? 'underline underline-offset-4' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Expositions
              </Link>
              <Link
                href="/#evenements"
                className={`text-sm hover:text-primary transition-colors ${getActiveLink('/#evenements') ? 'underline underline-offset-4' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Événements
              </Link>
              <Link
                href="/billetterie"
                className={`text-sm hover:text-primary transition-colors ${getActiveLink('/billetterie') ? 'underline underline-offset-4' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Billetterie
              </Link>
              <Link
                href="/visite-virtuelle"
                className={`text-sm hover:text-primary transition-colors ${getActiveLink('/visite-virtuelle') ? 'underline underline-offset-4' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Visite 3D
              </Link>
              <Link
                href="/#a-propos"
                className={`text-sm hover:text-primary transition-colors ${getActiveLink('/#a-propos') ? 'underline underline-offset-4' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                À propos
              </Link>
                            <Link
                href="/#contact"
                className={`text-sm hover:text-primary transition-colors ${getActiveLink('/#contact') ? 'underline underline-offset-4' : ''}`}
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
