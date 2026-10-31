import React, { useState } from 'react';
import {
  Headphones,
  PhoneCall,
  MessageSquare,
  Mic,
  Volume2,
  MapPin,
  CheckCircle,
  HelpCircle,
  Send,
  Sparkles,
  ShieldCheck,
  Bell,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const KisanSahayataPage: React.FC = () => {
  const {
    location,
    setIsLocationModalOpen,
    setIsVoiceModalOpen,
    farmerQuestions,
    addFarmerQuestion,
    currentUser,
    lang,
    playTTS,
  } = useApp();

  const [questionText, setQuestionText] = useState('');
  const [questionCrop, setQuestionCrop] = useState('गेहूं (Wheat)');
  const [askSubmitted, setAskSubmitted] = useState(false);

  // WhatsApp prefilled builder
  const [waTopic, setWaTopic] = useState('tractor');
  const [waCustomMsg, setWaCustomMsg] = useState('');

  const handleAskExpert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    addFarmerQuestion({
      farmerName: currentUser.name,
      district: `${location.district}, ${location.state}`,
      crop: questionCrop,
      question: questionText,
    });

    setAskSubmitted(true);
    playTTS(
      'आपका प्रश्न कृषि विशेषज्ञ टीम को भेज दिया गया है। 24 घंटे में उत्तर इसी पेज पर दिखाई देगा।',
      'प्रश्न दर्ज'
    );
    setQuestionText('');
    setTimeout(() => setAskSubmitted(false), 3000);
  };

  const handleOpenWhatsApp = () => {
    let msg = `नमस्ते EV Kisan सहायता केंद्र! मैं ${location.district} से बोल रहा हूँ। `;
    if (waTopic === 'tractor') {
      msg += 'मुझे ट्रैक्टर सब्सिडी और डीलर ऑफर की जानकारी चाहिए।';
    } else if (waTopic === 'scheme') {
      msg += 'मुझे पीएम-किसान या कुसुम सोलर पंप योजना के आवेदन में सहायता चाहिए।';
    } else if (waTopic === 'disease') {
      msg += 'मेरी फसल में रोग लगा है, कृपया कीट विशेषज्ञ से बात करवाएं।';
    } else {
      msg += waCustomMsg || 'मुझे कृषि सहायता चाहिए।';
    }

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 via-amber-900 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <Headphones className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? '24x7 किसान हेल्पलाइन व डिजिटल मित्र' : '24x7 Farmer Helpline & Support'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi' ? 'किसान सहायता केंद्र (Kisan Sahayata)' : 'Kisan Assistance & Advisory Hub'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? 'आवाज़ से बोलकर खोजें, ऑडियो वाचन सुनें, WhatsApp पर सीधे कृषि विशेषज्ञ से चैट करें और 1800-180-1551 पर मुफ्त बात करें।'
              : 'Voice assistance in Hindi, instant WhatsApp agronomist queries, toll-free government Kisan Call Centre access.'}
          </p>
        </div>
      </div>

      {/* 4 Pillars of Assistance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Voice Search */}
        <div
          onClick={() => setIsVoiceModalOpen(true)}
          className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all text-center space-y-2"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Mic className="h-6 w-6" />
          </span>
          <h3 className="font-bold text-stone-900 dark:text-white text-sm">
            {lang === 'hi' ? 'बोलने वाला सिस्टम' : 'Voice Assistance'}
          </h3>
          <p className="text-xs text-stone-500">
            {lang === 'hi' ? 'माइक दबाकर हिंदी में बोलें, परिणाम बोलकर सुनाए जाएंगे।' : 'Speak in Hindi to search tractors, mandis & remedies.'}
          </p>
          <span className="inline-block rounded-xl bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            बोलकर खोजें →
          </span>
        </div>

        {/* WhatsApp Chat */}
        <div
          onClick={handleOpenWhatsApp}
          className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all text-center space-y-2"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
            <MessageSquare className="h-6 w-6" />
          </span>
          <h3 className="font-bold text-stone-900 dark:text-white text-sm">
            {lang === 'hi' ? 'WhatsApp सहायता' : 'WhatsApp Support'}
          </h3>
          <p className="text-xs text-stone-500">
            {lang === 'hi' ? 'पूर्वनिर्मित संदेश के साथ विशेषज्ञ से सीधे चैट करें।' : 'Instant prefilled WhatsApp chat with agri agents.'}
          </p>
          <span className="inline-block rounded-xl bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
            चैट शुरू करें →
          </span>
        </div>

        {/* Toll-Free Call */}
        <a
          href="tel:18001801551"
          className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 text-center space-y-2 hover:border-emerald-500 hover:shadow-md transition-all block"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            <PhoneCall className="h-6 w-6" />
          </span>
          <h3 className="font-bold text-stone-900 dark:text-white text-sm">
            {lang === 'hi' ? 'किसान कॉल सेंटर' : 'Kisan Call Centre'}
          </h3>
          <p className="text-xs text-stone-500">
            {lang === 'hi' ? 'भारत सरकार का 100% फ्री टोल-फ्री नंबर।' : 'Free government advisory line: 1800-180-1551.'}
          </p>
          <span className="inline-block rounded-xl bg-amber-100 text-stone-950 px-3 py-1 text-xs font-black">
            1800-180-1551 पर कॉल
          </span>
        </a>

        {/* Location personalization */}
        <div
          onClick={() => setIsLocationModalOpen(true)}
          className="rounded-3xl border border-stone-200 bg-white p-5 shadow-xs dark:border-stone-800 dark:bg-stone-900 cursor-pointer hover:border-emerald-500 hover:shadow-md transition-all text-center space-y-2"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
            <MapPin className="h-6 w-6" />
          </span>
          <h3 className="font-bold text-stone-900 dark:text-white text-sm">
            {lang === 'hi' ? 'जिला चयन व वैयक्तिकरण' : 'District Personalization'}
          </h3>
          <p className="text-xs text-stone-500">
            वर्तमान क्षेत्र: <strong>{location.district}, {location.state}</strong>
          </p>
          <span className="inline-block rounded-xl bg-sky-50 px-3 py-1 text-xs font-bold text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
            जिला बदलें →
          </span>
        </div>
      </div>

      {/* Ask an Agronomist / Expert Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ask Question Form */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-4">
          <div className="flex items-center space-x-2 border-b border-stone-100 pb-3 dark:border-stone-800">
            <Sparkles className="h-5 w-5 text-amber-500" />
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              {lang === 'hi' ? 'कृषि वैज्ञानिक से सवाल पूछें' : 'Ask an Agri Scientist'}
            </h3>
          </div>

          {askSubmitted ? (
            <div className="py-8 text-center space-y-2">
              <CheckCircle className="mx-auto h-12 w-12 text-emerald-600" />
              <h4 className="font-bold text-stone-900 dark:text-white">
                {lang === 'hi' ? 'सवाल सफलता पूर्वक दर्ज!' : 'Question Submitted!'}
              </h4>
              <p className="text-xs text-stone-500">
                {lang === 'hi' ? 'हमारे कृषि वैज्ञानिक द्वारा जांच के बाद उत्तर संलग्न कर दिया जाएगा।' : 'Our agronomy team is reviewing your question.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleAskExpert} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {lang === 'hi' ? 'संबंधित फसल (Crop):' : 'Crop:'}
                </label>
                <select
                  value={questionCrop}
                  onChange={(e) => setQuestionCrop(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                >
                  <option value="गेहूं (Wheat)">गेहूं (Wheat)</option>
                  <option value="सरसों (Mustard)">सरसों (Mustard)</option>
                  <option value="धान (Paddy)">धान (Paddy)</option>
                  <option value="सोयाबीन (Soybean)">सोयाबीन (Soybean)</option>
                  <option value="गन्ना (Sugarcane)">गन्ना (Sugarcane)</option>
                  <option value="ट्रैक्टर व मशीनरी">ट्रैक्टर व मशीनरी (Tractor & Machinery)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {lang === 'hi' ? 'अपनी समस्या या सवाल लिखें:' : 'Your Question:'}
                </label>
                <textarea
                  rows={4}
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder={lang === 'hi' ? 'उदा. गेहूं में पहली सिंचाई पर कौन सी खाद डालें? पीलापन आ रहा है क्या करें?' : 'e.g. Yellow leaves on wheat after first irrigation...'}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 p-3 text-xs sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-stone-400">
                  📍 {location.district}, {location.state}
                </span>
                <button
                  type="submit"
                  className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{lang === 'hi' ? 'सवाल भेजें' : 'Submit Question'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Answered Farmer Questions Community */}
        <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-4">
          <div className="flex items-center space-x-2 border-b border-stone-100 pb-3 dark:border-stone-800">
            <HelpCircle className="h-5 w-5 text-emerald-600" />
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              {lang === 'hi' ? 'हाल ही में पूछे गए सवाल व उत्तर' : 'Recent Answered Farmer Questions'}
            </h3>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
            {farmerQuestions.map((fq) => (
              <div
                key={fq.id}
                className="rounded-2xl border border-stone-100 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-800/50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-stone-500">
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    👨‍🌾 {fq.farmerName} ({fq.district})
                  </span>
                  <span className="rounded-md bg-stone-200 px-1.5 py-0.5 text-[10px] font-semibold dark:bg-stone-700">
                    {fq.crop}
                  </span>
                </div>

                <p className="font-semibold text-stone-900 dark:text-white">
                  Q: {fq.question}
                </p>

                {fq.answer && (
                  <div className="rounded-xl bg-emerald-50 p-2.5 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                    <strong className="block text-[10px] text-emerald-800 dark:text-emerald-400">
                      ✓ उत्तर ({fq.answeredBy}):
                    </strong>
                    <p>{fq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
