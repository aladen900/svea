import { useState } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface SveaHeaderProps {
  whatsAppNumber: string;
  setWhatsAppNumber: (num: string) => void;
  onOpenOrderModal: (packageId?: string) => void;
}

export function SveaHeader({ whatsAppNumber, onOpenOrderModal }: SveaHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#priser', label: 'Paket & Priser' },
    { href: '#recensioner', label: 'WhatsApp Recensioner' },
    { href: '#kanaler', label: 'Kanaler & VOD' },
    { href: '#enheter', label: 'Enhetsguide' },
    { href: '#faq', label: 'Vanliga Frågor' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      {/* Top Banner for Swedish Trust */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white text-xs py-1.5 px-4 font-medium flex items-center justify-between shadow-inner">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <span className="font-extrabold tracking-wide">🇸🇪 Svea IPTV</span>
            <span className="hidden sm:inline text-emerald-100">| Sveriges #1 IPTV med WhatsApp-aktivering under 5 min</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${whatsAppNumber}?text=Hej%20Svea%20IPTV!%20Jag%20vill%20ha%20ett%20gratis%20testkonto%20i%2024h.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-bold underline hover:text-emerald-100 text-[11px]"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Begär 24h Gratis Test &rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-yellow-400 via-blue-600 to-blue-800 p-0.5 shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-white font-black text-xl tracking-wider">
                🇸🇪
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-slate-900 tracking-tight">
                  SVEA <span className="text-emerald-600">IPTV</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-black bg-blue-100 text-blue-700 border border-blue-200 rounded">
                  4K ULTRA HD
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold tracking-wide">
                Sveriges Bästa IPTV
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenOrderModal()}
              className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Beställ på WhatsApp</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 animate-in fade-in slide-in-from-top shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-bold text-slate-800 hover:text-emerald-600 py-2.5 border-b border-slate-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrderModal();
            }}
            className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <WhatsAppIcon className="w-5 h-5 text-white" />
            <span>Beställ via WhatsApp Nu</span>
          </button>
        </div>
      )}
    </header>
  );
}
