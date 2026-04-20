"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Trophy, MapPin, Zap, TrendingUp, ChevronRight, Star, ArrowUpRight, BarChart3 } from "lucide-react"
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
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")

  const tabs = [
    { id: "home", label: "Dashboard", icon: Zap },
    { id: "map", label: "Venue Map", icon: MapPin },
    { id: "order", label: "Concessions", icon: TrendingUp },
    { id: "plan", label: "My Itinerary", icon: Star },
    { id: "safety", label: "Safety Center", icon: Bell },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0 font-body overflow-x-hidden selection:bg-primary/30">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-primary/10 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-accent/10 blur-[150px] mix-blend-screen" />
      </div>

      {/* Cyber-Glass Header */}
      <header className="sticky top-0 z-40 w-full bg-background/50 backdrop-blur-2xl border-b border-white/10 px-6 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1" aria-label="Go to Landing Page">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Trophy className="h-6 w-6 text-black" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-headline font-black tracking-tight text-white leading-none group-hover:text-primary transition-colors">VenueFlow</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Command Center</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:bg-white/10 hover:text-white transition-colors rounded-full h-10 w-10" aria-label="Notifications">
              <Bell className="h-5 w-5" aria-hidden="true" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background ring-2 ring-accent/20 animate-pulse" />
            </Button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="hidden md:block text-right">
                <p className="text-sm font-bold text-white">John Doe</p>
                <p className="text-xs text-primary font-medium tracking-wide">VIP Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center cursor-pointer hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary" tabIndex={0} aria-label="User Profile">
                <span className="text-sm font-black text-primary">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-screen-2xl mx-auto p-6 md:pt-10 md:grid md:grid-cols-12 md:gap-10">
        
        {/* Navigation Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col md:col-span-3 space-y-8"
        >
          <nav className="space-y-2 bg-card/30 backdrop-blur-md border border-white/5 p-3 rounded-[2rem]" aria-label="Dashboard Navigation">
            {tabs.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative w-full flex items-center gap-3 px-4 py-4 rounded-xl text-left font-semibold transition-colors focus:outline-none"
                aria-current={activeTab === item.id ? "page" : undefined}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className={cn("h-5 w-5 relative z-10", activeTab === item.id ? "text-primary" : "text-muted-foreground")} aria-hidden="true" />
                <span className={cn("relative z-10", activeTab === item.id ? "text-white" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
          
          <Card className="bg-gradient-to-br from-accent/10 to-transparent border-accent/20 border-2 p-5 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-0 space-y-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center shadow-[0_0_15px_rgba(133,255,0,0.2)]">
                  <Star className="h-6 w-6 text-accent fill-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">VIP Diamond</p>
                  <p className="text-xs text-accent">Section 105, Row 12</p>
                </div>
              </div>
              <Button className="w-full font-bold rounded-xl h-12 bg-accent text-black hover:bg-accent/90 shadow-[0_0_20px_rgba(133,255,0,0.3)] transition-all">
                Access Perks Intranet
              </Button>
            </CardContent>
          </Card>
        </motion.aside>

        {/* Dynamic Content Area */}
        <div className="md:col-span-9 min-h-[80vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {activeTab === "home" && (
                <div className="space-y-10">
                  {/* Ultra-Modern Hero Card */}
                  <Card className="relative group overflow-hidden border border-white/10 shadow-2xl rounded-[3rem] bg-black text-white md:aspect-[21/8] flex items-center">
                    <Image 
                      src="https://picsum.photos/seed/stadium/1200/600" 
                      alt="Stadium Live View" 
                      fill 
                      className="object-cover opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-[2s] ease-out"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <CardContent className="relative p-8 md:p-12 w-full flex flex-col md:flex-row justify-between items-end gap-6 h-full">
                      <div className="space-y-4 mt-auto z-10 w-full mb-4 md:mb-0">
                        <div className="flex gap-2">
                          <Badge className="bg-white/10 text-white backdrop-blur-md border outline outline-1 outline-white/20 px-3 py-1 font-bold text-xs uppercase tracking-wider">2nd Half • 54'</Badge>
                          <Badge className="bg-accent text-black border-none px-3 py-1 font-bold text-xs uppercase tracking-wider shadow-[0_0_10px_rgba(133,255,0,0.4)]">Live Event</Badge>
                        </div>
                        <div>
                          <h2 className="text-4xl md:text-6xl font-headline font-black mb-2 tracking-tight text-white drop-shadow-md">CITY vs UNITED</h2>
                          <p className="text-white/80 font-medium flex items-center gap-2 text-lg">
                            <MapPin className="h-5 w-5 text-accent" aria-hidden="true" /> Grand Stadium, Central Park
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-4">
                          <Button size="lg" className="bg-white text-black hover:bg-white/90 hover:scale-105 rounded-full font-black px-8 shadow-xl transition-all" onClick={() => setActiveTab('map')}>
                            Open Live Map
                          </Button>
                          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full font-black px-8 transition-colors">
                            Show Lineups
                          </Button>
                        </div>
                      </div>
                      <div className="md:text-right pb-2 backdrop-blur-md bg-black/30 p-6 rounded-[2rem] border border-white/10 w-full md:w-auto shrink-0 shadow-2xl">
                        <p className="text-sm uppercase font-bold text-accent tracking-[0.2em] mb-4">Live Score</p>
                        <div className="flex items-center md:justify-end gap-8">
                          <div className="flex flex-col items-center">
                            <span className="text-6xl font-headline font-black text-white leading-none">2</span>
                            <span className="text-xs font-bold text-white/50 tracking-wider mt-1">MCI</span>
                          </div>
                          <div className="h-12 w-px bg-white/20" />
                          <div className="flex flex-col items-center">
                            <span className="text-6xl font-headline font-black text-primary drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] leading-none">1</span>
                            <span className="text-xs font-bold text-white/50 tracking-wider mt-1">MUN</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contextual Intelligence Section */}
                  <div className="grid lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center bg-card/30 p-4 rounded-2xl border border-white/5">
                        <h3 className="font-headline font-bold text-2xl tracking-tight text-white flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/20"><Zap className="h-5 w-5 text-primary"/></div> Live Alerts
                        </h3>
                      </div>
                      <div className="space-y-4">
                        {[
                          { title: "Gate Optimized", desc: "Gate 4 flow is high. Gate 2 redirected for ease.", time: "2m ago", icon: MapPin },
                          { title: "Flash Sale", desc: "50% off beverages at Section B for 15 mins.", time: "15m ago", icon: TrendingUp },
                        ].map((alert, i) => (
                          <div key={i} className="group flex gap-5 p-5 bg-card/60 backdrop-blur-sm rounded-[2rem] border border-white/5 hover:border-primary/30 hover:bg-card transition-all items-center cursor-pointer shadow-lg">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 shrink-0 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors text-white shadow-inner">
                              <alert.icon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-bold text-white text-base">{alert.title}</h4>
                                <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-md">{alert.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1">{alert.desc}</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                       <div className="flex justify-between items-center bg-card/30 p-4 rounded-2xl border border-white/5">
                        <h3 className="font-headline font-bold text-2xl tracking-tight text-white flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-secondary/20"><BarChart3 className="h-5 w-5 text-secondary"/></div> Wait Analytics
                        </h3>
                      </div>
                      <div className="bg-card/60 backdrop-blur-sm p-2 rounded-[2rem] border border-white/5 shadow-lg">
                        <QueuePredictor />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "map" && <VenueMap />}
              {activeTab === "order" && <ConcessionOrdering />}
              {activeTab === "plan" && <ItineraryPlanner />}
              {activeTab === "safety" && <EmergencyGuide />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Persistent App Actions */}
      <VenueChatbot />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
