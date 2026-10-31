import React, { useState } from 'react';
import {
  Tractor,
  Zap,
  TrendingUp,
  Landmark,
  CloudSun,
  Bug,
  Calculator,
  Search,
  Mic,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Scale,
  Sparkles,
  MapPin,
  Volume2,
  ChevronRight,
  ShoppingBag,
  Award,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';

export const HomePage: React.FC = () => {
  const {
    products,
    mandiRecords,
    weatherData,
    schemes,
    location,
    setIsLocationModalOpen,
    setIsVoiceModalOpen,
    setActiveTab,
    lang,
    playTTS,
    globalSearch,
    setGlobalSearch,
    executeVoiceSearch,
  } = useApp();

  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('all');

  // Filter products by selected home category
  const filteredProducts = products.filter((p) => {
    if (activeCategoryTab === 'electric') return p.fuelType === 'electric';
    if (activeCategoryTab === 'new') return p.condition === 'new' && p.category === 'tractors';
    if (activeCategoryTab === 'used') return p.category === 'used_tractors';
    if (activeCategoryTab === 'rotavator') return p.category === 'rotavators' || p.category === 'seed_drills';
    if (activeCategoryTab === 'drone') return p.category === 'agricultural_drones' || p.category === 'irrigation_equipment';
    return true;
  }).slice(0, 6);

  // Weather for current district or fallback
  const currentWeather = weatherData[location.district] || weatherData['Karnal'];

  // Mandi items for current district or nearby
  const relevantMandi = mandiRecords
    .filter((m) => m.district.toLowerCase() === location.district.toLowerCase() || m.state.toLowerCase() === location.state.toLowerCase())
    .slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      executeVoiceSearch(globalSearch);
    }
  };

  const handleListenMandi = () => {
    if (relevantMandi.length === 0) return;
    const text = relevantMandi
      .map((m) => `${m.commodityHi} का भाव ${m.modalPrice} रुपये प्रति क्विंटल`)
      .join('। ');
    playTTS(
      `${location.district} मंडी के आज के प्रमुख भाव: ${text}`,
      lang === 'hi' ? 'दैनिक मंडी भाव ऑडियो' : 'Today Mandi Bhav Audio'
    );
  };

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 text-white shadow-2xl mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Background glow & subtle patterns */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-md border border-white/15 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'भारत का नं.1 कृषि व ट्रैक्टर सुपर प्लेटफॉर्म' : "India's No.1 Agriculture & Tractor Super Platform"}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {lang === 'hi' ? (
              <>
                खेती की हर जरूरत, <br />
                <span className="text-amber-400">ट्रैक्टर, मंडी भाव व सही जानकारी</span>
              </>
            ) : (
              <>
                Every Farming Need, <br />
                <span className="text-amber-400">Tractors, Mandi Prices & Assistance</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
            {lang === 'hi'
              ? 'महिंद्रा, स्वराज, सोनालिका व इलेक्ट्रिक ट्रैक्टरों की तुलना करें। आज का ताजा मंडी भाव जानें, सरकारी योजनाओं की 50% सब्सिडी पाएं और पुरानी मशीनरी खरीदें-बेचें।'
              : 'Discover & compare 50+ tractors, browse daily mandi prices, claim government subsidies and buy or sell agricultural machinery securely.'}
          </p>

          {/* Hero Big Search Bar */}
          <form onSubmit={handleSearch} className="mt-8 max-w-2xl">
            <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-xl">
              <Search className="h-5 w-5 text-stone-400 ml-2" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder={
                  lang === 'hi'
                    ? 'ट्रैक्टर मॉडल, रोटावेटर, गेहूं मंडी भाव या योजना खोजें...'
                    : 'Search tractor model, rotavator, wheat mandi price or schemes...'
                }
                className="w-full bg-transparent px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setIsVoiceModalOpen(true)}
                title={lang === 'hi' ? 'बोलकर खोजें' : 'Voice Search'}
                className="flex items-center space-x-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 px-3.5 py-2 text-xs font-black text-stone-950 shadow-xs mr-2 transition-transform active:scale-95"
              >
                <Mic className="h-4 w-4" />
                <span className="hidden sm:inline">{lang === 'hi' ? 'बोलें' : 'Voice'}</span>
              </button>
              <button
                type="submit"
                className="rounded-xl bg-emerald-700 hover:bg-emerald-800 px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-colors"
              >
                {lang === 'hi' ? 'खोजें' : 'Search'}
              </button>
            </div>
          </form>

          {/* Hero Quick Category Badges */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('equipment')}
              className="flex items-center space-x-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-1.5 backdrop-blur-xs transition-colors"
            >
              <Tractor className="h-3.5 w-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'ट्रैक्टर खोज' : 'Find Tractors'}</span>
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className="flex items-center space-x-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-400/30 px-3 py-1.5 backdrop-blur-xs transition-colors"
            >
              <Zap className="h-3.5 w-3.5 text-teal-300 fill-teal-300" />
              <span>{lang === 'hi' ? 'इलेक्ट्रिक ट्रैक्टर (EV)' : 'Electric Tractors'}</span>
            </button>
            <button
              onClick={() => setActiveTab('mandi')}
              className="flex items-center space-x-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-1.5 backdrop-blur-xs transition-colors"
            >
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span>{lang === 'hi' ? 'मंडी भाव' : 'Mandi Bhav'}</span>
            </button>
            <button
              onClick={() => setActiveTab('schemes')}
              className="flex items-center space-x-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-1.5 backdrop-blur-xs transition-colors"
            >
              <Landmark className="h-3.5 w-3.5 text-sky-400" />
              <span>{lang === 'hi' ? 'सरकारी योजनाएं' : 'Govt Schemes'}</span>
            </button>
            <button
              onClick={() => setActiveTab('calculators')}
              className="flex items-center space-x-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-1.5 backdrop-blur-xs transition-colors"
            >
              <Calculator className="h-3.5 w-3.5 text-amber-300" />
              <span>{lang === 'hi' ? 'कृषि कैलकुलेटर' : 'Calculators'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. District Personalized Bar: Live Mandi + Weather Snapshot */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Live Mandi Widget */}
          <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
                <div className="flex items-center space-x-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                      {lang === 'hi' ? 'दैनिक मंडी भाव (Live Rates)' : 'Daily Mandi Prices'}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-stone-500">
                      <MapPin className="h-3 w-3 text-emerald-600" />
                      <span>{location.district}, {location.state}</span>
                      <button
                        onClick={() => setIsLocationModalOpen(true)}
                        className="text-emerald-700 dark:text-emerald-400 underline font-semibold ml-1"
                      >
                        {lang === 'hi' ? 'बदलें' : 'Change'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleListenMandi}
                    title={lang === 'hi' ? 'भाव बोलकर सुनाएं' : 'Listen rates audio'}
                    className="flex items-center space-x-1 rounded-xl bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-700 hover:bg-amber-500/25 dark:text-amber-300"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>{lang === 'hi' ? 'सुनें' : 'Audio'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('mandi')}
                    className="text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
                  >
                    {lang === 'hi' ? 'सभी भाव देखें →' : 'View All →'}
                  </button>
                </div>
              </div>

              {/* Mandi Cards Horizontal Grid */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {relevantMandi.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-2xl border border-stone-100 bg-stone-50/70 p-3 dark:border-stone-800 dark:bg-stone-800/50"
                  >
                    <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block truncate">
                      {lang === 'hi' ? m.commodityHi : m.commodity}
                    </span>
                    <div className="mt-1 text-base font-black text-stone-950 dark:text-amber-400">
                      ₹{m.modalPrice.toLocaleString('en-IN')}
                    </div>
                    <div className="mt-0.5 flex items-center justify-between text-[10px] text-stone-500">
                      <span>{m.unit}</span>
                      <span className={`font-bold ${m.trend === 'up' ? 'text-emerald-600' : 'text-stone-500'}`}>
                        {m.trend === 'up' ? '▲ तेजी' : '• स्थिर'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 text-[11px] text-stone-400">
              स्रोत: Agmarknet & राज्य कृषि विपणन बोर्ड • आज 31 Oct 2026 अपडेटेड
            </div>
          </div>

          {/* Today's Weather Advisory Widget */}
          <div className="rounded-3xl border border-stone-200 bg-gradient-to-br from-sky-50 to-stone-50 p-5 shadow-xs dark:border-stone-800 dark:from-stone-900 dark:to-stone-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-sky-100 pb-3 dark:border-stone-800">
                <div className="flex items-center space-x-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-white shadow-xs">
                    <CloudSun className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                      {lang === 'hi' ? 'मौसम व कृषि एडवाइजरी' : 'Weather & Advisory'}
                    </h3>
                    <span className="text-xs text-stone-500">{location.district}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('weather')}
                  className="text-xs font-bold text-sky-700 hover:underline dark:text-sky-400"
                >
                  {lang === 'hi' ? '5 दिन का अनुमान →' : '5 Days →'}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-stone-900 dark:text-white">
                    {currentWeather.temp}°C
                  </div>
                  <div className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                    {lang === 'hi' ? currentWeather.conditionHi : currentWeather.condition}
                  </div>
                </div>
                <div className="text-right text-xs text-stone-500 space-y-0.5">
                  <div>नमी (Humidity): {currentWeather.humidity}%</div>
                  <div>हवा (Wind): {currentWeather.windSpeed} km/h</div>
                  <div>बारिश की संभावना: {currentWeather.rainfallChance}%</div>
                </div>
              </div>

              {/* Advisory note */}
              <div className="mt-4 rounded-xl bg-white/80 p-3 text-xs text-stone-700 dark:bg-stone-800 dark:text-stone-300 border border-sky-200/50 dark:border-stone-700">
                <strong className="text-sky-800 dark:text-sky-300 block mb-0.5">🌾 आज की कृषि सलाह:</strong>
                {currentWeather.forecast[0]?.advisory}
              </div>
            </div>

            <div className="mt-3 text-[11px] text-stone-400">
              मौसम स्रोत: भारत मौसम विज्ञान विभाग (IMD)
            </div>
          </div>
        </div>
      </section>

      {/* 3. Electric Tractor Highlight Banner (Green & Clean) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-emerald-800 to-stone-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-teal-400/20 px-3 py-1 text-xs font-bold text-teal-300 border border-teal-400/30">
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>EV KISAN SPECIAL: शून्य डीजल खर्च</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {lang === 'hi'
                  ? 'इलेक्ट्रिक ट्रैक्टर – खेती की लागत में 75% तक की सीधी बचत'
                  : 'Electric Tractors – Save up to 75% on Field Operating Costs'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {lang === 'hi'
                  ? 'डीजल की बढ़ती कीमतों से पाएं हमेशा के लिए मुक्ति। सोनालिका टाइगर इलेक्ट्रिक और सेलेस्टियल 55 HP इलेक्ट्रिक ट्रैक्टर पर 40% तक सरकारी सब्सिडी और मात्र ₹25 प्रति घंटा का ऑपरेटिंग खर्च।'
                  : 'Zero noise, zero vibration, instant torque. Charge via home or solar tubewell and enjoy European-engineered electric powertrains.'}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setActiveCategoryTab('electric');
                    setActiveTab('equipment');
                  }}
                  className="rounded-xl bg-teal-400 hover:bg-teal-300 px-5 py-2.5 text-xs sm:text-sm font-bold text-stone-950 shadow-md transition-all active:scale-95"
                >
                  {lang === 'hi' ? 'सभी इलेक्ट्रिक ट्रैक्टर देखें' : 'Explore Electric Tractors'}
                </button>
                <button
                  onClick={() => setActiveTab('compare')}
                  className="flex items-center space-x-1.5 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-xs sm:text-sm font-bold text-white backdrop-blur-xs transition-colors"
                >
                  <Scale className="h-4 w-4" />
                  <span>{lang === 'hi' ? 'इलेक्ट्रिक ट्रैक्टर तुलना करें' : 'Compare Electric Tractors'}</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Pill */}
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/10 text-center space-y-2">
              <span className="text-3xl font-black text-amber-300">₹1.50 लाख</span>
              <div className="text-xs font-bold text-white">
                {lang === 'hi' ? 'सालाना अनुमानित डीजल बचत' : 'Annual Avg Diesel Savings'}
              </div>
              <div className="text-[11px] text-teal-200">
                (500 घंटे वार्षिक उपयोग पर आधारित)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BikeDekho Style Tractor & Machinery Discovery Engine */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Tractor className="h-4 w-4" />
              <span>{lang === 'hi' ? '100% EV मशीनरी डिस्कवरी इंजन' : '100% EV Machinery Discovery Engine'}</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
              {lang === 'hi' ? 'लोकप्रिय इलेक्ट्रिक ट्रैक्टर व कृषि यंत्र' : 'Popular Electric Tractors & Farm Implements'}
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-1.5 text-xs font-bold">
            {[
              { id: 'all', label: lang === 'hi' ? 'सभी 100% EV' : 'All 100% EV' },
              { id: 'electric', label: lang === 'hi' ? '⚡ नए EV ट्रैक्टर' : 'New EV Tractors' },
              { id: 'used', label: lang === 'hi' ? '⚡ पुराने EV ट्रैक्टर' : 'Used EV Tractors' },
              { id: 'rotavator', label: lang === 'hi' ? 'रोटावेटर / ड्रिल' : 'Implements' },
              { id: 'drone', label: lang === 'hi' ? 'ड्रोन व सोलर' : 'Drone & Solar' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategoryTab(tab.id)}
                className={`rounded-xl px-3 py-1.5 transition-all ${
                  activeCategoryTab === tab.id
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* View All Equipment CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setActiveTab('equipment')}
            className="inline-flex items-center space-x-2 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white px-8 py-3 text-sm font-bold shadow-md transition-all active:scale-95 dark:bg-stone-800 dark:hover:bg-stone-700"
          >
            <span>{lang === 'hi' ? 'सभी 50+ कृषि उपकरण व ट्रैक्टर देखें' : 'Browse All 50+ Agricultural Implements'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 5. 12+ Farming Calculators Quick Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8 dark:border-stone-800 dark:bg-stone-900/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                <Calculator className="h-4 w-4" />
                <span>{lang === 'hi' ? 'सटीक खेती उपकरण' : 'Precision Farming Tools'}</span>
              </div>
              <h2 className="mt-1 text-2xl font-black text-stone-900 dark:text-white">
                {lang === 'hi' ? '12+ आवश्यक कृषि कैलकुलेटर' : '12+ Essential Agriculture Calculators'}
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('calculators')}
              className="mt-3 sm:mt-0 text-xs font-bold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              {lang === 'hi' ? 'सभी 12 कैलकुलेटर खोलें →' : 'Open All 12 Calculators →'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { titleHi: 'बीज दर (Seed Rate)', icon: '🌾', desc: 'प्रति एकड़ किलोग्राम' },
              { titleHi: 'एनपीके खाद (Fertilizer)', icon: '🧪', desc: 'यूरिया व डीएपी डोज' },
              { titleHi: 'बीघा से एकड़ (Land Area)', icon: '📐', desc: 'राज्य अनुसार रूपांतरण' },
              { titleHi: 'ट्रैक्टर ईएमआई (Loan EMI)', icon: '🚜', desc: 'मासिक किस्त व ब्याज' },
              { titleHi: 'सिंचाई जल आवश्यकता', icon: '💧', desc: 'घंटे व बिजली खर्च' },
              { titleHi: 'फसल उत्पादन व मुनाफा', icon: '💰', desc: 'खर्च vs आमदनी' },
            ].map((calc, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab('calculators')}
                className="group rounded-2xl border border-stone-200 bg-white p-3.5 text-center shadow-xs cursor-pointer hover:border-emerald-500 hover:shadow-md dark:border-stone-700 dark:bg-stone-800 transition-all"
              >
                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{calc.icon}</div>
                <h4 className="text-xs font-bold text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {calc.titleHi}
                </h4>
                <p className="mt-0.5 text-[10px] text-stone-500 dark:text-stone-400">
                  {calc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Government Schemes Spotlight Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 via-sky-50 to-emerald-50 p-6 sm:p-8 dark:border-stone-800 dark:from-stone-900 dark:to-stone-900">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-flex items-center space-x-1.5 rounded-md bg-blue-100 text-blue-900 px-2.5 py-0.5 text-xs font-bold dark:bg-blue-950 dark:text-blue-300">
                <Landmark className="h-3.5 w-3.5" />
                <span>{lang === 'hi' ? 'सरकारी योजनाएं व सब्सिडी' : 'Govt Schemes & Subsidies'}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                {lang === 'hi'
                  ? 'ट्रैक्टर, रोटावेटर और सोलर पंप पर 50% तक सरकारी अनुदान का लाभ उठाएं'
                  : 'Claim up to 50% Subsidy on Tractors, Rotavators & Solar Pumps'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                {lang === 'hi'
                  ? 'पीएम-किसान सम्मान निधि (₹6,000/वर्ष), कृषि यंत्रीकरण (SMAM), पीएम-कुसुम सोलर पंप और फसल बीमा योजना (PMFBY) के पात्रता नियम व ऑनलाइन आवेदन।'
                  : 'Access PM-Kisan DBT support, SMAM machinery subsidy, PM-KUSUM 75% solar pump grants with verified official portal links.'}
              </p>
            </div>

            <div className="shrink-0 flex flex-col space-y-2 w-full md:w-auto">
              <button
                onClick={() => setActiveTab('schemes')}
                className="rounded-xl bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 text-xs sm:text-sm font-bold shadow-md transition-colors text-center"
              >
                {lang === 'hi' ? 'सभी योजनाएं व पात्रता देखें' : 'View All Schemes'}
              </button>
              <span className="text-[11px] text-stone-500 text-center">
                ✓ 100% निशुल्क व आधिकारिक पोर्टल लिंक
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why EV Kisan – Trust & Farmer Guarantees */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-black text-stone-900 dark:text-white">
            {lang === 'hi' ? 'ईवी किसान – किसानों का सच्चा साथी' : 'Why Farmers Trust EV Kisan'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            {lang === 'hi'
              ? 'बिना किसी दलाल या फर्जीवाड़े के, केवल अधिकृत जानकारी और सत्यापित डीलर'
              : 'Grounded in authentic data, verified dealers and zero fake listings'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center dark:border-stone-800 dark:bg-stone-900">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 font-bold mb-3 dark:bg-emerald-950 dark:text-emerald-300">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h4 className="text-sm font-bold text-stone-900 dark:text-white">
              {lang === 'hi' ? '100% सत्यापित डीलर' : '100% Verified Dealers'}
            </h4>
            <p className="mt-1 text-xs text-stone-500">
              {lang === 'hi' ? 'हर विक्रेता की पहचान व शोरूम जांच के बाद ही लिस्टिंग स्वीकृत होती है।' : 'Physical inspection and dealer verification before publishing.'}
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center dark:border-stone-800 dark:bg-stone-900">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 font-bold mb-3 dark:bg-amber-950 dark:text-amber-300">
              <Scale className="h-6 w-6" />
            </span>
            <h4 className="text-sm font-bold text-stone-900 dark:text-white">
              {lang === 'hi' ? 'सटीक ट्रैक्टर तुलना' : 'Unbiased Comparison'}
            </h4>
            <p className="mt-1 text-xs text-stone-500">
              {lang === 'hi' ? 'एचपी, टॉर्क, लिफ्ट क्षमता व वारंटी की निष्पक्ष तुलना करें।' : 'Compare side-by-side HP, torque and PTO capacities.'}
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center dark:border-stone-800 dark:bg-stone-900">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 font-bold mb-3 dark:bg-sky-950 dark:text-sky-300">
              <TrendingUp className="h-6 w-6" />
            </span>
            <h4 className="text-sm font-bold text-stone-900 dark:text-white">
              {lang === 'hi' ? 'दैनिक प्रमाणित मंडी भाव' : 'Live Mandi Bhav'}
            </h4>
            <p className="mt-1 text-xs text-stone-500">
              {lang === 'hi' ? 'सरकारी Agmarknet पोर्टल से सीधे जुड़े दैनिक न्यूनतम व अधिकतम भाव।' : 'Direct integration with official APMC market records.'}
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center dark:border-stone-800 dark:bg-stone-900">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-800 font-bold mb-3 dark:bg-purple-950 dark:text-purple-300">
              <Volume2 className="h-6 w-6" />
            </span>
            <h4 className="text-sm font-bold text-stone-900 dark:text-white">
              {lang === 'hi' ? 'बोलने वाला सिस्टम' : 'Voice Assisted'}
            </h4>
            <p className="mt-1 text-xs text-stone-500">
              {lang === 'hi' ? 'माइक से हिंदी में बोलकर खोजें और ऑडियो में परिणाम सुनें।' : 'Hindi voice recognition and speech readback for farmers.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
