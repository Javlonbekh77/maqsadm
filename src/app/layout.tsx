
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Since we're using 'use client', we can't use the `metadata` export.
// We'll set the title dynamically in the component.
// You can create a wrapper component to handle metadata if needed.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <I18nextProvider i18n={i18n}>
      <html lang={i18n.language} suppressHydrationWarning>
        <head>
          <title>MaqsadM</title>
          <meta name="description" content="Achieve your goals together." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={cn('font-body antialiased min-h-screen bg-background font-sans')}>
          {children}
          <Toaster />
        </body>
      </html>
    </I18nextProvider>
  );
}
