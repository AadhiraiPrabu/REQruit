import React from 'react';
import {
  Search,
  Filter,
  Sparkles,
  SlidersHorizontal,
  Smartphone,
  Film,
  Box,
  Palette,
  PenTool,
  Headphones,
  Camera,
  X,
  Check,
} from 'lucide-react';
import { Creator, CreativeCategory } from '../types';
import { CREATIVE_CATEGORIES } from '../data/mockCreators';
import { TalentCard } from './TalentCard';

interface TalentGridProps {
  creators: Creator[];
  selectedCategory: CreativeCategory;
  setSelectedCategory: (cat: CreativeCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onlyAvailableNow: boolean;
  setOnlyAvailableNow: (val: boolean) => void;
  sortBy: 'recommended' | 'price_asc' | 'price_desc' | 'rating' | 'projects';
  setSortBy: (sort: 'recommended' | 'price_asc' | 'price_desc' | 'rating' | 'projects') => void;
  maxBudget: number;
  setMaxBudget: (budget: number) => void;
  savedCreators: Creator[];
  onToggleSave: (creator: Creator) => void;
  onSelectCreator: (creator: Creator) => void;
  onQuickBrief: (creator: Creator) => void;
  onResetFilters: () => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Smartphone':
      return <Smartphone className="w-3.5 h-3.5" />;
    case 'Film':
      return <Film className="w-3.5 h-3.5" />;
    case 'Box':
      return <Box className="w-3.5 h-3.5" />;
    case 'Palette':
      return <Palette className="w-3.5 h-3.5" />;
    case 'PenTool':
      return <PenTool className="w-3.5 h-3.5" />;
    case 'Headphones':
      return <Headphones className="w-3.5 h-3.5" />;
    case 'Camera':
      return <Camera className="w-3.5 h-3.5" />;
    default:
      return <Sparkles className="w-3.5 h-3.5" />;
  }
};

export const TalentGrid: React.FC<TalentGridProps> = ({
  creators,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onlyAvailableNow,
  setOnlyAvailableNow,
  sortBy,
  setSortBy,
  maxBudget,
  setMaxBudget,
  savedCreators,
  onToggleSave,
  onSelectCreator,
  onQuickBrief,
  onResetFilters,
}) => {
  const isSaved = (creatorId: string) => savedCreators.some((c) => c.id === creatorId);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    onlyAvailableNow ||
    maxBudget < 4000;

  return (
    <section id="creators" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 font-medium mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            <span>Vetted Creative Marketplace</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Discover Creative Specialists
          </h2>
          <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
            Filter by discipline, rates, tools, or instant availability. Every creator is vetted for high-standard execution and milestone compliance.
          </p>
        </div>

        {/* Total found badge */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs text-neutral-400">
            Showing <strong className="text-neutral-200 font-semibold">{creators.length}</strong> vetted specialists
          </span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {CREATIVE_CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`cat-pill-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id as CreativeCategory)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                active
                  ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-sm'
                  : 'bg-neutral-900/70 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800'
              }`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  active ? 'bg-neutral-950/20 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Control Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Search input in grid */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="talent-grid-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creator name, skill (e.g. TikTok, 3D, DaVinci)..."
            className="w-full pl-9 pr-3 py-2 bg-neutral-950/80 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 focus:ring-1 focus:ring-neutral-700"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter toggles & dropdowns */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Availability Toggle */}
          <button
            id="toggle-available-now"
            onClick={() => setOnlyAvailableNow(!onlyAvailableNow)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              onlyAvailableNow
                ? 'bg-neutral-800 border-neutral-700 text-neutral-100'
                : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                onlyAvailableNow ? 'bg-emerald-400' : 'bg-neutral-600'
              }`}
            />
            <span>Available This Week</span>
          </button>

          {/* Budget Range slider trigger */}
          <div className="flex items-center gap-2 px-3 py-2 bg-neutral-950/80 border border-neutral-800 rounded-xl text-xs text-neutral-300">
            <span className="text-neutral-400">Budget:</span>
            <span className="font-semibold text-neutral-200">${maxBudget}</span>
            <input
              type="range"
              min="300"
              max="4000"
              step="100"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-20 accent-neutral-300 cursor-pointer ml-1"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-neutral-950/80 border border-neutral-800 rounded-xl px-3 py-2 text-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              id="talent-sort-select"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'recommended' | 'price_asc' | 'price_desc' | 'rating' | 'projects')
              }
              aria-label="Sort creative talent"
              className="bg-transparent text-neutral-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="recommended" className="bg-neutral-900 text-neutral-200">
                Sort: Recommended
              </option>
              <option value="rating" className="bg-neutral-900 text-neutral-200">
                Sort: Highest Rating
              </option>
              <option value="price_asc" className="bg-neutral-900 text-neutral-200">
                Sort: Lowest Rate
              </option>
              <option value="price_desc" className="bg-neutral-900 text-neutral-200">
                Sort: Highest Rate
              </option>
              <option value="projects" className="bg-neutral-900 text-neutral-200">
                Sort: Most Campaigns
              </option>
            </select>
          </div>

          {/* Reset button if active filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Results */}
      {creators.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl bg-neutral-900/40 border border-neutral-800">
          <Sparkles className="w-7 h-7 text-neutral-500 mx-auto mb-3" />
          <h3 className="font-semibold text-base text-white mb-1">No creative providers found</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
            Try loosening your budget filters, clearing search keywords, or exploring another creative category.
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-950 font-semibold text-xs hover:bg-white transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((creator) => (
            <TalentCard
              key={creator.id}
              creator={creator}
              isSaved={isSaved(creator.id)}
              onToggleSave={onToggleSave}
              onSelectCreator={onSelectCreator}
              onQuickBrief={onQuickBrief}
            />
          ))}
        </div>
      )}
    </section>
  );
};
