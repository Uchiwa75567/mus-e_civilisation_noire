import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const {
      email,
      nom,
      prenom,
      reservationId,
      date,
      heure,
      type,
      quantite,
      total,
      qrCodeData
    } = await request.json()

    // Configuration du transporteur email
    // Pour la démonstration, on utilise un transporteur de test
    // En production, remplacez par vos vraies credentials SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "test@example.com",
        pass: process.env.EMAIL_PASS || "testpassword"
      }
    })

    // Contenu de l'email
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de réservation - Musée des Civilisations Noires</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1a365d, #2d3748); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .reservation-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1a365d; }
          .qr-code { text-align: center; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; }
          .important { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Musée des Civilisations Noires</h1>
            <h2>Confirmation de réservation</h2>
          </div>

          <div class="content">
            <p>Bonjour <strong>${prenom} ${nom}</strong>,</p>

            <p>Votre réservation a été confirmée avec succès ! Voici les détails de votre visite :</p>

            <div class="reservation-details">
              <h3>Détails de la réservation</h3>
              <p><strong>Numéro de réservation :</strong> ${reservationId}</p>
              <p><strong>Date de visite :</strong> ${new Date(date).toLocaleDateString('fr-FR')}</p>
              <p><strong>Heure :</strong> ${heure}</p>
              <p><strong>Type de billet :</strong> ${type}</p>
              <p><strong>Quantité :</strong> ${quantite}</p>
              <p><strong>Montant total :</strong> ${total.toLocaleString('fr-FR')} FCFA</p>
            </div>

            <div class="important">
              <h4>📋 Informations importantes</h4>
              <ul>
                <li>Présentez ce billet (imprimé ou sur mobile) à l'entrée du musée</li>
                <li>Arrivez 15 minutes avant l'heure de votre visite</li>
                <li>Le musée ouvre à 9h00 et ferme à 18h00</li>
                <li>Conservez ce billet pendant toute votre visite</li>
              </ul>
            </div>

            <div class="qr-code">
              <p><strong>Votre QR Code de validation :</strong></p>
              <p>Scannez ce code à l'entrée du musée</p>
              <p><em>Code QR intégré dans l'application mobile</em></p>
            </div>

            <p>Nous vous souhaitons une excellente visite au Musée des Civilisations Noires !</p>

            <p>Cordialement,<br>
            L'équipe du Musée des Civilisations Noires</p>
          </div>

          <div class="footer">
            <p>Cette réservation est personnelle et non cessible.</p>
            <p>Pour toute question, contactez-nous : contact@mcn.sn</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Options de l'email
    const mailOptions = {
      from: `"Musée des Civilisations Noires" <${process.env.EMAIL_USER || "noreply@mcn.sn"}>`,
      to: email,
      subject: `Confirmation de réservation - ${reservationId}`,
      html: htmlContent
    }

    // Envoi de l'email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({
      success: true,
      message: "Email envoyé avec succès"
    })

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return NextResponse.json({
      success: false,
      message: "Erreur lors de l'envoi de l'email"
    }, { status: 500 })
  }
}
