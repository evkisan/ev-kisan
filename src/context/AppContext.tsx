import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  UserProfile,
  ProductListing,
  MandiRecord,
  GovtScheme,
  CropGuide,
  CropDisease,
  WeatherForecast,
  NewsArticle,
  TrainingCourse,
  AppNotification,
  Enquiry,
  FarmerQuestion,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_MANDI_RECORDS,
  INITIAL_SCHEMES,
  INITIAL_CROPS,
  INITIAL_DISEASES,
  INITIAL_WEATHER_DATA,
  INITIAL_NEWS,
  INITIAL_COURSES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ENQUIRIES,
  INITIAL_FARMER_QUESTIONS,
} from '../data/mockData';
import { speakText, stopSpeech, pauseSpeech, resumeSpeech } from '../utils/speech';

export type NavigationTab =
  | 'home'
  | 'schemes'
  | 'mandi'
  | 'weather'
  | 'crop_info'
  | 'crop_diseases'
  | 'seeds_fertilizers'
  | 'equipment'
  | 'buy_sell'
  | 'compare'
  | 'calculators'
  | 'training'
  | 'news'
  | 'kisan_sahayata'
  | 'dashboard'
  | 'admin';

export interface LocationSelection {
  state: string;
  district: string;
  block: string;
}

export interface TTSPlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
  title: string;
  speed: number;
}

interface AppContextType {
  // Navigation & Localization
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  lang: 'hi' | 'en';
  setLang: (lang: 'hi' | 'en') => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;

  // Location
  location: LocationSelection;
  setLocation: (loc: LocationSelection) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;

  // User & Roles
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  switchRole: (role: UserRole) => void;

  // Listings & Marketplace
  products: ProductListing[];
  setProducts: React.Dispatch<React.SetStateAction<ProductListing[]>>;
  addListing: (newListing: Omit<ProductListing, 'id' | 'viewsCount' | 'enquiriesCount' | 'createdAt'>) => void;
  updateListing: (id: string, updates: Partial<ProductListing>) => void;
  deleteListing: (id: string) => void;
  markAsSold: (id: string) => void;
  moderateListing: (id: string, status: 'active' | 'rejected') => void;

  // Modals & Detail views
  activeProductModal: ProductListing | null;
  setActiveProductModal: (prod: ProductListing | null) => void;
  activeEnquiryModal: ProductListing | null;
  setActiveEnquiryModal: (prod: ProductListing | null) => void;

  // Comparison
  compareIds: string[];
  addToCompare: (productId: string) => { success: boolean; message: string };
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;

  // Wishlist / Favourites
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;

  // Enquiries
  enquiries: Enquiry[];
  submitEnquiry: (listingId: string, listingTitle: string, name: string, phone: string, location: string, msg: string) => void;

