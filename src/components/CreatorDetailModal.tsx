import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  Clock,
  Briefcase,
  MapPin,
  TrendingUp,
  Bookmark,
  Share2,
  Calendar,
  Check,
  Play,
  Layers,
  FileText,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { Creator, ServicePackage } from '../types';

interface CreatorDetailModalProps {
  creator: Creator | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (creator: Creator) => void;
  onSelectPackageForBrief: (creator: Creator, pkg?: ServicePackage) => void;
}

export const CreatorDetailModal: React.FC<CreatorDetailModalProps> = ({
  creator,
  onClose,
  isSaved,
  onToggleSave,
  onSelectPackageForBrief,
}) => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'packages' | 'reviews' | 'about'>('portfolio');
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<any | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!creator) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover Photo & Close Button */}
        <div className="relative h-44 sm:h-56 w-full shrink-0 overflow-hidden bg-neutral-950">
          <img
            src={creator.coverUrl}
            alt={`${creator.name} cover`}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-950/70 hover:bg-neutral-900 text-white border border-neutral-700/80 transition-all z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Share & Bookmark Actions */}
          <div className="absolute top-4 right-16 flex items-center gap-2 z-10">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-neutral-950/70 hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700/80 text-xs transition-all flex items-center gap-1"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => onToggleSave(creator)}
              className={`p-2.5 rounded-full bg-neutral-950/70 border border-neutral-700/80 transition-all ${
                isSaved ? 'text-neutral-100' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-neutral-100' : ''}`} />
            </button>
          </div>
        </div>

        {/* Profile Header Info */}
        <div className="px-6 sm:px-8 pb-4 shrink-0 -mt-16 sm:-mt-20 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src={creator.avatarUrl}
                  alt={creator.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-neutral-900 shadow-xl bg-neutral-950"
                />
                {creator.isAvailableNow && (
                  <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-neutral-900 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full opacity-90" />
                  </span>
                )}
              </div>

              <div className="mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                    {creator.name}
                  </h2>
                  {creator.isVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-800 border border-neutral-700 text-[11px] font-medium text-neutral-300">
                      <CheckCircle2 className="w-3 h-3 text-neutral-400" />
                      <span>Verified Pro</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-0.5">
                  <span className="font-mono text-neutral-400">{creator.handle}</span>
                  <span>•</span>
                  <span>{creator.categoryLabel}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-neutral-400">
                    <MapPin className="w-3 h-3 text-neutral-500" />
                    {creator.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Turnaround and rating block */}
            <div className="flex items-center gap-3 bg-neutral-950/80 border border-neutral-800 p-2.5 rounded-xl self-start sm:self-auto">
              <div className="px-2">
                <div className="flex items-center gap-1 text-xs font-semibold text-white">
                  <Star className="w-3 h-3 text-neutral-300 fill-neutral-300" />
                  <span>{creator.rating}</span>
                </div>
                <div className="text-[10px] text-neutral-400">{creator.reviewsCount} reviews</div>
              </div>
              <div className="h-6 w-px bg-neutral-800" />
              <div className="px-2">
                <div className="text-xs font-semibold text-white">{creator.completedProjects}+</div>
                <div className="text-[10px] text-neutral-400">completed</div>
              </div>
              <div className="h-6 w-px bg-neutral-800" />
              <div className="px-2">
                <div className="text-xs font-semibold text-emerald-400/90">{creator.repeatHireRate}%</div>
                <div className="text-[10px] text-neutral-400">repeat hire</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-neutral-800 mt-6 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'portfolio'
                  ? 'border-neutral-100 text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Portfolio & Work ({creator.portfolio.length})
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'packages'
                  ? 'border-neutral-100 text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Service Packages ({creator.packages.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-neutral-100 text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Client Reviews ({creator.reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'about'
                  ? 'border-neutral-100 text-white'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              About & Toolkit
            </button>
          </div>
        </div>

        {/* Scrollable Tab Content Area */}
        <div className="px-6 sm:px-8 py-5 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {creator.portfolio.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedPortfolioItem(item)}
                    className="group rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 overflow-hidden cursor-pointer transition-all"
                  >
                    <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent flex flex-col justify-end p-3">
                        <span className="text-[10px] font-medium text-neutral-300 bg-neutral-900/90 px-2 py-0.5 rounded w-fit mb-1 border border-neutral-800">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-semibold text-white line-clamp-1">
                          {item.title}
                        </h4>
                      </div>

                      {item.mediaType === 'video' && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-neutral-900/90 backdrop-blur-sm border border-neutral-700 flex items-center justify-center text-neutral-100 shadow-md">
                          <Play className="w-3 h-3 fill-neutral-100 ml-0.5" />
                        </div>
                      )}
                    </div>

                    <div className="p-3.5">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-neutral-400 font-normal">Client: {item.clientName}</span>
                        {item.metricHighlight && (
                          <span className="text-emerald-400/90 font-medium text-[11px]">
                            {item.metricHighlight}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.deliverables.map((deliv, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-neutral-900 text-[10px] text-neutral-400 border border-neutral-800"
                          >
                            ✓ {deliv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expanded Item Lightbox Preview if selected */}
              {selectedPortfolioItem && (
                <div className="p-5 rounded-2xl bg-neutral-950 border border-neutral-700 space-y-3 relative">
                  <button
                    onClick={() => setSelectedPortfolioItem(null)}
                    className="absolute top-4 right-4 text-xs text-neutral-400 hover:text-white"
                  >
                    Close Preview ✕
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 text-xs font-medium">
                      Case Study Detail
                    </span>
                    <h4 className="font-semibold text-base text-white">{selectedPortfolioItem.title}</h4>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {selectedPortfolioItem.description}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-neutral-800 text-xs">
                    <span className="text-neutral-400">
                      Client: <strong className="text-white font-medium">{selectedPortfolioItem.clientName}</strong>
                    </span>
                    <span className="text-emerald-400 font-medium">
                      Outcome: {selectedPortfolioItem.metricHighlight}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PACKAGES */}
          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creator.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-5 flex flex-col justify-between border transition-all ${
                    pkg.popular
                      ? 'bg-neutral-900/90 border-neutral-700 shadow-xl'
                      : 'bg-neutral-950/80 border-neutral-800'
                  }`}
                >
                  <div>
                    {pkg.popular && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-950 text-[10px] font-semibold uppercase tracking-wider mb-2">
                        Most Popular
                      </span>
                    )}
                    <h4 className="font-semibold text-base text-white mb-1">{pkg.tierName}</h4>
                    <p className="text-xs text-neutral-400 mb-3">{pkg.description}</p>

                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="font-display font-extrabold text-2xl text-white">
                        ${pkg.price}
                      </span>
                      <span className="text-xs text-neutral-400">USD</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-neutral-400 pb-3 mb-3 border-b border-neutral-800">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        {pkg.deliveryDays} Days Delivery
                      </span>
                      <span>•</span>
                      <span>{pkg.revisions} Revisions</span>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => onSelectPackageForBrief(creator, pkg)}
                    className={`w-full py-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${
                      pkg.popular
                        ? 'bg-neutral-100 hover:bg-white text-neutral-950 font-semibold shadow-sm'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                    }`}
                  >
                    <span>Choose {pkg.tierName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-base font-semibold text-white">
                    <Star className="w-3.5 h-3.5 text-neutral-300 fill-neutral-300" />
                    <span>{creator.rating} overall rating</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Based on {creator.reviewsCount} verified milestones on REQruit
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Milestones</span>
                </div>
              </div>

              {creator.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-medium text-xs text-neutral-200">
                        {rev.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-xs text-white">{rev.authorName}</div>
                        <div className="text-[10px] text-neutral-400">
                          {rev.authorRole} at <strong className="text-neutral-300 font-medium">{rev.company}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-neutral-300">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-neutral-300" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-neutral-500 pt-1">
                    <span>Project: {rev.projectType}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: ABOUT & TOOLS */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                  Biography & Approach
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">{creator.bio}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                  Software & Toolkit
                </h4>
                <div className="flex flex-wrap gap-2">
                  {creator.tools.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-medium text-neutral-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-2">
                  Client History
                </h4>
                <div className="flex flex-wrap gap-2">
                  {creator.clientLogos.map((client) => (
                    <span
                      key={client}
                      className="px-3 py-1.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 font-medium"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 shrink-0 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-neutral-400">Starting Rate</div>
            <div className="text-lg font-bold text-white">
              ${creator.startingRate}{' '}
              <span className="text-xs font-normal text-neutral-400">{creator.rateUnit}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onToggleSave(creator)}
              className="p-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-750 text-neutral-200 transition-colors"
              title="Save to Shortlist"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'text-neutral-100 fill-neutral-100' : ''}`} />
            </button>

            <button
              id="modal-brief-creator-btn"
              onClick={() => onSelectPackageForBrief(creator)}
              className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <Briefcase className="w-4 h-4" />
              <span>Hire {creator.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
