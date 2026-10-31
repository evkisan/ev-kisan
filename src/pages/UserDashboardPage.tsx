import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Building,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Heart,
  MessageSquare,
  Eye,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const UserDashboardPage: React.FC = () => {
  const {
    currentUser,
    switchRole,
    products,
    enquiries,
    wishlistIds,
    location,
    setActiveTab,
    markAsSold,
    deleteListing,
    farmerQuestions,
    answerFarmerQuestion,
    lang,
  } = useApp();

  const [activeTabSub, setActiveTabSub] = useState<'listings' | 'enquiries' | 'wishlist' | 'expert_qa'>('listings');
  const [expertReplyId, setExpertReplyId] = useState<string | null>(null);
  const [expertReplyText, setExpertReplyText] = useState('');

  // Seller listings
  const sellerListings = products.filter(
    (p) => p.seller.id === currentUser.id || p.seller.phone === currentUser.phone || p.id.startsWith('prod-')
  );

  // Wishlist products
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Total stats
  const totalViews = sellerListings.reduce((sum, p) => sum + p.viewsCount, 0);
  const totalEnquiries = enquiries.length;

  const handleSendExpertReply = (qId: string) => {
    if (!expertReplyText.trim()) return;
    answerFarmerQuestion(qId, expertReplyText, currentUser.name);
    setExpertReplyId(null);
    setExpertReplyText('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* User Profile Header Card */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-emerald-600 text-amber-300 font-black text-2xl shadow-md">
              {currentUser.name.slice(0, 1)}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                  {currentUser.name}
                </h1>
                {currentUser.isVerified && (
                  <span className="inline-flex items-center space-x-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>सत्यापित (Verified)</span>
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                <span className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>{currentUser.phone}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{currentUser.district}, {currentUser.state}</span>
                </span>
                {currentUser.businessName && (
                  <>
                    <span>•</span>
                    <span className="flex items-center space-x-1 font-semibold text-stone-700 dark:text-stone-300">
                      <Building className="h-3 w-3" />
                      <span>{currentUser.businessName}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Role Switch Buttons */}
          <div className="rounded-2xl bg-stone-50 p-2 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1 px-2">
              भूमिका बदलें (Switch Role):
            </span>
            <div className="flex flex-wrap gap-1 text-xs font-bold">
              {(['farmer', 'dealer', 'seller', 'expert', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`rounded-xl px-2.5 py-1 transition-colors ${
                    currentUser.role === r
                      ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                      : 'bg-white text-stone-700 hover:bg-stone-200 dark:bg-stone-900 dark:text-stone-300'
                  }`}
                >
                  {r === 'farmer' && 'किसान'}
                  {r === 'dealer' && 'डीलर'}
                  {r === 'seller' && 'विक्रेता'}
                  {r === 'expert' && 'विशेषज्ञ'}
                  {r === 'admin' && 'एडमिन'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Counter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 text-center">
          <span className="text-xs font-bold uppercase text-stone-400">सक्रिय विज्ञापन</span>
          <div className="text-3xl font-black text-stone-900 dark:text-white mt-1">
            {sellerListings.length}
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 text-center">
          <span className="text-xs font-bold uppercase text-stone-400">कुल विज्ञापन व्यूज</span>
          <div className="text-3xl font-black text-emerald-700 dark:text-amber-400 mt-1">
            {totalViews}
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 text-center">
          <span className="text-xs font-bold uppercase text-stone-400">प्राप्त पूछताछ</span>
          <div className="text-3xl font-black text-blue-600 mt-1">
            {totalEnquiries}
          </div>
        </div>
        <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 text-center">
          <span className="text-xs font-bold uppercase text-stone-400">पसंदीदा में सेव</span>
          <div className="text-3xl font-black text-rose-500 mt-1">
            {wishlistIds.length}
          </div>
        </div>
      </div>

      {/* Dashboard Sub Tabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setActiveTabSub('listings')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors ${
            activeTabSub === 'listings'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>मेरी मशीनरी लिस्टिंग ({sellerListings.length})</span>
        </button>

        <button
          onClick={() => setActiveTabSub('enquiries')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors ${
            activeTabSub === 'enquiries'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>प्राप्त पूछताछ ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTabSub('wishlist')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors ${
            activeTabSub === 'wishlist'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Heart className="h-4 w-4" />
          <span>पसंदीदा ({wishlistedProducts.length})</span>
        </button>

        {currentUser.role === 'expert' && (
          <button
            onClick={() => setActiveTabSub('expert_qa')}
            className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors ${
              activeTabSub === 'expert_qa'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>विशेषज्ञ उत्तर कक्ष</span>
          </button>
        )}
      </div>

      {/* 1. Listings View */}
      {activeTabSub === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              आपके पंजीकृत कृषि उपकरण
            </h3>
            <button
              onClick={() => setActiveTab('buy_sell')}
              className="flex items-center space-x-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-3.5 py-2 text-xs font-bold text-stone-950 shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>+ नया विज्ञापन लगाएं</span>
            </button>
          </div>

          <div className="space-y-3">
            {sellerListings.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 gap-4"
              >
                <div className="flex items-center space-x-3">
                  <img src={p.images[0]} alt={p.title} className="h-14 w-20 rounded-xl object-cover" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm text-stone-900 dark:text-white">{p.title}</h4>
                      <span className="rounded-md bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-black uppercase dark:bg-emerald-950 dark:text-emerald-300">
                        {p.listingStatus}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-emerald-700 dark:text-amber-400">
                      {p.priceDisplay}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      👁️ {p.viewsCount} व्यूज • 💬 {p.enquiriesCount} पूछताछ • 📍 {p.location.district}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {p.listingStatus !== 'sold' && (
                    <button
                      onClick={() => markAsSold(p.id)}
                      className="rounded-xl bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                    >
                      बिका हुआ मार्क करें
                    </button>
                  )}
                  <button
                    onClick={() => deleteListing(p.id)}
                    className="rounded-xl p-2 text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Enquiries View */}
      {activeTabSub === 'enquiries' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-stone-900 dark:text-white">
            किसानों व खरीदारों से प्राप्त पूछताछ
          </h3>

          <div className="space-y-3">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-bold text-stone-900 dark:text-white">
                    {enq.buyerName}
                  </strong>
                  <span className="text-stone-400">{enq.createdAt}</span>
                </div>
                <div className="text-stone-500">
                  उत्पाद: <strong>{enq.listingTitle}</strong> • स्थान: {enq.buyerLocation}
                </div>
                <div className="rounded-xl bg-stone-50 p-2.5 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  "{enq.message}"
                </div>
                <div className="flex items-center justify-between pt-1">
                  <a
                    href={`tel:${enq.buyerPhone}`}
                    className="inline-flex items-center space-x-1 font-bold text-emerald-700 dark:text-emerald-400"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>कॉल करें ({enq.buyerPhone})</span>
                  </a>
                  <a
                    href={`https://wa.me/${enq.buyerPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-emerald-600 px-3 py-1 font-bold text-white text-[11px]"
                  >
                    WhatsApp संपर्क
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Wishlist View */}
      {activeTabSub === 'wishlist' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-stone-900 dark:text-white">
            सहेजे गए पसंदीदा ट्रैक्टर व उपकरण
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedProducts.map((wp) => (
              <div
                key={wp.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-3"
              >
                <img src={wp.images[0]} alt={wp.title} className="h-36 w-full rounded-xl object-cover" />
                <h4 className="font-bold text-sm text-stone-900 dark:text-white">{wp.title}</h4>
                <div className="font-black text-emerald-700 dark:text-amber-400">{wp.priceDisplay}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Expert Q&A View */}
      {activeTabSub === 'expert_qa' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-stone-900 dark:text-white">
            कृषि विशेषज्ञ उत्तर कक्ष (Agronomist Console)
          </h3>

          <div className="space-y-3">
            {farmerQuestions.map((q) => (
              <div
                key={q.id}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-stone-500">
                  <span className="font-bold">{q.farmerName} ({q.district})</span>
                  <span className="font-semibold">{q.crop}</span>
                </div>
                <p className="font-bold text-stone-900 dark:text-white text-sm">
                  {q.question}
                </p>

                {q.answer ? (
                  <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                    <strong>आपका उत्तर:</strong> {q.answer}
                  </div>
                ) : (
                  <div>
                    {expertReplyId === q.id ? (
                      <div className="space-y-2 pt-2">
                        <textarea
                          rows={2}
                          value={expertReplyText}
                          onChange={(e) => setExpertReplyText(e.target.value)}
                          placeholder="अपना विशेषज्ञ उत्तर लिखें..."
                          className="w-full rounded-xl border p-2"
                        />
                        <button
                          onClick={() => handleSendExpertReply(q.id)}
                          className="rounded-xl bg-emerald-600 px-4 py-1.5 font-bold text-white"
                        >
                          उत्तर प्रकाशित करें
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setExpertReplyId(q.id)}
                        className="rounded-xl bg-amber-500 px-3 py-1 font-bold text-stone-950"
                      >
                        उत्तर लिखें
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
