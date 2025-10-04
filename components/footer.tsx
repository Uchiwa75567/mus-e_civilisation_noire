import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-[family-name:var(--font-playfair)]">MCN</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Le Musée des Civilisations Noires célèbre l'histoire et la richesse culturelle des civilisations
              africaines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#expositions" className="text-muted-foreground hover:text-foreground transition-colors">
                  Expositions
                </Link>
              </li>
              <li>
                <Link href="/#evenements" className="text-muted-foreground hover:text-foreground transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link href="/billetterie" className="text-muted-foreground hover:text-foreground transition-colors">
                  Billetterie
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                  Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Route de l'Aéroport</li>
              <li>Dakar, Sénégal</li>
              <li>+221 33 849 00 00</li>
              <li>contact@mcn.sn</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Musée des Civilisations Noires. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
