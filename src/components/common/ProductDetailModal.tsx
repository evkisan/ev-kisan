import React, { useState } from 'react';
import {
  X,
  Volume2,
  Scale,
  MessageSquare,
  MapPin,
  ShieldCheck,
  Check,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Calendar,
  Play,
  Heart,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductModal,
    setActiveProductModal,
    setActiveEnquiryModal,
    addToCompare,
    removeFromCompare,
    compareIds,
    wishlistIds,
    toggleWishlist,
    products,
    lang,
    playTTS,
  } = useApp();

  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!activeProductModal) return null;

  const product = activeProductModal;
  const isCompared = compareIds.includes(product.id);
  const isWishlisted = wishlistIds.includes(product.id);

  // Similar listings from same category or brand
  const similarProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 3);

  const handleListenAudio = () => {
    const text =
      lang === 'hi'
        ? `${product.titleHi}। ब्रांड: ${product.brand}। कीमत: ${product.priceDisplay}। ${product.descriptionHi}। प्रमुख खूबियां: ${product.features.join(', ')}।`
        : `${product.title}. Brand: ${product.brand}. Price: ${product.priceDisplay}. ${product.description}. Key features: ${product.features.join(', ')}.`;
    playTTS(text, product.title);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `नमस्ते! मैंने EV Kisan पर ${product.title} (कीमत: ${product.priceDisplay}) देखा। मुझे इसके बारे में विस्तृत जानकारी चाहिए।`
    );
    window.open(`https://wa.me/${product.seller.whatsapp}?text=${text}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `EV Kisan पर देखें: ${product.title} - ${product.priceDisplay}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(lang === 'hi' ? 'लिंक क्लिपबोर्ड पर कॉपी हो गया!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto">
      <div className="relative my-auto w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in-95 duration-200">
        {/* Sticky Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-stone-100 bg-white/95 px-6 py-3.5 backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/95">
          <div className="flex items-center space-x-2 truncate">
            <span className="rounded-lg bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {product.brand}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white truncate">
              {lang === 'hi' ? product.titleHi : product.title}
            </h2>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleListenAudio}
              className="flex items-center space-x-1 rounded-xl bg-amber-500/15 px-3 py-1.5 text-xs font-bold text-amber-700 hover:bg-amber-500/25 dark:text-amber-300 transition-colors"
            >
              <Volume2 className="h-4 w-4" />
              <span className="hidden sm:inline">{lang === 'hi' ? 'ऑडियो सुनें' : 'Listen'}</span>
            </button>
            <button
              onClick={handleShare}
              className="rounded-full p-2 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveProductModal(null)}
              className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Main Grid: Images & Quick Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gallery */}
            <div>
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                <img
                  src={product.images[selectedImgIdx] || product.images[0]}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-black text-white shadow-xs">
                    {product.condition === 'new' ? 'NEW' : 'USED EV'}
                  </span>
                  <span className="rounded-lg bg-teal-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs">
                    ⚡ 100% ELECTRIC
                  </span>
                  {product.batteryKwh && (
                    <span className="rounded-lg bg-emerald-800 px-2.5 py-1 text-xs font-bold text-emerald-100 shadow-xs">
                      🔋 {product.batteryKwh} kWh Battery
                    </span>
                  )}
                  {product.batteryHealth && (
                    <span className="rounded-lg bg-emerald-900 px-2.5 py-1 text-xs font-bold text-emerald-200 shadow-xs">
                      🔋 {product.batteryHealth}% {lang === 'hi' ? 'बैटरी लाइफ' : 'Battery Health'}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails & Video */}
              <div className="mt-3 flex items-center space-x-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIdx(idx)}
                    className={`relative h-14 w-20 overflow-hidden rounded-xl border-2 transition-all ${
                      selectedImgIdx === idx
                        ? 'border-emerald-600 shadow-md scale-105'
                        : 'border-stone-200 dark:border-stone-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="h-full w-full object-cover" />
                  </button>
                ))}
                {product.videoUrl && (
                  <a
                    href={product.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-14 items-center space-x-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-bold text-stone-700 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  >
                    <Play className="h-4 w-4 fill-rose-600 text-rose-600" />
                    <span>{lang === 'hi' ? 'वीडियो देखें' : 'Watch Video'}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Price, Dealer & CTA Box */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-stone-500 dark:text-stone-400">
                  <MapPin className="h-3.5 w-3.5 text-stone-400" />
                  <span>{product.location.district}, {product.location.state}</span>
                  <span>•</span>
                  <Calendar className="h-3.5 w-3.5 text-stone-400" />
                  <span>{lang === 'hi' ? 'लिस्टिंग दिनांक:' : 'Listed:'} {product.createdAt}</span>
                </div>

                <div className="mt-2">
                  <div className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-amber-400">
                    {product.priceDisplay}
                  </div>
                  <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                    {lang === 'hi' ? '* एक्स-शोरूम / खेत पर कीमत (अनुमानित)' : '* Ex-showroom / Farm gate price'}
                  </span>
                </div>

                <p className="mt-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {lang === 'hi' ? product.descriptionHi : product.description}
                </p>

                {/* Seller Profile Card */}
                <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-3.5 dark:border-stone-800 dark:bg-stone-800/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-sm">
                        {product.seller.name.slice(0, 1)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1.5 font-bold text-stone-900 dark:text-white text-sm">
                          <span>{product.seller.name}</span>
                          {product.seller.isVerified && (
                            <ShieldCheck className="h-4 w-4 text-emerald-600" />
                          )}
                        </div>
                        <div className="text-xs text-stone-500">
                          {product.seller.dealerType === 'authorized_dealer'
                            ? (lang === 'hi' ? 'अधिकृत डीलरशिप' : 'Authorized Dealership')
                            : (lang === 'hi' ? 'व्यक्तिगत किसान विक्रेता' : 'Individual Seller')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-amber-500 font-bold text-sm">
                        <span>★</span>
                        <span>{product.seller.rating}</span>
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {product.seller.reviewsCount} {lang === 'hi' ? 'समीक्षाएं' : 'reviews'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <button
                  onClick={() => {
                    if (isCompared) {
                      removeFromCompare(product.id);
                    } else {
                      const res = addToCompare(product.id);
                      if (!res.success) alert(res.message);
                    }
                  }}
                  className={`flex items-center justify-center space-x-1.5 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all ${
                    isCompared
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200'
                  }`}
                >
                  <Scale className="h-4 w-4" />
                  <span>{isCompared ? (lang === 'hi' ? 'तुलना में शामिल' : 'In Compare') : (lang === 'hi' ? 'तुलना में जोड़ें' : 'Add Compare')}</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center space-x-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 py-3 text-xs sm:text-sm font-bold dark:bg-emerald-950/60 dark:text-emerald-300"
                >
                  <span>WhatsApp चैट</span>
                </button>

                <button
                  onClick={() => {
                    setActiveProductModal(null);
                    setActiveEnquiryModal(product);
                  }}
                  className="col-span-2 sm:col-span-1 flex items-center justify-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-xs sm:text-sm font-bold shadow-md"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{lang === 'hi' ? 'सर्वोत्तम ऑफर प्राप्त करें' : 'Get Best Quote'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 p-5 bg-stone-50/50 dark:bg-stone-900/50">
            <h3 className="text-base font-bold text-stone-900 dark:text-white mb-4 flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>{lang === 'hi' ? 'तकनीकी विनिर्देश (Full Specifications)' : 'Technical Specifications'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl bg-white p-3 dark:bg-stone-800 border border-stone-100 dark:border-stone-700"
                >
                  <span className="text-stone-500 dark:text-stone-400 font-medium">{key}</span>
                  <span className="font-bold text-stone-900 dark:text-white text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features, Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Features */}
            <div className="rounded-2xl border border-stone-200 p-4 dark:border-stone-800 bg-white dark:bg-stone-900">
              <h4 className="text-sm font-bold text-stone-900 dark:text-white mb-3 flex items-center space-x-1.5">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'मुख्य विशेषताएं' : 'Key Features'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center space-x-1.5">
                <ThumbsUp className="h-4 w-4 text-emerald-600" />
                <span>{lang === 'hi' ? 'किसानों के फायदे (Advantages)' : 'Advantages'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                {product.pros.map((p, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="rounded-2xl border border-rose-100 bg-rose-50/30 p-4 dark:border-rose-900/40 dark:bg-rose-950/20">
              <h4 className="text-sm font-bold text-rose-800 dark:text-rose-300 mb-3 flex items-center space-x-1.5">
                <ThumbsDown className="h-4 w-4 text-rose-600" />
                <span>{lang === 'hi' ? 'ध्यान रखने योग्य बातें (Limitations)' : 'Limitations'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
                {product.cons.map((c, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="text-rose-600 font-bold">!</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Similar Listings */}
          {similarProducts.length > 0 && (
            <div className="border-t border-stone-200 pt-5 dark:border-stone-800">
              <h3 className="text-base font-bold text-stone-900 dark:text-white mb-3">
                {lang === 'hi' ? 'समान अन्य मॉडल (Similar Listings)' : 'Similar Listings'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {similarProducts.map((sp) => (
                  <div
                    key={sp.id}
                    onClick={() => setActiveProductModal(sp)}
                    className="flex items-center space-x-3 rounded-xl border border-stone-200 bg-stone-50 p-2.5 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/20 dark:border-stone-800 dark:bg-stone-800/60 transition-colors"
                  >
                    <img
                      src={sp.images[0]}
                      alt={sp.title}
                      className="h-12 w-16 rounded-lg object-cover"
                    />
                    <div className="truncate">
                      <div className="text-xs font-bold text-stone-900 dark:text-white truncate">
                        {sp.title}
                      </div>
                      <div className="text-xs font-black text-emerald-700 dark:text-amber-400">
                        {sp.priceDisplay}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
