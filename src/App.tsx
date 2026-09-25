import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_CREATORS } from './data/mockCreators';
import { Creator, CreativeCategory, ServicePackage } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TalentGrid } from './components/TalentGrid';
import { CreatorDetailModal } from './components/CreatorDetailModal';
import { ProjectBriefModal } from './components/ProjectBriefModal';
import { CreatorApplicationModal } from './components/CreatorApplicationModal';
import { CostEstimator } from './components/CostEstimator';
import { TrustAndEscrow } from './components/TrustAndEscrow';
import { SavedTalentDrawer } from './components/SavedTalentDrawer';
import { Footer } from './components/Footer';

export default function App() {
  // Perspective Mode: 'client' (hiring) vs 'creator' (offering services)
  const [mode, setMode] = useState<'client' | 'creator'>('client');

  // Search & Filter State
  const [selectedCategory, setSelectedCategory] = useState<CreativeCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyAvailableNow, setOnlyAvailableNow] = useState<boolean>(false);
  const [maxBudget, setMaxBudget] = useState<number>(4000);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_asc' | 'price_desc' | 'rating' | 'projects'>('recommended');

  // Saved Bookmarks Shortlist (persisted in localStorage)
  const [savedCreators, setSavedCreators] = useState<Creator[]>(() => {
    try {
      const saved = localStorage.getItem('reqruit_shortlist');
      if (saved) {
        const ids: string[] = JSON.parse(saved);
        return MOCK_CREATORS.filter((c) => ids.includes(c.id));
      }
    } catch {
      // fallback
    }
    // Default initial bookmark for demonstration delight
    return [MOCK_CREATORS[0]];
  });

  // Modal States
  const [selectedCreatorForDetail, setSelectedCreatorForDetail] = useState<Creator | null>(null);
  const [isBriefModalOpen, setIsBriefModalOpen] = useState<boolean>(false);
  const [preselectedCreatorForBrief, setPreselectedCreatorForBrief] = useState<Creator | null>(null);
  const [preselectedPackageForBrief, setPreselectedPackageForBrief] = useState<ServicePackage | null>(null);
  const [isCreatorAppModalOpen, setIsCreatorAppModalOpen] = useState<boolean>(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('reqruit_shortlist', JSON.stringify(savedCreators.map((c) => c.id)));
    } catch {
      // ignore
    }
  }, [savedCreators]);

  // Toggle bookmark / shortlist
  const handleToggleSave = (creator: Creator) => {
    if (savedCreators.some((c) => c.id === creator.id)) {
      setSavedCreators(savedCreators.filter((c) => c.id !== creator.id));
      showToast(`Removed ${creator.name} from shortlist`);
    } else {
      setSavedCreators([...savedCreators, creator]);
      showToast(`Added ${creator.name} to shortlist!`);
    }
  };

  // Filtered and Sorted Creators
  const filteredCreators = useMemo(() => {
    return MOCK_CREATORS.filter((creator) => {
      // Category filter
      if (selectedCategory !== 'all' && creator.category !== selectedCategory) {
        return false;
      }

      // Available filter
      if (onlyAvailableNow && !creator.isAvailableNow) {
        return false;
      }

      // Budget filter
      if (creator.startingRate > maxBudget) {
        return false;
      }

      // Search Query filter (matches name, handle, title, bio, tools, skills)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = creator.name.toLowerCase().includes(query);
        const matchesHandle = creator.handle.toLowerCase().includes(query);
        const matchesTitle = creator.title.toLowerCase().includes(query);
        const matchesBio = creator.bio.toLowerCase().includes(query);
        const matchesTools = creator.tools.some((t) => t.toLowerCase().includes(query));
        const matchesSkills = creator.skills.some((s) => s.toLowerCase().includes(query));

        if (!matchesName && !matchesHandle && !matchesTitle && !matchesBio && !matchesTools && !matchesSkills) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.startingRate - b.startingRate;
      if (sortBy === 'price_desc') return b.startingRate - a.startingRate;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'projects') return b.completedProjects - a.completedProjects;
      // Default: recommended (featured first, then rating)
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }, [selectedCategory, searchQuery, onlyAvailableNow, maxBudget, sortBy]);

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setOnlyAvailableNow(false);
    setMaxBudget(4000);
    setSortBy('recommended');
  };

  // Modal Handlers
  const handleOpenBrief = (creator?: Creator, pkg?: ServicePackage) => {
    setPreselectedCreatorForBrief(creator || null);
    setPreselectedPackageForBrief(pkg || null);
    setIsBriefModalOpen(true);
  };

  const handleOpenCreatorDetail = (creator: Creator) => {
    setSelectedCreatorForDetail(creator);
  };

  const handleSelectPackageForBrief = (creator: Creator, pkg?: ServicePackage) => {
    setSelectedCreatorForDetail(null);
    handleOpenBrief(creator, pkg);
  };

  const handleStartBriefWithEstimate = (estimate: {
    category: CreativeCategory;
    quantity: number;
    usageRights: 'organic_only' | 'paid_ads_90d' | 'full_buyout';
    budget: number;
    rawFiles: boolean;
  }) => {
    setSelectedCategory(estimate.category);
    setPreselectedCreatorForBrief(null);
    setPreselectedPackageForBrief(null);
    setIsBriefModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-neutral-200 flex flex-col selection:bg-neutral-800 selection:text-neutral-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-neutral-900/95 border border-neutral-700 text-neutral-200 text-xs font-medium shadow-xl shadow-black/60 flex items-center gap-2.5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        mode={mode}
        setMode={setMode}
        savedCreators={savedCreators}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenBriefModal={() => handleOpenBrief()}
        onOpenCreatorModal={() => setIsCreatorAppModalOpen(true)}
        onNavigateSection={scrollToSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        mode={mode}
        setMode={setMode}
        onOpenBriefModal={() => handleOpenBrief()}
        onOpenCreatorModal={() => setIsCreatorAppModalOpen(true)}
        onExploreClick={() => scrollToSection('creators')}
        featuredCreators={MOCK_CREATORS.filter((c) => c.featured)}
        onSelectCreator={handleOpenCreatorDetail}
      />

      {/* Main Talent Directory & Filter Grid */}
      <TalentGrid
        creators={filteredCreators}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onlyAvailableNow={onlyAvailableNow}
        setOnlyAvailableNow={setOnlyAvailableNow}
        sortBy={sortBy}
        setSortBy={setSortBy}
        maxBudget={maxBudget}
        setMaxBudget={setMaxBudget}
        savedCreators={savedCreators}
        onToggleSave={handleToggleSave}
        onSelectCreator={handleOpenCreatorDetail}
        onQuickBrief={(creator) => handleOpenBrief(creator)}
        onResetFilters={handleResetFilters}
      />

      {/* Scope & Cost Estimator Tool */}
      <CostEstimator onStartBriefWithEstimate={handleStartBriefWithEstimate} />

      {/* How It Works & Smart Escrow Protection */}
      <TrustAndEscrow />

      {/* Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenBriefModal={() => handleOpenBrief()}
        onOpenCreatorModal={() => setIsCreatorAppModalOpen(true)}
      />

      {/* MODALS */}
      {/* Creator Profile & Portfolio Modal */}
      <CreatorDetailModal
        creator={selectedCreatorForDetail}
        onClose={() => setSelectedCreatorForDetail(null)}
        isSaved={selectedCreatorForDetail ? savedCreators.some((c) => c.id === selectedCreatorForDetail.id) : false}
        onToggleSave={handleToggleSave}
        onSelectPackageForBrief={handleSelectPackageForBrief}
      />

      {/* Project Brief Wizard Modal */}
      <ProjectBriefModal
        isOpen={isBriefModalOpen}
        onClose={() => setIsBriefModalOpen(false)}
        preselectedCreator={preselectedCreatorForBrief}
        preselectedPackage={preselectedPackageForBrief}
        allCreators={MOCK_CREATORS}
        onBriefSubmitted={(brief) => {
          showToast(`Project Brief broadcasted! Ref: ${brief.id}`);
        }}
      />

      {/* Creator Application / Join Roster Modal */}
      <CreatorApplicationModal
        isOpen={isCreatorAppModalOpen}
        onClose={() => setIsCreatorAppModalOpen(false)}
      />

      {/* Saved Shortlist Drawer */}
      <SavedTalentDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedCreators={savedCreators}
        onRemoveCreator={handleToggleSave}
        onSelectCreator={handleOpenCreatorDetail}
        onOpenBriefForShortlist={() => handleOpenBrief()}
        onClearAll={() => {
          setSavedCreators([]);
          showToast('Shortlist cleared');
        }}
      />
    </div>
  );
}
