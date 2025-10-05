# 📧 Configuration de l'envoi d'emails - MCN Museum

## Vue d'ensemble

Le système d'envoi d'emails permet d'envoyer automatiquement une confirmation de réservation avec un QR code aux visiteurs après validation de leur paiement.

⚠️ **Note importante** : Si vous voyez l'erreur `Application-specific password required`, suivez les étapes ci-dessous pour configurer Gmail correctement.

## Configuration

### 1. Créer le fichier `.env.local`

À la racine du projet, créez un fichier `.env.local` :

```bash
# Sur Mac/Linux
touch .env.local

# Sur Windows
type nul > .env.local
```

Ou copiez le fichier exemple :

```bash
cp .env.local.example .env.local
```

### 2. Configuration Gmail (Développement)

Pour utiliser Gmail en développement :

1. **Activez la validation en 2 étapes** sur votre compte Google
   - Allez sur https://myaccount.google.com/security
   - Activez "Validation en 2 étapes"

2. **Générez un mot de passe d'application**
   - Allez sur https://myaccount.google.com/apppasswords
   - Sélectionnez "Autre (nom personnalisé)"
   - Nommez-le "MCN Museum"
   - Copiez le mot de passe de 16 caractères généré

3. **Configurez `.env.local`**
   ```env
   EMAIL_USER=votre-email@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx  # Le mot de passe d'application
   ```

### 3. Configuration SendGrid (Production - Recommandé)

SendGrid offre 100 emails gratuits par jour :

1. **Créez un compte** sur https://sendgrid.com
2. **Créez une clé API**
   - Settings > API Keys > Create API Key
   - Donnez-lui les permissions "Mail Send"
3. **Configurez `.env.local`**
   ```env
   EMAIL_USER=apikey
   EMAIL_PASS=SG.votre-clé-api-sendgrid
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   ```

### 4. Configuration Mailgun (Alternative)

1. **Créez un compte** sur https://www.mailgun.com
2. **Obtenez vos credentials SMTP**
3. **Configurez `.env.local`**
   ```env
   EMAIL_USER=postmaster@votre-domaine.mailgun.org
   EMAIL_PASS=votre-clé-api-mailgun
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   ```

## Test de l'envoi d'emails

### Test manuel

1. Démarrez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Allez sur http://localhost:3000/billetterie

3. Complétez une réservation avec votre vraie adresse email

4. Vérifiez votre boîte de réception

### Test avec l'API directement

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "votre-email@example.com",
    "nom": "Test",
    "prenom": "Utilisateur",
    "reservationId": "MCN-TEST-123",
    "date": "2025-06-15",
    "heure": "10:00",
    "type": "Adulte",
    "quantite": 2,
    "total": 10000,
    "qrCodeData": "{\"id\":\"MCN-TEST-123\",\"valide\":true}"
  }'
```

## Dépannage

### Erreur: "Invalid login", "Bad username / password" ou "Application-specific password required"

**Causes communes** :
- ❌ Vous utilisez votre mot de passe Gmail normal au lieu d'un mot de passe d'application
- ❌ Le mot de passe d'application est incorrect ou a été révoqué
- ❌ La validation en 2 étapes n'est pas activée
- ❌ Le fichier `.env.local` n'est pas à la racine du projet
- ❌ Le serveur n'a pas été redémarré après modification de `.env.local`

**Solution étape par étape** :

1. **Vérifiez votre configuration actuelle** :
   ```bash
   # Ouvrez http://localhost:3000/api/test-email-config dans votre navigateur
   # Cela vous montrera l'état de votre configuration
   ```

2. **Activez la validation en 2 étapes** (si pas déjà fait) :
   - Allez sur https://myaccount.google.com/security
   - Activez "Validation en 2 étapes"
   - Attendez quelques minutes que ça prenne effet

3. **Générez un NOUVEAU mot de passe d'application** :
   - Allez sur https://myaccount.google.com/apppasswords
   - Si vous aviez déjà un mot de passe, supprimez-le et créez-en un nouveau
   - Sélectionnez "Autre (nom personnalisé)"
   - Nommez-le "MCN Museum"
   - **Copiez immédiatement** le mot de passe de 16 caractères

4. **Créez/Modifiez `.env.local` à la RACINE du projet** :
   ```bash
   # Le fichier doit être ici :
   # /home/bachir-uchiwa/Téléchargements/mcn-museumboubahhbi/mcn-museum/.env.local
   
   EMAIL_USER=votre-email@gmail.com
   EMAIL_PASS=abcd efgh ijkl mnop
   ```
   
   **⚠️ Points importants** :
   - Le mot de passe fait 16 caractères (peut avoir des espaces)
   - N'ajoutez PAS de guillemets autour des valeurs
   - Utilisez votre email complet (avec @gmail.com)

5. **Redémarrez le serveur** :
   ```bash
   # Arrêtez le serveur (Ctrl+C)
   # Puis relancez
   npm run dev
   ```

6. **Testez à nouveau** :
   - Faites une nouvelle réservation
   - Vérifiez les logs du serveur

**Vérification rapide** :
```bash
# Votre .env.local doit ressembler EXACTEMENT à :
EMAIL_USER=jean.dupont@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop

