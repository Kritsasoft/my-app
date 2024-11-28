import React from 'react';
import { IconType } from 'react-icons';

interface SkillCardProps {
  icon: IconType;
  name: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon: Icon, name }) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-sm 
        rounded-xl shadow-lg transition-all duration-300 
        hover:scale-105 hover:bg-white/20 hover:shadow-xl group text-center"
    >
      <Icon 
        className="mb-2 text-4xl text-blue-500 
        group-hover:text-blue-600 transition-colors duration-300" 
      />
      <p className="text-sm font-medium font-mono whitespace-pre-wrap text-center text-gray-700 
        dark:text-gray-300 group-hover:text-blue-800 
        dark:group-hover:text-blue-400 transition-colors duration-300">
        {name}
      </p>
    </div>
  );
};

export default SkillCard;
