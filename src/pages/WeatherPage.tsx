import React, { useState } from 'react';
import {
  CloudSun,
  MapPin,
  Droplets,
  Wind,
  AlertTriangle,
  Volume2,
  Calendar,
  ShieldCheck,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WeatherPage: React.FC = () => {
  const { weatherData, location, setIsLocationModalOpen, lang, playTTS } = useApp();

  const [activeDistrict, setActiveDistrict] = useState<string>(location.district);

  const currentWeather = weatherData[activeDistrict] || weatherData['Karnal'];

  const handleListenAdvisory = () => {
    const text =
      lang === 'hi'
        ? `${currentWeather.district} में वर्तमान तापमान ${currentWeather.temp} डिग्री सेल्सियस है। मौसम: ${currentWeather.conditionHi}। कृषि सलाह: ${currentWeather.forecast[0]?.advisory}।`
        : `Current temperature in ${currentWeather.district} is ${currentWeather.temp} degree Celsius. Weather: ${currentWeather.condition}. Advisory: ${currentWeather.forecast[0]?.advisory}.`;
    playTTS(text, lang === 'hi' ? 'मौसम एडवाइजरी' : 'Weather Advisory');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-sky-900 via-blue-900 to-stone-900 p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
            <CloudSun className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'आईएमडी प्रमाणित कृषि मौसम पूर्वानुमान' : 'IMD Agricultural Weather Forecast'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            {lang === 'hi'
              ? 'मौसम पूर्वानुमान व फसल एडवाइजरी'
              : 'Weather Forecast & Farming Advisory'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
            {lang === 'hi'
              ? '5 दिन का सटीक मौसम पूर्वानुमान, वर्षा की संभावना, नमी और फसलों पर कीटनाशक छिड़काव व सिंचाई की समयबद्ध कृषि सलाह।'
              : 'Plan sowing, harvesting, spraying and irrigation with 5-day precision agro-meteorological advisories.'}
          </p>
        </div>
      </div>

      {/* District Selector & Voice Audio Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-stone-500">{lang === 'hi' ? 'जिला चुनें:' : 'Select District:'}</span>
          <div className="flex flex-wrap gap-1.5">
            {['Karnal', 'Meerut', 'Indore'].map((dst) => (
              <button
                key={dst}
                onClick={() => setActiveDistrict(dst)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                  activeDistrict === dst
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
                }`}
              >
                {dst === 'Karnal' && 'करनाल (HR)'}
                {dst === 'Meerut' && 'मेरठ (UP)'}
                {dst === 'Indore' && 'इंदौर (MP)'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center space-x-1 text-xs font-bold text-sky-700 dark:text-sky-400 hover:underline"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>{lang === 'hi' ? 'अन्य जिला चुनें' : 'Change Location'}</span>
          </button>

          <button
            onClick={handleListenAdvisory}
            className="flex items-center space-x-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 px-3.5 py-1.5 text-xs font-bold text-stone-950 shadow-xs transition-colors"
          >
            <Volume2 className="h-4 w-4" />
            <span>{lang === 'hi' ? 'सलाह ऑडियो सुनें' : 'Listen Advisory'}</span>
          </button>
        </div>
      </div>

      {/* Weather Warning / Alert Banner if present */}
      {currentWeather.alert && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-900/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold">
              {lang === 'hi' ? 'मौसम विभाग चेतावनी (IMD Weather Alert)' : 'IMD Weather Warning'}
            </h4>
            <p className="text-xs">{currentWeather.alert.advice}</p>
          </div>
        </div>
      )}

      {/* Current Weather Card */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-xs dark:border-stone-800 dark:bg-stone-900">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {/* Main Temp */}
          <div className="md:col-span-2 flex items-center space-x-6">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
              <CloudSun className="h-10 w-10" />
            </span>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-stone-900 dark:text-white">
                {currentWeather.temp}°C
              </div>
              <div className="text-base font-bold text-stone-600 dark:text-stone-300 mt-1">
                {lang === 'hi' ? currentWeather.conditionHi : currentWeather.condition}
              </div>
              <div className="text-xs text-stone-400 mt-0.5">
                📍 {currentWeather.district}, {currentWeather.state}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="md:col-span-2 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800">
              <Droplets className="h-5 w-5 text-sky-500 mx-auto mb-1" />
              <div className="text-xs text-stone-500 font-semibold">{lang === 'hi' ? 'हवा में नमी' : 'Humidity'}</div>
              <div className="text-base font-bold text-stone-900 dark:text-white">{currentWeather.humidity}%</div>
            </div>
            <div className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800">
              <Wind className="h-5 w-5 text-teal-500 mx-auto mb-1" />
              <div className="text-xs text-stone-500 font-semibold">{lang === 'hi' ? 'हवा की गति' : 'Wind Speed'}</div>
              <div className="text-base font-bold text-stone-900 dark:text-white">{currentWeather.windSpeed} km/h</div>
            </div>
            <div className="rounded-2xl bg-stone-50 p-3 dark:bg-stone-800">
              <CloudSun className="h-5 w-5 text-amber-500 mx-auto mb-1" />
              <div className="text-xs text-stone-500 font-semibold">{lang === 'hi' ? 'बारिश संभावना' : 'Rain Chance'}</div>
              <div className="text-base font-bold text-stone-900 dark:text-white">{currentWeather.rainfallChance}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast with Agricultural Advisories */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-sky-600" />
          <span>{lang === 'hi' ? 'अगले 5 दिनों का मौसम व दैनिक कृषि सलाह' : '5-Day Forecast & Daily Agro Advisories'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {currentWeather.forecast.map((fc, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-bold text-stone-500 dark:text-stone-400">
                  {lang === 'hi' ? fc.dayHi : fc.day}
                </div>
                <div className="mt-2 text-xl font-black text-stone-900 dark:text-white">
                  {fc.tempMax}° / {fc.tempMin}°C
                </div>
                <div className="text-xs font-semibold text-sky-700 dark:text-sky-400 mt-0.5">
                  {lang === 'hi' ? fc.conditionHi : fc.condition}
                </div>

                <div className="mt-3 rounded-xl bg-stone-50 p-2.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-300">
                  <strong className="block text-[11px] font-bold text-emerald-800 dark:text-emerald-400 mb-0.5">
                    🌾 {lang === 'hi' ? 'कृषि कार्य सलाह:' : 'Farming Action:'}
                  </strong>
                  {fc.advisory}
                </div>
              </div>

              <div className="mt-3 text-[11px] text-stone-400 flex items-center justify-between border-t border-stone-100 pt-2 dark:border-stone-800">
                <span>बारिश: {fc.rainfall} mm</span>
                <span>{fc.rainfall === 0 ? 'अनुकूल' : 'सतर्कता'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data provenance */}
      <div className="rounded-2xl bg-stone-50 p-4 text-xs text-stone-500 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>डेटा स्रोत: {currentWeather.source}</span>
        </div>
        <span>अंतिम अपडेट: {currentWeather.updatedAt}</span>
      </div>
    </div>
  );
};
