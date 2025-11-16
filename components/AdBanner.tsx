
import React from 'react';
import type { Ad } from '../types';

interface AdBannerProps {
  ad: Ad;
}

const AdBanner: React.FC<AdBannerProps> = ({ ad }) => {
  return (
    <div className="bg-light-navy rounded-lg border border-border-gray p-4">
      <div className="flex items-start space-x-2">
        <span className="text-xs font-bold bg-yellow-500 text-black px-1.5 py-0.5 rounded-sm">Ad</span>
        <div className="flex-1">
          <a href="#" className="text-blue-400 hover:underline text-sm font-semibold">{ad.headline}</a>
          <p className="text-xs text-text-secondary mt-1">{ad.description}</p>
          <p className="text-xs text-green-400 mt-1">{ad.displayUrl}</p>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
