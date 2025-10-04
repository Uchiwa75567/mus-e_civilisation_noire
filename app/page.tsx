import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ExpositionsSection } from "@/components/expositions-section"
import { EvenementsSection } from "@/components/evenements-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ExpositionsSection />
        <EvenementsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
