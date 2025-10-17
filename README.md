# 🚀 Portfolio Full Stack Professionnel

<div align="center">

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Portfolio moderne et performant avec animations fluides, mode dark/light et CI/CD automatisé vers OVH**

[🌐 Démo en ligne](https://ton-domaine.com) • [📖 Documentation](#documentation) • [🐛 Signaler un bug](https://github.com/username/portfolio/issues)

</div>

---

## 📋 Table des matières

- [✨ Fonctionnalités](#-fonctionnalités)
- [🎨 Aperçu](#-aperçu)
- [🛠️ Technologies](#️-technologies)
- [📦 Installation](#-installation)
- [🚀 Utilisation](#-utilisation)
- [⚙️ Configuration](#️-configuration)
- [🌐 Déploiement](#-déploiement)
- [📁 Structure du projet](#-structure-du-projet)
- [🎯 Personnalisation](#-personnalisation)
- [🧪 Tests](#-tests)
- [📈 Performance](#-performance)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)
- [📞 Contact](#-contact)

---

## ✨ Fonctionnalités

### 🎨 Design & UX
- ✅ **Design moderne et épuré** avec Tailwind CSS
- 🌓 **Mode clair/sombre** avec persistence du choix utilisateur
- 📱 **100% Responsive** - Mobile, Tablet, Desktop
- 🎭 **Animations fluides** avec GSAP et ScrollTrigger
- ⚡ **Performance optimale** - Score Lighthouse 95+

### 🧩 Architecture
- 🏗️ **Architecture modulaire** et scalable
- ♻️ **Composants réutilisables** (Button, Card, etc.)
- 🎯 **Context API** pour la gestion du state global
- 🪝 **Hooks personnalisés** pour la logique métier
- 📦 **Code splitting** automatique avec Vite

### 🚀 DevOps
- 🔄 **CI/CD automatisé** via GitHub Actions
- 📤 **Déploiement automatique** sur OVH via FTP
- 🔐 **Gestion des secrets** sécurisée avec GitHub
- 🧪 **Build optimisé** pour la production
- 📊 **Monitoring** du workflow de déploiement

### 📄 Sections
- 👤 **About** - Présentation personnelle et parcours
- 💼 **Works** - Portfolio de projets avec liens GitHub/Démo
- 🎓 **Skills** - Compétences techniques avec niveaux
- 📧 **Contact** - Footer avec liens sociaux

---

## 🎨 Aperçu

### Mode Light
```
[Ajoute ici une capture d'écran du mode light]
```

### Mode Dark
```
[Ajoute ici une capture d'écran du mode dark]
```

### Animations GSAP
- **Fade In Up** : Apparition au scroll avec slide vertical
- **Stagger Animation** : Cascade d'éléments avec délai
- **Parallax** : Effet de profondeur sur les éléments
- **Hover Effects** : Transitions fluides sur les cartes

---

## 🛠️ Technologies

### Core
- **[React 18.3.1](https://react.dev/)** - Librairie UI
- **[Vite 5.2.0](https://vitejs.dev/)** - Build tool ultra-rapide
- **[Tailwind CSS 3.4.3](https://tailwindcss.com/)** - Framework CSS utilitaire

### Animations & Interactions
- **[GSAP 3.12.5](https://greensock.com/gsap/)** - Animations performantes
- **[ScrollTrigger](https://greensock.com/scrolltrigger/)** - Animations au scroll
- **[React Icons 5.0.1](https://react-icons.github.io/)** - Bibliothèque d'icônes

### DevOps & Tooling
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD
- **[FTP Deploy Action](https://github.com/SamKirkland/FTP-Deploy-Action)** - Déploiement FTP
- **[ESLint](https://eslint.org/)** - Linter JavaScript
- **[PostCSS](https://postcss.org/)** - Traitement CSS

---

## 📦 Installation

### Prérequis

Avant de commencer, assure-toi d'avoir installé :

- **Node.js** >= 18.0.0 ([Télécharger](https://nodejs.org/))
- **npm** >= 9.0.0 (inclus avec Node.js)
- **Git** ([Télécharger](https://git-scm.com/))

### Étapes d'installation

```bash
# 1. Cloner le repository
git clone https://github.com/username/portfolio.git
cd portfolio

# 2. Installer les dépendances
npm install

# 3. Copier le fichier d'environnement
cp .env.example .env

# 4. Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur **http://localhost:3000**

---

## 🚀 Utilisation

### Commandes disponibles

```bash
# Développement
npm run dev          # Lance le serveur de développement (port 3000)

# Production
npm run build        # Compile pour la production dans /dist
npm run preview      # Prévisualise le build de production (port 4173)

# Qualité du code
npm run lint         # Vérifie le code avec ESLint
```

### Mode développement

```bash
npm run dev
```
- ⚡ Hot Module Replacement (HMR) instantané
- 🔍 Messages d'erreur détaillés
- 🎯 Source maps pour le debugging

### Build de production

```bash
npm run build
```
- 📦 Minification du code (JS/CSS)
- 🗜️ Compression des assets
- 🎯 Optimisation des imports
- 📊 Analyse de la taille du bundle

---

## ⚙️ Configuration

### Variables d'environnement

Crée un fichier `.env` à la racine du projet :

```env
# Configuration de l'API (si nécessaire)
VITE_API_URL=https://api.example.com

# Analytics (optionnel)
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Informations de contact
VITE_CONTACT_EMAIL=contact@example.com
```

> ⚠️ **Important** : Ne JAMAIS commit le fichier `.env`. Utilise `.env.example` comme template.

### Personnalisation des couleurs

Édite `tailwind.config.js` :

```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ... ta palette personnalisée
    900: '#0c4a6e',
  }
}
```

### Configuration GSAP

Les animations GSAP sont configurées dans `src/utils/animations.js` :

```javascript
export const ANIMATION_DEFAULTS = {
  duration: 0.8,      // Durée par défaut
  ease: 'power3.out', // Courbe d'animation
  stagger: 0.1,       // Délai entre éléments
};
```

---

## 🌐 Déploiement

### Déploiement automatique sur OVH

#### 1. Configuration des secrets GitHub

Va dans **Settings** → **Secrets and variables** → **Actions** et ajoute :

| Secret | Description | Exemple |
|--------|-------------|---------|
| `FTP_SERVER` | Adresse du serveur FTP OVH | `ftp.cluster042.hosting.ovh.net` |
| `FTP_USERNAME` | Login FTP | `votre-login` |
| `FTP_PASSWORD` | Mot de passe FTP | `votre-mot-de-passe` |

#### 2. Configuration du workflow

Édite `.github/workflows/deploy.yml` si nécessaire :

```yaml
server-dir: /www/  # ← Adapte selon ton hébergement
```

#### 3. Déploiement

```bash
git add .
git commit -m "feat: Mon message de commit"
git push origin main
```

Le déploiement se lance automatiquement ! Consulte l'onglet **Actions** sur GitHub pour suivre la progression.

### Autres plateformes

<details>
<summary><b>Vercel</b> (clic pour voir)</summary>

```bash
npm install -g vercel
vercel --prod
```
</details>

<details>
<summary><b>Netlify</b> (clic pour voir)</summary>

```bash
npm install -g netlify-cli
netlify deploy --prod
```
</details>

<details>
<summary><b>GitHub Pages</b> (clic pour voir)</summary>

1. Ajoute dans `vite.config.js` :
```javascript
base: '/repository-name/'
```

2. Installe gh-pages :
```bash
npm install -D gh-pages
```

3. Ajoute dans `package.json` :
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

4. Déploie :
```bash
npm run deploy
```
</details>

---

## 📁 Structure du projet

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Workflow CI/CD
├── public/
│   ├── favicon.ico
│   └── assets/                  # Images statiques
├── src/
│   ├── components/
│   │   ├── layout/              # Header, Footer, Layout
│   │   ├── ui/                  # Composants UI réutilisables
│   │   └── animations/          # Wrappers GSAP
│   ├── sections/                # Sections principales (About, Works, Skills)
│   ├── context/                 # Context API (ThemeContext)
│   ├── hooks/                   # Hooks personnalisés
│   ├── utils/                   # Fonctions utilitaires
│   ├── data/                    # Data statique (projets, skills)
│   ├── styles/                  # CSS global + Tailwind
│   ├── App.jsx                  # Composant racine
│   └── main.jsx                 # Point d'entrée
├── .env.example                 # Template des variables d'env
├── .gitignore                   # Fichiers à ignorer
├── index.html                   # HTML principal
├── package.json                 # Dépendances et scripts
├── tailwind.config.js           # Configuration Tailwind
├── vite.config.js               # Configuration Vite
├── README.md                    # Ce fichier
├── DEPLOYMENT.md                # Guide de déploiement détaillé
├── BEST_PRACTICES.md            # Bonnes pratiques
└── QUICK_START.md               # Guide de démarrage rapide
```

---

## 🎯 Personnalisation

### 1. Informations personnelles

Édite `src/utils/constants.js` :

```javascript
export const PERSONAL_INFO = {
  name: 'Alexandre',
  title: 'Full Stack Developer',
  // ...
};
```

### 2. Projets

Édite `src/data/projects.js` :

```javascript
export const projects = [
  {
    id: 1,
    title: 'Ton Projet',
    description: 'Description de ton projet',
    image: '/assets/project1.jpg',
    stack: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/username/project',
    demo: 'https://project-demo.com',
  },
  // ...
];
```

### 3. Compétences

Édite `src/data/skills.js` et ajuste les niveaux (0-100%) :

```javascript
{
  name: 'Frontend',
  skills: [
    { name: 'React', level: 90 },
    { name: 'Vue.js', level: 75 },
    // ...
  ]
}
```

### 4. Liens sociaux

Édite `src/components/layout/Footer.jsx` :

```javascript
const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/Rangeraluffy', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/ton-profil', label: 'LinkedIn' },
  // ...
];
```

---

## 🧪 Tests

### Installation des dépendances de test

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Lancer les tests

```bash
npm run test        # Lance les tests une fois
npm run test:watch  # Mode watch
npm run test:coverage # Rapport de couverture
```

### Exemple de test

```javascript
// Button.test.jsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

---

## 📈 Performance

### Scores Lighthouse

| Métrique | Score |
|----------|-------|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

### Optimisations appliquées

- ✅ **Code splitting** automatique avec Vite
- ✅ **Lazy loading** des images
- ✅ **Minification** JS/CSS/HTML
- ✅ **Compression GZIP** (via .htaccess)
- ✅ **Cache navigateur** optimisé
- ✅ **Animations GPU** (transform, opacity)

### Monitoring

Pour surveiller les performances en production :

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --url=https://alexandremarolleau.com
```

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```
MIT License

Copyright (c) 2025 Alexandre

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 📞 Contact

**Alexandre** - Développeur Full Stack

- 🐱 GitHub : [@Rangeraluffy](https://github.com/ton-username)

---

## 🙏 Remerciements

- [React](https://react.dev/) - Équipe React pour cette librairie incroyable
- [Vite](https://vitejs.dev/) - Evan You et l'équipe Vite
- [Tailwind CSS](https://tailwindcss.com/) - Adam Wathan et l'équipe Tailwind
- [GSAP](https://greensock.com/) - GreenSock pour les animations performantes
- [React Icons](https://react-icons.github.io/) - Communauté open source

---

## 📚 Documentation complémentaire

- 📖 [Guide de déploiement complet](./DEPLOYMENT.md)
- 📘 [Bonnes pratiques de développement](./BEST_PRACTICES.md)
- ⚡ [Guide de démarrage rapide](./QUICK_START.md)

---

<div align="center">

**⭐Made with ❤️ and lots of ☕**



</div>