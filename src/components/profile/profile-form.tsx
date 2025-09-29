'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

const profileFormSchema = z.object({
  goals: z
    .string()
    .max(300, { message: 'Goals must not be longer than 300 characters.' })
    .min(10, { message: 'Please describe your goals in at least 10 characters.'}),
  habits: z
    .string()
    .max(300, { message: 'Habits must not be longer than 300 characters.' })
    .min(10, { message: 'Please describe your habits in at least 10 characters.'}),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm({ user }: { user: User }) {
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      goals: user.goals || '',
      habits: user.habits || '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, this would be an API call
    console.log('Updating profile:', data);
    toast({
      title: 'Profile Updated',
      description: 'Your goals and habits have been saved successfully.',
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Separator className="my-6" />
        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">My Goals</FormLabel>
              <FormDescription>
                What are you trying to achieve? Be specific! (e.g., Run a marathon, learn to code, read 20 books)
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your goals..."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="habits"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">My Habits</FormLabel>
              <FormDescription>
                What are the daily/weekly habits you are building? (e.g., Meditate daily, workout 3x a week)
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your habits..."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
            <Button type="submit">Update Profile</Button>
        </div>
      </form>
    </Form>
  );
}
