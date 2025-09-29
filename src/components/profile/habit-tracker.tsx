
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getUserById, getTasksByGroupId } from "@/lib/data";
import type { Task, User } from "@/lib/types";
import { format, subDays, isSameDay } from 'date-fns';
import { Check, X } from "lucide-react";
import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface HabitTrackerProps {
  user: User;
}

const getPastDates = (days: number): Date[] => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    dates.push(subDays(today, i));
  }
  return dates.reverse();
};

export default function HabitTracker({ user }: HabitTrackerProps) {
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const dates = useMemo(() => getPastDates(14), []);

  const userTasks = useMemo(() => {
    return user.groups.flatMap(groupId => getTasksByGroupId(groupId));
  }, [user.groups]);
  
  const handleTaskSelectionChange = (taskId: string) => {
    setSelectedTaskIds(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };
  
  const selectedTasks = userTasks.filter(task => selectedTaskIds.includes(task.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habit Tracker</CardTitle>
        <CardDescription>Your progress on tasks over the last 14 days.</CardDescription>
        <div className="pt-4">
             <Select onValueChange={handleTaskSelectionChange} value={selectedTaskIds.length > 0 ? selectedTaskIds[0] : ''}>
                <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a task to track" />
                </SelectTrigger>
                <SelectContent>
                    {userTasks.map(task => (
                        <SelectItem key={task.id} value={task.id}>
                            {task.title}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        {selectedTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Task</TableHead>
                  {dates.map(date => (
                    <TableHead key={date.toISOString()} className="text-center w-12">
                      <div className="flex flex-col items-center">
                        <span>{format(date, 'EEE')}</span>
                        <span className="font-normal">{format(date, 'd')}</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedTasks.map(task => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    {dates.map(date => {
                      const completed = user.taskHistory.some(historyItem => 
                        historyItem.taskId === task.id && isSameDay(new Date(historyItem.date), date)
                      );
                      return (
                        <TableCell key={date.toISOString()} className="text-center">
                          {completed ? (
                            <Check className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mx-auto" />
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
            <div className="text-center py-8 text-muted-foreground">
                <p>Select a task from the dropdown to see your progress.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
