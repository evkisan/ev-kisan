import React, { useState } from 'react';
import {
  Bug,
  Search,
  Volume2,
  AlertTriangle,
  Leaf,
  FlaskConical,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CropDisease } from '../types';

export const CropDiseasesPage: React.FC = () => {
  const { diseases, lang, playTTS } = useApp();
  const [searchDisease, setSearchDisease] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');

  const filteredDiseases = diseases.filter((d) => {
    const matchesCrop = selectedCrop === 'all' || d.cropName.toLowerCase().includes(selectedCrop.toLowerCase());
    const matchesSearch =
      d.diseaseName.toLowerCase().includes(searchDisease.toLowerCase()) ||
      d.diseaseNameHi.toLowerCase().includes(searchDisease.toLowerCase()) ||
      d.symptoms.toLowerCase().includes(searchDisease.toLowerCase()) ||
      d.symptomsHi.toLowerCase().includes(searchDisease.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  const handleListenDisease = (d: CropDisease) => {
    const text =
      lang === 'hi'
        ? `${d.cropName} में ${d.diseaseNameHi}। लक्षण: ${d.symptomsHi}। जैविक उपचार: ${d.organicRemedy}। रासायनिक उपचार: ${d.chemicalRemedy}। बचाव: ${d.preventiveMeasures}।`
        : `${d.diseaseName} in ${d.cropName}. Symptoms: ${d.symptoms}. Organic remedy: ${d.organicRemedy}. Chemical treatment: ${d.chemicalRemedy}.`;
    playTTS(text, d.diseaseNameHi);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-900 via-red-900 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-rose-300 backdrop-blur-md">
            <Bug className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'फसल रोग डॉक्टर व डिजिटल निदान' : 'Digital Crop Disease Doctor'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi' ? 'फसल रोग, कीट व उनका सटीक उपचार' : 'Crop Disease Diagnosis & Remedies'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? 'लक्षण पहचानें और सही समय पर जैविक व रासायनिक उपचार अपनाएं। पीला रतुआ, माहू कीट, झुलसा और तना छेदक के लिए अनुमोदित वैज्ञानिक समाधान।'
              : 'Identify symptoms early and apply calibrated organic or chemical solutions to save crop yields.'}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={searchDisease}
            onChange={(e) => setSearchDisease(e.target.value)}
            placeholder={lang === 'hi' ? 'लक्षण या रोग का नाम खोजें (पीला रतुआ, धब्बे...)' : 'Search symptom or disease...'}
            className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-stone-900 focus:border-rose-600 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 text-xs font-bold">
          {[
            { id: 'all', label: lang === 'hi' ? 'सभी रोग' : 'All Diseases' },
            { id: 'Wheat', label: lang === 'hi' ? 'गेहूं के रोग' : 'Wheat' },
            { id: 'Paddy', label: lang === 'hi' ? 'धान के रोग' : 'Paddy' },
            { id: 'Mustard', label: lang === 'hi' ? 'सरसों के रोग' : 'Mustard' },
            { id: 'Tomato', label: lang === 'hi' ? 'टमाटर व आलू' : 'Tomato / Potato' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCrop(c.id)}
              className={`rounded-xl px-3.5 py-2 transition-colors ${
                selectedCrop === c.id
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDiseases.map((d) => (
          <div
            key={d.id}
            className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                      {d.cropName}
                    </span>
                    {d.urgency === 'high' && (
                      <span className="rounded-md bg-rose-100 px-2 py-0.5 text-[11px] font-black text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                        गंभीर रोग (High Urgency)
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1.5 text-lg font-black text-stone-900 dark:text-white">
                    {lang === 'hi' ? d.diseaseNameHi : d.diseaseName}
                  </h3>
                </div>

                <button
                  onClick={() => handleListenDisease(d)}
                  className="flex items-center space-x-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 px-2.5 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 transition-colors shrink-0"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>{lang === 'hi' ? 'सुनें' : 'Audio'}</span>
                </button>
              </div>

              {/* Symptoms */}
              <div className="mt-4 rounded-2xl bg-amber-50/70 p-3.5 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40">
                <strong className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-amber-800 dark:text-amber-400">
                  🔍 रोग के लक्षण (Symptoms):
                </strong>
                <p className="leading-relaxed">
                  {lang === 'hi' ? d.symptomsHi : d.symptoms}
                </p>
              </div>

              {/* Remedies Grid */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Organic */}
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-3.5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                  <div className="flex items-center space-x-1.5 text-emerald-800 dark:text-emerald-300 font-bold mb-1.5">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                    <span>{lang === 'hi' ? 'जैविक उपचार (Organic)' : 'Organic Treatment'}</span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                    {d.organicRemedy}
                  </p>
                </div>

                {/* Chemical */}
                <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-3.5 dark:border-blue-900/50 dark:bg-blue-950/20">
                  <div className="flex items-center space-x-1.5 text-blue-800 dark:text-blue-300 font-bold mb-1.5">
                    <FlaskConical className="h-4 w-4 text-blue-600" />
                    <span>{lang === 'hi' ? 'रासायनिक उपचार (Chemical)' : 'Chemical Solution'}</span>
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-semibold">
                    {d.chemicalRemedy}
                  </p>
                </div>
              </div>

              {/* Prevention */}
              <div className="mt-3 text-xs text-stone-600 dark:text-stone-400">
                <strong>🛡️ रोकथाम व सावधानी:</strong> {d.preventiveMeasures}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
