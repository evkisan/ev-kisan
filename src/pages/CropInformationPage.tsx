import React, { useState } from 'react';
import {
  Sprout,
  Search,
  Volume2,
  Calendar,
  Layers,
  Thermometer,
  Droplets,
  Award,
  ShieldAlert,
  Printer,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CropGuide } from '../types';

export const CropInformationPage: React.FC = () => {
  const { crops, lang, playTTS } = useApp();
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [searchCrop, setSearchCrop] = useState<string>('');
  const [expandedCropId, setExpandedCropId] = useState<string>('crop-1');

  const filteredCrops = crops.filter((c) => {
    const matchesSeason = selectedSeason === 'all' || c.season.toLowerCase() === selectedSeason.toLowerCase();
    const matchesSearch =
      c.name.toLowerCase().includes(searchCrop.toLowerCase()) ||
      c.nameHi.toLowerCase().includes(searchCrop.toLowerCase());
    return matchesSeason && matchesSearch;
  });

  const handleListenCrop = (crop: CropGuide) => {
    const text =
      lang === 'hi'
        ? `${crop.nameHi} की खेती गाइड। सीजन: ${crop.season}। बुवाई का सही समय: ${crop.sowingTime}। बीज दर: ${crop.seedRate}। सिंचाई: ${crop.irrigationSchedule}। खाद व उर्वरक: ${crop.fertilizerDose}। अनुमानित पैदावार: ${crop.expectedYield}।`
        : `${crop.name} Farming Guide. Season: ${crop.season}. Sowing Time: ${crop.sowingTime}. Seed Rate: ${crop.seedRate}. Expected Yield: ${crop.expectedYield}.`;
    playTTS(text, `${crop.name} Guide`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-green-900 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <Sprout className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'भारतीय कृषि अनुसंधान परिषद (ICAR) प्रमाणित' : 'ICAR Grounded Crop Science'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi' ? 'फसल जानकारी व उत्पादन गाइड' : 'Crop Cultivation & Yield Guide'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? 'रबी, खरीफ व जायद फसलों की बुवाई से लेकर कटाई तक का पूरा वैज्ञानिक विवरण: बीज दर, खाद की मात्रा, सिंचाई अंतराल व बंपर पैदावार के उपाय।'
              : 'End-to-end agronomic guides covering sowing windows, seed rates, fertilizer doses, and irrigation intervals for major Indian crops.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={searchCrop}
            onChange={(e) => setSearchCrop(e.target.value)}
            placeholder={lang === 'hi' ? 'फसल का नाम खोजें (गेहूं, धान, सरसों...)' : 'Search crop (Wheat, Paddy, Mustard...)'}
            className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-stone-900 focus:border-emerald-600 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs font-bold">
          {[
            { id: 'all', label: lang === 'hi' ? 'सभी फसलें' : 'All Crops' },
            { id: 'Rabi', label: lang === 'hi' ? 'रबी (Rabi - गेहूं, सरसों)' : 'Rabi' },
            { id: 'Kharif', label: lang === 'hi' ? 'खरीफ (Kharif - धान, सोयाबीन)' : 'Kharif' },
            { id: 'Zaid', label: lang === 'hi' ? 'जायद (Zaid - तरबूज, मूंग)' : 'Zaid' },
          ].map((season) => (
            <button
              key={season.id}
              onClick={() => setSelectedSeason(season.id)}
              className={`rounded-xl px-3.5 py-2 transition-colors ${
                selectedSeason === season.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {season.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crop Cards List */}
      <div className="space-y-6">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-stone-900"
          >
            {/* Top row with photo, basic stats & audio button */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border-b border-stone-100 dark:border-stone-800">
              <div className="md:col-span-1">
                <img
                  src={crop.imageUrl}
                  alt={crop.name}
                  className="h-44 w-full rounded-2xl object-cover"
                />
              </div>

              <div className="md:col-span-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        सीजन: {crop.season}
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">
                        अवधि: {crop.durationDays}
                      </span>
                    </div>

                    <button
                      onClick={() => handleListenCrop(crop)}
                      className="flex items-center space-x-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 transition-colors"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>{lang === 'hi' ? 'गाइड सुनें' : 'Listen'}</span>
                    </button>
                  </div>

                  <h2 className="mt-2 text-2xl font-black text-stone-900 dark:text-white">
                    {lang === 'hi' ? crop.nameHi : crop.name}
                  </h2>

                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="rounded-xl bg-stone-50 p-2 dark:bg-stone-800">
                      <span className="text-stone-400 text-[10px] block">बुवाई समय</span>
                      <strong className="text-stone-800 dark:text-stone-200">{crop.sowingTime}</strong>
                    </div>
                    <div className="rounded-xl bg-stone-50 p-2 dark:bg-stone-800">
                      <span className="text-stone-400 text-[10px] block">बीज दर</span>
                      <strong className="text-stone-800 dark:text-stone-200">{crop.seedRate}</strong>
                    </div>
                    <div className="rounded-xl bg-stone-50 p-2 dark:bg-stone-800">
                      <span className="text-stone-400 text-[10px] block">तापमान</span>
                      <strong className="text-stone-800 dark:text-stone-200">{crop.temperatureRange}</strong>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-2 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold">
                      <span className="text-emerald-700 dark:text-emerald-400 text-[10px] block">अनुमानित पैदावार</span>
                      <strong>{crop.expectedYield}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* In-depth Cultivation Breakdown */}
            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Soil & Irrigation */}
                <div className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800 space-y-2">
                  <h4 className="font-bold text-stone-900 dark:text-white text-sm flex items-center space-x-1.5">
                    <Droplets className="h-4 w-4 text-sky-600" />
                    <span>{lang === 'hi' ? 'मिट्टी का चुनाव व सिंचाई प्रबंधन' : 'Soil & Irrigation'}</span>
                  </h4>
                  <div className="text-stone-600 dark:text-stone-300 space-y-1">
                    <p><strong>उपयुक्त मिट्टी:</strong> {crop.soilType}</p>
                    <p><strong>सिंचाई का समय:</strong> {crop.irrigationSchedule}</p>
                  </div>
                </div>

                {/* Fertilizers & Nutrients */}
                <div className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800 space-y-2">
                  <h4 className="font-bold text-stone-900 dark:text-white text-sm flex items-center space-x-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>{lang === 'hi' ? 'संतुलित खाद व उर्वरक डोज (NPK)' : 'Fertilizer Dose'}</span>
                  </h4>
                  <p className="text-stone-600 dark:text-stone-300">
                    {crop.fertilizerDose}
                  </p>
                </div>
              </div>

              {/* Best Practices */}
              <div className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                <h4 className="font-bold text-stone-900 dark:text-white text-sm mb-2">
                  💡 {lang === 'hi' ? 'बंपर पैदावार के लिए 4 मुख्य वैज्ञानिक सूत्र:' : 'Scientific Best Practices:'}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700 dark:text-stone-300">
                  {crop.bestPractices.map((bp, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
