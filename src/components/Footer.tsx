import React from 'react';
import { ShieldCheck, Heart, Sparkles, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenBriefModal: () => void;
  onOpenCreatorModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenBriefModal,
  onOpenCreatorModal,
}) => {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-950 font-extrabold text-sm shadow-sm">
                R
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                REQ<span className="text-neutral-400 font-normal">ruit</span>
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              The marketplace connecting vetted creative specialists—UGC creators, 3D animators, video editors, and brand designers—with forward-thinking brands. Protected by automated escrow.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>All systems live • Escrow operational</span>
            </div>
          </div>

          {/* For Brands / Clients */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-200 text-xs uppercase tracking-wider">
              For Brands & Clients
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onNavigateSection('creators')}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Browse Creative Roster
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBriefModal}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Post a Project Brief
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('calculator')}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Scope & Rate Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('escrow')}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Smart Escrow Guarantees
                </button>
              </li>
              <li>
                <span className="text-neutral-500">Master Services Agreement (MSA)</span>
              </li>
            </ul>
          </div>

          {/* For Creators */}
          <div className="space-y-3">
            <h4 className="font-semibold text-neutral-200 text-xs uppercase tracking-wider">
              For Creators & Providers
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={onOpenCreatorModal}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Apply to Join Roster
                </button>
              </li>
              <li>
                <span className="text-neutral-400">0% Commission on Retainers</span>
              </li>
              <li>
                <span className="text-neutral-400">Milestone Payment Security</span>
              </li>
              <li>
                <span className="text-neutral-400">Creator Protection Charter</span>
              </li>
              <li>
                <span className="text-neutral-400">Stripe Express Instant Payouts</span>
              </li>
            </ul>
          </div>

          {/* Disciplines */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
              Creative Disciplines
            </h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>UGC & Direct Response Video</li>
              <li>Cinema 4D & 3D Motion</li>
              <li>YouTube & Long-form Editing</li>
              <li>Brand Identity & Figma Systems</li>
              <li>Ad Scripting & Story Copy</li>
              <li>Sound Design & Sonic Branding</li>
              <li>Commercial Photography</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} REQruit Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Escrow Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
