import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animation en cascade (stagger) pour plusieurs éléments
 * @param {Array} elements - Tableau d'éléments DOM à animer
 * @param {Object} options - Options GSAP
 */
export const staggerFadeIn = (elements, options = {}) => {
  const defaultOptions = {
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: elements[0],
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  };

  return gsap.from(elements, {
    ...defaultOptions,
    ...options,
    scrollTrigger: {
      ...defaultOptions.scrollTrigger,
      ...options.scrollTrigger,
    },
  });
};

/**
 * Animation de révélation simple
 * @param {Element} element - Élément DOM à animer
 * @param {Object} options - Options GSAP
 */
export const fadeIn = (element, options = {}) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    ...options,
  });
};

/**
 * Animation de parallaxe
 * @param {Element} element - Élément DOM à animer
 * @param {number} speed - Vitesse du parallaxe (défaut: 0.5)
 */
export const parallax = (element, speed = 0.5) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};