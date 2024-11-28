"use client";

import { useState, useEffect } from 'react';

const activities = [
  {
    image: '/images/no1Hack2022.jpg',
    title: 'Hackathon 2022',
    description: 'Participated in the Software Engineering hackathon competition and win the 1st place.',
  },
  {
    image: '/images/hack2023.jpg',
    title: 'Hackathon 2023',
    description: 'Participated in the Software Engineering hackathon competition.',
  },
  {
    image: '/images/activity3.jpg',
    title: 'Tech Talk',
    description: 'Presented a tech talk on modern web development trends.',
  },
  // Add more activities as needed
];

const Activities = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('activities');
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="activities" className="py-20 text-center bg-white">
      <h2 className="text-4xl font-bold mb-8 font-mono whitespace-pre-wrap">University Activities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`activity-box activity-box-modern ${isVisible ? (index % 2 === 0 ? 'activity-box-left' : 'activity-box-right') : ''}`}
          >
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-2xl font-bold mt-4 font-mono whitespace-pre-wrap">{activity.title}</h3>
            <p className="mt-2 font-mono whitespace-pre-wrap">{activity.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Activities;
