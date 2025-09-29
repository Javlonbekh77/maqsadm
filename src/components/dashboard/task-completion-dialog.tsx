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

interface TaskCompletionDialogProps {
  task: UserTask;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function TaskCompletionDialog({ task, onConfirm, onCancel }: TaskCompletionDialogProps) {
  return (
    <AlertDialog open onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Task Completion</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to mark the task <span className="font-semibold text-foreground">"{task.title}"</span> as complete.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 p-4 bg-secondary/50 rounded-lg border space-y-3">
            <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">A quick reminder on integrity:</h4>
            </div>
            <p className="text-sm text-muted-foreground">
                By confirming, you agree that you have completed this task to the best of your ability. Honesty is key to personal growth and community trust.
            </p>
            <div className="flex items-center justify-end gap-2 text-lg font-bold text-amber-500 pt-2">
                You will earn
                <Coins className="h-5 w-5"/>
                <span>{task.coins} coins</span>
            </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onConfirm}>Yes, I've completed it!</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
