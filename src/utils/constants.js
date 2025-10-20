/**
 * Constantes globales du projet
 */

// Informations personnelles
export const PERSONAL_INFO = {
  name: 'Alexandre Marolleau',
  title: 'Full Stack Developer',
  location: 'Paris, France',
  bio: 'Passionné par le développement web depuis plus de 5 ans...',
};

// Liens sociaux
export const SOCIAL_LINKS = {
  github: 'https://github.com/Rangeraluffy',
  linkedin: 'https://linkedin.com/in/username',
};

// Configuration des animations GSAP
export const ANIMATION_CONFIG = {
  defaultDuration: 0.8,
  defaultEase: 'power3.out',
  staggerDelay: 0.1,
  scrollTriggerStart: 'top 80%',
};

// Breakpoints Tailwind (pour utilisation en JS)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Navigation links
export const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Works', href: '#works' },
  { name: 'Skills', href: '#skills' },
];

// Meta tags SEO par défaut
export const SEO_CONFIG = {
  siteName: 'Portfolio - Full Stack Developer',
  siteUrl: 'https://votre-domaine.com',
  defaultTitle: 'Portfolio - Développeur Full Stack',
  defaultDescription: 'Portfolio professionnel présentant mes projets et compétences en développement web.',
  ogImage: '/og-image.jpg',
};