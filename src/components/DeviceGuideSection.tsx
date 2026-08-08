import { useState } from 'react';
import { Tv, Smartphone, Laptop, MonitorPlay, Zap } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export function DeviceGuideSection({ onOpenOrderModal }: { onOpenOrderModal: () => void }) {
  const [activeTab, setActiveTab] = useState<'smarttv' | 'formuler' | 'firestick' | 'appletv' | 'android'>('smarttv');

  const guides = {
    smarttv: {
      title: 'Smart TV (Samsung & LG)',
      apps: ['IBO Player', 'Net IPTV', 'IPTV Smarters', 'Smart ONE IPTV'],
      steps: [
        'Sök efter "IBO Player" eller "IPTV Smarters" i din Smart TV App Store och installera den.',
        'Öppna appen så ser du din TVs MAC-adress eller Device ID på skärmen.',
        'Skicka din MAC-adress till oss på WhatsApp efter beställning, så aktiverar vi ditt abonnemang på under 3 minuter!'
      ]
    },
    formuler: {
      title: 'Formuler Z-Box (MYTVOnline 2 / 3)',
      apps: ['MYTVOnline 3', 'MYTVOnline 2'],
      steps: [
        'Starta din Formuler-box och öppna appen MYTVOnline.',
        'Gå till Inställningar -> Lägg till Portal.',
        'Skriv in Portal-URL:en du får från Svea IPTV på WhatsApp, spara och njut av perfekt 4K bild!'
      ]
    },
    firestick: {
      title: 'Amazon Fire TV Stick',
      apps: ['Downloader', 'IPTV Smarters Pro', 'TiviMate'],
      steps: [
        'Ladda ner appen "Downloader" från Amazon Appstore.',
        'Installera TiviMate eller IPTV Smarters via koden vi ger dig.',
        'Fyll i dina Xtream Codes inloggningsuppgifter som vi skickar på WhatsApp.'
      ]
    },
    appletv: {
      title: 'Apple TV & iOS',
      apps: ['GSE Smart IPTV', 'IPTV Smarters Lite', 'iPlayTV'],
      steps: [
        'Öppna App Store på din Apple TV eller iPhone/iPad.',
        'Sök upp och installera IPTV Smarters Lite eller GSE Smart IPTV.',
        'Ange dina inloggningsuppgifter från Svea IPTV så laddas alla kanaler in automatiskt.'
      ]
    },
    android: {
      title: 'Android TV / Google TV / Mobil',
      apps: ['TiviMate Premium', 'IPTV Smarters Pro', 'XCIPTV'],
      steps: [
        'Ladda ner TiviMate eller IPTV Smarters från Google Play Store.',
        'Välj Xtream Codes API eller M3U Länk.',
        'Fyll i uppgifterna du fick från oss på WhatsApp och starta streaming!'
      ]
    }
  };

  const currentGuide = guides[activeTab];

  return (
    <section id="enheter" className="py-20 bg-white relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <MonitorPlay className="w-3.5 h-3.5 text-emerald-700" />
            <span>Fungerar på alla dina skärmar</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Enkel Installation på <span className="text-emerald-600">5 Minuter</span>
          </h2>

          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Svea IPTV stödjer alla moderna TV-apparater, boxar och mobiler. Vår WhatsApp-support guidar dig steg för steg om du behöver hjälp.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTab('smarttv')}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'smarttv'
                ? 'bg-[#25D366] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Smart TV</span>
          </button>

          <button
            onClick={() => setActiveTab('formuler')}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'formuler'
                ? 'bg-[#25D366] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Formuler Box</span>
          </button>

          <button
            onClick={() => setActiveTab('firestick')}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'firestick'
                ? 'bg-[#25D366] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <MonitorPlay className="w-4 h-4" />
            <span>Firestick</span>
          </button>

          <button
            onClick={() => setActiveTab('appletv')}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'appletv'
                ? 'bg-[#25D366] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Apple TV</span>
          </button>

          <button
            onClick={() => setActiveTab('android')}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 ${
              activeTab === 'android'
                ? 'bg-[#25D366] text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Android & Mobil</span>
          </button>
        </div>

        {/* Guide Card Details */}
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 max-w-4xl mx-auto space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900">{currentGuide.title}</h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">Rekommenderade appar: {currentGuide.apps.join(', ')}</p>
            </div>

            <button
              onClick={onOpenOrderModal}
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs shadow transition-colors shrink-0 flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>Få inloggning på WhatsApp</span>
            </button>
          </div>

          <div className="space-y-4">
            {currentGuide.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center font-black text-xs shrink-0">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
