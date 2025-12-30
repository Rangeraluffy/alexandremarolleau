import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white dark:bg-[#0d1117] transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Border top */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        <div className="py-8 sm:py-10 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 sm:gap-8">
            {/* Logo - À gauche */}
            <div className="flex items-start">
              <img
                src={theme === 'dark' ? '/assets/logo-am-small-white.svg' : '/assets/logo-am-small.svg'}
                alt="Alexandre Marolleau"
                className="h-16 sm:h-20 md:h-24 w-auto"
              />
            </div>

            {/* Navigation et Contact - À droite */}
            <div className="flex gap-8 sm:gap-12 md:gap-20">
              {/* Colonne PORTFOLIO */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">
                  {t('footer.portfolio')}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a
                      href="#about"
                      className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      {t('footer.about')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#works"
                      className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      {t('footer.works')}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Colonne CONTACT */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">
                  {t('footer.contact')}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a
                      href="https://github.com/alexandremarolleau"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      {t('footer.github')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com/in/alexandre-marolleau"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      {t('footer.linkedin')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright - En bas à droite */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 transition-colors duration-300">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;