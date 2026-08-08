import { Sparkles, Zap, Tv, CheckCircle, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroSectionProps {
  onOpenOrderModal: (packageId?: string) => void;
  whatsAppNumber: string;
}

export function HeroSection({ onOpenOrderModal, whatsAppNumber }: HeroSectionProps) {
  return (
    <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white overflow-hidden border-b border-slate-200/80">
      {/* Background Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-emerald-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Conversion CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* SEO Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-emerald-500/30 text-emerald-800 text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Svea IPTV Sverige (svea-iptv.com) • Direktaktivering på WhatsApp</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Sveriges Mest <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700">
                Stabila Svea IPTV
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Upplev alla svenska sportkanaler & underhållning i äkta 4K 60fps. Allsvenskan, Premier League, Viaplay, C More & över 50 000 filmer med svensk text. Beställ direkt via WhatsApp utan bindningstid!
            </p>

            {/* Highlighted Package Prices Banner */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors">
                <span className="text-[11px] text-slate-500 block font-bold">3 MÅNADER</span>
                <span className="text-xl font-black text-slate-900">199 SEK</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-300 relative overflow-hidden">
                <span className="text-[11px] text-emerald-800 block font-extrabold">6 MÅNADER</span>
                <span className="text-xl font-black text-emerald-700">349 SEK</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border-2 border-amber-400/80 relative shadow-sm">
                <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-1.5 py-0.5 rounded absolute top-1 right-1">POPULÄR</span>
                <span className="text-[11px] text-amber-900 block font-black">12 MÅNADER</span>
                <span className="text-xl font-black text-slate-900">499 SEK</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onOpenOrderModal('12-months')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-6 h-6 text-white" />
                <span>Beställ Paket via WhatsApp</span>
              </button>

              <button
                onClick={() => onOpenOrderModal('free-test')}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Begär 24h Gratis Test</span>
              </button>
            </div>

            {/* Key Value Props / Trust Indicators */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Ingen Bindningstid</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Anti-Freeze Server v5.2</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Svensk Support 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Mockup & Live Player Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-lg shadow-sm">
                    🇸🇪
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">Svea IPTV Stream</h3>
                    <p className="text-[11px] text-emerald-700 font-bold">4K Ultra HD • 60 FPS • Full EPG</p>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-extrabold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>SVEA SERVER ONLINE</span>
                </div>
              </div>

              {/* Simulated TV Screen Player */}
              <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden group shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80"
                  alt="Fotboll i 4K på Svea IPTV"
                  width="800"
                  height="450"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Overlaid TV Score / Channel Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-extrabold border border-white/20 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>V SPORT PREMIUM 4K</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
                    <span className="font-bold text-amber-300">Allsvenskan & Premier League</span>
                  </div>
                  <div className="bg-[#25D366] text-white font-black px-2.5 py-1 rounded-lg shadow">
                    60 FPS
                  </div>
                </div>
              </div>

              {/* Quick Feature Checklist inside Hero Card */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="flex items-center gap-2 font-medium">
                    <Tv className="w-4 h-4 text-emerald-600" />
                    <span>Svenska Kanaler (SVT, TV4, Viaplay, C More)</span>
                  </span>
                  <span className="font-extrabold text-emerald-700">100% Inkluderat</span>
                </div>

                <div className="flex items-center justify-between text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="flex items-center gap-2 font-medium">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span>Snabb WhatsApp-aktivering</span>
                  </span>
                  <span className="font-extrabold text-emerald-700">&lt; 5 Minuter</span>
                </div>
              </div>

              {/* Action Button inside Hero Card */}
              <button
                onClick={() => onOpenOrderModal('12-months')}
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Beställ 12 Månader (499 SEK)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
