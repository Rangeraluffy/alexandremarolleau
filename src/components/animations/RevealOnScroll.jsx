import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RevealOnScroll = ({ 
  children, 
  animation = 'fadeUp', 
  delay = 0,
  duration = 0.8 
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animations = {
      fadeUp: { y: 60, opacity: 0 },
      fadeDown: { y: -60, opacity: 0 },
      fadeLeft: { x: -60, opacity: 0 },
      fadeRight: { x: 60, opacity: 0 },
      fade: { opacity: 0 },
      scale: { scale: 0.8, opacity: 0 },
    };

    const animationConfig = animations[animation] || animations.fadeUp;

    const tween = gsap.from(elementRef.current, {
      ...animationConfig,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
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
  }, [animation, delay, duration]);

  return <div ref={elementRef}>{children}</div>;
};

export default RevealOnScroll;