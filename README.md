# VisionaryTech - DataXtrak Site Web

Ce dossier contient le code source complet du site web vitrine pour le logiciel DataXtrak de VisionaryTech.

## Structure du projet

- `index.html` : La page principale (Accueil, Présentation, Tarifs, Contact).
- `download.html` : La page secondaire dédiée au téléchargement.
- `style.css` : Le fichier de style gérant le design "Dark Mode", les couleurs et le layout.
- `main.js` : Le script gérant le menu mobile, les animations au défilement et la simulation du formulaire.
- `assets/` : Dossier contenant les images générées (illustrations IA, mockup).

## Comment modifier les textes et les liens ?

Toutes les modifications de contenu se font directement dans les fichiers `.html`.

### 1. Modifier un texte sur l'accueil (`index.html`)

Ouvrez le fichier `index.html` avec un éditeur de texte (Bloc-notes, VS Code, ou TextEdit).
Cherchez le texte que vous voulez modifier. Par exemple, pour changer la présentation de l'entreprise :
```html
<!-- VisionaryTech Intro -->
<p class="about-text">
    <strong>VisionaryTech</strong> est une startup deeptech basée à Montpellier...
</p>
```
Il suffit de modifier le texte entre les balises `<p>` et `</p>`. Sauvegardez le fichier.

### 2. Modifier les liens de téléchargement (`download.html`)

Ouvrez le fichier `download.html`. Trouvez les boutons de téléchargement :
```html
<a href="https://github.com/visionarytech/dataxtrak/releases/latest" class="btn btn-primary ...">
    Télécharger pour MacOS
</a>
```
Remplacez l'URL `https://github.com/...` par le lien réel de votre release GitHub (ou de votre fichier `.dmg` / `.exe`).

### 3. Modifier les tarifs

Dans `index.html`, descendez jusqu'à la section `<!-- Pricing -->`. Cherchez la carte que vous voulez modifier (par exemple Pro) :
```html
<div class="pricing-price">99€<span class="pricing-period">HT/mois</span></div>
```
Modifiez le "99" par votre nouveau prix.

## Comment déployer le site ?

Ce site est statique (HTML/CSS/JS purs). Il ne nécessite pas de serveur Node.js ni de base de données.
Vous pouvez directement héberger les fichiers sur :
- **Gandi** (en les déposant via FTP dans le dossier `htdocs` ou `public_html`).
- **GitHub Pages**, **Vercel** ou **Netlify** (gratuit, glissez-déposez le dossier du projet en ligne).
- N'importe quel hébergement mutualisé standard.

## Paramètres SEO inclus

- Les balises Title et Meta Description sont configurées sur les pages.
- Le tag Open Graph (`og:image`, `og:title`) est en place pour un bel affichage sur LinkedIn et WhatsApp.
- Le code Google Analytics 4 (GA4) est pré-installé dans le `<head>` de `index.html`. 
👉 **N'oubliez pas de remplacer `G-XXXXXXXXXX` par votre vrai code de suivi GA4.**
