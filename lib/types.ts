// Core data types for the MCN Museum application

export interface Exposition {
  id: string
  titre: string
  description: string
  image: string
  dateDebut: string
  dateFin: string
  categorie: string
  featured?: boolean
  qrCode?: string
}

export interface Evenement {
  id: string
  titre: string
  date: string
  lieu: string
  description: string
  lienInscription?: string
  image: string
}

export interface Billet {
  id: string
  type: string
  prix: number
  description: string
  disponible: boolean
}

export interface Oeuvre {
  id: string
  titre: string
  artiste: string
  type: string
  description: string
  image: string
  audioUrl?: string
  videoUrl?: string
  qrCode: string
  expositionId: string
  location: {
    salle: string
    etage: string
    position: {
      x: number
      y: number
    }
  }
}

export interface MessageContact {
  id: string
  nom: string
  email: string
  sujet: string
  message: string
  date: string
}

export interface CartItem {
  billetId: string
  type: string
  prix: number
  quantite: number
}
