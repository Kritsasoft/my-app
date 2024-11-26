"use client"; // Mark this as a client component

import { useEffect, useState, useRef } from 'react';

const Projects = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
    <div
      ref={sectionRef}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in ${isVisible ? 'visible' : ''}`}
    >
      {repos.map((repo) => (
        <div key={repo.id} className="p-5 border rounded-lg shadow-lg flex flex-col justify-between h-full">
          <div>
            <h3 className="text-2xl font-bold font-mono whitespace-pre-wrap">{repo.name}</h3>
            <p className="mt-2 font-mono whitespace-pre-wrap">{repo.description}</p>
            <div className="mt-4 font-mono whitespace-pre-wrap">
              <h4 className="font-bold font-mono whitespace-pre-wrap">Languages Used:</h4>
              <ul>
                {repo.languages.nodes.map((language: any) => (
                  <li key={language.name}>{language.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <a 
            href={repo.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-button mt-4 block self-center "
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="bi bi-github inline-block mr-2" 
              viewBox="0 0 16 16"
            >
              <path 
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            View on GitHub
          </a>
        </div>
      ))}
    </div>
  );
};

export default Projects;
