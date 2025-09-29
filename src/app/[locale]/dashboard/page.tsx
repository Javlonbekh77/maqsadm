
import { getUserById, getUserTasks } from "@/lib/data";
import type { UserTask } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import DashboardClient from "./dashboard-client";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');
  // In a real app, userId would come from authentication
  const userId = 'user-1';
  
  // Fetch data on the server
  const user = await getUserById(userId);
  const tasks: UserTask[] = await getUserTasks(userId);
  
  if (!user) {
    return (
        <div className="flex items-center justify-center h-full">
          <p>{t('userNotFound')}</p>
        </div>
    );
  }

  return (
    <DashboardClient user={user} initialTasks={tasks} />
  );
}
