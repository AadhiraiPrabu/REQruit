export type CreativeCategory =
  | 'all'
  | 'ugc_video'
  | 'video_editing'
  | 'motion_3d'
  | 'brand_design'
  | 'creative_copy'
  | 'audio_podcast'
  | 'product_photo';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  mediaType: 'image' | 'video';
  clientName: string;
  metricHighlight?: string;
  description: string;
  deliverables: string[];
}

export interface ServicePackage {
  id: string;
  tierName: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  authorRole: string;
  company: string;
  companyAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  projectType: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  coverUrl: string;
  title: string;
  category: CreativeCategory;
  categoryLabel: string;
  location: string;
  timezone: string;
  isVerified: boolean;
  isAvailableNow: boolean;
  rating: number;
  reviewsCount: number;
  completedProjects: number;
  repeatHireRate: number; // e.g. 94%
  startingRate: number; // in USD
  rateUnit: 'per project' | 'per video' | 'per day' | 'per hour';
  bio: string;
  tools: string[];
  skills: string[];
  clientLogos: string[];
  turnaroundAvg: string;
  portfolio: PortfolioItem[];
  packages: ServicePackage[];
  reviews: Review[];
  featured?: boolean;
}

export interface ProjectBrief {
  id: string;
  projectTitle: string;
  category: CreativeCategory;
  projectType: string;
  deliverablesCount: number;
  formats: string[];
  budgetMin: number;
  budgetMax: number;
  timelineDays: number;
  targetAudience: string;
  keyMessage: string;
  vibeStyle: string;
  rawFilesNeeded: boolean;
  usageRights: 'organic_only' | 'paid_ads_90d' | 'full_buyout';
  clientName: string;
  clientEmail: string;
  companyName: string;
  createdAt: string;
}

export interface CreatorApplication {
  fullName: string;
  email: string;
  portfolioLink: string;
  socialHandle: string;
  primaryCategory: CreativeCategory;
  yearsExperience: string;
  dayRate: number;
  toolsUsed: string[];
  bio: string;
}

export interface CostEstimateOptions {
  category: CreativeCategory;
  volume: number;
  rushDelivery: boolean;
  commercialUsage: 'organic' | 'paid_90d' | 'full_perpetual';
  rawFootage: boolean;
  scriptingIncluded: boolean;
}
