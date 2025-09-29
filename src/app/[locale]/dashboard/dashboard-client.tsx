
'use client';

import AppLayout from "@/components/layout/app-layout";
import TodoList from "@/components/dashboard/todo-list";
import type { User, UserTask } from "@/lib/types";
import { useTranslations } from "next-intl";

interface DashboardClientProps {
  user: User;
  initialTasks: UserTask[];
}

export default function DashboardClient({ user, initialTasks }: DashboardClientProps) {
  const t = useTranslations('dashboard');

  return (
    <AppLayout>
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">{t('welcome', { name: user.fullName.split(' ')[0] })}</h1>
          <p className="text-muted-foreground">{t('welcomeSubtitle')}</p>
        </div>

        <div className="grid gap-8 items-start">
          <div>
            <TodoList initialTasks={initialTasks} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
