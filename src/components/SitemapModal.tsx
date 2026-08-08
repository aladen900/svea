import { useState } from 'react';
import { X, FileCode, Check, ExternalLink, Download, Search, ShieldCheck, RefreshCw, Copy } from 'lucide-react';
import { getAllSeoPages } from '../data/seoKeywords';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPage: (slug: string) => void;
}

export function SitemapModal({ isOpen, onClose, onNavigateToPage }: SitemapModalProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'xml' | 'robots'>('visual');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const allPages = getAllSeoPages();
  const domain = 'https://svea-iptv.com';

  const filteredPages = searchQuery.trim()
    ? allPages.filter(p => 
        p.cleanKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allPages.slice(0, 100); // show top 100 in visual list for fast rendering

  const copySitemapUrl = () => {
    navigator.clipboard.writeText(`${domain}/sitemap.xml`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const downloadSitemapXml = () => {
    window.open('/sitemap.xml', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-base sm:text-lg flex items-center gap-2">
                XML Sitemap & Indexing Center
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {allPages.length + 1} URLs
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Alla 1 790+ SEO-optimerade sidor är genererade och indexeringsklara för Google Search Console.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Info & Action Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'visual'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Interaktiv URL-lista ({allPages.length})
            </button>
            <button
              onClick={() => setActiveTab('xml')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'xml'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Raw XML Code
            </button>
            <button
              onClick={() => setActiveTab('robots')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'robots'
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              robots.txt
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copySitemapUrl}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              {copiedUrl ? 'Kopierad!' : 'Kopiera Sitemap URL'}
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Öppna /sitemap.xml
            </a>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'visual' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrera sitemap efter nyckelord eller slug..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <span className="text-xs text-slate-400 shrink-0">
                  Visar {filteredPages.length} av {allPages.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {/* Main Homepage Entry */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-400 block truncate">{domain}/</span>
                    <span className="text-[10px] text-slate-400">Huvudsida • Prioritet 1.0</span>
                  </div>
                  <button
                    onClick={() => {
                      onNavigateToPage('');
                      onClose();
                    }}
                    className="p-1 text-emerald-400 hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {filteredPages.map((page) => (
                  <div key={page.slug} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between hover:border-emerald-500/50 transition-all">
                    <div className="min-w-0 pr-2">
                      <span className="font-semibold text-slate-200 block truncate text-[11px]">{page.cleanKeyword}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{domain}/{page.slug}</span>
                    </div>
                    <button
                      onClick={() => {
                        onNavigateToPage(page.slug);
                        onClose();
                      }}
                      className="p-1 text-slate-400 hover:text-emerald-400 shrink-0"
                      title="Besök sida"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'xml' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center justify-between">
                <span>Standard XML Sitemap v0.9 (Genererad direkt från servern för sökmotorer)</span>
                <span className="text-emerald-400 font-mono text-[10px]">Content-Type: application/xml</span>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 text-[11px] font-mono overflow-x-auto max-h-96 leading-relaxed">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${allPages.slice(0, 15).map(p => `  <url>
    <loc>${domain}/${p.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
  <!-- ... +${allPages.length - 15} till SEO sidor i /sitemap.xml -->
</urlset>`}
              </pre>
            </div>
          )}

          {activeTab === 'robots' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 flex items-center justify-between">
                <span>Robots.txt inställningar för Googlebot, Bingbot m.fl.</span>
                <a href="/robots.txt" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1">
                  Öppna /robots.txt <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-emerald-300 text-xs font-mono">
{`User-agent: *
Allow: /

Sitemap: https://svea-iptv.com/sitemap.xml`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sitemap uppdaterad automatiskt för 1 790+ sökord.</span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl"
          >
            Stäng
          </button>
        </div>

      </div>
    </div>
  );
}
