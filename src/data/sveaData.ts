export interface PricingPackage {
  id: string;
  duration: string;
  months: number;
  price: number;
  currency: string;
  savePercent?: string;
  popular?: boolean;
  bestValue?: boolean;
  features: string[];
  whatsAppText: string;
}

export interface WhatsAppReview {
  id: string;
  customerName: string;
  avatar: string;
  location: string;
  time: string;
  date: string;
  messages: {
    sender: 'customer' | 'support';
    text: string;
    time: string;
    image?: string;
  }[];
  rating: number;
  packageUsed: string;
}

export interface ChannelCategory {
  category: string;
  icon: string;
  count: string;
  channels: string[];
}

export const SVEA_PACKAGES: PricingPackage[] = [
  {
    id: '3-months',
    duration: '3 Månader',
    months: 3,
    price: 199,
    currency: 'SEK',
    popular: false,
    bestValue: false,
    features: [
      '15 000+ Kanaler (Svenska & Int.)',
      '50 000+ Filmer & Serier (VOD)',
      'Alla Svenska Sportkanaler i 4K/FHD',
      'Anti-Freeze™ v5.2 Teknik',
      'Fungerar på Smart TV, Mobil, Firestick & Box',
      'Gratis EPG (TV-Guide) & Arkiv',
      'Snabb Aktivering (Under 5 min)'
    ],
    whatsAppText: 'Hej Svea IPTV! Jag vill beställa 3 Månader paket för 199 SEK. Hur går vi vidare?'
  },
  {
    id: '6-months',
    duration: '6 Månader',
    months: 6,
    price: 349,
    currency: 'SEK',
    savePercent: 'Spara 35%',
    popular: true,
    bestValue: false,
    features: [
      '15 000+ Kanaler (Svenska & Int.)',
      '50 000+ Filmer & Serier (VOD)',
      'Alla Svenska Sportkanaler i 4K/FHD',
      'Anti-Freeze™ v5.2 Teknik',
      'Fungerar på Alla Enheter samtidigt option',
      'Gratis EPG (TV-Guide) & Arkiv',
      'Prioriterad Kundsupport 24/7',
      'Snabb Aktivering (Under 5 min)'
    ],
    whatsAppText: 'Hej Svea IPTV! Jag vill beställa 6 Månader paket för 349 SEK. Hur går vi vidare?'
  },
  {
    id: '12-months',
    duration: '12 Månader',
    months: 12,
    price: 499,
    currency: 'SEK',
    savePercent: 'BÄSTA PRIS - SPARA 60%',
    popular: false,
    bestValue: true,
    features: [
      '15 000+ Kanaler (Fullständigt utbud)',
      '50 000+ Filmer & Serier med svensk text',
      '4K Ultra HD & 60fps på Alla Sportkanaler',
      'Maximal Anti-Freeze™ v5.2 Prioritet',
      'Kompatibel med Smart TV, TiviMate, Formuler, Apple TV',
      'Gratis Automatiska Uppdateringar & EPG',
      'VIP Support dygnet runt på Svenska',
      'Direkt leverans på WhatsApp inom 3 minuter'
    ],
    whatsAppText: 'Hej Svea IPTV! Jag vill beställa 12 Månader VIP-paket för 499 SEK. Kan ni hjälpa mig att aktivera det nu?'
  }
];

export const WHATSAPP_REVIEWS: WhatsAppReview[] = [
  {
    id: 'rev-1',
    customerName: 'Marcus Lindqvist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Stockholm',
    time: 'IGÅR 20:14',
    date: 'I går',
    rating: 5,
    packageUsed: '12 Månader (499 SEK)',
    messages: [
      {
        sender: 'customer',
        text: 'Tja! Ville bara tacka för 12-månaders abonnemanget. Installerade IBO Player på min LG Smart TV och det laddade direkt! 🔥',
        time: '20:12'
      },
      {
        sender: 'support',
        text: 'Grymt Marcus! Kul att höra. Funkar sportkanalerna bra för dig?',
        time: '20:13'
      },
      {
        sender: 'customer',
        text: 'Kollade Premier League ikväll i 4K 60fps. Noll lagg eller buffring hela matchen! Tidigare leverantör hackade hela tiden. Svea IPTV är på en helt annan nivå! 👏⚽',
        time: '20:14'
      }
    ]
  },
  {
    id: 'rev-2',
    customerName: 'Elin & Johan',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    location: 'Göteborg',
    time: 'IDAG 14:22',
    date: 'Idag',
    rating: 5,
    packageUsed: '12 Månader (499 SEK)',
    messages: [
      {
        sender: 'customer',
        text: 'Hej! Köpte 12 månader nyss via Swish-instruktionerna. Hur får jag in listan på min Formuler Z11?',
        time: '14:15'
      },
      {
        sender: 'support',
        text: 'Hej Elin! Här är din Portal-URL och MAC-aktivering. Lägg in länken i MYTVOnline 3 så är du igång om 1 minut 👍',
        time: '14:18'
      },
      {
        sender: 'customer',
        text: 'Tack för supersnabb hjälpen!! Barnen tittar på Astrid Lindgren och gubben har V Sport Vinter igång. Så smidigt att allt finns på svenska med text!',
        time: '14:22'
      }
    ]
  },
  {
    id: 'rev-3',
    customerName: 'Stefan Berg',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    location: 'Malmö',
    time: '3 DAGAR SEDAN',
    date: '22 Juli',
    rating: 5,
    packageUsed: '6 Månader (349 SEK)',
    messages: [
      {
        sender: 'customer',
        text: 'Funkar detta på min Apple TV med TiviMate eller IPTV Smarters?',
        time: '18:02'
      },
      {
        sender: 'support',
        text: 'Ja absolut Stefan! Fungerar klockrent på Apple TV, Android, Samsung, LG och Firestick. Vi skickar m3u länk eller Xtream Codes.',
        time: '18:05'
      },
      {
        sender: 'customer',
        text: 'Körde på 6 månader för 349kr. Sjukt bra bildkvalitet på C More & Viaplay kanaler! Kommer garanterat förlänga till 12 månader sen!',
        time: '18:30'
      }
    ]
  },
  {
    id: 'rev-4',
    customerName: 'Daniel K.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    location: 'Uppsala',
    time: 'I VECKAN',
    date: '19 Juli',
    rating: 5,
    packageUsed: '3 Månader (199 SEK)',
    messages: [
      {
        sender: 'customer',
        text: 'Ville testa 3 månader först för 199kr. Tog bara 3 minuter att få inloggningen via WhatsApp!',
        time: '11:40'
      },
      {
        sender: 'support',
        text: 'Härligt Daniel! Tveka inte att skriva om du vill ha hjälp med kanallistan.',
        time: '11:42'
      },
      {
        sender: 'customer',
        text: 'Testade Allsvenskan i helgen. Perfekt bild och inget frysande. Bäst i Sverige helt klart ⭐⭐⭐⭐⭐',
        time: '12:05'
      }
    ]
  }
];

