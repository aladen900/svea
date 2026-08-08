import React from 'react';

interface SveaFooterProps {
  onOpenOrderModal: (packageId?: string) => void;
  onOpenSitemapModal?: () => void;
  onNavigateToPage?: (slug: string) => void;
}

export function SveaFooter({ 
  onOpenOrderModal,
  onOpenSitemapModal,
  onNavigateToPage,
}: SveaFooterProps) {
  const handleLinkClick = (slug: string, e: React.MouseEvent) => {
    if (onNavigateToPage) {
      e.preventDefault();
      onNavigateToPage(slug);
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇸🇪</span>
              <span className="font-black text-xl text-white tracking-tight">
                SVEA <span className="text-emerald-400">IPTV</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Sveriges ledande leverantör av IPTV-abonnemang (<strong>svea-iptv.com</strong>). Över 15 000 kanaler och 50 000 filmer i 4K & HD.
            </p>
            <div className="text-[11px] text-emerald-400 font-bold">
              🟢 Live Support & Order via WhatsApp 24/7
            </div>
          </div>

          {/* Col 2: Abonnemang */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-sm">Svea IPTV Paket</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => onOpenOrderModal('3-months')} className="hover:text-emerald-400 transition-colors">
                  3 Månader IPTV (199 SEK)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenOrderModal('6-months')} className="hover:text-emerald-400 transition-colors">
                  6 Månader IPTV (349 SEK)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenOrderModal('12-months')} className="hover:text-emerald-400 transition-colors text-emerald-300 font-bold">
                  12 Månader VIP IPTV (499 SEK)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenOrderModal()} className="hover:text-amber-400 transition-colors text-amber-300 font-bold">
                  🎁 Begär 24h Gratis Testkonto
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Snabblänkar & Hub Guider */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-sm">Populära IPTV Guider</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="/basta-iptv" onClick={(e) => handleLinkClick('basta-iptv', e)} className="hover:text-emerald-400">Bästa IPTV Sverige 2026</a></li>
              <li><a href="/iptv-olagligt" onClick={(e) => handleLinkClick('iptv-olagligt', e)} className="hover:text-emerald-400">IPTV Olagligt & Lagar</a></li>
              <li><a href="/basta-iptv-appen" onClick={(e) => handleLinkClick('basta-iptv-appen', e)} className="hover:text-emerald-400">Bästa IPTV Appen 2026</a></li>
              <li><a href="/basta-iptv-boxen" onClick={(e) => handleLinkClick('basta-iptv-boxen', e)} className="hover:text-emerald-400">Bästa IPTV Boxen</a></li>
              <li><a href="/iptv-smarters-pro" onClick={(e) => handleLinkClick('iptv-smarters-pro', e)} className="hover:text-emerald-400">IPTV Smarters Pro Setup</a></li>
              <li><a href="/tivimate-premium" onClick={(e) => handleLinkClick('tivimate-premium', e)} className="hover:text-emerald-400">TiviMate Premium Sverige</a></li>
              <li><a href="/viaplay-iptv" onClick={(e) => handleLinkClick('viaplay-iptv', e)} className="hover:text-emerald-400">Viaplay & Sport IPTV</a></li>
            </ul>
          </div>

          {/* Col 4: SEO Indexing & Files */}
          <div className="space-y-3">
            <h4 className="font-black text-white text-sm">Sökmotorer & Indexering</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Svea IPTV är fullt indexerat för Google Search Console med 1 790+ unika SEO-sidor för alla svenska söktermer.
            </p>
            <ul className="space-y-2 text-xs font-semibold text-emerald-400">
              {onOpenSitemapModal && (
                <li>
                  <button onClick={onOpenSitemapModal} className="hover:underline flex items-center gap-1">
                    🗺️ Öppna XML Sitemap Center (1 790+ URLs)
                  </button>
                </li>
              )}
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:underline text-slate-300 flex items-center gap-1">
                  📄 Direktlänk: /sitemap.xml
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:underline text-slate-300 flex items-center gap-1">
                  🤖 Direktlänk: /robots.txt
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Category & Hub Direct Anchor Links Bar */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Svea IPTV Huvudkategorier & Indexerade Hub-Sidor
          </p>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <a href="/basta-iptv" onClick={(e) => handleLinkClick('basta-iptv', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              Bästa IPTV
            </a>
            <a href="/iptv-olagligt" onClick={(e) => handleLinkClick('iptv-olagligt', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              IPTV Lagar
            </a>
            <a href="/basta-iptv-appen" onClick={(e) => handleLinkClick('basta-iptv-appen', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              IPTV Appar
            </a>
            <a href="/basta-iptv-boxen" onClick={(e) => handleLinkClick('basta-iptv-boxen', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              IPTV Boxar
            </a>
            <a href="/formuler-z11-pro-max" onClick={(e) => handleLinkClick('formuler-z11-pro-max', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              Formuler Z11
            </a>
            <a href="/iptv-smarters-pro" onClick={(e) => handleLinkClick('iptv-smarters-pro', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              IPTV Smarters
            </a>
            <a href="/tivimate-premium" onClick={(e) => handleLinkClick('tivimate-premium', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              TiviMate
            </a>
            <a href="/viaplay-iptv" onClick={(e) => handleLinkClick('viaplay-iptv', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              Viaplay IPTV
            </a>
            <a href="/v-sport-iptv" onClick={(e) => handleLinkClick('v-sport-iptv', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              V Sport
            </a>
            <a href="/allsvenskan-iptv" onClick={(e) => handleLinkClick('allsvenskan-iptv', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              Allsvenskan
            </a>
            <a href="/m3u-playlist-sverige" onClick={(e) => handleLinkClick('m3u-playlist-sverige', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              M3U Playlist
            </a>
            <a href="/xtream-codes-sverige" onClick={(e) => handleLinkClick('xtream-codes-sverige', e)} className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 px-2.5 py-1 rounded-lg text-slate-300 hover:text-emerald-400 transition-all">
              Xtream Codes
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-400 font-medium">
          <div>
            © 2026 <strong>svea-iptv.com</strong> • Svea IPTV Sverige. Alla rättigheter förbehållna.
          </div>
          <div className="flex items-center gap-3">
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-emerald-400">sitemap.xml</a>
            <span>•</span>
            <a href="/robots.txt" target="_blank" rel="noreferrer" className="hover:text-emerald-400">robots.txt</a>
            <span>•</span>
            <span>Säker krypterad streaming</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