# PAS de guillemets, PAS de point-virgule à la fin
```

### Erreur: "Connection timeout"

- Vérifiez votre connexion internet
- Certains réseaux d'entreprise bloquent le port 587
- Essayez le port 465 avec `secure: true`

### Erreur: "Connection timeout"

- Vérifiez votre connexion internet
- Certains réseaux d'entreprise bloquent le port 587
- Essayez le port 465 avec `secure: true` dans `.env.local` :
  ```env
  SMTP_PORT=465
  SMTP_SECURE=true
  ```

### Les emails arrivent dans les spams

- Configurez SPF, DKIM et DMARC pour votre domaine
- Utilisez un service professionnel comme SendGrid
- Ajoutez un domaine personnalisé

### Vérifier que le fichier .env.local est bien lu

```bash
# Dans votre terminal, à la racine du projet :
cat .env.local

# Vous devriez voir vos credentials
# Si vous voyez "No such file or directory", le fichier n'existe pas
```

### Le QR code n'apparaît pas

- Vérifiez que la bibliothèque `qrcode` est installée : `npm install qrcode`
- Vérifiez les logs du serveur pour les erreurs de génération
- Le QR code est généré en base64, assurez-vous qu'il n'y a pas de limite de taille d'email

## Logs et monitoring

Les erreurs d'envoi d'email sont loggées dans la console du serveur. En production, configurez un service de monitoring comme :

- Sentry pour les erreurs
- LogRocket pour le replay des sessions
- DataDog pour les métriques

## Limites

### Gmail
- **Limite**: 500 emails/jour
- **Usage**: Développement uniquement

### SendGrid (Gratuit)
- **Limite**: 100 emails/jour
- **Usage**: Petits sites, tests

### SendGrid (Payant)
- **Limite**: À partir de 40 000 emails/mois
- **Usage**: Production

## Mode développement sans configuration

Si vous ne configurez pas les credentials email, l'application fonctionne quand même :
- ✅ Les réservations sont créées normalement
- ✅ Les QR codes sont générés
- ⚠️ Les emails ne sont pas envoyés (simulés)
- 📋 Un message d'aide s'affiche pour vous guider

C'est parfait pour tester l'application sans configurer d'email !

## Sécurité

⚠️ **Important** :
- Ne commitez JAMAIS le fichier `.env.local`
- Ajoutez `.env.local` à `.gitignore` (déjà fait)
- Utilisez des variables d'environnement sur votre plateforme de déploiement (Vercel, Netlify, etc.)
- Changez régulièrement vos mots de passe d'application
- Les mots de passe d'application Gmail peuvent être révoqués à tout moment

## Déploiement en production

### Vercel
1. Allez dans Settings > Environment Variables
2. Ajoutez `EMAIL_USER` et `EMAIL_PASS`
3. Redéployez l'application

### Netlify
1. Allez dans Site settings > Environment variables
2. Ajoutez `EMAIL_USER` et `EMAIL_PASS`
3. Redéployez l'application

## Support

Pour toute question, contactez l'équipe technique du MCN Museum.