"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { AlertCircle, CheckCircle, ExternalLink } from "lucide-react"

interface EmailConfigHelpProps {
  error?: string
  onClose?: () => void
}

export function EmailConfigHelp({ error, onClose }: EmailConfigHelpProps) {
  return (
    <Card className="border-amber-600/30 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-950">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-amber-600" />
            <div>
              <CardTitle className="text-amber-900 dark:text-amber-100">
                Configuration Email Requise
              </CardTitle>
              <CardDescription className="text-amber-700 dark:text-amber-300">
                Pour envoyer des emails de confirmation avec QR code
              </CardDescription>
            </div>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4">
            <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
              ❌ Erreur: {error}
            </p>
            {(error.includes("Bad username") || error.includes("Invalid login")) && (
              <div className="mt-3 text-xs text-red-700 dark:text-red-300 space-y-1">
                <p>✓ Vérifiez que EMAIL_USER est votre email complet (ex: votre-email@gmail.com)</p>
                <p>✓ Vérifiez que EMAIL_PASS est un mot de passe d'application (16 caractères)</p>
                <p>✗ N'utilisez PAS votre mot de passe Gmail normal</p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100">
            📋 Configuration Gmail (Recommandé pour le développement)
          </h4>
          
          <ol className="space-y-3 text-sm text-amber-800 dark:text-amber-200">
            <li className="flex gap-3">
              <span className="font-bold min-w-[24px]">1.</span>
              <div>
                <p className="font-medium mb-1">Activez la validation en 2 étapes</p>
                <a 
                  href="https://myaccount.google.com/security" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  Paramètres de sécurité Google
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="font-bold min-w-[24px]">2.</span>
              <div>
                <p className="font-medium mb-1">Générez un mot de passe d'application</p>
                <a 
                  href="https://myaccount.google.com/apppasswords" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  Créer un mot de passe d'application
                  <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-xs mt-1 text-amber-700 dark:text-amber-300">
                  Sélectionnez "Autre" et nommez-le "MCN Museum"
                </p>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="font-bold min-w-[24px]">3.</span>
              <div>
                <p className="font-medium mb-1">Créez le fichier .env.local à la racine du projet</p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-xs mt-2 overflow-x-auto">
                  <div className="text-green-400"># Votre email Gmail complet</div>
                  <div>EMAIL_USER=votre-email@gmail.com</div>
                  <div className="text-green-400 mt-2"># Le mot de passe d'application (16 caractères avec espaces)</div>
                  <div>EMAIL_PASS=abcd efgh ijkl mnop</div>
                </div>
                <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded text-xs">
                  <p className="font-bold text-yellow-800 dark:text-yellow-200">⚠️ Important:</p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    Le mot de passe doit être celui généré à l'étape 2 (16 caractères), 
                    PAS votre mot de passe Gmail normal !
                  </p>
                </div>
              </div>
            </li>

            <li className="flex gap-3">
              <span className="font-bold min-w-[24px]">4.</span>
              <div>
                <p className="font-medium mb-1">Redémarrez le serveur</p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-xs mt-2">
                  npm run dev
                </div>
              </div>
            </li>
          </ol>
        </div>

        <div className="border-t border-amber-300 dark:border-amber-700 pt-4">
          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
            🚀 Alternative: SendGrid (Production)
          </h4>
          <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
            Pour la production, utilisez SendGrid (100 emails/jour gratuits) :
          </p>
          <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-xs overflow-x-auto">
            <div>EMAIL_USER=apikey</div>
            <div>EMAIL_PASS=SG.votre-clé-api</div>
            <div>SMTP_HOST=smtp.sendgrid.net</div>
            <div>SMTP_PORT=587</div>
          </div>
          <a 
            href="https://sendgrid.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-2 text-sm"
          >
            Créer un compte SendGrid
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div className="text-sm text-green-800 dark:text-green-200">
              <p className="font-medium mb-1">Mode développement actif</p>
              <p>
                Les réservations fonctionnent normalement. Les emails sont simulés jusqu'à 
                ce que vous configuriez les credentials SMTP.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <a href="/README-EMAIL.md" target="_blank">
              📖 Documentation complète
            </a>
          </Button>
          {onClose && (
            <Button onClick={onClose} className="flex-1">
              Compris
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}