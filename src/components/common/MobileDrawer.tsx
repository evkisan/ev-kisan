import React from 'react';
import {
  X,
  Home,
  Landmark,
  TrendingUp,
  CloudSun,
  Sprout,
  Bug,
  Sparkles,
  Tractor,
  ShoppingBag,
  Scale,
  Calculator,
  GraduationCap,
  Newspaper,
  Headphones,
  UserCheck,
  Shield,
  MapPin,
  Mic,
  Moon,
  Sun,
} from 'lucide-react';
import { useApp, NavigationTab } from '../../context/AppContext';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
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
    currentUser,
    switchRole,
  } = useApp();

  if (!isOpen) return null;

  const navItems: Array<{ id: NavigationTab; labelHi: string; labelEn: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'home', labelHi: 'होम', labelEn: 'Home', icon: <Home className="h-4 w-4" /> },
    { id: 'schemes', labelHi: 'सरकारी योजनाएं', labelEn: 'Govt Schemes', icon: <Landmark className="h-4 w-4" />, badge: 'PM-Kisan' },
    { id: 'mandi', labelHi: 'मंडी भाव', labelEn: 'Mandi Bhav', icon: <TrendingUp className="h-4 w-4" />, badge: 'LIVE' },
    { id: 'weather', labelHi: 'मौसम पूर्वानुमान', labelEn: 'Weather', icon: <CloudSun className="h-4 w-4" /> },
    { id: 'crop_info', labelHi: 'फसल जानकारी', labelEn: 'Crop Info', icon: <Sprout className="h-4 w-4" /> },
    { id: 'crop_diseases', labelHi: 'फसल रोग व उपचार', labelEn: 'Crop Diseases', icon: <Bug className="h-4 w-4" /> },
    { id: 'seeds_fertilizers', labelHi: 'बीज व खाद', labelEn: 'Seeds & Fertilizers', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'equipment', labelHi: 'कृषि उपकरण व ट्रैक्टर', labelEn: 'Equipment & Tractors', icon: <Tractor className="h-4 w-4" /> },
    { id: 'buy_sell', labelHi: 'खरीद और बिक्री', labelEn: 'Buy and Sell', icon: <ShoppingBag className="h-4 w-4" /> },
    { id: 'compare', labelHi: 'ट्रैक्टर तुलना इंजन', labelEn: 'Compare', icon: <Scale className="h-4 w-4" /> },
    { id: 'calculators', labelHi: '12+ कृषि कैलकुलेटर', labelEn: 'Calculators', icon: <Calculator className="h-4 w-4" /> },
    { id: 'training', labelHi: 'कृषि प्रशिक्षण व कोर्स', labelEn: 'Agri Training', icon: <GraduationCap className="h-4 w-4" /> },
    { id: 'news', labelHi: 'कृषि समाचार', labelEn: 'Agri News', icon: <Newspaper className="h-4 w-4" /> },
    { id: 'kisan_sahayata', labelHi: 'किसान सहायता', labelEn: 'Kisan Sahayata', icon: <Headphones className="h-4 w-4" /> },
    { id: 'dashboard', labelHi: 'यूजर डैशबोर्ड', labelEn: 'User Dashboard', icon: <UserCheck className="h-4 w-4" /> },
    { id: 'admin', labelHi: 'एडमिन पैनल', labelEn: 'Admin Panel', icon: <Shield className="h-4 w-4" /> },
  ];

  const handleSelect = (tab: NavigationTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="h-full w-4/5 max-w-xs bg-white p-4 shadow-2xl dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800">
            <div className="flex items-center space-x-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-amber-300 font-black text-base shadow-xs">
                EV
              </span>
              <div>
                <span className="text-base font-extrabold text-stone-900 dark:text-white">
                  EV KISAN
                </span>
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                  सुपर एग्रीकल्चर प्लेटफॉर्म
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Location & Voice triggers */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onClose();
                setIsLocationModalOpen(true);
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-amber-50 p-2 text-xs font-bold text-amber-900 dark:bg-stone-800 dark:text-amber-300"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-600" />
              <span className="truncate">{location.district}</span>
            </button>
            <button
              onClick={() => {
                onClose();
                setIsVoiceModalOpen(true);
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-emerald-50 p-2 text-xs font-bold text-emerald-800 dark:bg-stone-800 dark:text-emerald-300"
            >
              <Mic className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
              <span>{lang === 'hi' ? 'बोलें' : 'Voice'}</span>
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="mt-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center justify-between w-full rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span>{item.icon}</span>
                    <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-md px-1.5 py-0.2 text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-amber-100 text-amber-800 dark:bg-stone-800 dark:text-amber-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Settings & Role Switcher */}
        <div className="border-t border-stone-100 pt-3 dark:border-stone-800 space-y-2">
          {/* Role selector */}
          <div className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
            {lang === 'hi' ? 'भूमिका बदलें (Switch Role):' : 'Switch Role:'}
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px] font-bold">
            {(['farmer', 'dealer', 'seller', 'expert', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={`rounded-lg py-1 px-2 text-center capitalize transition-colors ${
                  currentUser.role === r
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {r === 'farmer' && (lang === 'hi' ? 'किसान' : 'Farmer')}
                {r === 'dealer' && (lang === 'hi' ? 'डीलर' : 'Dealer')}
                {r === 'seller' && (lang === 'hi' ? 'विक्रेता' : 'Seller')}
                {r === 'expert' && (lang === 'hi' ? 'विशेषज्ञ' : 'Expert')}
                {r === 'admin' && (lang === 'hi' ? 'एडमिन' : 'Admin')}
              </button>
            ))}
          </div>

          {/* Lang & Dark Toggle */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              className="rounded-lg bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-800 dark:bg-stone-800 dark:text-stone-200"
            >
              {lang === 'hi' ? 'English में बदलें' : 'हिंदी में बदलें'}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="rounded-lg bg-stone-100 p-2 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
