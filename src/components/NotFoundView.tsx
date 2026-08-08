import { useMemo } from 'react';
import { ArrowLeft, Home, Search, Tv, Sparkles, HelpCircle } from 'lucide-react';
import { getAllSeoPages, getCategories } from '../data/seoKeywords';

interface NotFoundViewProps {
  onNavigateToHome: () => void;
  onNavigateToPage: (slug: string) => void;
  onOpenOrderModal: (pkgId?: string) => void;
}

export function NotFoundView({
  onNavigateToHome,
  onNavigateToPage,
  onOpenOrderModal,
}: NotFoundViewProps) {
  // Get top 12 popular pages to suggest to the user
  const popularPages = useMemo(() => {
    const all = getAllSeoPages();
    return all.slice(0, 12);
  }, []);

  const categories = useMemo(() => getCategories(), []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
      {/* Main 404 Hero Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" /> Error 404
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Sidan hittades inte
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          Sidan du försöker nå finns inte längre, har bytt URL eller har tagits bort. 
          Gå tillbaka till startsidan eller utforska våra populära IPTV-guider nedan.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onNavigateToHome}
            className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 text-sm"
          >
            <Home className="w-4 h-4" /> Tillbaka till Startsidan
          </button>
          
          <button
            onClick={() => onOpenOrderModal('12-months')}
            className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-700 flex items-center gap-2 text-sm"
          >
            <Tv className="w-4 h-4 text-emerald-400" /> Beställ IPTV (499 SEK)
          </button>
        </div>
      </div>

      {/* Suggested Popular Pages */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" /> Populära IPTV Guider & Sidor
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularPages.map((page) => (
            <button
              key={page.slug}
              onClick={() => onNavigateToPage(page.slug)}
              className="text-left p-4 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-850 transition-all group"
            >
              <span className="text-xs text-emerald-400 font-semibold block mb-1">
                {page.categoryLabel}
              </span>
              <p className="text-sm font-semibold text-slate-200 group-hover:text-emerald-300 line-clamp-1 transition-colors">
                {page.cleanKeyword}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Category Links */}
      <div className="text-center pt-4">
        <p className="text-slate-500 text-xs mb-3 uppercase tracking-wider font-semibold">
          Kategorier
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={onNavigateToHome}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
