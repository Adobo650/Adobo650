import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import SocialPostCard from './components/SocialPost';
import AdBanner from './components/AdBanner';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { GlobeIcon } from './components/Icons';
import { fetchData } from './services/geminiService';
import type { AppData, GroundingSource, SocialPost } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const appData = await fetchData();
      setData(appData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSources = (sources: GroundingSource[]) => {
    const validSources = sources.filter(s => s.web && s.web.uri && s.web.title);
    if (validSources.length === 0) return null;

    return (
      <div className="bg-light-navy rounded-lg border border-border-gray p-6 mt-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3 flex items-center">
          <GlobeIcon className="w-5 h-5 mr-2" />
          News Sources
        </h3>
        <ul className="space-y-2">
          {validSources.map((source, index) => (
            <li key={index}>
              <a 
                href={source.web!.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                {source.web!.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (loading && !data) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-navy text-center p-4">
        <h2 className="text-2xl font-bold text-brand-red mb-4">An Error Occurred</h2>
        <p className="text-text-secondary max-w-md mb-6">{error}</p>
        <button
          onClick={loadData}
          className="bg-brand-red text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const facebookPosts = data?.socialPosts.filter(p => p.platform === 'Facebook') || [];
  const instagramPosts = data?.socialPosts.filter(p => p.platform === 'Instagram') || [];

  return (
    <div className="min-h-screen bg-navy">
      <Header onRefresh={loadData} loading={loading} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Facebook */}
          <aside className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-bold text-text-primary border-b-2 border-brand-blue pb-2">Facebook Feed</h2>
            {facebookPosts.map((post, index) => <SocialPostCard key={`fb-${index}`} post={post} />)}
          </aside>

          {/* Center Column: News */}
          <section className="lg:col-span-6">
            <h2 className="text-xl font-bold text-text-primary border-b-2 border-brand-red pb-2 mb-6">Latest News</h2>
            {data && <NewsCard content={data.news.content} />}
            {data && renderSources(data.news.sources)}
          </section>

          {/* Right Column: Instagram & Ads */}
          <aside className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-bold text-text-primary border-b-2 border-purple-500 pb-2">Instagram Feed</h2>
            {instagramPosts.map((post, index) => <SocialPostCard key={`ig-${index}`} post={post} />)}

            <h2 className="text-xl font-bold text-text-primary border-b-2 border-green-500 pb-2 pt-4">Sponsored</h2>
            {data?.ads.map((ad, index) => <AdBanner key={`ad-${index}`} ad={ad} />)}
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;