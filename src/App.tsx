import { useState, useEffect } from 'react';
import { SveaHeader } from './components/SveaHeader';
import { HeroSection } from './components/HeroSection';
import { PricingSection } from './components/PricingSection';
import { WhatsAppReviews } from './components/WhatsAppReviews';
import { ChannelExplorer } from './components/ChannelExplorer';
import { DeviceGuideSection } from './components/DeviceGuideSection';
import { FaqSection } from './components/FaqSection';
import { SveaFooter } from './components/SveaFooter';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';
import { SeoDirectory } from './components/SeoDirectory';
import { SeoKeywordPage } from './components/SeoKeywordPage';
import { SitemapModal } from './components/SitemapModal';
import { NotFoundView } from './components/NotFoundView';
import { getSeoPageBySlug, SeoPageMetaData } from './data/seoKeywords';

export default function App() {
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>('46739590637');
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [sitemapModalOpen, setSitemapModalOpen] = useState<boolean>(false);
  const [selectedPkgId, setSelectedPkgId] = useState<string>('12-months');
  
  // Extract slug and status from location (stripping query parameters)
  const getRouteFromLocation = (): { slug: string | null; isNotFound: boolean } => {
    if (typeof window === 'undefined') return { slug: null, isNotFound: false };
    let pathname = window.location.pathname;
    const hash = window.location.hash;

    // Convert legacy hash or /seo/ prefix to clean direct root route /slug
    if (hash.startsWith('#/seo/')) {
      const slugFromHash = hash.replace('#/seo/', '').split('?')[0];
      window.history.replaceState(null, '', `/${slugFromHash}`);
      const matched = getSeoPageBySlug(slugFromHash);
      return { slug: matched ? matched.slug : null, isNotFound: !matched && slugFromHash.length > 0 };
    }

    if (pathname.startsWith('/seo/')) {
      const slugFromPath = pathname.replace('/seo/', '').split('?')[0];
      window.history.replaceState(null, '', `/${slugFromPath}`);
      const matched = getSeoPageBySlug(slugFromPath);
      return { slug: matched ? matched.slug : null, isNotFound: !matched && slugFromPath.length > 0 };
    }

    const cleanSlug = pathname.replace(/^\/+|\/+$/g, '').split('?')[0];
    if (!cleanSlug) return { slug: null, isNotFound: false };

    // Check if the clean root path matches an SEO page
    const matched = getSeoPageBySlug(cleanSlug);
    if (matched) {
      return { slug: matched.slug, isNotFound: false };
    }

    // Unrecognized route -> trigger 404 view
    return { slug: null, isNotFound: true };
  };

  const [routeState, setRouteState] = useState<{ slug: string | null; isNotFound: boolean }>(getRouteFromLocation);

  const activeSlug = routeState.slug;
  const isNotFound = routeState.isNotFound;

  // Listen to popstate (Back / Forward browser buttons and custom route pushes)
  useEffect(() => {
    const handleLocationChange = () => {
      const route = getRouteFromLocation();
      setRouteState(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Update HTML Document title, meta description, keywords, robots, and canonical link dynamically
  const activePageData: SeoPageMetaData | undefined = activeSlug ? getSeoPageBySlug(activeSlug) : undefined;

  useEffect(() => {
    // Canonical link tag updater
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }

    // Robots meta tag updater
    let robotsTag = document.querySelector('meta[name="robots"]');
    if (!robotsTag) {
      robotsTag = document.createElement('meta');
      robotsTag.setAttribute('name', 'robots');
      document.head.appendChild(robotsTag);
    }

    // Meta keywords tag updater
    let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    if (!metaKeywordsTag) {
      metaKeywordsTag = document.createElement('meta');
      metaKeywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywordsTag);
    }

    // Meta description tag updater
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescTag);
    }

    // OpenGraph title & description tags updaters
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    let ogDescTag = document.querySelector('meta[property="og:description"]');
    let ogUrlTag = document.querySelector('meta[property="og:url"]');

    if (isNotFound) {
      document.title = "404 - Sidan hittades inte | Svea IPTV";
      metaDescTag.setAttribute('content', "Sidan du söker finns inte eller har flyttats. Gå tillbaka till startsidan eller utforska våra IPTV-guider.");
      metaKeywordsTag.setAttribute('content', "404, svea iptv, sida saknas");
      robotsTag.setAttribute('content', "noindex, follow");
      canonicalTag.setAttribute('href', "https://svea-iptv.com/");

      if (ogTitleTag) ogTitleTag.setAttribute('content', "404 - Sidan hittades inte | Svea IPTV");
      if (ogDescTag) ogDescTag.setAttribute('content', "Sidan du söker finns inte.");
      if (ogUrlTag) ogUrlTag.setAttribute('content', "https://svea-iptv.com/");
    } else if (activePageData) {
      const pageTitle = activePageData.metaTitle;
      const pageDesc = activePageData.metaDescription;
      const pageKeywords = `${activePageData.cleanKeyword}, ${activePageData.categoryLabel}, svea iptv, iptv sverige, bästa iptv, köpa iptv, iptv kanaler, svenska kanaler iptv`;
      const pageUrl = `https://svea-iptv.com/${activePageData.slug}`;

      document.title = pageTitle;
      metaDescTag.setAttribute('content', pageDesc);
      metaKeywordsTag.setAttribute('content', pageKeywords);
      robotsTag.setAttribute('content', "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      canonicalTag.setAttribute('href', pageUrl);

      if (ogTitleTag) ogTitleTag.setAttribute('content', pageTitle);
      if (ogDescTag) ogDescTag.setAttribute('content', pageDesc);
      if (ogUrlTag) ogUrlTag.setAttribute('content', pageUrl);
    } else {
      const defaultTitle = "Svea IPTV (svea-iptv.com) – Sveriges Bästa IPTV Leverantör 2026";
      const defaultDesc = "Svea IPTV (svea-iptv.com) erbjuder Sveriges stabilaste IPTV med 15 000+ kanaler & 50 000+ VOD. Anti-Freeze v5.2, Viaplay, C More, Allsvenskan i 4K. Testa gratis 24h.";
      const defaultKeywords = "svea iptv, svea-iptv.com, iptv sverige, bästa iptv sverige, köpa iptv, iptv kanaler, svenska kanaler iptv, iptv 12 månader 499 sek, stabil iptv, v sport, viaplay iptv, iptv smarters";
      const defaultUrl = "https://svea-iptv.com/";

      document.title = defaultTitle;
      metaDescTag.setAttribute('content', defaultDesc);
      metaKeywordsTag.setAttribute('content', defaultKeywords);
      robotsTag.setAttribute('content', "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
      canonicalTag.setAttribute('href', defaultUrl);

      if (ogTitleTag) ogTitleTag.setAttribute('content', defaultTitle);
      if (ogDescTag) ogDescTag.setAttribute('content', defaultDesc);
      if (ogUrlTag) ogUrlTag.setAttribute('content', defaultUrl);
    }
  }, [activePageData, isNotFound]);

  const handleOpenOrderModal = (pkgId: string = '12-months') => {
    setSelectedPkgId(pkgId);
    setOrderModalOpen(true);
  };

  const handleNavigateToPage = (slug: string) => {
    const targetUrl = `/${slug}`;
    window.history.pushState(null, '', targetUrl);
    setRouteState({ slug, isNotFound: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHome = () => {
    window.history.pushState(null, '', '/');
    setRouteState({ slug: null, isNotFound: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      {/* Svea Header */}
      <SveaHeader
        whatsAppNumber={whatsAppNumber}
        setWhatsAppNumber={setWhatsAppNumber}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {isNotFound ? (
          /* Render 404 Not Found Page */
          <NotFoundView
            onNavigateToHome={handleNavigateToHome}
            onNavigateToPage={handleNavigateToPage}
            onOpenOrderModal={handleOpenOrderModal}
          />
        ) : activePageData ? (
          /* Render Targeted Keyword SEO Landing Page */
          <SeoKeywordPage
            pageData={activePageData}
            whatsAppNumber={whatsAppNumber}
            onNavigateToHome={handleNavigateToHome}
            onNavigateToPage={handleNavigateToPage}
            onOpenOrderModal={handleOpenOrderModal}
          />
        ) : (
          /* Render Main Homepage Content */
          <>
            <HeroSection
              onOpenOrderModal={handleOpenOrderModal}
              whatsAppNumber={whatsAppNumber}
            />

            <PricingSection
              onOpenOrderModal={handleOpenOrderModal}
              whatsAppNumber={whatsAppNumber}
            />

            <WhatsAppReviews
              onOpenOrderModal={handleOpenOrderModal}
              whatsAppNumber={whatsAppNumber}
            />

            <ChannelExplorer />

            <DeviceGuideSection
              onOpenOrderModal={() => handleOpenOrderModal('12-months')}
            />

            <FaqSection
              onOpenOrderModal={() => handleOpenOrderModal('12-months')}
            />

            {/* Complete Interactive SEO Directory Explorer for 1 790+ Keywords */}
            <SeoDirectory
              onNavigateToPage={handleNavigateToPage}
              onOpenOrderModal={handleOpenOrderModal}
              onOpenSitemapModal={() => setSitemapModalOpen(true)}
            />
          </>
        )}
      </main>

      {/* Svea Footer */}
      <SveaFooter
        onOpenOrderModal={() => handleOpenOrderModal('12-months')}
        onOpenSitemapModal={() => setSitemapModalOpen(true)}
        onNavigateToPage={handleNavigateToPage}
      />

      {/* Floating WhatsApp Chat Widget (Bottom Right) */}
      <FloatingWhatsAppWidget
        whatsAppNumber={whatsAppNumber}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* WhatsApp Quick Order & Customization Modal */}
      <WhatsAppOrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        selectedPackageId={selectedPkgId}
        whatsAppNumber={whatsAppNumber}
      />

      {/* XML Sitemap & Indexing Center Modal */}
      <SitemapModal
        isOpen={sitemapModalOpen}
        onClose={() => setSitemapModalOpen(false)}
        onNavigateToPage={handleNavigateToPage}
      />
    </div>
  );
}
