import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      {/* Google Maps Section */}
      <div className="bg-muted border-t border-border py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <h3 className="text-xl font-bold mb-4 text-center font-[family-name:var(--font-playfair)]">
            📍 Nous trouver
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.9876543210123!2d-17.4676!3d14.7319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec173f1b6f0e0e1%3A0x1234567890abcdef!2sRoute%20de%20l'A%C3%A9roport%2C%20Dakar%2C%20S%C3%A9n%C3%A9gal!5e0!3m2!1sfr!2ssn!4v1234567890123!5m2!1sfr!2ssn"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation du Musée des Civilisations Noires"
            />
          </div>
        </div>
      </div>

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