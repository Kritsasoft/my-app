"use client"; // Mark this as a client component

import { useEffect, useState } from 'react';

const Projects = () => {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Kritsasoft/repos');
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <div key={repo.id} className="p-5 border rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold">{repo.name}</h3>
          <p className="mt-2">{repo.description}</p>
          <div className="mt-4">
            <h4 className="font-bold">Languages Used:</h4>
            <ul>
              {repo.language && <li>{repo.language}</li>}
            </ul>
          </div>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 block">
            View on GitHub
          </a>
        </div>
      ))}
    </div>
  );
};

export default Projects;