  // Mandi & Data records
  mandiRecords: MandiRecord[];
  updateMandiPrice: (id: string, minPrice: number, maxPrice: number, modalPrice: number) => void;
  schemes: GovtScheme[];
  crops: CropGuide[];
  diseases: CropDisease[];
  weatherData: Record<string, WeatherForecast>;
  news: NewsArticle[];
  addNewsArticle: (article: Omit<NewsArticle, 'id'>) => void;
  updateNewsArticle: (id: string, updates: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;
  courses: TrainingCourse[];
  farmerQuestions: FarmerQuestion[];
  addFarmerQuestion: (q: Omit<FarmerQuestion, 'id' | 'askedAt'>) => void;
  answerFarmerQuestion: (id: string, answer: string, expertName: string) => void;

  // Notifications
  notifications: AppNotification[];
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  markNotificationRead: (id: string) => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp'>) => void;

  // Voice & TTS Audio Assistant
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (open: boolean) => void;
  ttsState: TTSPlayerState;
  playTTS: (text: string, title?: string) => void;
  pauseTTS: () => void;
  resumeTTS: () => void;
  stopTTS: () => void;
  setTTSSpeed: (speed: number) => void;

  // Global search query
  globalSearch: string;
  setGlobalSearch: (q: string) => void;
  executeVoiceSearch: (transcript: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_ROLE_PROFILES: Record<UserRole, UserProfile> = {
  farmer: {
    id: 'user-farmer-1',
    name: 'रामवीर सिंह (किसान)',
    phone: '+91 98765 11000',
    email: 'ramveer.kisan@gmail.com',
    role: 'farmer',
    isVerified: true,
    state: 'Haryana',
    district: 'Karnal',
    block: 'Gharaunda',
    avatar: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80',
  },
  dealer: {
    id: 'user-dealer-1',
    name: 'विकास शर्मा (अधिकृत डीलर)',
    phone: '+91 98111 44550',
    email: 'vikas.tractors@gmail.com',
    role: 'dealer',
    isVerified: true,
    state: 'Uttar Pradesh',
    district: 'Meerut',
    block: 'Partapur',
    businessName: 'कौशिक ट्रैक्टर्स व कृषि यंत्र एजेंसी',
    gstin: '09AAACK1234F1Z8',
  },
  seller: {
    id: 'user-seller-1',
    name: 'सुरेश गुर्जर (विक्रेता / किसान)',
    phone: '+91 94140 88990',
    email: 'suresh.seller@gmail.com',
    role: 'seller',
    isVerified: true,
    state: 'Rajasthan',
    district: 'Kota',
    block: 'Ladpura',
    businessName: 'गुर्जर फार्म मशीनरी हब',
  },
  expert: {
    id: 'user-expert-1',
    name: 'डॉ. सत्यपाल त्यागी (मुख्य कृषि वैज्ञानिक)',
    phone: '+91 94500 22331',
    email: 'dr.tyagi.icar@gov.in',
    role: 'expert',
    isVerified: true,
    state: 'Haryana',
    district: 'Karnal',
    block: 'ICAR-CSSRI',
    businessName: 'भारतीय कृषि अनुसंधान परिषद (ICAR)',
  },
  admin: {
    id: 'user-admin-1',
    name: 'सुपर एडमिन (EV Kisan Team)',
    phone: '+91 1800 180 1551',
    email: 'admin@evkisan.in',
    role: 'admin',
    isVerified: true,
    state: 'Delhi',
    district: 'New Delhi',
    block: 'HQ',
    businessName: 'EV Kisan Platform Operations',
  },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & localization
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [lang, setLang] = useState<'hi' | 'en'>('hi');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ev_kisan_dark') === 'true';
    }
    return false;
  });