export const CHANNEL_CATEGORIES: ChannelCategory[] = [
  {
    category: '🇸🇪 Svenska Kanaler',
    icon: 'Tv',
    count: '120+ Kanaler',
    channels: [
      'SVT1 HD/4K', 'SVT2 HD', 'TV3 HD', 'TV4 HD/4K', 'Kanal 5 HD', 'TV6 HD', 'Sjuan', 'TV8', 'Kanal 9', 'Kanal 11',
      'TV12 HD', 'Kunskapskanalen', 'SVTB / Barnkanalen', 'SF Kanalen'
    ]
  },
  {
    category: '⚽ Svensk & Int. Sport',
    icon: 'Trophy',
    count: '850+ Sportkanaler',
    channels: [
      'V Sport Premium 4K', 'V Sport Fotboll HD', 'V Sport Motor 4K', 'V Sport Extra', 'V Sport Vinter',
      'C More Sport HD', 'C More Fotboll', 'C More Hockey', 'Eurosport 1 & 2 4K', 'Discovery+ Sport',
      'Sky Sports UK/DE', 'DAZN 4K', 'BeIN Sports 4K', 'TNT Sports UK'
    ]
  },
  {
    category: '🎬 Film & Serier VOD',
    icon: 'Film',
    count: '50 000+ Titlar',
    channels: [
      'Svenska Filmer (SF Bio)', 'Senaste Bioreleaser med Sv Text', 'Netflix Original Bibliotek', 'HBO Max Serier',
      'Disney+ Barn & Marvel', 'SkyShowtime', 'Apple TV+ Exklusivt', '4K HDR Cinema VOD'
    ]
  },
  {
    category: '🌍 Nordiska & Int. Paket',
    icon: 'Globe',
    count: '14 000+ Kanaler',
    channels: [
      '🇳🇴 Norge (NRK, TV2, Viaplay NO)', '🇩🇰 Danmark (DR1, TV2 DK)', '🇫🇮 Finland (Yle, MTV3)',
      '🇬🇧 Storbritannien (BBC, ITV, Sky)', '🇺🇸 USA & Kanada (HBO, CBS, NBC)', '🇹🇷 Turkiska Kanaler',
      '🇦🇱 Balkan (Arena Sport, Pink)', '🇦🇪 Arabiska (BeIN, OSN, MBC)'
    ]
  }
];

export const FAQS = [
  {
    question: 'Vad är Svea IPTV (svea-iptv.com)?',
    answer: 'Svea IPTV är Sveriges ledande och mest stabila IPTV-leverantör. Vi erbjuder över 15 000+ live tv-kanaler i HD/4K samt ett gigantiskt VOD-bibliotek med över 50 000 filmer och serier med svensk undertext.'
  },
  {
    question: 'Hur snabbt får jag mina inloggningsuppgifter efter beställning?',
    answer: 'Du får dina uppgifter (M3U-länk, Xtream Codes eller Portal-URL) skickade direkt till din WhatsApp inom 3 till 5 minuter efter att din beställning har mottagits.'
  },
  {
    question: 'Vilka appar och enheter kan jag använda Svea IPTV på?',
    answer: 'Svea IPTV är kompatibelt med ALLA populära enheter: Smart TV (Samsung, LG, Sony via IBO Player, Net IPTV, IPTV Smarters), Android TV / Google TV, Firestick, Formuler Z-boxar, Apple TV (TiviMate, GSE), MAG-boxar, Dator (VLC) och Mobiltelefoner (iOS/Android).'
  },
  {
    question: 'Hackar eller buffrar sändningarna under stora matcher?',
    answer: 'Nej! Vi använder vår egen utvecklade Anti-Freeze™ v5.2 serverteknik med flera dedikerade svenska servrar. Det garanterar 99.9% uptime och en helt laggfri upplevelse även under stora matcher i Allsvenskan, Champions League och Premier League.'
  },
  {
    question: 'Vilken internethastighet behöver jag?',
    answer: 'Vi rekommenderar minst 15-20 Mbps för stabil Full HD-streaming och minst 30-50 Mbps för 4K Ultra HD-streaming.'
  },
  {
    question: 'Hur beställer jag via WhatsApp?',
    answer: 'Klicka bara på "Beställ nu" vid önskat paket (3 månader för 199 kr, 6 månader för 349 kr eller 12 månader för 499 kr). Ett förskrivet WhatsApp-meddelande öppnas i din app där vår support hjälper dig direkt!'
  }
];
