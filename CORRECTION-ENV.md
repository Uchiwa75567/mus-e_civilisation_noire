# 🔧 Correction de votre fichier .env.local

## ❌ Problème détecté

Votre fichier `.env.local` contient des **doublons** et des **erreurs de configuration** :

```env
# ❌ INCORRECT - Ne faites pas ça !
EMAIL_USER=bachirdev310@gmail.com
EMAIL_PASS=qbir lvxm thkh clrh
EMAIL_USER="Mail Send"              # ❌ Doublon + valeur incorrecte
EMAIL_PASS=
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
```

**Problèmes** :
1. ❌ `EMAIL_USER` et `EMAIL_PASS` sont définis **deux fois**
2. ❌ Les dernières valeurs écrasent les premières
3. ❌ `EMAIL_USER="Mail Send"` est incorrect pour SendGrid (doit être `apikey`)
4. ❌ Vous mélangez Gmail et SendGrid dans le même fichier

---

## ✅ Solution : Choisissez UNE option

### Option A : Utiliser Gmail (Recommandé pour développement)

**Supprimez tout** dans `.env.local` et remplacez par :

```env
EMAIL_USER=bachirdev310@gmail.com
EMAIL_PASS=qbir lvxm thkh clrh
```

**C'est tout !** Pas besoin de `SMTP_HOST` ni `SMTP_PORT` pour Gmail (valeurs par défaut).

---

### Option B : Utiliser SendGrid (Recommandé pour production)

**Supprimez tout** dans `.env.local` et remplacez par :

```env
EMAIL_USER=apikey
EMAIL_PASS=
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
```

**⚠️ Important** : 
- `EMAIL_USER` doit être exactement `apikey` (pas votre email, pas "Mail Send")
- `EMAIL_PASS` est votre clé API SendGrid (commence par `SG.`)

---

## 🚀 Étapes de correction

1. **Ouvrez votre fichier `.env.local`** :
   ```bash
   # Chemin complet :
   # /home/bachir-uchiwa/Téléchargements/mcn-museumboubahhbi/mcn-museum/.env.local
   ```

2. **Supprimez TOUT le contenu actuel**

3. **Choisissez une option** (A ou B ci-dessus) et copiez-collez

4. **Sauvegardez le fichier**

5. **Redémarrez le serveur** :
   ```bash
   # Arrêtez avec Ctrl+C
   npm run dev
   ```

6. **Testez** :
   - Faites une réservation
   - Vérifiez les logs du serveur
   - Vérifiez votre boîte email

---

## 🔍 Vérification

Après correction, visitez :
```
http://localhost:3000/api/test-email-config
```

Vous devriez voir :
```json
{
  "configured": true,
  "checks": {
    "emailUserExists": true,
    "emailPassExists": true,
    ...
  }
}
```

---

## 💡 Recommandation

**Pour le développement**, utilisez **Gmail** (Option A) car c'est plus simple.

**Pour la production**, utilisez **SendGrid** (Option B) car :
- ✅ Plus fiable
- ✅ Meilleure délivrabilité
- ✅ 100 emails/jour gratuits
- ✅ Statistiques d'envoi

---

## ❓ Besoin d'aide ?

Si l'erreur persiste après correction :
1. Vérifiez que le fichier `.env.local` est bien à la racine du projet
2. Vérifiez qu'il n'y a pas d'espaces avant/après les `=`
3. Vérifiez qu'il n'y a pas de guillemets autour des valeurs
4. Redémarrez complètement le serveur (pas juste un refresh)

Consultez `README-EMAIL.md` pour plus de détails.