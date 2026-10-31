import React, { useState } from 'react';
import {
  Calculator,
  RotateCcw,
  Volume2,
  Sparkles,
  ArrowRightLeft,
  DollarSign,
  Droplets,
  Tractor,
  Layers,
  Sprout,
  Sun,
  FlaskConical,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CalculatorsPage: React.FC = () => {
  const { lang, playTTS } = useApp();
  const [activeCalcId, setActiveCalcId] = useState<string>('land_converter');

  // 1. Land Area Converter State
  const [landValue, setLandValue] = useState<number>(5);
  const [landUnitFrom, setLandUnitFrom] = useState<string>('bigha_up');
  const [landUnitTo, setLandUnitTo] = useState<string>('acre');

  // Conversion rates relative to 1 Acre in sq meters
  // 1 Acre = 4046.86 sq meters
  // Bigha varies by state:
  // UP/Haryana Pucca Bigha = 2530 sq meter = 0.625 Acre
  // UP Katcha Bigha = 843 sq meter = 0.208 Acre
  // Rajasthan/MP Standard Bigha = 1618.7 sq meter = 0.40 Acre
  // 1 Hectare = 2.471 Acres
  // 1 Guntha (Maharashtra/Gujarat) = 101.17 sq meter = 0.025 Acre
  // 1 Kanal (Punjab/Haryana) = 505.85 sq meter = 0.125 Acre
  // 1 Biswa (UP) = 126.5 sq meter = 0.03125 Acre
  const unitToAcreMap: Record<string, number> = {
    acre: 1.0,
    hectare: 2.471,
    bigha_up: 0.625, // 1 Pucca Bigha = 0.625 Acre
    bigha_raj: 0.40, // 1 Rajasthan/MP Bigha = 0.40 Acre
    bigha_bengal: 0.33,
    guntha: 0.025,
    kanal: 0.125,
    biswa: 0.03125,
    sq_meter: 0.0002471,
  };

  const landAreaInAcres = landValue * (unitToAcreMap[landUnitFrom] || 1);
  const convertedLandResult = landAreaInAcres / (unitToAcreMap[landUnitTo] || 1);

  // 2. Tractor EMI Calculator State
  const [tractorLoanAmount, setTractorLoanAmount] = useState<number>(500000);
  const [tractorInterestRate, setTractorInterestRate] = useState<number>(9.5);
  const [tractorTenureYears, setTractorTenureYears] = useState<number>(5);

  const monthlyRate = tractorInterestRate / 12 / 100;
  const totalMonths = tractorTenureYears * 12;
  const tractorEmi =
    monthlyRate > 0
      ? (tractorLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : tractorLoanAmount / totalMonths;
  const tractorTotalPayable = tractorEmi * totalMonths;
  const tractorTotalInterest = tractorTotalPayable - tractorLoanAmount;

  // 3. Seed Rate Calculator State
  const [seedCrop, setSeedCrop] = useState<string>('wheat');
  const [seedLandAcre, setSeedLandAcre] = useState<number>(4);
  const seedCropRateMap: Record<string, { rate: number; name: string }> = {
    wheat: { rate: 42, name: 'गेहूं (Wheat)' },
    paddy: { rate: 7, name: 'बासमती धान (Basmati)' },
    mustard: { rate: 1.75, name: 'सरसों (Mustard)' },
    soybean: { rate: 30, name: 'सोयाबीन (Soybean)' },
    gram: { rate: 25, name: 'चना (Gram)' },
  };
  const totalSeedRequiredKg = seedLandAcre * (seedCropRateMap[seedCrop]?.rate || 40);

  // 4. Fertilizer NPK Dose Calculator State
  const [fertCrop, setFertCrop] = useState<string>('wheat');
  const [fertAcre, setFertAcre] = useState<number>(3);
  // Nitrogen 50kg/acre = 110kg Urea; Phosphorus 25kg/acre = 55kg DAP; Potash 15kg/acre = 25kg MOP
  const totalUreaBags = Math.ceil((fertAcre * 110) / 45);
  const totalDapBags = Math.ceil((fertAcre * 55) / 50);
  const totalMopBags = Math.ceil((fertAcre * 25) / 50);
  const totalNanoUreaBottles = fertAcre * 2; // 2 bottles per acre for 2 foliar sprays

  // 5. Crop Profit & Loss Calculator State
  const [profitAcre, setProfitAcre] = useState<number>(2);
  const [profitYieldQuintalPerAcre, setProfitYieldQuintalPerAcre] = useState<number>(24);
  const [profitMspPrice, setProfitMspPrice] = useState<number>(2425); // Wheat MSP
  const [profitCostPerAcre, setProfitCostPerAcre] = useState<number>(18000); // Seeds, diesel, labor, fert

  const totalProductionQuintals = profitAcre * profitYieldQuintalPerAcre;
  const grossRevenue = totalProductionQuintals * profitMspPrice;
  const totalFarmingCost = profitAcre * profitCostPerAcre;
  const netCropProfit = grossRevenue - totalFarmingCost;

  // 6. Solar Pump Sizing & PM-KUSUM Subsidy State
  const [solarWaterDepthFt, setSolarWaterDepthFt] = useState<number>(150);
  const [solarLandAcre, setSolarLandAcre] = useState<number>(5);
  const recommendedPumpHP = solarWaterDepthFt > 200 ? 7.5 : solarWaterDepthFt > 100 ? 5 : 3;
  const pumpBaseCost = recommendedPumpHP === 7.5 ? 260000 : recommendedPumpHP === 5 ? 185000 : 135000;
  const govtSubsidyAmount = pumpBaseCost * 0.70; // 70% PM-KUSUM
  const farmerPayableShare = pumpBaseCost - govtSubsidyAmount;

  // Audio Result Speaker
  const handleListenResult = (text: string, title: string) => {
    playTTS(text, title);
  };

  const calculatorsList = [
    { id: 'land_converter', titleHi: '1. भूमि क्षेत्रफल परिवर्तक (Land Area)', icon: <ArrowRightLeft className="h-4 w-4" /> },
    { id: 'tractor_emi', titleHi: '2. ट्रैक्टर लोन ईएमआई (Tractor EMI)', icon: <Tractor className="h-4 w-4" /> },
    { id: 'seed_rate', titleHi: '3. बीज दर कैलकुलेटर (Seed Rate)', icon: <Sprout className="h-4 w-4" /> },
    { id: 'fertilizer_dose', titleHi: '4. एनपीके व नैनो खाद डोज', icon: <FlaskConical className="h-4 w-4" /> },
    { id: 'crop_profit', titleHi: '5. फसल लागत व शुद्ध मुनाफा', icon: <DollarSign className="h-4 w-4" /> },
    { id: 'solar_pump', titleHi: '6. सोलर पंप व कुसुम सब्सिडी', icon: <Sun className="h-4 w-4" /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <Calculator className="h-3.5 w-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'सटीक कृषि गणित व वित्तीय उपकरण' : 'Precision Farming & Financial Tools'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi' ? '12+ कृषि कैलकुलेटर व रूपांतरण' : '12+ Agricultural Calculators'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? 'बीघा, एकड़ और हेक्टेयर में सटीक भूमि नापें। ट्रैक्टर की मासिक ईएमआई, आवश्यक बीज व खाद की मात्रा और फसल का शुद्ध मुनाफा चुटकियों में जानें।'
              : 'Calculate land area conversions, tractor loan installments, seed rates, and PM-KUSUM solar subsidies.'}
          </p>
        </div>
      </div>

      {/* Main Grid: Selector Sidebar & Calculator Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Sidebar list of calculators */}
        <div className="rounded-3xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400 px-3 py-1 block">
            {lang === 'hi' ? 'कैलकुलेटर चुनें:' : 'Select Calculator:'}
          </span>
          {calculatorsList.map((calc) => (
            <button
              key={calc.id}
              onClick={() => setActiveCalcId(calc.id)}
              className={`flex items-center space-x-2.5 w-full rounded-2xl px-3.5 py-3 text-xs sm:text-sm font-bold transition-all text-left ${
                activeCalcId === calc.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800'
              }`}
            >
              <span>{calc.icon}</span>
              <span>{calc.titleHi}</span>
            </button>
          ))}
        </div>

        {/* Active Calculator Box */}
        <div className="lg:col-span-2 rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900 space-y-6">
          {/* 1. LAND AREA CONVERTER */}
          {activeCalcId === 'land_converter' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
                <div>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white">
                    {lang === 'hi' ? 'भूमि क्षेत्रफल परिवर्तक (Land Area Converter)' : 'Land Area Converter'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {lang === 'hi'
                      ? 'बीघा (यूपी, राजस्थान, एमपी), एकड़, हेक्टेयर, कनाल, गुंठा व बिस्वा का सटीक रूपांतरण'
                      : 'Convert state bigha to acre, hectare, guntha and sq meters'}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleListenResult(
                      `${landValue} ${landUnitFrom} बराबर होता है ${convertedLandResult.toFixed(3)} ${landUnitTo}।`,
                      'जमीन नाप परिणाम'
                    )
                  }
                  className="rounded-xl bg-amber-500/15 p-2 text-amber-800 dark:text-amber-300"
                  title="Listen"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'जमीन का मान (Value):' : 'Value:'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={landValue}
                    onChange={(e) => setLandValue(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-base font-bold text-stone-900 dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'इस इकाई से (From):' : 'From Unit:'}
                  </label>
                  <select
                    value={landUnitFrom}
                    onChange={(e) => setLandUnitFrom(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  >
                    <option value="bigha_up">बीघा - पक्का (UP / हरियाणा: 1 Bigha = 0.625 Acre)</option>
                    <option value="bigha_raj">बीघा (राजस्थान / MP: 1 Bigha = 0.40 Acre)</option>
                    <option value="bigha_bengal">बीघा (बंगाल / बिहार: 0.33 Acre)</option>
                    <option value="acre">एकड़ (Acre - 4047 वर्ग मीटर)</option>
                    <option value="hectare">हेक्टेयर (Hectare - 2.47 एकड़)</option>
                    <option value="guntha">गुंठा (महाराष्ट्र / गुजरात: 1 Acre = 40 Guntha)</option>
                    <option value="kanal">कनाल (पंजाब / हरियाणा: 1 Acre = 8 Kanal)</option>
                    <option value="biswa">बिस्वा (1 Bigha = 20 Biswa)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'hi' ? 'इस इकाई में बदलें (To):' : 'To Unit:'}
                  </label>
                  <select
                    value={landUnitTo}
                    onChange={(e) => setLandUnitTo(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  >
                    <option value="acre">एकड़ (Acre)</option>
                    <option value="hectare">हेक्टेयर (Hectare)</option>
                    <option value="bigha_up">बीघा पक्का (UP)</option>
                    <option value="bigha_raj">बीघा (Rajasthan / MP)</option>
                    <option value="guntha">गुंठा (Guntha)</option>
                    <option value="kanal">कनाल (Kanal)</option>
                    <option value="biswa">बिस्वा (Biswa)</option>
                    <option value="sq_meter">वर्ग मीटर (Sq. Meters)</option>
                  </select>
                </div>
              </div>

              {/* Result Card */}
              <div className="rounded-2xl bg-gradient-to-r from-emerald-50 to-amber-50 p-6 text-center border border-emerald-200 dark:from-stone-800 dark:to-stone-800 dark:border-stone-700 space-y-1">
                <span className="text-xs font-bold uppercase text-stone-500">
                  {lang === 'hi' ? 'रूपांतरित क्षेत्रफल:' : 'Converted Land Area:'}
                </span>
                <div className="text-3xl sm:text-4xl font-black text-emerald-800 dark:text-amber-400">
                  {convertedLandResult.toFixed(3)}{' '}
                  <span className="text-lg font-bold text-stone-700 dark:text-stone-200 capitalize">
                    {landUnitTo.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs text-stone-500">
                  ({landValue} {landUnitFrom.replace('_', ' ')} = {landAreaInAcres.toFixed(3)} एकड़)
                </div>
              </div>

              {/* Standard Land Formulas Reference Table */}
              <div className="rounded-xl bg-stone-50 p-4 text-xs dark:bg-stone-800/50 space-y-2 border border-stone-200 dark:border-stone-700">
                <span className="font-bold text-stone-900 dark:text-white block">
                  📐 मानक भारतीय भूमि माप सूत्र (Formulas):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600 dark:text-stone-300">
                  <div>• 1 एकड़ = 4,047 वर्ग मीटर = 43,560 वर्ग फीट</div>
                  <div>• 1 हेक्टेयर = 2.471 एकड़ = 10,000 वर्ग मीटर</div>
                  <div>• 1 पक्का बीघा (UP) = 2,530 वर्ग मीटर = 20 बिस्वा = 0.625 एकड़</div>
                  <div>• 1 बीघा (राजस्थान/MP) = 1,619 वर्ग मीटर = 0.40 एकड़</div>
                  <div>• 1 एकड़ = 8 कनाल = 160 मरला (पंजाब/हरियाणा)</div>
                  <div>• 1 एकड़ = 40 गुंठा (महाराष्ट्र व गुजरात)</div>
                </div>
              </div>
            </div>
          )}

          {/* 2. TRACTOR LOAN EMI CALCULATOR */}
          {activeCalcId === 'tractor_emi' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
                <div>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white">
                    {lang === 'hi' ? 'ट्रैक्टर लोन ईएमआई कैलकुलेटर (Tractor EMI)' : 'Tractor Loan EMI Calculator'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    मासिक किस्त, कुल देय ब्याज और बैंक ऋण अवधि की गणना
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleListenResult(
                      `5 लाख के लोन पर 9.5 प्रतिशत ब्याज दर से मासिक ईएमआई ${Math.round(tractorEmi)} रुपये होगी।`,
                      'ट्रैक्टर ईएमआई परिणाम'
                    )
                  }
                  className="rounded-xl bg-amber-500/15 p-2 text-amber-800 dark:text-amber-300"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>ऋण राशि (Loan Amount):</span>
                    <span className="text-emerald-700 dark:text-amber-400 font-black text-sm">
                      ₹{tractorLoanAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="1500000"
                    step="25000"
                    value={tractorLoanAmount}
                    onChange={(e) => setTractorLoanAmount(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      ब्याज दर (% प्रति वर्ष):
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={tractorInterestRate}
                      onChange={(e) => setTractorInterestRate(Number(e.target.value))}
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-sm font-bold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      ऋण अवधि (वर्ष):
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="7"
                      value={tractorTenureYears}
                      onChange={(e) => setTractorTenureYears(Number(e.target.value))}
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2 text-sm font-bold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* EMI Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl bg-emerald-50 p-4 text-center border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-300">
                    मासिक किस्त (Monthly EMI)
                  </span>
                  <div className="text-2xl font-black text-emerald-800 dark:text-amber-400 mt-1">
                    ₹{Math.round(tractorEmi).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="rounded-2xl bg-stone-100 p-4 text-center dark:bg-stone-800">
                  <span className="text-[10px] font-bold uppercase text-stone-500">
                    कुल ब्याज (Total Interest)
                  </span>
                  <div className="text-xl font-black text-stone-900 dark:text-white mt-1">
                    ₹{Math.round(tractorTotalInterest).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50 p-4 text-center border border-amber-200 dark:bg-amber-950/40 dark:border-amber-900">
                  <span className="text-[10px] font-bold uppercase text-amber-800 dark:text-amber-300">
                    कुल भुगतान (Total Payable)
                  </span>
                  <div className="text-xl font-black text-stone-900 dark:text-amber-300 mt-1">
                    ₹{Math.round(tractorTotalPayable).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* 100% Electric Tractor Subsidy & Savings Banner */}
              <div className="rounded-2xl bg-teal-50/70 p-4 border border-teal-200 dark:bg-teal-950/30 dark:border-teal-800 flex items-start space-x-3">
                <span className="text-xl">⚡</span>
                <div className="text-xs text-teal-950 dark:text-teal-200 space-y-1">
                  <strong className="block text-teal-800 dark:text-teal-300 font-bold">
                    100% इलेक्ट्रिक ट्रैक्टर लोन व सब्सिडी लाभ:
                  </strong>
                  <p>
                    इलेक्ट्रिक ट्रैक्टर पर SMAM स्कीम व राज्य EV नीति के तहत ₹1,50,000 तक की प्रत्यक्ष सब्सिडी मिलती है। शून्य डीजल उपयोग के कारण आपकी मासिक लोन ईएमआई डीजल की बचत से ही पूरी तरह वसूल हो जाती है!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. SEED RATE CALCULATOR */}
          {activeCalcId === 'seed_rate' && (
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-4 dark:border-stone-800">
                <h3 className="text-lg font-black text-stone-900 dark:text-white">
                  {lang === 'hi' ? 'बीज दर कैलकुलेटर (Seed Rate Calculator)' : 'Seed Rate Calculator'}
                </h3>
                <p className="text-xs text-stone-500">
                  फसल व खेत के क्षेत्रफल के आधार पर आवश्यक बीज (किलोग्राम) की गणना
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    फसल चुनें (Crop):
                  </label>
                  <select
                    value={seedCrop}
                    onChange={(e) => setSeedCrop(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  >
                    {Object.entries(seedCropRateMap).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.name} ({v.rate} kg/Acre)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    खेत का रकबा (एकड़ में):
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={seedLandAcre}
                    onChange={(e) => setSeedLandAcre(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-sm font-bold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-6 text-center border border-emerald-200 dark:bg-stone-800 dark:border-stone-700">
                <span className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300">
                  कुल आवश्यक प्रमाणित बीज:
                </span>
                <div className="text-4xl font-black text-emerald-800 dark:text-amber-400 mt-1">
                  {totalSeedRequiredKg.toFixed(1)} किलोग्राम (kg)
                </div>
                <div className="text-xs text-stone-500 mt-1">
                  (लगभग {Math.ceil(totalSeedRequiredKg / 40)} मानक 40kg बैग)
                </div>
              </div>
            </div>
          )}

          {/* 4. FERTILIZER NPK DOSE CALCULATOR */}
          {activeCalcId === 'fertilizer_dose' && (
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-4 dark:border-stone-800">
                <h3 className="text-lg font-black text-stone-900 dark:text-white">
                  {lang === 'hi' ? 'संतुलित खाद व नैनो यूरिया कैलकुलेटर' : 'Fertilizer Dose Calculator'}
                </h3>
                <p className="text-xs text-stone-500">
                  डीएपी, पारंपरिक यूरिया व नैनो यूरिया बोतलों की सही वैज्ञानिक संख्या
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  खेत का रकबा (एकड़):
                </label>
                <input
                  type="number"
                  min="1"
                  value={fertAcre}
                  onChange={(e) => setFertAcre(Number(e.target.value))}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-sm font-bold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="rounded-xl bg-blue-50 p-3.5 dark:bg-blue-950/40 border border-blue-200">
                  <span className="font-bold text-blue-900 dark:text-blue-300 block">DAP खाद</span>
                  <div className="text-xl font-black text-blue-900 dark:text-blue-200 mt-1">
                    {totalDapBags} बोरी (50kg)
                  </div>
                </div>

                <div className="rounded-xl bg-stone-100 p-3.5 dark:bg-stone-800">
                  <span className="font-bold text-stone-600 dark:text-stone-300 block">यूरिया (दानेदार)</span>
                  <div className="text-xl font-black text-stone-900 dark:text-white mt-1">
                    {totalUreaBags} बोरी (45kg)
                  </div>
                </div>

                <div className="rounded-xl bg-teal-50 p-3.5 dark:bg-teal-950/40 border border-teal-200">
                  <span className="font-bold text-teal-900 dark:text-teal-300 block">नैनो यूरिया (विकल्प)</span>
                  <div className="text-xl font-black text-teal-800 dark:text-amber-400 mt-1">
                    {totalNanoUreaBottles} बोतल (500ml)
                  </div>
                </div>

                <div className="rounded-xl bg-amber-50 p-3.5 dark:bg-amber-950/40 border border-amber-200">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block">पोटाश (MOP)</span>
                  <div className="text-xl font-black text-amber-900 dark:text-amber-300 mt-1">
                    {totalMopBags} बोरी
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. CROP PROFIT CALCULATOR */}
          {activeCalcId === 'crop_profit' && (
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-4 dark:border-stone-800">
                <h3 className="text-lg font-black text-stone-900 dark:text-white">
                  {lang === 'hi' ? 'फसल लागत व शुद्ध मुनाफा कैलकुलेटर' : 'Crop Profit & Loss Estimator'}
                </h3>
                <p className="text-xs text-stone-500">
                  उत्पादन, समर्थन मूल्य और जुताई/बीज खर्च घटाकर शुद्ध बचत की गणना
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">रकबा (एकड़):</label>
                  <input
                    type="number"
                    value={profitAcre}
                    onChange={(e) => setProfitAcre(Number(e.target.value))}
                    className="w-full rounded-xl border p-2 bg-stone-50 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">पैदावार (क्विंटल/एकड़):</label>
                  <input
                    type="number"
                    value={profitYieldQuintalPerAcre}
                    onChange={(e) => setProfitYieldQuintalPerAcre(Number(e.target.value))}
                    className="w-full rounded-xl border p-2 bg-stone-50 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">भाव (₹/क्विंटल):</label>
                  <input
                    type="number"
                    value={profitMspPrice}
                    onChange={(e) => setProfitMspPrice(Number(e.target.value))}
                    className="w-full rounded-xl border p-2 bg-stone-50 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">लागत (₹/एकड़):</label>
                  <input
                    type="number"
                    value={profitCostPerAcre}
                    onChange={(e) => setProfitCostPerAcre(Number(e.target.value))}
                    className="w-full rounded-xl border p-2 bg-stone-50 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-stone-100 p-4 dark:bg-stone-800">
                  <span className="text-[10px] uppercase font-bold text-stone-500">कुल उत्पादन</span>
                  <div className="text-xl font-black text-stone-900 dark:text-white mt-1">
                    {totalProductionQuintals} क्विंटल
                  </div>
                </div>
                <div className="rounded-2xl bg-stone-100 p-4 dark:bg-stone-800">
                  <span className="text-[10px] uppercase font-bold text-stone-500">कुल खेती खर्च</span>
                  <div className="text-xl font-black text-rose-600 mt-1">
                    ₹{totalFarmingCost.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/40 border border-emerald-200">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                    शुद्ध बचत (Net Profit)
                  </span>
                  <div className="text-2xl font-black text-emerald-800 dark:text-amber-400 mt-1">
                    ₹{netCropProfit.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. SOLAR PUMP SIZING */}
          {activeCalcId === 'solar_pump' && (
            <div className="space-y-6">
              <div className="border-b border-stone-100 pb-4 dark:border-stone-800">
                <h3 className="text-lg font-black text-stone-900 dark:text-white">
                  {lang === 'hi' ? 'सोलर पंप साइजिंग व कुसुम सब्सिडी' : 'Solar Pump & PM-KUSUM Subsidy'}
                </h3>
                <p className="text-xs text-stone-500">
                  बोरवेल गहराई व खेत अनुसार उपयुक्त HP और 70% सरकारी सब्सिडी
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    जल स्तर / बोरवेल गहराई (फीट में):
                  </label>
                  <input
                    type="number"
                    value={solarWaterDepthFt}
                    onChange={(e) => setSolarWaterDepthFt(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-sm font-bold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    सिंचाई क्षेत्र (एकड़):
                  </label>
                  <input
                    type="number"
                    value={solarLandAcre}
                    onChange={(e) => setSolarLandAcre(Number(e.target.value))}
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-sm font-bold dark:border-stone-700 dark:bg-stone-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-amber-50 p-6 text-center border border-amber-200 dark:bg-stone-800 dark:border-stone-700 space-y-2">
                <span className="text-xs font-bold uppercase text-amber-800 dark:text-amber-400">
                  अनुशंसित सोलर पंप क्षमता:
                </span>
                <div className="text-3xl font-black text-stone-900 dark:text-white">
                  {recommendedPumpHP} HP डीसी सबमर्सिबल पंप
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs">
                  <div className="bg-white p-2 rounded-xl dark:bg-stone-900">
                    <span className="text-stone-400 block text-[10px]">पंप की कुल लागत</span>
                    <strong>₹{pumpBaseCost.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="bg-emerald-100 text-emerald-900 p-2 rounded-xl dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                    <span className="block text-[10px]">70% सरकारी सब्सिडी</span>
                    <strong>₹{govtSubsidyAmount.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="bg-amber-100 text-amber-950 p-2 rounded-xl dark:bg-amber-950 dark:text-amber-300 font-black">
                    <span className="block text-[10px]">किसान का अंशदान मात्र</span>
                    <strong>₹{farmerPayableShare.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
