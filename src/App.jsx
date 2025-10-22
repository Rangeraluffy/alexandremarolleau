import { useEffect } from 'react';
import { useTheme } from './context/ThemeContext'; 
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Works from './sections/Works';
import Skills from './sections/Skills';
import About from './sections/About';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis'; // Import du hook

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { theme } = useTheme();
  
  // Activation du smooth scroll
  useLenis();

  useEffect(() => {
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-white dark:bg-[#0d1117] overflow-hidden pt-20 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <div className="signature-logo">
            <img
               src={theme === 'dark' ? '/assets/logo-signature.svg' : '/assets/logo-signature-black.svg'}
              alt="Alexandre Marolleau"
              className="w-full max-w-md mx-auto h-auto"
            />
          </div>

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
      </section>

      <About /> 
      <Works />
      <Skills />
      <Footer />
    </div>
  );
}

export default App;