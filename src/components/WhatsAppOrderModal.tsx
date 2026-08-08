import { useState } from 'react';
import { X, Tv, Sparkles } from 'lucide-react';
import { SVEA_PACKAGES } from '../data/sveaData';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackageId?: string;
  whatsAppNumber: string;
}

export function WhatsAppOrderModal({
  isOpen,
  onClose,
  selectedPackageId = '12-months',
  whatsAppNumber
}: WhatsAppOrderModalProps) {
  if (!isOpen) return null;

  const initialPkg = SVEA_PACKAGES.find((p) => p.id === selectedPackageId) || SVEA_PACKAGES[2];
  const [pkg, setPkg] = useState(initialPkg);
  const [device, setDevice] = useState('Smart TV (Samsung / LG)');
  const [appType, setAppType] = useState('IBO Player / Net IPTV');
  const [isTestAccount, setIsTestAccount] = useState(false);

  const deviceOptions = [
    'Smart TV (Samsung / LG / Sony)',
    'Formuler Z Box (MYTVOnline)',
    'Firestick / Fire TV',
    'Apple TV (TiviMate / GSE)',
    'Android TV / Box / Google TV',
    'MAG Box',
    'Mobil / Dator (VLC / Smarters)'
  ];

  const appOptions = [
    'IBO Player / Net IPTV',
    'IPTV Smarters Pro',
    'TiviMate Premium',
    'MYTVOnline 2 / 3',
    'M3U Playlist / Länk',
    'Xtream Codes API'
  ];

  const handleOpenWhatsApp = () => {
    let text = `Hej Svea IPTV (svea-iptv.com)! 👋\n\n`;

    if (isTestAccount) {
      text += `🎁 Jag vill ansöka om ett GRATIS 24h testkonto.\n`;
      text += `Enhet: ${device}\nApp: ${appType}\n\n`;
      text += `Vänligen skicka mina inloggningsuppgifter.`;
    } else {
      text += `🛒 Jag vill beställa följande paket:\n`;
      text += `📦 Paket: Svea IPTV - ${pkg.duration} (${pkg.price} SEK)\n`;
      text += `📺 Min Enhet: ${device}\n`;
      text += `📱 Min App: ${appType}\n\n`;
      text += `Vänligen skicka betalningsinstruktioner och aktiveringslänk till mig! Tack!`;
    }

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${whatsAppNumber}?text=${encodedText}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black">
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Snabb beställning via WhatsApp</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            {isTestAccount ? 'Begär 24h Gratis Test' : `Beställ ${pkg.duration} för ${pkg.price} SEK`}
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Fyll i dina enhetsuppgifter så förbereds ditt meddelande automatiskt. Ingen registrering krävs!
          </p>
        </div>

        {/* Mode Selector (Regular Order vs Free Test) */}
        <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-extrabold">
          <button
            type="button"
            onClick={() => setIsTestAccount(false)}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              !isTestAccount
                ? 'bg-[#25D366] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🛒 Beställ Abonnemang
          </button>
          <button
            type="button"
            onClick={() => setIsTestAccount(true)}
            className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
              isTestAccount
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>24h Gratis Test</span>
          </button>
        </div>

        {/* Package Selector if in Order Mode */}
        {!isTestAccount && (
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              Välj Paket
            </label>
            <div className="grid grid-cols-3 gap-2">
              {SVEA_PACKAGES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPkg(item)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    pkg.id === item.id
                      ? 'border-emerald-500 bg-emerald-50 text-slate-900 font-black ring-2 ring-emerald-500/30'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-extrabold">{item.duration}</div>
                  <div className="text-sm font-black text-emerald-700 mt-0.5">{item.price} SEK</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Device Selection */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-emerald-600" />
            <span>Vilken enhet använder du?</span>
          </label>
          <select
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {deviceOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* App Selection */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
            Vilken spelare/app föredrar du?
          </label>
          <select
            value={appType}
            onChange={(e) => setAppType(e.target.value)}
            className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {appOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {/* Summary box */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2 font-medium">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Mottagande WhatsApp:</span>
            <span className="font-mono text-emerald-900 font-extrabold">+{whatsAppNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Leveranstid:</span>
            <span className="text-emerald-800 font-black">⚡ Inom 3 - 5 minuter</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Garanti:</span>
            <span className="text-slate-800 font-bold">100% Laggfri Anti-Freeze v5.2</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenWhatsApp}
          className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg transition-all hover:scale-[1.01]"
        >
          <WhatsAppIcon className="w-5 h-5 text-white" />
          <span>Öppna WhatsApp & Skicka Meddelande</span>
        </button>

        <p className="text-[11px] text-slate-500 text-center font-medium">
          Klickar du öppnas WhatsApp-appen på din enhet eller WhatsApp Web på din dator.
        </p>
      </div>
    </div>
  );
}
