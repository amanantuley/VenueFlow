import { config } from 'dotenv';
config();

import '@/ai/flows/generate-personalized-itinerary.ts';
import '@/ai/flows/predict-queue-times-flow.ts';
import '@/ai/flows/venue-chatbot-flow.ts';
