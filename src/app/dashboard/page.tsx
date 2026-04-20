"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BottomNav } from "@/components/bottom-nav"
import { VenueMapAdvanced } from "@/components/venue-map-advanced"
import { SmartNavigation } from "@/components/smart-navigation"
import { QueueInsights } from "@/components/queue-insights"
import { LiveAlerts } from "@/components/live-alerts"
import { AIAssistantFull } from "@/components/ai-assistant-full"
import { Trophy, MapPin, Navigation2, Menu, Bell, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("map")

  const desktopTabs = [
    { id: "map", label: "Map", icon: MapPin },
    { id: "navigate", label: "Navigate", icon: Navigation2 },
    { id: "queues", label: "Queues", icon: Menu },
    { id: "alerts", label: "Alerts", icon: Bell },
    { id: "chat", label: "AI Chat", icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white font-body selection:bg-[#00E5FF]/30 pb-24 md:pb-0 overflow-hidden flex flex-col max-h-screen">
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-[#00E5FF]/5 blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-[#FF3366]/5 blur-[120px] mix-blend-screen" />
      </div>

      {/* Cyber-Glass Header */}
      <header className="sticky top-0 z-40 w-full bg-[#0A0D14]/80 backdrop-blur-3xl border-b border-white/5 px-6 py-4 flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group outline-none">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#0099FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <Trophy className="h-6 w-6 text-black" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-headline font-black tracking-tight text-white leading-none">VenueFlow</h1>
              <p className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest mt-1">Live Event</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-[#111622] border border-white/10 flex items-center justify-center cursor-pointer hover:border-[#00E5FF] transition-colors relative">
               <span className="text-sm font-black text-white">JD</span>
               <div className="absolute top-0 right-0 w-3 h-3 bg-[#00FF66] border-2 border-[#0A0D14] rounded-full"></div>
             </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-screen-md mx-auto p-4 md:p-6 flex-1 overflow-hidden flex flex-col">
         {/* Desktop Side Navigation Header Mock (Usually mobile first view for these tabs) */}
         <div className="hidden md:flex gap-2 mb-6 p-2 bg-[#111622] rounded-2xl border border-white/5">
            {desktopTabs.map(tab => (
               <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${activeTab === tab.id ? 'bg-[#0A0D14] text-[#00E5FF] shadow-inner border border-[#00E5FF]/20' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
               >
                  <tab.icon className="w-4 h-4"/> {tab.label}
               </button>
            ))}
         </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide h-full rounded-[2rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === "map" && <VenueMapAdvanced />}
              {activeTab === "navigate" && <SmartNavigation />}
              {activeTab === "queues" && <QueueInsights />}
              {activeTab === "alerts" && <LiveAlerts />}
              {activeTab === "chat" && <AIAssistantFull />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Persistent App Actions */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
