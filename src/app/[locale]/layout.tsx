import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { routing } from 'i18n/routing';
import { Providers } from 'shared/lib';
import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Contact center LLC',
  description: 'The team at the Contact Center has been operating for over 10 years. During this time, the number of clients using our services has been increasing, as well as the size of our team each year',
};

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          </Providers>
      </body>
    </html>
  );
}
