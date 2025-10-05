import { NextResponse } from "next/server"

export async function GET() {
  const emailUser = process.env.EMAIL_USER
  const emailPass = process.env.EMAIL_PASS
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  
  const checks = {
    emailUserExists: !!emailUser,
    emailPassExists: !!emailPass,
    emailUserValue: emailUser ? 
      (emailUser.includes('@') ? 
        `${emailUser.substring(0, 3)}***@${emailUser.split('@')[1]}` : 
        emailUser) : 
      'Non défini',
    emailPassLength: emailPass ? emailPass.length : 0,
    emailPassFormat: emailPass ? 
      (emailPass.length === 16 || emailPass.length === 19 ? 
        '✅ OK (16 ou 19 caractères)' : 
        emailPass.startsWith('SG.') ? 
          '✅ OK (Clé API SendGrid)' : 
          `⚠️ ${emailPass.length} caractères`) : 
      'Non défini',
    smtpHost: smtpHost,
    smtpPort: process.env.SMTP_PORT || '587 (par défaut)',
    detectedProvider: smtpHost.includes('sendgrid') ? 'SendGrid' : 
                      smtpHost.includes('mailgun') ? 'Mailgun' : 
                      'Gmail',
  }

  const isConfigured = checks.emailUserExists && 
                       checks.emailPassExists && 
                       emailUser !== "test@example.com"

  const recommendations: string[] = []
  
  if (!checks.emailUserExists) {
    recommendations.push("❌ EMAIL_USER n'est pas défini dans .env.local")
  }
  
  if (!checks.emailPassExists) {
    recommendations.push("❌ EMAIL_PASS n'est pas défini dans .env.local")
  }
  
  if (emailUser === "test@example.com") {
    recommendations.push("⚠️ EMAIL_USER utilise la valeur par défaut")
  }
  
  // Détection de configuration mixte
  if (smtpHost.includes('sendgrid') && emailUser && emailUser !== 'apikey') {
    recommendations.push("❌ ERREUR: Pour SendGrid, EMAIL_USER doit être exactement 'apikey', pas votre email ou autre chose")
  }
  
  if (smtpHost.includes('sendgrid') && emailPass && !emailPass.startsWith('SG.')) {
    recommendations.push("⚠️ Pour SendGrid, EMAIL_PASS devrait commencer par 'SG.' (clé API)")
  }
  
  if (smtpHost.includes('gmail') && emailPass && emailPass.startsWith('SG.')) {
    recommendations.push("❌ ERREUR: Vous utilisez une clé SendGrid avec Gmail. Choisissez un seul provider!")
  }
  
  if (emailUser && emailUser.includes('"')) {
    recommendations.push("❌ ERREUR: EMAIL_USER contient des guillemets. Supprimez-les!")
  }
  
  if (checks.emailPassLength > 0 && 
      checks.emailPassLength !== 16 && 
      checks.emailPassLength !== 19 && 
      !emailPass?.startsWith('SG.')) {
    recommendations.push("⚠️ EMAIL_PASS devrait faire 16 caractères (Gmail) ou commencer par SG. (SendGrid)")
  }
  
  if (isConfigured && recommendations.length === 0) {
    recommendations.push("✅ Configuration semble correcte!")
  }

  return NextResponse.json({
    configured: isConfigured,
    checks,
    recommendations,
    help: recommendations.length > 0 ? 
      "Consultez CORRECTION-ENV.md pour corriger votre configuration" : 
      "Configuration OK. Si l'erreur persiste, vérifiez que le mot de passe est correct."
  }, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
}