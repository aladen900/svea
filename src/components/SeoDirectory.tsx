import { useState, useMemo } from 'react';
import { getAllSeoPages, SeoPageMetaData } from '../data/seoKeywords';
import { Search, Sparkles, ArrowRight, ShieldCheck, Tv, Trophy, Settings, HelpCircle, Film } from 'lucide-react';

interface SeoDirectoryProps {
  onNavigateToPage: (slug: string) => void;
  onOpenOrderModal: (pkgId?: string) => void;
  onOpenSitemapModal?: () => void;
}

export function SeoDirectory({ onNavigateToPage, onOpenOrderModal, onOpenSitemapModal }: SeoDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const allPages = useMemo(() => getAllSeoPages(), []);

  const filteredPages = useMemo(() => {
    return allPages.filter((page) => {
      const matchesSearch =
        page.cleanKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'ALL' || page.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [allPages, searchQuery, selectedCategory]);

  const categories = [
    { id: 'ALL', label: 'Alla Ämnen', count: allPages.length, icon: Sparkles },
    { id: 'Legality', label: 'Laglighet & Säkerhet', count: allPages.filter(p => p.category === 'Legality').length, icon: ShieldCheck },
    { id: 'Providers', label: 'Bästa Leverantörer', count: allPages.filter(p => p.category === 'Providers').length, icon: Trophy },
    { id: 'Apps', label: 'IPTV Appar', count: allPages.filter(p => p.category === 'Apps').length, icon: Tv },
    { id: 'Hardware', label: 'Boxar & Routers', count: allPages.filter(p => p.category === 'Hardware').length, icon: Settings },
    { id: 'Channels', label: 'Kanaler & VOD', count: allPages.filter(p => p.category === 'Channels').length, icon: Film },
    { id: 'Troubleshooting', label: 'Felsökning', count: allPages.filter(p => p.category === 'Troubleshooting').length, icon: HelpCircle },
  ];

  return (
    <section id="seo-index" className="py-16 bg-slate-900 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Svea IPTV SEO Sök- & Guidedirektori (2026)
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Utforska Alla 1 790+ Guider, Sökord & Expertråd
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Hitta skräddarsydd information för varje unikt sökbegrepp gällande IPTV i Sverige. Välj din kategori eller sök efter specifika enheter, appar och leverantörsjämförelser.
          </p>

          {/* Indexing & Sitemap Quick Bar */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span><strong>1 790+ Unika SEO-Sidor</strong> indexerade i <strong>/sitemap.xml</strong></span>
            </div>
            <div className="flex items-center gap-2">
              {onOpenSitemapModal && (
                <button
                  onClick={onOpenSitemapModal}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-3 py-1.5 rounded-xl transition-all"
                >
                  🗺️ Öppna Interactive Sitemap
                </button>
              )}
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-xl transition-all"
              >
                📄 XML File
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-xl transition-all"
              >
                🤖 Robots.txt
              </a>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Sök bland alla ${allPages.length} IPTV guider (t.ex. 'bästa appen', 'iptv olagligt', 'formuler z8')...`}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded"
              >
                Rensa
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Keywords Grid */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-medium text-slate-400">
              Visar <strong className="text-emerald-400">{filteredPages.length}</strong> guider
            </span>
            <button
              onClick={() => onOpenOrderModal('12-months')}
              className="text-xs text-emerald-400 hover:underline font-semibold"
            >
              🎁 Begär Gratis Testkonto (24h) →
            </button>
          </div>

          {filteredPages.length === 0 ? (
            <div className="text-center py-12 bg-slate-950/50 border border-slate-800/80 rounded-2xl space-y-3">
              <p className="text-slate-400 text-sm">Inga guider matchade din sökning "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Återställ filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredPages.map((page) => (
                <a
                  key={page.slug}
                  href={`/${page.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateToPage(page.slug);
                  }}
                  className="group text-left bg-slate-950 border border-slate-800/80 hover:border-emerald-500/60 p-3.5 rounded-xl transition-all duration-200 hover:bg-slate-900 flex flex-col justify-between gap-2 block"
                >
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 block mb-1 uppercase tracking-wider">
                      {page.categoryLabel}
                    </span>
                    <h3 className="text-xs font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-2">
                      {page.cleanKeyword}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] text-slate-500 group-hover:text-emerald-400 font-semibold">
                    <span>Läs SEO Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
