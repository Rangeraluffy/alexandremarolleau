const Skills = () => {
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

  return (
    <section id="skills" className="min-h-screen py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-12">Skills & Tools</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-16"></div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillsData.map((category) => (
            <div key={category.name} className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6">{category.name}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;