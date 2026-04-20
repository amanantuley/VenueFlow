'use server';
/**
 * @fileOverview A Genkit flow for predicting wait times for venue amenities.
 *
 * - predictQueueTimes - A function that handles the prediction of queue times.
 * - PredictQueueTimesInput - The input type for the predictQueueTimes function.
 * - PredictQueueTimesOutput - The return type for the predictQueueTimes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PredictQueueTimesInputSchema = z.object({
  amenityType: z
    .string()
    .describe('The type of amenity (e.g., "restroom", "concession stand", "entry gate").'),
  amenityLocation: z
    .string()
    .describe('The specific location of the amenity within the venue (e.g., "Section 105, Level 2").'),
  currentCrowdDensity: z
    .enum(['low', 'medium', 'high', 'very high'])
    .describe('The current crowd density in the vicinity of the amenity.'),
  currentEventStatus: z
    .string()
    .optional()
    .describe('Brief description of the current event status (e.g., "halftime", "game started", "concert intermission").'),
});
export type PredictQueueTimesInput = z.infer<typeof PredictQueueTimesInputSchema>;

const PredictQueueTimesOutputSchema = z.object({
  predictedWaitTimeMinutes: z.number().describe('The estimated wait time in minutes for the amenity.'),
  reasoning: z
    .string()
    .describe('Explanation for the predicted wait time, considering crowd density, event status, and amenity type.'),
  isHighTraffic: z
    .boolean()
    .describe('True if the current crowd density indicates high traffic for this amenity, false otherwise.'),
  recommendation: z
    .string()
    .optional()
    .describe('A brief recommendation for the user, e.g., "Consider visiting after the next goal."'),
});
export type PredictQueueTimesOutput = z.infer<typeof PredictQueueTimesOutputSchema>;

export async function predictQueueTimes(input: PredictQueueTimesInput): Promise<PredictQueueTimesOutput> {
  return predictQueueTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictQueueTimesPrompt',
  input: { schema: PredictQueueTimesInputSchema },
  output: { schema: PredictQueueTimesOutputSchema },
  prompt: `You are an AI assistant specialized in predicting queue times for venue amenities.
Your task is to estimate the wait time for a given amenity based on the current venue conditions.

Input details:
- Amenity Type: {{{amenityType}}}
- Amenity Location: {{{amenityLocation}}}
- Current Crowd Density: {{{currentCrowdDensity}}}
{{#if currentEventStatus}}- Current Event Status: {{{currentEventStatus}}}{{/if}}

Predict the wait time in whole minutes. Consider that restrooms usually have shorter wait times than popular concession stands during peak periods. 'Very high' crowd density around concessions during halftime would result in long wait times. Give a recommendation if appropriate. Make sure isHighTraffic is true if currentCrowdDensity is 'high' or 'very high', otherwise it should be false.`,
});

const predictQueueTimesFlow = ai.defineFlow(
  {
    name: 'predictQueueTimesFlow',
    inputSchema: PredictQueueTimesInputSchema,
    outputSchema: PredictQueueTimesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  },
);
