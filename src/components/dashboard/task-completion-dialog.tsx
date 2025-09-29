
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import type { UserTask } from '@/lib/types';
import { Coins, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TaskCompletionDialogProps {
  task: UserTask;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function TaskCompletionDialog({ task, onConfirm, onCancel }: TaskCompletionDialogProps) {
  const { t } = useTranslation();

  return (
    <AlertDialog open onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('taskCompletionDialog.title')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('taskCompletionDialog.description', { taskTitle: task.title })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 p-4 bg-secondary/50 rounded-lg border space-y-3">
            <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">{t('taskCompletionDialog.integrityTitle')}</h4>
            </div>
            <p className="text-sm text-muted-foreground">
                {t('taskCompletionDialog.integrityDescription')}
            </p>
            <div className="flex items-center justify-end gap-2 text-lg font-bold text-amber-500 pt-2">
                {t('taskCompletionDialog.earn')}
                <Coins className="h-5 w-5"/>
                <span>{t('taskCompletionDialog.coins', { count: task.coins })}</span>
            </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onCancel}>{t('actions.cancel')}</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onConfirm}>{t('taskCompletionDialog.confirmButton')}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
