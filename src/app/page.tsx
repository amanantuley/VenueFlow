"use client"

import { useState } from "react"
import { Bell, Search, Trophy, MapPin, Zap, TrendingUp, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import { VenueMap } from "@/components/venue-map"
import { QueuePredictor } from "@/components/queue-predictor"
import { ItineraryPlanner } from "@/components/itinerary-planner"
import { ConcessionOrdering } from "@/components/concession-ordering"
import { EmergencyGuide } from "@/components/emergency-guide"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-card/80 backdrop-blur-md border-b border-border px-4 py-3">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-primary">VenueFlow</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-card" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">JD</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto p-4 md:pt-8 md:grid md:grid-cols-12 md:gap-8">
        {/* Navigation Sidebar for Desktop */}
        <div className="hidden md:block md:col-span-3 space-y-4">
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0 space-y-2">
              {[
                { id: "home", label: "Dashboard", icon: Zap },
                { id: "map", label: "Venue Map", icon: MapPin },
                { id: "order", label: "Concessions", icon: TrendingUp },
                { id: "plan", label: "My Itinerary", icon: TrendingUp },
                { id: "safety", label: "Safety Center", icon: TrendingUp },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="w-full justify-start gap-3 h-12 rounded-xl"
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Content Area */}
        <div className="md:col-span-9 space-y-6">
          {activeTab === "home" && (
            <div className="space-y-6">
              {/* Event Status Card */}
              <Card className="bg-primary text-white overflow-hidden border-none shadow-xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">Live Event</Badge>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-white/60">Current Score</p>
                      <p className="text-2xl font-black">2 - 1</p>
                    </div>
                  </div>
                  <h2 className="text-3xl font-black mb-1">CITY vs UNITED</h2>
                  <p className="text-white/80 font-medium mb-6 flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Grand Stadium • 2nd Half (54')
                  </p>
                  <div className="flex gap-3">
                    <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 font-bold" onClick={() => setActiveTab('map')}>
                      Explore Map
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold">
                      Match Stats
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions / Featured Features */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer" onClick={() => setActiveTab('order')}>
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-sm font-bold">Mobile Order</span>
                    <span className="text-[10px] text-muted-foreground">Skip the queue</span>
                  </CardContent>
                </Card>
                <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer" onClick={() => setActiveTab('plan')}>
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-sm font-bold">Smart Plan</span>
                    <span className="text-[10px] text-muted-foreground">AI Powered</span>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Alerts */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <h3 className="font-bold text-lg">Contextual Alerts</h3>
                  <Button variant="link" className="text-xs text-primary p-0">View All</Button>
                </div>
                {[
                  { title: "Gate Change", desc: "Gate 4 is now entry-only to ease crowding.", time: "2m ago", type: "info" },
                  { title: "Special Offer", desc: "50% off beverages at Concession B until 6:30 PM.", time: "15m ago", type: "promo" },
                ].map((alert, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-border shadow-sm items-center">
                    <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${alert.type === 'promo' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'}`}>
                      {alert.type === 'promo' ? <TrendingUp className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <h4 className="font-bold text-sm">{alert.title}</h4>
                        <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{alert.desc}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  </div>
                ))}
              </div>

              <QueuePredictor />
            </div>
          )}

          {activeTab === "map" && <VenueMap />}
          {activeTab === "order" && <ConcessionOrdering />}
          {activeTab === "plan" && <ItineraryPlanner />}
          {activeTab === "safety" && <EmergencyGuide />}
        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}