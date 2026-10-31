import React, { useState } from 'react';
import {
  Newspaper,
  Calendar,
  Clock,
  ExternalLink,
  Volume2,
  ShieldCheck,
  Share2,
  PenTool,
  PlusCircle,
  Edit3,
  Globe,
  Sparkles,
  Tag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NewsArticle } from '../types';
import { WordPressAuthorPanel } from '../components/news/WordPressAuthorPanel';

export const AgricultureNewsPage: React.FC = () => {
  const { news, lang, playTTS, currentUser } = useApp();
  const [viewMode, setViewMode] = useState<'feed' | 'author_panel'>('feed');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleListenNews = (item: NewsArticle) => {
    const text =
      lang === 'hi'
        ? `${item.titleHi}। ${item.summaryHi}। विस्तृत समाचार: ${item.content}`
        : `${item.title}. ${item.summary}. ${item.content}`;
    playTTS(text, item.title);
  };

  const handleShare = (item: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: item.titleHi,
        text: item.summaryHi,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'hi' ? 'समाचार लिंक कॉपी हो गया!' : 'Link copied!');
    }
  };

  // Only show published articles in public feed, or show all for author/admin
  const publishedArticles = news.filter((item) => {
    const isPublished = item.status === 'published' || !item.status;
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return isPublished && matchesCat;
  });

  const categories = Array.from(new Set(news.map((n) => n.category)));

  if (viewMode === 'author_panel') {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setViewMode('feed')}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 px-4 py-2 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-200"
          >
            <span>← सार्वजनिक समाचार फीड पर वापस जाएं</span>
          </button>
        </div>
        <WordPressAuthorPanel onBackToFeed={() => setViewMode('feed')} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
              <Newspaper className="h-3.5 w-3.5" />
              <span>{lang === 'hi' ? 'दैनिक कृषि समाचार व संपादकीय' : 'Daily Agriculture News'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">
              {lang === 'hi'
                ? 'कृषि समाचार, समर्थन मूल्य (MSP) व नीतियां'
                : 'Agri News, Policy & Market Intelligence'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {lang === 'hi'
                ? 'भारत सरकार के पत्र सूचना कार्यालय (PIB) और कृषि मंत्रालय द्वारा जारी न्यूनतम समर्थन मूल्य (MSP), यूरिया आपूर्ति व सब्सिडी संबंधी ताज़ा समाचार।'
                : 'Latest updates on crop support prices, fertilizer allocations, and farm mechanization policies.'}
            </p>
          </div>

          {/* WordPress Author Panel Launch Button */}
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={() => setViewMode('author_panel')}
              className="flex items-center justify-center space-x-2 rounded-2xl bg-[#1d2327] hover:bg-black border border-stone-600 px-5 py-3 text-xs sm:text-sm font-black text-white shadow-xl transition-all active:scale-95 group"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1d2327] font-black text-xs">
                W
              </span>
              <span>{lang === 'hi' ? 'वर्डप्रेस ऑथर पैनल खोलें' : 'Open WP Author Panel'}</span>
              <PenTool className="h-4 w-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            </button>
            <span className="text-[11px] text-stone-400 text-center">
              * समाचार लिखने, एडिट करने व ड्राफ्ट करने के लिए
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Category Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-3.5 shadow-xs dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`rounded-xl px-3 py-1.5 transition-colors ${
              selectedCategory === 'all'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
            }`}
          >
            सभी ({publishedArticles.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={() => setViewMode('author_panel')}
          className="flex items-center space-x-1.5 rounded-xl bg-emerald-50 text-emerald-800 px-3 py-1.5 text-xs font-bold hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 transition-colors"
        >
          <PlusCircle className="h-3.5 w-3.5 text-emerald-600" />
          <span>+ नया समाचार लिखें</span>
        </button>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {publishedArticles.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between transition-all hover:-translate-y-1 hover:border-emerald-500/70 hover:shadow-xl"
          >
            <div>
              <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 rounded-lg bg-stone-900/80 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
                  {item.category}
                </span>

                {/* Author attribution pill */}
                {item.author && (
                  <span className="absolute bottom-2 left-2 rounded-md bg-stone-950/80 px-2 py-0.5 text-[10px] font-medium text-stone-200 backdrop-blur-xs">
                    ✍️ {item.author}
                  </span>
                )}
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.date}</span>
                  </span>
                  <span>{item.readTime}</span>
                </div>

                <h2 className="text-base font-black text-stone-900 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400 line-clamp-2 transition-colors">
                  {lang === 'hi' ? item.titleHi : item.title}
                </h2>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-2">
                  {lang === 'hi' ? item.summaryHi : item.summary}
                </p>

                <p className="text-xs text-stone-500 line-clamp-3 bg-stone-50 dark:bg-stone-800/60 p-3 rounded-xl border border-stone-100 dark:border-stone-700/60">
                  {item.content}
                </p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleListenNews(item)}
                  className="flex items-center space-x-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 px-3 py-1.5 font-bold text-amber-800 dark:text-amber-300 transition-colors"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>{lang === 'hi' ? 'सुनें' : 'Listen'}</span>
                </button>

                <button
                  onClick={() => handleShare(item)}
                  className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-300"
                  title="Share"
                >
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 font-bold text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  <span>{item.source}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

