// Mock data for the MCN Museum application
import type { Exposition, Evenement, Billet, Oeuvre } from "./types"

export const expositions: Exposition[] = [
  {
    id: "1",
    titre: "Royaumes Africains",
    description:
      "Une exploration fascinante des grands royaumes africains à travers les âges, de l'Empire du Mali aux royaumes Ashanti.",
    image: "/royaume_africain.jpg",
    dateDebut: "2025-01-15",
    dateFin: "2025-06-30",
    categorie: "Histoire",
    featured: true,
    qrCode: "MCN-EXP-001",
  },
  {
    id: "2",
    titre: "Art Contemporain Africain",
    description: "Découvrez les œuvres d'artistes contemporains qui redéfinissent l'art africain moderne.",
    image: "/art_contemporain.jpg",
    dateDebut: "2025-02-01",
    dateFin: "2025-08-15",
    categorie: "Art Contemporain",
    featured: true,
    qrCode: "MCN-EXP-002",
  },
  {
    id: "3",
    titre: "Textiles et Traditions",
    description: "Une collection exceptionnelle de textiles traditionnels africains et leur signification culturelle.",
    image: "/textile_traditions.jpg",
    dateDebut: "2025-03-10",
    dateFin: "2025-09-20",
    categorie: "Artisanat",
    qrCode: "MCN-EXP-003",
  },
  {
    id: "4",
    titre: "Musique et Instruments Traditionnels",
    description:
      "Explorez la richesse musicale africaine à travers une collection d'instruments traditionnels et leurs histoires.",
    image: "/musique_instrument.jpg",
    dateDebut: "2025-04-01",
    dateFin: "2025-10-30",
    categorie: "Culture",
    featured: false,
    qrCode: "MCN-EXP-004",
  },
  {
    id: "5",
    titre: "Sculptures Ancestrales",
    description: "Une exposition dédiée aux sculptures ancestrales qui racontent l'histoire des peuples africains.",
    image: "/sculptures_ancestrale.jpg",
    dateDebut: "2025-05-15",
    dateFin: "2025-11-15",
    categorie: "Art",
    featured: true,
    qrCode: "MCN-EXP-005",
  },
  {
    id: "6",
    titre: "Bijoux et Parures Royales",
    description: "Découvrez l'art de la parure à travers les bijoux et ornements des cours royales africaines.",
    image: "/bijoux.jpg",
    dateDebut: "2025-06-01",
    dateFin: "2025-12-31",
    categorie: "Artisanat",
    featured: false,
    qrCode: "MCN-EXP-006",
  },
  {
    id: "7",
    titre: "Photographie Africaine Moderne",
    description: "Une collection de photographies contemporaines capturant la vie et la culture africaine moderne.",
    image: "/photographie_moderne.jpg",
    dateDebut: "2025-07-10",
    dateFin: "2026-01-20",
    categorie: "Art Contemporain",
    featured: false,
    qrCode: "MCN-EXP-007",
  },
  {
    id: "8",
    titre: "Céramiques et Poteries Anciennes",
    description: "Explorez l'art de la céramique africaine à travers les âges et les régions.",
    image: "/ceramique_poterie_ancienne.jpg",
    dateDebut: "2025-08-05",
    dateFin: "2026-02-15",
    categorie: "Artisanat",
    featured: false,
    qrCode: "MCN-EXP-008",
  },
]

export const evenements: Evenement[] = [
  {
    id: "1",
    titre: "Conférence: L'héritage des civilisations noires",
    date: "2025-05-15",
    lieu: "Auditorium Principal",
    description:
      "Une conférence exceptionnelle avec des historiens renommés sur l'impact des civilisations africaines.",
    lienInscription: "/evenements/1/inscription",
    image: "/conference-auditorium-african-culture.jpg",
  },
  {
    id: "2",
    titre: "Atelier de Percussion Africaine",
    date: "2025-05-22",
    lieu: "Salle des Ateliers",
    description: "Apprenez les rythmes traditionnels africains avec des musiciens professionnels.",
    lienInscription: "/evenements/2/inscription",
    image: "/african-drums-percussion-workshop.jpg",
  },
  {
    id: "3",
    titre: "Visite Guidée Nocturne",
    date: "2025-06-05",
    lieu: "Musée MCN",
    description: "Découvrez le musée sous un nouveau jour lors de notre visite guidée nocturne exclusive.",
    lienInscription: "/evenements/3/inscription",
    image: "/museum-night-tour-lighting.jpg",
  },
]

