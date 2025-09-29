
'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function GoBackButton() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Button variant="ghost" onClick={() => router.back()} className="pl-0">
      <ArrowLeft className="mr-2 h-4 w-4" />
      {t('actions.goBack')}
    </Button>
  );
}
