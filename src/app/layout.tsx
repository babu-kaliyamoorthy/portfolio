import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { personal } from '@/data/resume';
import { withBasePath } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const siteUrl = 'https://babu-kaliyamoorthy.github.io/portfolio';
const title = `${personal.name} — Senior Android Engineer`;
const description = `${personal.tagline} ${personal.experienceLabel} in Kotlin, Jetpack Compose, MVVM and Clean Architecture across Banking and FinTech.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${personal.name}`,
  },
  description,
  keywords: [
    'Babu Kaliyamoorthy',
    'Senior Android Engineer',
    'Android Developer Dubai',
    'Kotlin Developer',
    'Jetpack Compose',
    'MVVM Architecture',
    'Clean Architecture Android',
    'Banking App Developer',
    'FinTech Android Engineer',
    'Emirates NBD Android',
  ],
  authors: [{ name: personal.name, url: siteUrl }],
  creator: personal.name,
  applicationName: `${personal.name} Portfolio`,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: withBasePath('/favicon.svg'), type: 'image/svg+xml' },
      { url: withBasePath('/favicon.ico'), sizes: 'any' },
    ],
    apple: withBasePath('/apple-touch-icon.png'),
  },
  manifest: withBasePath('/site.webmanifest'),
  openGraph: {
    type: 'website',
    url: siteUrl,
    title,
    description,
    siteName: `${personal.name} Portfolio`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#050816',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.role,
    email: `mailto:${personal.email}`,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: personal.location,
    },
    sameAs: [personal.linkedin, personal.github],
    knowsAbout: [
      'Android Development',
      'Kotlin',
      'Jetpack Compose',
      'MVVM',
      'Clean Architecture',
      'Dependency Injection',
      'Mobile Banking Applications',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-background font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
