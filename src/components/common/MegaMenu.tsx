import React from 'react';
import {
  Tractor,
  Zap,
  TrendingUp,
  Landmark,
  CloudSun,
  Sprout,
  Bug,
  ShoppingBag,
  Scale,
  Calculator,
  GraduationCap,
  Newspaper,
  Headphones,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { useApp, NavigationTab } from '../../context/AppContext';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const { setActiveTab, lang } = useApp();

  if (!isOpen) return null;

  const handleNav = (tab: NavigationTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 z-40 w-full border-b border-stone-200 bg-white/98 shadow-2xl backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/98 animate-in fade-in duration-150"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Tractors & Agricultural Machinery */}
          <div>
            <div className="flex items-center space-x-2 border-b border-stone-200 pb-2.5 dark:border-stone-800 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Tractor className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                {lang === 'hi' ? 'ट्रैक्टर व कृषि उपकरण' : 'Tractors & Machinery'}
              </h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('equipment')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <span className="font-semibold">{lang === 'hi' ? 'नए इलेक्ट्रिक ट्रैक्टर (New EV Tractors)' : 'New Electric Tractors'}</span>
                  <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-bold dark:bg-stone-800">40-60 HP</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('equipment')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <div className="flex items-center space-x-1.5">
                    <Zap className="h-3.5 w-3.5 text-teal-600 fill-teal-600" />
                    <span className="font-semibold text-teal-700 dark:text-teal-400">
                      {lang === 'hi' ? '100% EV ट्रैक्टर (4WD High-Torque)' : '100% EV Tractors'}
                    </span>
                  </div>
                  <span className="rounded-md bg-teal-100 text-teal-800 px-1.5 py-0.5 text-[10px] font-bold dark:bg-teal-950 dark:text-teal-300">
                    ZERO DIESEL
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('buy_sell')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <span>{lang === 'hi' ? 'पुराने इलेक्ट्रिक ट्रैक्टर (Used EV Tractors)' : 'Used EV Tractors'}</span>
                  <span className="text-xs text-emerald-600 font-bold">{lang === 'hi' ? 'प्रमाणित बैटरी' : 'Battery Tested'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('equipment')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">{lang === 'hi' ? '🌾 100% EV कंबाइन हार्वेस्टर' : 'Electric Harvesters'}</span>
                  <span className="rounded-md bg-emerald-100 text-emerald-800 px-1.5 py-0.5 text-[10px] font-bold dark:bg-emerald-950 dark:text-emerald-300">120 kWh</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('equipment')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <span>{lang === 'hi' ? '🚜 इलेक्ट्रिक पावर टिलर (Power Tillers)' : 'Electric Power Tillers'}</span>
                  <span className="text-[10px] font-bold text-amber-600">15 HP EV</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('equipment')}
                  className="w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  {lang === 'hi' ? '💧 इलेक्ट्रिक बूम व बैटरी स्प्रेयर (Sprayers)' : 'Electric Sprayers'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('equipment')}
                  className="w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  {lang === 'hi' ? '⚙️ रोटावेटर, कल्टीवेटर व सुपर सीडर' : 'Rotavators & Super Seeders'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('equipment')}
                  className="w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  {lang === 'hi' ? '🔋 कुट्टी मशीन, बेलर, थ्रेशर व सोलर ट्रॉली' : 'Chaff Cutters, Balers & Threshers'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('equipment')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <span>{lang === 'hi' ? '🚁 कृषि स्प्रेयर ड्रोन (Agri Drones)' : 'Agri Drones'}</span>
                  <span className="rounded-md bg-purple-100 text-purple-800 px-1.5 py-0.5 text-[10px] font-bold dark:bg-purple-950 dark:text-purple-300">
                    50% SUBSIDY
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('equipment')}
                  className="w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  {lang === 'hi' ? '☀️ सोलर पंप व सिंचाई यंत्र (Solar Pumps)' : 'Solar Pumps & Irrigation'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Mandi, Schemes & Marketplace */}
          <div>
            <div className="flex items-center space-x-2 border-b border-stone-200 pb-2.5 dark:border-stone-800 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                <TrendingUp className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                {lang === 'hi' ? 'मंडी, योजनाएं व बाजार' : 'Mandi & Schemes'}
              </h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('mandi')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {lang === 'hi' ? 'दैनिक मंडी भाव (Live Mandi Bhav)' : 'Live Mandi Prices'}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-sm font-bold">
                    LIVE
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('schemes')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <span className="font-semibold">{lang === 'hi' ? 'सरकारी योजनाएं (Govt Schemes)' : 'Government Schemes'}</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-sm font-bold">
                    PM-KISAN
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('buy_sell')}
                  className="w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  {lang === 'hi' ? 'खरीद और बिक्री (Buy & Sell Marketplace)' : 'Buy & Sell Marketplace'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('seeds_fertilizers')}
                  className="w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  {lang === 'hi' ? 'प्रमाणित बीज व नैनो यूरिया (Seeds & Fertilizers)' : 'Certified Seeds & Fertilizers'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('compare')}
                  className="flex items-center space-x-1.5 text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1 font-semibold"
                >
                  <Scale className="h-3.5 w-3.5 text-amber-500" />
                  <span>{lang === 'hi' ? 'ट्रैक्टर तुलना इंजन (Tractor Comparison)' : 'Tractor Compare Engine'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Crop Info, Diseases & Weather */}
          <div>
            <div className="flex items-center space-x-2 border-b border-stone-200 pb-2.5 dark:border-stone-800 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                <CloudSun className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-white">
                {lang === 'hi' ? 'फसल परामर्श व मौसम' : 'Crop & Weather Advisory'}
              </h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('weather')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <span className="font-semibold">{lang === 'hi' ? 'जिला मौसम पूर्वानुमान (Weather & Alert)' : 'District Weather Forecast'}</span>
                  <span className="text-[10px] text-amber-600 font-bold">5 DAY</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('crop_info')}
                  className="w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1 font-semibold"
                >
                  {lang === 'hi' ? 'रबी, खरीफ व जायद फसल गाइड' : 'Rabi, Kharif & Zaid Crop Guide'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('crop_diseases')}
                  className="flex items-center justify-between w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  <div className="flex items-center space-x-1.5">
                    <Bug className="h-3.5 w-3.5 text-rose-500" />
                    <span className="text-rose-700 dark:text-rose-400 font-semibold">
                      {lang === 'hi' ? 'फसल रोग डॉक्टर (Disease Doctor)' : 'Crop Disease Diagnosis'}
                    </span>
                  </div>
                  <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-sm font-bold">
                    REMEDIES
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('training')}
                  className="w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  {lang === 'hi' ? 'कृषि प्रशिक्षण व ड्रोन कोर्स (Agri Training)' : 'Agri Training & Courses'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('news')}
                  className="w-full text-left text-stone-600 hover:text-emerald-600 dark:text-stone-300 dark:hover:text-emerald-400 py-1"
                >
                  {lang === 'hi' ? 'दैनिक कृषि समाचार (Agri News & MSP)' : 'Daily Agri News & MSP'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Calculators & Kisan Sahayata Spotlight */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 p-5 dark:from-stone-800 dark:to-stone-800 border border-emerald-100 dark:border-stone-700 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2">
                <Calculator className="h-4 w-4" />
                <span>{lang === 'hi' ? '12+ किसान कैलकुलेटर' : '12+ Farming Calculators'}</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                {lang === 'hi'
                  ? 'बीज दर, एनपीके खाद, बीघा से एकड़, ट्रैक्टर लोन ईएमआई और सिंचाई लागत की सटीक गणना करें।'
                  : 'Calculate seed rate, NPK fertilizer dose, land area converter and tractor EMI in seconds.'}
              </p>
              <button
                onClick={() => handleNav('calculators')}
                className="mt-3 inline-flex items-center space-x-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition-colors"
              >
                <span>{lang === 'hi' ? 'सभी कैलकुलेटर खोलें' : 'Open Calculators'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-5 border-t border-emerald-200/60 dark:border-stone-700 pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-800 dark:text-white">
                  📞 {lang === 'hi' ? 'किसान कॉल सेंटर' : 'Kisan Helpline'}
                </span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">1800-180-1551</span>
              </div>
              <button
                onClick={() => handleNav('kisan_sahayata')}
                className="mt-2 w-full text-center rounded-lg bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold py-1.5 text-xs transition-colors"
              >
                {lang === 'hi' ? 'किसान सहायता केंद्र (Kisan Sahayata)' : 'Kisan Assistance Hub'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
