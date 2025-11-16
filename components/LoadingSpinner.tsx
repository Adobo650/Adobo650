
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-red"></div>
      <p className="mt-4 text-lg text-text-secondary">Summoning Political Insights...</p>
    </div>
  );
};

export default LoadingSpinner;
