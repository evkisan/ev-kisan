import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { MobileDrawer } from './components/common/MobileDrawer';
import { VoiceModal } from './components/common/VoiceModal';
import { DistrictModal } from './components/common/DistrictModal';
import { NotificationsModal } from './components/common/NotificationsModal';
import { ProductDetailModal } from './components/common/ProductDetailModal';
import { EnquiryModal } from './components/common/EnquiryModal';
import { CompareBar } from './components/common/CompareBar';
import { TextToSpeechBar } from './components/common/TextToSpeechBar';

// Pages
import { HomePage } from './pages/HomePage';
import { GovernmentSchemesPage } from './pages/GovernmentSchemesPage';
import { MandiBhavPage } from './pages/MandiBhavPage';
import { WeatherPage } from './pages/WeatherPage';
import { CropInformationPage } from './pages/CropInformationPage';
import { CropDiseasesPage } from './pages/CropDiseasesPage';
import { SeedsFertilizersPage } from './pages/SeedsFertilizersPage';
import { AgriculturalEquipmentPage } from './pages/AgriculturalEquipmentPage';
import { BuyAndSellPage } from './pages/BuyAndSellPage';
import { ComparePage } from './pages/ComparePage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { AgriculturalTrainingPage } from './pages/AgriculturalTrainingPage';
import { AgricultureNewsPage } from './pages/AgricultureNewsPage';
import { KisanSahayataPage } from './pages/KisanSahayataPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminPanelPage } from './pages/AdminPanelPage';

const AppContent: React.FC = () => {
  const { activeTab } = useApp();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 transition-colors">
      {/* Global Header */}
      <Header onOpenMobileMenu={() => setIsMobileDrawerOpen(true)} />

      {/* Main Active Page View */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'schemes' && <GovernmentSchemesPage />}
        {activeTab === 'mandi' && <MandiBhavPage />}
        {activeTab === 'weather' && <WeatherPage />}
        {activeTab === 'crop_info' && <CropInformationPage />}
        {activeTab === 'crop_diseases' && <CropDiseasesPage />}
        {activeTab === 'seeds_fertilizers' && <SeedsFertilizersPage />}
        {activeTab === 'equipment' && <AgriculturalEquipmentPage />}
        {activeTab === 'buy_sell' && <BuyAndSellPage />}
        {activeTab === 'compare' && <ComparePage />}
        {activeTab === 'calculators' && <CalculatorsPage />}
        {activeTab === 'training' && <AgriculturalTrainingPage />}
        {activeTab === 'news' && <AgricultureNewsPage />}
        {activeTab === 'kisan_sahayata' && <KisanSahayataPage />}
        {activeTab === 'dashboard' && <UserDashboardPage />}
        {activeTab === 'admin' && <AdminPanelPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent & Overlay Components */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />
      <VoiceModal />
      <DistrictModal />
      <NotificationsModal />
      <ProductDetailModal />
      <EnquiryModal />
      <CompareBar />
      <TextToSpeechBar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
