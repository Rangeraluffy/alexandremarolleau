import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="bg-white dark:bg-[#0d1117] transition-colors duration-300">
      <div className="container mx-auto px-6">
        {/* Border top */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>
        
        <div className="py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Logo - À gauche */}
            <div className="flex items-start">
              <img
                src={theme === 'dark' ? '/assets/logo-am-small-white.svg' : '/assets/logo-am-small.svg'}
                alt="Alexandre Marolleau"
                className="h-24 w-auto"
              />
            </div>

            {/* Navigation et Contact - À droite */}
            <div className="flex gap-12 md:gap-20">
              {/* Colonne PORTFOLIO */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  PORTFOLIO
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="#about" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#works" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      Works
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#skills" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      Skills
                    </a>
                  </li>
                </ul>
              </div>

              {/* Colonne CONTACT */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  CONTACT
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://github.com/alexandremarolleau" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://linkedin.com/in/alexandre-marolleau" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright - En bas à droite */}
          <div className="mt-12 flex justify-center">
            <p className="text-sm text-gray-500 dark:text-gray-500 transition-colors duration-300">
              Copyright © 2025 Alexandre Marolleau
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;