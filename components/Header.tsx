import React from 'react';
import { RefreshIcon } from './Icons';

interface HeaderProps {
  onRefresh: () => void;
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, loading }) => {
  return (
    <header className="bg-light-navy border-b border-border-gray sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-red to-brand-blue rounded-full flex items-center justify-center">
             <span className="text-white font-bold text-xl">T</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Trump <span className="text-text-secondary">Today</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-text-secondary hidden sm:block">
            AI-Powered News & Social Hub
          </div>
           <button
                onClick={onRefresh}
                disabled={loading}
                className="p-2 rounded-full text-text-secondary hover:bg-border-gray hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-navy focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                aria-label="Refresh content"
                title="Refresh content"
              >
                <RefreshIcon className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;