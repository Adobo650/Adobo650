
export interface NewsArticle {
  title: string;
  summary: string;
}

export interface GroundingSource {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SocialPost {
  platform: 'Facebook' | 'Instagram';
  username: string;
  content: string;
  likes: number;
  comments: number;
  avatarUrl: string;
  imageUrl?: string;
}

export interface Ad {
  headline: string;
  description: string;
  displayUrl: string;
}

export interface AppData {
  news: {
    content: string;
    sources: GroundingSource[];
  };
  socialPosts: SocialPost[];
  ads: Ad[];
}
