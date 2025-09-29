import AppLayout from "@/components/layout/app-layout";
import TodoList from "@/components/dashboard/todo-list";
import { getUserById, getUserTasks } from "@/lib/data";
import type { UserTask } from "@/lib/types";

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  // In a real app, userId would come from authentication
  const userId = 'user-1';
  const user = getUserById(userId);
  const tasks: UserTask[] = getUserTasks(userId);
  
  if (!user) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <p>User not found.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="grid gap-8">
        <div>
          <h1 className="text-3xl font-bold font-headline">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Here's what's on your plate for today. Let's make it a productive one.</p>
        </div>

        <div className="grid gap-8 items-start">
          <div>
            <TodoList initialTasks={tasks} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
