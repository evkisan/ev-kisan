import React, { useState } from 'react';
import {
  ShoppingBag,
  PlusCircle,
  Tag,
  MapPin,
  CheckCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Upload,
  Phone,
  Trash2,
  Edit,
  Eye,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductListing, ProductCategory } from '../types';
import { ProductCard } from '../components/common/ProductCard';
import { INDIAN_STATES_DISTRICTS } from '../data/mockData';

export const BuyAndSellPage: React.FC = () => {
  const {
    products,
    addListing,
    deleteListing,
    markAsSold,
    currentUser,
    location,
    lang,
    playTTS,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'browse' | 'sell' | 'my_listings'>('browse');

  // Form State for selling (100% Electric Ecosystem)
  const [formCategory, setFormCategory] = useState<ProductCategory>('used_tractors');
  const [formTitle, setFormTitle] = useState('');
  const [formBrand, setFormBrand] = useState('Mahindra Electric');
  const [formModel, setFormModel] = useState('');
  const [formCondition, setFormCondition] = useState<'new' | 'used'>('used');
  const [formPrice, setFormPrice] = useState<number>(450000);
  const [formPriceType, setFormPriceType] = useState<'fixed' | 'negotiable'>('negotiable');
  const [formHp, setFormHp] = useState<number>(40);
  const [formBatteryKwh, setFormBatteryKwh] = useState<number>(32);
  const [formBatteryHealth, setFormBatteryHealth] = useState<number>(96);
  const [formChargingTime, setFormChargingTime] = useState<number>(3.5);
  const [formHours, setFormHours] = useState<string>('650');
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formState, setFormState] = useState(location.state);
  const [formDistrict, setFormDistrict] = useState(location.district);
  const [formBlock, setFormBlock] = useState(location.block || '');
  const [sellerPhone, setSellerPhone] = useState(currentUser.phone);
  const [sellerName, setSellerName] = useState(currentUser.name);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // My listings (filtered by currentUser id or phone)
  const myListings = products.filter(
    (p) => p.seller.id === currentUser.id || p.seller.phone === currentUser.phone || p.id.startsWith('prod-')
  );

  const handlePostAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formPrice) return;

    const priceInLakh = (formPrice / 100000).toFixed(2);
    const priceDisplay = `₹${priceInLakh} लाख`;

    addListing({
      title: formTitle,
      titleHi: formTitle,
      brand: formBrand,
      model: formModel || formTitle,
      category: formCategory,
      condition: formCondition,
      price: formPrice,
      priceDisplay: `${priceDisplay} (${formPriceType === 'negotiable' ? 'मूलभाव संभव' : 'निश्चित'})`,
      priceType: formPriceType,
      hp: formHp || undefined,
      fuelType: 'electric',
      batteryKwh: formBatteryKwh || undefined,
      batteryHealth: formCondition === 'used' ? formBatteryHealth : 100,
      chargingTimeHours: formChargingTime || undefined,
      description: formDescription || '100% इलेक्ट्रिक वाहन, प्रमाणित लिथियम बैटरी, शून्य डीजल खर्च, सीधे खेत पर ट्रायल के लिए उपलब्ध।',
      descriptionHi: formDescription || '100% इलेक्ट्रिक वाहन, प्रमाणित लिथियम बैटरी, शून्य डीजल खर्च, सीधे खेत पर ट्रायल के लिए उपलब्ध।',
      images: [
        formImageUrl ||
          'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
      ],
      location: {
        state: formState,
        district: formDistrict,
        block: formBlock,
      },
      seller: {
        id: currentUser.id,
        name: sellerName || currentUser.name,
        phone: sellerPhone || currentUser.phone,
        whatsapp: (sellerPhone || currentUser.phone).replace(/\D/g, ''),
        isVerified: currentUser.isVerified,
        dealerType: currentUser.role === 'dealer' ? 'authorized_dealer' : 'individual',
        rating: 4.9,
        reviewsCount: 3,
      },
      specifications: {
        'Horsepower (HP)': `${formHp} HP Instant Electric Torque`,
        'Battery Capacity': `${formBatteryKwh} kWh Lithium-ion`,
        'Battery Health': `${formCondition === 'used' ? formBatteryHealth : 100}% Certified Health`,
        'Charging Time': `${formChargingTime} Hours Fast Charge`,
        'Hours Driven': `${formHours} Hours Run`,
        'Operating Cost': '₹25 - ₹30 / Hour (Zero Diesel)',
        'Registration State': formState,
      },
      features: ['100% Zero tailpipe emission & zero vibration', 'Certified Lithium-ion battery health', 'Solar tube-well charging compatible', 'Full NOC & ownership transfer ready'],
      pros: ['Zero diesel spending', 'Instant torque from 0 RPM', 'Quiet & comfortable operation'],
      cons: ['Requires 16A/32A electrical point at farm'],
      listingStatus: currentUser.role === 'admin' ? 'active' : 'pending',
    });

    setSubmittedSuccess(true);
    const msg =
      lang === 'hi'
        ? 'आपकी लिस्टिंग सफलतापूर्वक दर्ज कर ली गई है! एडमिन मॉडरेशन के बाद यह पोर्टल पर लाइव हो जाएगी।'
        : 'Your listing has been submitted for admin approval.';
    playTTS(msg, lang === 'hi' ? 'लिस्टिंग दर्ज' : 'Listing Submitted');

    setTimeout(() => {
      setSubmittedSuccess(false);
      setActiveSubTab('my_listings');
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-950 via-emerald-950 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'सीधा किसान-से-किसान कृषि बाजार' : 'Farmer-to-Farmer Agriculture Marketplace'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi'
              ? 'खरीद-बिक्री बाजार (Buy & Sell Marketplace)'
              : 'Buy & Sell Agricultural Equipment'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? 'नए व पुराने ट्रैक्टर, रोटावेटर, रीपर, हार्वेस्टर व कृषि ड्रोन खरीदें और बेचें। जीरो ब्रोकरेज, सीधे विक्रेता से WhatsApp पर बातचीत।'
              : 'Connect directly with verified farmers and dealers. Zero brokerage, instant WhatsApp contact, and secure listing moderation.'}
          </p>
        </div>
      </div>

      {/* Sub Tabs: Browse / Sell / My Listings */}
      <div className="flex border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setActiveSubTab('browse')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-sm font-bold transition-colors ${
            activeSubTab === 'browse'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-600 hover:text-stone-900 dark:text-stone-400'
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>{lang === 'hi' ? 'बाजार में खोजें (Browse Listings)' : 'Browse Marketplace'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sell')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-sm font-bold transition-colors ${
            activeSubTab === 'sell'
              ? 'border-amber-500 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-stone-600 hover:text-stone-900 dark:text-stone-400'
          }`}
        >
          <PlusCircle className="h-4 w-4" />
          <span>{lang === 'hi' ? 'मुफ्त विज्ञापन दें (Sell Tractor/Machine)' : 'Post Free Listing'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('my_listings')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-sm font-bold transition-colors ${
            activeSubTab === 'my_listings'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-600 hover:text-stone-900 dark:text-stone-400'
          }`}
        >
          <Tag className="h-4 w-4" />
          <span>
            {lang === 'hi' ? 'मेरी लिस्टिंग (My Listings)' : 'My Listings'}{' '}
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-800 dark:bg-stone-800 dark:text-stone-200">
              {myListings.length}
            </span>
          </span>
        </button>
      </div>

      {/* 1. Browse Tab */}
      {activeSubTab === 'browse' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              {lang === 'hi' ? 'हाल ही में पोस्ट की गई मशीनरी (Recent Listings)' : 'Recent Equipment Listings'}
            </h3>
            <span className="text-xs text-stone-500">
              {products.length} {lang === 'hi' ? 'सक्रिय विज्ञापन' : 'active listings'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* 2. Sell Machinery Form Tab */}
      {activeSubTab === 'sell' && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900 max-w-3xl mx-auto">
          {submittedSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white">
                {lang === 'hi' ? 'विज्ञापन सफलतापूर्वक सबमिट हो गया!' : 'Listing Submitted Successfully!'}
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                {lang === 'hi'
                  ? 'हमारी एडमिन टीम द्वारा गुणवत्ता जांच के बाद आपका विज्ञापन 2 घंटे में लाइव कर दिया जाएगा।'
                  : 'Your listing is under review in our admin queue and will be published shortly.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handlePostAd} className="space-y-6">
              <div className="border-b border-stone-100 pb-4 dark:border-stone-800">
                <h3 className="text-lg font-black text-stone-900 dark:text-white">
                  {lang === 'hi' ? 'अपना पुराना या नया ट्रैक्टर/यंत्र बेचें' : 'Sell Your Tractor or Machinery'}
                </h3>
                <p className="text-xs text-stone-500">
                  {lang === 'hi' ? 'विवरण भरें – भारत भर के 10 लाख किसानों तक पहुंचेगा आपका विज्ञापन' : 'Fill details to reach thousands of buyers across India with zero brokerage.'}
                </p>
              </div>

              {/* Step 1: Category & Condition */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'मशीन श्रेणी (Category) *' : 'Category *'}
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  >
                    <option value="electric_tractors">⚡ नया इलेक्ट्रिक ट्रैक्टर (New EV Tractor)</option>
                    <option value="used_tractors">🔋 पुराना प्रमाणित इलेक्ट्रिक ट्रैक्टर (Used EV Tractor)</option>
                    <option value="harvesters">🌾 100% इलेक्ट्रिक कंबाइन हार्वेस्टर व रीपर (Electric Harvester)</option>
                    <option value="power_tillers">🚜 इलेक्ट्रिक पावर टिलर व वीडर (Electric Power Tiller)</option>
                    <option value="sprayers">💧 इलेक्ट्रिक बूम व बैटरी स्प्रेयर (Electric Sprayer)</option>
                    <option value="rotavators">⚙️ ईवी रोटावेटर (Rotavators)</option>
                    <option value="cultivators">🌱 इलेक्ट्रिक कल्टीवेटर (Cultivators)</option>
                    <option value="seed_drills">🌾 सुपर सीडर व प्रेसिजन प्लांटर (Seed Drills)</option>
                    <option value="farm_machinery">🔋 कुट्टी मशीन, पुआल बेलर, थ्रेशर (Chaff Cutter / Baler / Thresher)</option>
                    <option value="agricultural_drones">🚁 कृषि स्प्रेयर ड्रोन (Agri Drone)</option>
                    <option value="irrigation_equipment">☀️ सोलर वाटर पंप (Solar Submersible)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'उपकरण स्थिति (Condition) *' : 'Condition *'}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setFormCondition('used')}
                      className={`rounded-xl py-2.5 border transition-all ${
                        formCondition === 'used'
                          ? 'border-amber-500 bg-amber-50 text-amber-900 font-black'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      {lang === 'hi' ? 'पुराना EV' : 'Used EV'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormCondition('new')}
                      className={`rounded-xl py-2.5 border transition-all ${
                        formCondition === 'new'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-black'
                          : 'border-stone-200 text-stone-600'
                      }`}
                    >
                      {lang === 'hi' ? 'बिल्कुल नया' : 'Brand New'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2: Title & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'विज्ञापन शीर्षक (Product Title) *' : 'Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder={lang === 'hi' ? 'उदा. महिंद्रा ओजा 3140 इलेक्ट्रिक 4WD 2023 मॉडल' : 'e.g. Mahindra OJA 3140 Electric 4WD'}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'ब्रांड (EV Brand) *' : 'EV Brand *'}
                  </label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  >
                    <option value="Mahindra Electric">Mahindra Electric (महिंद्रा)</option>
                    <option value="Sonalika">Sonalika Tiger Electric (सोनालिका)</option>
                    <option value="Swaraj Electric">Swaraj Electric (स्वराज)</option>
                    <option value="Kartar Electric">Kartar Electric (करतार हार्वेस्टर)</option>
                    <option value="BCS Electric">BCS Electric (रीपर बाइंडर)</option>
                    <option value="VST Tillers">VST Tillers (ई-पावर टिलर)</option>
                    <option value="Aspee Electric">Aspee Electric (ई-स्प्रेयर)</option>
                    <option value="Falcon Electric">Falcon Electric (कुट्टी मशीन)</option>
                    <option value="New Holland Electric">New Holland Electric (ई-बेलर)</option>
                    <option value="Dashmesh Electric">Dashmesh Electric (ई-थ्रेशर)</option>
                    <option value="National Agrotech">National Agrotech (सुपर सीडर)</option>
                    <option value="Fieldking Electric">Fieldking Electric (प्लांटर)</option>
                    <option value="Shaktiman">Shaktiman (शक्तिमान रोटावेटर)</option>
                    <option value="Celestial">Celestial e-Mobility</option>
                    <option value="AutoNxt">AutoNxt IoT Electric</option>
                    <option value="John Deere Electric">John Deere Electric</option>
                    <option value="Garuda Aerospace">Garuda Aerospace (ड्रोन)</option>
                    <option value="IoTechWorld">IoTechWorld (ड्रोन)</option>
                    <option value="Shakti Pumps">Shakti Pumps (सोलर पंप)</option>
                    <option value="Kirloskar">Kirloskar Solar</option>
                    <option value="Kisan Urja">Kisan Urja (सोलर फार्म चार्जर)</option>
                  </select>
                </div>
              </div>

              {/* Step 3: Electric Powertrain Specs (HP, Battery kWh, Battery Health, Fast Charging) */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'हॉर्सपावर (HP)' : 'HP Equivalent'}
                  </label>
                  <input
                    type="number"
                    value={formHp}
                    onChange={(e) => setFormHp(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'बैटरी क्षमता (kWh)' : 'Battery (kWh)'}
                  </label>
                  <input
                    type="number"
                    value={formBatteryKwh}
                    onChange={(e) => setFormBatteryKwh(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>

                {formCondition === 'used' ? (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {lang === 'hi' ? 'बैटरी लाइफ / हेल्थ (%)' : 'Battery Health (%)'}
                    </label>
                    <input
                      type="number"
                      min={50}
                      max={100}
                      value={formBatteryHealth}
                      onChange={(e) => setFormBatteryHealth(Number(e.target.value))}
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold text-emerald-700 dark:border-stone-700 dark:bg-stone-800 dark:text-emerald-400"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {lang === 'hi' ? 'फास्ट चार्ज समय (घंटे)' : 'Fast Charge (hrs)'}
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      value={formChargingTime}
                      onChange={(e) => setFormChargingTime(Number(e.target.value))}
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'मांगी गई कीमत (₹) *' : 'Asking Price ₹ *'}
                  </label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-black text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-400"
                  />
                </div>
              </div>

              {/* Step 4: Photo URL */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {lang === 'hi' ? 'फोटो वेब लिंक (Image URL)' : 'Photo URL'}
                </label>
                <div className="relative">
                  <Upload className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 pl-10 pr-3 py-2 text-xs sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">
                  * खाली छोड़ने पर मानक प्रामाणिक कृषि उपकरण फोटो स्वतः लग जाएगी।
                </span>
              </div>

              {/* Step 5: Description */}
              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {lang === 'hi' ? 'उपकरण विवरण व स्थिति (Description)' : 'Description'}
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder={lang === 'hi' ? 'उदा. सिंगल हैंड चला, 80% टायर बाकी, इंजन कोई काम नहीं, एनओसी तैयार...' : 'Condition, tires, battery, NOC...'}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                />
              </div>

              {/* Step 6: Location & Seller contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-stone-100 pt-4 dark:border-stone-800">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'राज्य (State)' : 'State'}
                  </label>
                  <input
                    type="text"
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'जिला (District)' : 'District'}
                  </label>
                  <input
                    type="text"
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'फोन / WhatsApp' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={sellerPhone}
                    onChange={(e) => setSellerPhone(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-xs sm:text-sm dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="border-t border-stone-100 pt-4 dark:border-stone-800 flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  🔒 {lang === 'hi' ? 'मुफ्त विज्ञापन – 100% नि:शुल्क' : 'Free listing – No brokerage'}
                </span>
                <button
                  type="submit"
                  className="rounded-xl bg-amber-500 hover:bg-amber-600 px-6 py-2.5 text-xs sm:text-sm font-black text-stone-950 shadow-md transition-colors"
                >
                  {lang === 'hi' ? 'विज्ञापन सबमिट करें' : 'Submit Listing for Review'}
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* 3. My Listings Tab */}
      {activeSubTab === 'my_listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              {lang === 'hi' ? 'मेरे द्वारा लिस्ट किए गए उत्पाद' : 'My Posted Listings'}
            </h3>
            <button
              onClick={() => setActiveSubTab('sell')}
              className="rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-stone-950"
            >
              + नया विज्ञापन जोड़ें
            </button>
          </div>

          <div className="space-y-3">
            {myListings.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 gap-4"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-14 w-20 rounded-xl object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-sm text-stone-900 dark:text-white">
                        {item.title}
                      </h4>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-black ${
                          item.listingStatus === 'active'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : item.listingStatus === 'pending'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300'
                        }`}
                      >
                        {item.listingStatus === 'active' && 'लाइव (ACTIVE)'}
                        {item.listingStatus === 'pending' && 'समीक्षाधीन (PENDING)'}
                        {item.listingStatus === 'sold' && 'बिक चुका (SOLD)'}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-emerald-700 dark:text-amber-400 mt-0.5">
                      {item.priceDisplay}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      📍 {item.location.district}, {item.location.state} • {item.viewsCount} देखा गया • {item.enquiriesCount} पूछताछ
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  {item.listingStatus !== 'sold' && (
                    <button
                      onClick={() => markAsSold(item.id)}
                      className="rounded-xl bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300"
                    >
                      {lang === 'hi' ? 'बिक गया चिह्नित करें' : 'Mark Sold'}
                    </button>
                  )}
                  <button
                    onClick={() => deleteListing(item.id)}
                    className="rounded-xl p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
