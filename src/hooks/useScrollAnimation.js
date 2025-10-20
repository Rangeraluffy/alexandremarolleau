import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook personnalisé pour créer des animations au scroll
 * @param {Object} animationConfig - Configuration de l'animation GSAP
 * @param {Object} scrollConfig - Configuration du ScrollTrigger
 * @returns {Object} ref - Référence à attacher à l'élément
 */
export const useScrollAnimation = (animationConfig = {}, scrollConfig = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const defaultAnimationConfig = {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    };

    const defaultScrollConfig = {
      trigger: elementRef.current,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    };

    const tween = gsap.from(elementRef.current, {
      ...defaultAnimationConfig,
      ...animationConfig,
      scrollTrigger: {
        ...defaultScrollConfig,
        ...scrollConfig,
      },
    });

    // Cleanup
    return () => {
      if (tween && tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      if (tween) {
        tween.kill();
      }
    };
  }, [animationConfig, scrollConfig]);

  return elementRef;
};

/**
 * Hook pour animer plusieurs éléments en cascade (stagger)
 * @param {number} staggerDelay - Délai entre chaque élément
 * @returns {Object} { containerRef, addToRefs } - Ref du container et fonction pour ajouter des refs
 */
export const useStaggerAnimation = (staggerDelay = 0.1) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current || itemsRef.current.length === 0) return;

    const tween = gsap.from(itemsRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: staggerDelay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
    });

    return () => {
      if (tween && tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      if (tween) {
        tween.kill();
      }
    };
  }, [staggerDelay]);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return { containerRef, addToRefs };
};