
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-navy border-t border-border-gray mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-text-secondary text-sm">
        <p>&copy; {new Date().getFullYear()} Trump Today. All rights reserved.</p>
        <p className="mt-2">This website uses Google's Gemini API to generate content. Information may be simulated and should not be considered factual. The content is for demonstrative purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;
