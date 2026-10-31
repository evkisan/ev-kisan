import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  ShieldCheck,
  Volume2,
  Phone,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';

export const SeedsFertilizersPage: React.FC = () => {
  const { products, lang, setActiveEnquiryModal, playTTS } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'seeds' | 'fertilizers'>('all');
  const [search, setSearch] = useState('');

  const seedFertilizerProducts = products.filter((p) => {
    const isTargetCategory = p.category === 'seeds' || p.category === 'fertilizers';
    const matchesFilter = filterType === 'all' || p.category === filterType;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.titleHi.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    return isTargetCategory && matchesFilter && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-900 via-emerald-950 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'राष्ट्रीय बीज निगम व इफको प्रमाणित' : 'NSC & IFFCO Certified'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi' ? 'प्रमाणित बीज व नैनो उर्वरक केंद्र' : 'Certified Seeds & Nano Fertilizers Hub'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? 'अधिक उपज देने वाली प्रमाणित गेहूं, धान व सरसों की किस्में। इफको नैनो यूरिया प्लस और नैनो डीएपी के उपयोग की सही विधि व अधिकृत वितरक।'
              : 'Certified high-germination foundation seeds and eco-friendly nano fertilizers directly through verified agro cooperatives.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'hi' ? 'बीज या खाद का नाम खोजें...' : 'Search seed or fertilizer...'}
            className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-stone-900 focus:border-emerald-600 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs font-bold">
          {[
            { id: 'all', label: lang === 'hi' ? 'सभी उत्पाद' : 'All' },
            { id: 'seeds', label: lang === 'hi' ? '🌾 प्रमाणित बीज (Certified Seeds)' : 'Certified Seeds' },
            { id: 'fertilizers', label: lang === 'hi' ? '🧪 नैनो यूरिया व खाद' : 'Fertilizers' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id as any)}
              className={`rounded-xl px-3.5 py-2 transition-colors ${
                filterType === item.id
                  ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Guide Banner: Nano Urea vs Conventional Bag */}
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              💡 {lang === 'hi' ? 'किसान बचत सुझाव' : 'Farmer Savings Tip'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
              {lang === 'hi'
                ? 'एक 500ml नैनो यूरिया की बोतल = एक 45kg बोरी यूरिया'
                : '1 Bottle (500ml) Nano Urea = 1 Full 45kg Urea Bag'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-2xl">
              {lang === 'hi'
                ? 'नैनो यूरिया की उपयोग क्षमता 80% से अधिक है। यह मिट्टी को बंजर होने से बचाता है और फसल पर समान पत्तियों के माध्यम से सीधे अवशोषित होता है।'
                : 'Nano Urea nanoparticles enter directly through plant stomata, giving higher chlorophyll synthesis with zero ground water nitrate leaching.'}
            </p>
          </div>
          <div className="text-sm font-black text-emerald-800 dark:text-amber-400 shrink-0">
            मात्र ₹225 में उपलब्ध
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {seedFertilizerProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
