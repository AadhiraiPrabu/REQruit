import React, { useState } from 'react';
import {
  Calculator,
  Zap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Layers,
  FileCheck,
  TrendingDown,
} from 'lucide-react';
import { CreativeCategory } from '../types';
import { CREATIVE_CATEGORIES } from '../data/mockCreators';

interface CostEstimatorProps {
  onStartBriefWithEstimate: (estimate: {
    category: CreativeCategory;
    quantity: number;
    usageRights: 'organic_only' | 'paid_ads_90d' | 'full_buyout';
    budget: number;
    rawFiles: boolean;
  }) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  onStartBriefWithEstimate,
}) => {
  const [category, setCategory] = useState<CreativeCategory>('ugc_video');
  const [quantity, setQuantity] = useState<number>(3);
  const [rushDelivery, setRushDelivery] = useState<boolean>(false);
  const [usageRights, setUsageRights] = useState<'organic_only' | 'paid_ads_90d' | 'full_buyout'>(
    'paid_ads_90d'
  );
  const [rawFiles, setRawFiles] = useState<boolean>(false);

  // Dynamic Base Rate calculation per category
  const getBaseRate = (cat: CreativeCategory) => {
    switch (cat) {
      case 'ugc_video':
        return 420;
      case 'video_editing':
        return 550;
      case 'motion_3d':
        return 950;
      case 'brand_design':
        return 1200;
      case 'creative_copy':
        return 300;
      case 'audio_podcast':
        return 350;
      case 'product_photo':
        return 750;
      default:
        return 450;
    }
  };

  const baseRate = getBaseRate(category);
  const rawSubtotal = baseRate * quantity;

  // Volume discount (bulk incentive)
  const volumeDiscountPercent = quantity >= 5 ? 0.15 : quantity >= 3 ? 0.08 : 0;
  const volumeDiscount = Math.round(rawSubtotal * volumeDiscountPercent);

  // Commercial rights multiplier
  let rightsMultiplier = 1.0;
  if (usageRights === 'paid_ads_90d') rightsMultiplier = 1.25;
  if (usageRights === 'full_buyout') rightsMultiplier = 1.6;

  // Add-ons
  const rushFee = rushDelivery ? Math.round(rawSubtotal * 0.25) : 0;
  const rawStemsFee = rawFiles ? Math.round(rawSubtotal * 0.15) : 0;

  const estimatedTotal = Math.round((rawSubtotal - volumeDiscount) * rightsMultiplier + rushFee + rawStemsFee);
  const traditionalAgencyCost = Math.round(estimatedTotal * 2.8);
  const estimatedSavings = traditionalAgencyCost - estimatedTotal;

  return (
    <section id="calculator" className="py-14 sm:py-20 border-t border-neutral-900 bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 font-medium mb-3">
            <Calculator className="w-3.5 h-3.5 text-neutral-400" />
            <span>Scope & Pricing Transparency</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Creative Budget Estimator
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Calculate fair-market rates for any creative scope. Benchmark against traditional agency margins and hire directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800/90 rounded-3xl p-6 sm:p-8 space-y-6">
            {/* Discipline Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                1. Select Creative Discipline
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CREATIVE_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id as CreativeCategory)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all ${
                      category === c.id
                        ? 'bg-neutral-800 border-neutral-600 text-white font-medium shadow-sm'
                        : 'bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  2. Quantity of Assets / Deliverables
                </label>
                <span className="font-mono text-sm font-semibold text-neutral-200">
                  {quantity} {quantity === 1 ? 'asset' : 'assets'}
                  {volumeDiscountPercent > 0 && (
                    <span className="text-[11px] text-emerald-400 ml-2">
                      ({volumeDiscountPercent * 100}% bulk tier)
                    </span>
                  )}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-neutral-300 cursor-pointer"
              />
            </div>

            {/* Commercial Usage Rights */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                3. Commercial Rights & Licensing
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUsageRights('organic_only')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    usageRights === 'organic_only'
                      ? 'bg-neutral-800 border-neutral-600 text-white font-medium shadow-sm'
                      : 'bg-neutral-950/80 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="font-medium text-neutral-200">Organic Only</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Social feeds, no paid boost</div>
                </button>

                <button
                  type="button"
                  onClick={() => setUsageRights('paid_ads_90d')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    usageRights === 'paid_ads_90d'
                      ? 'bg-neutral-800 border-neutral-600 text-white font-medium shadow-sm'
                      : 'bg-neutral-950/80 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="font-medium text-neutral-200">90-Day Paid Ads</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Meta, TikTok, Shorts (+25%)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setUsageRights('full_buyout')}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    usageRights === 'full_buyout'
                      ? 'bg-neutral-800 border-neutral-600 text-white font-medium shadow-sm'
                      : 'bg-neutral-950/80 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <div className="font-medium text-neutral-200">Full Buyout</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Perpetual commercial rights</div>
                </button>
              </div>
            </div>

            {/* Toggle Add-ons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors">
                <input
                  type="checkbox"
                  checked={rushDelivery}
                  onChange={(e) => setRushDelivery(e.target.checked)}
                  className="w-4 h-4 accent-neutral-300 rounded"
                />
                <div>
                  <div className="text-xs font-medium text-neutral-200 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-neutral-400" />
                    <span>48-Hour Rush Delivery</span>
                  </div>
                  <div className="text-[10px] text-neutral-400">+25% expedited fee</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 cursor-pointer hover:border-neutral-700 transition-colors">
                <input
                  type="checkbox"
                  checked={rawFiles}
                  onChange={(e) => setRawFiles(e.target.checked)}
                  className="w-4 h-4 accent-neutral-300 rounded"
                />
                <div>
                  <div className="text-xs font-medium text-neutral-200 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-neutral-400" />
                    <span>Raw Source & Timeline Files</span>
                  </div>
                  <div className="text-[10px] text-neutral-400">+15% stems & footage fee</div>
                </div>
              </label>
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="lg:col-span-5 bg-neutral-900/70 border border-neutral-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                Fair-Market Estimate
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-[11px] font-medium border border-neutral-700">
                100% Escrow Protected
              </span>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                ${estimatedTotal.toLocaleString()}{' '}
                <span className="text-sm font-normal text-neutral-400">USD</span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Estimated average across verified REQruit specialists
              </p>
            </div>

            {/* Breakdown item list */}
            <div className="space-y-2.5 text-xs text-neutral-300 pt-2 border-t border-neutral-800">
              <div className="flex justify-between">
                <span className="text-neutral-400">
                  Base production ({quantity}x assets)
                </span>
                <span className="font-medium text-neutral-200">${rawSubtotal.toLocaleString()}</span>
              </div>

              {volumeDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Volume tier discount</span>
                  <span>-${volumeDiscount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-neutral-400">Licensing: {usageRights.replace('_', ' ')}</span>
                <span className="text-neutral-200 font-medium">
                  {usageRights === 'organic_only' ? 'Included' : usageRights === 'paid_ads_90d' ? '+25%' : '+60%'}
                </span>
              </div>

              {rushDelivery && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Expedited 48h turnaround</span>
                  <span className="text-neutral-200 font-medium">+${rushFee}</span>
                </div>
              )}

              {rawFiles && (
                <div className="flex justify-between">
                  <span className="text-neutral-400">Source files & stems</span>
                  <span className="text-neutral-200 font-medium">+${rawStemsFee}</span>
                </div>
              )}
            </div>

            {/* Traditional agency margin comparison */}
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Agency Standard Quote:</span>
                <span className="line-through text-neutral-500 font-medium">
                  ${traditionalAgencyCost.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-medium text-emerald-400">
                <span className="flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  Your Direct Savings:
                </span>
                <span>${estimatedSavings.toLocaleString()} (~64% saved)</span>
              </div>
            </div>

            {/* Launch Brief with Estimate CTA */}
            <button
              onClick={() =>
                onStartBriefWithEstimate({
                  category,
                  quantity,
                  usageRights,
                  budget: estimatedTotal,
                  rawFiles,
                })
              }
              className="w-full py-3.5 rounded-xl bg-neutral-100 hover:bg-white text-neutral-950 font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
            >
              <span>Convert Estimate into Project Brief</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
