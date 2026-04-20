'use server';
/**
 * @fileOverview A venue-specific AI concierge flow.
 *
 * - venueChatbot - A function that handles conversation with the venue assistant.
 * - VenueChatbotInput - Input schema for user messages and context.
 * - VenueChatbotOutput - Output schema for the bot's response.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VenueChatbotInputSchema = z.object({
  message: z.string().describe('The user\'s current message.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string()
  })).optional().describe('Previous chat messages.'),
});
export type VenueChatbotInput = z.infer<typeof VenueChatbotInputSchema>;

const VenueChatbotOutputSchema = z.object({
  response: z.string().describe('The assistant\'s helpful response.'),
});
export type VenueChatbotOutput = z.infer<typeof VenueChatbotOutputSchema>;

export async function venueChatbot(input: VenueChatbotInput): Promise<VenueChatbotOutput> {
  return venueChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'venueChatbotPrompt',
  input: { schema: VenueChatbotInputSchema },
  output: { schema: VenueChatbotOutputSchema },
  prompt: `You are "VenueConcierge", the premium AI assistant for Grand Stadium.
Your tone is helpful, sophisticated, and efficient.

Context:
- Stadium: Grand Stadium
- Current Event: Manchester City vs Manchester United
- Status: Live (2nd Half)
- Amenities: Multiple concession stands (A, B, C), restrooms at every section, 4 main gates.
- Special Offer: 50% off beverages at Concession B.

User Message: {{{message}}}

{{#if history}}
Recent Chat History:
{{#each history}}
- {{role}}: {{content}}
{{/each}}
{{/if}}

Provide a concise, helpful response. If asked about locations or wait times, refer to the stadium layout (Concourse North/South). Always mention the special offer if relevant to food/drinks.`,
});

const venueChatbotFlow = ai.defineFlow(
  {
    name: 'venueChatbotFlow',
    inputSchema: VenueChatbotInputSchema,
    outputSchema: VenueChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
