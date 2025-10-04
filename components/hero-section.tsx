import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/african-kingdoms-artifacts-museum.jpg"
          alt="Musée des Civilisations Noires"
          className="w-full h-full object-cover scale-105 animate-pulse"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-32 right-20 w-1 h-1 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[family-name:var(--font-playfair)] text-white text-balance drop-shadow-lg">
            Musée des Civilisations Noires
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto text-balance leading-relaxed drop-shadow-md">
            Découvrez l'histoire et la richesse culturelle des civilisations africaines à travers nos expositions
            exceptionnelles et notre collection d'art unique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300">
              <Link href="/billetterie">
                Réserver un billet
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/#expositions">Explorer les expositions</Link>
            </Button>
          </div>
        </div>

        {/* Stats Preview */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <div className="text-center">
            <div className="text-2xl font-bold text-white drop-shadow-lg">17</div>
            <div className="text-sm text-white/80">Œuvres</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white drop-shadow-lg">8</div>
            <div className="text-sm text-white/80">Expositions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white drop-shadow-lg">3</div>
            <div className="text-sm text-white/80">Événements</div>
          </div>
        </div>
      </div>
    </section>
  )
}
