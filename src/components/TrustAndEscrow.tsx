import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  RefreshCw,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

export const TrustAndEscrow: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does REQruit Escrow protect both the client and creator?',
      a: 'When a project brief is accepted, the client deposits the milestone payment into REQruit’s smart escrow account. The creator starts work knowing the funds are 100% verified and locked. Funds are only released to the creator once the client inspects and approves the final deliverables. If a creator fails to meet the agreed scope or timeline, the client receives a full refund.',
    },
    {
      q: 'Who owns the copyright and commercial intellectual property?',
      a: 'Every project on REQruit is covered by our Standard Master Creative Services Agreement. Upon final milestone release, 100% of the agreed commercial rights (organic, paid ads, or full perpetual buyout) are legally assigned directly to the client. Creators retain the right to showcase the work in their personal portfolio unless a strict mutual NDA was requested.',
    },
    {
      q: 'What is the revision policy if we need adjustments?',
      a: 'All service packages on REQruit include 2 to 4 rounds of structured revisions. Revision requests can include timestamped video markers, color correction notes, or headline edits matching the original brief scope.',
    },
    {
      q: 'Can clients hire creators on a continuous monthly retainer?',
      a: 'Yes! In fact, over 65% of REQruit bookings convert into ongoing retainers. Even better: REQruit charges 0% platform commission on repeat contracts with the same creator, making long-term creative collaborations far more affordable than legacy agencies.',
    },
  ];

  return (
    <section id="escrow" className="py-16 sm:py-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
            <span>Guaranteed Security & Rights</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Built for Total Confidence
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            No ghosting, no withheld deliverables, and zero payment disputes. REQruit replaces informal DM agreements with automated milestones and verified contracts.
          </p>
        </div>

        {/* 4-Step Escrow Lifecycle Visual */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 flex items-center justify-center font-medium text-xs mb-4">
                01
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Scope & Escrow Deposit</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Client and creator agree on deliverables and timeline. Payment is locked securely in escrow before creator starts production.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 font-medium">
              ✓ Funds verified in escrow
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 flex items-center justify-center font-medium text-xs mb-4">
                02
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Production & Review</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Creator produces the creative assets and delivers draft versions for review with integrated timestamp notes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 font-medium">
              ✓ 2-4 revision rounds included
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 flex items-center justify-center font-medium text-xs mb-4">
                03
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Milestone Approval</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Client reviews final cuts, renders, or copy. Once satisfied, client signs off with a single click.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 font-medium">
              ✓ 100% satisfaction guarantee
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 text-neutral-200 flex items-center justify-center font-medium text-xs mb-4">
                04
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Instant Payout & Rights</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Escrow instantly releases payment to the creator. Commercial usage certificates and master files are delivered to the client.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-emerald-400 font-medium">
              ✓ Full IP assignment certified
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="rounded-3xl bg-neutral-900/60 border border-neutral-800/90 p-6 sm:p-8 mb-16 overflow-x-auto">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-2">
            Marketplace Comparison
          </h3>
          <p className="text-xs text-neutral-400 mb-6">
            Compare our direct talent marketplace model against traditional alternatives.
          </p>

          <table className="w-full text-left text-xs min-w-[580px]">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 font-medium">
                <th className="pb-3 font-medium">Core Dimension</th>
                <th className="pb-3 text-neutral-500 font-medium">Traditional Agencies</th>
                <th className="pb-3 text-neutral-500 font-medium">Generic Freelance Apps</th>
                <th className="pb-3 text-neutral-100 font-semibold">REQruit Network</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              <tr>
                <td className="py-3.5 font-medium text-white">Direct Access to Creators</td>
                <td className="py-3.5 text-neutral-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-rose-500" /> Account manager layer
                </td>
                <td className="py-3.5 text-neutral-400">Yes, unvetted quality</td>
                <td className="py-3.5 text-neutral-200 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300" /> Direct 1-on-1 with vetted pros
                </td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-white">Payment & Escrow Protection</td>
                <td className="py-3.5 text-neutral-400">Net 30/60 invoices</td>
                <td className="py-3.5 text-neutral-400">High fees & dispute friction</td>
                <td className="py-3.5 text-neutral-200 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300" /> 100% Automated Smart Escrow
                </td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-white">Platform Commission on Repeat Work</td>
                <td className="py-3.5 text-neutral-400">Up to 40% hidden margins</td>
                <td className="py-3.5 text-neutral-400">10% - 20% ongoing fee</td>
                <td className="py-3.5 text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 0% on repeat retainers
                </td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-white">Average Turnaround Speed</td>
                <td className="py-3.5 text-neutral-400">4 to 8 weeks</td>
                <td className="py-3.5 text-neutral-400">Unpredictable</td>
                <td className="py-3.5 text-neutral-200 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300" /> 48 hours to 5 days
                </td>
              </tr>
              <tr>
                <td className="py-3.5 font-medium text-white">Commercial Rights Transfer</td>
                <td className="py-3.5 text-neutral-400">Complex legal riders</td>
                <td className="py-3.5 text-neutral-400">Vague or incomplete</td>
                <td className="py-3.5 text-neutral-200 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-neutral-300" /> Certified IP Assignment
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white text-center mb-6">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-neutral-900/60 border border-neutral-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-medium text-white hover:text-neutral-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-neutral-400 transition-transform ${
                        isOpen ? 'rotate-180 text-neutral-200' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
