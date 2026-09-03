import React from 'react';

const Card = ({ children, className = '', onClick, hoverable = false, padding = 'md' }) => {
  const paddingMap = {
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
    none: 'p-0',
  };

  const hoverClass = hoverable ? 'hover:shadow-md transition-shadow duration-200 cursor-pointer' : '';
  const clickClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`card ${paddingMap[padding]} ${hoverClass} ${clickClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
