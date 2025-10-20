import { useEffect } from 'react';
import { useTheme } from './context/ThemeContext'; 
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Works from './sections/Works';
import Skills from './sections/Skills';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollTrigger);

function App() {
  const { theme } = useTheme();
  useEffect(() => {

    document.documentElement.style.scrollBehavior = 'smooth';

    gsap.fromTo('.signature-logo',
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    );

    gsap.fromTo('.hero-text',
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out',
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToWorks = () => {
    const worksSection = document.querySelector('#works');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <Header />

      {/* Hero Section - Logo signature centré */}
      <section className="min-h-screen flex items-center justify-center relative bg-white dark:bg-[#1C1D1D] overflow-hidden pt-20 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <div className="signature-logo">
            {/* Logo SVG avec img tag */}
            <img
               src={theme === 'dark' ? '/assets/logo-signature.svg' : '/assets/logo-signature-black.svg'}
              alt="Alexandre Marolleau"
              className="w-full max-w-md mx-auto h-auto"
            />
          </div>

          {/* Indicateur de scroll */}
          <button
            onClick={scrollToWorks}
            className="hero-text absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-400 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer animate-bounce"
            aria-label="Scroll to content"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </button>
        </div>

        {/* Éléments décoratifs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-blue-400 dark:bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
      </section>

      {/* Section "Power Up" */}
      <section className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-surface py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-light-text dark:text-dark-text mb-8 leading-tight">
            POWER UP WITH<br />
            <span>A WEBFLOW</span>
          </h2>
          <p className="text-light-muted dark:text-dark-muted text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
            Commençons ensemble le processus de développement passionnant de votre entreprise,
            de votre produit ou de votre marque personnelle avec notre gamme de services Web primés.
            Découvrez comment nous pouvons apporter une valeur tangible en explorant notre portfolio
            de réalisations et en prenant contact.
          </p>
        </div>
      </section>

      {/* Section About - Présentation */}
      <section
        id="about"
        className="min-h-screen flex items-center py-20 bg-light-surface dark:bg-dark-bg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>

            <div className="space-y-6 text-lg text-light-muted dark:text-dark-muted">
              <p>
                Développeur Full Stack passionné, je transforme des idées en applications
                web performantes et élégantes. Mon expertise couvre l'ensemble du stack moderne,
                du frontend avec React jusqu'au backend avec Node.js.
              </p>
              <p>
                J'accorde une importance particulière à l'expérience utilisateur,
                la performance et la maintenabilité du code. Chaque projet est une
                opportunité d'apprendre et de repousser les limites du web.
              </p>
            </div>

            {/* Stats ou highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
              <div className="p-6 bg-light-bg dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border">
                <div className="text-4xl font-bold text-primary-500 mb-2">5+</div>
                <div className="text-light-muted dark:text-dark-muted">Années d'expérience</div>
              </div>
              <div className="p-6 bg-light-bg dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border">
                <div className="text-4xl font-bold text-primary-500 mb-2">20+</div>
                <div className="text-light-muted dark:text-dark-muted">Projets réalisés</div>
              </div>
              <div className="p-6 bg-light-bg dark:bg-dark-surface rounded-xl border border-light-border dark:border-dark-border">
                <div className="text-4xl font-bold text-primary-500 mb-2">100%</div>
                <div className="text-light-muted dark:text-dark-muted">Clients satisfaits</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Works */}
      <Works />

      {/* Section Skills */}
      <Skills />

      {/* Section Contact */}
      <section
        id="contact"
        className="min-h-screen flex items-center py-20 bg-light-surface dark:bg-dark-surface"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>

            <p className="text-lg text-light-muted dark:text-dark-muted mb-12">
              Un projet en tête ? N'hésitez pas à me contacter pour en discuter.
            </p>

            <a
              href="mailto:contact@alexandremarolleau.com"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 text-lg"
            >
              Get In Touch
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;