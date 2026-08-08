import type { ReactNode } from 'react';

export const metadata = {
  title: 'Svea IPTV',
  description: 'Sveriges ledande IPTV-leverantör',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="sv">
      <body className="antialiased text-slate-900 bg-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}

