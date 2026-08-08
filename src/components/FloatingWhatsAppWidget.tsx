import { useState, useEffect } from 'react';
import { X, Send, CheckCheck, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingWhatsAppWidgetProps {
  whatsAppNumber: string;
  onOpenOrderModal: (packageId?: string) => void;
}

export function FloatingWhatsAppWidget({ whatsAppNumber, onOpenOrderModal }: FloatingWhatsAppWidgetProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setUnreadBadge(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickChat = (presetText: string) => {
    const text = encodeURIComponent(presetText);
    window.open(`https://wa.me/${whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Interactive Chat Popup Window */}
      {chatOpen && (
        <div className="pointer-events-auto mb-4 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-300 text-slate-800">
          {/* Chat Header */}
          <div className="bg-[#075e54] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center font-black text-xl shadow">
                  🇸🇪
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#075e54]" />
              </div>

              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Svea IPTV Kundtjänst</span>
                  <WhatsAppIcon className="w-4 h-4 text-emerald-300" />
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-emerald-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online nu • Direkt aktivering</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setChatOpen(false)}
              className="p-1.5 rounded-full hover:bg-black/20 text-emerald-100 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Bubble Area */}
          <div className="p-4 bg-[#efeae2] space-y-3 font-sans text-xs">
            <div className="flex items-end gap-2">
              <div className="max-w-[88%] bg-white rounded-2xl rounded-tl-none p-3 text-slate-800 shadow-md space-y-1.5 border border-slate-200/60">
                <p className="leading-relaxed font-medium">
                  Välkommen till <strong className="text-emerald-700">Svea IPTV (svea-iptv.com)</strong>! 🇸🇪
                </p>
                <p className="leading-relaxed text-slate-600">
                  Vilket abonnemang vill du beställa? Klicka nedan för att öppna direktmeddelande i WhatsApp:
                </p>
                <div className="text-[10px] text-slate-400 text-right flex items-center justify-end gap-1">
                  <span>10:18</span>
                  <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </div>
            </div>

            {/* Quick Action Options */}
            <div className="space-y-1.5 pt-2">
              <button
                onClick={() => handleQuickChat('Hej Svea IPTV! Jag vill beställa 12 Månader paket för 499 SEK. Kan ni skicka betalningsinfo?')}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-500/40 text-emerald-800 font-bold transition-all flex items-center justify-between shadow-sm"
              >
                <span>🔥 Beställ 12 Månader (499 SEK)</span>
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              </button>

              <button
                onClick={() => handleQuickChat('Hej Svea IPTV! Jag vill beställa 6 Månader paket för 349 SEK.')}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold transition-all flex items-center justify-between shadow-sm"
              >
                <span>📦 Beställ 6 Månader (349 SEK)</span>
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              </button>

              <button
                onClick={() => handleQuickChat('Hej Svea IPTV! Jag vill testa 3 Månader för 199 SEK.')}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold transition-all flex items-center justify-between shadow-sm"
              >
                <span>✨ Beställ 3 Månader (199 SEK)</span>
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              </button>

              <button
                onClick={() => handleQuickChat('Hej Svea IPTV! Jag vill ansöka om ett 24h gratis testkonto för min TV.')}
                className="w-full text-left p-3 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-300 text-amber-900 font-semibold transition-all flex items-center justify-between shadow-sm"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Begär 24h Gratis Testkonto</span>
                </span>
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              </button>
            </div>
          </div>

          {/* Footer Input Link */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-medium">
              Klicka ovan för att öppna WhatsApp
            </span>
            <button
              onClick={() => handleQuickChat('Hej Svea IPTV! Jag har några frågor innan jag beställer.')}
              className="px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center gap-1.5 shadow transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chata Nu</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button with Real Official WhatsApp Icon */}
      <div className="pointer-events-auto relative group">
        {/* Pulsing glow ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-75 blur animate-pulse group-hover:opacity-100 transition-opacity" />

        <button
          onClick={() => {
            setChatOpen(!chatOpen);
            setUnreadBadge(false);
          }}
          className="relative w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95"
          aria-label="Chatta med Svea IPTV på WhatsApp"
          title="Chatta direkt med Svea IPTV på WhatsApp"
        >
          {/* Official WhatsApp SVG Icon */}
          <WhatsAppIcon className="w-9 h-9 text-white drop-shadow" />

          {/* Unread badge notification */}
          {unreadBadge && (
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-rose-600 text-white font-black text-[11px] flex items-center justify-center border-2 border-white animate-bounce shadow">
              1
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
