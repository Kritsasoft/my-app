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
      { threshold: 0.1 } // Adjust this threshold for earlier/later fade-in
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
        <div key={repo.id} className="p-5 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold">{repo.name}</h3>
          <p className="mt-2">{repo.description}</p>
          <div className="mt-4">
            <h4 className="font-bold">Languages Used:</h4>
            <ul>
              {repo.languages.nodes.map((language: any) => (
                <li key={language.name}>{language.name}</li>
              ))}
            </ul>
          </div>
          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 block">
            View on GitHub
          </a>
        </div>
      ))}
    </div>
  );
};

export default Projects;
