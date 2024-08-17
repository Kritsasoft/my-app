
"use client"; 

import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython, FaJava, FaJsSquare, FaDatabase } from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { SiC, SiCplusplus, SiTypescript, SiGoland, SiDart, SiNestjs, SiSpringboot, SiMongodb, SiMysql, SiNextdotjs, SiVuedotjs, SiNuxtdotjs } from 'react-icons/si';

const Skills = () => {
  return (
    <section id="skills" className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-5">My Skills</h2>
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-3">Programming Languages</h3>
        <div className="flex justify-center flex-wrap gap-6 mb-10">
          <SiC size={40} />
          <SiCplusplus size={40} />
          <FaPython size={40} />
          <FaJsSquare size={40} />
          <SiTypescript size={40} />
          <FaGolang size={40} />
          <SiDart size={40} />
          <FaJava size={40} />
        </div>

        <h3 className="text-2xl font-semibold mb-3">Backend</h3>
        <div className="flex justify-center flex-wrap gap-6 mb-10">
          <SiNestjs size={40} />
          <SiSpringboot size={40} />
          <FaNodeJs size={40} />
          <FaGolang size={40} />
        </div>

        <h3 className="text-2xl font-semibold mb-3">Frontend</h3>
        <div className="flex justify-center flex-wrap gap-6 mb-10">
          <FaHtml5 size={40} />
          <FaCss3Alt size={40} />
          <SiNextdotjs size={40} />
          <SiNuxtdotjs size={40} />
          <FaReact size={40} />
          <SiVuedotjs size={40} />
        </div>

        <h3 className="text-2xl font-semibold mb-3">Database</h3>
        <div className="flex justify-center flex-wrap gap-6 mb-10">
          <SiMongodb size={40} />
          <SiMysql size={40} />
          <FaDatabase size={40} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
