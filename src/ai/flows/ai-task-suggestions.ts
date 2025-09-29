'use server';

/**
 * @fileOverview Provides AI-powered task and group suggestions based on user profile and activity.
 *
 * - suggestTasksAndGroups - A function that suggests relevant tasks and groups to users.
 * - SuggestTasksAndGroupsInput - The input type for the suggestTasksAndGroups function.
 * - SuggestTasksAndGroupsOutput - The return type for the suggestTasksAndGroups function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTasksAndGroupsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('A description of the user profile including goals and habits.'),
  userActivity: z
    .string()
    .describe('A summary of the user activity within the application.'),
});
export type SuggestTasksAndGroupsInput = z.infer<typeof SuggestTasksAndGroupsInputSchema>;

const SuggestTasksAndGroupsOutputSchema = z.object({
  suggestedTasks: z
    .array(z.string())
    .describe('A list of suggested tasks based on the user profile and activity.'),
  suggestedGroups: z
    .array(z.string())
    .describe('A list of suggested groups based on the user profile and activity.'),
});
export type SuggestTasksAndGroupsOutput = z.infer<typeof SuggestTasksAndGroupsOutputSchema>;

export async function suggestTasksAndGroups(input: SuggestTasksAndGroupsInput): Promise<SuggestTasksAndGroupsOutput> {
  return suggestTasksAndGroupsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTasksAndGroupsPrompt',
  input: {schema: SuggestTasksAndGroupsInputSchema},
  output: {schema: SuggestTasksAndGroupsOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant tasks and groups to users based on their profiles and activity within the application.

  User Profile: {{{userProfile}}}
  User Activity: {{{userActivity}}}

  Based on the user profile and activity, suggest a list of tasks and groups that align with their goals and interests. Be brief and to the point.

  Format your response as a JSON object with "suggestedTasks" and "suggestedGroups" fields, each containing a list of strings.
  `,
});

const suggestTasksAndGroupsFlow = ai.defineFlow(
  {
    name: 'suggestTasksAndGroupsFlow',
    inputSchema: SuggestTasksAndGroupsInputSchema,
    outputSchema: SuggestTasksAndGroupsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