  // Location
  const [location, setLocation] = useState<LocationSelection>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ev_kisan_location');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return { state: 'Haryana', district: 'Karnal', block: 'Gharaunda' };
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Current User
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const savedRole = localStorage.getItem('ev_kisan_role') as UserRole;
      if (savedRole && USER_ROLE_PROFILES[savedRole]) {
        return USER_ROLE_PROFILES[savedRole];
      }
    }
    return USER_ROLE_PROFILES.farmer;
  });

  // Products - All vehicles strictly 100% Electric
  const [products, setProducts] = useState<ProductListing[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ev_kisan_products_v3');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((p: ProductListing) => ({
              ...p,
              fuelType: 'electric' as const,
            }));
          }
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Modals
  const [activeProductModal, setActiveProductModal] = useState<ProductListing | null>(null);
  const [activeEnquiryModal, setActiveEnquiryModal] = useState<ProductListing | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Compare & Wishlist
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ev_kisan_compare');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return ['prod-1', 'prod-3']; // Default comparison between Mahindra 575 DI & Swaraj 855 FE
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ev_kisan_wishlist');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return ['prod-2', 'prod-4'];
  });

  // Enquiries
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ev_kisan_enquiries');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return INITIAL_ENQUIRIES;
  });

  // Mandi & Data
  const [mandiRecords, setMandiRecords] = useState<MandiRecord[]>(INITIAL_MANDI_RECORDS);
  const [schemes] = useState<GovtScheme[]>(INITIAL_SCHEMES);
  const [crops] = useState<CropGuide[]>(INITIAL_CROPS);
  const [diseases] = useState<CropDisease[]>(INITIAL_DISEASES);
  const [weatherData] = useState<Record<string, WeatherForecast>>(INITIAL_WEATHER_DATA);
  const [courses] = useState<TrainingCourse[]>(INITIAL_COURSES);
  const [news, setNews] = useState<NewsArticle[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ev_kisan_news_v2');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_NEWS;
  });
  const [farmerQuestions, setFarmerQuestions] = useState<FarmerQuestion[]>(INITIAL_FARMER_QUESTIONS);

  // Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Global search
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Audio / TTS State
  const [ttsState, setTtsState] = useState<TTSPlayerState>({
    isPlaying: false,
    isPaused: false,
    currentText: '',
    title: '',
    speed: 1.0,
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ev_kisan_location', JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem('ev_kisan_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ev_kisan_compare', JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    localStorage.setItem('ev_kisan_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('ev_kisan_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('ev_kisan_dark', String(isDark));
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Switch role handler
  const switchRole = (role: UserRole) => {
    const profile = USER_ROLE_PROFILES[role];
    setCurrentUser(profile);
    localStorage.setItem('ev_kisan_role', role);
  };

  // Add Listing (strictly 100% Electric)
  const addListing = (newListingData: Omit<ProductListing, 'id' | 'viewsCount' | 'enquiriesCount' | 'createdAt'>) => {
    const newListing: ProductListing = {
      ...newListingData,
      id: `prod-${Date.now()}`,
      fuelType: 'electric',
      viewsCount: 1,
      enquiriesCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      listingStatus: currentUser.role === 'admin' ? 'active' : 'pending',
    };
    setProducts((prev) => {
      const updated = [newListing, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('ev_kisan_products_v2', JSON.stringify(updated));
      }
      return updated;
    });

    // Add alert notification for admin moderation
    addNotification({
      title: 'नई लिस्टिंग अनुमोदन के लिए प्राप्त',
      titleHi: 'नई लिस्टिंग अनुमोदन के लिए प्राप्त',
      message: `${newListing.title} को एडमिन अप्रूवल के लिए सबमिट किया गया है।`,
      messageHi: `${newListing.titleHi} को एडमिन अप्रूवल के लिए सबमिट किया गया है।`,
      type: 'marketplace',
      priority: 'normal',
      targetTab: 'admin',
    });
  };

  const updateListing = (id: string, updates: Partial<ProductListing>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteListing = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCompareIds((prev) => prev.filter((cId) => cId !== id));
    setWishlistIds((prev) => prev.filter((wId) => wId !== id));
  };

  const markAsSold = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, listingStatus: 'sold' } : item))
    );
  };

  const moderateListing = (id: string, status: 'active' | 'rejected') => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, listingStatus: status } : item))
    );
  };

  // Compare actions
  const addToCompare = (productId: string): { success: boolean; message: string } => {
    if (compareIds.includes(productId)) {
      return { success: false, message: lang === 'hi' ? 'यह उत्पाद पहले से तुलना सूची में है' : 'Product already in comparison list' };
    }
    if (compareIds.length >= 4) {
      return { success: false, message: lang === 'hi' ? 'आप एक साथ अधिकतम 4 उत्पादों की तुलना कर सकते हैं' : 'You can compare at most 4 products at a time' };
    }

    const targetProduct = products.find((p) => p.id === productId);
    if (!targetProduct) return { success: false, message: 'Product not found' };

    // Prevent incompatible comparisons
    if (compareIds.length > 0) {
      const firstProduct = products.find((p) => p.id === compareIds[0]);
      if (firstProduct) {
        const isTargetTractor = ['tractors', 'used_tractors', 'electric_tractors'].includes(targetProduct.category);
        const isFirstTractor = ['tractors', 'used_tractors', 'electric_tractors'].includes(firstProduct.category);

        if (isFirstTractor !== isTargetTractor) {
          return {
            success: false,
            message: lang === 'hi'
              ? 'असंगत तुलना: ट्रैक्टर की तुलना केवल ट्रैक्टर से ही की जा सकती है, उपकरण या खाद से नहीं।'
              : 'Incompatible comparison: Tractors can only be compared with tractors, not implements or fertilizers.'
          };
        }
      }
    }

    setCompareIds((prev) => [...prev, productId]);
    return {
      success: true,
      message: lang === 'hi' ? 'तुलना सूची में जोड़ा गया' : 'Added to comparison list'
    };
  };

  const removeFromCompare = (productId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== productId));
  };

  const clearCompare = () => {
    setCompareIds([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Enquiries
  const submitEnquiry = (
    listingId: string,
    listingTitle: string,
    name: string,
    phone: string,
    buyerLocation: string,
    msg: string
  ) => {
    const newEnq: Enquiry = {
      id: `enq-${Date.now()}`,
      listingId,
      listingTitle,
      buyerName: name,
      buyerPhone: phone,
      buyerLocation,
      message: msg,
      createdAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      status: 'new',
    };
    setEnquiries((prev) => [newEnq, ...prev]);

    // Increment listing enquiry count
    setProducts((prev) =>
      prev.map((item) =>
        item.id === listingId ? { ...item, enquiriesCount: item.enquiriesCount + 1 } : item
      )
    );

    addNotification({
      title: 'नई इन्क्वायरी दर्ज हुई!',
      titleHi: 'नई इन्क्वायरी दर्ज हुई!',
      message: `${name} ने ${listingTitle} के लिए पूछताछ भेजी है।`,
      messageHi: `${name} ने ${listingTitle} के लिए पूछताछ भेजी है।`,
      type: 'marketplace',
      priority: 'normal',
      targetTab: 'dashboard',
    });
  };

  // Mandi updates
  const updateMandiPrice = (id: string, minPrice: number, maxPrice: number, modalPrice: number) => {
    setMandiRecords((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              minPrice,
              maxPrice,
              modalPrice,
              updatedAt: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
            }
          : item
      )
    );
  };

  // Farmer Q&A
  const addFarmerQuestion = (q: Omit<FarmerQuestion, 'id' | 'askedAt'>) => {
    const newQ: FarmerQuestion = {
      ...q,
      id: `fq-${Date.now()}`,
      askedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setFarmerQuestions((prev) => [newQ, ...prev]);
  };

  const answerFarmerQuestion = (id: string, answer: string, expertName: string) => {
    setFarmerQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              answer,
              answeredBy: expertName,
              answeredAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            }
          : q
      )
    );
  };

  // WordPress-style News Author CMS Actions
  const addNewsArticle = (newArtData: Omit<NewsArticle, 'id'>) => {
    const newArt: NewsArticle = {
      ...newArtData,
      id: `news-${Date.now()}`,
      status: newArtData.status || 'published',
      viewsCount: 1,
    };
    setNews((prev) => {
      const updated = [newArt, ...prev];
      if (typeof window !== 'undefined') {
        localStorage.setItem('ev_kisan_news_v2', JSON.stringify(updated));
      }
      return updated;
    });

    if (newArt.status === 'published') {
      addNotification({
        title: 'नया कृषि समाचार प्रकाशित हुआ!',
        titleHi: 'नया कृषि समाचार प्रकाशित हुआ!',
        message: `${newArt.titleHi}`,
        messageHi: `${newArt.titleHi}`,
        type: 'general',
        priority: 'normal',
        targetTab: 'news',
      });
    }
  };

  const updateNewsArticle = (id: string, updates: Partial<NewsArticle>) => {
    setNews((prev) => {
      const updated = prev.map((item) => (item.id === id ? { ...item, ...updates } : item));
      if (typeof window !== 'undefined') {
        localStorage.setItem('ev_kisan_news_v2', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const deleteNewsArticle = (id: string) => {
    setNews((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ev_kisan_news_v2', JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const addNotification = (notif: Omit<AppNotification, 'id' | 'timestamp'>) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'अभी-अभी',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Audio / TTS Controls
  const playTTS = (text: string, title?: string) => {
    setTtsState((prev) => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
      currentText: text,
      title: title || (lang === 'hi' ? 'ऑडियो जानकारी' : 'Audio Guide'),
    }));

    speakText(text, lang === 'hi' ? 'hi-IN' : 'en-IN', ttsState.speed, () => {
      setTtsState((prev) => ({ ...prev, isPlaying: false, isPaused: false }));
    });
  };

  const pauseTTS = () => {
    pauseSpeech();
    setTtsState((prev) => ({ ...prev, isPaused: true }));
  };

  const resumeTTS = () => {
    resumeSpeech();
    setTtsState((prev) => ({ ...prev, isPaused: false }));
  };

  const stopTTS = () => {
    stopSpeech();
    setTtsState((prev) => ({ ...prev, isPlaying: false, isPaused: false, currentText: '' }));
  };

  const setTTSSpeed = (speed: number) => {
    setTtsState((prev) => ({ ...prev, speed }));
    if (ttsState.isPlaying && !ttsState.isPaused && ttsState.currentText) {
      speakText(ttsState.currentText, lang === 'hi' ? 'hi-IN' : 'en-IN', speed, () => {
        setTtsState((prev) => ({ ...prev, isPlaying: false, isPaused: false }));
      });
    }
  };

  // Bolne Wala System / Voice Search execution
  const executeVoiceSearch = (transcript: string) => {
    const clean = transcript.trim();
    if (!clean) return;

    setGlobalSearch(clean);

    // Filter matches
    const lower = clean.toLowerCase();
    const matchedProducts = products.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.titleHi.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );

    // Speak aloud confirmation & results in Hindi/English
    const resultCount = matchedProducts.length;
    const spokenMessage =
      lang === 'hi'
        ? `आपने खोजा: ${clean}। हमें ईवी किसान पर कुल ${resultCount} उत्पाद और जानकारी मिली है।`
        : `You searched for: ${clean}. Found ${resultCount} listings on EV Kisan.`;

    playTTS(spokenMessage, lang === 'hi' ? 'आवाज़ खोज परिणाम' : 'Voice Search Result');

    // Route to equipment or marketplace
    if (lower.includes('tractor') || lower.includes('ट्रैक्टर') || lower.includes('rotavator') || lower.includes('drone')) {
      setActiveTab('equipment');
    } else if (lower.includes('mandi') || lower.includes('मंडी') || lower.includes('bhav') || lower.includes('भाव')) {
      setActiveTab('mandi');
    } else if (lower.includes('yojna') || lower.includes('योजना') || lower.includes('scheme') || lower.includes('subsidy')) {
      setActiveTab('schemes');
    } else if (lower.includes('weather') || lower.includes('मौसम') || lower.includes('barish') || lower.includes('बारिश')) {
      setActiveTab('weather');
    } else if (lower.includes('rog') || lower.includes('रोग') || lower.includes('disease') || lower.includes('keet')) {
      setActiveTab('crop_diseases');
    } else if (lower.includes('calc') || lower.includes('कैलकुलेटर') || lower.includes('bigha') || lower.includes('बीघा')) {
      setActiveTab('calculators');
    } else {
      setActiveTab('equipment');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        lang,
        setLang,
        isDark,
        setIsDark,
        location,
        setLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        currentUser,
        setCurrentUser,
        switchRole,
        products,
        setProducts,
        addListing,
        updateListing,
        deleteListing,
        markAsSold,
        moderateListing,
        activeProductModal,
        setActiveProductModal,
        activeEnquiryModal,
        setActiveEnquiryModal,
        compareIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        wishlistIds,
        toggleWishlist,
        enquiries,
        submitEnquiry,
        mandiRecords,
        updateMandiPrice,
        schemes,
        crops,
        diseases,
        weatherData,
        news,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,
        courses,
        farmerQuestions,
        addFarmerQuestion,
        answerFarmerQuestion,
        notifications,
        isNotificationsOpen,
        setIsNotificationsOpen,
        markNotificationRead,
        addNotification,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        ttsState,
        playTTS,
        pauseTTS,
        resumeTTS,
        stopTTS,
        setTTSSpeed,
        globalSearch,
        setGlobalSearch,
        executeVoiceSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
