import React from 'react';
import { Volume2, Play, Pause, Square, FastForward, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TextToSpeechBar: React.FC = () => {
  const { ttsState, pauseTTS, resumeTTS, stopTTS, setTTSSpeed, lang } = useApp();

  if (!ttsState.isPlaying && !ttsState.isPaused) {
    return null;
  }

  const speedOptions = [0.75, 1.0, 1.25, 1.5];

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2 w-11/12 max-w-2xl no-print animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center justify-between rounded-2xl bg-stone-900/95 text-white px-4 py-3 shadow-2xl backdrop-blur-md border border-amber-500/40 dark:bg-stone-950/95">
        {/* Equalizer & Title */}
        <div className="flex items-center space-x-3 overflow-hidden mr-2">
          <div className="flex items-center space-x-0.5">
            <span className={`w-1 rounded-full bg-amber-400 ${ttsState.isPaused ? 'h-2' : 'h-5 animate-pulse'}`} />
            <span className={`w-1 rounded-full bg-emerald-400 ${ttsState.isPaused ? 'h-3' : 'h-7 animate-bounce'}`} />
            <span className={`w-1 rounded-full bg-amber-400 ${ttsState.isPaused ? 'h-4' : 'h-4 animate-pulse'}`} />
          </div>
          <div className="truncate">
            <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <Volume2 className="h-3.5 w-3.5" />
              <span>{lang === 'hi' ? 'ईवी किसान ऑडियो वाचक' : 'EV Kisan Audio Reader'}</span>
            </div>
            <p className="text-xs text-stone-200 truncate max-w-xs sm:max-w-md font-medium">
              {ttsState.title || (lang === 'hi' ? 'जानकारी पढ़ रहे हैं...' : 'Reading agricultural information...')}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Speed Selector */}
          <div className="hidden sm:flex items-center space-x-1 bg-stone-800 rounded-lg p-0.5 text-xs">
            {speedOptions.map((spd) => (
              <button
                key={spd}
                onClick={() => setTTSSpeed(spd)}
                className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                  ttsState.speed === spd
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Play/Pause */}
          {ttsState.isPaused ? (
            <button
              onClick={resumeTTS}
              title={lang === 'hi' ? 'पुनः चालू करें' : 'Resume'}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 shadow-xs"
            >
              <Play className="h-4 w-4 fill-current ml-0.5" />
            </button>
          ) : (
            <button
              onClick={pauseTTS}
              title={lang === 'hi' ? 'रोकें' : 'Pause'}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-stone-950 hover:bg-amber-400 shadow-xs"
            >
              <Pause className="h-4 w-4 fill-current" />
            </button>
          )}

          {/* Stop */}
          <button
            onClick={stopTTS}
            title={lang === 'hi' ? 'बंद करें' : 'Stop'}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-700 text-white hover:bg-rose-600 shadow-xs"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
          </button>

          {/* Close */}
          <button
            onClick={stopTTS}
            className="rounded-lg p-1.5 text-stone-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
