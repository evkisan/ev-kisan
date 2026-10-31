import React from 'react';
import {
  Zap,
  Fuel,
  MapPin,
  Scale,
  MessageSquare,
  CheckCircle,
  Heart,
  Volume2,
  Share2,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import { ProductListing } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: ProductListing;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const {
    lang,
    addToCompare,
    removeFromCompare,
    compareIds,
    wishlistIds,
    toggleWishlist,
    setActiveProductModal,
    setActiveEnquiryModal,
    playTTS,
  } = useApp();

  const isCompared = compareIds.includes(product.id);
  const isWishlisted = wishlistIds.includes(product.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromCompare(product.id);
    } else {
      const res = addToCompare(product.id);
      if (!res.success) {
        alert(res.message);
      }
    }
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `नमस्ते! मैंने EV Kisan पोर्टल पर आपका विज्ञापन देखा: ${product.title} (कीमत: ${product.priceDisplay})। क्या यह अभी उपलब्ध है?`
    );
    window.open(`https://wa.me/${product.seller.whatsapp}?text=${text}`, '_blank');
  };

  const handleListenAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const narration =
      lang === 'hi'
        ? `${product.titleHi}। कीमत लगभग ${product.priceDisplay}। ${product.hp ? `${product.hp} हॉर्सपावर।` : ''} स्थान: ${product.location.district}, ${product.location.state}। डीलर: ${product.seller.name}।`
        : `${product.title}. Price approx ${product.priceDisplay}. ${product.hp ? `${product.hp} Horsepower.` : ''} Location: ${product.location.district}, ${product.location.state}.`;
    playTTS(narration, product.title);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `EV Kisan पर देखें: ${product.title} - ${product.priceDisplay}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/#${product.id}`);
      alert(lang === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div
      onClick={() => setActiveProductModal(product)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/80 hover:shadow-xl dark:border-stone-800 dark:bg-stone-900 cursor-pointer"
    >
      {/* Top Image & Badges */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80'}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {product.condition === 'new' && (
            <span className="rounded-lg bg-emerald-600 px-2 py-0.5 text-[11px] font-black tracking-wide text-white shadow-xs uppercase">
              {lang === 'hi' ? 'नया' : 'NEW'}
            </span>
          )}
          {product.condition === 'used' && (
            <span className="rounded-lg bg-amber-500 px-2 py-0.5 text-[11px] font-black tracking-wide text-stone-950 shadow-xs uppercase">
              {lang === 'hi' ? 'पुराना EV' : 'USED EV'}
            </span>
          )}
          <span className="inline-flex items-center space-x-1 rounded-lg bg-teal-600 px-2 py-0.5 text-[11px] font-bold text-white shadow-xs">
            <Zap className="h-3 w-3 fill-current" />
            <span>100% ELECTRIC</span>
          </span>
          {product.batteryKwh && (
            <span className="inline-flex items-center rounded-lg bg-emerald-800/90 px-2 py-0.5 text-[11px] font-bold text-emerald-100 shadow-xs backdrop-blur-xs">
              🔋 {product.batteryKwh} kWh
            </span>
          )}
          {product.batteryHealth && (
            <span className="inline-flex items-center rounded-lg bg-emerald-900/90 px-2 py-0.5 text-[11px] font-bold text-emerald-200 shadow-xs backdrop-blur-xs">
              🔋 {product.batteryHealth}% {lang === 'hi' ? 'हेल्थ' : 'Health'}
            </span>
          )}
        </div>

        {/* Floating Actions on Image */}
        <div className="absolute top-2.5 right-2.5 flex items-center space-x-1">
          <button
            onClick={handleListenAudio}
            title={lang === 'hi' ? 'ऑडियो विवरण सुनें' : 'Listen audio description'}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur-xs hover:bg-emerald-600 hover:text-white dark:bg-stone-900/90 dark:text-stone-200 transition-colors"
          >
            <Volume2 className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            title={lang === 'hi' ? 'पसंदीदा में जोड़ें' : 'Add to Wishlist'}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-700 shadow-md backdrop-blur-xs hover:text-rose-500 dark:bg-stone-900/90 dark:text-stone-200 transition-colors"
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
            />
          </button>
        </div>

        {/* Views count */}
        <div className="absolute bottom-2 left-2.5 flex items-center space-x-1 rounded-md bg-stone-950/70 px-2 py-0.5 text-[10px] font-medium text-stone-200 backdrop-blur-xs">
          <Eye className="h-3 w-3" />
          <span>{product.viewsCount} {lang === 'hi' ? 'देखा' : 'views'}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Location */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {product.brand}
            </span>
            <span className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 text-stone-400" />
              <span>{product.location.district}, {product.location.state}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-stone-900 line-clamp-1 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
            {lang === 'hi' ? product.titleHi : product.title}
          </h3>

          {/* Price */}
          <div className="mt-1.5 flex items-baseline space-x-2">
            <span className="text-lg font-black text-stone-950 dark:text-amber-400">
              {product.priceDisplay}
            </span>
            {product.priceType === 'negotiable' && (
              <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                ({lang === 'hi' ? 'बातचीत संभव' : 'Negotiable'})
              </span>
            )}
          </div>

          {/* Specifications Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-medium">
            {product.hp && (
              <span className="rounded-md bg-stone-100 px-2 py-1 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                {product.hp} HP
              </span>
            )}
            {product.batteryKwh && (
              <span className="rounded-md bg-teal-50 px-2 py-1 font-semibold text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
                ⚡ {product.batteryKwh} kWh Li-ion
              </span>
            )}
            {product.chargingTimeHours && (
              <span className="rounded-md bg-stone-100 px-2 py-1 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                ⏱️ {product.chargingTimeHours}h Fast Charge
              </span>
            )}
            {product.specifications['Lifting Capacity'] && (
              <span className="rounded-md bg-stone-100 px-2 py-1 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                🏋️ {product.specifications['Lifting Capacity']}
              </span>
            )}
            {product.specifications['Warranty'] && (
              <span className="rounded-md bg-emerald-50 px-2 py-1 font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                🛡️ {product.specifications['Warranty']}
              </span>
            )}
          </div>

          {/* Seller / Dealer */}
          <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5 text-xs dark:border-stone-800">
            <div className="flex items-center space-x-1.5 truncate">
              {product.seller.isVerified ? (
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <CheckCircle className="h-3.5 w-3.5 shrink-0 text-stone-400" />
              )}
              <span className="truncate font-semibold text-stone-700 dark:text-stone-300">
                {product.seller.name}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-amber-500 font-bold shrink-0">
              <span>★</span>
              <span>{product.seller.rating}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-stone-100 pt-3 dark:border-stone-800">
          {/* Compare toggle */}
          <button
            onClick={handleCompareClick}
            className={`flex items-center justify-center space-x-1 rounded-xl py-2 text-xs font-bold transition-colors ${
              isCompared
                ? 'bg-amber-500 text-stone-950'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-200'
            }`}
          >
            <Scale className="h-3.5 w-3.5" />
            <span>{isCompared ? (lang === 'hi' ? 'शामिल है' : 'Added') : (lang === 'hi' ? 'तुलना' : 'Compare')}</span>
          </button>

          {/* WhatsApp Enquiry */}
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center space-x-1 rounded-xl bg-emerald-50 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-300 transition-colors"
          >
            <span>WhatsApp</span>
          </button>

          {/* Enquiry / Price Quote */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveEnquiryModal(product);
            }}
            className="flex items-center justify-center space-x-1 rounded-xl bg-emerald-600 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-xs transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'पूछताछ' : 'Enquiry'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
