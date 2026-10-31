import React, { useState } from 'react';
import { MapPin, Check, X, Compass, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INDIAN_STATES_DISTRICTS } from '../../data/mockData';

export const DistrictModal: React.FC = () => {
  const {
    location,
    setLocation,
    isLocationModalOpen,
    setIsLocationModalOpen,
    lang,
    playTTS,
  } = useApp();

  const [selectedState, setSelectedState] = useState(location.state);
  const [selectedDistrict, setSelectedDistrict] = useState(location.district);
  const [selectedBlock, setSelectedBlock] = useState(location.block || '');
  const [isLocating, setIsLocating] = useState(false);
  const [geoNotice, setGeoNotice] = useState<string | null>(null);

  if (!isLocationModalOpen) return null;

  const states = Object.keys(INDIAN_STATES_DISTRICTS);
  const districts = INDIAN_STATES_DISTRICTS[selectedState] || [];

  const handleStateChange = (newState: string) => {
    setSelectedState(newState);
    const newDistricts = INDIAN_STATES_DISTRICTS[newState] || [];
    if (newDistricts.length > 0) {
      setSelectedDistrict(newDistricts[0]);
    }
  };

  const handleSave = () => {
    const newLoc = {
      state: selectedState,
      district: selectedDistrict,
      block: selectedBlock.trim() || 'मुख्य ब्लॉक',
    };
    setLocation(newLoc);
    setIsLocationModalOpen(false);

    const confirmationMsg =
      lang === 'hi'
        ? `आपका स्थान ${newLoc.district}, ${newLoc.state} सेट हो गया है। अब मंडी भाव और मौसम आपके क्षेत्र के अनुसार दिखेगा।`
        : `Location set to ${newLoc.district}, ${newLoc.state}. Mandi and weather are now personalized for you.`;

    playTTS(confirmationMsg, lang === 'hi' ? 'स्थान अपडेट' : 'Location Updated');
  };

  const handleUseGPS = () => {
    if (!navigator.geolocation) {
      setGeoNotice(lang === 'hi' ? 'ब्राउज़र में जीपीएस सुविधा समर्थित नहीं है।' : 'Geolocation not supported by browser.');
      return;
    }
    setIsLocating(true);
    setGeoNotice(lang === 'hi' ? 'जीपीएस स्थान जांच रहे हैं...' : 'Checking GPS location...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        // Set standard prominent agricultural hub matching latitude
        const lat = pos.coords.latitude;
        if (lat > 28.5) {
          setSelectedState('Haryana');
          setSelectedDistrict('Karnal');
          setSelectedBlock('Gharaunda');
        } else if (lat > 26.5) {
          setSelectedState('Uttar Pradesh');
          setSelectedDistrict('Meerut');
          setSelectedBlock('Daurala');
        } else if (lat > 24) {
          setSelectedState('Rajasthan');
          setSelectedDistrict('Kota');
          setSelectedBlock('Ladpura');
        } else {
          setSelectedState('Madhya Pradesh');
          setSelectedDistrict('Indore');
          setSelectedBlock('Sanwer');
        }
        setGeoNotice(lang === 'hi' ? 'जीपीएस से निकटतम कृषि क्षेत्र पहचाना गया।' : 'Nearest farming hub detected via GPS.');
      },
      (err) => {
        setIsLocating(false);
        setGeoNotice(lang === 'hi' ? `जीपीएस अनुमति अस्वीकार: ${err.message}. कृपया नीचे से जिला चुनें।` : `GPS denied: ${err.message}. Please select district manually.`);
      },
      { timeout: 8000 }
    );
  };

  const popularDistricts = [
    { state: 'Haryana', district: 'Karnal', label: 'करनाल (हरियाणा)' },
    { state: 'Uttar Pradesh', district: 'Meerut', label: 'मेरठ (उत्तर प्रदेश)' },
    { state: 'Madhya Pradesh', district: 'Indore', label: 'इंदौर (मध्य प्रदेश)' },
    { state: 'Rajasthan', district: 'Kota', label: 'कोटा (राजस्थान)' },
    { state: 'Punjab', district: 'Ludhiana', label: 'लुधियाना (पंजाब)' },
    { state: 'Maharashtra', district: 'Nashik', label: 'नासिक (महाराष्ट्र)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
          <div className="flex items-center space-x-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-stone-950 font-bold shadow-xs">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                {lang === 'hi' ? 'अपना राज्य, जिला व ब्लॉक चुनें' : 'Select State, District & Block'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {lang === 'hi'
                  ? 'मंडी भाव, मौसम अलर्ट व सरकारी योजनाओं के व्यक्तिगत विवरण के लिए'
                  : 'Personalizes Mandi bhav, weather warnings & local schemes'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* GPS Button */}
        <div className="mt-4">
          <button
            onClick={handleUseGPS}
            disabled={isLocating}
            className="flex w-full items-center justify-center space-x-2 rounded-xl border border-dashed border-emerald-500 bg-emerald-50/70 p-3 text-sm font-bold text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300 transition-colors"
          >
            <Compass className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>
              {isLocating
                ? (lang === 'hi' ? 'स्थान खोज रहे हैं...' : 'Detecting GPS...')
                : (lang === 'hi' ? 'मेरे वर्तमान स्थान का उपयोग करें (GPS अनुमति से)' : 'Use Current Location (With GPS Permission)')}
            </span>
          </button>
          {geoNotice && (
            <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-300 text-center font-medium">
              {geoNotice}
            </p>
          )}
        </div>

        {/* Popular agricultural districts */}
        <div className="mt-4">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            {lang === 'hi' ? 'लोकप्रिय कृषि जिले:' : 'Popular Farming Districts:'}
          </label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {popularDistricts.map((item, idx) => {
              const isSelected = selectedDistrict === item.district && selectedState === item.state;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedState(item.state);
                    setSelectedDistrict(item.district);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns */}
        <div className="mt-5 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              {lang === 'hi' ? '1. राज्य चुनें (Select State)' : '1. Select State'}
            </label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-sm font-semibold text-stone-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              {lang === 'hi' ? '2. जिला चुनें (Select District)' : '2. Select District'}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-sm font-semibold text-stone-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
            >
              {districts.map((dst) => (
                <option key={dst} value={dst}>
                  {dst}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              {lang === 'hi' ? '3. तहसील / ब्लॉक (वैकल्पिक)' : '3. Block / Tehsil (Optional)'}
            </label>
            <input
              type="text"
              placeholder={lang === 'hi' ? 'उदा. घरौंडा, दौराला, लाडपुरा...' : 'e.g. Gharaunda, Daurala...'}
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
            />
          </div>
        </div>

        {/* Current Selection summary */}
        <div className="mt-4 rounded-xl bg-amber-50 p-2.5 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 flex items-center space-x-2">
          <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-600" />
          <span>
            {lang === 'hi' ? 'चुना गया क्षेत्र: ' : 'Selected Area: '}
            <strong>{selectedDistrict}, {selectedState}</strong>
          </span>
        </div>

        {/* Footer buttons */}
        <div className="mt-5 flex items-center justify-end space-x-3 border-t border-stone-100 pt-4 dark:border-stone-800">
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
          >
            <Check className="h-4 w-4" />
            <span>{lang === 'hi' ? 'स्थान सहेजें' : 'Save Location'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
