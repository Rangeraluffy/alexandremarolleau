import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GitHubContributions from '../components/GitHubContributions';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const categoriesRef = useRef([]);

  const skillsData = [
    {
      nameKey: 'skills.categories.frontend',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      skills: ['React', 'Next.js', 'Astro', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'HTML/CSS', 'SCSS', 'GSAP'],
    },
    {
      nameKey: 'skills.categories.backend',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: ['Node.js', 'Express', 'REST APIs', 'C# .NET', 'SQL'],
    },
    {
      nameKey: 'skills.categories.mobile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      skills: ['Flutter', 'Dart'],
    },
    {
      nameKey: 'skills.categories.tools',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      skills: ['Git', 'Figma', 'CI/CD', 'Firebase'],
    },
  ];

  useEffect(() => {
    if (categoriesRef.current.length === 0) return;

    gsap.fromTo(
      categoriesRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen py-20 md:py-32 bg-white dark:bg-[#0d1117] transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300">
            {t('skills.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="max-w-7xl mx-auto space-y-8 md:space-y-12 mb-16 md:mb-24">
          {skillsData.map((category, index) => (
            <div
              key={category.nameKey}
              ref={(el) => (categoriesRef.current[index] = el)}
              className="group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  {category.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                  {t(category.nameKey)}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="group/tag relative px-5 py-2.5 text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    <span className="relative z-10">{skill}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 dark:from-gray-700/50 to-transparent opacity-0 group-hover/tag:opacity-100 rounded-full transition-opacity duration-300" />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Contributions */}
        <div className="max-w-7xl mx-auto">
          <GitHubContributions username="Rangeraluffy" />
        </div>
      </div>
    </section>
  );
};

export default Skills;