export const billets: Billet[] = [
  {
    id: "1",
    type: "Adulte",
    prix: 5000,
    description: "Accès complet au musée et aux expositions permanentes",
    disponible: true,
  },
  {
    id: "2",
    type: "Étudiant",
    prix: 2500,
    description: "Tarif réduit pour les étudiants (carte requise)",
    disponible: true,
  },
  {
    id: "3",
    type: "Enfant",
    prix: 1500,
    description: "Pour les enfants de 6 à 12 ans",
    disponible: true,
  },
  {
    id: "4",
    type: "Famille",
    prix: 12000,
    description: "2 adultes + 2 enfants - Économisez 20%",
    disponible: true,
  },
]

export const oeuvres: Oeuvre[] = [
  {
    id: "1",
    titre: "Masque Baoulé",
    artiste: "Artisan Baoulé",
    type: "Sculpture",
    description:
      "Masque cérémoniel traditionnel de la culture Baoulé de Côte d'Ivoire, utilisé lors des rituels sacrés.",
    image: "/baule-mask-african-art.jpg",
    audioUrls: {
      fr: "/audio/masque-baoule-fr.mp3",
      en: "/audio/masque-baoule-en.mp3",
      wo: "/audio/masque-baoule-wo.mp3"
    },
    qrCode: "MCN-OEU-001",
    expositionId: "1",
    location: {
      salle: "Salle A - Royaumes",
      etage: "Rez-de-chaussée",
      position: { x: 120, y: 80 },
    },
  },
  {
    id: "2",
    titre: "Trône Ashanti",
    artiste: "Royaume Ashanti",
    type: "Mobilier Royal",
    description: "Trône royal du royaume Ashanti, symbole de pouvoir et de prestige.",
    image: "/ashanti-throne-golden-stool.jpg",
    audioUrls: {
      fr: "/audio/trone-ashanti-fr.mp3",
      en: "/audio/trone-ashanti-en.mp3",
      wo: "/audio/trone-ashanti-wo.mp3"
    },
    videoUrl: "/video/trone-ashanti.mp4",
    qrCode: "MCN-OEU-002",
    expositionId: "1",
    location: {
      salle: "Salle A - Royaumes",
      etage: "Rez-de-chaussée",
      position: { x: 180, y: 120 },
    },
  },
  {
    id: "3",
    titre: "Épée Royale du Mali",
    artiste: "Forgeron Malien",
    type: "Arme Historique",
    description: "Épée cérémonielle utilisée par les empereurs du Mali, symbole de souveraineté.",
    image: "/epeeroyale_mali.jpg",
    audioUrls: {
      fr: "/audio/epee-mali-fr.mp3",
      en: "/audio/epee-mali-en.mp3",
      wo: "/audio/epee-mali-wo.mp3"
    },
    qrCode: "MCN-OEU-003",
    expositionId: "1",
    location: {
      salle: "Salle A - Royaumes",
      etage: "Rez-de-chaussée",
      position: { x: 250, y: 100 },
    },
  },
  {
    id: "4",
    titre: "Peinture Abstraite - Renaissance Africaine",
    artiste: "Kofi Anansi",
    type: "Peinture Contemporaine",
    description: "Une œuvre abstraite représentant la renaissance culturelle africaine moderne.",
    image: "/contemporary-african-art-gallery.jpg",
    audioUrls: {
      fr: "/audio/peinture-abstraite-fr.mp3",
      en: "/audio/peinture-abstraite-en.mp3",
      wo: "/audio/peinture-abstraite-wo.mp3"
    },
    qrCode: "MCN-OEU-004",
    expositionId: "2",
    location: {
      salle: "Salle B - Contemporain",
      etage: "1er Étage",
      position: { x: 50, y: 150 },
    },
  },
  {
    id: "5",
    titre: "Sculpture Métallique - Identité",
    artiste: "Amina Diallo",
    type: "Sculpture Moderne",
    description: "Sculpture en métal explorant les thèmes de l'identité et de la diaspora africaine.",
    image: "/sculpture_metallique.jpg",
    audioUrls: {
      fr: "/audio/sculpture-metal-fr.mp3",
      en: "/audio/sculpture-metal-en.mp3",
      wo: "/audio/sculpture-metal-wo.mp3"
    },
    qrCode: "MCN-OEU-005",
    expositionId: "2",
    location: {
      salle: "Salle B - Contemporain",
      etage: "1er Étage",
      position: { x: 120, y: 200 },
    },
  },
  {
    id: "6",
    titre: "Tissu Kente Traditionnel",
    artiste: "Tisserand Ashanti",
    type: "Textile",
    description: "Tissu kente traditionnel du Ghana, symbole de statut social et culturel.",
    image: "/african-traditional-textiles-patterns.jpg",
    audioUrls: {
      fr: "/audio/tissu-kente-fr.mp3",
      en: "/audio/tissu-kente-en.mp3",
      wo: "/audio/tissu-kente-wo.mp3"
    },
    qrCode: "MCN-OEU-006",
    expositionId: "3",
    location: {
      salle: "Salle C - Textiles",
      etage: "Rez-de-chaussée",
      position: { x: 80, y: 60 },
    },
  },
  {
    id: "7",
    titre: "Robe Royale Yoruba",
    artiste: "Artisan Yoruba",
    type: "Vêtement Traditionnel",
    description: "Robe cérémonielle brodée utilisée lors des cérémonies royales au Nigeria.",
    image: "/robe_royale_yoruba.jpg",
    audioUrls: {
      fr: "/audio/robe-yoruba-fr.mp3",
      en: "/audio/robe-yoruba-en.mp3",
      wo: "/audio/robe-yoruba-wo.mp3"
    },
    qrCode: "MCN-OEU-007",
    expositionId: "3",
    location: {
      salle: "Salle C - Textiles",
      etage: "Rez-de-chaussée",
      position: { x: 150, y: 90 },
    },
  },
  {
    id: "8",
    titre: "Tambour Djembe",
    artiste: "Luthier Guinéen",
    type: "Instrument Musical",
    description: "Tambour traditionnel djembe de Guinée, essentiel dans la musique africaine.",
    image: "/african-drums-percussion-workshop.jpg",
    audioUrls: {
      fr: "/audio/djembe-fr.mp3",
      en: "/audio/djembe-en.mp3",
      wo: "/audio/djembe-wo.mp3"
    },
    qrCode: "MCN-OEU-008",
    expositionId: "4",
    location: {
      salle: "Salle D - Musique",
      etage: "1er Étage",
      position: { x: 100, y: 120 },
    },
  },
  {
    id: "9",
    titre: "Kora Médiévale",
    artiste: "Griot Mandingue",
    type: "Instrument à Cordes",
    description: "Harpe-luth traditionnelle utilisée par les griots pour raconter l'histoire orale.",
    image: "/kora_medievale.jpg",
    audioUrls: {
      fr: "/audio/kora-fr.mp3",
      en: "/audio/kora-en.mp3",
      wo: "/audio/kora-wo.mp3"
    },
    qrCode: "MCN-OEU-009",
    expositionId: "4",
    location: {
      salle: "Salle D - Musique",
      etage: "1er Étage",
      position: { x: 180, y: 140 },
    },
  },
  {
    id: "10",
    titre: "Statue Ancestrale Dogon",
    artiste: "Sculpteur Dogon",
    type: "Sculpture Rituale",
    description: "Statue représentant un ancêtre, utilisée dans les rituels funéraires des Dogons.",
    image: "/african-ancestral-sculptures-wood.jpg",
    audioUrls: {
      fr: "/audio/statue-dogon-fr.mp3",
      en: "/audio/statue-dogon-en.mp3",
      wo: "/audio/statue-dogon-wo.mp3"
    },
    qrCode: "MCN-OEU-010",
    expositionId: "5",
    location: {
      salle: "Salle E - Sculptures",
      etage: "Rez-de-chaussée",
      position: { x: 70, y: 110 },
    },
  },
  {
    id: "11",
    titre: "Masque Funéraire Bamana",
    artiste: "Artisan Bamana",
    type: "Masque Cérémoniel",
    description: "Masque utilisé lors des cérémonies funéraires dans la culture Bamana du Mali.",
    image: "/placeholder.jpg",
    audioUrls: {
      fr: "/audio/masque-bamana-fr.mp3",
      en: "/audio/masque-bamana-en.mp3",
      wo: "/audio/masque-bamana-wo.mp3"
    },
    qrCode: "MCN-OEU-011",
    expositionId: "5",
    location: {
      salle: "Salle E - Sculptures",
      etage: "Rez-de-chaussée",
      position: { x: 140, y: 130 },
    },
  },
  {
    id: "12",
    titre: "Collier Royal en Or",
    artiste: "Orfèvre Ashanti",
    type: "Bijou Royal",
    description: "Collier en or massif porté par les rois Ashanti, symbole de richesse et de pouvoir.",
    image: "/collier_royale.jpg",
    audioUrls: {
      fr: "/audio/collier-or-fr.mp3",
      en: "/audio/collier-or-en.mp3",
      wo: "/audio/collier-or-wo.mp3"
    },
    qrCode: "MCN-OEU-012",
    expositionId: "6",
    location: {
      salle: "Salle F - Bijoux",
      etage: "1er Étage",
      position: { x: 90, y: 80 },
    },
  },
  {
    id: "13",
    titre: "Bracelets en Ivoire",
    artiste: "Artisan Maasai",
    type: "Parure Traditionnelle",
    description: "Bracelets en ivoire sculpté portés par les guerriers Maasai du Kenya.",
    image: "/bracelet_ivoire.jpg",
    audioUrls: {
      fr: "/audio/bracelets-ivoire-fr.mp3",
      en: "/audio/bracelets-ivoire-en.mp3",
      wo: "/audio/bracelets-ivoire-wo.mp3"
    },
    qrCode: "MCN-OEU-013",
    expositionId: "6",
    location: {
      salle: "Salle F - Bijoux",
      etage: "1er Étage",
      position: { x: 160, y: 100 },
    },
  },
  {
    id: "14",
    titre: "Portrait de Femme Africaine",
    artiste: "Samuel Fosso",
    type: "Photographie Artistique",
    description: "Portrait en noir et blanc capturant la beauté et la dignité des femmes africaines.",
    image: "/modern-african-photography-exhibition.jpg",
    audioUrls: {
      fr: "/audio/portrait-femme-fr.mp3",
      en: "/audio/portrait-femme-en.mp3",
      wo: "/audio/portrait-femme-wo.mp3"
    },
    qrCode: "MCN-OEU-014",
    expositionId: "7",
    location: {
      salle: "Salle G - Photographie",
      etage: "2ème Étage",
      position: { x: 110, y: 90 },
    },
  },
  {
    id: "15",
    titre: "Rue de Dakar",
    artiste: "Mama Casset",
    type: "Photographie Urbaine",
    description: "Photographie documentaire montrant la vie quotidienne dans les rues de Dakar.",
    image: "/placeholder.jpg",
    audioUrls: {
      fr: "/audio/rue-dakar-fr.mp3",
      en: "/audio/rue-dakar-en.mp3",
      wo: "/audio/rue-dakar-wo.mp3"
    },
    qrCode: "MCN-OEU-015",
    expositionId: "7",
    location: {
      salle: "Salle G - Photographie",
      etage: "2ème Étage",
      position: { x: 180, y: 120 },
    },
  },
  {
    id: "16",
    titre: "Pot en Terre Cuite Berbère",
    artiste: "Potier Berbère",
    type: "Céramique Ancienne",
    description: "Pot traditionnel en terre cuite utilisé pour le stockage dans les communautés berbères.",
    image: "/african-ancient-pottery-ceramics.jpg",
    audioUrls: {
      fr: "/audio/pot-terre-fr.mp3",
      en: "/audio/pot-terre-en.mp3",
      wo: "/audio/pot-terre-wo.mp3"
    },
    qrCode: "MCN-OEU-016",
    expositionId: "8",
    location: {
      salle: "Salle H - Céramiques",
      etage: "Rez-de-chaussée",
      position: { x: 130, y: 70 },
    },
  },
  {
    id: "17",
    titre: "Vase Nubien Décoré",
    artiste: "Artisan Nubien",
    type: "Céramique Ornementale",
    description: "Vase décoré de motifs géométriques de la civilisation nubienne ancienne.",
    image: "/placeholder.jpg",
    audioUrls: {
      fr: "/audio/vase-nubien-fr.mp3",
      en: "/audio/vase-nubien-en.mp3",
      wo: "/audio/vase-nubien-wo.mp3"
    },
    qrCode: "MCN-OEU-017",
    expositionId: "8",
    location: {
      salle: "Salle H - Céramiques",
      etage: "Rez-de-chaussée",
      position: { x: 200, y: 110 },
    },
  },
]
