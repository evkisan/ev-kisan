/**
 * EV Kisan Web Speech utilities:
 * - Speech Recognition (Hindi & English microphone input)
 * - Speech Synthesis (Text-to-Speech playback & voice feedback)
 */

export interface SpeechRecognitionResultItem {
  transcript: string;
  isFinal: boolean;
}

// Check browser support for SpeechRecognition
export const isSpeechRecognitionSupported = (): boolean => {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
};

// Check browser support for SpeechSynthesis
export const isSpeechSynthesisSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Create a SpeechRecognition instance safely
export const createSpeechRecognizer = (
  lang: string = 'hi-IN',
  onResult: (transcript: string, isFinal: boolean) => void,
  onError: (error: string) => void,
  onEnd: () => void
) => {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser.');
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognitionClass();

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = lang;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const transcript = finalTranscript || interimTranscript;
    onResult(transcript, Boolean(finalTranscript));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onerror = (event: any) => {
    onError(event.error || 'Speech recognition error');
  };

  recognition.onend = () => {
    onEnd();
  };

  return recognition;
};

// Speak text using Web Speech Synthesis API
export const speakText = (
  text: string,
  lang: 'hi-IN' | 'en-IN' = 'hi-IN',
  rate: number = 1.0,
  onEnd?: () => void
): SpeechSynthesisUtterance | null => {
  if (!isSpeechSynthesisSupported()) {
    return null;
  }

  // Cancel any ongoing speech first
  window.speechSynthesis.cancel();

  const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
  if (!cleanText) return null;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = 1.0;

  // Pick Hindi voice if available
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find(
    (v) => (lang.startsWith('hi') && (v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'))) ||
           (lang.startsWith('en') && (v.lang.includes('en-IN') || v.lang.includes('en_IN')))
  ) || voices.find(v => v.lang.startsWith(lang.slice(0, 2)));

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = () => onEnd();
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
};

export const stopSpeech = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
};

export const pauseSpeech = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.pause();
  }
};

export const resumeSpeech = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.resume();
  }
};
