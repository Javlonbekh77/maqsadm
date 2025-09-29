
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Coins } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function CreateTaskDialog() {
  const t = useTranslations('createTaskDialog');
  const tActions = useTranslations('actions');
  const [open, setOpen] = useState(false);

  // In a real app, this would be a form with state management (e.g. react-hook-form)
  // and would call an API on submit.
  const handleSubmit = () => {
    // Logic to create task
    console.log('Creating task...');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('addTaskButton')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              {t('titleLabel')}
            </Label>
            <Input id="title" placeholder={t('titlePlaceholder')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              {t('descriptionLabel')}
            </Label>
            <Textarea id="description" placeholder={t('descriptionPlaceholder')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coins" className="text-right flex items-center justify-end gap-1">
                <Coins className="h-4 w-4 text-amber-500" />
                {t('coinsLabel')}
            </Label>
            <Input id="coins" type="number" placeholder={t('coinsPlaceholder')} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>{tActions('cancel')}</Button>
          <Button type="submit" onClick={handleSubmit}>{t('createTaskButton')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
