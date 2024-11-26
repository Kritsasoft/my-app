"use client"; 

import { useEffect, useState, useRef } from 'react';
import Slideshow from '../components/Slideshow';
import Projects from '../components/Project'; 
import Skills from '../components/Skills';
import Activities from '../components/Activities'; 
import { FaGithub, FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Home = () => {
  const [isHomeVisible, setIsHomeVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'about') {
            setIsAboutVisible(true);
          } else if (entry.target.id === 'projects') {
            setIsProjectsVisible(true);
          } else if (entry.target.id === 'contact') {
            setIsContactVisible(true);
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  return (
    <>
      <section id="home" className="h-screen">
        <Slideshow />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-gray-800">Hello, I'm Kritsakorn Sukkasem</h1>
          <p className="text-gray-800 mt-4">Software Engineer Student | Web Developer</p>
        </div>
      </section>

      <section
        id="about"
        className={`py-20 text-center bg-gray-100 fade-in ${isAboutVisible ? 'visible' : ''}`}
        ref={aboutRef}
      >
        <h2 className="text-4xl font-bold mb-5">About Me</h2>
        <p className="max-w-2xl mx-auto">
          I am a Software Engineering student passionate about creating modern and efficient web applications.
          My focus is on clean design and high-quality code.
        </p>
      </section>

      <Skills />

      <Activities /> 

      <section
        id="projects"
        className={`py-20 text-center fade-in ${isProjectsVisible ? 'visible' : ''}`}
        ref={projectsRef}
      >
        <h2 className="text-4xl font-bold mb-5">Projects</h2>
        <Projects />
      </section>

      <section
        id="contact"
        className={`py-20 text-center bg-gray-100 fade-in ${isContactVisible ? 'visible' : ''}`}
        ref={contactRef}
      >
        <h2 className="text-4xl font-bold mb-5">Contact</h2>
        <p className="max-w-2xl mx-auto">
          Get in touch with me through email or social media. I am always open to discussing new opportunities or collaborations.
        </p>
        <div className="flex justify-center space-x-6 mt-8">
          <a href="mailto:candystd1@gmail.com" target="_blank" rel="noopener noreferrer">
            <FaEnvelope className="text-3xl text-gray-800 hover:text-gray-500" />
          </a>
          <a href="https://github.com/Kritsasoft" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-3xl text-gray-800 hover:text-gray-500" />
          </a>
          <a href="https://www.instagram.com/yawarakai09_/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl text-gray-800 hover:text-gray-500" />
          </a>
          <a href="https://www.facebook.com/KSKCaNdYS/" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-3xl text-gray-800 hover:text-gray-500" />
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
