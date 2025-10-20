/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1C1D1D',
        
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', 
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        
        dark: {
          bg: '#1C1D1D',      // Fond noir maquette
          surface: '#2a2b2b',  // Surface légèrement plus claire
          border: '#3a3b3b',   // Bordures
          text: '#e5e5e5',     // Texte blanc cassé
          muted: '#a3a3a3',    // Texte grisé
        },
        
        light: {
          bg: '#ffffff',       // Fond blanc
          surface: '#f9fafb',  // Surface grise très claire
          border: '#e5e7eb',   // Bordures
          text: '#1f2937',     // Texte noir
          muted: '#6b7280',    // Texte grisé
        }
      },
      
      fontFamily: {
        sans: ['Oakes Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
      },
      
      // Animations personnalisées (pour GSAP plus tard)
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'blob': 'blob 7s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}