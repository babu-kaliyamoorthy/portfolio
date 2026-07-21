'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-SNKM1KK271';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  // The gtag config call below sends the initial page_view. On every
  // subsequent client-side route change (App Router doesn't reload the
  // page), we send a fresh page_view manually - gtag.js only auto-tracks
  // the first load.
  useEffect(() => {
    if (!pathname || typeof window.gtag !== 'function') return;
    window.gtag('config', GA_MEASUREMENT_ID, { page_path: pathname });
  }, [pathname]);

  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
