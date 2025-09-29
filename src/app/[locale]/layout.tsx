import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';

import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: "MaqsadM",
  description: "Achieve your goals together.",
};

export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
       <body className={cn('font-body antialiased min-h-screen bg-background font-sans')}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
