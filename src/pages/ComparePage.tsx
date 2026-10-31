import React from 'react';
import {
  Scale,
  Plus,
  Trash2,
  Printer,
  Share2,
  Check,
  X,
  Sparkles,
  Volume2,
  ShieldCheck,
  Download,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductListing } from '../types';

export const ComparePage: React.FC = () => {
  const {
    compareIds,
    products,
    removeFromCompare,
    clearCompare,
    addToCompare,
    setActiveEnquiryModal,
    lang,
    playTTS,
  } = useApp();

  const comparedProducts = products.filter((p) => compareIds.includes(p.id));

  // Compatible recommendations (same category not yet in compare)
  const firstProd = comparedProducts[0];
  const compatibleRecommendations = products
    .filter((p) => !compareIds.includes(p.id) && (!firstProd || p.category === firstProd.category))
    .slice(0, 3);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'EV Kisan Tractor Comparison',
        text: `EV Kisan पर तुलना देखें: ${comparedProducts.map((p) => p.title).join(' vs ')}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'hi' ? 'तुलना लिंक कॉपी हो गया!' : 'Comparison link copied!');
    }
  };

  const handleListenComparison = () => {
    if (comparedProducts.length < 2) return;
    const text =
      lang === 'hi'
        ? `तुलना: ${comparedProducts[0].title} की कीमत ${comparedProducts[0].priceDisplay} और हॉर्सपावर ${comparedProducts[0].hp} एचपी है। जबकि ${comparedProducts[1].title} की कीमत ${comparedProducts[1].priceDisplay} और हॉर्सपावर ${comparedProducts[1].hp} एचपी है।`
        : `Comparing ${comparedProducts[0].title} (${comparedProducts[0].priceDisplay}, ${comparedProducts[0].hp} HP) with ${comparedProducts[1].title} (${comparedProducts[1].priceDisplay}, ${comparedProducts[1].hp} HP).`;
    playTTS(text, lang === 'hi' ? 'तुलना वाचन' : 'Comparison Summary');
  };

  // Collect all unique specification keys across compared products
  const allSpecKeys = Array.from(
    new Set(comparedProducts.flatMap((p) => Object.keys(p.specifications)))
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-emerald-950 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden no-print">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <Scale className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'निष्पक्ष तुलना इंजन' : 'Unbiased Comparison Engine'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi' ? 'ट्रैक्टर व कृषि यंत्र तुलना (Compare Matrix)' : 'Side-by-Side Equipment Comparison'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? '2 से 4 उत्पादों की एक साथ तुलना करें। हॉर्सपावर (HP), पीटीओ, इंजन सीसी, लिफ्ट क्षमता, वारंटी, फायदे व कमियों का सटीक आमना-सामना।'
              : 'Compare 2 to 4 products side-by-side. Analyze engine specs, PTO power, hydraulic lift, warranty and verified prices.'}
          </p>
        </div>
      </div>

      {comparedProducts.length === 0 ? (
        <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center dark:border-stone-800 dark:bg-stone-900">
          <Scale className="mx-auto h-16 w-16 text-stone-300 mb-3" />
          <h3 className="text-lg font-bold text-stone-900 dark:text-white">
            {lang === 'hi' ? 'तुलना सूची खाली है' : 'No products in comparison'}
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            {lang === 'hi'
              ? 'उपकरण या ट्रैक्टर पेज पर जाकर "तुलना में जोड़ें" बटन दबाएं।'
              : 'Add up to 4 tractors or implements to compare technical specifications.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Action Bar (Print, Share, Clear, Listen) */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 no-print">
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-700 dark:text-stone-300">
              <span className="rounded-lg bg-amber-500 text-stone-950 px-2 py-0.5 font-black">
                {comparedProducts.length}/4
              </span>
              <span>{lang === 'hi' ? 'उत्पाद चुने गए' : 'Products Selected'}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleListenComparison}
                className="flex items-center space-x-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300"
              >
                <Volume2 className="h-4 w-4" />
                <span>{lang === 'hi' ? 'तुलना सुनें' : 'Audio Read'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-1 rounded-xl bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200"
              >
                <Printer className="h-4 w-4" />
                <span>{lang === 'hi' ? 'प्रिंट / PDF' : 'Print / PDF'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center space-x-1 rounded-xl bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200"
              >
                <Share2 className="h-4 w-4" />
                <span>{lang === 'hi' ? 'शेयर' : 'Share'}</span>
              </button>

              <button
                onClick={clearCompare}
                className="flex items-center space-x-1 rounded-xl p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold"
                title="Clear all"
              >
                <Trash2 className="h-4 w-4" />
                <span>{lang === 'hi' ? 'हटाएं' : 'Clear'}</span>
              </button>
            </div>
          </div>

          {/* Side-by-Side Comparison Matrix */}
          <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <table className="w-full text-left text-xs sm:text-sm">
              {/* Product Header Cards Row */}
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40">
                  <th className="p-4 w-48 text-stone-500 font-bold uppercase text-[11px]">
                    {lang === 'hi' ? 'विशेषता / उत्पाद' : 'Features / Models'}
                  </th>
                  {comparedProducts.map((p) => (
                    <th key={p.id} className="p-4 min-w-[240px] align-top">
                      <div className="relative space-y-2">
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          className="no-print absolute -top-1 -right-1 rounded-full p-1 text-stone-400 hover:bg-rose-100 hover:text-rose-600"
                          title="Remove"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="h-28 w-full rounded-2xl object-cover border border-stone-200 dark:border-stone-700"
                        />
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                          {p.brand}
                        </div>
                        <h3 className="text-sm font-bold text-stone-900 dark:text-white line-clamp-1">
                          {p.title}
                        </h3>
                        <div className="text-base font-black text-emerald-700 dark:text-amber-400">
                          {p.priceDisplay}
                        </div>
                        <button
                          onClick={() => setActiveEnquiryModal(p)}
                          className="no-print w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
                        >
                          {lang === 'hi' ? 'कीमत पूछें' : 'Get Quote'}
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Specs Rows */}
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                <tr className="bg-emerald-50/70 dark:bg-emerald-950/40 font-bold text-stone-900 dark:text-white">
                  <td className="p-3.5 uppercase text-[11px] text-emerald-800 dark:text-emerald-300">
                    {lang === 'hi' ? 'पावरट्रेन (Powertrain)' : 'Powertrain'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3.5 font-black text-emerald-800 dark:text-emerald-300">
                      ⚡ 100% ELECTRIC (Zero Emission)
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3.5 text-stone-500 font-semibold">
                    {lang === 'hi' ? 'बैटरी क्षमता (Battery kWh)' : 'Battery (kWh)'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3.5 font-bold text-teal-700 dark:text-teal-400">
                      {p.batteryKwh ? `🔋 ${p.batteryKwh} kWh Lithium-ion` : '—'}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3.5 text-stone-500 font-semibold">
                    {lang === 'hi' ? 'चार्जिंग समय (Charging Time)' : 'Charging Time'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3.5 font-semibold text-stone-800 dark:text-stone-200">
                      {p.chargingTimeHours ? `⏱️ ${p.chargingTimeHours} Hours (DC Fast)` : '—'}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3.5 text-stone-500 font-semibold">
                    {lang === 'hi' ? 'बैटरी हेल्थ / स्थिति' : 'Battery Health'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3.5 font-bold text-emerald-700 dark:text-emerald-400">
                      {p.condition === 'new' ? '✨ 100% Brand New Pack' : (p.batteryHealth ? `🔋 ${p.batteryHealth}% Certified Health` : '95%+ Health')}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3.5 text-stone-500 font-semibold">
                    {lang === 'hi' ? 'हॉर्सपावर (HP)' : 'HP Equivalent'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3.5 font-bold text-stone-900 dark:text-white">
                      {p.hp ? `${p.hp} HP Instant Torque` : '—'}
                    </td>
                  ))}
                </tr>

                {allSpecKeys.map((key) => (
                  <tr key={key} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                    <td className="p-3.5 text-stone-500 font-medium">{key}</td>
                    {comparedProducts.map((p) => (
                      <td key={p.id} className="p-3.5 font-semibold text-stone-800 dark:text-stone-200">
                        {p.specifications[key] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Advantages / Pros */}
                <tr className="bg-emerald-50/30 dark:bg-emerald-950/20">
                  <td className="p-3.5 text-emerald-800 dark:text-emerald-300 font-bold">
                    {lang === 'hi' ? 'प्रमुख फायदे' : 'Key Advantages'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3.5 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                      {p.pros.map((pro, i) => (
                        <div key={i} className="flex items-start space-x-1.5">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* Limitations / Cons */}
                <tr className="bg-rose-50/30 dark:bg-rose-950/20">
                  <td className="p-3.5 text-rose-800 dark:text-rose-300 font-bold">
                    {lang === 'hi' ? 'सीमाएं / कमियां' : 'Limitations'}
                  </td>
                  {comparedProducts.map((p) => (
                    <td key={p.id} className="p-3.5 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                      {p.cons.map((con, i) => (
                        <div key={i} className="flex items-start space-x-1.5">
                          <span className="text-rose-600 font-bold">!</span>
                          <span>{con}</span>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Recommendations to add 3rd/4th product */}
          {comparedProducts.length < 4 && compatibleRecommendations.length > 0 && (
            <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 no-print">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                {lang === 'hi' ? '+ तुलना में अन्य मॉडल जोड़ें (Recommended to compare):' : 'Add More Compatible Models:'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {compatibleRecommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800"
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <img src={rec.images[0]} alt={rec.title} className="h-10 w-14 rounded-lg object-cover" />
                      <div className="truncate">
                        <div className="text-xs font-bold truncate text-stone-900 dark:text-white">
                          {rec.title}
                        </div>
                        <div className="text-xs font-black text-emerald-700 dark:text-amber-400">
                          {rec.priceDisplay}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCompare(rec.id)}
                      className="rounded-xl bg-amber-500 px-2.5 py-1 text-xs font-bold text-stone-950 shrink-0 ml-2"
                    >
                      + जोड़ें
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
