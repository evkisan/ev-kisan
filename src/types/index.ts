export type UserRole = 'farmer' | 'dealer' | 'seller' | 'expert' | 'admin';

export type ProductCategory =
  | 'tractors'
  | 'used_tractors'
  | 'electric_tractors'
  | 'farm_machinery'
  | 'rotavators'
  | 'harvesters'
  | 'cultivators'
  | 'seed_drills'
  | 'power_tillers'
  | 'sprayers'
  | 'agricultural_drones'
  | 'irrigation_equipment'
  | 'seeds'
  | 'fertilizers';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  isVerified: boolean;
  state: string;
  district: string;
  block: string;
  businessName?: string;
  gstin?: string;
  avatar?: string;
}

export interface ProductListing {
  id: string;
  title: string;
  titleHi: string;
  brand: string;
  model: string;
  category: ProductCategory;
  condition: 'new' | 'used' | 'certified';
  price: number;
  priceDisplay: string;
  priceType: 'fixed' | 'negotiable' | 'on_request';
  hp?: number;
  fuelType?: 'electric';
  batteryKwh?: number;
  batteryHealth?: number; // percentage, e.g. 96% for used EV
  chargingTimeHours?: number;
  description: string;
  descriptionHi: string;
  images: string[];
  videoUrl?: string;
  location: {
    state: string;
    district: string;
    block?: string;
  };
  seller: {
    id: string;
    name: string;
    phone: string;
    whatsapp: string;
    isVerified: boolean;
    dealerType: 'individual' | 'authorized_dealer' | 'manufacturer';
    rating: number;
    reviewsCount: number;
  };
  specifications: Record<string, string | number>;
  features: string[];
  pros: string[];
  cons: string[];
  warrantyYears?: number;
  listingStatus: 'active' | 'pending' | 'sold' | 'rejected';
  viewsCount: number;
  enquiriesCount: number;
  createdAt: string;
  isFeatured?: boolean;
}

export interface MandiRecord {
  id: string;
  state: string;
  district: string;
  market: string;
  commodity: string;
  commodityHi: string;
  variety: string;
  arrivalDate: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  source: string;
  updatedAt: string;
}

export interface GovtScheme {
  id: string;
  title: string;
  titleHi: string;
  department: string;
  departmentHi: string;
  category: 'central' | 'state';
  eligibleStates: string[];
  subsidyPercentage: string;
  maxBenefit: string;
  description: string;
  descriptionHi: string;
  keyBenefits: string[];
  eligibilityCriteria: string[];
  documentsRequired: string[];
  applicationDeadline: string;
  officialUrl: string;
  verifiedSource: string;
  lastUpdated: string;
  applicationSteps: string[];
}

export interface CropGuide {
  id: string;
  name: string;
  nameHi: string;
  season: 'Kharif' | 'Rabi' | 'Zaid' | 'Perennial';
  durationDays: string;
  soilType: string;
  temperatureRange: string;
  sowingTime: string;
  seedRate: string;
  irrigationSchedule: string;
  fertilizerDose: string;
  expectedYield: string;
  majorDiseases: string[];
  bestPractices: string[];
  imageUrl: string;
}

export interface CropDisease {
  id: string;
  cropName: string;
  diseaseName: string;
  diseaseNameHi: string;
  category: 'fungal' | 'bacterial' | 'viral' | 'pest' | 'deficiency';
  symptoms: string;
  symptomsHi: string;
  organicRemedy: string;
  chemicalRemedy: string;
  preventiveMeasures: string;
  imageUrl: string;
  urgency: 'low' | 'medium' | 'high';
}

export interface WeatherForecast {
  district: string;
  state: string;
  temp: number;
  condition: string;
  conditionHi: string;
  humidity: number;
  windSpeed: number;
  rainfallChance: number;
  forecast: Array<{
    day: string;
    dayHi: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    conditionHi: string;
    rainfall: number;
    advisory: string;
  }>;
  alert?: {
    level: 'yellow' | 'orange' | 'red';
    message: string;
    advice: string;
  };
  source: string;
  updatedAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  titleHi: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  summaryHi: string;
  content: string;
  source: string;
  sourceUrl: string;
  imageUrl: string;
  author?: string;
  authorRole?: string;
  status?: 'published' | 'draft';
  tags?: string[];
  viewsCount?: number;
}

export interface TrainingCourse {
  id: string;
  title: string;
  titleHi: string;
  instructor: string;
  duration: string;
  mode: 'online' | 'offline' | 'hybrid';
  fees: string;
  certificateProvided: boolean;
  modulesCount: number;
  enrolledCount: number;
  description: string;
  syllabus: string[];
  imageUrl: string;
}

export interface AppNotification {
  id: string;
  title: string;
  titleHi: string;
  message: string;
  messageHi: string;
  type: 'scheme' | 'weather' | 'mandi' | 'marketplace' | 'general';
  timestamp: string;
  isRead?: boolean;
  priority: 'normal' | 'urgent';
  targetTab?: string;
}

export interface Enquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerName: string;
  buyerPhone: string;
  buyerLocation: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

export interface FarmerQuestion {
  id: string;
  farmerName: string;
  district: string;
  crop: string;
  question: string;
  askedAt: string;
  answer?: string;
  answeredBy?: string;
  answeredAt?: string;
}
