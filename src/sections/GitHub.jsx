import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GitHubContributions from '../components/GitHubContributions';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const GitHub = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section
      id="github"
      ref={sectionRef}
      className="md:min-h-screen py-12 md:py-32 bg-white dark:bg-[#0d1117] transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Header */}
        <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-8 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
            {t('github.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
            {t('github.subtitle')}
          </p>
        </div>

        {/* GitHub Contributions */}
        <div className="max-w-7xl mx-auto">
          <GitHubContributions username="Rangeraluffy" />
        </div>
      </div>
    </section>
  );
};

export default GitHub;
