import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Volume2, Search, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { createSpeechRecognizer, isSpeechRecognitionSupported } from '../../utils/speech';

export const VoiceModal: React.FC = () => {
  const { isVoiceModalOpen, setIsVoiceModalOpen, executeVoiceSearch, lang } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const samplePrompts = lang === 'hi' ? [
    'महिंद्रा 575 ट्रैक्टर दिखाओ',
    'इलेक्ट्रिक ट्रैक्टर 55 एचपी',
    'आज का करनाल गेहूं मंडी भाव',
    'पीएम कुसुम सोलर पंप योजना',
    'गेहूं में पीला रतुआ का इलाज',
    'बीघा से एकड़ कैलकुलेटर',
  ] : [
    'Show Mahindra 575 tractor',
    'Electric tractor 55 HP',
    'Wheat mandi price today',
    'PM Kusum solar pump scheme',
    'Yellow rust treatment in wheat',
    'Bigha to Acre calculator',
  ];

  useEffect(() => {
    if (!isVoiceModalOpen) {
      setIsListening(false);
      setTranscript('');
      setRecognitionError(null);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setRecognitionError(
        lang === 'hi'
          ? 'आपके ब्राउज़र में आवाज़ पहचान (Web Speech) उपलब्ध नहीं है। कृपया नीचे दिए गए उदाहरणों में से चुनें या लिखकर खोजें।'
          : 'Voice speech recognition is not supported in this browser. Please click an example or type.'
      );
      return;
    }

    // Auto-start listening on modal open
    startListening();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoiceModalOpen]);

  const startListening = () => {
    setRecognitionError(null);
    setTranscript('');
    setIsListening(true);

    const recognizer = createSpeechRecognizer(
      lang === 'hi' ? 'hi-IN' : 'en-IN',
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal && text.trim().length > 1) {
          setIsListening(false);
          setTimeout(() => {
            handleSearch(text);
          }, 600);
        }
      },
      (error) => {
        setIsListening(false);
        setRecognitionError(`माइक्रोफोन त्रुटि: ${error}`);
      },
      () => {
        setIsListening(false);
      }
    );

    if (recognizer) {
      try {
        recognizer.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleSearch = (queryToSearch: string) => {
    const finalQuery = (queryToSearch || transcript).trim();
    if (!finalQuery) return;
    setIsVoiceModalOpen(false);
    executeVoiceSearch(finalQuery);
  };

  if (!isVoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-stone-900 border border-stone-200 dark:border-stone-800 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 px-6 py-4 bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-stone-900 dark:to-stone-900">
          <div className="flex items-center space-x-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold shadow-xs">
              <Mic className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-tight">
                {lang === 'hi' ? 'आवाज़ से खोजें (Voice Search)' : 'Voice Search with Audio Feedback'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {lang === 'hi' ? 'बोलिए – ईवी किसान सुनकर परिणाम बताएगा' : 'Speak – EV Kisan will find and read results aloud'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVoiceModalOpen(false)}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 text-center">
          {/* Animated Wave & Mic */}
          <div className="relative mx-auto my-4 flex h-32 w-32 items-center justify-center">
            {isListening && (
              <>
                <div className="absolute h-32 w-32 animate-ping rounded-full bg-emerald-400/20" />
                <div className="absolute h-24 w-24 animate-pulse rounded-full bg-emerald-500/30" />
              </>
            )}
            <button
              onClick={() => (isListening ? setIsListening(false) : startListening())}
              className={`relative z-10 flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95 ${
                isListening
                  ? 'bg-rose-600 ring-4 ring-rose-200 dark:ring-rose-900 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-700 ring-4 ring-emerald-100 dark:ring-emerald-950'
              }`}
            >
              {isListening ? <Mic className="h-10 w-10" /> : <MicOff className="h-10 w-10" />}
            </button>
          </div>

          <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
            {isListening
              ? lang === 'hi'
                ? 'सुन रहे हैं... कृपया स्पष्ट बोलिए'
                : 'Listening... Please speak clearly'
              : lang === 'hi'
              ? 'माइक दबाकर बोलना शुरू करें'
              : 'Tap microphone to speak'}
          </p>

          {/* Transcript box */}
          <div className="mt-4 min-h-14 rounded-2xl bg-stone-50 dark:bg-stone-800/60 p-3 text-base font-semibold text-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-700 flex items-center justify-center">
            {transcript ? (
              <span className="text-emerald-700 dark:text-emerald-400">"{transcript}"</span>
            ) : (
              <span className="text-stone-400 text-sm font-normal">
                {lang === 'hi' ? 'जैसे: "महिंद्रा 575 ट्रैक्टर" या "सरसों मंडी भाव"' : 'e.g. "Mahindra 575 tractor" or "Mustard mandi price"'}
              </span>
            )}
          </div>

          {recognitionError && (
            <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
              {recognitionError}
            </p>
          )}

          {/* Search Button if transcript available */}
          {transcript && (
            <button
              onClick={() => handleSearch(transcript)}
              className="mt-4 inline-flex items-center space-x-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-6 py-2.5 font-bold text-stone-900 shadow-md transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>{lang === 'hi' ? 'खोजें और ऑडियो सुनें' : 'Search & Hear Audio'}</span>
              <Volume2 className="h-4 w-4 ml-1" />
            </button>
          )}

          {/* Suggested Quick Prompts */}
          <div className="mt-6 border-t border-stone-100 dark:border-stone-800 pt-4 text-left">
            <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>{lang === 'hi' ? 'सुझाए गए विषय (क्लिक करके खोजें):' : 'Suggested Topics (Click to search):'}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(p);
                    handleSearch(p);
                  }}
                  className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-emerald-100 hover:text-emerald-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-emerald-950 dark:hover:text-emerald-300 transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
