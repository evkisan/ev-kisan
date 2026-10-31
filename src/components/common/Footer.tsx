import React from 'react';
import {
  Tractor,
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  ExternalLink,
  Heart,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, lang } = useApp();

  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-900 text-stone-300 dark:border-stone-800 dark:bg-stone-950 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-amber-300 font-black shadow-md">
                <span className="text-xl font-black">EV</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-black text-white">EV</span>
                <span className="text-2xl font-black text-amber-400">KISAN</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {lang === 'hi'
                ? 'ईवी किसान (EV Kisan) भारत का अग्रणी कृषि सुपर प्लेटफॉर्म है। नए व पुराने ट्रैक्टर की खोज व तुलना, मंडी भाव, सरकारी योजनाएं, मौसम अलर्ट, फसल रोग पहचान और 12+ किसान कैलकुलेटर अब एक ही जगह पर।'
                : 'EV Kisan is India’s comprehensive agricultural discovery platform. Discover tractors, compare farm machinery, track live mandi bhav, access government schemes, and farmer support.'}
            </p>

            <div className="flex items-center space-x-2 rounded-xl bg-stone-800/80 p-3 text-xs text-stone-300 border border-stone-700">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>
                {lang === 'hi'
                  ? 'सत्यापित कृषि जानकारी – सभी आंकड़े भारत सरकार, आईसीएआर एवं अधिकृत मंडी बोर्डों से प्रमाणित हैं।'
                  : 'Verified Agricultural Data – Sources grounded in Govt of India, ICAR & APMC Mandi Boards.'}
              </span>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3 border-b border-stone-800 pb-2">
              {lang === 'hi' ? 'ट्रैक्टर व बाजार' : 'Machinery & Market'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('equipment')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? 'नए ट्रैक्टर खोजें' : 'New Tractors'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('equipment')}
                  className="hover:text-teal-400 text-teal-300 font-semibold transition-colors"
                >
                  {lang === 'hi' ? 'इलेक्ट्रिक ट्रैक्टर (EV Tractors)' : 'Electric Tractors'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('buy_sell')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? 'पुराने ट्रैक्टर की खरीद-बिक्री' : 'Used Tractors Marketplace'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('compare')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? 'ट्रैक्टर तुलना इंजन' : 'Tractor Comparison Engine'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('seeds_fertilizers')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? 'प्रमाणित बीज व नैनो खाद' : 'Certified Seeds & Fertilizer'}
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3 border-b border-stone-800 pb-2">
              {lang === 'hi' ? 'किसान सेवाएं' : 'Farmer Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('mandi')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? 'दैनिक मंडी भाव (Mandi Bhav)' : 'Live Mandi Prices'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? 'सरकारी योजनाएं व सब्सिडी' : 'Govt Schemes & Subsidies'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('weather')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? 'मौसम व कृषि एडवाइजरी' : 'Weather & Crop Advisory'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('crop_diseases')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? 'फसल रोग व जैविक उपचार' : 'Crop Disease Diagnosis'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('calculators')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? '12+ कृषि कैलकुलेटर' : '12+ Farming Calculators'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('training')}
                  className="hover:text-amber-400 transition-colors"
                >
                  {lang === 'hi' ? 'ड्रोन व जैविक खेती कोर्स' : 'Agri Training & Courses'}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Helplines */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3 border-b border-stone-800 pb-2">
              {lang === 'hi' ? 'सहायता व संपर्क' : 'Helpline & Contact'}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] uppercase text-stone-500 font-bold block">
                  {lang === 'hi' ? 'किसान कॉल सेंटर (भारत सरकार)' : 'Kisan Call Centre (GoI)'}
                </span>
                <span className="text-sm font-bold text-amber-400">1800-180-1551</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-500 font-bold block">
                  {lang === 'hi' ? 'ईवी किसान हेल्पलाइन' : 'EV Kisan Support'}
                </span>
                <span className="text-xs text-stone-300">support@evkisan.in</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-stone-500 font-bold block">
                  {lang === 'hi' ? 'आधिकारिक पोर्टल लिंक' : 'Official Portals'}
                </span>
                <div className="flex flex-col space-y-1 text-stone-400">
                  <a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 inline-flex items-center space-x-1">
                    <span>pmkisan.gov.in</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a href="https://agmarknet.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-400 inline-flex items-center space-x-1">
                    <span>agmarknet.gov.in</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} EV Kisan Platform. {lang === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>{lang === 'hi' ? 'किसानों के प्रति समर्पित' : 'Dedicated to Indian Farmers'}</span>
            <span>•</span>
            <span className="text-amber-400">Green & Clean Electric Farming</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
