"use client"

import { useState } from "react"
import { Calendar, Loader2, Sparkles, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { generatePersonalizedItinerary, type GeneratePersonalizedItineraryOutput } from "@/ai/flows/generate-personalized-itinerary"

export function ItineraryPlanner() {
  const [loading, setLoading] = useState(false)
  const [itinerary, setItinerary] = useState<GeneratePersonalizedItineraryOutput | null>(null)
  const [preferences, setPreferences] = useState("")

  const handleGenerate = async () => {
    if (!preferences) return
    setLoading(true)
    try {
      const result = await generatePersonalizedItinerary({
        preferences,
        currentLocation: "Section 105, Row 12, Seat 3",
        venueConditions: "Concession A (10m wait), Gate 1 (Busy), Main Stage (Pre-show)",
        eventsSchedule: "Game starts 7 PM, Halftime 7:45 PM",
        crowdDensityMap: "East concourse crowded, West concourse sparse"
      })
      setItinerary(result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-primary/20 bg-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle>Personalized Itinerary</CardTitle>
        </div>
        <CardDescription>Plan your perfect event day with AI recommendations.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!itinerary ? (
          <div className="space-y-4">
            <Textarea 
              placeholder="e.g., I want to grab a burger before kickoff and visit the merch store at halftime."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              className="min-h-[100px] resize-none border-primary/20"
            />
            <Button 
              onClick={handleGenerate} 
              disabled={loading || !preferences}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Calendar className="mr-2 h-4 w-4" />
              )}
              {loading ? "Crafting Your Schedule..." : "Generate Smart Plan"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-primary">Suggested Schedule</h4>
              <Button variant="ghost" size="sm" onClick={() => setItinerary(null)} className="text-xs">Reset</Button>
            </div>
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-[11px] before:w-0.5 before:bg-primary/10">
              {itinerary.itinerary.map((item, idx) => (
                <div key={idx} className="relative pl-8 animate-in slide-in-from-left-2" style={{ animationDelay: `${idx * 100}ms` }}>
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10">
                    <Clock className="h-3 w-3 text-primary" />
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg border border-border">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-primary">{item.time}</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        {item.estimatedDuration}
                      </span>
                    </div>
                    <h5 className="font-semibold text-sm mb-1">{item.activity}</h5>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                    <p className="text-[11px] leading-relaxed text-foreground/80 bg-white/60 p-2 rounded border border-border/50">
                      <span className="font-semibold">Route:</span> {item.optimalRouteDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full text-xs">Add to Calendar</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}