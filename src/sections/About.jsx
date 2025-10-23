import { useEffect, useRef } from 'react';
import { FiCode, FiDatabase, FiServer } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleWrapRef = useRef(null);
  const contentWrapRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);

  const highlights = [
    {
      icon: FiCode,
      title: 'Frontend',
      description: 'React, Vue, Tailwind CSS',
    },
    {
      icon: FiServer,
      title: 'Backend',
      description: 'Node.js, Python, APIs REST',
    },
    {
      icon: FiDatabase,
      title: 'Database',
      description: 'MongoDB, PostgreSQL, Redis',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const titleWrap = titleWrapRef.current;
    const contentWrap = contentWrapRef.current;

    if (!section || !titleWrap || !contentWrap) return;

    // Timeline principale du zoom avec pin prolongé
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=150%', // Prolonger le pin pour avoir plus de temps pour l'explosion
        scrub: 0,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animation du titre qui zoom out avec effet de transparence
    mainTimeline
      .to(titleWrap, {
        scale: 20,
        opacity: 0,
        ease: 'power2.inOut',
      }, 0)
      // Ajoute un effet de mix-blend pour voir Ã  travers pendant le zoom
      .to(titleWrap.querySelector('h2'), {
        mixBlendMode: 'difference',
        duration: 0.3,
      }, 0);

    // Animation du contenu qui apparaît (15% de la timeline)
    mainTimeline.fromTo(contentWrap, 
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      }, 
      0.15
    );

    // Animation des statistiques - apparaissent avec le contenu (25% de la timeline)
    if (statsRef.current.length > 0) {
      mainTimeline.fromTo(statsRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.15,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0.25
      );
    }

    // Animation des cartes - apparaissent après les stats (35% de la timeline)
    if (cardsRef.current.length > 0) {
      mainTimeline.fromTo(cardsRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.15,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0.35
      );

      // PAUSE : Les cartes restent visibles de 50% à 70% de la timeline
      mainTimeline.to({}, { duration: 0.2 }, 0.5);

      // Animation d'explosion des cartes (70% de la timeline)
      mainTimeline.to(cardsRef.current, {
        x: (index) => {
          // Explosion vers la gauche pour la première carte, vers la droite pour la dernière, au milieu pour celle du centre
          const direction = index === 0 ? -1 : index === 2 ? 1 : 0;
          return direction * gsap.utils.random(400, 600);
        },
        y: (index) => {
          // Explosion vers le haut avec variation aléatoire
          return gsap.utils.random(-500, -300);
        },
        rotation: () => gsap.utils.random(-60, 60), // Rotation aléatoire plus prononcée
        opacity: 0,
        scale: 0.3,
        duration: 0.2,
        stagger: 0.05, // Explosion en cascade
        ease: 'power2.in',
      }, 0.7);

      // Faire aussi exploser les stats (un peu après les cartes)
      if (statsRef.current.length > 0) {
        mainTimeline.to(statsRef.current, {
          x: (index) => {
            const direction = index === 0 ? -1 : 1;
            return direction * gsap.utils.random(400, 600);
          },
          y: () => gsap.utils.random(-500, -300),
          rotation: () => gsap.utils.random(-60, 60),
          opacity: 0,
          scale: 0.3,
          duration: 0.15,
          stagger: 0.05,
          ease: 'power2.in',
        }, 0.75);
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-white dark:bg-[#0d1117] transition-colors duration-300 overflow-hidden"
    >
      {/* PremiÃ¨re div - Titre "About Me" qui zoom */}
      <div
        ref={titleWrapRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="text-center">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            About Me
          </h2>
        </div>
      </div>

      {/* DeuxiÃ¨me div - Contenu qui apparaÃ®t */}
      <div
        ref={contentWrapRef}
        className="absolute inset-0 flex items-center justify-center py-20 opacity-0 overflow-y-auto"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-auto">
     

          {/* Statistiques - 2 colonnes de 50% chacune */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            <div 
              ref={(el) => (statsRef.current[0] = el)}
              className="bg-gray-100 dark:bg-[#0d1117] p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center opacity-0 transition-colors duration-300"
            >
              <h3 className="text-5xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">5+</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Années d'expérience</p>
            </div>
            <div 
              ref={(el) => (statsRef.current[1] = el)}
              className="bg-gray-100 dark:bg-[#0d1117] p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center opacity-0 transition-colors duration-300"
            >
              <h3 className="text-5xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">50+</h3>
              <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Projets réalisés</p>
            </div>
          </div>

          {/* Highlights Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="bg-gray-100 dark:bg-[#0d1117] p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0"
                >
                  <Icon className="text-gray-900 dark:text-white mb-3 transition-colors duration-300" size={32} />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;