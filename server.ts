import express from "express";
import path from "path";
import fs from "fs";
import zlib from "zlib";
import compression from "compression";
import dotenv from "dotenv";
import { getAllSeoPages, getSeoPageBySlug, SeoPageMetaData } from "./src/data/seoKeywords";

dotenv.config();

const app = express();
const PORT = 3000;
const DOMAIN = "https://svea-iptv.com";

// Enforce production mode environment flag if not set
process.env.NODE_ENV = process.env.NODE_ENV || "production";

// Disable verbose console logs in production
if (process.env.NODE_ENV === "production") {
  const originalLog = console.log;
  console.log = (...args: any[]) => {
    // Suppress non-essential debug logs in production
    if (typeof args[0] === "string" && (args[0].includes("Server running") || args[0].includes("Error"))) {
      originalLog(...args);
    }
  };
}

// ----------------------------------------------------
// 0. HTTP RESPONSE COMPRESSION & SECURITY HEADERS
// ----------------------------------------------------
app.use(compression());
app.use(express.json());

// Security Headers (Friendly to Googlebot, Bingbot & Search Indexers)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Health check endpoint for Docker container & Docker Compose healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", domain: DOMAIN, timestamp: new Date().toISOString() });
});

// In-Memory Page Cache for Sub-50ms TTFB
const pageCache = new Map<string, { html: string; statusCode: number; timestamp: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache TTL

// ----------------------------------------------------
// 1. LEGACY REDIRECTS & 410 GONE PURGE DICTIONARY
// ----------------------------------------------------
const LEGACY_301_REDIRECTS: Record<string, string> = {
  "/basta-iptv-2014": "/basta-iptv",
  "/basta-iptv-2015": "/basta-iptv",
  "/basta-iptv-2016": "/basta-iptv",
  "/basta-iptv-2017": "/basta-iptv",
  "/basta-iptv-2018": "/basta-iptv",
  "/basta-iptv-2019": "/basta-iptv",
  "/basta-iptv-2020": "/basta-iptv",
  "/basta-iptv-2021": "/basta-iptv",
  "/basta-iptv-2022": "/basta-iptv",
  "/basta-iptv-2023": "/basta-iptv",
  "/basta-iptv-2024": "/basta-iptv",
  "/basta-iptv-2025": "/basta-iptv",
  "/basta-iptv-leverantor-2014": "/basta-iptv-leverantor",
  "/basta-iptv-leverantor-2015": "/basta-iptv-leverantor",
  "/basta-iptv-leverantor-2016": "/basta-iptv-leverantor",
  "/basta-iptv-leverantor-2017": "/basta-iptv-leverantor",
  "/basta-iptv-leverantor-2018": "/basta-iptv-leverantor",
  "/basta-iptv-leverantor-2019": "/basta-iptv-leverantor",
  "/basta-iptv-leverantor-2020": "/basta-iptv-leverantor",
  "/iptv-sverige-2018": "/iptv-sverige",
  "/iptv-sverige-2019": "/iptv-sverige",
  "/iptv-sverige-2020": "/iptv-sverige"
};

const GONE_JUNK_SLUGS = new Set([
  "/basta-iptv-box-2017",
  "/basta-iptv-box-2018",
  "/basta-iptv-box-2019",
  "/basta-iptv-box-2020",
  "/iptv-kopa-darknet",
  "/iptv-darknet",
  "/darknet-iptv",
  "/kopa-iptv-darknet",
  "/crack-iptv",
  "/free-iptv-hack",
  "/illegal-iptv-download",
  "/pirate-iptv-stream"
]);

// ----------------------------------------------------
// 2. PROTOCOL, HOST & CANONICAL ROUTING MIDDLEWARE
// ----------------------------------------------------
app.use((req, res, next) => {
  // Ignore static assets and API routes
  if (
    req.path.startsWith("/api/") ||
    req.path.includes(".") ||
    req.path.startsWith("/@") ||
    req.path.startsWith("/node_modules")
  ) {
    return next();
  }

  const hostHeader = req.headers.host || "";
  const reqPathLower = req.path.toLowerCase();

  // 1. Check HTTP 410 Gone status for junk/spam URLs
  if (GONE_JUNK_SLUGS.has(reqPathLower)) {
    return res
      .status(410)
      .type("text/html")
      .send(
        `<!DOCTYPE html><html lang="sv"><head><title>410 Gone - Permanent Borttagen</title><meta name="robots" content="noindex, follow" /></head><body style="font-family:system-ui,sans-serif;padding:3rem;text-align:center;"><h1>410 Gone</h1><p>Denna sida och alla dess relaterade tjänster har tagits bort permanent från svea-iptv.com.</p><p><a href="https://svea-iptv.com/">Gå till Svea IPTV Startsida &rarr;</a></p></body></html>`
      );
  }

  // 2. Check 301 Permanent Redirects for valuable legacy URLs
  if (LEGACY_301_REDIRECTS[reqPathLower]) {
    return res.redirect(301, `${DOMAIN}${LEGACY_301_REDIRECTS[reqPathLower]}`);
  }

  // 3. Enforce HTTPS and www -> non-www domain canonicalization in production
  if (
    process.env.NODE_ENV === "production" &&
    ((req.headers["x-forwarded-proto"] && req.headers["x-forwarded-proto"] !== "https") ||
      hostHeader.startsWith("www."))
  ) {
    return res.redirect(301, `${DOMAIN}${req.originalUrl}`);
  }

  // 4. Handle legacy /seo/ prefix -> 301 redirect to clean root slug
  if (req.path.startsWith("/seo/")) {
    const cleanPath = req.path.replace("/seo/", "/");
    return res.redirect(301, `${DOMAIN}${cleanPath}`);
  }

  // 5. Enforce no trailing slash (except root '/')
  if (req.path.length > 1 && req.path.endsWith("/")) {
    const query = req.url.slice(req.path.length);
    const safePath = req.path.slice(0, -1);
    return res.redirect(301, `${DOMAIN}${safePath}${query}`);
  }

  // 6. Enforce lowercase URLs
  if (req.path !== reqPathLower) {
    const query = req.url.slice(req.path.length);
    return res.redirect(301, `${DOMAIN}${reqPathLower}${query}`);
  }

  next();
});

// ----------------------------------------------------
// 3. DYNAMIC SITEMAP & ROBOTS.TXT
// ----------------------------------------------------
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /*?*

Sitemap: ${DOMAIN}/sitemap.xml
`);
});

function generateSitemapXml(): string {
  const pages = getAllSeoPages();
  const currentDate = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Homepage
  xml += `  <url>\n`;
  xml += `    <loc>${DOMAIN}/</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // All 200 OK Clean Canonical SEO Pages
  pages.forEach((page) => {
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}/${page.slug}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

app.get("/sitemap.xml", (req, res) => {
  const xml = generateSitemapXml();
  res.type("application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
  res.send(xml);
});

app.get("/sitemap.xml.gz", (req, res) => {
  const xml = generateSitemapXml();
  zlib.gzip(xml, (err, buffer) => {
    if (err) {
      return res.status(500).send("Error compressing sitemap");
    }
    res.type("application/x-gzip");
    res.setHeader("Content-Encoding", "gzip");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.send(buffer);
  });
});

// ----------------------------------------------------
// 4. PRE-RENDERED SSR HTML GENERATOR FOR SEO CRAWLERS
// ----------------------------------------------------
function renderPreRenderedSeoHtml(pageData: SeoPageMetaData): string {
  const { cleanKeyword, heroHeadline, heroSubtext, seoArticle, customFaqs } = pageData;
  return `
  <div id="root">
    <main style="max-width: 1200px; margin: 0 auto; padding: 2rem; font-family: system-ui, -apple-system, sans-serif;">
      <header style="margin-bottom: 2.5rem; text-align: center;">
        <span style="display: inline-block; padding: 0.25rem 0.75rem; background-color: #f1f5f9; color: #0284c7; border-radius: 9999px; font-weight: 600; font-size: 0.875rem;">${pageData.categoryLabel}</span>
        <h1 style="font-size: 2.5rem; font-weight: 800; color: #0f172a; margin-top: 1rem;">${heroHeadline}</h1>
        <p style="font-size: 1.125rem; color: #475569; max-width: 800px; margin: 1rem auto 0 auto;">${heroSubtext}</p>
      </header>

      <article style="line-height: 1.75; color: #334155;">
        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.75rem; font-weight: 700; color: #0f172a;">${seoArticle.introHeading}</h2>
          <p>${seoArticle.introBody}</p>
          <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 1rem 1.5rem; margin-top: 1rem; border-radius: 0 0.5rem 0.5rem 0;">
            <p style="font-style: italic; color: #1e293b; margin: 0;">${seoArticle.narrativeHook}</p>
          </div>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a;">${seoArticle.keyPointsHeading}</h2>
          <ul>
            ${seoArticle.keyPoints.map((point) => `<li>${point}</li>`).join("")}
          </ul>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a;">${seoArticle.comparisonHeading}</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; text-align: left;">
            <thead>
              <tr style="background-color: #0284c7; color: white;">
                <th style="padding: 0.75rem; border: 1px solid #cbd5e1;">Funktion</th>
                <th style="padding: 0.75rem; border: 1px solid #cbd5e1;">Svea IPTV</th>
                <th style="padding: 0.75rem; border: 1px solid #cbd5e1;">Standard IPTV</th>
                <th style="padding: 0.75rem; border: 1px solid #cbd5e1;">Kabel-TV</th>
              </tr>
            </thead>
            <tbody>
              ${seoArticle.comparisonTable
                .map(
                  (row) => `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 0.75rem; font-weight: 600; border: 1px solid #e2e8f0;">${row.feature}</td>
                  <td style="padding: 0.75rem; color: #166534; font-weight: 600; border: 1px solid #e2e8f0;">${row.sveaIptv}</td>
                  <td style="padding: 0.75rem; color: #991b1b; border: 1px solid #e2e8f0;">${row.standardIptv}</td>
                  <td style="padding: 0.75rem; color: #475569; border: 1px solid #e2e8f0;">${row.cableTv}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a;">${seoArticle.technicalHeading}</h2>
          <p>${seoArticle.technicalBody}</p>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a;">${seoArticle.ispPerformanceHeading}</h2>
          <ul>
            ${seoArticle.ispPerformance
              .map(
                (item) => `
              <li><strong>${item.isp}</strong> (Latens: ${item.latency}, Stabilitet: ${item.stabilityScore}): ${item.recommendation}</li>
            `
              )
              .join("")}
          </ul>
        </section>

        <section style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a;">${seoArticle.deviceSetupHeading}</h2>
          <div>
            ${seoArticle.deviceGuides
              .map(
                (guide) => `
              <div style="margin-bottom: 1rem; padding: 1rem; background: #f1f5f9; border-radius: 0.5rem;">
                <h3 style="font-size: 1.125rem; font-weight: 600; margin: 0 0 0.5rem 0;">${guide.device}</h3>
                <p style="margin: 0;">${guide.guide}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </section>

        <section style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a;">Vanliga frågor om ${cleanKeyword} (FAQ)</h2>
          ${customFaqs
            .map(
              (faq) => `
            <div style="margin-bottom: 1.25rem;">
              <h3 style="font-size: 1.125rem; font-weight: 600; color: #0f172a;">Q: ${faq.question}</h3>
              <p style="margin-top: 0.25rem; color: #334155;">A: ${faq.answer}</p>
            </div>
          `
            )
            .join("")}
        </section>

        <footer style="padding: 1.5rem; background-color: #0f172a; color: white; border-radius: 0.75rem; text-align: center;">
          <h2 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${seoArticle.recommendationHeading}</h2>
          <p style="margin: 0; font-size: 0.95rem; color: #cbd5e1;">${seoArticle.recommendationBody}</p>
        </footer>
      </article>
    </main>
  </div>`;
}

// ----------------------------------------------------
// 5. SERVER-SIDE HTML TRANSFORMATION & SCHEMA INJECTION
// ----------------------------------------------------
function transformPageHtml(rawHtml: string, reqPath: string): { html: string; statusCode: number } {
  // Strip query parameters and clean slug
  const cleanPath = reqPath.split("?")[0].replace(/^\/+|\/+$/g, "");

  // CASE 1: HOMEPAGE
  if (cleanPath === "") {
    const title = "Svea IPTV (svea-iptv.com) – Sveriges Bästa IPTV Leverantör 2026";
    const desc = "Svea IPTV (svea-iptv.com) erbjuder Sveriges stabilaste IPTV med 15 000+ kanaler & 50 000+ VOD. Anti-Freeze v5.2, Viaplay, C More, Allsvenskan i 4K. Testa gratis 24h.";
    const keywords = "svea iptv, svea-iptv.com, iptv sverige, bästa iptv sverige, köpa iptv, iptv kanaler, svenska kanaler iptv, iptv 12 månader 499 sek, stabil iptv, v sport, viaplay iptv, iptv smarters";
    const url = `${DOMAIN}/`;

    let html = rawHtml
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${desc}" />`)
      .replace(/<meta name="keywords" content=".*?"\s*\/?>/, `<meta name="keywords" content="${keywords}" />`)
      .replace(/<meta name="robots" content=".*?"\s*\/?>/, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`)
      .replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
      .replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${desc}" />`)
      .replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${url}" />`);

    return { html, statusCode: 200 };
  }

  // CASE 2: SEO KEYWORD PAGE
  const pageData = getSeoPageBySlug(cleanPath);
  if (pageData) {
    const title = pageData.metaTitle;
    const desc = pageData.metaDescription;
    const keywords = `${pageData.cleanKeyword}, ${pageData.categoryLabel}, svea iptv, iptv sverige, bästa iptv, köpa iptv, iptv kanaler, svenska kanaler iptv`;
    const url = `${DOMAIN}/${pageData.slug}`;

    const schemaJson = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "headline": pageData.metaTitle,
          "description": pageData.metaDescription,
          "image": [`${DOMAIN}/favicon.svg`],
          "datePublished": "2026-01-01T08:00:00+01:00",
          "dateModified": "2026-08-08T08:00:00+01:00",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          },
          "author": {
            "@type": "Organization",
            "name": "Svea IPTV",
            "url": DOMAIN
          },
          "publisher": {
            "@type": "Organization",
            "name": "Svea IPTV",
            "url": DOMAIN,
            "logo": {
              "@type": "ImageObject",
              "url": `${DOMAIN}/favicon.svg`
            }
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Startsida",
              "item": `${DOMAIN}/`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": pageData.categoryLabel,
              "item": `${DOMAIN}/`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": pageData.cleanKeyword,
              "item": url
            }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": pageData.customFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        },
        {
          "@type": "Product",
          "name": `Svea IPTV Premium Abonnemang - ${pageData.cleanKeyword}`,
          "image": [`${DOMAIN}/favicon.svg`],
          "description": `Premium IPTV abonnemang med 15 000+ kanaler & 50 000+ VOD-filmer i 4K Ultra HD. Optimerat för ${pageData.cleanKeyword}.`,
          "brand": {
            "@type": "Brand",
            "name": "Svea IPTV"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "1482"
          },
          "offers": {
            "@type": "Offer",
            "url": url,
            "priceCurrency": "SEK",
            "price": "499",
            "validFrom": "2026-01-01",
            "priceValidUntil": "2026-12-31",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "SE",
              "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
              "merchantReturnDays": 14,
              "returnMethod": "https://schema.org/ReturnByMail",
              "returnFees": "https://schema.org/FreeReturn"
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "SEK"
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "SE"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 1,
                  "unitCode": "DAY"
                }
              }
            }
          }
        }
      ]
    });

    let html = rawHtml
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${desc}" />`)
      .replace(/<meta name="keywords" content=".*?"\s*\/?>/, `<meta name="keywords" content="${keywords}" />`)
      .replace(/<meta name="robots" content=".*?"\s*\/?>/, `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`)
      .replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
      .replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
      .replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${desc}" />`)
      .replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${url}" />`);

    // Inject Pre-rendered SSR HTML content inside <div id="root">
    html = html.replace(/<div id="root"><\/div>/, renderPreRenderedSeoHtml(pageData));

    // Inject JSON-LD Structured Data Schema into <head>
    html = html.replace("</head>", `<script type="application/ld+json">${schemaJson}</script></head>`);

    return { html, statusCode: 200 };
  }

  // CASE 3: UNKNOWN ROUTE -> RETURN HTTP 404 TO PREVENT SOFT 404
  const title = "404 - Sidan hittades inte | Svea IPTV";
  const desc = "Sidan du söker finns inte eller har flyttats. Gå tillbaka till startsidan eller utforska våra IPTV-guider.";
  const url = `${DOMAIN}/`;

  let html = rawHtml
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${desc}" />`)
    .replace(/<meta name="robots" content=".*?"\s*\/?>/, `<meta name="robots" content="noindex, follow" />`)
    .replace(/<link rel="canonical" href=".*?"\s*\/?>/, `<link rel="canonical" href="${url}" />`);

  return { html, statusCode: 404 };
}

// Helper to get or render transformed page with in-memory caching
function getCachedOrTransformedHtml(rawHtml: string, reqPath: string): { html: string; statusCode: number } {
  const cacheKey = reqPath.split("?")[0].toLowerCase();
  const cached = pageCache.get(cacheKey);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return { html: cached.html, statusCode: cached.statusCode };
  }

  const result = transformPageHtml(rawHtml, reqPath);

  // Store 200 and 404 responses in cache
  pageCache.set(cacheKey, {
    html: result.html,
    statusCode: result.statusCode,
    timestamp: now
  });

  return result;
}

// ----------------------------------------------------
// 6. START SERVER
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });

    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      try {
        const startTime = Date.now();
        const indexPath = path.join(process.cwd(), "index.html");
        let rawHtml = fs.readFileSync(indexPath, "utf-8");
        rawHtml = await vite.transformIndexHtml(req.originalUrl, rawHtml);
        const { html, statusCode } = getCachedOrTransformedHtml(rawHtml, req.path);

        res.setHeader("X-Cache", pageCache.has(req.path) ? "HIT" : "MISS");
        res.setHeader("Server-Timing", `ttfb;dur=${Date.now() - startTime}`);
        res.setHeader(
          "Cache-Control",
          statusCode === 200 ? "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" : "no-cache"
        );
        res.status(statusCode).type("text/html").send(html);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");

    // Static asset caching middleware with 1-year maxAge & immutable directive
    app.use(
      express.static(distPath, {
        index: false,
        maxAge: "1y",
        immutable: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
          } else if (filePath.endsWith(".js") || filePath.endsWith(".css")) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          } else if (/\.(png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|otf)$/.test(filePath)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
        }
      })
    );

    // 404 Handler for missing static assets
    app.use((req, res, next) => {
      if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|webp|avif|svg|ico|woff|woff2|ttf|otf|json|map)$/i)) {
        return res.status(404).type("text/plain").send("404 Not Found");
      }
      next();
    });

    app.get("*", (req, res) => {
      const startTime = Date.now();
      const indexPath = path.join(distPath, "index.html");
      let rawHtml = fs.readFileSync(indexPath, "utf-8");
      const { html, statusCode } = getCachedOrTransformedHtml(rawHtml, req.path);

      res.setHeader("X-Cache", pageCache.has(req.path) ? "HIT" : "MISS");
      res.setHeader("Server-Timing", `ttfb;dur=${Date.now() - startTime}`);
      res.setHeader(
        "Cache-Control",
        statusCode === 200 ? "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800" : "no-cache"
      );
      res.status(statusCode).type("text/html").send(html);
    });
  }

  // Global Express Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Server Error:", err?.message || err);
    if (!res.headersSent) {
      res
        .status(500)
        .type("text/html")
        .send(
          "<!DOCTYPE html><html><head><title>500 Internal Server Error</title></head><body><h1>500 Internal Server Error</h1><p>An unexpected server error occurred. Please try again later.</p></body></html>"
        );
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
