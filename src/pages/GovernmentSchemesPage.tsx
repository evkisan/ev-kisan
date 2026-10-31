import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  Calendar,
  CheckCircle,
  ExternalLink,
  Volume2,
  FileText,
  Search,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GovtScheme } from '../types';

export const GovernmentSchemesPage: React.FC = () => {
  const { schemes, lang, playTTS } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>('sch-1');

  const filteredSchemes = schemes.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'subsidy') return matchesSearch && s.subsidyPercentage.includes('Subsidy');
    if (selectedCategory === 'income') return matchesSearch && s.id === 'sch-1';
    if (selectedCategory === 'insurance') return matchesSearch && s.id === 'sch-4';
    if (selectedCategory === 'loan') return matchesSearch && s.id === 'sch-5';
    return matchesSearch;
  });

  const handleListenScheme = (scheme: GovtScheme) => {
    const speech =
      lang === 'hi'
        ? `${scheme.titleHi}। विभाग: ${scheme.departmentHi}। अधिकतम लाभ: ${scheme.maxBenefit}। मुख्य लाभ: ${scheme.keyBenefits.join('। ')}। आवेदन अंतिम तिथि: ${scheme.applicationDeadline}।`
        : `${scheme.title}. Department: ${scheme.department}. Maximum Benefit: ${scheme.maxBenefit}. Key Benefits: ${scheme.keyBenefits.join('. ')}. Deadline: ${scheme.applicationDeadline}.`;
    playTTS(speech, scheme.title);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <Landmark className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'सत्यापित सरकारी योजनाएं' : 'Verified Government Schemes'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi'
              ? 'सरकारी योजनाएं व कृषि सब्सिडी पोर्टल'
              : 'Government Agriculture Schemes & Subsidies'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? 'पीएम-किसान, कृषि यंत्रीकरण (SMAM ट्रैक्टर सब्सिडी), पीएम-कुसुम सोलर पंप और फसल बीमा योजना के पात्रता नियम, आवश्यक दस्तावेज और सीधे आधिकारिक आवेदन लिंक।'
              : 'Direct links to official government application portals, document checklists and eligibility criteria for Indian farmers.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'hi' ? 'योजना या विभाग का नाम खोजें...' : 'Search scheme or ministry...'}
            className="w-full rounded-2xl border border-stone-200 bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-stone-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs font-bold w-full sm:w-auto">
          {[
            { id: 'all', label: lang === 'hi' ? 'सभी योजनाएं' : 'All Schemes' },
            { id: 'subsidy', label: lang === 'hi' ? 'यंत्र व सोलर सब्सिडी' : 'Machinery Subsidy' },
            { id: 'income', label: lang === 'hi' ? 'नकद सम्मान निधि' : 'Cash DBT' },
            { id: 'insurance', label: lang === 'hi' ? 'फसल बीमा' : 'Crop Insurance' },
            { id: 'loan', label: lang === 'hi' ? 'किसान ऋण (KCC)' : 'KCC Loan' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-xl px-3 py-2 transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes List */}
      <div className="space-y-6">
        {filteredSchemes.map((scheme) => {
          const isExpanded = expandedSchemeId === scheme.id;
          return (
            <div
              key={scheme.id}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-stone-900 transition-all"
            >
              {/* Header Box */}
              <div className="p-5 sm:p-6 border-b border-stone-100 dark:border-stone-800 bg-gradient-to-r from-stone-50/60 to-white dark:from-stone-800/40 dark:to-stone-900">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[11px] font-black text-blue-900 dark:bg-blue-950 dark:text-blue-300 uppercase">
                        {scheme.category === 'central' ? 'केंद्रीय योजना (Central)' : 'राज्य योजना'}
                      </span>
                      <span className="text-xs text-stone-500 font-semibold">
                        {lang === 'hi' ? scheme.departmentHi : scheme.department}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white">
                      {lang === 'hi' ? scheme.titleHi : scheme.title}
                    </h2>
                  </div>

                  {/* Benefit Pill & Audio Button */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => handleListenScheme(scheme)}
                      className="flex items-center space-x-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 px-3 py-2 text-xs font-bold text-amber-800 dark:text-amber-300 transition-colors"
                      title="Listen scheme guide in Hindi"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>{lang === 'hi' ? 'योजना सुनें' : 'Listen'}</span>
                    </button>

                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors"
                    >
                      <span>{lang === 'hi' ? 'आधिकारिक पोर्टल पर जाएं' : 'Official Portal'}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Quick Benefit Highlights */}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50">
                    <span className="font-bold block text-[10px] uppercase text-emerald-700 dark:text-emerald-400">
                      {lang === 'hi' ? 'सब्सिडी / वित्तीय लाभ:' : 'Max Subsidy:'}
                    </span>
                    <strong className="text-sm font-black">{scheme.maxBenefit}</strong>
                  </div>

                  <div className="rounded-xl bg-stone-100 p-2.5 text-stone-800 dark:bg-stone-800 dark:text-stone-200">
                    <span className="font-bold block text-[10px] uppercase text-stone-500">
                      {lang === 'hi' ? 'सब्सिडी दर:' : 'Subsidy Percentage:'}
                    </span>
                    <strong className="text-sm font-black">{scheme.subsidyPercentage}</strong>
                  </div>

                  <div className="rounded-xl bg-amber-50 p-2.5 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-100 dark:border-amber-900/50">
                    <span className="font-bold block text-[10px] uppercase text-amber-700 dark:text-amber-400">
                      {lang === 'hi' ? 'आवेदन अंतिम तिथि:' : 'Application Deadline:'}
                    </span>
                    <strong className="text-sm font-black">{scheme.applicationDeadline}</strong>
                  </div>
                </div>
              </div>

              {/* Collapsible Details */}
              <div className="p-5 sm:p-6 space-y-5">
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {lang === 'hi' ? scheme.descriptionHi : scheme.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                  {/* Key Benefits */}
                  <div className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800">
                    <h4 className="font-bold text-stone-900 dark:text-white mb-2.5 flex items-center space-x-1.5 text-sm">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span>{lang === 'hi' ? 'प्रमुख फायदे' : 'Key Benefits'}</span>
                    </h4>
                    <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                      {scheme.keyBenefits.map((b, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Eligibility Criteria */}
                  <div className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800">
                    <h4 className="font-bold text-stone-900 dark:text-white mb-2.5 flex items-center space-x-1.5 text-sm">
                      <HelpCircle className="h-4 w-4 text-blue-500" />
                      <span>{lang === 'hi' ? 'पात्रता की शर्तें' : 'Eligibility Criteria'}</span>
                    </h4>
                    <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                      {scheme.eligibilityCriteria.map((c, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="font-bold text-blue-600">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents */}
                  <div className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800">
                    <h4 className="font-bold text-stone-900 dark:text-white mb-2.5 flex items-center space-x-1.5 text-sm">
                      <FileText className="h-4 w-4 text-purple-500" />
                      <span>{lang === 'hi' ? 'आवश्यक दस्तावेज' : 'Required Documents'}</span>
                    </h4>
                    <ul className="space-y-2 text-stone-600 dark:text-stone-300">
                      {scheme.documentsRequired.map((doc, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="font-bold text-purple-600">📄</span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Application Steps */}
                <div className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                  <h4 className="font-bold text-stone-900 dark:text-white mb-2 text-xs uppercase tracking-wider">
                    {lang === 'hi' ? 'आवेदन की 5 आसान प्रक्रिया (Application Steps):' : 'Application Steps:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                    {scheme.applicationSteps.map((step, idx) => (
                      <div key={idx} className="rounded-xl bg-white p-2.5 dark:bg-stone-800 border border-stone-100 dark:border-stone-700">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300 mb-1">
                          {idx + 1}
                        </span>
                        <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-tight">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Source Tag */}
                <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>{scheme.verifiedSource}</span>
                  </div>
                  <span>अंतिम सत्यापन: {scheme.lastUpdated}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
