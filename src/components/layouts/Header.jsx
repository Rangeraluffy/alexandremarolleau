import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLangTransitioning, setIsLangTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const menuItemsRef = useRef([]);

  const handleThemeToggle = () => {
    setIsTransitioning(true);
    toggleTheme();
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleLanguageToggle = () => {
    setIsLangTransitioning(true);
    toggleLanguage();
    setTimeout(() => {
      setIsLangTransitioning(false);
    }, 500);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Fermer le menu mobile après navigation
      setIsMobileMenuOpen(false);
    }
  };

  // Animation du menu mobile avec GSAP
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      // Ouvrir le menu
      document.body.style.overflow = 'hidden'; // Empêcher le scroll

      gsap.timeline()
        .set(mobileMenuRef.current, { display: 'flex' })
        .fromTo(
          mobileMenuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        .fromTo(
          menuItemsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
          '-=0.2'
        );
    } else {
      // Fermer le menu
      document.body.style.overflow = ''; // Restaurer le scroll

      gsap.timeline()
        .to(menuItemsRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: 'power2.in'
        })
        .to(
          mobileMenuRef.current,
          { opacity: 0, duration: 0.2, ease: 'power2.in' },
          '-=0.1'
        )
        .set(mobileMenuRef.current, { display: 'none' });
    }
  }, [isMobileMenuOpen]);

  // Fermer le menu avec ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '#about', labelKey: 'header.about' },
    { href: '#works', labelKey: 'header.works' },
    { href: '#github', labelKey: 'header.github' },
  ];

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6">
        <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-300">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center z-50">
              <img
                src={theme === 'dark' ? '/assets/logo-am-small-white.svg' : '/assets/logo-am-small.svg'}
                alt="Alexandre Marolleau"
                className="h-7 sm:h-8 w-auto transition-opacity duration-300"
              />
            </a>

            {/* Navigation Desktop - cachée sur mobile */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="relative overflow-hidden group font-medium"
                >
                  <span className="block text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-full">
                    {t(link.labelKey)}
                  </span>
                  <span className="absolute top-0 left-0 text-gray-900 dark:text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    {t(link.labelKey)}
                  </span>
                </a>
              ))}
            </div>

            {/* Controls: Language, Theme & Hamburger */}
            <div className="flex items-center gap-2">
              {/* Toggle Language */}
              <button
                onClick={handleLanguageToggle}
                className="p-2 rounded-lg transition-all duration-300 relative overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800 w-10 h-10"
                aria-label={language === 'en' ? 'Switch to French' : 'Passer en Anglais'}
              >
                <span
                  className={`absolute inset-0 flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    language === 'en'
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-50'
                  } ${isLangTransitioning ? 'hover:rotate-12' : ''}`}
                >
                  <span className="text-gray-900 dark:text-white">EN</span>
                </span>
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

              {/* Toggle Dark/Light */}
              <button
                onClick={handleThemeToggle}
                className="p-2 rounded-lg transition-all duration-300 relative overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <img
                  src="/assets/moon-dark.svg"
                  alt="Dark mode"
                  className={`h-6 w-6 absolute inset-0 m-auto transition-all duration-500 ${
                    theme === 'light'
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-50'
                  } ${isTransitioning ? 'hover:rotate-12' : ''}`}
                />
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

              {/* Hamburger Menu Button - visible uniquement sur mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 w-10 h-10 flex items-center justify-center"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="relative w-6 h-5 flex items-center justify-center">
                  <span
                    className={`absolute h-0.5 w-full bg-gray-900 dark:bg-white transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-full bg-gray-900 dark:bg-white transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-full bg-gray-900 dark:bg-white transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Menu Mobile Full Screen */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-lg md:hidden hidden"
        style={{ display: 'none' }}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="flex flex-col items-start justify-center h-full space-y-8 px-8 sm:px-12">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              ref={(el) => (menuItemsRef.current[index] = el)}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 opacity-0"
            >
              {t(link.labelKey)}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;