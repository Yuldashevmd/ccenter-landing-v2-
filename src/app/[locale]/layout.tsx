import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { routing } from 'i18n/routing';
import { Providers } from 'shared/lib';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { SideNav } from 'shared/ui';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased container`}>
        <Providers>
          <Header />
          <div className="relative">
            <aside>
              <SideNav />
            </aside>
            <main>{children}</main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
