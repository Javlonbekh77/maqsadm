
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Trophy } from 'lucide-react';
import Logo from '@/components/logo';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: t('landing.feature1Title'),
      description: t('landing.feature1Desc'),
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: t('landing.feature2Title'),
      description: t('landing.feature2Desc'),
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: t('landing.feature3Title'),
      description: t('landing.feature3Desc'),
    },
  ];

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/dashboard" prefetch={false}>
              {t('landing.login')}
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard" prefetch={false}>
              {t('landing.signUp')}
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full pt-24 lg:pt-32 pb-12 md:pb-24 lg:pb-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {t('landing.heroTitle')}
              </h1>
              <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
                {t('landing.heroSubtitle')}
              </p>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard" prefetch={false}>
                    {t('landing.getStarted')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {heroImage && (
             <div className="relative mt-12 w-full h-[300px] md:h-[500px] lg:h-[600px]">
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
             </div>
          )}
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('landing.whyTitle')}</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('landing.whySubtitle')}
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card/80 border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="flex flex-col items-center text-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-foreground/80">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
        <p className="text-xs text-foreground/60">{t('landing.footerRights')}</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-foreground/80" prefetch={false}>
            {t('landing.footerTerms')}
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-foreground/80" prefetch={false}>
            {t('landing.footerPrivacy')}
          </Link>
        </nav>
      </footer>
    </div>
  );
}
