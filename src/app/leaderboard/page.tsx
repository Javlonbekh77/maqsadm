
'use client';

import AppLayout from "@/components/layout/app-layout";
import LeaderboardTabs from "@/components/leaderboard/leaderboard-tabs";
import { useTranslation } from "react-i18next";

export default function LeaderboardPage() {
  const { t } = useTranslation();
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">{t('leaderboard.title')}</h1>
          <p className="text-muted-foreground">{t('leaderboard.subtitle')}</p>
        </div>
        <LeaderboardTabs />
      </div>
    </AppLayout>
  );
}
