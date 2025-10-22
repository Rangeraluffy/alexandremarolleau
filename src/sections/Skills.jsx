import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GitHubContributions from '../components/GitHubContributions';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const skillsData = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React / Next.js', level: 90 },
        { name: 'Vue.js', level: 75 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'TypeScript', level: 80 },
      ],
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js / Express', level: 85 },
        { name: 'Python / Django', level: 70 },
        { name: 'REST APIs', level: 90 },
        { name: 'GraphQL', level: 65 },
      ],
    },
    {
      name: 'Mobile',
      skills: [
        { name: 'Flutter', level: 85 },
        { name: 'React Native', level: 75 },
      ],
    },
  ];

  useEffect(() => {
    if (cardsRef.current.length === 0) return;

    gsap.fromTo(
      cardsRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
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
      className="min-h-screen py-20 bg-gray-100 dark:bg-[#0d1117] transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white transition-colors duration-300">
          Skills & Tools
        </h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-16"></div>

        {/* Grille de compétences */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {skillsData.map((category, index) => (
            <div 
              key={category.name} 
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-white dark:bg-[#0d1117] rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-300">
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-300">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section GitHub Contributions */}
        <div className="max-w-7xl mx-auto">
          <GitHubContributions username="Rangeraluffy" />
        </div>
      </div>
    </section>
  );
};

export default Skills;