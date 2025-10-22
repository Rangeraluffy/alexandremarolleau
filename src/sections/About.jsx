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

    // Timeline principale du zoom
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
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
      // Ajoute un effet de mix-blend pour voir à travers pendant le zoom
      .to(titleWrap.querySelector('h2'), {
        mixBlendMode: 'difference',
        duration: 0.3,
      }, 0);

    // Animation du contenu qui apparaît
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
      0.3
    );

    // Animation des statistiques - apparaissent avec le contenu
    if (statsRef.current.length > 0) {
      mainTimeline.fromTo(statsRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: 'power2.out',
        },
        0.5
      );
    }

    // Animation des cartes - apparaissent après les stats
    if (cardsRef.current.length > 0) {
      mainTimeline.fromTo(cardsRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: 'power2.out',
        },
        0.7
      );
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
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="text-center">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            About Me
          </h2>
        </div>
      </div>

      {/* Deuxième div - Contenu qui apparaît */}
      <div
        ref={contentWrapRef}
        className="absolute inset-0 flex items-center justify-center py-20 opacity-0 overflow-y-auto"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-auto">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 transition-colors duration-300">
              Développeur Full Stack passionné, je transforme des idées en applications web performantes et élégantes.
              Mon expertise couvre l'ensemble du stack moderne, du frontend avec React jusqu'au backend avec Node.js.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
              J'accorde une importance particulière à l'expérience utilisateur, la performance et la maintenabilité du code.
              Chaque projet est une opportunité d'apprendre et de repousser les limites du web.
            </p>
          </div>

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