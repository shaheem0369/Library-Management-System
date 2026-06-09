import React from 'react';
import { Link } from 'react-router-dom';
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  to,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    danger: 'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  const classes = `${baseClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  if (to) {
    return <Link to={to} className={classes}>
        {children}
      </Link>;
  }
  return <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>;
};
export default Button;