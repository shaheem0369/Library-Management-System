import React from 'react';
interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}
const Card: React.FC<CardProps> = ({
  title,
  value,
  icon,
  color
}) => {
  return <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>;
};
export default Card;