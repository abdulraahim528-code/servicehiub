import React from 'react';

interface BadgeProps {
  text: string;
  color?: string;
}

const Badge: React.FC<BadgeProps> = ({ text, color = 'bg-blue-500' }) => {
  return (
    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium text-white ${color} rounded-full`}>
      {text}
    </span>
  );
};

export default Badge;