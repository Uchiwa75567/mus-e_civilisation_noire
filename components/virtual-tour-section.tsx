import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Eye, RotateCcw, Zap } from "lucide-react"

export function VirtualTourSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
              Visite virtuelle 3D
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Explorez le musée depuis chez vous grâce à notre visite virtuelle immersive en 3D.
                Découvrez nos collections exceptionnelles dans un environnement virtuel réaliste.
              </p>
              <p>
                Naviguez librement dans les salles, approchez-vous des œuvres, et plongez dans l'histoire
                fascinante des civilisations africaines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-background rounded-lg border">
                <Eye className="mx-auto mb-2 text-primary" size={24} />
                <div className="font-semibold text-sm">Vue 360°</div>
                <div className="text-xs text-muted-foreground">Navigation libre</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border">
                <RotateCcw className="mx-auto mb-2 text-primary" size={24} />
                <div className="font-semibold text-sm">Interaction</div>
                <div className="text-xs text-muted-foreground">Œuvres détaillées</div>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border">
                <Zap className="mx-auto mb-2 text-primary" size={24} />
                <div className="font-semibold text-sm">Performance</div>
                <div className="text-xs text-muted-foreground">Haute qualité</div>
              </div>
            </div>

            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/visite-virtuelle">
                Commencer la visite 3D
              </Link>
            </Button>
          </div>

          <div className="relative">
            <Card className="overflow-hidden shadow-2xl">
              <div className="relative h-96 bg-gradient-to-br from-slate-900 to-black">
                <div className="absolute inset-0 bg-[url('/museum-night-tour-lighting.jpg')] bg-cover bg-center opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <h3 className="text-white font-semibold mb-2">Visite virtuelle interactive</h3>
                    <p className="text-white/80 text-sm">
                      Découvrez le musée en 3D avec React Three Fiber et Three.js
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-bounce" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
