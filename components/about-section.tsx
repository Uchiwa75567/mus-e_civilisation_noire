export function AboutSection() {
  return (
    <section id="a-propos" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
              À propos du MCN
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Le Musée des Civilisations Noires est un lieu unique dédié à la préservation et à la célébration de
                l'histoire et de la culture des civilisations africaines.
              </p>
              <p>
                Inauguré en 2018, le MCN abrite une collection exceptionnelle d'œuvres d'art, d'objets historiques et de
                témoignages qui racontent l'histoire riche et diverse du continent africain et de sa diaspora.
              </p>
              <p>
                Notre mission est de promouvoir la connaissance et l'appréciation des contributions des civilisations
                noires à l'humanité, tout en servant de pont entre le passé, le présent et l'avenir.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <img
              src="/contemporary-african-art-gallery.jpg"
              alt="Intérieur du musée"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
