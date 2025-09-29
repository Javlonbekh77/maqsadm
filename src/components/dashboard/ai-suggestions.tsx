import { suggestTasksAndGroups } from '@/ai/flows/ai-task-suggestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Plus } from 'lucide-react';
import type { User } from '@/lib/types';

interface AISuggestionsProps {
  user: User;
}

export default async function AISuggestions({ user }: AISuggestionsProps) {
  // In a real app, user activity would be a more complex summary
  const userActivity = `Joined ${user.groups.length} groups. Earned ${user.coins} coins.`;
  const userProfile = `Goals: ${user.goals}. Habits: ${user.habits}.`;

  const suggestions = await suggestTasksAndGroups({ userProfile, userActivity });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-primary" />
          For You
        </CardTitle>
        <CardDescription>AI-powered suggestions to help you grow.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {suggestions.suggestedTasks.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Suggested Tasks</h4>
            <ul className="space-y-2">
              {suggestions.suggestedTasks.map((task, index) => (
                <li key={index} className="flex items-center justify-between text-sm p-2 rounded-md bg-secondary/30">
                  <span className="flex-1 pr-2">{task}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {suggestions.suggestedGroups.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Suggested Groups</h4>
            <ul className="space-y-2">
              {suggestions.suggestedGroups.map((group, index) => (
                 <li key={index} className="flex items-center justify-between text-sm p-2 rounded-md bg-secondary/30">
                  <span className="flex-1 pr-2">{group}</span>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
