import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import QRCode from "qrcode"

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

    // Vérifier si les credentials email sont configurés
    const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASS && 
                           process.env.EMAIL_USER !== "test@example.com"

    if (!emailConfigured) {
      console.warn("⚠️ Configuration email manquante. L'email ne sera pas envoyé.")
      console.warn("📧 Pour configurer l'envoi d'emails, consultez README-EMAIL.md")
      
      // En mode développement, on simule un succès
      return NextResponse.json({
        success: true,
        message: "Email simulé (configuration manquante)",
        warning: "Les credentials email ne sont pas configurés. Consultez README-EMAIL.md"
      })
    }

    // Générer le QR code en base64 pour l'inclure dans l'email
    let qrCodeImage = ""
    try {
      qrCodeImage = await QRCode.toDataURL(qrCodeData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
    } catch (error) {
      console.error("Erreur lors de la génération du QR code:", error)
    }

    // Configuration du transporteur email
    const smtpConfig = {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }

    const transporter = nodemailer.createTransport(smtpConfig)

    // Vérifier la connexion SMTP avant d'envoyer
    try {
      await transporter.verify()
      console.log("✅ Connexion SMTP établie avec succès")
    } catch (verifyError) {
      console.error("❌ Erreur de connexion SMTP:", verifyError)
      
      // Messages d'erreur spécifiques
      const errorMessage = verifyError instanceof Error ? verifyError.message : String(verifyError)
      
      if (errorMessage.includes("Application-specific password required") || 
          errorMessage.includes("InvalidSecondFactor")) {
        return NextResponse.json({
          success: false,
          message: "Configuration Gmail incorrecte",
          error: "Vous devez utiliser un mot de passe d'application Gmail. Consultez README-EMAIL.md pour les instructions.",
          details: "Allez sur https://myaccount.google.com/apppasswords pour générer un mot de passe d'application"
        }, { status: 401 })
      }
      
      if (errorMessage.includes("Invalid login") || errorMessage.includes("Bad username / password")) {
        return NextResponse.json({
          success: false,
          message: "Identifiants email invalides",
          error: "Vérifiez vos EMAIL_USER et EMAIL_PASS dans .env.local",
          details: "Pour Gmail: utilisez un mot de passe d'application (16 caractères), pas votre mot de passe normal. Consultez README-EMAIL.md"
        }, { status: 401 })
      }
      
      throw verifyError
    }

    // Contenu de l'email avec QR code intégré
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de réservation - Musée des Civilisations Noires</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 28px;
            font-weight: 700;
          }
          .header h2 {
            margin: 0;
            font-size: 18px;
            font-weight: 400;
            opacity: 0.9;
          }
          .content { 
            padding: 40px 30px;
          }
          .greeting {
            font-size: 16px;
            margin-bottom: 20px;
          }
          .reservation-details { 
            background: #f8f9fa; 
            padding: 25px; 
            border-radius: 8px; 
            margin: 25px 0; 
            border-left: 4px solid #1a365d;
          }
          .reservation-details h3 {
            margin-top: 0;
            color: #1a365d;
            font-size: 18px;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
          }
          .detail-row:last-child {
            border-bottom: none;
          }
          .detail-label {
            font-weight: 600;
            color: #495057;
          }
          .detail-value {
            color: #212529;
          }
          .qr-section { 
            text-align: center; 
            margin: 30px 0;
            padding: 30px;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            border-radius: 8px;
          }
          .qr-section h3 {
            color: #1a365d;
            margin-top: 0;
            font-size: 20px;
          }
          .qr-section p {
            color: #6c757d;
            margin: 10px 0;
          }
          .qr-code-image {
            margin: 20px auto;
            padding: 15px;
            background: white;
            border-radius: 8px;
            display: inline-block;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .important { 
            background: #fff3cd; 
            border: 2px solid #ffc107; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 25px 0;
          }
          .important h4 {
            margin-top: 0;
            color: #856404;
            font-size: 16px;
          }
          .important ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .important li {
            margin: 8px 0;
            color: #856404;
          }
          .cta-button {
            display: inline-block;
            padding: 12px 30px;
            background: #1a365d;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 600;
          }
          .footer { 
            text-align: center; 
            padding: 30px; 
            background: #f8f9fa;
            color: #6c757d;
            font-size: 14px;
          }
          .footer p {
            margin: 8px 0;
          }
          .contact-info {
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid #dee2e6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏛️ Musée des Civilisations Noires</h1>
            <h2>Confirmation de réservation</h2>
          </div>

          <div class="content">
            <p class="greeting">Bonjour <strong>${prenom} ${nom}</strong>,</p>

            <p>Votre réservation a été confirmée avec succès ! Nous sommes ravis de vous accueillir au Musée des Civilisations Noires.</p>

            <div class="reservation-details">
              <h3>📋 Détails de votre réservation</h3>
              <div class="detail-row">
                <span class="detail-label">Numéro de réservation</span>
                <span class="detail-value"><strong>${reservationId}</strong></span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date de visite</span>
                <span class="detail-value">${new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Heure d'arrivée</span>
                <span class="detail-value">${heure}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Type de billet</span>
                <span class="detail-value">${type}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Nombre de personnes</span>
                <span class="detail-value">${quantite} personne${quantite > 1 ? 's' : ''}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Montant payé</span>
                <span class="detail-value"><strong>${total.toLocaleString('fr-FR')} FCFA</strong></span>
              </div>
            </div>

            <div class="qr-section">
              <h3>🎫 Votre billet d'entrée</h3>
              <p><strong>Présentez ce QR code à l'entrée du musée</strong></p>
              <p style="font-size: 14px;">Vous pouvez l'afficher sur votre téléphone ou l'imprimer</p>
              ${qrCodeImage ? `
                <div class="qr-code-image">
                  <img src="${qrCodeImage}" alt="QR Code de réservation" style="width: 250px; height: 250px; display: block;" />
                </div>
                <p style="font-size: 12px; color: #6c757d; margin-top: 15px;">
                  Code: ${reservationId}
                </p>
              ` : `
                <p style="color: #dc3545;">Le QR code n'a pas pu être généré. Veuillez présenter votre numéro de réservation.</p>
              `}
            </div>

            <div class="important">
              <h4>⚠️ Informations importantes</h4>
              <ul>
                <li><strong>Arrivez 15 minutes avant</strong> l'heure de votre visite pour faciliter votre entrée</li>
                <li>Le musée est ouvert du <strong>mardi au dimanche de 9h00 à 18h00</strong></li>
                <li>Fermé le lundi</li>
                <li>Ce billet est <strong>valable uniquement pour la date et l'heure indiquées</strong></li>
                <li>Conservez ce billet pendant toute votre visite</li>
                <li>Le billet est personnel et non transférable</li>
              </ul>
            </div>

            <div style="text-align: center;">
              <p>📍 <strong>Adresse :</strong> Route de l'Aéroport, Dakar, Sénégal</p>
              <p>📞 <strong>Contact :</strong> +221 33 849 00 00</p>
            </div>

            <p style="margin-top: 30px;">Nous vous souhaitons une excellente visite et une découverte enrichissante de nos collections !</p>

            <p style="margin-top: 20px;">Cordialement,<br>
            <strong>L'équipe du Musée des Civilisations Noires</strong></p>
          </div>

          <div class="footer">
            <p><strong>Musée des Civilisations Noires</strong></p>
            <p>Route de l'Aéroport, Dakar, Sénégal</p>
            <div class="contact-info">
              <p>📧 contact@mcn.sn | 📞 +221 33 849 00 00</p>
              <p style="font-size: 12px; margin-top: 15px;">
                Cette réservation est personnelle et non cessible.<br>
                Pour toute question, n'hésitez pas à nous contacter.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    // Options de l'email
    const mailOptions = {
      from: `"Musée des Civilisations Noires" <${process.env.EMAIL_USER || "noreply@mcn.sn"}>`,
      to: email,
      subject: `✅ Confirmation de réservation - ${reservationId} - MCN`,
      html: htmlContent
    }

    // Envoi de l'email
    try {
      await transporter.sendMail(mailOptions)
      console.log(`✅ Email envoyé avec succès à ${email}`)
      
      return NextResponse.json({
        success: true,
        message: "Email envoyé avec succès"
      })
    } catch (sendError) {
      console.error("❌ Erreur lors de l'envoi de l'email:", sendError)
      throw sendError
    }

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    return NextResponse.json({
      success: false,
      message: "Erreur lors de l'envoi de l'email",
      error: errorMessage,
      help: "Consultez README-EMAIL.md pour la configuration"
    }, { status: 500 })
  }
}