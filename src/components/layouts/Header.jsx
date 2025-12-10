import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useState } from 'react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);

  const handleThemeToggle = () => {
    setIsTransitioning(true);
    toggleTheme();

    // Réinitialiser l'animation après la transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleLanguageToggle = () => {
    setIsLangTransitioning(true);
    toggleLanguage();

    // Réinitialiser l'animation après la transition
    setTimeout(() => {
      setIsLangTransitioning(false);
    }, 500);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 100; // Ajustez selon la hauteur de votre header
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-4 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-300">
        <div className="flex items-center justify-between">
          {/* Logo principal */}
          <a href="#" className="flex items-center">
            <img
             src={theme === 'dark' ? '/assets/logo-am-small-white.svg' : '/assets/logo-am-small.svg'}
              alt="Alexandre Marolleau"
              className="h-8 w-auto transition-opacity duration-300"
            />
          </a>

          {/* Navigation */}
          <div className="flex space-x-8 items-center">
            <a
              href="#about"
              onClick={(e) => handleSmoothScroll(e, '#about')}
              className="relative overflow-hidden group font-medium"
            >
              <span className="block text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-full">
                {t('header.about')}
              </span>
              <span className="absolute top-0 left-0 text-gray-900 dark:text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                {t('header.about')}
              </span>
            </a>
            <a
              href="#works"
              onClick={(e) => handleSmoothScroll(e, '#works')}
              className="relative overflow-hidden group font-medium"
            >
              <span className="block text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-full">
                {t('header.works')}
              </span>
              <span className="absolute top-0 left-0 text-gray-900 dark:text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                {t('header.works')}
              </span>
            </a>
            <a
              href="#skills"
              onClick={(e) => handleSmoothScroll(e, '#skills')}
              className="relative overflow-hidden group font-medium"
            >
              <span className="block text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-full">
                {t('header.skills')}
              </span>
              <span className="absolute top-0 left-0 text-gray-900 dark:text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                {t('header.skills')}
              </span>
            </a>
          </div>

          {/* Controls: Language & Theme */}
          <div className="flex items-center gap-2">
            {/* Toggle Language */}
            <button
              onClick={handleLanguageToggle}
              className="p-2 rounded-lg transition-all duration-300 relative overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800 w-10 h-10"
              aria-label={language === 'en' ? 'Switch to French' : 'Passer en Anglais'}
            >
              {/* EN Flag/Text */}
              <span
                className={`absolute inset-0 flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  language === 'en'
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 -rotate-90 scale-50'
                } ${isLangTransitioning ? 'hover:rotate-12' : ''}`}
              >
                <span className="text-gray-900 dark:text-white">EN</span>
              </span>

              {/* FR Flag/Text */}
              <span
                className={`absolute inset-0 flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  language === 'fr'
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 rotate-90 scale-50'
                } ${isLangTransitioning ? 'hover:rotate-12' : ''}`}
              >
                <span className="text-gray-900 dark:text-white">FR</span>
              </span>
            </button>

            {/* Toggle Dark/Light avec transition fluide */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-lg transition-all duration-300 relative overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {/* Icône Lune */}
              <img
                src="/assets/moon-dark.svg"
                alt="Dark mode"
                className={`h-6 w-6 absolute inset-0 m-auto transition-all duration-500 ${
                  theme === 'light'
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 -rotate-90 scale-50'
                } ${isTransitioning ? 'hover:rotate-12' : ''}`}
              />

              {/* Icône Soleil */}
              <img
                src="/assets/sun.svg"
                alt="Light mode"
                className={`h-6 w-6 transition-all duration-500 ${
                  theme === 'dark'
                    ? 'opacity-100 rotate-0 scale-100'
                    : 'opacity-0 rotate-90 scale-50'
                } ${isTransitioning ? 'hover:rotate-12' : ''}`}
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;