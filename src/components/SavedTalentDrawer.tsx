import React from 'react';
import {
  X,
  Trash2,
  Briefcase,
  Star,
  Clock,
  ArrowRight,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { Creator } from '../types';

interface SavedTalentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCreators: Creator[];
  onRemoveCreator: (creator: Creator) => void;
  onSelectCreator: (creator: Creator) => void;
  onOpenBriefForShortlist: () => void;
  onClearAll: () => void;
}

export const SavedTalentDrawer: React.FC<SavedTalentDrawerProps> = ({
  isOpen,
  onClose,
  savedCreators,
  onRemoveCreator,
  onSelectCreator,
  onOpenBriefForShortlist,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-neutral-200 fill-neutral-200" />
              <h3 className="font-display font-semibold text-base text-white">
                Saved Talent Shortlist ({savedCreators.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {savedCreators.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-neutral-400 hover:text-rose-400 px-2 py-1 transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List of Saved Creators */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {savedCreators.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Bookmark className="w-9 h-9 text-neutral-700 mx-auto mb-3" />
                <h4 className="font-semibold text-sm text-white mb-1">Your shortlist is empty</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Click the bookmark icon on any creator card to save and compare their rates or send a collective brief.
                </p>
              </div>
            ) : (
              savedCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => {
                        onClose();
                        onSelectCreator(creator);
                      }}
                    >
                      <img
                        src={creator.avatarUrl}
                        alt={creator.name}
                        className="w-12 h-12 rounded-xl object-cover border border-neutral-700"
                      />
                      <div>
                        <h4 className="font-medium text-sm text-white hover:text-neutral-300 transition-colors">
                          {creator.name}
                        </h4>
                        <p className="text-xs text-neutral-400">{creator.categoryLabel}</p>
                        <div className="flex items-center gap-1 text-[11px] text-neutral-300 mt-0.5">
                          <Star className="w-3 h-3 fill-neutral-300" />
                          <span>{creator.rating}</span>
                          <span className="text-neutral-500">({creator.reviewsCount})</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveCreator(creator)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                      title="Remove from shortlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-neutral-500">Starting from</span>
                      <div className="font-semibold text-white">
                        ${creator.startingRate}{' '}
                        <span className="text-[10px] font-normal text-neutral-400">
                          {creator.rateUnit}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-neutral-400 text-[11px]">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>{creator.turnaroundAvg}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Actions */}
          {savedCreators.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-neutral-800 bg-neutral-950 space-y-2.5">
              <button
                onClick={() => {
                  onClose();
                  onOpenBriefForShortlist();
                }}
                className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <Briefcase className="w-4 h-4" />
                <span>Send Brief to Shortlist ({savedCreators.length})</span>
              </button>

              <p className="text-[11px] text-neutral-500 text-center">
                Dispatches your project requirements to all shortlisted creatives simultaneously.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
