import { useEffect, useRef } from 'react';
import { FiCode, FiDatabase, FiServer, FiTool } from 'react-icons/fi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const titleWrapRef = useRef(null);
  const textDescRef = useRef(null);
  const contentWrapRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);

  const highlights = [
    {
      icon: FiCode,
      titleKey: 'about.highlights.frontend.title',
      descriptionKey: 'about.highlights.frontend.description',
    },
    {
      icon: FiServer,
      titleKey: 'about.highlights.backend.title',
      descriptionKey: 'about.highlights.backend.description',
    },
    {
      icon: FiDatabase,
      titleKey: 'about.highlights.database.title',
      descriptionKey: 'about.highlights.database.description',
    },
    {
      icon: FiTool,
      titleKey: 'about.highlights.tools.title',
      descriptionKey: 'about.highlights.tools.description',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const titleWrap = titleWrapRef.current;
    const textDesc = textDescRef.current;
    const contentWrap = contentWrapRef.current;

    if (!section || !titleWrap || !textDesc || !contentWrap) return;

    // Timeline principale du zoom avec pin prolongé
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=200%', // Réduit car on n'a plus l'explosion
        scrub: true, // true = strictement lié au scroll, pas de délai
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animation du titre qui zoom out avec effet de transparence (0% - 20%)
    mainTimeline
      .to(titleWrap, {
        scale: 20,
        opacity: 0,
        ease: 'power2.inOut',
      }, 0)
      .to(titleWrap.querySelector('h2'), {
        mixBlendMode: 'difference',
        duration: 0.3,
      }, 0);

    // PAUSE : S'assurer que le titre a complètement disparu (20% - 25%)
    mainTimeline.to({}, { duration: 0.05 }, 0.2);

    // Animation de la section texte/description qui apparaît (25% - 40%)
    mainTimeline.fromTo(textDesc, 
      {
        opacity: 0,
        y: '50vh', // Réduit de 100vh à 50vh pour moins de distance
      },
      {
        opacity: 1,
        y: 0, // Se centre à l'écran
        ease: 'power1.out', // Changé pour un easing plus doux
        duration: 0.15, // Durée explicite plus longue
      }, 
      0.25 // Commence à 25% au lieu de 15%
    );

    // PAUSE : Le texte reste visible et centré (40% - 50%)
    mainTimeline.to({}, { duration: 0.1 }, 0.4);

    // Le texte remonte progressivement et sort par le haut (50% - 65%)
    mainTimeline.to(textDesc, {
      y: '-50vh', // Réduit aussi pour la sortie
      opacity: 0,
      ease: 'power1.in', // Easing plus doux
      duration: 0.15,
    }, 0.5);

    // Les cartes arrivent par le bas pendant que le texte monte (55% - 75%)
    mainTimeline.fromTo(contentWrap, 
      {
        opacity: 0,
        y: '50vh', // Réduit également
      },
      {
        opacity: 1,
        y: 0, // Se centrent à l'écran
        ease: 'power1.out',
        duration: 0.2,
      }, 
      0.55 // Commence à 55% - léger overlap avec la sortie du texte
    );

    // Animation des statistiques (70% - 75%)
    if (statsRef.current.length > 0) {
      mainTimeline.fromTo(statsRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.1,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0.7
      );
    }

    // Animation des cartes (75% - 80%)
    if (cardsRef.current.length > 0) {
      mainTimeline.fromTo(cardsRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.1,
          stagger: 0.05,
          ease: 'power2.out',
        },
        0.75
      );

      // Les cartes restent visibles jusqu'à la fin (80% - 100%)
      mainTimeline.to({}, { duration: 0.2 }, 0.8);
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
      {/* Première div - Titre "About Me" qui zoom */}
      <div
        ref={titleWrapRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
      >
        <div className="text-center">
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            {t('about.title')}
          </h2>
        </div>
      </div>

      {/* Nouvelle section - Texte/Description */}
      <div
        ref={textDescRef}
        className="absolute inset-0 flex items-center justify-center opacity-0 z-30 pointer-events-none px-4 sm:px-6"
      >
        <div className="max-w-4xl text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 transition-colors duration-300">
            {t('about.subtitle')}
          </h3>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
            {t('about.description')}
          </p>
        </div>
      </div>

      {/* Deuxième div - Contenu qui apparaît (stats + cartes) */}
      <div
        ref={contentWrapRef}
        className="absolute inset-0 flex items-center justify-center py-20 opacity-0 overflow-hidden z-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          {/* Statistiques - 2 colonnes côte à côte */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-4 sm:mb-6">
            <div
              ref={(el) => (statsRef.current[0] = el)}
              className="bg-gray-100 dark:bg-[#0d1117] p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center opacity-0 transition-colors duration-300"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 transition-colors duration-300">3+</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 transition-colors duration-300">{t('about.stats.experience')}</p>
            </div>
            <div
              ref={(el) => (statsRef.current[1] = el)}
              className="bg-gray-100 dark:bg-[#0d1117] p-4 sm:p-6 md:p-8 rounded-lg border border-gray-200 dark:border-gray-700 text-center opacity-0 transition-colors duration-300"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 transition-colors duration-300">50+</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 transition-colors duration-300">{t('about.stats.projects')}</p>
            </div>
          </div>

          {/* Highlights Cards - Grille 2x2 */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.titleKey}
                    ref={(el) => (cardsRef.current[index] = el)}
                    className="bg-gray-100 dark:bg-[#0d1117] p-5 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0"
                  >
                    <Icon className="text-gray-900 dark:text-white mb-3 transition-colors duration-300" size={32} />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-base sm:text-lg transition-colors duration-300">
                      {t(item.titleKey)}
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      {t(item.descriptionKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;