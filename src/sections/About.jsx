import { useEffect, useRef } from 'react';
import { FiCode, FiDatabase, FiServer } from 'react-icons/fi';
import RevealOnScroll from '@components/animations/RevealOnScroll';
import { staggerFadeIn } from '@utils/animations';

const About = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animation en cascade des cartes
    if (cardsRef.current.length > 0) {
      staggerFadeIn(cardsRef.current, {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 70%',
        }
      });
    }
  }, []);

  const highlights = [
    {
      icon: FiCode,
      title: 'Frontend',
      description: 'React, Vue, Tailwind CSS',
    },
    {
      icon: FiServer,
      title: 'Backend',
      description: 'Node.js, Python, APIs REST',
    },
    {
      icon: FiDatabase,
      title: 'Database',
      description: 'MongoDB, PostgreSQL, Redis',
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center py-20 bg-light-bg dark:bg-dark-bg"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6 text-center">
            About Me
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-12"></div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Image/Avatar */}
          <RevealOnScroll animation="fadeRight">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-light-surface dark:bg-dark-surface rounded-2xl p-8 flex items-center justify-center h-96">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-6xl font-bold">
                  JD
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Texte de présentation */}
          <RevealOnScroll animation="fadeLeft" delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-light-text dark:text-dark-text">
                Full Stack Developer
              </h3>
              <p className="text-light-muted dark:text-dark-muted text-lg leading-relaxed">
                Passionné par le développement web depuis plus de 5 ans, je crée des 
                applications performantes et élégantes. Mon expertise couvre l'ensemble 
                du stack moderne, du frontend avec React jusqu'au backend avec Node.js.
              </p>
              <p className="text-light-muted dark:text-dark-muted text-lg leading-relaxed">
                J'accorde une importance particulière à l'expérience utilisateur, 
                la performance et la maintenabilité du code. Chaque projet est une 
                opportunité d'apprendre et de repousser les limites du web.
              </p>

              {/* Highlights Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      ref={(el) => (cardsRef.current[index] = el)}
                      className="bg-light-surface dark:bg-dark-surface p-4 rounded-lg border border-light-border dark:border-dark-border hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <Icon className="text-primary-600 mb-2" size={28} />
                      <h4 className="font-semibold text-light-text dark:text-dark-text mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-light-muted dark:text-dark-muted">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default About;