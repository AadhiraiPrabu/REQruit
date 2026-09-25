import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Briefcase,
  Layers,
  Clock,
  DollarSign,
  Send,
  HelpCircle,
} from 'lucide-react';
import { Creator, ServicePackage, CreativeCategory } from '../types';
import { CREATIVE_CATEGORIES } from '../data/mockCreators';

interface ProjectBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCreator?: Creator | null;
  preselectedPackage?: ServicePackage | null;
  allCreators: Creator[];
  onBriefSubmitted: (briefData: any) => void;
}

export const ProjectBriefModal: React.FC<ProjectBriefModalProps> = ({
  isOpen,
  onClose,
  preselectedCreator,
  preselectedPackage,
  allCreators,
  onBriefSubmitted,
}) => {
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState(false);
  const [briefId, setBriefId] = useState('');

  // Form State
  const [category, setCategory] = useState<CreativeCategory>(
    preselectedCreator ? preselectedCreator.category : 'ugc_video'
  );
  const [projectTitle, setProjectTitle] = useState(
    preselectedPackage ? `${preselectedPackage.tierName} for our brand` : ''
  );
  const [deliverablesCount, setDeliverablesCount] = useState<number>(
    preselectedPackage ? 3 : 1
  );
  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    '9:16 Vertical (TikTok/Reels)',
  ]);
  const [vibeStyle, setVibeStyle] = useState<string>('High-Energy & Viral');
  const [targetAudience, setTargetAudience] = useState<string>('Gen-Z & Millennials');
  const [keyMessage, setKeyMessage] = useState<string>('');
  const [budget, setBudget] = useState<number>(
    preselectedPackage ? preselectedPackage.price : 900
  );
  const [timelineDays, setTimelineDays] = useState<number>(
    preselectedPackage ? preselectedPackage.deliveryDays : 5
  );
  const [rawFilesNeeded, setRawFilesNeeded] = useState<boolean>(false);
  const [usageRights, setUsageRights] = useState<'organic_only' | 'paid_ads_90d' | 'full_buyout'>(
    'paid_ads_90d'
  );
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyName, setCompany] = useState('');

  if (!isOpen) return null;

  // Formats toggle
  const toggleFormat = (fmt: string) => {
    if (selectedFormats.includes(fmt)) {
      if (selectedFormats.length > 1) {
        setSelectedFormats(selectedFormats.filter((f) => f !== fmt));
      }
    } else {
      setSelectedFormats([...selectedFormats, fmt]);
    }
  };

  // Find matching creators
  const matchingCreators = allCreators.filter(
    (c) =>
      (category === 'all' || c.category === category) &&
      c.startingRate <= budget * 1.3
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setBriefId(generatedId);
    setSubmitted(true);

    // Trigger confetti
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#e5e5e5', '#a3a3a3', '#737373', '#ffffff'],
      });
    } catch {
      // ignore
    }

    onBriefSubmitted({
      id: generatedId,
      projectTitle,
      category,
      deliverablesCount,
      formats: selectedFormats,
      budget,
      timelineDays,
      targetAudience,
      keyMessage,
      vibeStyle,
      rawFilesNeeded,
      usageRights,
      clientName,
      clientEmail,
      companyName,
      createdAt: new Date().toISOString(),
      creatorTarget: preselectedCreator ? preselectedCreator.id : 'open_marketplace',
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl my-auto p-6 sm:p-8 text-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Confirmation View */
          <div className="text-center py-6 space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 text-emerald-400 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-display font-bold text-2xl text-white">
              Project Brief Dispatched
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Your brief has been submitted under tracking reference{' '}
              <span className="font-mono font-semibold text-neutral-200 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                {briefId}
              </span>
              .
            </p>

            {preselectedCreator ? (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 max-w-md mx-auto text-left flex items-center gap-3.5">
                <img
                  src={preselectedCreator.avatarUrl}
                  alt={preselectedCreator.name}
                  className="w-12 h-12 rounded-xl object-cover border border-neutral-700"
                />
                <div>
                  <div className="text-xs text-neutral-400">Directly dispatched to</div>
                  <div className="font-semibold text-sm text-white">{preselectedCreator.name}</div>
                  <div className="text-[11px] text-neutral-400 font-normal">
                    Expected response within {preselectedCreator.turnaroundAvg}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 max-w-md mx-auto text-left">
                <div className="text-xs font-semibold text-neutral-200 mb-1">
                  Matched with {matchingCreators.length} Available Specialists
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Qualified creators matching your budget (${budget}) and discipline have received notifications. You will receive portfolio pitches and proposals directly.
                </p>
              </div>
            )}

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-800/80 max-w-md mx-auto text-xs text-neutral-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>
                Funds remain in your account until you approve milestone terms and deposit to escrow.
              </span>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-xs sm:text-sm transition-all shadow-sm"
            >
              Return to Marketplace
            </button>
          </div>
        ) : (
          /* Multi-step Wizard Form */
          <div>
            {/* Header & Steps */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="font-mono uppercase tracking-wider text-neutral-300 font-semibold">
                  Step {step} of 3
                </span>
                <span className="text-neutral-400">
                  {step === 1 && 'Creative Scope & Goals'}
                  {step === 2 && 'Aesthetic, Rights & Timeline'}
                  {step === 3 && 'Budget & Contact Info'}
                </span>
              </div>
              <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-200 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {preselectedCreator && (
              <div className="mb-5 p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
                <img
                  src={preselectedCreator.avatarUrl}
                  alt={preselectedCreator.name}
                  className="w-8 h-8 rounded-lg object-cover border border-neutral-800"
                />
                <div className="text-xs">
                  <span className="text-neutral-400">Targeting: </span>
                  <strong className="text-white font-medium">{preselectedCreator.name}</strong>
                  {preselectedPackage && (
                    <span className="text-neutral-300 font-medium ml-2">
                      ({preselectedPackage.tierName} - ${preselectedPackage.price})
                    </span>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Project Title or Headline *
                    </label>
                    <input
                      type="text"
                      required
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      placeholder="e.g. 3x TikTok UGC Hooks for Spring Product Launch"
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Creative Discipline
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {CREATIVE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id as CreativeCategory)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                            category === cat.id
                              ? 'bg-neutral-800 border-neutral-600 text-white font-medium'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Deliverables Quantity: <strong className="text-neutral-100 font-semibold">{deliverablesCount}</strong>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={deliverablesCount}
                        onChange={(e) => setDeliverablesCount(Number(e.target.value))}
                        className="w-full accent-neutral-300 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                        <span>1 asset</span>
                        <span>5 assets</span>
                        <span>10+ assets</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Aspect Ratios / Formats
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          '9:16 Vertical (TikTok/Reels)',
                          '16:9 Landscape (YouTube/Web)',
                          '1:1 Square (Feed)',
                          'Vector / Source Files',
                        ].map((fmt) => (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => toggleFormat(fmt)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                              selectedFormats.includes(fmt)
                                ? 'bg-neutral-800 border-neutral-600 text-white'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Brand Aesthetic & Tone
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'High-Energy & Direct',
                        'Minimalist Luxury',
                        'Authentic / Casual UGC',
                        'Clean Tech & Modern',
                        'Cinematic Narrative',
                        'Bold & Editorial',
                      ].map((vibe) => (
                        <button
                          key={vibe}
                          type="button"
                          onClick={() => setVibeStyle(vibe)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                            vibeStyle === vibe
                              ? 'bg-neutral-800 border-neutral-600 text-white font-medium'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          {vibe}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Key Objective / Brief Details
                    </label>
                    <textarea
                      rows={3}
                      value={keyMessage}
                      onChange={(e) => setKeyMessage(e.target.value)}
                      placeholder="e.g. Introduce our new ergonomic chair; highlight lumbar support and fast assembly. Need hooks addressing back pain while working remote."
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Usage & Commercial Rights
                      </label>
                      <select
                        value={usageRights}
                        onChange={(e) => setUsageRights(e.target.value as any)}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500 cursor-pointer"
                      >
                        <option value="organic_only">Organic Social Media Only</option>
                        <option value="paid_ads_90d">90-Day Paid Ads (Whitelisting Included)</option>
                        <option value="full_buyout">Perpetual Commercial Buyout</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <input
                        id="raw-files-checkbox"
                        type="checkbox"
                        checked={rawFilesNeeded}
                        onChange={(e) => setRawFilesNeeded(e.target.checked)}
                        className="w-4 h-4 rounded accent-neutral-300"
                      />
                      <label htmlFor="raw-files-checkbox" className="text-xs text-neutral-300 cursor-pointer">
                        Include Raw Footage & Project Timeline Files (+15%)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Total Project Budget: <strong className="text-white font-semibold">${budget} USD</strong>
                      </label>
                      <input
                        type="range"
                        min="300"
                        max="5000"
                        step="50"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full accent-neutral-300 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                        <span>$300 (Starter)</span>
                        <span>$2,500 (Scale)</span>
                        <span>$5,000+</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Target Turnaround: <strong className="text-white font-semibold">{timelineDays} Days</strong>
                      </label>
                      <input
                        type="range"
                        min="2"
                        max="21"
                        value={timelineDays}
                        onChange={(e) => setTimelineDays(Number(e.target.value))}
                        className="w-full accent-neutral-300 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                        <span>48h (Rush)</span>
                        <span>7 Days (Standard)</span>
                        <span>21 Days</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
                    <h4 className="text-xs font-medium text-neutral-200">Contact Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Work Email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                      />
                      <input
                        type="text"
                        required
                        placeholder="Brand / Company"
                        value={companyName}
                        onChange={(e) => setCompany(e.target.value)}
                        className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                      />
                    </div>
                  </div>

                  {/* Escrow Guarantee Pill */}
                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <Lock className="w-4 h-4 text-neutral-400" />
                      <span>REQruit Smart Escrow Protection</span>
                    </div>
                    <span className="text-neutral-400 font-normal text-[11px]">
                      No charges until creator accepts terms
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-neutral-800">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-300 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-semibold transition-all shadow-sm"
                  >
                    <span>Continue to Step {step + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-semibold shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Broadcast Brief to Talent</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
