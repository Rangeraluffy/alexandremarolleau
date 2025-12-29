import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const { t } = useLanguage();
  const workWrapRef = useRef(null);
  const triggersRef = useRef([]);
  const itemsRef = useRef([]);

  const projects = [
    {
      id: 1,
      title: 'STAY COURCHEVEL',
      translationKey: 'stayCourchevel',
      stack: 'HTML, SCSS, JavaScript, C# .NET',
      image: '/assets/stay-courchevel.png',
      imageBlur: '/assets/stay-courchevel.png',
      link: 'https://www.staycourchevel.com/',
    },
    {
      id: 2,
      title: 'BUDJEO WEB',
      translationKey: 'budjeoWeb',
      stack: 'Astro, SCSS, JavaScript, CI/CD',
      image: '/assets/budjeo-mockup.png',
      imageBlur: '/assets/budjeo-mockup.png',
      link: 'https://budjeo.com',
    },
    {
      id: 3,
      title: 'BUDJEO APP',
      translationKey: 'budjeoApp',
      stack: 'Flutter 3.4.4+, Dart, Provider',
      image: '/assets/budjeo-app.png',
      imageBlur: '/assets/budjeo-app.png',
      link: 'https://testflight.apple.com/join/DTzBsT2E',
      techFeatures: ['flChart', 'sharedPrefs', 'intl'],
    },
    {
      id: 4,
      title: 'Pairle Hypnose',
      translationKey: 'pairleHypnose',
      stack: 'HTML, CSS, JavaScript',
      image: '/assets/pairlehypnose.png',
      imageBlur: '/assets/budjeo-mockup.png',
      link: 'https://www.pairle-hypnose.com/',
    },
    {
      id: 5,
      title: 'TERASOLAR',
      translationKey: 'terasolar',
      stack: 'HTML, CSS, JavaScript',
      image: '/assets/terasolar.png',
      imageBlur: '/assets/terasolar.png',
      link: 'https://www.terasolar.ch/',
    },
    {
      id: 6,
      title: 'AMCREATIONS',
      translationKey: 'amcreations',
      stack: 'React, Tailwind CSS, GSAP, ScrollTrigger',
      image: '/assets/amcreations.png',
      imageBlur: '/assets/amcreations.png',
      link: 'https://alexandremarolleau.com',
      hasCustomFeatures: true,
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
                  <img
                    src={project.imageBlur}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      filter: 'blur(40px)',
                      transform: 'translateZ(0)',
                      willChange: 'transform'
                    }}
                  />
                  <div
                    className="absolute inset-0 z-[1]"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.15)',
                      transform: 'translateZ(0)',
                      willChange: 'transform'
                    }}
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
              <div className="work_layout flex-1 w-full h-full grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center md:items-end px-4 sm:px-6 md:px-0">

                {/* Colonne 1 : Image (colonnes 2-5) */}
                <div className="work_column-1 col-span-1 md:col-start-2 md:col-span-4 self-center w-full max-w-md md:max-w-none mx-auto">
                  <div className="work_visual relative">
                    {/* Image principale */}
                    <div className="work_visual_main">
                      <div className="relative w-full aspect-[4/3] md:aspect-[16/10]">
                        <div className="absolute inset-0" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonne 2 : Contenu texte (colonnes 9-12) */}
                <div className="work_column-2 col-span-1 md:col-start-8 md:col-span-4 flex flex-col justify-center items-stretch h-full self-end">
                  <div className="work_content flex flex-col justify-between items-start w-full gap-3 md:gap-2">

                    {/* Titre */}
                    <div className="work_title_wrap flex flex-col justify-start items-start gap-2 md:gap-4 w-full">
                      <div className="work_number_wrap flex items-center">
                        <div className="text-white text-lg md:text-2xl font-bold backdrop-blur-sm">
                          [{String(index + 1).padStart(2, '0')}]
                        </div>
                      </div>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text_link relative overflow-hidden group"
                      >
                        <div className="link_text text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-none transition-transform group-hover:-translate-y-full">
                          {project.title}
                        </div>
                        <div className="link_text absolute top-0 left-0 text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-none translate-y-full transition-transform group-hover:translate-y-0">
                          {project.title}
                        </div>
                      </a>

                      <div className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl font-light">
                        {t(`works.projects.${project.translationKey}.category`)}
                      </div>
                    </div>

                    {/* Technologies Stack - Modern Tags */}
                    <div className="work_stack_wrap w-full">
                      <div className="flex flex-wrap gap-2">
                        {project.stack.split(',').map((tech, idx) => (
                          <span
                            key={idx}
                            className="group relative px-4 py-2 text-xs md:text-sm font-medium text-white bg-gradient-to-br from-black/20 to-black/5 backdrop-blur-md rounded-full border border-black/30 hover:border-black/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            <span className="relative z-10">{tech.trim()}</span>
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Info Cards - Glassmorphism Style - Toujours côte à côte */}
                    <div className="work_info_cards w-full grid grid-cols-2 gap-2 md:gap-3">
                      {/* Domain Card */}
                      <div className="group relative backdrop-blur-md bg-black/10 border border-black/20 rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 hover:bg-black/15 hover:border-black/40 transition-all duration-300 overflow-hidden">
                        <div className="relative z-10 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md md:rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/20">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                              </svg>
                            </div>
                            <div className="text-white/60 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wider">
                              {t('works.domain')}
                            </div>
                          </div>
                          <div className="text-white text-xs sm:text-sm md:text-base font-semibold leading-tight">
                            {t(`works.projects.${project.translationKey}.domain`)}
                          </div>
                        </div>
                      </div>

                      {/* Role Card */}
                      <div className="group relative backdrop-blur-md bg-black/10 border border-black/20 rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 hover:bg-black/15 hover:border-black/40 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10 flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md md:rounded-lg bg-gradient-to-br from-green-500/30 to-teal-500/30 border border-white/20">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="text-white/60 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wider">
                              {t('works.role')}
                            </div>
                          </div>
                          <div className="text-white text-xs sm:text-sm md:text-base font-semibold leading-tight">
                            {t(`works.projects.${project.translationKey}.role`)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Features et View Project - Côte à côte */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {/* Features Card */}
                      {((project.techFeatures && project.techFeatures.length > 0) || project.hasCustomFeatures) && (
                        <div className="group relative backdrop-blur-md bg-black/10 border border-black/20 rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 hover:bg-black/15 hover:border-black/40 transition-all duration-300 overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md md:rounded-lg bg-gradient-to-br from-orange-500/30 to-pink-500/30 border border-white/20">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                              <div className="text-white/60 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-wider">
                                {t('works.features')}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                              {project.techFeatures && project.techFeatures.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 sm:gap-2 group/item">
                                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                                  <span className="text-white/80 text-[10px] sm:text-xs md:text-sm group-hover/item:text-white transition-colors leading-tight">
                                    {t(`works.projects.${project.translationKey}.features.${feature}`)}
                                  </span>
                                </div>
                              ))}
                              {project.hasCustomFeatures && (
                                <>
                                  <div className="flex items-center gap-1.5 sm:gap-2 group/item">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                                    <span className="text-white/80 text-[10px] sm:text-xs md:text-sm group-hover/item:text-white transition-colors leading-tight">
                                      {t(`works.projects.${project.translationKey}.features.darkMode`)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 sm:gap-2 group/item">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                                    <span className="text-white/80 text-[10px] sm:text-xs md:text-sm group-hover/item:text-white transition-colors leading-tight">
                                      {t(`works.projects.${project.translationKey}.features.components`)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 sm:gap-2 group/item">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                                    <span className="text-white/80 text-[10px] sm:text-xs md:text-sm group-hover/item:text-white transition-colors leading-tight">
                                      {t(`works.projects.${project.translationKey}.features.performance`)}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 sm:gap-2 group/item">
                                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                                    <span className="text-white/80 text-[10px] sm:text-xs md:text-sm group-hover/item:text-white transition-colors leading-tight">
                                      {t(`works.projects.${project.translationKey}.features.cicd`)}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* View Project Button */}
                      <div className="flex items-center justify-start">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative inline-flex items-center gap-3 px-6 py-3 text-white text-sm md:text-base font-medium backdrop-blur-md bg-black/10 border border-black/30 rounded-full hover:bg-black/20 hover:border-black/50 hover:gap-5 transition-all duration-300 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span className="link_text_wrap relative overflow-hidden">
                            <span className="link_text block transition-transform group-hover:-translate-y-full">
                              {t('works.viewProject')}
                            </span>
                            <span className="link_text absolute top-0 left-0 translate-y-full transition-transform group-hover:translate-y-0">
                              {t('works.viewProject')}
                            </span>
                          </span>
                          <svg
                            className="link_icon w-4 h-4 relative z-10 group-hover:rotate-45 transition-transform duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
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