import { useState } from 'react';
import { WHATSAPP_REVIEWS } from '../data/sveaData';
import { CheckCheck, Star, Phone, Video, MoreVertical, ThumbsUp } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppReviewsProps {
  onOpenOrderModal: (packageId?: string) => void;
  whatsAppNumber: string;
}

export function WhatsAppReviews({ onOpenOrderModal, whatsAppNumber }: WhatsAppReviewsProps) {
  const [activeReviewId, setActiveReviewId] = useState<string>(WHATSAPP_REVIEWS[0].id);

  const activeReview = WHATSAPP_REVIEWS.find((r) => r.id === activeReviewId) || WHATSAPP_REVIEWS[0];

  return (
    <section id="recensioner" className="py-20 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold uppercase tracking-wider">
            <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Äkta Kundupplevelser på WhatsApp</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Se Riktiga <span className="text-emerald-600">WhatsApp-Konversationer</span>
          </h2>

          <p className="text-slate-600 text-base leading-relaxed font-medium">
            Vi döljer ingenting. Här kan du läsa direktutdrag från våra svenska kunders WhatsApp-chattar efter att de aktiverat Svea IPTV på sina Smart TV, Formuler & Apple TV.
          </p>
        </div>

        {/* Customer Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {WHATSAPP_REVIEWS.map((rev) => {
            const isSelected = rev.id === activeReviewId;
            return (
              <button
                key={rev.id}
                onClick={() => setActiveReviewId(rev.id)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-slate-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <img
                  src={rev.avatar}
                  alt={rev.customerName}
                  width="40"
                  height="40"
                  loading="lazy"
                  decoding="async"
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500/50 shadow-sm"
                />
                <div className="overflow-hidden">
                  <div className="font-bold text-xs text-slate-900 truncate">{rev.customerName}</div>
                  <div className="text-[10px] text-emerald-700 font-extrabold">{rev.location}</div>
                  <div className="flex items-center text-amber-500 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Realistic WhatsApp Phone Frame View */}
        <div className="max-w-2xl mx-auto bg-white border border-slate-300 rounded-3xl shadow-xl overflow-hidden text-slate-900">
          {/* WhatsApp Header Bar */}
          <div className="bg-[#075e54] p-3 sm:p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <img
                src={activeReview.avatar}
                alt={activeReview.customerName}
                width="40"
                height="40"
                loading="lazy"
                decoding="async"
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-300 shadow"
              />
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span>{activeReview.customerName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-700 text-emerald-100">
                    {activeReview.location}
                  </span>
                </h3>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-medium">
                  <span>Abonnemang: {activeReview.packageUsed}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-emerald-100">
              <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
              <Video className="w-4 h-4 cursor-pointer hover:text-white" />
              <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* WhatsApp Chat Body Container with authentic light WhatsApp background */}
          <div className="p-4 sm:p-6 bg-[#efeae2] space-y-4 min-h-[320px] font-sans text-xs sm:text-sm">
            {/* Date Tag */}
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-lg bg-white/90 text-[10px] font-bold text-slate-600 shadow-sm border border-slate-200 uppercase tracking-wider">
                {activeReview.date}
              </span>
            </div>

            {/* Chat Messages */}
            {activeReview.messages.map((msg, idx) => {
              const isCustomer = msg.sender === 'customer';
              return (
                <div
                  key={idx}
                  className={`flex ${isCustomer ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom duration-200`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 shadow-md space-y-1.5 ${
                      isCustomer
                        ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200/80'
                        : 'bg-[#d9fdd3] text-slate-900 rounded-tr-none border border-emerald-200/60'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-500">
                      {isCustomer ? activeReview.customerName : 'Svea IPTV Support 🇸🇪'}
                    </div>

                    <p className="leading-relaxed font-sans">{msg.text}</p>

                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-500">
                      <span>{msg.time}</span>
                      <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* WhatsApp Chat Footer Bar */}
          <div className="bg-slate-50 p-3.5 flex items-center justify-between border-t border-slate-200 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-bold text-slate-800">
                Verifierad nöjd kund från Sverige ⭐ 5.0 / 5
              </span>
            </div>

            <button
              onClick={() => onOpenOrderModal(activeReview.packageUsed.includes('12') ? '12-months' : '6-months')}
              className="px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs flex items-center gap-1.5 shadow transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chata med oss nu</span>
            </button>
          </div>
        </div>

        {/* CTA Banner under reviews */}
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div className="space-y-1">
            <h4 className="text-lg font-black text-slate-900">Vill du också ha Sveriges mest stabila IPTV?</h4>
            <p className="text-xs text-slate-600 font-medium">
              Beställ på WhatsApp och kom igång på under 5 minuter utan krångel.
            </p>
          </div>

          <button
            onClick={() => onOpenOrderModal('12-months')}
            className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs sm:text-sm shadow-md shrink-0 transition-all hover:scale-105 flex items-center gap-2"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
            <span>Beställ 12 Månader (499 SEK)</span>
          </button>
        </div>
      </div>
    </section>
  );
}
