import React from 'react';
import Feedback from './Feedback';

// A simple markdown to HTML converter
const renderMarkdown = (text: string) => {
  let html = text;
  // Bold: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Headlines: ## Headline
  html = html.replace(/^##\s+(.*$)/gim, '<h2 class="text-2xl font-bold text-brand-red mb-3 mt-4">$1</h2>');
  // List items: * item
  html = html.replace(/^\*\s+(.*$)/gim, '<li class="ml-5 list-disc">$1</li>');
  // Wrap list items in <ul>
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  // Paragraphs
  html = html.split('\n').filter(p => p.trim() !== '' && !p.startsWith('<h') && !p.startsWith('<ul') && !p.startsWith('<li')).map(p => `<p class="mb-4 text-text-secondary leading-relaxed">${p}</p>`).join('');

  return html;
};

interface NewsCardProps {
  content: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ content }) => {
  // Extract first headline as a pseudo-ID from the original content
  const titleMatch = content.match(/^##\s+(.*$)/im);
  const contentId = titleMatch ? titleMatch[1] : content.substring(0, 40) + '...';

  const formattedContent = renderMarkdown(content);

  return (
    <article className="bg-light-navy rounded-lg border border-border-gray">
      <div
        className="prose prose-invert max-w-none p-6"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
      <div className="border-t border-border-gray p-4 flex justify-between items-center">
        <span className="text-xs text-text-secondary">Was this article useful?</span>
        <Feedback contentId={contentId} contentType="news" />
      </div>
    </article>
  );
};

export default NewsCard;
