import React, { useState, useMemo } from 'react';
import {
  Tractor,
  Filter,
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Scale,
  Sparkles,
  Zap,
  Grid,
  List,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductListing, ProductCategory } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { INDIAN_STATES_DISTRICTS } from '../data/mockData';

export const AgriculturalEquipmentPage: React.FC = () => {
  const { products, lang, globalSearch, setGlobalSearch } = useApp();

  // Filters State
  // Filters State - 100% Electric Ecosystem
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedBattery, setSelectedBattery] = useState<string>('all');
  const [selectedHPRange, setSelectedHPRange] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Extract distinct brands from listings
  const availableBrands = useMemo(() => {
    const brands = Array.from(new Set(products.map((p) => p.brand)));
    return brands.sort();
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Global or page search
      if (globalSearch.trim()) {
        const query = globalSearch.toLowerCase();
        const matchesQuery =
          p.title.toLowerCase().includes(query) ||
          p.titleHi.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'tractors') {
          if (p.category !== 'tractors' && p.category !== 'electric_tractors') return false;
        } else if (selectedCategory === 'electric') {
          if (p.fuelType !== 'electric') return false;
        } else if (p.category !== selectedCategory) {
          return false;
        }
      }

      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }

      // Condition
      if (selectedCondition !== 'all' && p.condition !== selectedCondition) {
        return false;
      }

      // Battery Capacity (kWh)
      if (selectedBattery !== 'all' && p.batteryKwh !== undefined) {
        if (selectedBattery === 'under_15' && p.batteryKwh >= 15) return false;
        if (selectedBattery === '15_35' && (p.batteryKwh < 15 || p.batteryKwh > 35)) return false;
        if (selectedBattery === 'above_35' && p.batteryKwh <= 35) return false;
      }

      // HP Range
      if (selectedHPRange !== 'all' && p.hp) {
        if (selectedHPRange === 'under_15' && p.hp >= 15) return false;
        if (selectedHPRange === '15_35' && (p.hp < 15 || p.hp > 35)) return false;
        if (selectedHPRange === '35_55' && (p.hp < 35 || p.hp > 55)) return false;
        if (selectedHPRange === 'above_55' && p.hp <= 55) return false;
      }

      // State
      if (selectedState !== 'all' && p.location.state !== selectedState) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'hp_desc') return (b.hp || 0) - (a.hp || 0);
      if (sortBy === 'views') return b.viewsCount - a.viewsCount;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    products,
    globalSearch,
    selectedCategory,
    selectedBrand,
    selectedCondition,
    selectedBattery,
    selectedHPRange,
    selectedState,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setSelectedCondition('all');
    setSelectedBattery('all');
    setSelectedHPRange('all');
    setSelectedState('all');
    setGlobalSearch('');
    setSortBy('featured');
  };

  const categories = [
    { id: 'all', label: lang === 'hi' ? '⚡ सभी 100% EV मशीनरी' : 'All 100% Electric' },
    { id: 'tractors', label: lang === 'hi' ? '🚜 नए इलेक्ट्रिक ट्रैक्टर' : 'New EV Tractors' },
    { id: 'used_tractors', label: lang === 'hi' ? '🔋 पुराने इलेक्ट्रिक ट्रैक्टर' : 'Used EV Tractors' },
    { id: 'harvesters', label: lang === 'hi' ? '🌾 इलेक्ट्रिक हार्वेस्टर (Combine)' : 'Electric Harvesters' },
    { id: 'power_tillers', label: lang === 'hi' ? '🚜 इलेक्ट्रिक पावर टिलर (Tillers)' : 'Electric Power Tillers' },
    { id: 'sprayers', label: lang === 'hi' ? '💧 इलेक्ट्रिक स्प्रेयर (Boom/Li-Ion)' : 'Electric Sprayers' },
    { id: 'rotavators', label: lang === 'hi' ? '⚙️ ईवी रोटावेटर (Rotavators)' : 'EV Rotavators' },
    { id: 'cultivators', label: lang === 'hi' ? '🌱 इलेक्ट्रिक कल्टीवेटर (Cultivators)' : 'Electric Cultivators' },
    { id: 'seed_drills', label: lang === 'hi' ? '🌾 सुपर सीडर व प्लांटर' : 'Super Seeders & Planters' },
    { id: 'farm_machinery', label: lang === 'hi' ? '🔋 कुट्टी मशीन, बेलर, थ्रेशर' : 'Chaff Cutters, Balers & Threshers' },
    { id: 'agricultural_drones', label: lang === 'hi' ? '🚁 कृषि ड्रोन (Agri Drones)' : 'Agri Drones' },
    { id: 'irrigation_equipment', label: lang === 'hi' ? '☀️ सोलर सबमर्सिबल पंप' : 'Solar Pumps' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-amber-950 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span>{lang === 'hi' ? '100% इलेक्ट्रिक वाहन व कृषि मशीनरी खोज' : '100% Electric Vehicle & Farm Machinery'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi'
              ? 'इलेक्ट्रिक ट्रैक्टर व आधुनिक कृषि मशीनरी'
              : 'Electric Tractors & Farm Machinery'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? 'महिंद्रा, स्वराज, सोनालिका, सेलेस्टियल, ऑटोनेक्स्ट व जॉन डियर 100% इलेक्ट्रिक ट्रैक्टर। शून्य डीजल धुआं, लीथियम-आयन बैटरी, 75% कम परिचालन खर्च और सरकारी सब्सिडी।'
              : '100% Electric farm vehicles: high-torque electric motors, IP67 waterproof batteries, solar tubewell charging, and certified EV dealers.'}
          </p>
        </div>
      </div>

      {/* Main Filter & Listing Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 sticky top-24 space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
            <div className="flex items-center space-x-2 text-sm font-bold text-stone-900 dark:text-white">
              <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              <span>{lang === 'hi' ? 'सटीक फिल्टर (Filters)' : 'Filter Results'}</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-stone-400 hover:text-rose-600 flex items-center space-x-1"
            >
              <RotateCcw className="h-3 w-3" />
              <span>{lang === 'hi' ? 'रीसेट' : 'Reset'}</span>
            </button>
          </div>

          {/* 1. Category */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
              {lang === 'hi' ? 'कैटेगरी (Category)' : 'Category'}
            </label>
            <div className="space-y-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`w-full text-left rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === c.id
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Battery Capacity (kWh) */}
          <div className="border-t border-stone-100 pt-4 dark:border-stone-800">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
              {lang === 'hi' ? 'बैटरी क्षमता (Battery kWh)' : 'Battery Capacity (kWh)'}
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
              {[
                { id: 'all', label: lang === 'hi' ? 'सभी बैटरी' : 'All Batteries' },
                { id: 'under_15', label: '< 15 kWh' },
                { id: '15_35', label: '15 - 35 kWh' },
                { id: 'above_35', label: '> 35 kWh' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedBattery(f.id)}
                  className={`rounded-lg py-1.5 text-center transition-colors ${
                    selectedBattery === f.id
                      ? 'bg-teal-600 text-white font-black shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. HP Range */}
          <div className="border-t border-stone-100 pt-4 dark:border-stone-800">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
              {lang === 'hi' ? 'हॉर्सपावर / मोटर क्षमता (Power)' : 'Power Range'}
            </label>
            <select
              value={selectedHPRange}
              onChange={(e) => setSelectedHPRange(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs font-bold text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
            >
              <option value="all">{lang === 'hi' ? 'सभी पावर श्रेणी' : 'All Power'}</option>
              <option value="under_15">15 HP से कम (पावर टिलर, स्प्रेयर, चारा कटर)</option>
              <option value="15_35">15 - 35 HP (ऑर्चर्ड व कॉम्पैक्ट EV)</option>
              <option value="35_55">35 - 55 HP (मुख्य 4WD इलेक्ट्रिक ट्रैक्टर)</option>
              <option value="above_55">55+ HP (कंबाइन हार्वेस्टर व हेवी EV)</option>
            </select>
          </div>

          {/* 4. Brand */}
          <div className="border-t border-stone-100 pt-4 dark:border-stone-800">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
              {lang === 'hi' ? 'ब्रांड (Brand)' : 'Brand'}
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs font-bold text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
            >
              <option value="all">{lang === 'hi' ? 'सभी ब्रांड' : 'All Brands'}</option>
              {availableBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Condition */}
          <div className="border-t border-stone-100 pt-4 dark:border-stone-800">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 block">
              {lang === 'hi' ? 'स्थिति (Condition)' : 'Condition'}
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-bold">
              {[
                { id: 'all', label: 'सभी' },
                { id: 'new', label: 'नया' },
                { id: 'used', label: 'पुरानी' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCondition(c.id)}
                  className={`rounded-lg py-1.5 text-center transition-colors ${
                    selectedCondition === c.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Results Section */}
        <div className="lg:col-span-3 space-y-4">
          {/* Top Results Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <div className="text-xs font-bold text-stone-600 dark:text-stone-300">
              {lang === 'hi' ? 'कुल परिणाम:' : 'Total Listings:'}{' '}
              <strong className="text-emerald-700 dark:text-amber-400 text-sm">{filteredProducts.length}</strong>
            </div>

            <div className="flex items-center space-x-2">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center space-x-1 rounded-xl bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-200"
              >
                <Filter className="h-3.5 w-3.5" />
                <span>{lang === 'hi' ? 'फिल्टर' : 'Filter'}</span>
              </button>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border border-stone-300 bg-stone-50 px-2.5 py-1.5 text-xs font-bold text-stone-800 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
              >
                <option value="featured">{lang === 'hi' ? 'लोकप्रिय / रीकमेंडेड' : 'Featured First'}</option>
                <option value="price_asc">{lang === 'hi' ? 'कीमत: कम से ज्यादा' : 'Price: Low to High'}</option>
                <option value="price_desc">{lang === 'hi' ? 'कीमत: ज्यादा से कम' : 'Price: High to Low'}</option>
                <option value="hp_desc">{lang === 'hi' ? 'हॉर्सपावर (HP): ज्यादा' : 'Highest HP'}</option>
                <option value="views">{lang === 'hi' ? 'सबसे ज्यादा देखा गया' : 'Most Viewed'}</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center dark:border-stone-800 dark:bg-stone-900">
              <Tractor className="mx-auto h-12 w-12 text-stone-300 mb-3" />
              <h3 className="text-base font-bold text-stone-800 dark:text-white">
                {lang === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No listings found'}
              </h3>
              <p className="mt-1 text-xs text-stone-500">
                {lang === 'hi' ? 'कृपया फिल्टर बदलकर पुनः प्रयास करें।' : 'Try resetting your search or filters.'}
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
              >
                {lang === 'hi' ? 'सभी फिल्टर हटाएं' : 'Reset All Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 lg:hidden">
          <div className="h-full w-4/5 max-w-xs bg-white p-5 shadow-2xl dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
                <span className="font-bold text-stone-900 dark:text-white text-sm">
                  {lang === 'hi' ? 'फिल्टर चुनें' : 'Filters'}
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">कैटेगरी</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs bg-stone-50"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">
                  {lang === 'hi' ? 'बैटरी क्षमता (Battery kWh)' : 'Battery (kWh)'}
                </label>
                <select
                  value={selectedBattery}
                  onChange={(e) => setSelectedBattery(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                >
                  <option value="all">{lang === 'hi' ? 'सभी बैटरी साइज' : 'All Batteries'}</option>
                  <option value="under_15">&lt; 15 kWh (टिलर/स्प्रेयर/कुट्टी)</option>
                  <option value="15_35">15 - 35 kWh (कॉम्पैक्ट EV)</option>
                  <option value="above_35">&gt; 35 kWh (4WD व हार्वेस्टर)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-500 block mb-1">
                  {lang === 'hi' ? 'हॉर्सपावर / मोटर क्षमता (HP)' : 'Power (HP)'}
                </label>
                <select
                  value={selectedHPRange}
                  onChange={(e) => setSelectedHPRange(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2 text-xs bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                >
                  <option value="all">सभी HP</option>
                  <option value="under_15">&lt; 15 HP (टिलर व स्प्रेयर)</option>
                  <option value="15_35">15 - 35 HP (ऑर्चर्ड EV)</option>
                  <option value="35_55">35 - 55 HP (मुख्य 4WD ट्रैक्टर)</option>
                  <option value="above_55">&gt; 55 HP (कंबाइन हार्वेस्टर)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center space-x-2">
              <button
                onClick={handleResetFilters}
                className="w-1/2 py-2 text-xs font-bold text-stone-600 rounded-xl bg-stone-100"
              >
                रीसेट
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2 text-xs font-bold text-white rounded-xl bg-emerald-600"
              >
                लागू करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
