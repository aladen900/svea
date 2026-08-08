import { useState } from 'react';
import { FAQS } from '../data/sveaData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export function FaqSection({ onOpenOrderModal }: { onOpenOrderModal: () => void }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Vanliga Frågor (FAQ)</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Frågor & Svar om <span className="text-emerald-600">Svea IPTV</span>
          </h2>

          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Allt du behöver veta om hur du köper och installerar Svea IPTV på din TV eller mobil.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-black text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md text-center space-y-3">
          <h4 className="text-lg font-black text-slate-900">Har du fler frågor om Svea IPTV?</h4>
          <p className="text-xs text-slate-600 font-medium">
            Vår kundtjänst är online på WhatsApp och hjälper dig gärna direkt!
          </p>
          <button
            onClick={onOpenOrderModal}
            className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Ställ en fråga på WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
}
