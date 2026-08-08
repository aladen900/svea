import { useMemo } from 'react';
import { SeoPageMetaData, getAllSeoPages } from '../data/seoKeywords';
import { PricingSection } from './PricingSection';
import { WhatsAppReviews } from './WhatsAppReviews';
import { ChannelExplorer } from './ChannelExplorer';
import { DeviceGuideSection } from './DeviceGuideSection';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Tv, MessageCircle, HelpCircle, ArrowRight, Share2, BookOpen, Wrench, Check, Zap, Star } from 'lucide-react';

interface SeoKeywordPageProps {
  pageData: SeoPageMetaData;
  whatsAppNumber: string;
  onNavigateToHome: () => void;
  onNavigateToPage: (slug: string) => void;
  onOpenOrderModal: (pkgId?: string) => void;
}

export function SeoKeywordPage({
  pageData,
  whatsAppNumber,
  onNavigateToHome,
  onNavigateToPage,
  onOpenOrderModal,
}: SeoKeywordPageProps) {
  const kw = pageData.cleanKeyword;

  // Related keywords in same category
  const relatedPages = useMemo(() => {
    const all = getAllSeoPages();
    return all
      .filter((p) => p.category === pageData.category && p.slug !== pageData.slug)
      .slice(0, 12);
  }, [pageData]);

  return (
    <div className="space-y-12">
      {/* Breadcrumb & Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-slate-900 border-b border-slate-800 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          <ol itemScope itemType="https://schema.org/BreadcrumbList" className="flex items-center gap-1.5 text-slate-400 flex-wrap">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToHome();
                }}
                itemProp="item"
                className="hover:text-emerald-400 font-semibold transition-colors flex items-center gap-1 text-slate-300"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                <span itemProp="name">Startsida</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-slate-600">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a
                href="/#seo-index"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToHome();
                  setTimeout(() => {
                    const el = document.getElementById('seo-index');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                itemProp="item"
                className="hover:text-emerald-400 text-slate-400 font-medium transition-colors"
              >
                <span itemProp="name">{pageData.categoryLabel}</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-slate-600">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a
                href={`/${pageData.slug}`}
                itemProp="item"
                className="text-emerald-400 font-bold truncate max-w-[220px] sm:max-w-xs block"
              >
                <span itemProp="name">{kw}</span>
              </a>
              <meta itemProp="position" content="3" />
            </li>
          </ol>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold text-[11px]">
              {pageData.categoryLabel}
            </span>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: pageData.metaTitle,
                    url: window.location.href,
                  }).catch(() => {});
                }
              }}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-slate-700 transition-all"
            >
              <Share2 className="w-3 h-3 text-emerald-400" />
              Dela
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section for Targeted Keyword */}
      <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Sveriges SEO Guide 2026: {kw}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {pageData.heroHeadline}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
            {pageData.heroSubtext}
          </p>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 max-w-2xl mx-auto text-xs text-slate-300 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Söker du efter <strong>{kw}</strong>? Svea IPTV ger dig Sveriges snabbaste servrar & 4K bildkvalitet.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenOrderModal('12-months')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-base"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              Skaffa Svea IPTV för {kw} (199 SEK)
            </button>
            <button
              onClick={() => onOpenOrderModal()}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold px-6 py-4 rounded-2xl hover:text-white transition-all text-sm flex items-center gap-2"
            >
              🎁 Begär 24h Gratis Testkonto ({kw})
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs text-slate-400 max-w-3xl mx-auto">
            <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Anti-Freeze™ v5.2 för {kw}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl flex items-center justify-center gap-1.5 font-medium">
              <Tv className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>15 000+ Kanaler för {kw}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl flex items-center justify-center gap-1.5 font-medium">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>50 000+ VOD ({kw})</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800/80 p-2.5 rounded-xl flex items-center justify-center gap-1.5 font-medium">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Leverans 3 min ({kw})</span>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Navigation / Table of Contents */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Innehållsförteckning – Guide för {kw}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <a href="#oversikt" className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 p-1.5 rounded bg-slate-950/50">
              <span className="text-emerald-400 font-bold">1.</span> Vad är {kw}?
            </a>
            <a href="#fordelar" className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 p-1.5 rounded bg-slate-950/50">
              <span className="text-emerald-400 font-bold">2.</span> Fördelar med {kw}
            </a>
            <a href="#installation" className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 p-1.5 rounded bg-slate-950/50">
              <span className="text-emerald-400 font-bold">3.</span> Steg-för-steg guide: {kw}
            </a>
            <a href="#teknik" className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 p-1.5 rounded bg-slate-950/50">
              <span className="text-emerald-400 font-bold">4.</span> Teknisk analys ({kw})
            </a>
            <a href="#rekommendation" className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 p-1.5 rounded bg-slate-950/50">
              <span className="text-emerald-400 font-bold">5.</span> Svea IPTV vs {kw}
            </a>
            <a href="#faq-section" className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 p-1.5 rounded bg-slate-950/50">
              <span className="text-emerald-400 font-bold">6.</span> FAQ om {kw}
            </a>
          </div>
        </div>
      </section>

      {/* Deep SEO Article & Information */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Intro Card */}
        <div id="oversikt" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <span className="w-2.5 h-8 bg-emerald-500 rounded-full block" />
            {pageData.seoArticle.introHeading}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
            {pageData.seoArticle.introBody}
          </p>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/80 pt-3">
            När du söker svar angående <strong>{kw}</strong> i Sverige är det avgörande att välja en tjänst som garanterar stabilitet under högt belastade matcher. Svea IPTV är konstruerat för att tillgodose alla behov inom <strong>{kw}</strong> med garanterad svensk EPG, undertexter och kristallklar 4K Ultra HD-bild.
          </p>
        </div>

        {/* Key Points Bullet Grid */}
        <div id="fordelar" className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            {pageData.seoArticle.keyPointsHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pageData.seoArticle.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">Punkt {idx + 1} för {kw}</span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-By-Step Setup Guide */}
        <div id="installation" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Installation & Aktivering</span>
            <h2 className="text-2xl font-black text-white">
              Steg-för-steg guide: Så kommer du igång med {kw}
            </h2>
            <p className="text-slate-400 text-sm">
              Att konfigurera din enhet för <strong>{kw}</strong> tar mindre än 5 minuter när du använder Svea IPTV.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">1</div>
              <h3 className="text-sm font-bold text-white">Beställ {kw}</h3>
              <p className="text-xs text-slate-400">Välj ett paket anpassat för <strong>{kw}</strong> (1, 3, 6 eller 12 månader).</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">2</div>
              <h3 className="text-sm font-bold text-white">Ta emot länkar för {kw}</h3>
              <p className="text-xs text-slate-400">Få M3U-länk eller Xtream Codes för <strong>{kw}</strong> direkt via WhatsApp.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">3</div>
              <h3 className="text-sm font-bold text-white">Anslut din app för {kw}</h3>
              <p className="text-xs text-slate-400">Ange uppgifterna i din föredragna app eller box för <strong>{kw}</strong>.</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-sm">4</div>
              <h3 className="text-sm font-bold text-white">Njut av {kw}</h3>
              <p className="text-xs text-slate-400">Streama alla kanaler och VOD-filmer laggfritt med <strong>{kw}</strong>.</p>
            </div>
          </div>
        </div>

        {/* Technical Overview & Recommendations Grid */}
        <div id="teknik" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Tv className="w-5 h-5 text-emerald-400" />
              {pageData.seoArticle.technicalHeading}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              {pageData.seoArticle.technicalBody}
            </p>
            <p className="text-slate-400 text-xs border-t border-slate-800 pt-2">
              Vår serverpark säkerställer att sökningar och streamande gällande <strong>{kw}</strong> fungerar sömlöst utan buffring.
            </p>
          </div>

          <div id="rekommendation" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              {pageData.seoArticle.recommendationHeading}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
              {pageData.seoArticle.recommendationBody}
            </p>
            <p className="text-slate-400 text-xs border-t border-slate-800 pt-2">
              Testa Svea IPTV idag och se varför vi är det självklara valet när du vill ha bäst resultat för <strong>{kw}</strong>.
            </p>
          </div>
        </div>

        {/* High Conversion Banner for Keyword */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block">
            Erbjudande 2026: {kw}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Redo att uppleva bäst TV med {kw}?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto">
            Beställ ditt Svea IPTV abonnemang för <strong>{kw}</strong> nu. Du får omedelbar leverans, 15 000+ kanaler och 24/7 svensk support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenOrderModal('12-months')}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg text-sm transition-all"
            >
              Köp Svea IPTV paket för {kw}
            </button>
            <button
              onClick={() => onOpenOrderModal()}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold px-5 py-3 rounded-xl text-xs transition-all"
            >
              Testa 24 timmar gratis ({kw})
            </button>
          </div>
        </div>

      </section>

      {/* Pricing Section Embedded */}
      <PricingSection
        onOpenOrderModal={onOpenOrderModal}
        whatsAppNumber={whatsAppNumber}
      />

      {/* Custom FAQs for Keyword */}
      <section id="faq-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            Vanliga Frågor & Svar: {kw}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Expertsvar gällande {kw} i Sverige (2026)
          </h2>
          <p className="text-slate-400 text-xs">
            Här besvarar våra experter de vanligaste funderingarna om <strong>{kw}</strong>.
          </p>
        </div>

        <div className="space-y-4">
          {pageData.customFaqs.map((faq, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">Q{index + 1}:</span> {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5 font-normal">
                {faq.answer}
              </p>
            </div>
          ))}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-extrabold">Q4:</span> Vad gör Svea IPTV till bäst val för {kw}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-5 font-normal">
              Svea IPTV erbjuder marknadens stabilaste servrar med Anti-Freeze v5.2 teknik, fullständig svensk EPG, 4K Ultra HD upplösning och direkt aktivering via WhatsApp när du söker efter <strong>{kw}</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Device Compatibility Guide */}
      <DeviceGuideSection
        onOpenOrderModal={() => onOpenOrderModal('12-months')}
      />

      {/* Channel Explorer */}
      <ChannelExplorer />

      {/* WhatsApp Reviews */}
      <WhatsAppReviews
        onOpenOrderModal={onOpenOrderModal}
        whatsAppNumber={whatsAppNumber}
      />

      {/* Footer Keyword Tag Confirmation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-400">
            SEO sammanfattning for sökbegreppet: <span className="text-emerald-400">{kw}</span>
          </p>
          <p>
            Denna sida täcker allt du behöver veta om <strong>{kw}</strong> i Sverige 2026. För frågor gällande installation, M3U-spellistor, Xtream Codes eller kanalutbud för <strong>{kw}</strong>, kontakta Svea IPTV kundtjänst på WhatsApp.
          </p>
        </div>
      </section>

      {/* Internal Linking: Related Keywords in same category */}
      {relatedPages.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Relaterade IPTV Guider för <span className="text-emerald-400">{kw}</span> ({pageData.categoryLabel})
            </h2>
            <button
              onClick={() => {
                const el = document.getElementById('seo-index');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs text-emerald-400 hover:underline font-semibold"
            >
              Visa Alla 1 790+ Guider →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {relatedPages.map((relPage) => (
              <a
                key={relPage.slug}
                href={`/${relPage.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToPage(relPage.slug);
                }}
                className="group text-left bg-slate-900 border border-slate-800/80 hover:border-emerald-500/60 p-3 rounded-xl transition-all text-xs font-semibold text-slate-300 hover:text-emerald-300 flex items-center justify-between gap-2 block"
              >
                <span className="truncate">{relPage.cleanKeyword}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

