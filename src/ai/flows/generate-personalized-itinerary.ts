'use server';
/**
 * @fileOverview A personalized itinerary generator for venue attendees.
 *
 * - generatePersonalizedItinerary - A function that generates a personalized event itinerary.
 * - GeneratePersonalizedItineraryInput - The input type for the generatePersonalizedItinerary function.
 * - GeneratePersonalizedItineraryOutput - The return type for the generatePersonalizedItinerary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ItineraryItemSchema = z.object({
  time: z.string().describe('The suggested time for the activity (e.g., "7:00 PM").'),
  activity: z.string().describe('A description of the activity (e.g., "Attend game start").'),
  location: z.string().describe('The location of the activity within the venue (e.g., "Main Field").'),
  optimalRouteDescription: z
    .string()
    .describe(
      'A description of the optimal route to the activity from the current location, considering crowd density (e.g., "Shortest path from your current location is through Section 102").'
    ),
  estimatedDuration: z.string().describe('The estimated duration to complete the activity or travel to it (e.g., "15 minutes").'),
});

const GeneratePersonalizedItineraryInputSchema = z.object({
  preferences: z.string().describe('A string describing the user\'s preferences (e.g., "I like rock music and fast food", "I want to see all the major sports events").'),
  currentLocation: z
    .string()
    .describe('The user\'s current location within the venue (e.g., "Gate 1 entrance", "Section 105, Row 12, Seat 3").'),
  venueConditions: z
    .string()
    .describe(
      'A description of real-time venue conditions including wait times and crowd levels (e.g., "Concession stand A has a 10 min wait, Restroom C is crowded, Main Stage is about to start a performance").'
    ),
  eventsSchedule: z
    .string()
    .describe('A description of the schedule of events (e.g., "Game starts at 7 PM, half-time show at 7:45 PM, closing ceremony at 9 PM").'),
  crowdDensityMap: z
    .string()
    .describe(
      'A descriptive string detailing crowd density in various areas of the venue (e.g., "East concourse is very crowded, West concourse is sparse").'
    ),
});
export type GeneratePersonalizedItineraryInput = z.infer<typeof GeneratePersonalizedItineraryInputSchema>;

const GeneratePersonalizedItineraryOutputSchema = z.object({
  itinerary: z.array(ItineraryItemSchema).describe('An array of personalized itinerary items.'),
});
export type GeneratePersonalizedItineraryOutput = z.infer<typeof GeneratePersonalizedItineraryOutputSchema>;

export async function generatePersonalizedItinerary(
  input: GeneratePersonalizedItineraryInput
): Promise<GeneratePersonalizedItineraryOutput> {
  return generatePersonalizedItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedItineraryPrompt',
  input: {schema: GeneratePersonalizedItineraryInputSchema},
  output: {schema: GeneratePersonalizedItineraryOutputSchema},
  prompt: `You are an AI assistant for a large-scale sporting venue, tasked with creating a personalized itinerary for an attendee.

Your goal is to suggest optimal times, activities, and routes based on the user's preferences and real-time venue conditions to ensure a seamless and enjoyable experience.

Attendee Preferences: {{{preferences}}}
Current Location: {{{currentLocation}}}
Real-time Venue Conditions: {{{venueConditions}}}
Events Schedule: {{{eventsSchedule}}}
Crowd Density Information: {{{crowdDensityMap}}}

Based on the information provided, generate a detailed, step-by-step itinerary that optimizes for the user's preferences, minimizes waiting times, and suggests the most efficient routes, avoiding crowded areas where possible.

The itinerary should be presented as a JSON array of items, each with a 'time', 'activity', 'location', 'optimalRouteDescription', and 'estimatedDuration'. Focus on suggesting activities and movements that align with the user's stated preferences and the current venue situation.`,
});

const generatePersonalizedItineraryFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedItineraryFlow',
    inputSchema: GeneratePersonalizedItineraryInputSchema,
    outputSchema: GeneratePersonalizedItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
