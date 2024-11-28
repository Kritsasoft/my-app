"use client";

import React, { useState } from 'react';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython, 
  FaJava, FaJsSquare, FaDatabase 
} from 'react-icons/fa';
import { 
  SiC, SiCplusplus, SiTypescript, SiDart, 
  SiNestjs, SiSpringboot, SiMongodb, SiMysql, 
  SiNextdotjs, SiVuedotjs, SiNuxtdotjs 
} from 'react-icons/si';
import SkillCard from '../components/SkillsCard'; 
// Skill category data
const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { icon: SiC, name: 'C' },
      { icon: SiCplusplus, name: 'C++' },
      { icon: FaPython, name: 'Python' },
      { icon: FaJsSquare, name: 'JavaScript' },
      { icon: SiTypescript, name: 'TypeScript' },
      { icon: SiDart, name: 'Dart' },
      { icon: FaJava, name: 'Java' }
    ]
  },
  {
    title: 'Backend Technologies',
    skills: [
      { icon: SiNestjs, name: 'NestJS' },
      { icon: SiSpringboot, name: 'Spring Boot' },
      { icon: FaNodeJs, name: 'Node.js' }
    ]
  },
  {
    title: 'Frontend Technologies',
    skills: [
      { icon: FaHtml5, name: 'HTML5' },
      { icon: FaCss3Alt, name: 'CSS3' },
      { icon: SiNextdotjs, name: 'Next.js' },
      { icon: SiNuxtdotjs, name: 'Nuxt.js' },
      { icon: FaReact, name: 'React' },
      { icon: SiVuedotjs, name: 'Vue.js' }
    ]
  },
  {
    title: 'Databases',
    skills: [
      { icon: SiMongodb, name: 'MongoDB' },
      { icon: SiMysql, name: 'MySQL' },
      { icon: FaDatabase, name: 'Database' }
    ]
  }
];

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section 
      id="skills" 
      className="min-h-screen flex flex-col justify-center py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 
      dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-5xl font-extrabold mb-12 text-center font-mono whitespace-pre-wrap 
          text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Tech Arsenal
        </h2>

        {/* Category Navigation */}
        <div className="flex justify-center mb-8 space-x-4">
          {skillCategories.map((category, index) => (
            <button
              key={category.title}
              onClick={() => setActiveCategory(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 font-mono whitespace-pre-wrap
              ${activeCategory === index 
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-300'}`}
              aria-selected={activeCategory === index ? 'true' : 'false'}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center"
        >
          {skillCategories[activeCategory].skills.map((skill) => (
            <SkillCard key={skill.name} icon={skill.icon} name={skill.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
