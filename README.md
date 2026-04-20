# VenueFlow | Smart Stadium Experience

VenueFlow is a high-performance, AI-integrated stadium companion designed to optimize the attendee experience through real-time data, predictive analytics, and personalized guidance.

## Features

- **Real-time Venue Mapping**: Interactive map with live crowd density overlays and navigation.
- **AI Queue Predictor**: Smart wait-time estimates for concessions and restrooms using Genkit models.
- **Personalized Itineraries**: Dynamically generated schedules based on user preferences and live venue conditions.
- **Contactless Ordering**: Full-service concession menu with mobile checkout to skip the lines.
- **AI Concierge**: A persistent, context-aware chatbot for instant assistance and stadium navigation.
- **Safety Center**: One-tap access to emergency services, first aid locations, and evacuation routes.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: Shadcn UI, Tailwind CSS, Lucide Icons
- **AI**: Google Genkit (Gemini 2.5 Flash)
- **State Management**: React Hooks & Context API

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/username/venue-flow.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd venue-flow
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Environment Setup**:
   Create a `.env` file with your Google AI API key:
   ```env
   GOOGLE_GENAI_API_KEY=your_key_here
   ```

## Usage

To start the development server:
```bash
npm run dev
```
Open [http://localhost:9002](http://localhost:9002) in your browser.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
