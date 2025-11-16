import React, { useState } from 'react';
import { ThumbsUpIcon, ThumbsDownIcon } from './Icons';

interface FeedbackProps {
  contentId: string;
  contentType: 'news' | 'social';
}

const Feedback: React.FC<FeedbackProps> = ({ contentId, contentType }) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleFeedback = (type: 'up' | 'down') => {
    const newFeedback = feedback === type ? null : type;
    setFeedback(newFeedback);
    if (newFeedback) {
      console.log(`Feedback received for ${contentType} ('${contentId}'): '${newFeedback}'`);
    } else {
      console.log(`Feedback retracted for ${contentType} ('${contentId}')`);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button 
        onClick={() => handleFeedback('up')} 
        aria-label="Good content" 
        title="Good content"
        className="focus:outline-none"
      >
        <ThumbsUpIcon className={`w-5 h-5 transition-colors ${feedback === 'up' ? 'text-green-500 fill-current' : 'text-text-secondary hover:text-green-400'}`} />
      </button>
      <button 
        onClick={() => handleFeedback('down')} 
        aria-label="Bad content" 
        title="Bad content"
        className="focus:outline-none"
      >
        <ThumbsDownIcon className={`w-5 h-5 transition-colors ${feedback === 'down' ? 'text-brand-red fill-current' : 'text-text-secondary hover:text-brand-red'}`} />
      </button>
    </div>
  );
};

export default Feedback;
