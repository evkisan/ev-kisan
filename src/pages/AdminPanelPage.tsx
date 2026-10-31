import React, { useState } from 'react';
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Landmark,
  ShoppingBag,
  Bell,
  Users,
  Search,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  Newspaper,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { WordPressAuthorPanel } from '../components/news/WordPressAuthorPanel';

export const AdminPanelPage: React.FC = () => {
  const {
    products,
    moderateListing,
    mandiRecords,
    updateMandiPrice,
    schemes,
    notifications,
    addNotification,
    lang,
  } = useApp();

  const [adminTab, setAdminTab] = useState<'moderation' | 'mandi' | 'broadcast' | 'users' | 'news_author'>('moderation');

  // Mandi quick price edit
  const [editingMandiId, setEditingMandiId] = useState<string | null>(null);
  const [editModalPrice, setEditModalPrice] = useState<number>(2550);

  // Broadcast Notification Form
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');
  const [notifType, setNotifType] = useState<'general' | 'scheme' | 'weather' | 'mandi'>('general');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Filter listings pending approval or all
  const pendingListings = products.filter((p) => p.listingStatus === 'pending');
  const activeListings = products.filter((p) => p.listingStatus === 'active');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle || !notifMsg) return;

    addNotification({
      title: notifTitle,
      titleHi: notifTitle,
      message: notifMsg,
      messageHi: notifMsg,
      type: notifType,
      priority: 'urgent',
    });

    setBroadcastSent(true);
    setNotifTitle('');
    setNotifMsg('');
    setTimeout(() => setBroadcastSent(false), 2500);
  };

  const handleSaveMandiPrice = (id: string, basePrice: number) => {
    updateMandiPrice(id, editModalPrice - 100, editModalPrice + 150, editModalPrice);
    setEditingMandiId(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-emerald-950 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              <Shield className="h-3.5 w-3.5" />
              <span>EV Kisan केंद्रीय संचालन व नियंत्रण कक्ष</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              सुपर एडमिन कंट्रोल पैनल (Admin Command Center)
            </h1>
            <p className="text-xs text-stone-300">
              लिस्टिंग मॉडरेशन, मंडी भाव अद्यतन, किसान अधिसूचना प्रसारण एवं डीलर सत्यापन प्रबंधन।
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <div className="rounded-2xl bg-white/10 px-4 py-2 text-center backdrop-blur-xs">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">समीक्षाधीन लिस्टिंग</span>
              <span className="text-2xl font-black text-white">{pendingListings.length}</span>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-2 text-center backdrop-blur-xs">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">सक्रिय मशीनें</span>
              <span className="text-2xl font-black text-white">{activeListings.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setAdminTab('moderation')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors ${
            adminTab === 'moderation'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>लिस्टिंग मॉडरेशन ({pendingListings.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('mandi')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors ${
            adminTab === 'mandi'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>मंडी भाव लाइव कंट्रोल ({mandiRecords.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('broadcast')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors ${
            adminTab === 'broadcast'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>अलर्ट व सूचना प्रसारण</span>
        </button>

        <button
          onClick={() => setAdminTab('users')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors ${
            adminTab === 'users'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>डीलर सत्यापन</span>
        </button>

        <button
          onClick={() => setAdminTab('news_author')}
          className={`flex items-center space-x-2 border-b-2 px-5 py-3 text-xs sm:text-sm font-bold transition-colors ${
            adminTab === 'news_author'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-stone-500 hover:text-stone-900'
          }`}
        >
          <Newspaper className="h-4 w-4" />
          <span>WP समाचार ऑथर CMS</span>
        </button>
      </div>

      {/* 1. Moderation Tab */}
      {adminTab === 'moderation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              समीक्षा हेतु प्रतीक्षारत नई मशीनरी लिस्टिंग
            </h3>
            <span className="text-xs text-stone-500">
              {pendingListings.length} लिस्टिंग जांच के लिए तैयार
            </span>
          </div>

          {pendingListings.length === 0 ? (
            <div className="rounded-3xl border border-stone-200 bg-white p-10 text-center dark:border-stone-800 dark:bg-stone-900">
              <CheckCircle className="mx-auto h-12 w-12 text-emerald-600 mb-2" />
              <h4 className="text-base font-bold text-stone-900 dark:text-white">
                सभी लिस्टिंग स्वीकृत हैं!
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                मॉडरेशन कतार वर्तमान में खाली है।
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingListings.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4 dark:border-stone-800 dark:bg-stone-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3">
                    <img src={p.images[0]} alt={p.title} className="h-16 w-24 rounded-xl object-cover" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="rounded bg-amber-200 px-1.5 py-0.5 text-[10px] font-black text-amber-900">
                          PENDING
                        </span>
                        <h4 className="font-bold text-sm text-stone-900 dark:text-white">{p.title}</h4>
                      </div>
                      <div className="text-xs font-bold text-emerald-700 dark:text-amber-400 mt-0.5">
                        {p.priceDisplay}
                      </div>
                      <div className="text-xs text-stone-500">
                        विक्रेता: <strong>{p.seller.name}</strong> ({p.seller.phone}) • 📍 {p.location.district}, {p.location.state}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => moderateListing(p.id, 'rejected')}
                      className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                    >
                      अस्वीकार करें
                    </button>
                    <button
                      onClick={() => moderateListing(p.id, 'active')}
                      className="rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700"
                    >
                      ✓ स्वीकृत करें (Publish)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Mandi Live Control Tab */}
      {adminTab === 'mandi' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              मंडी भाव मैन्युअल अपडेट कंसोल
            </h3>
            <span className="text-xs text-stone-500">
              यदि Agmarknet API में विलंब हो, तो तुरंत भाव संशोधित करें
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-xs dark:border-stone-800 dark:bg-stone-900">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 text-[11px] font-bold uppercase text-stone-500 dark:bg-stone-800">
                <tr>
                  <th className="p-3.5">फसल</th>
                  <th className="p-3.5">मंडी</th>
                  <th className="p-3.5">वर्तमान मॉडल भाव</th>
                  <th className="p-3.5">अपडेट क्रिया</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {mandiRecords.map((m) => (
                  <tr key={m.id}>
                    <td className="p-3.5 font-bold text-stone-900 dark:text-white">
                      {m.commodityHi} ({m.variety})
                    </td>
                    <td className="p-3.5 text-stone-600 dark:text-stone-300">
                      {m.market} ({m.district})
                    </td>
                    <td className="p-3.5 font-black text-emerald-700 dark:text-amber-400 text-base">
                      {editingMandiId === m.id ? (
                        <input
                          type="number"
                          value={editModalPrice}
                          onChange={(e) => setEditModalPrice(Number(e.target.value))}
                          className="w-24 rounded-lg border p-1 text-sm font-bold"
                        />
                      ) : (
                        `₹${m.modalPrice}`
                      )}
                    </td>
                    <td className="p-3.5">
                      {editingMandiId === m.id ? (
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleSaveMandiPrice(m.id, m.modalPrice)}
                            className="rounded-lg bg-emerald-600 px-3 py-1 font-bold text-white text-xs"
                          >
                            सहेजें
                          </button>
                          <button
                            onClick={() => setEditingMandiId(null)}
                            className="rounded-lg bg-stone-100 px-2 py-1 text-xs text-stone-600"
                          >
                            रद्द
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingMandiId(m.id);
                            setEditModalPrice(m.modalPrice);
                          }}
                          className="rounded-lg bg-stone-100 px-3 py-1 font-bold text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 text-xs"
                        >
                          भाव बदलें
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Broadcast Alert Tab */}
      {adminTab === 'broadcast' && (
        <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs dark:border-stone-800 dark:bg-stone-900 max-w-2xl mx-auto space-y-4">
          <div className="flex items-center space-x-2 border-b border-stone-100 pb-3 dark:border-stone-800">
            <Bell className="h-5 w-5 text-amber-500" />
            <h3 className="text-base font-bold text-stone-900 dark:text-white">
              सभी किसानों को पुश नोटिफिकेशन भेजें
            </h3>
          </div>

          {broadcastSent && (
            <div className="rounded-xl bg-emerald-100 p-3 text-xs font-bold text-emerald-800">
              ✓ अधिसूचना सफलतापूर्वक सभी सक्रिय उपयोगकर्ताओं को प्रसारित की गई!
            </div>
          )}

          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                अलर्ट शीर्षक (Title):
              </label>
              <input
                type="text"
                required
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                placeholder="उदा. मौसम चेतावनी: भारी बारिश का अलर्ट"
                className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                अलर्ट श्रेणी (Category):
              </label>
              <select
                value={notifType}
                onChange={(e) => setNotifType(e.target.value as any)}
                className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm font-semibold"
              >
                <option value="scheme">सरकारी योजना अलर्ट (Scheme)</option>
                <option value="weather">मौसम चेतावनी (Weather Warning)</option>
                <option value="mandi">मंडी भाव अपडेट (Mandi)</option>
                <option value="general">सामान्य घोषणा (Announcement)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                विस्तृत संदेश (Message):
              </label>
              <textarea
                rows={3}
                required
                value={notifMsg}
                onChange={(e) => setNotifMsg(e.target.value)}
                placeholder="किसानों के लिए आवश्यक निर्देश या घोषणा..."
                className="w-full rounded-xl border border-stone-300 bg-stone-50 p-2.5 text-xs sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 py-2.5 text-xs sm:text-sm font-black text-white shadow-md transition-colors"
            >
              तत्काल प्रसारित करें (Broadcast Now)
            </button>
          </form>
        </div>
      )}

      {/* 4. Dealer Verification Tab */}
      {adminTab === 'users' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-stone-900 dark:text-white">
            पंजीकृत कृषि यंत्र डीलर सत्यापन स्थिति
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'Kisan Tractor World', type: 'Mahindra Authorized', location: 'Meerut, UP', verified: true },
              { name: 'Green Agrotech EV Hub', type: 'Sonalika EV Dealer', location: 'Ludhiana, Punjab', verified: true },
              { name: 'Karnal Swaraj Agency', type: 'Swaraj Authorized', location: 'Karnal, Haryana', verified: true },
              { name: 'Shaktiman Krishi Yantra', type: 'Implements Dealer', location: 'Indore, MP', verified: true },
            ].map((d, i) => (
              <div
                key={i}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs dark:border-stone-800 dark:bg-stone-900 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1.5 font-bold text-sm text-stone-900 dark:text-white">
                    <span>{d.name}</span>
                    <Shield className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="text-xs text-stone-500">{d.type} • 📍 {d.location}</div>
                </div>
                <span className="rounded-md bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold dark:bg-emerald-950 dark:text-emerald-300">
                  सत्यापित
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. WordPress News Author CMS Tab */}
      {adminTab === 'news_author' && (
        <div className="space-y-4">
          <WordPressAuthorPanel />
        </div>
      )}
    </div>
  );
};
