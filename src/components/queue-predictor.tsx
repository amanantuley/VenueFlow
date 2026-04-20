"use client"

import { useState } from "react"
import { Timer, Loader2, ArrowRight, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { predictQueueTimes, type PredictQueueTimesOutput } from "@/ai/flows/predict-queue-times-flow"

export function QueuePredictor() {
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictQueueTimesOutput | null>(null)
  
  const [type, setType] = useState("concession stand")
  const [location, setLocation] = useState("Section 105, Level 2")

  const handlePredict = async () => {
    setLoading(true)
    try {
      const result = await predictQueueTimes({
        amenityType: type,
        amenityLocation: location,
        currentCrowdDensity: "medium",
        currentEventStatus: "Halftime"
      })
      setPrediction(result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-accent/20 bg-accent/5 overflow-hidden">
      <CardHeader className="bg-accent/10">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent fill-accent" />
          <CardTitle>Smart Queue Predictor</CardTitle>
        </div>
        <CardDescription>AI-powered wait time estimates based on real-time stadium load.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Amenity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="concession stand">Concessions</SelectItem>
              <SelectItem value="restroom">Restroom</SelectItem>
              <SelectItem value="entry gate">Gate</SelectItem>
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Section 105, Level 2">West Side (105)</SelectItem>
              <SelectItem value="Section 202, Level 3">East Side (202)</SelectItem>
              <SelectItem value="Main Entrance Gate 1">Gate 1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handlePredict} 
          disabled={loading}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Timer className="mr-2 h-4 w-4" />
          )}
          {loading ? "Analyzing Live Data..." : "Predict Wait Time"}
        </Button>

        {prediction && (
          <div className="mt-4 p-4 rounded-lg bg-white border border-accent/20 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-tight">Estimated Wait</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-bold",
                prediction.isHighTraffic ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
              )}>
                {prediction.isHighTraffic ? "Peak Traffic" : "Fast Flow"}
              </span>
            </div>
            <div className="text-4xl font-bold text-primary mb-2">
              {prediction.predictedWaitTimeMinutes} <span className="text-xl font-normal text-muted-foreground">mins</span>
            </div>
            <p className="text-sm text-foreground italic mb-3">"{prediction.reasoning}"</p>
            {prediction.recommendation && (
              <div className="flex items-start gap-2 text-sm bg-accent/10 p-2 rounded border-l-2 border-accent text-accent-foreground">
                <ArrowRight className="h-4 w-4 mt-0.5 shrink-0" />
                {prediction.recommendation}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}