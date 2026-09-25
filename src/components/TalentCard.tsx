import React from 'react';
import {
  Star,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Bookmark,
  Sparkles,
  MapPin,
  TrendingUp,
  Play,
  Briefcase,
} from 'lucide-react';
import { Creator } from '../types';

interface TalentCardProps {
  creator: Creator;
  isSaved: boolean;
  onToggleSave: (creator: Creator) => void;
  onSelectCreator: (creator: Creator) => void;
  onQuickBrief: (creator: Creator) => void;
}

export const TalentCard: React.FC<TalentCardProps> = ({
  creator,
  isSaved,
  onToggleSave,
  onSelectCreator,
  onQuickBrief,
}) => {
  return (
    <div
      id={`creator-card-${creator.id}`}
      className="group relative rounded-2xl bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700/80 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/60"
    >
      <div>
        {/* Top Header: Avatar, Info, Rates */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3.5">
            <div className="relative shrink-0">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="w-13 h-13 rounded-2xl object-cover border border-neutral-750 group-hover:border-neutral-600 transition-colors shadow-sm"
              />
              {creator.isAvailableNow && (
                <span
                  title="Available for immediate booking"
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-neutral-900 flex items-center justify-center"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full opacity-90" />
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3
                  onClick={() => onSelectCreator(creator)}
                  className="font-semibold text-base text-neutral-100 hover:text-white cursor-pointer transition-colors"
                >
                  {creator.name}
                </h3>
                {creator.isVerified && (
                  <span title="Identity & Portfolio Vetted by REQruit">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-400 font-mono mt-0.5">{creator.handle}</p>

              <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-neutral-500" />
                  {creator.location}
                </span>
                <span>•</span>
                <span className="text-neutral-500">{creator.timezone}</span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            id={`bookmark-btn-${creator.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(creator);
            }}
            className={`p-2 rounded-xl border transition-all ${
              isSaved
                ? 'bg-neutral-800 border-neutral-700 text-neutral-100'
                : 'bg-neutral-900/80 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
            }`}
            title={isSaved ? 'Remove from shortlist' : 'Add to shortlist'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-neutral-200 text-neutral-200' : ''}`} />
          </button>
        </div>

        {/* Title & Core Bio */}
        <h4 className="text-sm font-medium text-neutral-200 line-clamp-1 mb-1.5">
          {creator.title}
        </h4>
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4">
          {creator.bio}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 mb-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-neutral-200">
              <Star className="w-3 h-3 text-neutral-300 fill-neutral-300" />
              <span>{creator.rating}</span>
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">
              {creator.reviewsCount} reviews
            </div>
          </div>

          <div className="border-x border-neutral-800">
            <div className="text-xs font-semibold text-neutral-200">
              {creator.completedProjects}+
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">campaigns</div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-xs font-semibold text-emerald-400/90">
              <TrendingUp className="w-3 h-3" />
              <span>{creator.repeatHireRate}%</span>
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">repeat hire</div>
          </div>
        </div>

        {/* Portfolio Showcase Preview Thumbnails */}
        {creator.portfolio && creator.portfolio.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
              <span className="font-normal text-neutral-400">Sample Work</span>
              <span className="text-neutral-400 text-[10px]">
                {creator.portfolio[0].metricHighlight}
              </span>
            </div>

            <div
              onClick={() => onSelectCreator(creator)}
              className="relative rounded-xl overflow-hidden aspect-video bg-neutral-950 border border-neutral-800 group/thumb cursor-pointer"
            >
              <img
                src={creator.portfolio[0].thumbnailUrl}
                alt={creator.portfolio[0].title}
                className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent flex flex-col justify-end p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-neutral-200 line-clamp-1">
                    {creator.portfolio[0].title}
                  </span>
                  {creator.portfolio[0].mediaType === 'video' && (
                    <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-950 flex items-center justify-center shrink-0 ml-1">
                      <Play className="w-2 h-2 fill-neutral-950 ml-0.5" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills & Tools chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {creator.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded-md bg-neutral-800/70 text-[10px] text-neutral-300 border border-neutral-700/40"
            >
              {skill}
            </span>
          ))}
          {creator.skills.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md bg-neutral-850 text-[10px] text-neutral-400">
              +{creator.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Price & Primary Actions */}
      <div className="pt-3 border-t border-neutral-800/80 mt-2">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium block">
              Starting at
            </span>
            <div className="text-base font-bold text-white">
              ${creator.startingRate}{' '}
              <span className="text-xs font-normal text-neutral-400">
                {creator.rateUnit}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Avg {creator.turnaroundAvg}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            id={`view-profile-btn-${creator.id}`}
            onClick={() => onSelectCreator(creator)}
            className="w-full py-2 px-3 rounded-xl bg-neutral-850 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-medium flex items-center justify-center gap-1 border border-neutral-800 transition-all"
          >
            <span>Portfolio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            id={`quick-brief-btn-${creator.id}`}
            onClick={() => onQuickBrief(creator)}
            className="w-full py-2 px-3 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-semibold flex items-center justify-center gap-1 shadow-sm transition-all active:scale-[0.98]"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Brief</span>
          </button>
        </div>
      </div>
    </div>
  );
};
