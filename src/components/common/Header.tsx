import React, { useState } from 'react';
import {
  Search,
  Mic,
  MapPin,
  Scale,
  Bell,
  Heart,
  Menu,
  Moon,
  Sun,
  User,
  ChevronDown,
  Sparkles,
  Zap,
  PhoneCall,
  Volume2,
} from 'lucide-react';
import { useApp, NavigationTab } from '../../context/AppContext';
import { MegaMenu } from './MegaMenu';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    activeTab,
    setActiveTab,
    lang,
    setLang,
    isDark,
    setIsDark,
    location,
    setIsLocationModalOpen,
    setIsVoiceModalOpen,
    setIsNotificationsOpen,
    notifications,
    compareIds,
    wishlistIds,
    currentUser,
    switchRole,
    globalSearch,
    setGlobalSearch,
    executeVoiceSearch,
  } = useApp();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const unreadNotifs = notifications.filter((n) => !n.isRead).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      executeVoiceSearch(globalSearch);
    }
  };

  const mainNavItems: Array<{ id: NavigationTab; labelHi: string; labelEn: string; hasMega?: boolean }> = [
    { id: 'home', labelHi: 'होम', labelEn: 'Home' },
    { id: 'schemes', labelHi: 'सरकारी योजनाएं', labelEn: 'Govt Schemes' },
    { id: 'mandi', labelHi: 'मंडी भाव', labelEn: 'Mandi Bhav' },
    { id: 'weather', labelHi: 'मौसम', labelEn: 'Weather' },
    { id: 'crop_info', labelHi: 'फसल जानकारी', labelEn: 'Crop Info' },
    { id: 'crop_diseases', labelHi: 'फसल रोग', labelEn: 'Diseases' },
    { id: 'seeds_fertilizers', labelHi: 'बीज व खाद', labelEn: 'Seeds & Fertilizers' },
    { id: 'equipment', labelHi: 'कृषि उपकरण', labelEn: 'Equipment', hasMega: true },
    { id: 'buy_sell', labelHi: 'खरीद-बिक्री', labelEn: 'Buy & Sell' },
    { id: 'compare', labelHi: 'तुलना', labelEn: 'Compare' },
    { id: 'calculators', labelHi: 'कैलकुलेटर', labelEn: 'Calculators' },
    { id: 'training', labelHi: 'प्रशिक्षण', labelEn: 'Training' },
    { id: 'news', labelHi: 'समाचार', labelEn: 'News' },
    { id: 'kisan_sahayata', labelHi: 'किसान सहायता', labelEn: 'Kisan Sahayata' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-xs dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
      {/* Top Utility Bar */}
      <div className="bg-emerald-800 text-stone-100 dark:bg-stone-950 py-1.5 px-4 sm:px-6 lg:px-8 text-xs">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          {/* Left: Location & Helpline */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center space-x-1 font-bold text-amber-300 hover:text-amber-200 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {lang === 'hi' ? 'स्थान: ' : 'Location: '}
                <u>{location.district}, {location.state}</u>
              </span>
            </button>

            <span className="hidden sm:inline text-emerald-400/60">|</span>

            <div className="hidden sm:flex items-center space-x-1.5 text-stone-200">
              <PhoneCall className="h-3 w-3 text-amber-300" />
              <span>{lang === 'hi' ? 'निःशुल्क किसान हेल्पलाइन: ' : 'Toll-free Helpline: '}</span>
              <strong className="text-white">1800-180-1551</strong>
            </div>
          </div>

          {/* Right: Role Switcher, Language & Dark Mode */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 ml-auto">
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center space-x-1 rounded-md bg-emerald-900 px-2 py-0.5 text-[11px] font-bold text-amber-300 hover:bg-emerald-950 dark:bg-stone-800 border border-emerald-700/50"
              >
                <User className="h-3 w-3" />
                <span className="capitalize">
                  {currentUser.role === 'farmer' && (lang === 'hi' ? 'किसान मोड' : 'Farmer')}
                  {currentUser.role === 'dealer' && (lang === 'hi' ? 'डीलर मोड' : 'Dealer')}
                  {currentUser.role === 'seller' && (lang === 'hi' ? 'विक्रेता मोड' : 'Seller')}
                  {currentUser.role === 'expert' && (lang === 'hi' ? 'विशेषज्ञ मोड' : 'Agri Expert')}
                  {currentUser.role === 'admin' && (lang === 'hi' ? 'एडमिन मोड' : 'Admin')}
                </span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {isRoleDropdownOpen && (
                <div
                  onMouseLeave={() => setIsRoleDropdownOpen(false)}
                  className="absolute right-0 top-full mt-1 w-44 rounded-xl bg-white p-1.5 shadow-xl border border-stone-200 dark:bg-stone-800 dark:border-stone-700 z-50 text-stone-900 dark:text-stone-100"
                >
                  <div className="px-2 py-1 text-[10px] font-bold uppercase text-stone-400">
                    {lang === 'hi' ? 'अकाउंट प्रकार चुनें:' : 'Select Account View:'}
                  </div>
                  {(['farmer', 'dealer', 'seller', 'expert', 'admin'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold capitalize ${
                        currentUser.role === r
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-700'
                      }`}
                    >
                      <span>
                        {r === 'farmer' && (lang === 'hi' ? '👨‍🌾 किसान (Farmer)' : 'Farmer')}
                        {r === 'dealer' && (lang === 'hi' ? '🏢 अधिकृत डीलर' : 'Dealer')}
                        {r === 'seller' && (lang === 'hi' ? '🚜 मशीन विक्रेता' : 'Seller')}
                        {r === 'expert' && (lang === 'hi' ? '🧪 कृषि विशेषज्ञ' : 'Agri Expert')}
                        {r === 'admin' && (lang === 'hi' ? '⚙️ सुपर एडमिन' : 'Admin')}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              className="rounded bg-emerald-700/60 hover:bg-emerald-700 px-2 py-0.5 text-[11px] font-bold text-white transition-colors"
            >
              {lang === 'hi' ? 'English' : 'हिन्दी'}
            </button>

            {/* Dark mode */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="rounded p-1 text-stone-300 hover:text-white transition-colors"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden rounded-xl p-2 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Official EV Kisan Logo */}
            <div
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-amber-300 font-black shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <span className="text-xl sm:text-2xl font-black tracking-tighter">EV</span>
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-stone-950 font-black text-[9px]">
                  ⚡
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5 leading-none">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-800 dark:text-emerald-400">
                    EV
                  </span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-amber-500">
                    KISAN
                  </span>
                </div>
                <span className="text-[10px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                  {lang === 'hi' ? 'कृषि सुपर प्लेटफॉर्म' : 'Super Agriculture Platform'}
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar with Microphone */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl mx-2 sm:mx-4 relative hidden sm:block"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={
                  lang === 'hi'
                    ? 'ट्रैक्टर, रोटावेटर, मंडी भाव, सरकारी योजनाएं खोजें...'
                    : 'Search tractors, rotavator, mandi price, schemes...'
                }
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full rounded-2xl border-2 border-emerald-600/30 bg-stone-50 py-2.5 pl-10 pr-24 text-sm text-stone-900 focus:border-emerald-600 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-emerald-500/10 dark:border-stone-700 dark:bg-stone-800 dark:text-white transition-all shadow-xs"
              />
              <Search className="absolute left-3.5 h-4 w-4 text-stone-400" />

              <div className="absolute right-1.5 flex items-center space-x-1">
                {/* Voice Search Button */}
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  title={lang === 'hi' ? 'बोलकर खोजें (Voice Search)' : 'Voice Search in Hindi'}
                  className="flex h-8 items-center space-x-1 rounded-xl bg-amber-500 hover:bg-amber-600 px-2.5 text-xs font-bold text-stone-950 shadow-xs transition-transform active:scale-95"
                >
                  <Mic className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">{lang === 'hi' ? 'बोलें' : 'Voice'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Right Action Icons: Compare, Wishlist, Notifications, Dashboard */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="sm:hidden rounded-xl p-2 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              <Mic className="h-5 w-5 text-emerald-600" />
            </button>

            {/* Compare Button */}
            <button
              onClick={() => setActiveTab('compare')}
              className="relative flex items-center space-x-1 rounded-xl p-2 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
              title={lang === 'hi' ? 'ट्रैक्टर तुलना' : 'Product Comparison'}
            >
              <Scale className="h-5 w-5 text-stone-700 dark:text-stone-300" />
              {compareIds.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-stone-950">
                  {compareIds.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setActiveTab('buy_sell')}
              className="relative rounded-xl p-2 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors hidden md:flex"
              title="Wishlist"
            >
              <Heart className="h-5 w-5 text-stone-700 dark:text-stone-300" />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Notifications */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative rounded-xl p-2 text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800 transition-colors"
              title="Notifications"
            >
              <Bell className="h-5 w-5 text-stone-700 dark:text-stone-300" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-black text-white animate-pulse">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Post Free Ad / Sell Button */}
            <button
              onClick={() => setActiveTab('buy_sell')}
              className="hidden sm:inline-flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-black text-stone-950 shadow-sm hover:from-amber-400 hover:to-amber-500 transition-all active:scale-95"
            >
              <span>+</span>
              <span>{lang === 'hi' ? 'मुफ्त विज्ञापन दें' : 'Post Free Ad'}</span>
            </button>

            {/* Admin or Dashboard link */}
            {currentUser.role === 'admin' ? (
              <button
                onClick={() => setActiveTab('admin')}
                className="rounded-xl bg-stone-900 text-white px-3 py-2 text-xs font-bold hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700"
              >
                {lang === 'hi' ? 'एडमिन' : 'Admin'}
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('dashboard')}
                className="rounded-xl bg-emerald-100 text-emerald-900 px-3 py-2 text-xs font-bold hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
              >
                {lang === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 14 Navigation Links Bar (Desktop) */}
      <div className="hidden lg:block border-t border-stone-100 bg-stone-50/70 dark:border-stone-800 dark:bg-stone-900/60 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 overflow-x-auto py-1.5 text-xs font-bold text-stone-700 dark:text-stone-300">
            {mainNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  onMouseEnter={() => item.hasMega && setIsMegaMenuOpen(true)}
                  className={`flex items-center space-x-1 rounded-lg px-2.5 py-1.5 whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'hover:bg-emerald-100 hover:text-emerald-900 dark:hover:bg-stone-800 dark:hover:text-emerald-300'
                  }`}
                >
                  <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                  {item.hasMega && <ChevronDown className="h-3 w-3 opacity-70" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Mega Menu */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </div>
    </header>
  );
};
