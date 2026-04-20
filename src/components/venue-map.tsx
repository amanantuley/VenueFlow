"use client"

import { useState } from "react"
import { MapPin, Info, Coffee, User, Navigation2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function VenueMap() {
  const [activePoi, setActivePoi] = useState<string | null>(null)

  const pois = [
    { id: "gate-a", type: "entry", x: 20, y: 15, label: "Gate A", density: "high" },
    { id: "restroom-1", type: "restroom", x: 75, y: 30, label: "Restroom 1", density: "medium" },
    { id: "concession-1", type: "food", x: 45, y: 65, label: "Stadium Eats", density: "low" },
    { id: "you", type: "user", x: 35, y: 40, label: "You", density: "none" },
  ]

  return (
    <div className="flex flex-col gap-4 h-full">
      <Card className="flex-1 min-h-[400px] relative overflow-hidden bg-muted/20 map-container border-2 border-primary/10 rounded-2xl shadow-inner">
        {/* Simulated Grid/Map */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-[80%] h-[80%] border-4 border-dashed border-primary rounded-full" />
          <div className="absolute w-[40%] h-[40%] border-4 border-dashed border-primary rounded-full" />
        </div>

        {pois.map((poi) => (
          <div
            key={poi.id}
            style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            onClick={() => setActivePoi(poi.id)}
          >
            <div className="relative">
              {/* Pulsing density indicator */}
              {poi.density !== "none" && (
                <div className={cn(
                  "absolute inset-0 scale-150 rounded-full animate-ping opacity-20",
                  poi.density === "high" ? "bg-red-500" : poi.density === "medium" ? "bg-yellow-500" : "bg-green-500"
                )} />
              )}
              
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 transition-transform active:scale-90",
                poi.type === "user" ? "bg-primary text-white border-white" : "bg-white text-primary border-primary"
              )}>
                {poi.type === "entry" && <Info className="h-5 w-5" />}
                {poi.type === "restroom" && <MapPin className="h-5 w-5" />}
                {poi.type === "food" && <Coffee className="h-5 w-5" />}
                {poi.type === "user" && <User className="h-5 w-5" />}
              </div>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-black/80 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {poi.label}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2" /> Low Crowd
          </Badge>
          <Badge variant="secondary" className="bg-white/90 backdrop-blur">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" /> Moderate
          </Badge>
          <Badge variant="secondary" className="bg-white/90 backdrop-blur">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2" /> Dense
          </Badge>
        </div>

        <Button 
          size="icon" 
          className="absolute bottom-4 right-4 rounded-full shadow-xl bg-accent hover:bg-accent/90"
          onClick={() => console.log('Recenter map')}
        >
          <Navigation2 className="h-5 w-5" />
        </Button>
      </Card>

      {activePoi && (
        <Card className="animate-in slide-in-from-bottom-2">
          <CardHeader className="py-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{pois.find(p => p.id === activePoi)?.label}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setActivePoi(null)}>Close</Button>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-sm text-muted-foreground mb-4">
              Estimated wait time: <span className="text-primary font-bold">12 mins</span>
            </p>
            <div className="flex gap-2">
              <Button className="flex-1">Get Directions</Button>
              <Button variant="outline" className="flex-1">View Details</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}