import React, { useState } from 'react';
import { X, Send, Phone, User, MapPin, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EnquiryModal: React.FC = () => {
  const {
    activeEnquiryModal,
    setActiveEnquiryModal,
    submitEnquiry,
    currentUser,
    location,
    lang,
    playTTS,
  } = useApp();

  const [buyerName, setBuyerName] = useState(currentUser.name);
  const [buyerPhone, setBuyerPhone] = useState(currentUser.phone);
  const [buyerCity, setBuyerCity] = useState(`${location.district}, ${location.state}`);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!activeEnquiryModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerPhone) return;

    submitEnquiry(
      activeEnquiryModal.id,
      activeEnquiryModal.title,
      buyerName,
      buyerPhone,
      buyerCity,
      message || (lang === 'hi' ? 'कृपया सबसे अच्छी कीमत, सब्सिडी व टेस्ट ड्राइव की जानकारी दें।' : 'Please provide best on-road price and loan details.')
    );

    setIsSuccess(true);
    const audioMsg =
      lang === 'hi'
        ? `आपकी पूछताछ विक्रेता ${activeEnquiryModal.seller.name} को सफलता पूर्वक भेज दी गई है। वे आपसे जल्द संपर्क करेंगे।`
        : `Your enquiry for ${activeEnquiryModal.title} has been submitted successfully to the dealer.`;
    playTTS(audioMsg, lang === 'hi' ? 'पूछताछ दर्ज' : 'Enquiry Sent');

    setTimeout(() => {
      setIsSuccess(false);
      setActiveEnquiryModal(null);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 bg-emerald-50/70 p-4 dark:border-stone-800 dark:bg-emerald-950/30">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              {lang === 'hi' ? 'डीलर्स से सर्वोत्तम कीमत प्राप्त करें' : 'Get Best Price from Verified Dealer'}
            </span>
            <h3 className="text-base font-bold text-stone-900 dark:text-white truncate">
              {activeEnquiryModal.title}
            </h3>
          </div>
          <button
            onClick={() => setActiveEnquiryModal(null)}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h4 className="mt-4 text-lg font-bold text-stone-900 dark:text-white">
              {lang === 'hi' ? 'पूछताछ सफलतापूर्वक दर्ज!' : 'Enquiry Sent Successfully!'}
            </h4>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
              {lang === 'hi'
                ? `डीलर (${activeEnquiryModal.seller.name}) आपके दिए गए नंबर पर 24 घंटे के अंदर संपर्क करेंगे।`
                : `Dealer (${activeEnquiryModal.seller.name}) will contact you shortly on your provided phone.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Dealer info banner */}
            <div className="flex items-center justify-between rounded-xl bg-stone-50 p-3 text-xs dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <div>
                  <div className="font-bold text-stone-900 dark:text-white">
                    {activeEnquiryModal.seller.name}
                  </div>
                  <div className="text-stone-500 text-[11px]">
                    📍 {activeEnquiryModal.location.district}, {activeEnquiryModal.location.state}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-700 dark:text-amber-400">
                  {activeEnquiryModal.priceDisplay}
                </div>
                <div className="text-[10px] text-stone-500">
                  {lang === 'hi' ? 'अनुमानित कीमत' : 'Approx Price'}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {lang === 'hi' ? 'आपका नाम (Farmer / Buyer Name) *' : 'Your Name *'}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-10 pr-3 py-2 text-sm text-stone-900 focus:border-emerald-600 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  placeholder="उदा. रामवीर सिंह"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {lang === 'hi' ? 'मोबाइल नंबर (WhatsApp / Call) *' : 'Mobile Number *'}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                <input
                  type="tel"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-10 pr-3 py-2 text-sm text-stone-900 focus:border-emerald-600 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {lang === 'hi' ? 'आपका जिला व राज्य (Location)' : 'City / District'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  value={buyerCity}
                  onChange={(e) => setBuyerCity(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-10 pr-3 py-2 text-sm text-stone-900 focus:border-emerald-600 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                {lang === 'hi' ? 'संदेश या विशेष आवश्यकता (Optional)' : 'Message'}
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={lang === 'hi' ? 'उदा. लोन की सुविधा, सब्सिडी जानकारी या डीलर से टेस्ट ड्राइव...' : 'e.g. Loan finance options, subsidy eligibility...'}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-10 pr-3 py-2 text-sm text-stone-900 focus:border-emerald-600 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                />
              </div>
            </div>

            <div className="border-t border-stone-100 pt-3 dark:border-stone-800 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                🔒 {lang === 'hi' ? 'आपकी जानकारी केवल अधिकृत डीलर को भेजी जाएगी।' : 'Your contact info is safe.'}
              </span>
              <button
                type="submit"
                className="flex items-center space-x-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>{lang === 'hi' ? 'पूछताछ भेजें' : 'Send Enquiry'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
