import React from 'react';
import { Scale, ArrowRight, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompareBar: React.FC = () => {
  const { compareIds, products, removeFromCompare, clearCompare, setActiveTab, lang } = useApp();

  if (compareIds.length === 0) return null;

  const compareProducts = products.filter((p) => compareIds.includes(p.id));

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-1/2 z-30 -translate-x-1/2 w-11/12 max-w-2xl no-print animate-in slide-in-from-bottom-6 duration-200">
      <div className="flex items-center justify-between rounded-2xl bg-stone-900/95 text-white p-3 sm:px-4 sm:py-3 shadow-2xl backdrop-blur-md border border-amber-400/50">
        <div className="flex items-center space-x-3 overflow-hidden mr-2">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-stone-950 font-black">
            <Scale className="h-5 w-5" />
          </span>
          <div className="overflow-hidden">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <span>{lang === 'hi' ? 'तुलना सूची' : 'Compare Tray'}</span>
              <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-amber-300">
                {compareIds.length}/4
              </span>
            </div>
            <div className="flex items-center space-x-2 overflow-x-auto py-1">
              {compareProducts.map((p) => (
                <span
                  key={p.id}
                  className="inline-flex items-center space-x-1 rounded-md bg-stone-800 px-2 py-0.5 text-xs text-stone-200 whitespace-nowrap border border-stone-700"
                >
                  <span className="truncate max-w-[120px]">{p.title}</span>
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="text-stone-400 hover:text-rose-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => {
              setActiveTab('compare');
            }}
            className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs sm:text-sm font-bold text-white shadow-md transition-transform active:scale-95"
          >
            <span>{lang === 'hi' ? 'तुलना करें' : 'Compare Now'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={clearCompare}
            title={lang === 'hi' ? 'खाली करें' : 'Clear'}
            className="rounded-lg p-2 text-stone-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
