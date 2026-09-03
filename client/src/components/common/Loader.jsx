import React from 'react';

const Loader = ({ size = 'md', text }) => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-4',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className={`${sizes[size]} animate-spin rounded-full border-gray-200 border-t-primary`}></div>
      {text && <p className="mt-4 text-gray-500 font-medium">{text}</p>}
    </div>
  );
};

export default Loader;
