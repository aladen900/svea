import { SVEA_PACKAGES, PricingPackage } from '../data/sveaData';
import { Check, ShieldCheck, Sparkles, Flame } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface PricingSectionProps {
  onOpenOrderModal: (packageId?: string) => void;
  whatsAppNumber: string;
}

export function PricingSection({ onOpenOrderModal, whatsAppNumber }: PricingSectionProps) {
  const handleDirectWhatsApp = (pkg: PricingPackage) => {
    const text = encodeURIComponent(pkg.whatsAppText);
    window.open(`https://wa.me/${whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="priser" className="py-20 bg-slate-50 relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>Sveriges Bästa Paketpriser</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Välj Ditt <span className="text-emerald-600">Svea IPTV Abonnemang</span>
          </h2>

          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Inga dolda avgifter eller uppsägningstider. Alla svenska kanaler i HD & 4K ingår i samtliga paket. Beställ tryggt och enkelt direkt via WhatsApp.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {SVEA_PACKAGES.map((pkg) => {
            const isBestValue = pkg.bestValue;
            const isPopular = pkg.popular;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 bg-white ${
                  isBestValue
                    ? 'border-2 border-emerald-500 shadow-2xl md:-translate-y-2 ring-4 ring-emerald-500/10'
                    : isPopular
                    ? 'border-2 border-blue-500/60 shadow-xl'
                    : 'border border-slate-200 hover:border-slate-300 shadow-md'
                }`}
              >
                {/* Badge Header if Best Value or Popular */}
                {isBestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-amber-400 text-amber-950 font-black text-xs tracking-wider shadow-lg uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-950" />
                    <span>Mest Prisvärt • Spara 60%</span>
                  </div>
                )}

                {isPopular && !isBestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-blue-600 text-white font-black text-xs tracking-wider shadow-lg uppercase flex items-center gap-1">
                    <span>🔥 Mest Populärt</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Package Title & Duration */}
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{pkg.duration}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {pkg.months === 12
                        ? 'Fullständigt utbud för hela året'
                        : pkg.months === 6
                        ? 'Halvårsabonnemang med full tillgång'
                        : 'Klassiskt provpaket'}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="text-lg font-black text-emerald-700">{pkg.currency}</span>
                    </div>

                    <p className="text-xs text-slate-500 mt-2 font-bold">
                      Ca {(pkg.price / pkg.months).toFixed(0)} SEK / månad
                    </p>

                    {pkg.savePercent && (
                      <span className="inline-block mt-3 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                        {pkg.savePercent}
                      </span>
                    )}
                  </div>

                  {/* Features Checklist */}
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 font-medium">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-8 space-y-3">
                  <button
                    onClick={() => onOpenOrderModal(pkg.id)}
                    className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                      isBestValue
                        ? 'bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-emerald-500/20 hover:scale-[1.02]'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>Beställ {pkg.duration} ({pkg.price} SEK)</span>
                  </button>

                  <button
                    onClick={() => handleDirectWhatsApp(pkg)}
                    className="w-full text-center text-xs text-emerald-700 hover:underline font-bold"
                  >
                    Snabbklicka: Öppna WhatsApp direkt &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment & Security Banner */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Säker Beställning & Direkt Aktivering</h4>
              <p className="text-slate-600">Efter att du skickat meddelandet via WhatsApp hjälper vår svenska support dig att ställa in allt.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono font-extrabold text-slate-800 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 shrink-0">
            <span>⚡ Leveranstid: 3–5 Minuter</span>
          </div>
        </div>
      </div>
    </section>
  );
}
