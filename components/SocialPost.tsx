import React from 'react';
import type { SocialPost } from '../types';
import { FacebookIcon, InstagramIcon, LikeIcon, CommentIcon } from './Icons';
import Feedback from './Feedback';

interface SocialPostProps {
  post: SocialPost;
}

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num;
};

const SocialPostCard: React.FC<SocialPostProps> = ({ post }) => {
  const isInstagram = post.platform === 'Instagram';
  const contentId = `${post.username}: ${post.content.substring(0, 30)}...`;

  return (
    <div className="bg-light-navy rounded-lg border border-border-gray p-4 flex flex-col space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={post.avatarUrl} alt={`${post.username} avatar`} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-sm text-text-primary">{post.username}</p>
            <p className="text-xs text-text-secondary">2 hours ago</p>
          </div>
        </div>
        {isInstagram ? <InstagramIcon className="w-5 h-5 text-pink-500" /> : <FacebookIcon className="w-5 h-5 text-blue-500" />}
      </div>

      {/* Content */}
      <p className="text-sm text-text-secondary leading-relaxed">{post.content}</p>

      {/* Image for Instagram */}
      {isInstagram && post.imageUrl && (
        <img src={post.imageUrl} alt="post" className="rounded-lg object-cover w-full" />
      )}

      {/* Footer (Likes/Comments/Feedback) */}
      <div className="flex items-center justify-between pt-2 border-t border-border-gray text-text-secondary">
        <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 cursor-pointer hover:text-brand-red transition-colors">
              <LikeIcon className="w-4 h-4" />
              <span className="text-xs font-medium">{formatNumber(post.likes)}</span>
            </div>
            <div className="flex items-center space-x-1.5 cursor-pointer hover:text-blue-400 transition-colors">
              <CommentIcon className="w-4 h-4" />
              <span className="text-xs font-medium">{formatNumber(post.comments)}</span>
            </div>
        </div>
        <Feedback contentId={contentId} contentType="social" />
      </div>
    </div>
  );
};

export default SocialPostCard;
