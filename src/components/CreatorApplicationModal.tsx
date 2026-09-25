import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Shield,
  Zap,
  Briefcase,
  Lock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { CreativeCategory } from '../types';
import { CREATIVE_CATEGORIES } from '../data/mockCreators';

interface CreatorApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorApplicationModal: React.FC<CreatorApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState<CreativeCategory>('ugc_video');
  const [dayRate, setDayRate] = useState<number>(650);
  const [projectsPerMonth, setProjectsPerMonth] = useState<number>(4);
  const [yearsExperience, setYearsExperience] = useState('3-5 years');
  const [tools, setTools] = useState('Premiere Pro, CapCut, DaVinci, After Effects');

  if (!isOpen) return null;

  // Earnings calculation
  const monthlyEarnings = dayRate * projectsPerMonth;
  const annualEarnings = monthlyEarnings * 12;
  const traditionalAgencyLoss = Math.round(annualEarnings * 0.35); // 35% typical agency cut

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CREATOR-APP-${Math.floor(10000 + Math.random() * 90000)}`;
    setAppId(id);
    setSubmitted(true);

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
  };

  const handleReset = () => {
    setSubmitted(false);
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
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-neutral-800 border border-neutral-700 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="font-display font-bold text-2xl text-white">
              Application Received
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Welcome to the REQruit verification queue. Your application reference is{' '}
              <span className="font-mono font-semibold text-neutral-200 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                {appId}
              </span>
              .
            </p>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-left max-w-md mx-auto space-y-2.5 text-xs">
              <div className="font-semibold text-white">What happens next?</div>
              <div className="flex items-start gap-2.5 text-neutral-300">
                <span className="w-4 h-4 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </span>
                <span>Our creative curation team reviews your portfolio for technical execution & pacing (under 48 hrs).</span>
              </div>
              <div className="flex items-start gap-2.5 text-neutral-300">
                <span className="w-4 h-4 rounded-full bg-neutral-800 text-neutral-200 border border-neutral-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </span>
                <span>You will receive an invite to configure your Stripe direct deposit & publish your service packages.</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-xs sm:text-sm transition-all shadow-sm"
            >
              Close & Return
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 font-medium mb-2">
                <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                <span>Creative Service Providers</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Join the REQruit Creative Roster
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Zero commission on repeat clients. Automated escrow guarantees. High-ticket brand retainers.
              </p>
            </div>

            {/* Interactive Earnings Projection Banner */}
            <div className="mb-6 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-medium text-white flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Estimated REQruit Earnings
                </span>
                <span className="text-emerald-400/90 font-medium text-[11px]">
                  +${traditionalAgencyLoss.toLocaleString()} saved vs Agency cuts
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span>Average Project Rate:</span>
                    <strong className="text-white font-semibold">${dayRate}</strong>
                  </div>
                  <input
                    type="range"
                    min="250"
                    max="3000"
                    step="50"
                    value={dayRate}
                    onChange={(e) => setDayRate(Number(e.target.value))}
                    className="w-full accent-neutral-300 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-neutral-400 mb-1">
                    <span>Projects / Month:</span>
                    <strong className="text-white font-semibold">{projectsPerMonth} gigs</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={projectsPerMonth}
                    onChange={(e) => setProjectsPerMonth(Number(e.target.value))}
                    className="w-full accent-neutral-300 cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Projected Take-Home:</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-sm text-white">
                    ${monthlyEarnings.toLocaleString()} <span className="text-[10px] font-normal text-neutral-400">/mo</span>
                  </span>
                  <span className="text-neutral-500">•</span>
                  <span className="font-bold text-neutral-100 text-sm">
                    ${annualEarnings.toLocaleString()} <span className="text-[10px] font-normal text-neutral-400">/year</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Full Name or Studio Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Liam Vance"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@creativestudio.com"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Portfolio / Reel Link *
                  </label>
                  <input
                    type="url"
                    required
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder="https://behance.net/yourname"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Primary Creative Discipline
                  </label>
                  <select
                    value={primaryCategory}
                    onChange={(e) => setPrimaryCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500 cursor-pointer"
                  >
                    {CREATIVE_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Years of Commercial Experience
                  </label>
                  <select
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-500 cursor-pointer"
                  >
                    <option value="1-2 years">1-2 Years (Emerging Talent)</option>
                    <option value="3-5 years">3-5 Years (Mid-Level Specialist)</option>
                    <option value="5-8 years">5-8 Years (Senior Director/Lead)</option>
                    <option value="8+ years">8+ Years (Creative Studio Head)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Primary Tools & Software
                  </label>
                  <input
                    type="text"
                    value={tools}
                    onChange={(e) => setTools(e.target.value)}
                    placeholder="e.g. Cinema 4D, Redshift, Figma, Premiere"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              {/* Creator Charter Guarantee */}
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-400">
                <Shield className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-neutral-200">REQruit Creator Charter:</strong> We guarantee payment before work starts via milestone escrow. If a client goes unresponsive, funds are released to you automatically after the 72-hour review window.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Submit Application to REQruit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
