import React, { useState } from 'react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('Data Science');

  const skills = {
    'Data Science': [
      { name: 'Machine Learning', level: 90 },
      { name: 'Data Visualization', level: 85 },
      { name: 'Statistical Analysis', level: 80 }
    ],
    'Data Analysis': [
      { name: 'Pandas', level: 95 },
      { name: 'NumPy', level: 90 },
      { name: 'SQL', level: 85 }
    ],
    'Python Backend': [
      { name: 'Django', level: 85 },
      { name: 'Flask', level: 80 },
      { name: 'FastAPI', level: 75 }
    ]
  };

  const projects = [
    {
      name: 'Predictive Analytics Platform',
      description: 'Advanced machine learning model for business forecasting',
      technologies: ['Python', 'scikit-learn', 'TensorFlow', 'Pandas']
    },
    {
      name: 'Real-time Data Dashboard',
      description: 'Interactive dashboard for complex data visualization',
      technologies: ['Python', 'React', 'Plotly', 'WebSockets']
    }
  ];

  // Ensure skills is always an array
  const currentSkills = skills[activeSection] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-black to-purple-900 text-white overflow-hidden relative">
      {/* Futuristic 3D Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-blue-600/20 to-purple-600/20 transform skew-y-12"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Tech Portfolio
          </h1>
          <p className="text-xl text-gray-300">
            Data Science | Data Analysis | Python Backend Developer
          </p>
        </header>

        {/* Interactive Skills Section */}
        <section className="mb-16">
          <div className="flex justify-center mb-8 space-x-4">
            {Object.keys(skills).map((category) => (
              <button 
                key={category}
                onClick={() => setActiveSection(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeSection === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {currentSkills.map((skill) => (
              <div 
                key={skill.name} 
                className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-lg border border-blue-500/20 hover:scale-105 transition-transform"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{width: `${skill.level}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Innovative Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div 
                key={project.name} 
                className="bg-gray-800/60 backdrop-blur-lg p-6 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-400">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Contact Me
          </h2>
          <div className="bg-gray-800/60 backdrop-blur-lg p-8 rounded-lg border border-blue-500/20">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-gray-300 mb-2">📧 developer@example.com</p>
                <p className="text-gray-300">📱 +998 (XX) XXX-XX-XX</p>
              </div>
              <div className="flex space-x-6 justify-center">
                {[
                  { name: 'GitHub', link: '#' },
                  { name: 'LinkedIn', link: '#' },
                  { name: 'Instagram', link: '#' },
                  { name: 'Telegram', link: '#' }
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href={social.link} 
                    className="text-xl text-blue-400 hover:text-purple-500 transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
