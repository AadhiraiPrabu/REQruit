import React from 'react';
import { Sparkles, Bookmark, Briefcase, PlusCircle, Search, UserCheck } from 'lucide-react';
import { Creator } from '../types';

interface NavbarProps {
  mode: 'client' | 'creator';
  setMode: (mode: 'client' | 'creator') => void;
  savedCreators: Creator[];
  onOpenSavedDrawer: () => void;
  onOpenBriefModal: (preselectedCreator?: Creator) => void;
  onOpenCreatorModal: () => void;
  onNavigateSection: (sectionId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  savedCreators,
  onOpenSavedDrawer,
  onOpenBriefModal,
  onOpenCreatorModal,
  onNavigateSection,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/60 bg-[#0c0d0e]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigateSection('top')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
              id="brand-logo-btn"
            >
              <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-750 flex items-center justify-center text-neutral-100 font-bold text-base shadow-sm group-hover:border-neutral-600 transition-colors">
                R
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-neutral-300 transition-colors">
                    REQ<span className="text-neutral-400 font-semibold">ruit</span>
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
                    PRO
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 -mt-0.5 hidden sm:inline">
                  Creative Talent & Production Network
                </span>
              </div>
            </button>

            {/* Perspective Switcher */}
            <div className="hidden lg:flex items-center bg-neutral-900/80 border border-neutral-800/80 p-1 rounded-xl">
              <button
                id="mode-client-btn"
                onClick={() => setMode('client')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  mode === 'client'
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm border border-neutral-700/70'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Hiring Talent</span>
              </button>
              <button
                id="mode-creator-btn"
                onClick={() => setMode('creator')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  mode === 'creator'
                    ? 'bg-neutral-800 text-neutral-100 shadow-sm border border-neutral-700/70'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Creator Mode</span>
              </button>
            </div>
          </div>

          {/* Quick Search bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xs relative items-center">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 pointer-events-none" />
            <input
              id="navbar-search-input"
              type="text"
              placeholder="Search UGC, 3D, editors, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-900/80 border border-neutral-800/90 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-700 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-xs text-neutral-500 hover:text-neutral-300"
              >
                ✕
              </button>
            )}
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigateSection('creators')}
              className="hidden sm:inline-flex text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors px-2 py-1.5"
            >
              Explore Talent
            </button>

            <button
              onClick={() => onNavigateSection('calculator')}
              className="hidden md:inline-flex text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors px-2 py-1.5"
            >
              Pricing Estimator
            </button>

            <button
              onClick={() => onNavigateSection('escrow')}
              className="hidden lg:inline-flex text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors px-2 py-1.5"
            >
              Escrow & Guarantees
            </button>

            {/* Shortlist Bookmark Drawer Button */}
            <button
              id="saved-shortlist-btn"
              onClick={onOpenSavedDrawer}
              className="relative p-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all flex items-center gap-1.5"
              title="Saved Talent Shortlist"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedCreators.length > 0 ? 'text-neutral-200 fill-neutral-200' : 'text-neutral-400'}`} />
              <span className="text-xs font-medium hidden sm:inline">Shortlist</span>
              {savedCreators.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-950 text-[10px] font-bold flex items-center justify-center -ml-0.5">
                  {savedCreators.length}
                </span>
              )}
            </button>

            {/* Primary Action Button based on context */}
            {mode === 'client' ? (
              <button
                id="nav-post-brief-btn"
                onClick={() => onOpenBriefModal()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4 text-neutral-950" />
                <span>Post a Brief</span>
              </button>
            ) : (
              <button
                id="nav-apply-creator-btn"
                onClick={onOpenCreatorModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-neutral-950" />
                <span>Join as Creator</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Perspective & Search Secondary Bar */}
        <div className="flex lg:hidden items-center justify-between pb-3 pt-1 border-t border-neutral-900 gap-2">
          <div className="flex items-center bg-neutral-900/80 border border-neutral-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setMode('client')}
              className={`px-2.5 py-1 rounded-md font-medium text-[11px] ${
                mode === 'client' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400'
              }`}
            >
              Hire Talent
            </button>
            <button
              onClick={() => setMode('creator')}
              className={`px-2.5 py-1 rounded-md font-medium text-[11px] ${
                mode === 'creator' ? 'bg-neutral-800 text-neutral-100' : 'text-neutral-400'
              }`}
            >
              Creator Mode
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <button onClick={() => onNavigateSection('creators')} className="text-neutral-400 hover:text-white">
              Talent
            </button>
            <button onClick={() => onNavigateSection('calculator')} className="text-neutral-400 hover:text-white">
              Estimator
            </button>
            <button onClick={() => onNavigateSection('escrow')} className="text-neutral-400 hover:text-white">
              Escrow
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
