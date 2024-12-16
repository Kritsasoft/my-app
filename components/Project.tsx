"use client";

import { useEffect, useState, useRef } from 'react';
import { Github, Code, Layers, Database, Terminal, Cpu } from 'lucide-react';

type Repository = {
  id: string;
  name: string;
  description: string;
  url: string;
  languages: {
    nodes: Array<{ name: string }>
  }
};

const LanguageIcons: { [key: string]: JSX.Element } = {
  'JavaScript': <Terminal className="w-5 h-5 text-yellow-500" />,
  'TypeScript': <Cpu className="w-5 h-5 text-blue-500" />,
  'Python': <Code className="w-5 h-5 text-green-500" />,
  'React': <Layers className="w-5 h-5 text-cyan-600" />,
  'Next.js': <Cpu className="w-5 h-5 text-black" />,
  'HTML': <Code className="w-5 h-5 text-orange-500" />,
  'CSS': <Code className="w-5 h-5 text-indigo-500" />,
  'Java': <Database className="w-5 h-5 text-red-500" />,
  'default': <Code className="w-5 h-5 text-gray-500" />
};

const ProjectCard = ({ repo }: { repo: Repository }) => {
  return (
    <div className="skill-card relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg dark:bg-gray-800">
      <div className="relative p-6 space-y-5">
        <div className="flex justify-center items-center">
          <h3 className="text-2xl font-bold text-gray-800 capitalize tracking-wide text-center dark:text-gray-100">
            {repo.name.replace(/[-_]/g, ' ')}
          </h3>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 dark:bg-gray-700 dark:border-gray-600">
          <p className="text-gray-600 text-sm min-h-[60px] italic text-center dark:text-gray-300">
            {repo.description || 'No description available'}
          </p>
        </div>

        <div className="border-t border-gray-100 pt-4 dark:border-gray-600">
          <div className="flex items-center space-x-3">
            <h4 className="text-sm font-semibold text-gray-600 flex items-center space-x-2 dark:text-gray-300">
              <Code className="w-5 h-5 text-gray-500" />
              <span>Languages:</span>
            </h4>
            <div className="flex space-x-3">
              {repo.languages.nodes.slice(0, 3).map((language) => (
                <div 
                  key={language.name} 
                  className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full border border-gray-200 hover:bg-gray-200 transition-all dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-500"
                >
                  {LanguageIcons[language.name] || LanguageIcons['default']}
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {language.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <a 
            href={repo.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-button flex items-center justify-center w-full space-x-2 bg-gray-800 text-white py-2 rounded-lg shadow-lg hover:bg-gray-900 transition-all"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      const query = `
        {
          user(login: "Kritsasoft") {
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  languages(first: 3) {
                    nodes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
          },
          body: JSON.stringify({ query }),
        });

        const { data } = await response.json();
        setRepos(data.user.pinnedItems.nodes);
      } catch (error) {
        console.error("Error fetching pinned GitHub repos:", error);
      }
    };

    fetchPinnedRepos();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={`min-h-screen flex flex-col justify-center py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 ${isVisible ? 'visible' : ''}`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-5xl font-extrabold mb-12 text-center font-mono whitespace-pre-wrap text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
          {repos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
