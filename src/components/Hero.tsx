import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Zap,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  TrendingUp,
  FileCheck2,
  Lock,
} from 'lucide-react';
import { Creator } from '../types';

interface HeroProps {
  mode: 'client' | 'creator';
  setMode: (mode: 'client' | 'creator') => void;
  onOpenBriefModal: () => void;
  onOpenCreatorModal: () => void;
  onExploreClick: () => void;
  featuredCreators: Creator[];
  onSelectCreator: (creator: Creator) => void;
}

export const Hero: React.FC<HeroProps> = ({
  mode,
  setMode,
  onOpenBriefModal,
  onOpenCreatorModal,
  onExploreClick,
  featuredCreators,
  onSelectCreator,
}) => {
  return (
    <section id="top" className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-neutral-900">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-neutral-800/15 via-neutral-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Main Copy Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Perspective Badges */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-400 mb-6">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
              {mode === 'client' ? (
                <span>
                  <strong className="text-neutral-200 font-medium">184+ Verified Creative Pros</strong> open for bookings
                </span>
              ) : (
                <span>
                  <strong className="text-neutral-200 font-medium">Over $3.8M</strong> distributed to creative providers
                </span>
              )}
            </div>

            {/* Dynamic Headline based on mode */}
            {mode === 'client' ? (
              <motion.div
                key="client-headline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-5">
                  Recruit vetted creative pros{' '}
                  <span className="text-neutral-400 font-bold">
                    without agency markups.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed mb-8">
                  Connect directly with specialized UGC creators, 3D artists, video editors, and brand designers.
                  Every contract is protected by <strong className="text-neutral-200 font-medium">automated milestone escrow</strong>, guaranteed delivery timelines, and full commercial copyright transfer.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="creator-headline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-5">
                  Land high-ticket brand retainers.{' '}
                  <span className="text-neutral-400 font-bold">
                    Never chase an invoice again.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-relaxed mb-8">
                  REQruit gives independent creators and studios the security of enterprise clients.
                  Client payments are funded in escrow before you hit record or render, with 0% platform commission on repeat retainers.
                </p>
              </motion.div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              {mode === 'client' ? (
                <>
                  <button
                    id="hero-post-brief-btn"
                    onClick={onOpenBriefModal}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>Post a Project Brief</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950" />
                  </button>
                  <button
                    id="hero-browse-talent-btn"
                    onClick={onExploreClick}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 font-medium text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Browse Creative Roster</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    id="hero-join-creator-btn"
                    onClick={onOpenCreatorModal}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>Apply to Join Roster</span>
                    <ArrowRight className="w-4 h-4 text-neutral-950" />
                  </button>
                  <button
                    id="hero-switch-client-btn"
                    onClick={() => setMode('client')}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 font-medium text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Looking to Hire Instead?</span>
                  </button>
                </>
              )}
            </div>

            {/* Micro Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-850 w-full text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>100% Escrow Funded</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Standardized IP Contracts</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Avg 48h Turnaround</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Showcase / Live Match Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-neutral-900/80 p-1 border border-neutral-800 shadow-xl shadow-black/60">
              <div className="rounded-xl bg-[#0e0f12] p-5 sm:p-6 overflow-hidden">
                {/* Header inside widget */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400/90" />
                    <span className="text-xs font-medium text-neutral-300">
                      Live Talent Matching Spotlight
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                    Vetted 4.9★+
                  </span>
                </div>

                {/* Featured Creator Spotlight Carousel / Card */}
                {featuredCreators.slice(0, 2).map((creator, idx) => (
                  <div
                    key={creator.id}
                    className={`rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 hover:border-neutral-700 transition-all cursor-pointer ${
                      idx > 0 ? 'mt-3 hidden sm:block' : ''
                    }`}
                    onClick={() => onSelectCreator(creator)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={creator.avatarUrl}
                            alt={creator.name}
                            className="w-11 h-11 rounded-xl object-cover border border-neutral-750"
                          />
                          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-900" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-semibold text-sm text-neutral-100 hover:text-white transition-colors">
                              {creator.name}
                            </h4>
                            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
                          </div>
                          <p className="text-xs text-neutral-400">{creator.categoryLabel}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-neutral-500">From</span>
                        <div className="font-semibold text-sm text-neutral-100">
                          ${creator.startingRate}{' '}
                          <span className="text-[10px] text-neutral-400 font-normal">
                            {creator.rateUnit}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-2 mt-3 leading-relaxed">
                      "{creator.bio}"
                    </p>

                    {/* Tools / Skills Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      {creator.tools.slice(0, 3).map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded bg-neutral-800/80 text-[10px] text-neutral-300 border border-neutral-700/50"
                        >
                          {tool}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300 font-medium border border-neutral-700/60">
                        ★ {creator.rating} ({creator.reviewsCount})
                      </span>
                    </div>
                  </div>
                ))}

                {/* Live Guarantee banner inside card */}
                <div className="mt-4 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Lock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>REQruit Escrow Guarantee</span>
                  </div>
                  <span className="text-neutral-300 font-medium text-[11px]">
                    0% risk on non-delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative background cards */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border border-neutral-850 -z-10 bg-neutral-900/20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
