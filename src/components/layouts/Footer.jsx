const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="text-2xl font-bold mb-2">Am</p>
            <p className="text-gray-400">© 2025 - Crafted with React & Tailwind</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/alexandremarolleau" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              GitHub
            </a>
            <a href="https://linkedin.com/in/alexandre-marolleau" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
              LinkedIn
            </a>
            <a href="mailto:contact@alexandremarolleau.com" className="text-gray-400 hover:text-white transition">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;