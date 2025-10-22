import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const workWrapRef = useRef(null);
  const triggersRef = useRef([]);
  const itemsRef = useRef([]);

  const projects = [
    {
      id: 1,
      title: 'STAY COURCHEVEL',
      category: 'Site de location immobilière de luxe',
      stack: 'HTML, SCSS, JavaScript, C# .NET',
      domain: 'Immobilier de Luxe',
      image: '/assets/luna-mockup.jpg',
      imageBlur: '/assets/luna-mockup.jpg',
      link: '#',
      role: 'Développeur Front-End',
      description: 'Participation au développement de l\'interface utilisateur et à la mise en place d\'animations dynamiques sur un site vitrine haut de gamme. Travail d\'intégration soigné pour assurer cohérence visuelle et performance sur tous les supports.',
    },
    {
      id: 2,
      title: 'BUDJEO WEB',
      category: 'Site de présentation',
      stack: 'Astro, SCSS, JavaScript, CI/CD',
      domain: 'Gestion Budgétaire',
      image: '/assets/budjeo-mockup.png',
      imageBlur: '/assets/budjeo-mockup.png',
      link: 'https://budjeo.com',
      role: 'Développeur Full Stack',
      description: 'Conception et développement complet du site de présentation de l\'application Budjeo. Mise en place du déploiement continu et automatisé via pipelines CI/CD pour garantir rapidité et fiabilité des mises à jour.',
    },
    {
      id: 3,
      title: 'BUDJEO APP',
      category: 'Application mobile multiplateforme',
      stack: 'Flutter 3.4.4+, Dart, Provider',
      domain: 'Finance Mobile',
      image: '/assets/luna-mockup.jpg',
      imageBlur: '/assets/luna-mockup.jpg',
      link: 'https://budjeo.com',
      role: 'Développeur Full Stack Flutter',
      description: 'Développement complet d\'une application mobile intuitive et performante pour la gestion budgétaire. Gestion d\'état avec Provider, visualisation de données avec fl_chart, stockage local et internationalisation complète. UI fluide et moderne, optimisée pour iOS et Android.',
      features: ['fl_chart', 'shared_preferences', 'intl'],
    },
    {
      id: 4,
      title: 'SILVIANNA BEAUTY',
      category: 'Site vitrine professionnel',
      stack: 'WordPress, Thème personnalisé, PHP',
      domain: 'Beauté & Bien-être',
    image: '/assets/budjeo-mockup.png',
      imageBlur: '/assets/budjeo-mockup.png',
      link: '#',
      role: 'Développeur Full Stack',
      description: 'Création d\'un site web sur mesure pour un institut de beauté. Intégration de thèmes personnalisés, gestion des contenus dynamiques et optimisation SEO.',
    },
    {
      id: 5,
      title: 'TERASOLAR',
      category: 'Site de présentation d\'entreprise',
      stack: 'HTML, CSS, JavaScript',
      domain: 'Énergie Solaire',
      image: '/assets/luna-mockup.jpg',
      imageBlur: '/assets/luna-mockup.jpg',
      link: '#',
      role: 'Développeur Front-End',
      description: 'Intégration responsive du site vitrine de TeraSolar, avec attention particulière à la clarté de l\'information et à la fluidité de la navigation sur tous les appareils.',
    },
    {
      id: 6,
      title: 'AMCREATIONS',
      category: 'Portfolio personnel',
      stack: 'React, Tailwind CSS, GSAP, ScrollTrigger',
      domain: 'Portfolio',
    image: '/assets/budjeo-mockup.png',
      imageBlur: '/assets/budjeo-mockup.png',
      link: 'https://alexandremarolleau.com',
      role: 'Développeur Full Stack',
      description: 'Développement d\'un portfolio moderne et interactif avec design épuré et animations fluides.',
      features: [
        'Mode clair/sombre persistant 🌗',
        'Composants réutilisables ♻️',
        'Performance optimisée (Lighthouse 95+) ⚡',
        'CI/CD automatisé 🚀'
      ],
    },
  ];

  useEffect(() => {
    triggersRef.current.forEach((trigger, index) => {
      if (!trigger || !itemsRef.current[index]) return;

      const item = itemsRef.current[index];
      const totalItems = itemsRef.current.length;

      // CAS 1 : Premier projet
      if (index === 0) {
        gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            // markers: true,
          },
          defaults: { ease: "none" }
        }).fromTo(item,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }
        );
      }
      // CAS 2 : Dernier projet
      else if (index === totalItems - 1) {
        gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
            // markers: true,
          },
          defaults: { ease: "none" }
        }).fromTo(item,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
        );
      }
      // CAS 3 : Projets du milieu
      else {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true,
          },
          defaults: { ease: "none" }
        });

        timeline.fromTo(item,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
        );

        timeline.to(item,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="works" 
      ref={workWrapRef}
      className="work_wrap relative bg-white dark:bg-[#0d1117]"
    >
      {/* Container des triggers - crée l'espace de scroll */}
      <div className="relative">
        {projects.map((project, index) => (
          <div
            key={`trigger-${project.id}`}
            ref={(el) => (triggersRef.current[index] = el)}
            className="work_trigger h-screen relative overflow-hidden"
          >
            {/* Image de fond dans le trigger */}
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-screen">
                <div className="absolute inset-0 w-full h-full">
                  <div 
                    className="absolute inset-0 z-[1] backdrop-blur-[40px]"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
                  />
                  <img 
                    src={project.imageBlur} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Track sticky - contient tous les items superposés */}
      <div className="work_track absolute inset-0 w-full h-full z-[1]">
        <div className="work_sticky w-full min-h-screen sticky top-0">
          {projects.map((project, index) => (
            <div
              key={`item-${project.id}`}
              ref={(el) => (itemsRef.current[index] = el)}
              className="work_item absolute inset-0 w-full h-full flex flex-col justify-between items-stretch py-16"
              style={{
                clipPath: index === 0 
                  ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                  : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
              }}
            >
              {/* Layout Grid */}
              <div className="work_layout flex-1 w-full h-full grid grid-cols-12 gap-6 items-end">
                
                {/* Colonne 1 : Image (colonnes 3-7) */}
                <div className="work_column-1 col-span-12 md:col-start-2 md:col-span-5 self-center">
                  <div className="work_visual relative">
                    {/* Image principale */}
                    <div className="work_visual_main">
                      <div className="relative w-full aspect-[4/3]">
                        <div className="absolute inset-0" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonne 2 : Contenu texte (colonnes 9-12) */}
                <div className="work_column-2 col-span-12 md:col-start-8 md:col-span-4 flex flex-col justify-center items-stretch h-full self-end">
                  <div className="work_content flex flex-col justify-between items-start w-full h-1/2 gap-6">
                    
                    {/* Titre */}
                    <div className="work_title_wrap flex flex-col justify-start items-start gap-4 w-full">
                      <div className="work_number_wrap flex items-center justify-center">
                        <div className="text-white text-2xl font-bold">
                          [{String(index + 1).padStart(2, '0')}]
                        </div>
                      </div>
                      
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text_link relative overflow-hidden group"
                      >
                        <div className="link_text text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-none transition-transform group-hover:-translate-y-full">
                          {project.title}
                        </div>
                        <div className="link_text absolute top-0 left-0 text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-none translate-y-full transition-transform group-hover:translate-y-0">
                          {project.title}
                        </div>
                      </a>
                      
                      <div className="text-white/80 text-xl md:text-2xl lg:text-3xl">
                        {project.category}
                      </div>
                    </div>

                    {/* Services & Features */}
                    <div className="work_services_wrap grid gap-4">
                      <div className="work_services">
                        <div className="flex flex-col gap-2">
                          <div className="text-white/80 text-sm md:text-base">
                            <span className="font-semibold">Stack:</span> {project.stack}
                          </div>
                          <div className="text-white/80 text-sm md:text-base">
                            <span className="font-semibold">Domaine:</span> {project.domain}
                          </div>
                          <div className="text-white/80 text-sm md:text-base">
                            <span className="font-semibold">Rôle:</span> {project.role}
                          </div>
                          
                          {/* Affichage des features si présentes */}
                          {project.features && project.features.length > 0 && (
                            <div className="mt-2">
                              <div className="text-white/90 text-sm md:text-base font-semibold mb-1">
                                Features:
                              </div>
                              <ul className="text-white/70 text-xs md:text-sm space-y-1">
                                {project.features.map((feature, idx) => (
                                  <li key={idx}>• {feature}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text_link inline-flex items-center gap-2 text-white text-base md:text-lg hover:gap-4 transition-all group"
                      >
                        <span className="link_text_wrap relative overflow-hidden">
                          <span className="link_text block transition-transform group-hover:-translate-y-full">
                            View project
                          </span>
                          <span className="link_text absolute top-0 left-0 translate-y-full transition-transform group-hover:translate-y-0">
                            View project
                          </span>
                        </span>
                        <svg 
                          className="link_icon w-4 h-3" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 18 12" 
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M12 3L6 9" />
                          <path d="M6 3H12V9" />
                          <path d="M4 1H1V11H4" />
                          <path d="M14 1H17V11H14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;