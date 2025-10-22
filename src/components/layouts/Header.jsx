import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <nav className="container mx-auto px-6 py-4 bg-white dark:bg-[#0d1117] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-colors duration-300">
        <div className="flex items-center justify-between">
          {/* Logo principal */}
          <a href="#" className="flex items-center">
            <img
             src={theme === 'dark' ? '/assets/logo-am-small-white.svg' : '/assets/logo-am-small.svg'}
              alt="Alexandre Marolleau"
              className="h-8 w-auto"
            />
          </a>

          {/* Navigation */}
               <div className="flex space-x-8 items-center">
            <a 
              href="#about" 
              className="relative overflow-hidden group font-medium"
            >
              <span className="block text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-full">
                ABOUT
              </span>
              <span className="absolute top-0 left-0 text-gray-900 dark:text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                ABOUT
              </span>
            </a>
            <a 
              href="#works" 
              className="relative overflow-hidden group font-medium"
            >
              <span className="block text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-full">
                WORKS
              </span>
              <span className="absolute top-0 left-0 text-gray-900 dark:text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                WORKS
              </span>
            </a>
            <a 
              href="#skills" 
              className="relative overflow-hidden group font-medium"
            >
              <span className="block text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-full">
                SKILLS
              </span>
              <span className="absolute top-0 left-0 text-gray-900 dark:text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                SKILLS
              </span>
            </a>
            <a 
              href="#contact" 
              className="relative overflow-hidden group font-medium"
            >
              <span className="block text-gray-900 dark:text-white transition-transform duration-300 group-hover:-translate-y-full">
                CONTACT
              </span>
              <span className="absolute top-0 left-0 text-gray-900 dark:text-white translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                CONTACT
              </span>
            </a>
          </div>
                    {/* Toggle Dark/Light avec icône lune */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg  transition-all duration-300"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <img
                src={theme === 'dark' ? '/assets/moon-white.svg' : '/assets/moon-dark.svg'}
                alt="Toggle theme"
                className="h-6 w-6 transition-transform duration-300 hover:rotate-12"
              />
            </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;