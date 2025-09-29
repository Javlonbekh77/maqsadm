
import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import '../globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import './i18n'; // Import the i18n configuration for client components


export const metadata: Metadata = {
  title: "MaqsadM",
  description: "Achieve your goals together.",
};

export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    notFound();
  }
  const currentLocale = await getLocale();
  if (locale !== currentLocale) {
    notFound();
  }

  return (
    <html lang={currentLocale} suppressHydrationWarning>
       <body className={cn('font-body antialiased min-h-screen bg-background font-sans')}>
        <NextIntlClientProvider locale={currentLocale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
