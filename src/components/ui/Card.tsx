import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  footerContent: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, footerContent }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="p-4 border-t border-gray-200">
        {footerContent}
      </div>
    </div>
  );
};

export default Card;