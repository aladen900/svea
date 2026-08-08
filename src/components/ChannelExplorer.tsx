import { useState } from 'react';
import { CHANNEL_CATEGORIES } from '../data/sveaData';
import { Search, Tv, CheckCircle } from 'lucide-react';

export function ChannelExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>(CHANNEL_CATEGORIES[0].category);

  const currentCategoryObj = CHANNEL_CATEGORIES.find((c) => c.category === activeCategory) || CHANNEL_CATEGORIES[0];

  const filteredChannels = currentCategoryObj.channels.filter((c) =>
    c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="kanaler" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-300 text-blue-900 text-xs font-black uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5 text-blue-700" />
            <span>15 000+ Kanaler & 50 000+ Filmer</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Utforska <span className="text-emerald-600">Kanallistan & VOD</span>
          </h2>

          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Sök bland dina svenska favoritkanaler, V Sport Fotboll, C More, Allsvenskan och populära filmkataloger i 4K Ultra HD.
          </p>
        </div>

        {/* Search Bar & Category Filter */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sök kanal eller liga (t.ex. V Sport, TV4, Allsvenskan, Viaplay, Premier League)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {CHANNEL_CATEGORIES.map((cat) => {
              const isSelected = cat.category === activeCategory;
              return (
                <button
                  key={cat.category}
                  onClick={() => setActiveCategory(cat.category)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-[#25D366] text-white font-black border-emerald-600 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100 font-bold'
                  }`}
                >
                  <div className="text-xs">{cat.category}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                    {cat.count}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Channels Display Grid */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>{currentCategoryObj.category}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                {currentCategoryObj.count}
              </span>
            </h3>

            <div className="text-xs text-slate-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>4K / Full HD 60 FPS</span>
            </div>
          </div>

          {filteredChannels.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm font-medium">
              Inga kanaler matchade din sökning "{searchTerm}". Kontakta oss på WhatsApp för fullständig kanallista!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredChannels.map((channel, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-slate-800 text-xs font-bold flex items-center justify-between gap-2 transition-all group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">{channel}</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-black shrink-0">
                    4K
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium">
              * Detta är endast ett urval av våra mest populära kanaler. När du köper Svea IPTV får du tillgång till över 15 000 levande kanaler globalt.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
