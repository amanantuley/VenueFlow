"use client"

import { useState } from "react"
import { Bell, Trophy, MapPin, Zap, TrendingUp, ChevronRight, Star, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BottomNav } from "@/components/bottom-nav"
import { VenueMap } from "@/components/venue-map"
import { QueuePredictor } from "@/components/queue-predictor"
import { ItineraryPlanner } from "@/components/itinerary-planner"
import { ConcessionOrdering } from "@/components/concession-ordering"
import { EmergencyGuide } from "@/components/emergency-guide"
import { VenueChatbot } from "@/components/venue-chatbot"
import Image from "next/image"

export default function Home() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0 font-body">
      {/* Premium Header */}
      <header className="sticky top-0 z-40 w-full bg-white/70 backdrop-blur-xl border-b border-border/40 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-primary leading-none">VenueFlow</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Smart Stadium Experience</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-muted/50 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white ring-2 ring-accent/20 animate-pulse" />
            </Button>
            <div className="flex items-center gap-2 pl-2 border-l border-border/50">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary/10 to-accent/10 border border-border flex items-center justify-center">
                <span className="text-xs font-black text-primary">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto p-6 md:pt-10 md:grid md:grid-cols-12 md:gap-10">
        {/* Navigation Sidebar for Desktop (Premium Minimalism) */}
        <div className="hidden md:block md:col-span-3 space-y-6">
          <nav className="space-y-2">
            {[
              { id: "home", label: "Dashboard", icon: Zap },
              { id: "map", label: "Venue Map", icon: MapPin },
              { id: "order", label: "Concessions", icon: TrendingUp },
              { id: "plan", label: "My Itinerary", icon: Star },
              { id: "safety", label: "Safety Center", icon: Bell },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-14 rounded-2xl transition-all duration-300",
                  activeTab === item.id 
                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" 
                    : "hover:bg-muted/50 text-muted-foreground font-semibold"
                )}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className={cn("h-5 w-5", activeTab === item.id ? "text-white" : "text-primary")} />
                {item.label}
              </Button>
            ))}
          </nav>
          
          <Card className="bg-muted/20 border-dashed border-2 border-border p-4 rounded-3xl">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Star className="h-5 w-5 text-accent fill-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold">Premium Seat</p>
                  <p className="text-[10px] text-muted-foreground">Section 105, Row 12</p>
                </div>
              </div>
              <Button variant="outline" className="w-full text-xs rounded-xl h-10 border-accent/20 text-accent hover:bg-accent hover:text-white">
                View Perks
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Content Area */}
        <div className="md:col-span-9 space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500">
          {activeTab === "home" && (
            <div className="space-y-10">
              {/* Ultra-Modern Hero Card */}
              <Card className="relative group overflow-hidden border-none shadow-2xl rounded-[2.5rem] bg-black text-white aspect-[21/9] flex items-center">
                <Image 
                  src="https://picsum.photos/seed/stadium/1200/600" 
                  alt="Stadium" 
                  fill 
                  className="object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-[3s]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <CardContent className="relative p-8 md:p-12 w-full flex flex-col md:flex-row justify-between items-end gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Badge className="bg-white/20 text-white backdrop-blur-md border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider">2nd Half • 54'</Badge>
                      <Badge className="bg-accent text-accent-foreground border-none px-3 py-1 font-bold text-[10px] uppercase tracking-wider">Live Event</Badge>
                    </div>
                    <div>
                      <h2 className="text-4xl md:text-6xl font-black mb-2 tracking-tight">CITY vs UNITED</h2>
                      <p className="text-white/60 font-medium flex items-center gap-2 text-lg">
                        <MapPin className="h-5 w-5 text-accent" /> Grand Stadium, Central Park
                      </p>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl font-black px-8 shadow-xl" onClick={() => setActiveTab('map')}>
                        Live Map
                      </Button>
                      <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-2xl font-black px-8">
                        Match Info
                      </Button>
                    </div>
                  </div>
                  <div className="text-right pb-2">
                    <p className="text-[12px] uppercase font-black text-white/40 tracking-[0.2em] mb-1">Scoreboard</p>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-black">2</span>
                        <span className="text-[10px] font-bold text-white/40">MCI</span>
                      </div>
                      <div className="h-8 w-px bg-white/20" />
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-accent">1</span>
                        <span className="text-[10px] font-bold text-white/40">MUN</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Quick Actions */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'order', icon: TrendingUp, label: 'Order Now', sub: 'Skip all lines', color: 'accent' },
                  { id: 'plan', icon: Zap, label: 'Smart Plan', sub: 'AI Concierge', color: 'primary' },
                  { id: 'map', icon: MapPin, label: 'Navigation', sub: 'Find anything', color: 'primary' },
                  { id: 'safety', icon: Bell, label: 'Assistance', sub: '24/7 Support', color: 'accent' },
                ].map((action) => (
                  <Card 
                    key={action.id}
                    className="group border-border/40 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer rounded-3xl overflow-hidden bg-card"
                    onClick={() => setActiveTab(action.id)}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-inner",
                        action.color === 'accent' ? "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                      )}>
                        <action.icon className="h-7 w-7" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-base font-black block">{action.label}</span>
                        <span className="text-xs text-muted-foreground font-medium uppercase tracking-tighter opacity-60">{action.sub}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contextual Intelligence Section */}
              <div className="grid lg:grid-cols-2 gap-10 pt-4">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-2xl tracking-tight">Intelligent Alerts</h3>
                    <Button variant="link" className="text-sm font-bold text-primary group">
                      Explore All <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: "Gate Optimized", desc: "Gate 4 flow is high. Gate 2 redirected for ease.", time: "2m ago", icon: MapPin },
                      { title: "Half-Time Flash Sale", desc: "50% off beverages at Section B for 15 mins.", time: "15m ago", icon: TrendingUp },
                    ].map((alert, i) => (
                      <div key={i} className="group flex gap-5 p-5 bg-card rounded-[2rem] border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all items-center">
                        <div className="w-12 h-12 rounded-2xl bg-muted shrink-0 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <alert.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-black text-base">{alert.title}</h4>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{alert.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1">{alert.desc}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-black text-2xl tracking-tight">Wait Analytics</h3>
                  <QueuePredictor />
                </div>
              </div>
            </div>
          )}

          {activeTab === "map" && <VenueMap />}
          {activeTab === "order" && <ConcessionOrdering />}
          {activeTab === "plan" && <ItineraryPlanner />}
          {activeTab === "safety" && <EmergencyGuide />}
        </div>
      </main>

      <VenueChatbot />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
