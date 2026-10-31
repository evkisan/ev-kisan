import React, { useState } from 'react';
import { Bell, X, AlertTriangle, TrendingUp, Landmark, ShoppingBag, CheckCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsModal: React.FC = () => {
  const {
    notifications,
    isNotificationsOpen,
    setIsNotificationsOpen,
    markNotificationRead,
    setActiveTab,
    lang,
    playTTS,
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');

  if (!isNotificationsOpen) return null;

  const filteredNotifs = filterType === 'all'
    ? notifications
    : notifications.filter((n) => n.type === filterType);

  const getIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'mandi':
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case 'scheme':
        return <Landmark className="h-4 w-4 text-blue-500" />;
      case 'marketplace':
        return <ShoppingBag className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-emerald-500" />;
    }
  };

  const handleReadAndGo = (notif: typeof notifications[0]) => {
    markNotificationRead(notif.id);
    if (notif.targetTab) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setActiveTab(notif.targetTab as any);
      setIsNotificationsOpen(false);
    }
    // Also read aloud
    const textToRead = lang === 'hi' ? `${notif.titleHi}। ${notif.messageHi}` : `${notif.title}. ${notif.message}`;
    playTTS(textToRead, notif.title);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="h-full w-full max-w-md bg-white shadow-2xl dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 p-4 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900">
          <div className="flex items-center space-x-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-stone-950 font-bold">
              <Bell className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                {lang === 'hi' ? 'महत्वपूर्ण सूचनाएं व अलर्ट' : 'Alerts & Notifications'}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {lang === 'hi' ? 'योजनाएं, मौसम चेतावनी व मंडी भाव अपडेट' : 'Schemes, weather warnings & mandi rate updates'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex space-x-1.5 border-b border-stone-100 p-3 text-xs font-semibold overflow-x-auto dark:border-stone-800">
          {[
            { id: 'all', label: lang === 'hi' ? 'सभी' : 'All' },
            { id: 'scheme', label: lang === 'hi' ? 'योजनाएं' : 'Schemes' },
            { id: 'weather', label: lang === 'hi' ? 'मौसम' : 'Weather' },
            { id: 'mandi', label: lang === 'hi' ? 'मंडी भाव' : 'Mandi' },
            { id: 'marketplace', label: lang === 'hi' ? 'बाजार' : 'Market' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilterType(item.id)}
              className={`rounded-lg px-2.5 py-1 transition-colors whitespace-nowrap ${
                filterType === item.id
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredNotifs.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <CheckCheck className="mx-auto h-10 w-10 text-stone-300 mb-2" />
              <p className="text-sm font-medium">{lang === 'hi' ? 'कोई नई सूचना नहीं है' : 'No notifications found'}</p>
            </div>
          ) : (
            filteredNotifs.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleReadAndGo(notif)}
                className={`group relative cursor-pointer rounded-2xl border p-3.5 transition-all hover:shadow-md ${
                  notif.isRead
                    ? 'border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/60 opacity-80'
                    : 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5 rounded-lg bg-stone-100 p-2 dark:bg-stone-800">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-stone-900 dark:text-white truncate">
                        {lang === 'hi' ? notif.titleHi : notif.title}
                      </h4>
                      <span className="text-[11px] text-stone-400 shrink-0 ml-2">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 line-clamp-2">
                      {lang === 'hi' ? notif.messageHi : notif.message}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                        {lang === 'hi' ? 'विवरण देखें व सुनें →' : 'View & Listen →'}
                      </span>
                      {notif.priority === 'urgent' && (
                        <span className="rounded-md bg-rose-100 px-1.5 py-0.5 font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                          {lang === 'hi' ? 'जरूरी' : 'Urgent'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
